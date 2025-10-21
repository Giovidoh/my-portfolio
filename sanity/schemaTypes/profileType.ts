import { defineArrayMember, defineField, defineType } from 'sanity';

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'greeting',
      type: 'string',
    }),
    defineField({
      name: 'fullName',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'profileImage',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as { asset?: { _ref?: string } };

              return !value && parent?.asset?._ref ? 'An alternative text is required' : true;
            }),
        }),
      ],
    }),
    defineField({
      name: 'callToActions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
            }),
            defineField({
              name: 'url',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ],
});
