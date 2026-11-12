import { describe, expect, it } from 'vitest';
import { replaySchedule } from '../mobile/lib/schedule-now';
import type { ScheduleResponse } from '../mobile/lib/types';

describe('offline schedule cache', () => {
  it('drops the stale clock and live flags without mutating the cache', () => {
    const cached: ScheduleResponse = {
      day: 'Monday',
      nigeriaTime: '10:00',
      slots: [{ time: '09:00 - 11:00', title: 'Morning Show', category: 'News', isNowPlaying: true }],
      week: { Tuesday: [{ time: '10:00 - 12:00', title: 'Talk', category: 'Talk', isNowPlaying: true }] },
    };

    const replay = replaySchedule(cached);

    expect(replay.nigeriaTime).toBeUndefined();
    expect(replay.slots[0].isNowPlaying).toBe(false);
    expect(replay.week?.Tuesday?.[0].isNowPlaying).toBe(false);
    expect(cached.slots[0].isNowPlaying).toBe(true);
    expect(cached.nigeriaTime).toBe('10:00');
  });
});
