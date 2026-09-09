import { defineArrayMember, defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';

/** One open-source project contributed to, listed on the Learning page. */
export const openSourceType = defineType({
  name: 'openSource',
  title: 'Open-source contribution',
  type: 'document',
  fields: [
    defineField({
      name: 'project',
      title: 'Project',
      type: 'string',
      description: 'e.g. "Foundry" (not translated).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'repo',
      title: 'Repository',
      type: 'string',
      description: 'e.g. "foundry-rs/foundry" — shown under the project name.',
    }),
    i18nString('role', 'Contribution type', {
      description: 'e.g. "Correctifs & documentation" / "Bug fixes & docs".',
    }),
    i18nText('description', 'What I contributed', { description: 'Two or three sentences.' }),
    defineField({
      name: 'stack',
      title: 'Stack',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'url', title: 'Link', type: 'url', description: 'Repo, PR or profile.' }),
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
    select: { title: 'project', subtitle: 'repo' },
  },
});
