/* Read the homePage singleton hero block (published + draft). */
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });
  const docs = await client.fetch(
    `*[_id in ["homePage", "drafts.homePage"]]{ _id, "hero": hero{ firstName, lastName, status } }`,
  );
  console.log(JSON.stringify(docs, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
