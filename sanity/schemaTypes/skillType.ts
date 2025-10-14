import { defineField, defineType } from 'sanity';

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      type: 'image',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
});
