import { defineField, defineType } from 'sanity';

/**
 * Languages are data, not code. Each `language` document drives both the
 * internationalized-array plugin (Studio inputs) and the site's language
 * switcher / locale routing. Add a language, flip `isActive`, fill the
 * translated fields — no code change required.
 */
export const languageType = defineType({
  name: 'language',
  title: 'Language',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Locale code',
      type: 'string',
      description: 'ISO code used in the URL and as the translation key (e.g. "en", "fr").',
      validation: (rule) =>
        rule
          .required()
          .lowercase()
          .max(10)
          .regex(/^[a-z]{2}(-[a-z]{2})?$/, { name: 'locale code (e.g. en, fr, pt-br)' }),
    }),
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Display name shown in the switcher (e.g. "English", "Français").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this language in the public language switcher.',
      initialValue: true,
    }),
    defineField({
      name: 'isDefault',
      title: 'Default language',
      type: 'boolean',
      description: 'The fallback language. Exactly one language should be the default.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position in the language switcher (ascending).',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', id: 'id', isActive: 'isActive', isDefault: 'isDefault' },
    prepare({ title, id, isActive, isDefault }) {
      const tags = [isDefault ? 'default' : null, isActive ? 'active' : 'inactive']
        .filter(Boolean)
        .join(' · ');
      return { title: `${title ?? 'Untitled'} (${id ?? '—'})`, subtitle: tags };
    },
  },
});
