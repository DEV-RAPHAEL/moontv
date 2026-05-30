import { NextResponse } from 'next/server';
import {
  getNigeriaDayName,
  getNigeriaHourMinute,
  enrichSlotsWithNigeriaTime,
  weeklySchedule,
} from '@/lib/schedule';
import { programmes } from '@/lib/programmes';

export async function GET() {
  const day = getNigeriaDayName();
  const { hour, minute } = getNigeriaHourMinute();
  const currentNigeriaTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const currentMinutes = hour * 60 + minute;

  const rawSlots = weeklySchedule[day] || [];
  const enriched = enrichSlotsWithNigeriaTime(rawSlots);

  // Only return slots that haven't ended yet (on-air + upcoming)
  const relevantSlots = enriched.filter(s => (s.endMinutes ?? 0) > currentMinutes);

  // Attach programme images to each slot
  const slotsWithImages = relevantSlots.map(slot => {
    const programme = slot.slug ? programmes.find(p => p.slug === slot.slug) : null;
    return {
      ...slot,
      image: programme ? programme.image : '/hero_bg.jpg',
    };
  });

  return NextResponse.json({
    day,
    nigeriaTime: currentNigeriaTime,
    slots: slotsWithImages,
  });
}

