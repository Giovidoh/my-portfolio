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
    i18nString('location', 'Location', { group: 'general', description: 'e.g. "Paris, France".' }),

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
    i18nText('cvSummary', 'CV · Profile summary', {
      group: 'cv',
      description: 'Short blurb at the top of the printable /cv page.',
    }),
    i18nText('cvEducation', 'CV · Education & languages', { group: 'cv' }),

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

    // UI labels (reused across pages, translatable). Each falls back to the
    // built-in English copy when left empty.
    i18nString('getInTouch', 'Label · Get in touch', { group: 'labels' }),
    i18nString('gotProject', 'Label · Work CTA ("Got a project?")', { group: 'labels' }),
    i18nString('code', 'Label · Code', { group: 'labels' }),
    i18nString('live', 'Label · Live', { group: 'labels' }),
    i18nString('liveDemo', 'Label · Live demo', { group: 'labels' }),
    i18nString('viewCode', 'Label · View code', { group: 'labels' }),
    i18nString('livePreview', 'Label · Live preview', { group: 'labels' }),
    i18nString('openFullscreen', 'Label · Open full screen', { group: 'labels' }),
    i18nString('allWork', 'Label · All work', { group: 'labels' }),
    i18nString('backToWork', 'Label · Back to all work', { group: 'labels' }),
    i18nString('nextProject', 'Label · Next project', { group: 'labels' }),
    i18nString('gallery', 'Label · Gallery', { group: 'labels' }),
    i18nString('builtWith', 'Label · Built with (project stack)', { group: 'labels' }),
    i18nString('requestWalkthrough', 'Label · Request a walkthrough', { group: 'labels' }),
    i18nString('caseProblem', 'Label · Case · The problem', { group: 'labels' }),
    i18nString('caseRole', 'Label · Case · My role', { group: 'labels' }),
    i18nString('caseSolution', 'Label · Case · The solution', { group: 'labels' }),
    i18nString('caseOutcome', 'Label · Case · The outcome', { group: 'labels' }),
    i18nString('footerNav', 'Label · Footer · Navigate', { group: 'labels' }),
    i18nString('footerElsewhere', 'Label · Footer · Elsewhere', { group: 'labels' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
