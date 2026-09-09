import { defineField, defineType } from 'sanity';
import { i18nString } from './i18n';

/** One line of the CV's "Courses & certifications" block. */
export const certificationType = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course / certification',
      type: 'string',
      description: 'e.g. "Solidity Smart Contract Development" (kept as issued, not translated).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
      description: 'e.g. "Cyfrin Updraft" (not translated).',
    }),
    i18nString('issued', 'Issued', {
      description: 'e.g. "Juin 2026" / "June 2026".',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
      description: 'Optional — printed after the issuer on the CV.',
    }),
    defineField({
      name: 'url',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to the certificate.',
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
    select: { title: 'title', issuer: 'issuer' },
    prepare: ({ title, issuer }) => ({ title: title ?? 'Certification', subtitle: issuer ?? '' }),
  },
});
