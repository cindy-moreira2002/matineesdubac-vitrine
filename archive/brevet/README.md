# Partie Brevet — mise de côté le 12 septembre 2026

La section « Les Matinées du Brevet » a été **retirée du site public** à la demande de Cindy.
Rien n'est perdu : tout le contenu est ici, prêt à être remis en ligne.

Pour la remettre : demander à Claude Code **« remets la partie brevet »**, ou suivre les cinq
étapes ci-dessous.

## Le plus simple

`index-avec-brevet-2026-09-12.html` est le site complet **tel qu'il était avec le brevet**,
juste avant le retrait. Attention : il ne contient pas les modifications faites après cette
date. À utiliser seulement si l'on veut revenir à cet état exact.

## Remise en place morceau par morceau (recommandé)

| Fichier | Où le recoller dans `index.html` |
|---|---|
| `brevet.css` | dans le `<style>` du `<head>`, juste avant `</style>` |
| `page-brevet.html` | entre la page Concept et le commentaire `PAGE CALENDRIER` |
| `navbar-interrupteur.html` | dans la navbar, après le bloc `nav-logo` |
| `navbar-liens-brevet.html` | dans la navbar, juste avant `<div class="nav-cta">` |
| `brevet.js` | dans le `<script>` de fin, avant le commentaire « Normalisation des tirets » |

Il faut aussi remettre quatre détails retirés ailleurs :

1. Navbar — le logo bascule selon l'univers :
   `<div class="nav-logo" onclick="gotoPage('home')">`
   redevient
   `<div class="nav-logo" onclick="gotoPage(document.body.classList.contains('univers-brevet') ? 'brevet' : 'home')">`
2. Navbar — remettre `<span class="logo-brevet">BREVET</span>` après `<span class="logo-bac">BAC</span>`.
3. Pied de page — remettre `<span class="logo-brevet" style="font-size:1.2rem;color:white">BREVET</span>`
   après le `logo-bac` du footer.
4. Fonction `gotoPage()` — remettre, après la boucle sur `.nav-links a` :
   ```js
   // Univers Bac ↔ Brevet : le thème suit la page affichée
   applyUnivers(id === 'brevet');
   if (id === 'brevet') setTimeout(() => renderBrevetCalendar('all'), 40);
   ```

## Ce qui a été retiré du CSS au passage

Le bloc brevet contenait aussi des règles de navbar qui n'ont rien à voir avec le brevet
(largeur `.nav-inner`, tailles des liens sur petit écran). Elles sont **restées dans
`index.html`** sous le titre « NAVBAR ». En remettant `brevet.css`, ne pas les recoller une
deuxième fois : `brevet.css` en contient une copie avec, en plus, les lignes `univers-switch`
et `navLinksBrevet`. Le plus propre est alors de supprimer le bloc « NAVBAR » d'`index.html`.

## Contenu conservé

Hero 3ᵉ, section « un ou deux brevets blancs par an, ça ne suffit pas », avant/après,
les deux matières (français et maths) avec le détail des épreuves, les 4 étapes,
le pont vers la seconde, le calendrier brevet, les trois tarifs et la FAQ parents.
Les dates et les tarifs sont ceux de la maquette : à revoir avant toute remise en ligne.
