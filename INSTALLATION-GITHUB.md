# DAVIDEL — Mise en ligne GitHub Pages

1. Créer un nouveau repository GitHub.
2. Déposer **tout le contenu de ce dossier** à la racine du repository.
3. Vérifier que la branche principale s'appelle `main`.
4. Dans GitHub : **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Ouvrir l'onglet **Actions** et attendre la fin du workflow `Deploy to GitHub Pages`.
6. Le site sera servi en HTTPS, ce qui active l'installation PWA.

## Installation sur téléphone

- Android / Chrome : le bouton **Installer DAVIDEL** utilise le prompt natif quand il est disponible.
- iPhone / Safari : le bouton affiche les instructions **Partager → Sur l’écran d’accueil**.
- Une fois installée, DAVIDEL s'ouvre en mode application avec son icône noire / craie / rose.

## Fichiers PWA importants

- `public/manifest.webmanifest`
- `public/sw.js`
- `public/icons/icon-192.png`
- `public/icons/icon-512.png`
- `public/icons/icon-maskable-512.png`
- `public/icons/apple-touch-icon.png`
- `src/components/InstallApp.jsx`
