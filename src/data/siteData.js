/* =========================================================================
   DONNÉES DE MARQUE — DAVIDEL
   -------------------------------------------------------------------------
   PHOTOS : ce sont les vraies photographies DAVIDEL (galerie du site actuel).
   Pour figer les images en local : téléchargez-les dans /public/img/1.webp …
   puis remplacez PHOTO_BASE par './img/'.
   L'ordre des photos n'a pas été vérifié visuellement : si un plateau salé
   se retrouve sur la section Pâtisserie, changez simplement le numéro.
   ========================================================================= */

export const PHOTO_BASE = 'https://davidel.co.il/img/cms/gallery/'
export const LOGO = 'https://davidel.co.il/img/logo-1748603599.svg'

export const img = (n) => `${PHOTO_BASE}${n}.webp`
export const IMAGES = Array.from({ length: 18 }, (_, i) => img(i + 1))

export const CONTACT = {
  phoneDisplay: '02-642-8866',
  phoneTel: '+97226428866',
  whatsappDisplay: '054-789-5599',
  whatsapp: '972547895599',
  email: 'contact@davidel.co.il',
  addressFr: 'Rehov Beit HaDfus 30, Givat Shaul — Jérusalem',
  addressHe: 'רחוב בית הדפוס 30, גבעת שאול — ירושלים',
  maps: 'https://maps.google.com/?q=Beit+HaDfus+30+Givat+Shaul+Jerusalem',
  instagram: 'https://www.instagram.com/davidel_jerusalem/'
}

/* Occasions — chaque entrée ouvre une sélection ciblée du menu */
export const OCCASIONS = [
  {
    id: 'shabbat',
    fr: 'Shabbat',
    he: 'שבת',
    lineFr: 'Hallotes, plateaux et desserts pour la table du vendredi.',
    lineHe: 'חלות, מגשים וקינוחים לשולחן של יום שישי.',
    products: ['viennoiserie', 'petit-plateau-sucre', 'plateau-sale', 'tarte-fruits-grand'],
    img: 5
  },
  {
    id: 'anniversaire',
    fr: 'Anniversaire',
    he: 'יום הולדת',
    lineFr: 'Un grand gâteau, des petites pâtisseries, un plateau à partager.',
    lineHe: 'עוגה גדולה, מיני-מתוקים, מגש לשיתוף.',
    products: ['bavarois', 'opera', 'gateau-individuel', 'petit-plateau-sucre'],
    img: 14
  },
  {
    id: 'brith',
    fr: 'Brith · Famille',
    he: 'ברית · משפחה',
    lineFr: 'Le matin se prépare la veille. Nous livrons prêt à dresser.',
    lineHe: 'הבוקר מתארגן מאתמול. אנחנו מגיעים מוכנים להגשה.',
    products: ['plateau-sale', 'plateau-sucre', 'croissant', 'saint-honore'],
    img: 8
  },
  {
    id: 'cocktail',
    fr: 'Cocktail',
    he: 'קוקטייל',
    lineFr: 'Bouchées salées, mignardises, service debout.',
    lineHe: 'ביסים מלוחים, מיני-מתוקים, הגשה בעמידה.',
    products: ['petit-plateau-sale', 'plateau-sale', 'rocher', 'succes'],
    img: 10
  },
  {
    id: 'entreprise',
    fr: 'Entreprise',
    he: 'חברות',
    lineFr: 'Réunions, séminaires, remerciements clients. Facture fournie.',
    lineHe: 'ישיבות, כנסים, מתנות ללקוחות. חשבונית מלאה.',
    products: ['petit-plateau-sale', 'petit-plateau-sucre', 'croissant', 'plateau-sucre'],
    img: 9
  },
  {
    id: 'reception',
    fr: 'Réception privée',
    he: 'אירוע פרטי',
    lineFr: 'Buffet complet, composition sur mesure, devis en 24 h.',
    lineHe: 'בופה מלא, הרכב לפי בקשה, הצעת מחיר תוך 24 שעות.',
    products: ['plateau-sale', 'plateau-sucre', 'opera', 'tarte-fruits-grand'],
    img: 2
  },
  {
    id: 'gourmandise',
    fr: 'Simple gourmandise',
    he: 'סתם פינוק',
    lineFr: 'Aucune occasion. C’est déjà une très bonne raison.',
    lineHe: 'בלי סיבה. וזו כבר סיבה מצוינת.',
    products: ['croissant', 'abricot', 'gateau-individuel', 'tarte-citron'],
    img: 3
  }
]

/* Univers — navigation immersive, la photographie change au survol */
export const UNIVERSES = [
  {
    id: 'patisserie',
    fr: 'Pâtisserie',
    he: 'קונדיטוריה',
    lineFr: 'Le geste français, fait ici, chaque matin, sans raccourci.',
    lineHe: 'האסכולה הצרפתית, נעשית כאן, כל בוקר, בלי קיצורי דרך.',
    ctaFr: 'Voir la carte',
    ctaHe: 'לתפריט',
    filter: 'individuel',
    img: 3
  },
  {
    id: 'traiteur',
    fr: 'Traiteur',
    he: 'קייטרינג',
    lineFr: 'Des compositions pensées pour arriver à table prêtes à impressionner.',
    lineHe: 'הרכבים שנבנו כדי להגיע לשולחן ולעשות רושם.',
    ctaFr: 'Voir les plateaux',
    ctaHe: 'למגשים',
    filter: 'grand',
    img: 10
  },
  {
    id: 'sushi',
    fr: 'Sushi',
    he: 'סושי',
    lineFr: 'Le plateau qui met tout le monde d’accord, dressé à la minute.',
    lineHe: 'המגש שכולם מסכימים עליו, מסודר ברגע.',
    ctaFr: 'Demander la sélection',
    ctaHe: 'לבקש את המבחר',
    filter: 'sale',
    img: 11
  },
  {
    id: 'grands-gateaux',
    fr: 'Grands gâteaux',
    he: 'עוגות גדולות',
    lineFr: 'Opéra, bavarois, rocher, succès. Pour 8, 20 ou 60 parts.',
    lineHe: 'אופרה, בווארואה, רושה, סוקסה. ל-8, 20 או 60 מנות.',
    ctaFr: 'Choisir un gâteau',
    ctaHe: 'לבחור עוגה',
    filter: 'sucre',
    img: 15
  },
  {
    id: 'receptions',
    fr: 'Réceptions',
    he: 'אירועים',
    lineFr: 'Vous donnez la date et le nombre. Nous nous occupons du reste.',
    lineHe: 'אתם נותנים תאריך ומספר. אנחנו דואגים לשאר.',
    ctaFr: 'Demander un devis',
    ctaHe: 'לבקש הצעת מחיר',
    filter: 'evenement',
    img: 2
  }
]

/* Galerie éditoriale : n° de photo + format (t = tall, w = wide, s = square) */
export const GALLERY = [
  { n: 1, size: 't' }, { n: 6, size: 's' }, { n: 12, size: 'w' },
  { n: 4, size: 's' }, { n: 9, size: 't' }, { n: 16, size: 's' },
  { n: 7, size: 'w' }, { n: 13, size: 's' }, { n: 2, size: 't' },
  { n: 17, size: 's' }, { n: 11, size: 'w' }, { n: 18, size: 's' }
]

export const INSTA = [8, 14, 5, 10, 16, 12]

export const HOURS = [
  { fr: 'Dimanche — Jeudi', he: 'ראשון — חמישי', v: '07:00 · 19:00' },
  { fr: 'Vendredi', he: 'שישי', v: '07:00 · 14:30' },
  { fr: 'Shabbat', he: 'שבת', v: 'Fermé' }
]
