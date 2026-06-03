import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './skillType'
import { projectType } from './projectType'
import { profileType } from './profileType'
import { sectionsConfigType } from './sectionsConfigType'
import { languageType } from './languageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [languageType, skillType, projectType, profileType, sectionsConfigType],
}
