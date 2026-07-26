/* List skills to resolve references for the new project. */
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });
  const docs = await client.fetch(`*[_type == "skill"]{ _id, title } | order(title asc)`);
  console.log(JSON.stringify(docs, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
