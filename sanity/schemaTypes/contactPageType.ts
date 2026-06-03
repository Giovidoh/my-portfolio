import { defineArrayMember, defineField, defineType } from 'sanity';
import { i18nString, i18nText } from './i18n';

/**
 * Contact page copy: intro, the form's labels/messages and the subject options,
 * plus the "other methods" block (the actual links come from Site Settings).
 * Singleton (one document, fixed id).
 */
export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Intro', default: true },
    { name: 'form', title: 'Form' },
    { name: 'methods', title: 'Other methods' },
  ],
  fields: [
    // Intro
    i18nString('eyebrow', 'Eyebrow', { group: 'intro' }),
    i18nString('heading', 'Heading', { group: 'intro' }),
    i18nText('pitch', 'Pitch', { group: 'intro' }),

    // Form
    defineField({
      name: 'subjects',
      title: 'Subject options',
      type: 'array',
      group: 'form',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
            i18nString('label', 'Label'),
          ],
          preview: { select: { title: 'value' } },
        }),
      ],
    }),
    i18nString('nameLabel', 'Field · Name', { group: 'form' }),
    i18nString('emailLabel', 'Field · Email', { group: 'form' }),
    i18nString('subjectLabel', 'Field · Subject', { group: 'form' }),
    i18nString('messageLabel', 'Field · Message', { group: 'form' }),
    i18nString('sendLabel', 'Button · Send', { group: 'form' }),
    i18nString('sendingLabel', 'Button · Sending', { group: 'form' }),
    i18nString('successTitle', 'Success title', { group: 'form' }),
    i18nText('successBody', 'Success body', { group: 'form' }),
    i18nText('errorBody', 'Error body', { group: 'form' }),

    // Other methods
    i18nString('methodsHeading', 'Heading', { group: 'methods' }),
    i18nText('methodsNote', 'Note', { group: 'methods' }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
});
