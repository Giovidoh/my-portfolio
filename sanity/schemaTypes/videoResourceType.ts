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
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{ type: 'videoTopic' }],
      description: 'Groups the video on the Learning page. Leave empty for the "Other" group.',
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
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Planned', value: 'planned' },
        ],
        layout: 'radio',
      },
      description: 'Shown as a badge. The labels themselves live on the Learning Page.',
    }),
    i18nText('takeaway', 'What I took from it', { description: 'One or two sentences.' }),
    defineField({ name: 'url', title: 'Link', type: 'url' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first within the topic.',
      initialValue: 0,
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', author: 'author', platform: 'platform', topic: 'topic.title.0.value' },
    prepare: ({ title, author, platform, topic }) => ({
      title: title ?? 'Video',
      subtitle: [topic, author, platform].filter(Boolean).join(' · '),
    }),
  },
});
