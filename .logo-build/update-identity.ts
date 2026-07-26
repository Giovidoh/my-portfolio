/* Update hero identity on homePage and drop the obsolete logoText field.
   - hero: "Cir-Giovanni IDOH" big + "aka ICGreborns" alias line (en/fr).
   - siteSettings.logoText: no longer consumed (wordmark is now fixed "reborns"). */
import { getCliClient } from 'sanity/cli';

async function main() {
  const client = getCliClient({ apiVersion: '2025-01-01' });

  await client
    .patch('homePage')
    .set({
      'hero.firstName': 'Cir-Giovanni',
      'hero.lastName': 'IDOH',
      'hero.alias': [
        {
          _key: 'alias-en',
          _type: 'internationalizedArrayStringValue',
          language: 'en',
          value: 'aka ICGreborns',
        },
        {
          _key: 'alias-fr',
          _type: 'internationalizedArrayStringValue',
          language: 'fr',
          value: 'alias ICGreborns',
        },
      ],
    })
    .commit();
  console.log('homePage patched');

  await client.patch('siteSettings').unset(['logoText']).commit();
  console.log('siteSettings.logoText unset');

  const check = await client.fetch(`{
    "home": *[_id == "homePage"][0]{ "hero": hero{ firstName, lastName, alias } },
    "settings": *[_id == "siteSettings"][0]{ brandName, logoText }
  }`);
  console.log(JSON.stringify(check, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
