import { type SchemaTypeDefinition } from 'sanity'

import { siteSettingsType } from './siteSettingsType'
import { homePageType } from './homePageType'
import { contactPageType } from './contactPageType'
import { learningPageType } from './learningPageType'
import { projectType } from './projectType'
import { skillType } from './skillType'
import { skillCategoryType } from './skillCategoryType'
import { experienceType } from './experienceType'
import { educationType } from './educationType'
import { certificationType } from './certificationType'
import { openSourceType } from './openSourceType'
import { videoResourceType } from './videoResourceType'
import { testimonialType } from './testimonialType'
import { languageType } from './languageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons (pages)
    siteSettingsType,
    homePageType,
    contactPageType,
    learningPageType,
    // Collections
    projectType,
    skillType,
    skillCategoryType,
    experienceType,
    educationType,
    certificationType,
    openSourceType,
    videoResourceType,
    testimonialType,
    // System
    languageType,
  ],
}
