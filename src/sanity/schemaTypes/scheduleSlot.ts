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
      validation: (Rule) => Rule.required(),
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
      subtitle: 'day',
      description: 'startTime',
    },
    prepare: ({ title, subtitle, description }) => ({
      title: title || 'Untitled slot',
      subtitle: `${subtitle || ''} ${description || ''}`.trim(),
    }),
  },
});
