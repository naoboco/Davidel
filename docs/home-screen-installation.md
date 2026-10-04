# Installation sur l'écran d'accueil

L'invitation sous la présentation de DAVIDEL et le bouton flottant proposent l'action adaptée au navigateur, en français et en hébreu.

Sur Android compatible, « Installer sur Android » ouvre directement la fenêtre native d'installation. La confirmation du visiteur reste obligatoire ; aucun passage dans les menus du navigateur ni fenêtre d'instructions Android ne sont nécessaires. Le bouton s'active quand le navigateur fournit `beforeinstallprompt`. Cet événement est capturé dès le chargement du module, avant le montage React, pour conserver aussi une offre précoce.

Avant que le navigateur autorise l'installation, le bouton reste désactivé et affiche un état d'attente. Dans un navigateur intégré à une application ou un navigateur Android sans cette API, « Ouvrir dans Chrome » propose un lien Android intent vers le même site. Ce lien requiert un clic du visiteur et contient une URL de repli HTTPS. Il ne garantit pas l'ouverture de Chrome sur tous les appareils.

Sur iPhone, le site ne peut pas déclencher une installation native automatique. Le bouton conserve l'aide pour ouvrir le site dans Safari, toucher Partager puis Sur l'écran d'accueil.

Chaque offre native est consommée une seule fois et les doubles clics sont ignorés. Après un refus, l'invitation est masquée pour la session. Une erreur affiche un état d'indisponibilité sans ouvrir d'instructions Android ; une nouvelle offre autorise une nouvelle tentative. L'invitation est masquée en mode autonome, après acceptation ou après `appinstalled`. La détection est mémorisée localement ; une nouvelle offre d'installation permet une réinstallation.

Le manifeste conserve son identité, son périmètre et les icônes PNG 192 et 512 pixels, maskable et apple-touch-icon. Le cache du service worker passe à `davidel-pwa-v10`.

## Vérifications du 4 octobre 2026

- `npm run build` et `git diff --check` réussissent.
- Tests fonctionnels React et jsdom : offres natives avant et après le montage, activation du bouton Android, confirmation acceptée, refus sans instructions, consommation unique et doubles clics, erreur et nouvelle tentative, lien Chrome, aide iPhone et fermeture par Échap, libération du défilement, persistance, réinstallation, `appinstalled`, mode autonome et hébreu.
- Version GitHub Pages contrôlée : bundle `index-C5Pyn2A3.js`, CSS `index-DJxndT-Q.css`.
- Le navigateur réel fournit une offre native : le bouton « Installer DAVIDEL » est actif et l'invitation indique de confirmer dans la fenêtre qui apparaît.
- Formats 320 × 568, 390 × 844 et 1280 × 800 contrôlés en français et en hébreu : aucun débordement horizontal de l'invitation, du texte ou des boutons.
- Le déclenchement Android est testé par simulation fonctionnelle. Aucune installation n'est effectuée sur un téléphone physique ou sur un appareil du client. Le lien Chrome est validé, sans lancer une application externe pendant le contrôle.
- La page temporaire `responsive-check.html` est supprimée après le contrôle.

Références officielles :

- https://web.dev/articles/customize-install
- https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event
- https://developer.chrome.com/docs/android/intents
