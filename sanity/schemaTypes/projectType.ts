import { defineArrayMember, defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';
import { altField } from './helpers';

/**
 * A portfolio project. Drives both the Work grid (overview fields) and the
 * project detail / case-study page (case fields, gallery, live embed).
 */
export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'case', title: 'Case study' },
    { name: 'media', title: 'Media & links' },
  ],
  fields: [
    // Overview
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'overview',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured (large card)',
      type: 'boolean',
      group: 'overview',
      initialValue: false,
    }),
    i18nString('badge', 'Badge', {
      group: 'overview',
      description: 'Optional tag after the number, e.g. "Featured", "Open source".',
    }),
    i18nText('description', 'Card description', { group: 'overview' }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),

    // Case study
    i18nString('caseType', 'Type', { group: 'case', description: 'e.g. "SaaS Platform", "Fintech".' }),
    defineField({ name: 'year', title: 'Year', type: 'string', group: 'case' }),
    i18nText('sub', 'Intro', { group: 'case', description: 'Lead paragraph under the case hero.' }),
    defineField({
      name: 'facts',
      title: 'Quick facts',
      type: 'object',
      group: 'case',
      options: { columns: 2 },
      fields: [
        i18nString('role', 'Role'),
        i18nString('timeline', 'Timeline'),
        defineField({ name: 'stack', title: 'Stack', type: 'string' }),
        i18nString('team', 'Team'),
      ],
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case study',
      type: 'object',
      group: 'case',
      fields: [
        i18nText('problem', 'Problem'),
        i18nText('role', 'My role'),
        i18nText('solution', 'Solution'),
        i18nText('outcome', 'Outcome'),
        defineField({
          name: 'metrics',
          title: 'Metrics',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value', type: 'string' }),
                i18nString('label', 'Label'),
              ],
              preview: { select: { title: 'value' } },
            }),
          ],
        }),
      ],
    }),

    // Media & links
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [altField()],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [altField(), i18nString('caption', 'Caption')],
        }),
      ],
    }),
    defineField({ name: 'githubLink', title: 'GitHub link', type: 'url', group: 'media' }),
    defineField({ name: 'liveLink', title: 'Live link', type: 'url', group: 'media' }),
    defineField({
      name: 'allowEmbed',
      title: 'Allow live embed',
      type: 'boolean',
      group: 'media',
      initialValue: false,
      description: 'Embed the live site in an iframe on the case page. Leave off if the site blocks framing.',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'reference', to: { type: 'skill' } })],
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'mainImage', order: 'order' },
    prepare: ({ title, media, order }) => ({
      title: title ?? 'Project',
      subtitle: `#${order ?? 0}`,
      media,
    }),
  },
});
