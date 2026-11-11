/**
 * Uploads the bundled programme images and docx descriptions into Sanity.
 *
 * Run with a token that can write to the dataset:
 *   npx sanity exec scripts/import-media.ts --with-user-token
 *
 * Only sets `thumbnail` and `description`, so fields edited in Studio are kept.
 * Safe to re-run: Sanity de-duplicates identical uploads by file hash.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getCliClient } from 'sanity/cli';
import { legacyDescriptions } from './legacy-descriptions';
import { programmes } from './legacy-programmes';

const client = getCliClient({ apiVersion: '2025-01-01' });

const blocks = (slug: string) =>
  (legacyDescriptions[slug] ?? []).map((text, index) => ({
    _type: 'block',
    _key: `p${index}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${index}`, text, marks: [] }],
  }));

let images = 0;
let described = 0;
const failures: string[] = [];

for (const programme of programmes) {
  const file = path.join('public', programme.image);
  const id = `programme-${programme.slug}`;

  try {
    if (!fs.existsSync(file)) {
      throw new Error(`image not found: ${file}`);
    }

    if (programme.image === '/hero_bg.jpg') {
      console.log(`skip ${programme.slug} (placeholder image, add a thumbnail in Studio)`);
      continue;
    }

    const asset = await client.assets.upload('image', fs.createReadStream(file), {
      filename: path.basename(file),
    });
    images += 1;

    const description = blocks(programme.slug);
    if (description.length > 0) described += 1;

    await client
      .patch(id)
      .set({
        thumbnail: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
        ...(description.length > 0 ? { description } : {}),
      })
      .commit();

    console.log(`ok ${programme.slug} (${description.length} description blocks)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${programme.slug}: ${message}`);
    console.error(`fail ${programme.slug}: ${message}`);
  }
}

console.log(`\nthumbnails uploaded: ${images}/${programmes.length}`);
console.log(`descriptions set: ${described}/${programmes.length}`);
if (failures.length > 0) {
  console.error(`\n${failures.length} failures:`);
  failures.forEach((failure) => console.error(`  ${failure}`));
  process.exitCode = 1;
}
