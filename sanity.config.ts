'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Field-level i18n. Languages are managed as `language` documents in the
    // dataset (add/activate from the Studio) — registers internationalizedArrayString/Text.
    internationalizedArray({
      languages: async (client) =>
        client.fetch(`*[_type == "language" && isActive == true] | order(order asc){ id, title }`),
      fieldTypes: ['string', 'text'],
    }),
  ],
  document: {
    // Singletons are reached through the custom structure; hide them from the
    // global "new document" menu so no duplicates can be created.
    newDocumentOptions: (prev, {creationContext}) => {
      const singletons = ['siteSettings', 'homePage', 'contactPage']
      if (creationContext.type === 'global') {
        return prev.filter((tpl) => !singletons.includes(tpl.templateId))
      }
      return prev
    },
  },
})
