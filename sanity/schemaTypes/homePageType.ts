import { defineArrayMember, defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';
import { altField } from './helpers';

/** A collapsible eyebrow + heading block for a home section. */
const sectionHeading = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    group: 'sections',
    options: { collapsible: true, collapsed: true },
    fields: [i18nString('eyebrow', 'Eyebrow'), i18nString('heading', 'Heading')],
  });

/**
 * The composition of the home page: hero, about/what-I-do, and the headings for
 * each section. Lists (projects, skills, experience, testimonials) live in their
 * own document types. Singleton (one document, fixed id).
 */
export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'sections', title: 'Section headings' },
  ],
  fields: [
    // HERO
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        i18nString('status', 'Status pill'),
        defineField({ name: 'firstName', title: 'First name', type: 'string' }),
        defineField({ name: 'lastName', title: 'Last name', type: 'string' }),
        i18nString('roleLabel', 'Role (emphasised)'),
        defineField({
          name: 'roleStack',
          title: 'Role stack',
          type: 'string',
          description: 'e.g. "React · Next.js · Node · TypeScript".',
        }),
        i18nText('lede', 'Lede paragraph'),
        i18nString('badge', 'Photo badge', { description: 'e.g. "6+ yrs shipping".' }),
        defineField({
          name: 'photo',
          title: 'Portrait',
          type: 'image',
          options: { hotspot: true },
          fields: [altField()],
        }),
        defineField({
          name: 'ctaPrimary',
          title: 'Primary CTA',
          type: 'object',
          options: { columns: 2 },
          fields: [
            i18nString('label', 'Label'),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          title: 'Secondary CTA',
          type: 'object',
          options: { columns: 2 },
          fields: [
            i18nString('label', 'Label'),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'marquee',
          title: 'Marquee keywords',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          options: { layout: 'tags' },
          description: 'Decorative scrolling keywords.',
        }),
      ],
    }),

    // ABOUT
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      group: 'about',
      fields: [
        i18nString('eyebrow', 'Eyebrow'),
        i18nText('lead', 'Lead statement'),
        i18nText('body', 'Body', { description: 'Separate paragraphs with a blank line.' }),
        defineField({
          name: 'whatIDo',
          title: 'What I do',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [i18nString('title', 'Title'), i18nText('description', 'Description')],
              preview: {
                select: { subtitle: 'title' },
                prepare: () => ({ title: 'Item' }),
              },
            }),
          ],
        }),
      ],
    }),

    // SECTION HEADINGS
    sectionHeading('workSection', 'Work'),
    defineField({
      name: 'skillsSection',
      title: 'Skills',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        i18nString('eyebrow', 'Eyebrow'),
        i18nString('heading', 'Heading'),
        i18nString('allLabel', '"All" filter label'),
      ],
    }),
    sectionHeading('experienceSection', 'Experience'),
    sectionHeading('testimonialsSection', 'Testimonials'),
    defineField({
      name: 'contactCta',
      title: 'Contact CTA band',
      type: 'object',
      group: 'sections',
      options: { collapsible: true, collapsed: true },
      fields: [
        i18nString('eyebrow', 'Eyebrow'),
        i18nString('heading', 'Heading'),
        i18nText('body', 'Body'),
        i18nString('ctaLabel', 'Button label'),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
});
