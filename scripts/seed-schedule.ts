/**
 * Adds the legacy weekly schedule to Sanity without replacing existing programmes.
 * Run with SANITY_SCHEDULE_SEED_DRY_RUN=true for a read-only preview.
 */
import { getCliClient } from 'sanity/cli';
import { programmes } from './legacy-programmes';
import { weeklySchedule } from './legacy-schedule';

const client = getCliClient({ apiVersion: '2025-01-01' });
const chunkSize = 50;
const dryRun = process.env.SANITY_SCHEDULE_SEED_DRY_RUN === 'true';

type ProgrammeRecord = {
  _id: string;
  slug: string;
};

type ProgrammeDocument = {
  _id: string;
  _type: 'programme';
  title: string;
  slug: { _type: 'slug'; current: string };
  summary: string;
  category: string;
  hosts: string[];
  isFeatured: boolean;
};

type ScheduleDocument = {
  _id: string;
  _type: 'scheduleSlot';
  programme?: { _type: 'reference'; _ref: string };
  title?: string;
  category?: string;
  day: string;
  startTime: string;
  endTime: string;
  isLive: boolean;
};

async function main() {
  const existingProgrammes = await client.fetch<ProgrammeRecord[]>(
    '*[_type == "programme" && defined(slug.current)]{_id, "slug": slug.current}',
  );
  const programmeIds = new Map(existingProgrammes.map((item) => [item.slug, item._id]));
  const legacyBySlug = new Map(programmes.map((item) => [item.slug, item]));
  const programmeDocsToCreate = new Map<string, ProgrammeDocument>();
  const scheduleDocs: ScheduleDocument[] = [];
  const missingSlugs = new Set<string>();
  let standaloneSlots = 0;
  let malformedTimes = 0;

  for (const [day, slots] of Object.entries(weeklySchedule)) {
    slots.forEach((slot, index) => {
      let programmeId: string | undefined;
      if (slot.slug) {
        programmeId = programmeIds.get(slot.slug);
        if (!programmeId) {
          const legacyProgramme = legacyBySlug.get(slot.slug);
          if (!legacyProgramme) {
            missingSlugs.add(slot.slug);
            return;
          }

          programmeId = `programme-${legacyProgramme.slug}`;
          programmeDocsToCreate.set(programmeId, {
            _id: programmeId,
            _type: 'programme',
            title: legacyProgramme.title,
            slug: { _type: 'slug', current: legacyProgramme.slug },
            summary: legacyProgramme.synopsis,
            category: legacyProgramme.category,
            hosts: legacyProgramme.notableCast,
            isFeatured: false,
          });
        }
      } else {
        standaloneSlots += 1;
      }

      const [startTime, endTime] = slot.time.split(/\s+-\s+/);
      if (!startTime || !endTime) {
        malformedTimes += 1;
        return;
      }

      scheduleDocs.push({
        _id: `schedule-${day.toLowerCase()}-${index}`,
        _type: 'scheduleSlot',
        ...(programmeId ? { programme: { _type: 'reference' as const, _ref: programmeId } } : {}),
        ...(!programmeId ? { title: slot.title, category: slot.category } : {}),
        day,
        startTime,
        endTime,
        isLive: false,
      });
    });
  }

  console.log(`Existing programme documents: ${existingProgrammes.length}`);
  console.log(`Missing programme documents to create if needed: ${programmeDocsToCreate.size}`);
  console.log(`Schedule slots to upsert: ${scheduleDocs.length}`);
  console.log(`Standalone playlist/movie slots: ${standaloneSlots}`);
  console.log(`Skipped malformed slots: ${malformedTimes}`);
  if (missingSlugs.size) console.warn(`Unknown programme slugs skipped: ${[...missingSlugs].sort().join(', ')}`);
  if (dryRun) {
    console.log('Dry run only; no Sanity documents were changed.');
    return;
  }

  if (!scheduleDocs.length) throw new Error('No valid schedule slots were prepared; Sanity was not changed.');

  for (const document of programmeDocsToCreate.values()) {
    await client.createIfNotExists(document);
  }

  for (let index = 0; index < scheduleDocs.length; index += chunkSize) {
    let transaction = client.transaction();
    for (const document of scheduleDocs.slice(index, index + chunkSize)) {
      transaction = transaction.createOrReplace(document);
    }
    await transaction.commit();
  }

  console.log(`Created missing programme documents: ${programmeDocsToCreate.size}`);
  console.log(`Upserted schedule slots: ${scheduleDocs.length}`);
}

main().catch((error) => {
  console.error('Sanity schedule seed failed:', error);
  process.exit(1);
});
