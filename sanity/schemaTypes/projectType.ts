import { defineArrayMember, defineField, defineType } from 'sanity';

export const ProjectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
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
      name: 'githubLink',
      type: 'url',
    }),
    defineField({
      name: 'liveLink',
      type: 'url',
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'skill' },
        }),
      ],
    }),
  ],
});
