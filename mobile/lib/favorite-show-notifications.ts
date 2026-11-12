import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSchedule } from './api';
import { getSlotWindow } from './schedule-now';
import type { ScheduleResponse, ScheduleSlot, WeekDay } from './types';

const REMINDER_MARKER = 'moontvFavoriteShowReminder';
const NOTIFIED_NOW_KEY = 'moontv:favorite-show-now-alerts:v1';
const REMINDER_LIMIT = 64;
const WEEK_DAYS: WeekDay[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

type ScheduleReminder = {
  slot: ScheduleSlot;
  date: Date;
  nowPlaying?: boolean;
};

export async function requestFavoriteShowNotificationPermission(): Promise<void> {
  if (Platform.OS === 'web') {
    throw new Error('Show reminders are available in the iOS and Android apps.');
  }

  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync('favorite-shows', {
        name: 'Favourite show reminders',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    } catch (cause) {
      // Expo Go may reject channel configuration while still supporting local notifications.
      // Continue with its default channel so the user can grant permission and test reminders.
      console.warn('Could not create the favourite show notification channel; using the default channel.', cause);
    }
  }

  const current = await Notifications.getPermissionsAsync();
  const permission = current.granted
    ? current
    : await Notifications.requestPermissionsAsync({
        ios: { allowAlert: true, allowBadge: false, allowSound: true },
      });

  if (!permission.granted && permission.ios?.status !== Notifications.IosAuthorizationStatus.PROVISIONAL) {
    throw new Error('Allow Moon TV notifications in your device settings to receive show reminders.');
  }
}

export async function cancelFavoriteShowNotifications(): Promise<void> {
  if (Platform.OS === 'web') return;
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((item) => item.content.data?.[REMINDER_MARKER] === true)
      .map((item) => Notifications.cancelScheduledNotificationAsync(item.identifier)),
  );
}

export async function sendTestFavoriteShowNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Moon TV reminders are on',
      body: 'Favourite show notifications are working on this device.',
      sound: true,
      data: { [REMINDER_MARKER]: true },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
}

export async function refreshFavoriteShowNotifications(favorites: string[]): Promise<void> {
  if (Platform.OS === 'web') return;
  if (favorites.length === 0) {
    await cancelFavoriteShowNotifications();
    return;
  }

  // Fetch before cancelling, so a temporary network error does not erase reminders already scheduled.
  const schedule = await fetchSchedule(true);
  const reminders = buildUpcomingReminders(schedule, new Set(favorites));
  const lastNowAlerts = await readNowAlerts();
  await cancelFavoriteShowNotifications();

  let scheduledCount = 0;
  let nowAlertsChanged = false;
  for (const reminder of reminders) {
    if (scheduledCount >= REMINDER_LIMIT) break;
    const startsAt = reminder.date;
    if (reminder.nowPlaying) {
      const alertKey = `${getLagosDateKey(new Date())}:${reminder.slot.slug}`;
      if (lastNowAlerts[alertKey]) continue;
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${reminder.slot.title} is now airing`,
          body: `Your favourite is on Moon TV now.`,
          sound: true,
          data: { [REMINDER_MARKER]: true, slug: reminder.slot.slug },
        },
        trigger: null,
      });
      lastNowAlerts[alertKey] = true;
      nowAlertsChanged = true;
      scheduledCount += 1;
      continue;
    }
    const thirtyMinutesBefore = new Date(startsAt.getTime() - 30 * 60 * 1000);

    if (thirtyMinutesBefore.getTime() > Date.now() && scheduledCount < REMINDER_LIMIT) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${reminder.slot.title} starts in 30 minutes`,
          body: `Your favourite is coming up on Moon TV.`,
          sound: true,
          data: { [REMINDER_MARKER]: true, slug: reminder.slot.slug },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: thirtyMinutesBefore,
        },
      });
      scheduledCount += 1;
    }

    if (startsAt.getTime() > Date.now() && scheduledCount < REMINDER_LIMIT) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${reminder.slot.title} is now airing`,
          body: `Tune in to Moon TV now.`,
          sound: true,
          data: { [REMINDER_MARKER]: true, slug: reminder.slot.slug },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: startsAt,
        },
      });
      scheduledCount += 1;
    }
  }

  if (nowAlertsChanged) {
    await AsyncStorage.setItem(NOTIFIED_NOW_KEY, JSON.stringify(lastNowAlerts));
  }
}

function buildUpcomingReminders(schedule: ScheduleResponse, favorites: Set<string>): ScheduleReminder[] {
  const now = new Date();
  const lagosNow = getLagosDateParts(now);
  const baseDate = new Date(Date.UTC(lagosNow.year, lagosNow.month - 1, lagosNow.day));
  const slotsByDay = schedule.week ?? { [schedule.day as WeekDay]: schedule.slots };
  const reminders: ScheduleReminder[] = [];

  for (let offset = 0; offset < 7; offset += 1) {
    const date = new Date(baseDate.getTime() + offset * 24 * 60 * 60 * 1000);
    const day = WEEK_DAYS[(date.getUTCDay() + 6) % 7];
    const slots = slotsByDay[day] ?? [];

    for (const slot of slots) {
      if (!slot.slug || !favorites.has(slot.slug)) continue;
      const window = getSlotWindow(slot);
      if (!window) continue;

      const startAt = lagosTimeToDate(date, window.start);
      const endAt = lagosTimeToDate(date, window.end);
      if (startAt.getTime() <= now.getTime()) {
        if (offset === 0 && endAt.getTime() > now.getTime()) {
          reminders.push({ slot, date: startAt, nowPlaying: true });
        }
        continue;
      }
      reminders.push({ slot, date: startAt });
    }
  }

  return reminders.sort((first, second) => first.date.getTime() - second.date.getTime());
}

async function readNowAlerts(): Promise<Record<string, boolean>> {
  try {
    const value = await AsyncStorage.getItem(NOTIFIED_NOW_KEY);
    const parsed: unknown = value ? JSON.parse(value) : {};
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    const cutoffKey = getLagosDateKey(cutoff);
    return Object.fromEntries(
      Object.entries(parsed as Record<string, boolean>)
        .filter(([key]) => key.split(':')[0] >= cutoffKey),
    );
  } catch {
    return {};
  }
}

function getLagosDateKey(value: Date): string {
  const parts = getLagosDateParts(value);
  return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
}

function getLagosDateParts(value: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  return {
    year: Number(parts.find((part) => part.type === 'year')?.value),
    month: Number(parts.find((part) => part.type === 'month')?.value),
    day: Number(parts.find((part) => part.type === 'day')?.value),
  };
}

function lagosTimeToDate(date: Date, minutes: number): Date {
  // Nigeria uses UTC+1 year-round. Convert the schedule's wall-clock time to an absolute instant.
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    Math.floor(minutes / 60) - 1,
    minutes % 60,
  ));
}
