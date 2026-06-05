import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Non-CDN client for configuration reads (languages) that must reflect Studio
// changes immediately — bypasses the CDN edge cache (~60s).
export const configClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
