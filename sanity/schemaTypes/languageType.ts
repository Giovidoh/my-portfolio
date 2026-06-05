import { defineField, defineType } from 'sanity';
import { apiVersion } from '../env';

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
      description: 'The fallback language. Exactly one language may be the default.',
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (isDefault, context) => {
          if (!isDefault) return true;
          const id = (context.document?._id ?? '').replace(/^drafts\./, '');
          const others = await context
            .getClient({ apiVersion })
            .fetch<number>(
              `count(*[_type == "language" && isDefault == true && !(_id in [$id, $draft])])`,
              { id, draft: `drafts.${id}` },
            );
          return others > 0
            ? 'Another language is already set as default — only one is allowed.'
            : true;
        }),
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
