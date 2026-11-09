/**
 * Seeds Sanity with the legacy hard-coded programmes and weekly schedule.
 *
 * Run with a token that can write to the dataset:
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * Thumbnails are not uploaded from the old /public paths; add them in Studio.
 * Schedule entries without a programme slug (playlists, movies) and entries
 * whose slug has no matching programme are skipped and reported.
 */
import { getCliClient } from 'sanity/cli';
import { programmes } from './legacy-programmes';
import { weeklySchedule } from './legacy-schedule';

const client = getCliClient({ apiVersion: '2025-01-01' });
const chunkSize = 50;

const programmeDocs = programmes.map((programme) => ({
  _id: `programme-${programme.slug}`,
  _type: 'programme',
  title: programme.title,
  slug: { _type: 'slug', current: programme.slug },
  summary: programme.synopsis,
  category: programme.category,
  hosts: programme.notableCast,
  isFeatured: false,
}));

const programmeIds = new Map(
  programmes.map((programme) => [programme.slug, `programme-${programme.slug}`]),
);

type ScheduleDocument = {
  _id: string;
  _type: 'scheduleSlot';
  programme: { _type: 'reference'; _ref: string };
  day: string;
  startTime: string;
  endTime: string;
  isLive: boolean;
};

const scheduleDocs: ScheduleDocument[] = [];
const missingSlugs = new Set<string>();
let slotsWithoutProgramme = 0;

for (const [day, slots] of Object.entries(weeklySchedule)) {
  slots.forEach((slot, index) => {
    if (!slot.slug) {
      slotsWithoutProgramme += 1;
      return;
    }

    const programmeId = programmeIds.get(slot.slug);
    if (!programmeId) {
      missingSlugs.add(slot.slug);
      return;
    }

    const [startTime, endTime] = slot.time.split(/\s+-\s+/);
    if (!startTime || !endTime) {
      console.warn(`Skipping malformed time "${slot.time}" on ${day}`);
      return;
    }

    scheduleDocs.push({
      _id: `schedule-${day.toLowerCase()}-${index}`,
      _type: 'scheduleSlot',
      programme: { _type: 'reference', _ref: programmeId },
      day,
      startTime,
      endTime,
      isLive: false,
    });
  });
}

async function upsertDocuments(documents: { _id: string; _type: string }[]) {
  for (let i = 0; i < documents.length; i += chunkSize) {
    const chunk = documents.slice(i, i + chunkSize);
    let transaction = client.transaction();
    for (const document of chunk) {
      transaction = transaction.createOrReplace(document);
    }
    await transaction.commit();
  }
}

async function main() {
  await upsertDocuments(programmeDocs);
  console.log(`Seeded ${programmeDocs.length} programmes.`);

  await upsertDocuments(scheduleDocs);
  console.log(`Seeded ${scheduleDocs.length} schedule slots.`);

  if (slotsWithoutProgramme > 0) {
    console.warn(
      `Skipped ${slotsWithoutProgramme} playlist/movie slots with no programme reference.`,
    );
  }

  if (missingSlugs.size > 0) {
    console.warn(
      `Skipped schedule slots for missing programmes: ${[...missingSlugs].sort().join(', ')}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
