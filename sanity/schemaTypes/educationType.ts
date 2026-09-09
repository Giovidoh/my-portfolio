import { defineField, defineType } from 'sanity';
import { i18nString } from './i18n';

/** One line of the CV's Education block (degree, school, period). */
export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    i18nString('degree', 'Degree', {
      description: 'e.g. "Licence en Technologies de l\'Informatique de Gestion".',
    }),
    i18nString('school', 'School & place', {
      description: 'e.g. "ESAG-NDE, Lomé".',
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g. "2023 – 2024" (not translated).',
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
    select: { degree: 'degree', period: 'period' },
    prepare: ({ degree, period }) => ({
      title: degree?.[0]?.value ?? 'Education',
      subtitle: period ?? '',
    }),
  },
});
