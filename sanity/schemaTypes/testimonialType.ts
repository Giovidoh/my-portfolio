import { defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';
import { altField } from './helpers';

/** A single testimonial / quote. */
export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    i18nText('quote', 'Quote'),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    i18nString('authorRole', 'Author role', { description: 'e.g. "CTO, Northwind Studio".' }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
      fields: [altField()],
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'author', media: 'avatar' },
    prepare: ({ title, media }) => ({ title: title ?? 'Testimonial', media }),
  },
});
