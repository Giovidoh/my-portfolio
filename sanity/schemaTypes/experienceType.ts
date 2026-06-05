import { defineArrayMember, defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';

/** A single role in the experience timeline. */
export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    i18nString('short', 'Short title', {
      description: 'Compact label in the left rail, e.g. "Senior Full-Stack Dev".',
    }),
    i18nString('role', 'Role'),
    i18nString('period', 'Period & location', {
      description: 'e.g. "2023 — Present · Paris".',
    }),
    i18nText('description', 'Description'),
    defineField({
      name: 'stack',
      title: 'Stack',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent at the top).',
      initialValue: 0,
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'company', order: 'order' },
    prepare: ({ title, order }) => ({ title: title ?? 'Experience', subtitle: `#${order ?? 0}` }),
  },
});
