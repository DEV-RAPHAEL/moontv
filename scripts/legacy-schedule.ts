/**
 * Moon TV Schedule Utility - Nigeria Standard Time (WAT, UTC+1)
 * All schedule logic uses Africa/Lagos timezone.
 */

export type ScheduleSlot = {
  time: string; // e.g. "06:30 AM - 07:00 AM"
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
 * Parses a slot time range like "06:00 AM - 07:00 AM" into start/end minutes.
 */
export function parseSlotTime(slotTime: string): { start: number; end: number } {
  const parts = slotTime.split('-').map(s => s.trim());
  let start = parseTimeToMinutes(parts[0] || '');
  let end = parseTimeToMinutes(parts[1] || '');
  if (end < start) end += 24 * 60; // handle overnight transition
  return { start, end };
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

  const relevant = enriched.filter(s => (s.endMinutes ?? 0) > currentMinutes);
  return relevant.slice(0, count);
}

/**
 * Official 2026 Weekly Schedule â€” mapped from Moon TV Broadcast Schedule 2026.xlsx
 */
export const weeklySchedule: Record<string, ScheduleSlot[]> = {
  Monday: [
    { time: "06:00 AM - 06:30 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "06:30 AM - 07:00 AM", title: "Enu Ofe", category: "DRAMA SERIES", slug: "enu-ofe" },
    { time: "07:00 AM - 07:30 AM", title: "The STEM Show", category: "EDUCATIONAL SHOW", slug: "the-stem-show" },
    { time: "07:30 AM - 08:00 AM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "08:00 AM - 08:30 AM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "08:30 AM - 09:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "09:00 AM - 09:30 AM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "09:30 AM - 10:00 AM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "10:00 AM - 10:30 AM", title: "Mid-Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "10:30 AM - 11:00 AM", title: "Enu Ofe", category: "DRAMA SERIES", slug: "enu-ofe" },
    { time: "11:00 AM - 11:30 AM", title: "The STEM Show", category: "EDUCATIONAL SHOW", slug: "the-stem-show" },
    { time: "11:30 AM - 12:00 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "12:00 PM - 12:30 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "12:30 PM - 01:00 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "01:00 PM - 03:00 PM", title: "Moon TV Matinee Movies", category: "FILMS" },
    { time: "03:00 PM - 04:00 PM", title: "Afternoon Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Enu Ofe", category: "DRAMA SERIES", slug: "enu-ofe" },
    { time: "04:30 PM - 05:00 PM", title: "The STEM Show", category: "EDUCATIONAL SHOW", slug: "the-stem-show" },
    { time: "05:00 PM - 05:30 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "05:30 PM - 06:00 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "06:00 PM - 06:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "06:30 PM - 07:00 PM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "07:00 PM - 07:30 PM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Family Heritage", category: "FAMILY DRAMA SERIES", slug: "family-heritage" },
    { time: "10:00 PM - 10:30 PM", title: "The STEM Show", category: "EDUCATIONAL SHOW", slug: "the-stem-show" },
    { time: "10:30 PM - 11:00 PM", title: "Tukunyan Arewa", category: "CULTURAL LIFESTYLE SHOW", slug: "tukunyan-arewa" },
    { time: "11:00 PM - 11:30 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "11:30 PM - 12:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "12:30 AM - 01:00 AM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "01:00 AM - 01:30 AM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "01:30 AM - 02:00 AM", title: "So Wrong So Wright", category: "COMEDY DRAMA SERIES", slug: "so-wrong-so-wright" },
    { time: "02:00 AM - 02:30 AM", title: "Crossed Roads", category: "DRAMA SERIES", slug: "crossed-roads" },
    { time: "02:30 AM - 03:00 AM", title: "Comfort Zone", category: "DRAMA SERIES", slug: "comfort-zone" },
    { time: "03:00 AM - 05:00 AM", title: "Moon TV Night Movies", category: "FILMS" },
    { time: "05:00 AM - 06:00 AM", title: "Early Morning Playlist", category: "MUSIC PLAYLIST" },
  ],
  Tuesday: [
    { time: "06:00 AM - 06:30 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "06:30 AM - 07:00 AM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "07:00 AM - 07:30 AM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "07:30 AM - 08:00 AM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "08:00 AM - 08:30 AM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "08:30 AM - 09:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "09:00 AM - 09:30 AM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "09:30 AM - 10:00 AM", title: "In My Closet", category: "ANTHOLOGY DRAMA SERIES", slug: "in-my-closet" },
    { time: "10:00 AM - 10:30 AM", title: "Mid-Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "10:30 AM - 11:00 AM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "11:00 AM - 11:30 AM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "11:30 AM - 12:00 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "12:00 PM - 12:30 PM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "12:30 PM - 01:00 PM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "01:00 PM - 03:00 PM", title: "Moon TV Matinee Movies", category: "FILMS" },
    { time: "03:00 PM - 04:00 PM", title: "Afternoon Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "04:30 PM - 05:00 PM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "05:00 PM - 05:30 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "05:30 PM - 06:00 PM", title: "Wives Roundtable", category: "STUDIO TALK SHOW", slug: "wives-roundtable" },
    { time: "06:00 PM - 06:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "06:30 PM - 07:00 PM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "07:00 PM - 07:30 PM", title: "In My Closet", category: "ANTHOLOGY DRAMA SERIES", slug: "in-my-closet" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "10:00 PM - 10:30 PM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "10:30 PM - 11:00 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "11:00 PM - 11:30 PM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "11:30 PM - 12:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "12:30 AM - 01:00 AM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "01:00 AM - 01:30 AM", title: "In My Closet", category: "ANTHOLOGY DRAMA SERIES", slug: "in-my-closet" },
    { time: "01:30 AM - 02:00 AM", title: "So Wrong So Wright", category: "COMEDY DRAMA SERIES", slug: "so-wrong-so-wright" },
    { time: "02:00 AM - 02:30 AM", title: "Crossed Roads", category: "DRAMA SERIES", slug: "crossed-roads" },
    { time: "02:30 AM - 03:00 AM", title: "Comfort Zone", category: "DRAMA SERIES", slug: "comfort-zone" },
    { time: "03:00 AM - 05:00 AM", title: "Moon TV Night Movies", category: "FILMS" },
    { time: "05:00 AM - 06:00 AM", title: "Early Morning Playlist", category: "MUSIC PLAYLIST" },
  ],
  Wednesday: [
    { time: "06:00 AM - 06:30 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "06:30 AM - 07:00 AM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "07:00 AM - 07:30 AM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "07:30 AM - 08:00 AM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "08:00 AM - 08:30 AM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "08:30 AM - 09:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "09:00 AM - 09:30 AM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "09:30 AM - 10:00 AM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "10:00 AM - 10:30 AM", title: "Mid-Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "10:30 AM - 11:00 AM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "11:00 AM - 11:30 AM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "11:30 AM - 12:00 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "12:00 PM - 12:30 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "12:30 PM - 01:00 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "01:00 PM - 03:00 PM", title: "Moon TV Matinee Movies", category: "FILMS" },
    { time: "03:00 PM - 04:00 PM", title: "Afternoon Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "04:30 PM - 05:00 PM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "05:00 PM - 05:30 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "05:30 PM - 06:00 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "06:00 PM - 06:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "06:30 PM - 07:00 PM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "07:00 PM - 07:30 PM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "10:00 PM - 10:30 PM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "10:30 PM - 11:00 PM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
    { time: "11:00 PM - 11:30 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "11:30 PM - 12:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "12:30 AM - 01:00 AM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "01:00 AM - 01:30 AM", title: "Down Town", category: "DRAMA SERIES", slug: "down-town" },
    { time: "01:30 AM - 02:00 AM", title: "So Wrong So Wright", category: "COMEDY DRAMA SERIES", slug: "so-wrong-so-wright" },
    { time: "02:00 AM - 02:30 AM", title: "Crossed Roads", category: "DRAMA SERIES", slug: "crossed-roads" },
    { time: "02:30 AM - 03:00 AM", title: "Comfort Zone", category: "DRAMA SERIES", slug: "comfort-zone" },
    { time: "03:00 AM - 05:00 AM", title: "Moon TV Night Movies", category: "FILMS" },
    { time: "05:00 AM - 06:00 AM", title: "Early Morning Playlist", category: "MUSIC PLAYLIST" },
  ],
  Thursday: [
    { time: "06:00 AM - 06:30 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "06:30 AM - 07:00 AM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "07:00 AM - 07:30 AM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "07:30 AM - 08:00 AM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "08:00 AM - 08:30 AM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "08:30 AM - 09:00 AM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "09:00 AM - 09:30 AM", title: "Wives Roundtable", category: "STUDIO TALK SHOW", slug: "wives-roundtable" },
    { time: "09:30 AM - 10:00 AM", title: "In My Closet", category: "ANTHOLOGY DRAMA SERIES", slug: "in-my-closet" },
    { time: "10:00 AM - 10:30 AM", title: "Mid-Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "10:30 AM - 11:00 AM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "11:00 AM - 11:30 AM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "11:30 AM - 12:00 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "12:00 PM - 12:30 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "12:30 PM - 01:00 PM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "01:00 PM - 03:00 PM", title: "Moon TV Matinee Movies", category: "FILMS" },
    { time: "03:00 PM - 04:00 PM", title: "Afternoon Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "04:30 PM - 05:00 PM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "05:00 PM - 05:30 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "05:30 PM - 06:00 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "06:00 PM - 06:30 PM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "06:30 PM - 07:00 PM", title: "Wives Roundtable", category: "STUDIO TALK SHOW", slug: "wives-roundtable" },
    { time: "07:00 PM - 07:30 PM", title: "In My Closet", category: "ANTHOLOGY DRAMA SERIES", slug: "in-my-closet" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "10:00 PM - 10:30 PM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "10:30 PM - 11:00 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "11:00 PM - 11:30 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "11:30 PM - 12:00 AM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "12:30 AM - 01:00 AM", title: "Wives Roundtable", category: "STUDIO TALK SHOW", slug: "wives-roundtable" },
    { time: "01:00 AM - 01:30 AM", title: "In My Closet", category: "ANTHOLOGY DRAMA SERIES", slug: "in-my-closet" },
    { time: "01:30 AM - 02:00 AM", title: "So Wrong So Wright", category: "COMEDY DRAMA SERIES", slug: "so-wrong-so-wright" },
    { time: "02:00 AM - 02:30 AM", title: "Crossed Roads", category: "DRAMA SERIES", slug: "crossed-roads" },
    { time: "02:30 AM - 03:00 AM", title: "Comfort Zone", category: "DRAMA SERIES", slug: "comfort-zone" },
    { time: "03:00 AM - 05:00 AM", title: "Moon TV Night Movies", category: "FILMS" },
    { time: "05:00 AM - 06:00 AM", title: "Early Morning Playlist", category: "MUSIC PLAYLIST" },
  ],
  Friday: [
    { time: "06:00 AM - 06:30 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "06:30 AM - 07:00 AM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "07:00 AM - 07:30 AM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "07:30 AM - 08:00 AM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "08:00 AM - 08:30 AM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "08:30 AM - 09:00 AM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "09:00 AM - 09:30 AM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "09:30 AM - 10:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "10:00 AM - 10:30 AM", title: "Mid-Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "10:30 AM - 11:00 AM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "11:00 AM - 11:30 AM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "11:30 AM - 12:00 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "12:00 PM - 12:30 PM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "12:30 PM - 01:00 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "01:00 PM - 03:00 PM", title: "Moon TV Matinee Movies", category: "FILMS" },
    { time: "03:00 PM - 04:00 PM", title: "Afternoon Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "04:30 PM - 05:00 PM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "05:00 PM - 05:30 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "05:30 PM - 06:00 PM", title: "Young Chef", category: "CULINARY COMPETITION SHOW", slug: "young-chef" },
    { time: "06:00 PM - 06:30 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "06:30 PM - 07:00 PM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "07:00 PM - 07:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "10:00 PM - 10:30 PM", title: "Tomorrow Is Now", category: "FAMILY DRAMA SERIES", slug: "tomorrow-is-now" },
    { time: "10:30 PM - 11:00 PM", title: "Tukunyan Arewa", category: "CULTURAL LIFESTYLE SHOW", slug: "tukunyan-arewa" },
    { time: "11:00 PM - 11:30 PM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "11:30 PM - 12:00 AM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "12:30 AM - 01:00 AM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "01:00 AM - 01:30 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "01:30 AM - 02:00 AM", title: "So Wrong So Wright", category: "COMEDY DRAMA SERIES", slug: "so-wrong-so-wright" },
    { time: "02:00 AM - 02:30 AM", title: "Crossed Roads", category: "DRAMA SERIES", slug: "crossed-roads" },
    { time: "02:30 AM - 03:00 AM", title: "Comfort Zone", category: "DRAMA SERIES", slug: "comfort-zone" },
    { time: "03:00 AM - 05:00 AM", title: "Moon TV Night Movies", category: "FILMS" },
    { time: "05:00 AM - 06:00 AM", title: "Early Morning Playlist", category: "MUSIC PLAYLIST" },
  ],
  Saturday: [
    { time: "06:00 AM - 06:30 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "06:30 AM - 07:00 AM", title: "Tukunyan Arewa", category: "CULTURAL LIFESTYLE SHOW", slug: "tukunyan-arewa" },
    { time: "07:00 AM - 07:30 AM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "07:30 AM - 08:00 AM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "08:00 AM - 08:30 AM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "08:30 AM - 09:00 AM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "09:00 AM - 09:30 AM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "09:30 AM - 10:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "10:00 AM - 10:30 AM", title: "Mid-Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "10:30 AM - 11:00 AM", title: "Tukunyan Arewa", category: "CULTURAL LIFESTYLE SHOW", slug: "tukunyan-arewa" },
    { time: "11:00 AM - 11:30 AM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "11:30 AM - 12:00 PM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "12:00 PM - 12:30 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "12:30 PM - 01:00 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "01:00 PM - 03:00 PM", title: "Moon TV Matinee Movies", category: "FILMS" },
    { time: "03:00 PM - 04:00 PM", title: "Afternoon Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Tukunyan Arewa", category: "CULTURAL LIFESTYLE SHOW", slug: "tukunyan-arewa" },
    { time: "04:30 PM - 05:00 PM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "05:00 PM - 05:30 PM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "05:30 PM - 06:00 PM", title: "Young Scholars", category: "YOUTH ENTERTAINMENT SHOW", slug: "young-scholars" },
    { time: "06:00 PM - 06:30 PM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "06:30 PM - 07:00 PM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "07:00 PM - 07:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Tukunyan Arewa", category: "CULTURAL LIFESTYLE SHOW", slug: "tukunyan-arewa" },
    { time: "10:00 PM - 10:30 PM", title: "Class of Kabuki", category: "DRAMA & ENTERTAINMENT", slug: "class-of-kabuki" },
    { time: "10:30 PM - 11:00 PM", title: "Health Monitor", category: "HEALTH & LIFESTYLE SHOW", slug: "health-monitor" },
    { time: "11:00 PM - 11:30 PM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
    { time: "11:30 PM - 12:00 AM", title: "The Triple M Show", category: "ENTERTAINMENT & LIFESTYLE SHOW", slug: "the-triple-m-show" },
    { time: "12:30 AM - 01:00 AM", title: "Creative Control", category: "CREATIVE & ARTS SHOW", slug: "creative-control" },
    { time: "01:00 AM - 01:30 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "01:30 AM - 02:00 AM", title: "So Wrong So Wright", category: "COMEDY DRAMA SERIES", slug: "so-wrong-so-wright" },
    { time: "02:00 AM - 02:30 AM", title: "Crossed Roads", category: "DRAMA SERIES", slug: "crossed-roads" },
    { time: "02:30 AM - 03:00 AM", title: "Comfort Zone", category: "DRAMA SERIES", slug: "comfort-zone" },
    { time: "03:00 AM - 05:00 AM", title: "Moon TV Night Movies", category: "FILMS" },
    { time: "05:00 AM - 06:00 AM", title: "Early Morning Playlist", category: "MUSIC PLAYLIST" },
  ],
  Sunday: [
    { time: "06:00 AM - 06:30 AM", title: "Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "06:30 AM - 07:00 AM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
    { time: "07:00 AM - 07:30 AM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "07:30 AM - 08:00 AM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "08:00 AM - 08:30 AM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "08:30 AM - 09:00 AM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "09:00 AM - 09:30 AM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "09:30 AM - 10:00 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "10:00 AM - 10:30 AM", title: "Mid-Morning Playlist", category: "MUSIC PLAYLIST" },
    { time: "10:30 AM - 11:00 AM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
    { time: "11:00 AM - 11:30 AM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "11:30 AM - 12:00 PM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "12:00 PM - 12:30 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "12:30 PM - 01:00 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "01:00 PM - 03:00 PM", title: "Moon TV Matinee Movies", category: "FILMS" },
    { time: "03:00 PM - 04:00 PM", title: "Afternoon Playlist", category: "MUSIC PLAYLIST" },
    { time: "04:00 PM - 04:30 PM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
    { time: "04:30 PM - 05:00 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "05:00 PM - 05:30 PM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "05:30 PM - 06:00 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "06:00 PM - 06:30 PM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "06:30 PM - 07:00 PM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "07:00 PM - 07:30 PM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "07:30 PM - 09:30 PM", title: "Moon TV Prime Movies", category: "FILMS" },
    { time: "09:30 PM - 10:00 PM", title: "Kilanse", category: "CULINARY LIFESTYLE SHOW", slug: "kilanse" },
    { time: "10:00 PM - 10:30 PM", title: "Awada Express", category: "COMEDY SHOW", slug: "awada-express" },
    { time: "10:30 PM - 11:00 PM", title: "Mother's World", category: "LIFESTYLE & WELLNESS SHOW", slug: "mothers-world" },
    { time: "11:00 PM - 11:30 PM", title: "Youth Network", category: "YOUTH TALK SHOW", slug: "youth-network" },
    { time: "11:30 PM - 12:00 AM", title: "Get to Know", category: "EDUCATIONAL PROGRAM", slug: "get-to-know" },
    { time: "12:30 AM - 01:00 AM", title: "My Tomorrow Drama Series", category: "FAMILY DRAMA ANTHOLOGY", slug: "my-tomorrow-drama-series" },
    { time: "01:00 AM - 01:30 AM", title: "Hello Nigeria", category: "TALK SHOW", slug: "hello-nigeria" },
    { time: "01:30 AM - 02:00 AM", title: "So Wrong So Wright", category: "COMEDY DRAMA SERIES", slug: "so-wrong-so-wright" },
    { time: "02:00 AM - 02:30 AM", title: "Crossed Roads", category: "DRAMA SERIES", slug: "crossed-roads" },
    { time: "02:30 AM - 03:00 AM", title: "Comfort Zone", category: "DRAMA SERIES", slug: "comfort-zone" },
    { time: "03:00 AM - 05:00 AM", title: "Moon TV Night Movies", category: "FILMS" },
    { time: "05:00 AM - 06:00 AM", title: "Early Morning Playlist", category: "MUSIC PLAYLIST" },
  ],
};
