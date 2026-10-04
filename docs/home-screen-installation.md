# Installation sur l'écran d'accueil

Une invitation visible sous la présentation de DAVIDEL propose deux boutons, en français et en hébreu : « Installer sur Android » et « Ajouter sur iPhone ». Le bouton flottant existant reste disponible pendant la navigation.

Sur Android, lorsque le navigateur fournit une demande d'installation native, le bouton l'ouvre. Sinon, les instructions d'ajout depuis le menu du navigateur s'affichent. Sur iPhone, les instructions indiquent Safari, Partager, puis Sur l'écran d'accueil.

L'invitation est masquée dans l'application autonome et après une installation détectée. Cette détection est conservée localement. Un nouvel événement d'éligibilité à l'installation annule la mémorisation précédente pour permettre une réinstallation. Chaque demande native est consommée une seule fois, même après un refus. Les erreurs de demande ouvrent les instructions.

Le manifeste conserve son identité et son périmètre existants. Il référence également les icônes PNG 192 et 512 pixels et une icône maskable. La balise apple-touch-icon est ajoutée. Le cache passe à `davidel-pwa-v9`.

## Vérifications du 4 octobre 2026

- `npm run build` et `git diff --check` réussissent.
- Les dimensions des trois icônes PNG correspondent au manifeste.
- Tests fonctionnels React et jsdom : affichage initial, instructions, fermeture par Échap et libération du défilement, demande native refusée non réutilisée, mémorisation après appinstalled, masquage après remontage et en mode autonome, réinstallation éligible et acceptation.
- Simulation d'un navigateur Android : le bouton explicite déclenche une demande native unique ; un second clic après refus affiche les instructions ; une installation détectée masque les deux invitations.
- Contrôle navigateur de la version GitHub Pages publiée, bundle `index-DXbicapk.js` et CSS `index-B_UOy3JV.css` : formats 320 × 568, 390 × 844 et 1280 × 800 en français et en hébreu. Aucun débordement horizontal de l'invitation, des boutons ou de la fenêtre d'aide. Zones des boutons d'au moins 44 pixels.
- Le bouton Android ouvre les instructions dans le navigateur de contrôle sur ordinateur. La demande native Android est contrôlée par simulation ; aucune application n'est installée sur un appareil du client pendant ces tests.
- La page temporaire `responsive-check.html` est supprimée après le contrôle.

Références techniques : documentation Chrome des critères du manifeste et documentation MDN de `beforeinstallprompt` et `appinstalled`.

- https://developer.chrome.com/docs/lighthouse/pwa/installable-manifest
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt
