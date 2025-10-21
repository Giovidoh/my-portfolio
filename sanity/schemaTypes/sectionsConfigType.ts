import { defineArrayMember, defineField, defineType } from 'sanity';

export const sectionsConfigType = defineType({
  name: 'sectionsConfig',
  title: 'Sections Config',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'skillsSection',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'projectsSection',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          type: 'string',
        }),
      ],
    }),
  ],
});
