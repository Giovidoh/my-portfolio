import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { projectType } from './projectType'
import { profileType } from './profileType'
import { sectionsConfigType } from './sectionsConfigType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, projectType, profileType, sectionsConfigType],
}
