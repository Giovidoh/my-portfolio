/* Correct the logo fields on the siteSettings singleton:
   - logoMark ("CG") is obsolete: the mark is now the fixed ICG SVG component.
   - logoText ("IDOH") is already correct and stays untouched. */
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });
  const result = await client.patch('siteSettings').unset(['logoMark']).commit({ autoGenerateArrayKeys: false });
  console.log('patched:', JSON.stringify({ _id: result._id, _rev: result._rev }));

  const check = await client.fetch(
    `*[_id in ["siteSettings", "drafts.siteSettings"]]{ _id, brandName, logoMark, logoText }`,
  );
  console.log(JSON.stringify(check, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
