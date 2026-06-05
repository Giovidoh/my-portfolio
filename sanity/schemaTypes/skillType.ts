import { defineField, defineType } from 'sanity';
import { altField } from './helpers';

/**
 * A single skill / tool. The icon can be an uploaded image (light + optional dark
 * variant) or, as a fallback, a Simple Icons slug rendered from their CDN.
 */
export const skillType = defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Brand name (not translated), e.g. "React".',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'skillCategory' },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Logo for light mode (dark-inked).',
      fields: [altField()],
    }),
    defineField({
      name: 'iconDark',
      title: 'Icon (dark mode)',
      type: 'image',
      description: 'Optional light-inked variant shown in dark mode.',
      fields: [altField()],
    }),
    defineField({
      name: 'simpleIconSlug',
      title: 'Simple Icons slug',
      type: 'string',
      description: 'Fallback CDN icon when no image is uploaded, e.g. "nextdotjs" (cdn.simpleicons.org).',
    }),
    defineField({
      name: 'showInSkills',
      title: 'Show in the Skills section',
      type: 'boolean',
      initialValue: true,
      description:
        'On = shown in the "The stack I reach for" grid. Off = stays selectable for projects but hidden from that grid.',
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'icon' },
    prepare: ({ title, media }) => ({ title: title ?? 'Skill', media }),
  },
});
