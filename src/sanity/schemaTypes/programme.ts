import { defineField, defineType } from 'sanity';
import { apiVersion } from '../env';

export const programme = defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const slug = value as { current?: string } | undefined;
          if (!slug?.current) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion });
          const id = document?._id?.replace(/^drafts\./, '') || '';
          const isUnique = await client.fetch<boolean>(
            `!defined(*[_type == "programme" && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`,
            { draft: `drafts.${id}`, published: id, slug: slug.current },
          );

          return isUnique || 'Slug must be unique';
        }),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'hosts',
      title: 'Host(s)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
});
