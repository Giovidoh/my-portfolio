import { defineArrayMember, defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';

/**
 * Global, page-agnostic settings: brand, SEO defaults, social links, CV file,
 * navigation, footer and reusable UI labels. Singleton (one document, fixed id).
 */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'social', title: 'Social' },
    { name: 'cv', title: 'CV' },
    { name: 'nav', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'labels', title: 'UI Labels' },
  ],
  fields: [
    // General
    defineField({
      name: 'brandName',
      title: 'Brand name',
      type: 'string',
      group: 'general',
      description: 'Wordmark shown in the navbar and footer.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      description: 'Optional. Falls back to the brand name text.',
    }),
    i18nString('availabilityText', 'Availability label', {
      group: 'general',
      description: 'e.g. "Open to full-stack roles".',
    }),

    // SEO
    i18nString('metaTitle', 'Meta title', { group: 'seo' }),
    i18nText('metaDescription', 'Meta description', { group: 'seo' }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      group: 'seo',
      description: '1200×630 recommended.',
    }),

    // Social
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'social' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url', group: 'social' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', group: 'social' }),
    defineField({ name: 'xUrl', title: 'X / Twitter URL', type: 'url', group: 'social' }),

    // CV
    defineField({
      name: 'cvFile',
      title: 'CV (PDF)',
      type: 'file',
      group: 'cv',
      options: { accept: '.pdf' },
      description: 'Uploaded PDF served by the "Download CV" button.',
    }),
    i18nString('cvLabel', 'CV button label', { group: 'cv', description: 'e.g. "Download CV".' }),

    // Navigation
    defineField({
      name: 'navItems',
      title: 'Nav items',
      type: 'array',
      group: 'nav',
      description: 'Order and labels of the main navigation.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            i18nString('label', 'Label'),
            defineField({
              name: 'target',
              title: 'Target',
              type: 'string',
              description: 'Section id (work, about, experience, contact) or a path (e.g. /contact).',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { target: 'target' },
            prepare: ({ target }) => ({ title: target || 'nav item' }),
          },
        }),
      ],
    }),

    // Footer
    i18nText('footerTagline', 'Footer tagline', { group: 'footer' }),
    i18nString('copyright', 'Copyright line', {
      group: 'footer',
      description: 'Use {year} to insert the current year.',
    }),

    // UI labels (reused across pages)
    i18nString('uiDownloadCv', 'Label · Download CV', { group: 'labels' }),
    i18nString('uiViewProject', 'Label · View project', { group: 'labels' }),
    i18nString('uiLiveDemo', 'Label · Live demo', { group: 'labels' }),
    i18nString('uiLivePreview', 'Label · Live preview', { group: 'labels' }),
    i18nString('uiBack', 'Label · Back', { group: 'labels' }),
    i18nString('uiNextProject', 'Label · Next project', { group: 'labels' }),
    i18nString('uiViewWork', 'Label · View work', { group: 'labels' }),
    i18nString('uiGetInTouch', 'Label · Get in touch', { group: 'labels' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
