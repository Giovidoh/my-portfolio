import { defineField, defineType } from 'sanity';
import { i18nString } from './i18n';

/**
 * A subject the video resources on the Learning page are grouped under
 * (e.g. "Angular", "Solidity"). Topics are data — add one here and it shows up
 * as a group heading, no code change required.
 */
export const videoTopicType = defineType({
  name: 'videoTopic',
  title: 'Video topics',
  type: 'document',
  fields: [
    i18nString('title', 'Title', { description: 'Group heading, e.g. "Angular".' }),
    i18nString('note', 'Note', {
      description: 'Optional one-liner under the heading, e.g. "Currently learning".',
    }),
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
    select: { title: 'title.0.value', order: 'order' },
    prepare: ({ title, order }) => ({ title: title ?? 'Topic', subtitle: `#${order ?? 0}` }),
  },
});
