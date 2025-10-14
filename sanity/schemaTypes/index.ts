import { type SchemaTypeDefinition } from 'sanity'
import { skillType } from './SkillType'
import { ProjectType } from './ProjectType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, ProjectType],
}
