import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet

/** Document types edited as single, fixed documents (one per type). */
const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings' },
  { id: 'homePage', title: 'Home Page' },
  { id: 'contactPage', title: 'Contact Page' },
] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('skill').title('Skills'),
      S.documentTypeListItem('skillCategory').title('Skill Categories'),
      S.documentTypeListItem('experience').title('Experience'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.documentTypeListItem('language').title('Languages'),
    ])
