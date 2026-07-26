/* Read the siteSettings singleton (published + draft) via the CLI's auth. */
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });
  const docs = await client.fetch(
    `*[_id in ["siteSettings", "drafts.siteSettings"]]{ _id, _rev, brandName, logoMark, logoText }`,
  );
  console.log(JSON.stringify(docs, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
