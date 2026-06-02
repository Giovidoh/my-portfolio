# LESSONS

| Date       | What went wrong                 | Rule to apply                          |
|------------|---------------------------------|----------------------------------------|
| 2026-06-02 | `useId()` appelé dans des Server Components `async` pour générer des keys, alors que les docs Sanity ont déjà `_id` | Server Component `async` = pas de hooks React. Utiliser les identifiants stables des données (`_id`) comme `key`. |
| 2026-06-02 | `urlFor('')` lève « Unable to resolve image URL » si l'image Sanity manque → crash SSR ; le `\|\| fallback` après `.url()` ne protège pas (erreur levée avant) | Garder `urlFor()` derrière un garde d'existence : `image?.asset ? urlFor(image)... : fallbackStatique`. Ne jamais passer une source vide. |
