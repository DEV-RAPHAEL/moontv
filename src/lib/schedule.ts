/**
 * Moon TV Schedule Utility — Nigeria Standard Time (WAT, UTC+1)
 * All schedule logic uses Africa/Lagos timezone.
 */

export type ScheduleSlot = {
  time: string; // e.g. "06:00 AM - 10:00 AM"
  title: string;
  category: string;
  slug?: string;
  isNowPlaying?: boolean;
  startMinutes?: number; // minutes since midnight
  endMinutes?: number;
};

/**
 * Returns the current Date object adjusted to Nigeria Standard Time (UTC+1).
 * Works on both server and client regardless of host timezone.
 */
export function getNigeriaDate(): Date {
  // Use Intl to compute what time it is in Lagos right now
  const now = new Date();
  const nigeriaStr = now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
  return new Date(nigeriaStr);
}

/**
 * Returns the current day name in Nigeria time.
 */
export function getNigeriaDayName(): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const lagosDay = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  return days[lagosDay.getDay()];
}

/**
 * Returns current hours and minutes in Nigeria time (24h format).
 */
export function getNigeriaHourMinute(): { hour: number; minute: number } {
  const now = new Date();
  const lagosDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  return { hour: lagosDate.getHours(), minute: lagosDate.getMinutes() };
}

/**
 * Parses a time string like "06:00 AM" into minutes since midnight.
 */
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

/**
 * Parses a slot time range like "06:00 AM - 10:00 AM" into start/end minutes.
 */
export function parseSlotTime(slotTime: string): { start: number; end: number } {
  const parts = slotTime.split('-').map(s => s.trim());
  return {
    start: parseTimeToMinutes(parts[0] || ''),
    end: parseTimeToMinutes(parts[1] || ''),
  };
}

/**
 * Enriches schedule slots with startMinutes/endMinutes and marks isNowPlaying
 * based on current Nigeria time.
 */
export function enrichSlotsWithNigeriaTime(slots: ScheduleSlot[]): ScheduleSlot[] {
  const { hour, minute } = getNigeriaHourMinute();
  const currentMinutes = hour * 60 + minute;

  return slots.map(slot => {
    const { start, end } = parseSlotTime(slot.time);
    const isNowPlaying = currentMinutes >= start && currentMinutes < end;
    return { ...slot, startMinutes: start, endMinutes: end, isNowPlaying };
  });
}

/**
 * Returns slots that are currently on air or upcoming (in order),
 * limited to a given count.
 */
export function getOnAirAndUpcoming(slots: ScheduleSlot[], count = 5): ScheduleSlot[] {
  const enriched = enrichSlotsWithNigeriaTime(slots);
  const { hour, minute } = getNigeriaHourMinute();
  const currentMinutes = hour * 60 + minute;

  // Find the currently playing slot or the next upcoming one
  const relevant = enriched.filter(s => (s.endMinutes ?? 0) > currentMinutes);
  return relevant.slice(0, count);
}

/**
 * Full weekly schedule — all 7 days with their broadcast slots.
 */
export const weeklySchedule: Record<string, ScheduleSlot[]> = {
  Monday: [
    { time: "06:00 AM - 10:00 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Enu Ofe", category: "DRAMA SERIES", slug: "enu-ofe" },
    { time: "04:30 PM - 05:00 PM", title: "The STEM Show", category: "EDUCATIONAL SHOW", slug: "the-stem-show" },
    { time: "05:00 PM - 05:30 PM", title: "Young Scholars", category: "YOUTH-CENTERED ENTERTAINMENT PROGRAM", slug: "young-scholars" },
    { time: "05:30 PM - 06:00 PM", title: "The Triple M Show", category: "ENTERTAINMENT AND LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "06:00 PM - 06:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "06:30 PM - 07:00 PM", title: "Creative Control", category: "TALK SHOW", slug: "creative-control" },
    { time: "07:00 PM - 07:30 PM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Family Heritage", category: "FAMILY DRAMA SERIES", slug: "family-heritage" },
  ],
  Tuesday: [
    { time: "06:00 AM - 10:00 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "04:30 PM - 05:00 PM", title: "Health Monitor", category: "HEALTH AND LIFESTYLE PROGRAM", slug: "health-monitor" },
    { time: "05:00 PM - 05:30 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "05:30 PM - 06:00 PM", title: "Wives Roundtable", category: "STUDIO-BASED TALK SHOW", slug: "wives-roundtable" },
    { time: "06:00 PM - 06:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "06:30 PM - 07:00 PM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY SERIES", slug: "my-tomorrow-drama-series" },
    { time: "07:00 PM - 07:30 PM", title: "In My Closet", category: "ANTHOLOGY-STYLE DRAMA SERIES", slug: "in-my-closet" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
  ],
  Wednesday: [
    { time: "06:00 AM - 10:00 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Mother's World", category: "LIFESTYLE AND WELLNESS PROGRAM", slug: "mothers-world" },
    { time: "04:30 PM - 05:00 PM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "05:00 PM - 05:30 PM", title: "Young Scholars", category: "YOUTH-CENTERED ENTERTAINMENT PROGRAM", slug: "young-scholars" },
    { time: "05:30 PM - 06:00 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "06:00 PM - 06:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "06:30 PM - 07:00 PM", title: "Creative Control", category: "TALK SHOW", slug: "creative-control" },
    { time: "07:00 PM - 07:30 PM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Mother's World", category: "LIFESTYLE AND WELLNESS PROGRAM", slug: "mothers-world" },
  ],
  Thursday: [
    { time: "06:00 AM - 10:00 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "04:30 PM - 05:00 PM", title: "Health Monitor", category: "HEALTH AND LIFESTYLE PROGRAM", slug: "health-monitor" },
    { time: "05:00 PM - 05:30 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "05:30 PM - 06:00 PM", title: "The Triple M Show", category: "ENTERTAINMENT AND LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "06:00 PM - 06:30 PM", title: "COK", category: "ENTERTAINMENT PROGRAM", slug: "cok" },
    { time: "06:30 PM - 07:00 PM", title: "Wives Roundtable", category: "STUDIO-BASED TALK SHOW", slug: "wives-roundtable" },
    { time: "07:00 PM - 07:30 PM", title: "In My Closet", category: "ANTHOLOGY-STYLE DRAMA SERIES", slug: "in-my-closet" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
  ],
  Friday: [
    { time: "06:00 AM - 10:00 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Mother's World", category: "LIFESTYLE AND WELLNESS PROGRAM", slug: "mothers-world" },
    { time: "04:30 PM - 05:00 PM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "05:00 PM - 05:30 PM", title: "Young Scholars", category: "YOUTH-CENTERED ENTERTAINMENT PROGRAM", slug: "young-scholars" },
    { time: "05:30 PM - 06:00 PM", title: "Young Chef", category: "CULINARY SHOW", slug: "young-chef" },
    { time: "06:00 PM - 06:30 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "06:30 PM - 07:00 PM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY SERIES", slug: "my-tomorrow-drama-series" },
    { time: "07:00 PM - 07:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Mother's World", category: "LIFESTYLE AND WELLNESS PROGRAM", slug: "mothers-world" },
  ],
  Saturday: [
    { time: "06:00 AM - 10:00 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Tukunyan Arewa", category: "CULTURAL SHOW", slug: "tukunyan-arewa" },
    { time: "04:30 PM - 05:00 PM", title: "COK", category: "ENTERTAINMENT PROGRAM", slug: "cok" },
    { time: "05:00 PM - 05:30 PM", title: "Health Monitor", category: "HEALTH AND LIFESTYLE PROGRAM", slug: "health-monitor" },
    { time: "05:30 PM - 06:00 PM", title: "Young Scholars", category: "YOUTH-CENTERED ENTERTAINMENT PROGRAM", slug: "young-scholars" },
    { time: "06:00 PM - 06:30 PM", title: "The Triple M Show", category: "ENTERTAINMENT AND LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "06:30 PM - 07:00 PM", title: "Creative Control", category: "TALK SHOW", slug: "creative-control" },
    { time: "07:00 PM - 07:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Tukunyan Arewa", category: "CULTURAL SHOW", slug: "tukunyan-arewa" },
  ],
  Sunday: [
    { time: "06:00 AM - 10:00 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
    { time: "04:30 PM - 05:00 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "05:00 PM - 05:30 PM", title: "Mother's World", category: "LIFESTYLE AND WELLNESS PROGRAM", slug: "mothers-world" },
    { time: "05:30 PM - 06:00 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "06:00 PM - 06:30 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "06:30 PM - 07:00 PM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY SERIES", slug: "my-tomorrow-drama-series" },
    { time: "07:00 PM - 07:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
  ],
};
