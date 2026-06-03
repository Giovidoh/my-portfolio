import { defineField } from 'sanity';

/**
 * Standard alternative-text field for image objects. Required only when an image
 * asset is actually present, so empty image slots don't block publishing.
 */
export const altField = () =>
  defineField({
    name: 'alt',
    title: 'Alternative text',
    type: 'string',
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context?.parent as { asset?: { _ref?: string } };
        return !value && parent?.asset?._ref ? 'Alternative text is required' : true;
      }),
  });
