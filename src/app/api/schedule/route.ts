import { NextResponse } from 'next/server';
import {
  getNigeriaDayName,
  getNigeriaHourMinute,
  enrichSlotsWithNigeriaTime,
  getWeeklySchedule,
} from '@/lib/schedule';

export async function GET() {
  const day = getNigeriaDayName();
  const { hour, minute } = getNigeriaHourMinute();
  const currentNigeriaTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const currentMinutes = hour * 60 + minute;

  const week = await getWeeklySchedule();
  const enriched = enrichSlotsWithNigeriaTime(week[day as keyof typeof week] ?? []);

  // Only return slots that haven't ended yet (on-air + upcoming)
  const slots = enriched.filter((s) => (s.endMinutes ?? 0) > currentMinutes);

  return NextResponse.json({
    day,
    nigeriaTime: currentNigeriaTime,
    slots,
  });
}
