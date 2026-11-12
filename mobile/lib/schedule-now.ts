import type { ScheduleResponse, ScheduleSlot } from './types';

type SlotWindow = {
  start: number;
  end: number;
};

export type ScheduleNow = {
  currentSlot: ScheduleSlot | null;
  nextSlot: ScheduleSlot | null;
  progress: number;
};

function parseClock(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  if (minute > 59 || hour > 24) return null;
  if (match[3]) {
    if (hour < 1 || hour > 12) return null;
    const period = match[3].toUpperCase();
    hour = (hour % 12) + (period === 'PM' ? 12 : 0);
  }
  if (hour === 24 && minute !== 0) return null;
  return hour * 60 + minute;
}

function getWindow(slot: ScheduleSlot): SlotWindow | null {
  const parsed = slot.time
    .split(/\s*[-–—]\s*/)
    .map(parseClock);
  const start = slot.startMinutes ?? parsed[0];
  let end = slot.endMinutes ?? parsed[1];
  if (start === null || start === undefined || end === null || end === undefined) {
    return null;
  }
  if (end < start) end += 24 * 60;
  return { start, end };
}

function getNigeriaMinutes(value?: string): number {
  if (value) {
    const parsed = parseClock(value);
    if (parsed !== null) return parsed;
  }

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
  return hour * 60 + minute;
}

export function getScheduleNow(schedule: ScheduleResponse): ScheduleNow {
  const slots = schedule.slots ?? [];
  const now = getNigeriaMinutes(schedule.nigeriaTime);
  const windows = slots.map(getWindow);
  const currentIndex = slots.findIndex((slot, index) => {
    if (slot.isNowPlaying) return true;
    const window = windows[index];
    if (!window) return false;
    const current = now < window.start && window.end > 24 * 60 ? now + 24 * 60 : now;
    return current >= window.start && current < window.end;
  });
  const nextIndex = currentIndex >= 0
    ? slots.findIndex((_, index) => index > currentIndex)
    : slots.findIndex((_, index) => {
        const window = windows[index];
        return Boolean(window && window.start > now);
      });

  const currentSlot = currentIndex >= 0 ? slots[currentIndex] : null;
  const currentWindow = currentIndex >= 0 ? windows[currentIndex] : null;
  const currentTime =
    currentWindow && now < currentWindow.start && currentWindow.end > 24 * 60
      ? now + 24 * 60
      : now;
  const duration = currentWindow ? currentWindow.end - currentWindow.start : 0;
  const progress = currentWindow && duration > 0
    ? Math.max(0, Math.min(1, (currentTime - currentWindow.start) / duration))
    : 0;

  return {
    currentSlot,
    nextSlot: nextIndex >= 0 ? slots[nextIndex] : null,
    progress,
  };
}

export function getSlotWindow(slot: ScheduleSlot): SlotWindow | null {
  return getWindow(slot);
}

/**
 * Cached schedules carry the fetch time and live flags. Drop both so "now"
 * is recomputed from the device clock instead of a stale response.
 */
export function replaySchedule(schedule: ScheduleResponse): ScheduleResponse {
  const clearLive = (slots: ScheduleSlot[] | undefined) =>
    (slots ?? []).map((slot) => ({ ...slot, isNowPlaying: false }));
  return {
    ...schedule,
    nigeriaTime: undefined,
    slots: clearLive(schedule.slots),
    week: schedule.week
      ? Object.fromEntries(
          Object.entries(schedule.week).map(([day, slots]) => [day, clearLive(slots)]),
        )
      : undefined,
  };
}
