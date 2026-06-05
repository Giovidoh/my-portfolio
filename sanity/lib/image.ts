import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

/**
 * Like urlFor, but returns null when the image (or its asset) is missing — so
 * callers can `imageBuilder(img)?.width(…).url()` without the "Unable to resolve
 * image URL" crash on empty fields.
 */
export const imageBuilder = (source: { asset?: { _ref?: string } } | null | undefined) =>
  source?.asset?._ref ? builder.image(source as SanityImageSource) : null
