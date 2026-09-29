# Site LexSolutions

Site vitrine du cabinet LexSolutions (Douala et Yaoundé), réalisé par INNOVA ALPHA.

## État

**Maquette de visualisation.** Publiée en `noindex` avec un `robots.txt` bloquant,
le temps que le domaine `lexsolutions.cm` soit acquis. L'adresse
`contact@lexsolutions.cm` affichée sur les pages ne fonctionne pas encore.

## Structure

24 pages, 12 en français et 12 en anglais, plus 4 composants partagés
(`Nav`, `Footer`, `PoleDetail`, `PoleDetail-EN`) chargés à l'exécution
par `dc-import`. Ces quatre fichiers gardent l'extension `.dc.html` :
c'est sous ce nom que le moteur `support.js` va les chercher.

| Français | Anglais |
|---|---|
| `index.html` | `index-en.html` |
| `cabinet.html` | `cabinet-en.html` |
| `expertises.html` | `expertises-en.html` |
| `droit-des-affaires.html` | `droit-des-affaires-en.html` |
| `fiscalite.html` | `fiscalite-en.html` |
| `douane-transit.html` | `douane-transit-en.html` |
| `marches-publics-ppp.html` | `marches-publics-ppp-en.html` |
| `blog.html` | `blog-en.html` |
| `article.html` | `article-en.html` |
| `contact.html` | `contact-en.html` |
| `mentions-legales.html` | `mentions-legales-en.html` |
| `confidentialite.html` | `confidentialite-en.html` |

## Avant une mise en production

- Acquérir le domaine `lexsolutions.cm` et faire fonctionner `contact@lexsolutions.cm`
- Retirer le `noindex` des 24 pages et le `Disallow` du `robots.txt`
- Compléter les mentions légales du cabinet
