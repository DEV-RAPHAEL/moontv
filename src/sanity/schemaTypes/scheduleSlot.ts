import { defineField, defineType } from 'sanity';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const scheduleSlot = defineType({
  name: 'scheduleSlot',
  title: 'Schedule slot',
  type: 'document',
  fields: [
    defineField({
      name: 'programme',
      title: 'Programme',
      type: 'reference',
      to: [{ type: 'programme' }],
    }),
    defineField({
      name: 'title',
      title: 'Standalone title',
      type: 'string',
      description: 'Use for schedule blocks without a programme reference, such as playlists or movie blocks.',
      hidden: ({ parent }) => Boolean(parent?.programme),
    }),
    defineField({
      name: 'category',
      title: 'Standalone category',
      type: 'string',
      hidden: ({ parent }) => Boolean(parent?.programme),
    }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: { list: days, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start time',
      type: 'string',
      description: 'Format: 06:00 AM',
      validation: (Rule) =>
        Rule.required().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, {
          name: 'time',
          invert: false,
        }),
    }),
    defineField({
      name: 'endTime',
      title: 'End time',
      type: 'string',
      description: 'Format: 06:30 AM',
      validation: (Rule) =>
        Rule.required().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, {
          name: 'time',
          invert: false,
        }),
    }),
    defineField({
      name: 'isLive',
      title: 'Live',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'programme.title',
      standaloneTitle: 'title',
      subtitle: 'day',
      description: 'startTime',
    },
    prepare: ({ title, standaloneTitle, subtitle, description }) => ({
      title: title || standaloneTitle || 'Untitled slot',
      subtitle: `${subtitle || ''} ${description || ''}`.trim(),
    }),
  },
});
