// Shapes returned by the web app's route handlers. Keep in sync with
// src/app/api/programmes/route.ts and src/app/api/schedule/route.ts.

export type Programme = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  synopsis: string;
  notableCast: string[];
  isFeatured: boolean;
  description: unknown[];
};

export type ProgrammesResponse =
  | { success: true; programmes: Programme[] }
  | { error: string };

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

export type ScheduleResponse = {
  day: string;
  nigeriaTime?: string;
  slots: ScheduleSlot[];
  week?: Partial<Record<WeekDay, ScheduleSlot[]>>;
};

export type WeekDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const WEEK_DAYS: readonly WeekDay[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
