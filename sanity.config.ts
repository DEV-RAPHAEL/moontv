import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './src/sanity/env';

export default defineConfig({
  name: 'moontv',
  title: 'Moon TV',
  basePath: '/studio',
  projectId: projectId || 'replace-me',
  dataset,
  apiVersion,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
});
