import { type SchemaTypeDefinition } from 'sanity'

import { siteSettingsType } from './siteSettingsType'
import { homePageType } from './homePageType'
import { contactPageType } from './contactPageType'
import { projectType } from './projectType'
import { skillType } from './skillType'
import { skillCategoryType } from './skillCategoryType'
import { experienceType } from './experienceType'
import { testimonialType } from './testimonialType'
import { languageType } from './languageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons (pages)
    siteSettingsType,
    homePageType,
    contactPageType,
    // Collections
    projectType,
    skillType,
    skillCategoryType,
    experienceType,
    testimonialType,
    // System
    languageType,
  ],
}
