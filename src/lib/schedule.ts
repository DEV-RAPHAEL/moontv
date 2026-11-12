/**
 * Moon TV Schedule Utility - Nigeria Standard Time (WAT, UTC+1)
 * All schedule logic uses Africa/Lagos timezone.
 */

import { weeklyScheduleQuery } from './queries';
import { sanityFetch, urlForImage } from './sanity';
import { weeklySchedule as legacyWeeklySchedule } from '../../scripts/legacy-schedule';

export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export type WeekDay = (typeof weekDays)[number];

export type ScheduleSlot = {
  time: string;
  title: string;
  category: string;
  slug?: string;
  notes?: string;
  isLive?: boolean;
  isNowPlaying?: boolean;
  startMinutes?: number;
  endMinutes?: number;
  image?: string;
};

type SanityScheduleSlot = {
  day?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  title?: string | null;
  category?: string | null;
  isLive?: boolean | null;
  notes?: string | null;
  programme?: {
    title?: string | null;
    slug?: { current?: string | null } | null;
    category?: string | null;
    thumbnail?: Parameters<typeof urlForImage>[0] | null;
  } | null;
};

export function getNigeriaDate(): Date {
  const now = new Date();
  const nigeriaStr = now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
  return new Date(nigeriaStr);
}

export function getNigeriaDayName(): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const lagosDay = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  return days[lagosDay.getDay()];
}

export function getNigeriaHourMinute(): { hour: number; minute: number } {
  const now = new Date();
  const lagosDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  return { hour: lagosDate.getHours(), minute: lagosDate.getMinutes() };
}

export function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.trim().match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function parseSlotTime(slotTime: string): { start: number; end: number } {
  const parts = slotTime.split('-').map((s) => s.trim());
  let start = parseTimeToMinutes(parts[0] || '');
  let end = parseTimeToMinutes(parts[1] || '');
  if (end < start) end += 24 * 60; // handle overnight transition
  return { start, end };
}

/**
 * Minutes since the broadcast day started at 06:00. Times before 06:00
 * belong to the tail of the previous broadcast day, so 00:52 -> 18h52m.
 */
export function minutesIntoBroadcastDay(hour: number, minute: number): number {
  return (((hour - 6 + 24) % 24) * 60) + minute;
}

/** The broadcast day a wall-clock hour belongs to; before 06:00 it is still yesterday's day. */
export function getBroadcastDay(day: WeekDay, hour: number): WeekDay {
  if (hour >= 6) return day;
  return weekDays[(weekDays.indexOf(day) + 6) % 7];
}

export function enrichSlotsWithNigeriaTime(slots: ScheduleSlot[]): ScheduleSlot[] {
  const { hour, minute } = getNigeriaHourMinute();
  const currentMinutes = hour * 60 + minute;

  return slots.map((slot) => {
    const { start, end } = parseSlotTime(slot.time);
    const isNowPlaying = currentMinutes >= start && currentMinutes < end;
    return { ...slot, startMinutes: start, endMinutes: end, isNowPlaying };
  });
}

// Slot times mapped onto the broadcast day; an end at or before the start means the slot crosses 06:00.
function broadcastRange(slotTime: string): { start: number; end: number } {
  const { start, end } = parseSlotTime(slotTime);
  const bStart = minutesIntoBroadcastDay(Math.floor(start / 60), start % 60);
  let bEnd = minutesIntoBroadcastDay(Math.floor(end / 60), end % 60);
  if (bEnd <= bStart) bEnd += 24 * 60;
  return { start: bStart, end: bEnd };
}

export function getOnAirAndUpcoming(
  slots: ScheduleSlot[],
  currentMinutes = minutesIntoBroadcastDay(getNigeriaHourMinute().hour, getNigeriaHourMinute().minute),
  count = 5,
): ScheduleSlot[] {
  return slots
    .map((slot) => ({ slot, ...broadcastRange(slot.time) }))
    .filter(({ end }) => end > currentMinutes)
    .sort((a, b) => a.start - b.start)
    .slice(0, count)
    .map(({ slot, start, end }) => ({
      ...slot,
      startMinutes: start,
      endMinutes: end,
      isNowPlaying: start <= currentMinutes && currentMinutes < end,
    }));
}

export function mapScheduleSlot(doc: SanityScheduleSlot): ScheduleSlot | null {
  const slug = doc.programme?.slug?.current;
  const title = doc.programme?.title || doc.title;
  if (!title || !doc.startTime || !doc.endTime) return null;

  return {
    time: `${doc.startTime} - ${doc.endTime}`,
    title,
    category: doc.programme?.category || doc.category || 'UNCATEGORISED',
    ...(slug ? { slug } : {}),
    notes: doc.notes || '',
    isLive: Boolean(doc.isLive),
    image: urlForImage(doc.programme?.thumbnail) || '/hero_bg.jpg',
  };
}

// Broadcast days start at 06:00; times after midnight belong at the end of the day.
function broadcastMinutes(time: string): number {
  const start = parseTimeToMinutes(time.split('-')[0] || '');
  return start < 6 * 60 ? start + 24 * 60 : start;
}

export async function getWeeklySchedule(): Promise<Record<WeekDay, ScheduleSlot[]>> {
  const docs = await sanityFetch<SanityScheduleSlot[]>({
    query: weeklyScheduleQuery,
    tags: ['schedule'],
  });

  const week: Record<WeekDay, ScheduleSlot[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  for (const doc of docs ?? []) {
    if (!doc.day || !(weekDays as readonly string[]).includes(doc.day)) continue;
    const slot = mapScheduleSlot(doc);
    if (slot) week[doc.day as WeekDay].push(slot);
  }

  if (!weekDays.some((day) => week[day].length > 0)) {
    return Object.fromEntries(
      weekDays.map((day) => [day, legacyWeeklySchedule[day] ?? []]),
    ) as Record<WeekDay, ScheduleSlot[]>;
  }

  for (const day of weekDays) {
    week[day].sort((a, b) => broadcastMinutes(a.time) - broadcastMinutes(b.time));
  }

  return week;
}
