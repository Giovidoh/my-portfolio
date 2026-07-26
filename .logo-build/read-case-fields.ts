/* Inspect case-study fields of every project to predict conditional rendering. */
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });
  const docs = await client.fetch(
    `*[_type == "project"] | order(order asc){
      title, "slug": slug.current,
      "hasSub": defined(sub) && length(sub) > 0,
      "hasFacts": defined(facts),
      "hasCaseStudy": defined(caseStudy.problem) || defined(caseStudy.role) || defined(caseStudy.solution) || defined(caseStudy.outcome),
      "metrics": count(caseStudy.metrics),
      "gallery": count(gallery),
      liveLink, allowEmbed
    }`,
  );
  console.log(JSON.stringify(docs, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
