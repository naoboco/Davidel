# Vérification responsive DAVIDEL

Vérification du site publié dans Chrome, avec des fenêtres de rendu de taille fixe. Les contrôles portent sur la version `836198e94033f50623de45a20d5f316c13bf126f` et les styles `index-D_YZu6C2.css`.

## Affichage

Chaque format a été contrôlé en français et en hébreu (RTL), après la fin des transitions de mise en page. Les barres de défilement classiques de Chrome occupent 15 px ; les limites ont été mesurées dans la zone de contenu réelle, y compris leur position à gauche en RTL.

| Fenêtre de rendu | Colonnes du menu | Français | Hébreu |
| --- | ---: | --- | --- |
| 320 × 568 | 2 | Conforme | Conforme |
| 360 × 800 | 2 | Conforme | Conforme |
| 390 × 844 | 2 | Conforme | Conforme |
| 430 × 932 | 2 | Conforme | Conforme |
| 844 × 390 | 2 | Conforme | Conforme |
| 768 × 1024 | 2 | Conforme | Conforme |
| 1024 × 768 | 3 | Conforme | Conforme |
| 1081 × 800 | 3 | Conforme | Conforme |
| 1280 × 800 | 4 | Conforme | Conforme |
| 1920 × 1080 | 6 | Conforme | Conforme |

Aucun dépassement horizontal relevé sur les éléments contrôlés : en-tête, navigation, titres, noms et actions des produits, lignes des occasions, réceptions, formulaire, contact, aperçu Instagram et pied de page.

Sur téléphone, les images sont au format 3:2, les cartes sont plus compactes et les boutons d'ajout gardent une zone de 44 px. La commande mène directement aux filtres. La capture à 390 × 844 montre quatre articles à l'écran, avec croissant et pain au chocolat sur des cartes distinctes.

## Interactions et lisibilité

- Menu : 19 produits avec le filtre « Tout » ; 2 plateaux avec « Salé » ; retour au catalogue complet.
- Ajout : pastille claire, texte foncé en graisse 700, taille 12 px et annonce `role="status"`. La confirmation reste affichée 2,4 s après le dernier ajout. Un test avec horloge contrôlée vérifie que le second ajout réinitialise ce délai et que le démontage supprime le minuteur.
- Panier : deux croissants et un pain au chocolat donnent 24 ₪ ; retirer un croissant donne 16 ₪ et laisse le pain au chocolat indépendant. Vidage vérifié. Le total utilise Jost en français et Heebo en hébreu, graisse 700, taille 30 px sur téléphone.
- Petit écran et paysage : panneau et pied du panier contenus dans la fenêtre ; liste intérieure défilable ; boutons de quantité de 44 px.
- Navigation mobile : ouverture, accès aux réceptions et fermeture avec restauration du défilement.
- Formulaire : quatre étapes parcourues à 320 px, choix d'occasion et d'invités, date au clavier, nom et téléphone fictifs. Bouton final activé ; champs et bouton contenus à 320 px en FR/HE et à 844 × 390. Aucune demande envoyée.
- Installation : aide testée en hébreu à 844 × 390, avec contenu défilable dans une fenêtre de 342 px ; fermeture avec Échap.
- Galerie : passage rapide de la photo 1 à la photo 3, fermeture, réouverture et fermeture avec Échap. L'image reste montée pendant le changement de source pour éviter un élément de sortie invisible qui intercepte les clics.
- Défilement : blocage de `html` et `body` pendant les fenêtres ; valeurs antérieures restaurées à la fermeture et au démontage, contrôlées également par un test React dans jsdom.

## Validation technique et portée

`npm run build` et `git diff --check` réussis. Publication GitHub Pages réussie. Les essais utilisent Chrome et des tailles de fenêtres simulées ; Safari, Firefox, le clavier natif et les appareils physiques ne font pas partie de cette vérification.

La page publique de contrôle utilisée pour les essais a été retirée après validation.
