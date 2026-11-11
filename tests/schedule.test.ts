import { describe, expect, it } from 'vitest';
import {
  getBroadcastDay,
  getOnAirAndUpcoming,
  minutesIntoBroadcastDay,
  type ScheduleSlot,
} from '../src/lib/schedule';

const slot = (time: string, title: string): ScheduleSlot => ({
  time,
  title,
  category: 'TEST',
});

describe('broadcast day', () => {
  it('starts at 06:00 and rolls before it', () => {
    expect(minutesIntoBroadcastDay(6, 0)).toBe(0);
    expect(minutesIntoBroadcastDay(0, 52)).toBe(1132);
    expect(minutesIntoBroadcastDay(5, 59)).toBe(1439);

    expect(getBroadcastDay('Tuesday', 0)).toBe('Monday');
    expect(getBroadcastDay('Tuesday', 6)).toBe('Tuesday');
  });
});

describe('getOnAirAndUpcoming', () => {
  it('starts at the show on air after midnight, not at 06:00', () => {
    const queue = getOnAirAndUpcoming(
      [
        slot('11:30 PM - 12:00 AM', 'Late Talk'),
        slot('12:30 AM - 01:00 AM', 'Late Drama'),
        slot('01:00 AM - 01:30 AM', 'Night Movie'),
        slot('05:00 AM - 06:00 AM', 'Early Playlist'),
        slot('06:00 AM - 06:30 AM', 'Morning'),
      ],
      minutesIntoBroadcastDay(0, 52),
    );

    // 06:00 AM belongs to the next broadcast day, so the queue stops there.
    expect(queue.map((s) => s.title)).toEqual([
      'Late Drama',
      'Night Movie',
      'Early Playlist',
    ]);
    expect(queue[0].isNowPlaying).toBe(true);
    expect(queue[1].isNowPlaying).toBe(false);
  });

  it('picks the daytime slot that covers now and the next four', () => {
    const slots = [
      slot('06:00 PM - 06:30 PM', 'Evening News'),
      slot('06:30 PM - 07:00 PM', 'Down Town'),
      slot('07:00 PM - 07:30 PM', 'Music'),
      slot('07:30 PM - 08:00 PM', 'Movie'),
      slot('08:00 PM - 08:30 PM', 'Talk'),
      slot('08:30 PM - 09:00 PM', 'Comedy'),
    ];

    const queue = getOnAirAndUpcoming(slots, minutesIntoBroadcastDay(18, 52), 5);

    expect(queue.map((s) => s.title)).toEqual([
      'Down Town',
      'Music',
      'Movie',
      'Talk',
      'Comedy',
    ]);
    expect(queue[0].isNowPlaying).toBe(true);
  });
});
