import { defineField, defineType } from 'sanity';
import { i18nText } from './i18n';

/** A course, talk or series followed on video — listed on the Learning page. */
export const videoResourceType = defineType({
  name: 'videoResource',
  title: 'Video resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The video or series title (not translated).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / channel',
      type: 'string',
      description: 'e.g. "Patrick Collins".',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'e.g. "YouTube", "Cyfrin Updraft", "Frontend Masters".',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "32 h" — optional.',
    }),
    i18nText('takeaway', 'What I took from it', { description: 'One or two sentences.' }),
    defineField({ name: 'url', title: 'Link', type: 'url' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', author: 'author', platform: 'platform' },
    prepare: ({ title, author, platform }) => ({
      title: title ?? 'Video',
      subtitle: [author, platform].filter(Boolean).join(' · '),
    }),
  },
});
