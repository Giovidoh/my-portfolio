/* Inspect existing project documents to mirror their data conventions. */
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });
  const docs = await client.fetch(
    `*[_type == "project"] | order(order asc){
      _id, title, "slug": slug.current, order, featured, badge, description, tags,
      caseType, year, githubLink, liveLink, allowEmbed,
      "skills": skills[]->_id,
      "hasImage": defined(mainImage)
    }`,
  );
  console.log(JSON.stringify(docs, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
