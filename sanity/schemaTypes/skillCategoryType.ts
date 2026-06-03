import { defineField, defineType } from 'sanity';
import { i18nString } from './i18n';

/**
 * A skill category drives the filter buttons in the Skills section. Categories
 * are data — add one here and it shows up as a filter, no code change required.
 */
export const skillCategoryType = defineType({
  name: 'skillCategory',
  title: 'Skill Categories',
  type: 'document',
  fields: [
    i18nString('title', 'Title', { description: 'Filter button label, e.g. "Frontend".' }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Stable lowercase identifier used for filtering (e.g. "frontend").',
      validation: (rule) => rule.required().lowercase(),
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'key', order: 'order' },
    prepare: ({ title, order }) => ({ title: title ?? 'category', subtitle: `#${order ?? 0}` }),
  },
});
