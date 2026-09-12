import { defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';

/** Eyebrow + heading pair for one section of the Learning page. */
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
 * The "Learning" page: courses & certifications, open-source contributions and
 * video resources. The lists themselves live in their own document types.
 * Singleton (one document, fixed id).
 */
export const learningPageType = defineType({
  name: 'learningPage',
  title: 'Learning Page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Intro', default: true },
    { name: 'sections', title: 'Section headings' },
    { name: 'visibility', title: 'Visibility' },
  ],
  fields: [
    // Intro
    i18nString('navLabel', 'Nav label', {
      group: 'intro',
      description: 'Only used as a fallback — the nav item itself lives in Site Settings.',
    }),
    i18nString('eyebrow', 'Eyebrow', { group: 'intro' }),
    i18nString('heading', 'Heading', { group: 'intro' }),
    i18nText('pitch', 'Pitch', { group: 'intro' }),
    i18nString('backLabel', 'Back link', { group: 'intro', description: 'e.g. "Home".' }),
    i18nString('openSourceLinkLabel', 'Label · Open-source link', { group: 'intro' }),
    i18nString('videosLinkLabel', 'Label · Video link', { group: 'intro' }),
    defineField({
      name: 'videoStatusLabels',
      title: 'Labels · Video status badges',
      type: 'object',
      group: 'intro',
      options: { collapsible: true, collapsed: true },
      fields: [
        i18nString('inProgress', 'In progress'),
        i18nString('completed', 'Completed'),
        i18nString('planned', 'Planned'),
      ],
    }),
    i18nString('videosOtherTopic', 'Label · Ungrouped videos', {
      group: 'intro',
      description: 'Heading for videos with no topic, e.g. "Other".',
    }),
    i18nString('metaTitle', 'Meta title', { group: 'intro' }),
    i18nText('metaDescription', 'Meta description', { group: 'intro' }),

    // Section headings
    sectionHeading('certificationsSection', 'Courses & certifications'),
    sectionHeading('openSourceSection', 'Open source'),
    sectionHeading('videosSection', 'Video resources'),

    // Visibility
    defineField({
      name: 'sectionsVisibility',
      title: 'Section visibility',
      type: 'object',
      group: 'visibility',
      description: 'Off = the section is removed from the page.',
      options: { columns: 3 },
      fields: [
        defineField({
          name: 'certifications',
          title: 'Show Courses & certifications',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'openSource',
          title: 'Show Open source',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'videos',
          title: 'Show Video resources',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Learning Page' }) },
});
