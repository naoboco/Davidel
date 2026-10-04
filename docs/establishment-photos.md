# Photos réelles de DAVIDEL

Six photos de la fiche publique DAVIDEL sur B144 ont été ajoutées le 4 octobre 2026. Le lien Google fourni était bloqué par une vérification humaine dans le navigateur de contrôle. Le nom de l'établissement et le téléphone 02-642-8866 ont servi à vérifier la fiche retenue.

Les sources exactes, dimensions et tailles des fichiers sont conservées dans `establishment-photo-sources.json`. Les photos sont stockées localement dans `src/assets/establishment`, converties en WebP sans recadrage ni agrandissement. Les marques présentes sur les originaux sont conservées. Le total des six fichiers est de 446 384 octets.

| Photo | Emplacement |
| --- | --- |
| Vitrine de pâtisseries | Galerie et bandeau de créations |
| Café et pâtisseries individuelles | Galerie et bandeau de créations |
| Viennoiseries | Galerie et bandeau de créations |
| Pièces montées en réception | Galerie et bandeau de créations |
| Buffet de brunch | Univers Traiteur, occasions Brith et Entreprise, galerie et bandeau de créations |
| Buffet de desserts | Univers Réceptions, occasions Cocktail et Réception privée, fond de la section Réceptions, galerie et bandeau de créations |

Les dix-neuf produits et leurs images d'illustration restent distincts. La présentation noire et rose et les corrections précédentes de lisibilité et de responsive sont conservées.

## Vérification de la version publiée

La publication GitHub Pages du commit `7dd8a5eae6e8d8c9da7354be4f0c9f4002556c7b` a réussi. Les contrôles ont porté sur le bundle `index-FEZbjEil.js` et la feuille de style `index-D_YZu6C2.css`.

- Douze combinaisons contrôlées : 320 × 568, 390 × 844, 844 × 390, 768 × 1024, 1024 × 768 et 1280 × 800, chacune en français et en hébreu.
- Aucun débordement horizontal des cartes, de la galerie, du formulaire ou des blocs principaux, après stabilisation des animations.
- Deux colonnes de produits sur téléphone ; dix-neuf produits indépendants dans la carte et six photos réelles dans la galerie.
- Les six photos de la galerie et du bandeau de créations chargent correctement. Les images de buffet dans Traiteur, Réception privée et le fond Réceptions sont chargées.
- Légendes de galerie localisées en français et en hébreu.
- Agrandissement : compteurs 1/6 et 6/6, navigation rapide, fermeture par bouton et par Échap, aucune surcouche restante.
- Panier à 320 pixels : deux articles à 8 ₪ donnent 16 ₪ ; l'ajout d'un croissant donne 24 ₪ ; son retrait ramène le total à 16 ₪. Le total utilise une graisse 700 et une taille de 30 pixels. Le panneau tient dans la fenêtre.
- Message d'ajout contrasté et en graisse 700. Le panier de test a été vidé. Aucune commande ni demande de devis n'a été envoyée.
- `npm run build` et `git diff --check` réussissent.

La page temporaire `responsive-check.html` est supprimée après les contrôles.
