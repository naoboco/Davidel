# DAVIDEL — Haute Couture Gourmande

Refonte complète du site DAVIDEL (Pâtisserie & Traiteur, Jérusalem).
React + Vite + Framer Motion + Lucide. Aucune autre dépendance.

## Lancer

```bash
npm install
npm run dev          # développement
npm run build        # build classique -> dist/ (GitHub Pages, Netlify, OVH…)
npm run build:single # un seul fichier HTML autonome -> dist-single/index.html
```

## Déployer

**GitHub Pages** — le workflow `.github/workflows/deploy.yml` est déjà en place.
Poussez sur `main`, puis Settings → Pages → Source : *GitHub Actions*.
`base: './'` dans `vite.config.js` : aucun réglage de chemin à faire.

**Netlify Drop** — glissez le dossier `dist/` sur https://app.netlify.com/drop.

## Modifier le contenu

| Quoi | Où |
|---|---|
| Produits, prix, descriptions | `src/data/menuData.js` |
| Téléphone, WhatsApp, adresse, horaires, photos | `src/data/siteData.js` |
| Tous les textes FR / HE | `src/i18n/translations.js` |
| Messages WhatsApp préremplis | `src/lib/whatsapp.js` |
| Couleurs, typographie, espacements | `src/styles/global.css` (bloc `:root`) |

## Direction artistique

- **Noir d'encre `#060506`**, craie `#f6f2ef`, **fuchsia DAVIDEL `#e3007e`**.
- Display : **Bodoni Moda** (didone couture) — Texte : **Jost** (géométrique parisien).
- Hébreu : **Frank Ruhl Libre** + **Heebo**, avec RTL complet (`dir="rtl"`, propriétés logiques CSS, panneaux et flèches inversés).
- Signature : **la surpiqûre** — un fil rose pointillé qui coud le Carnet, les séparateurs et les fins de section.

## Le Carnet

Élément central de conversion : chaque produit peut être ajouté à un « carnet de
commande » persistant (localStorage). Le bouton final compose un message WhatsApp
complet — lignes, quantités, total en shekels — que le client relit avant d'envoyer.
Aucun panier e-commerce, aucun paiement en ligne, aucune étape inutile.

## À confirmer avant mise en ligne

1. **Horaires** (`siteData.js` → `HOURS`) : valeurs à vérifier auprès de la boutique.
2. **E-mail** (`CONTACT.email`) : `contact@davidel.co.il` est une supposition.
3. **Compte Instagram** (`CONTACT.instagram`) : à vérifier.
4. **Ordre des photographies** : les 18 images proviennent de la galerie du site
   actuel (`davidel.co.il/img/cms/gallery/*.webp`) et sont affectées aux sections
   sans vérification visuelle. Si un plateau salé apparaît sur « Pâtisserie »,
   changez le numéro dans `siteData.js`.
5. **Certifications / cacherout** : volontairement absentes, faute d'information
   confirmée. À ajouter dans `TrustBar` une fois vérifiées.
6. **Photos hébergées à distance** : pour la production, téléchargez-les dans
   `public/img/` et passez `PHOTO_BASE` à `'./img/'`.

## Installation sur l’écran d’accueil (PWA)

Cette version inclut une PWA complète :

- `public/manifest.webmanifest`
- `public/sw.js`
- icônes DAVIDEL 192 / 512 / maskable / Apple Touch
- bouton **Installer DAVIDEL** avec prompt Android/Chrome et instructions iPhone/iPad
- mode `standalone` une fois installée
- cache de base pour un meilleur comportement hors connexion

### GitHub Pages
Le workflow `.github/workflows/deploy.yml` construit automatiquement le projet avec `npm ci` puis `npm run build` et publie le dossier `dist`.
Dans GitHub : **Settings → Pages → Source → GitHub Actions**.

> L’installation PWA nécessite HTTPS. GitHub Pages fournit HTTPS automatiquement.
