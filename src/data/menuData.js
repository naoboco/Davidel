/* =========================================================================
   MENU DAVIDEL — fichier de données
   -------------------------------------------------------------------------
   Pour modifier un prix : changez la valeur "price". C'est tout.
   Pour ajouter un produit : copiez un bloc, changez "id" (unique).
   tags : 'individuel' | 'grand' | 'sale' | 'sucre' | 'evenement'
   img  : index de la photo dans src/data/siteData.js -> IMAGES
   ========================================================================= */

export const FILTERS = [
  { id: 'tout', fr: 'Tout', he: 'הכול' },
  { id: 'individuel', fr: 'Individuel', he: 'ליחיד' },
  { id: 'grand', fr: 'Grand format', he: 'פורמט גדול' },
  { id: 'sale', fr: 'Salé', he: 'מלוח' },
  { id: 'sucre', fr: 'Sucré', he: 'מתוק' },
  { id: 'evenement', fr: 'Événement', he: 'אירועים' }
]

export const PRODUCTS = [
  // ---------------------------- INDIVIDUEL ----------------------------
  {
    id: 'croissant',
    fr: 'Croissant · Pain au chocolat',
    he: 'קרואסון · פן או שוקולה',
    descFr: 'Pur beurre, feuilletage lent, cuit le matin même.',
    descHe: 'חמאה טהורה, בצק עלים, נאפה באותו בוקר.',
    price: 8,
    tags: ['individuel', 'sucre'],
    img: 3
  },
  {
    id: 'abricot',
    fr: 'Abricot',
    he: 'משמש',
    descFr: 'Feuilleté à l’abricot, glaçage discret.',
    descHe: 'עלים במשמש, ציפוי עדין.',
    price: 10,
    tags: ['individuel', 'sucre'],
    img: 4
  },
  {
    id: 'viennoiserie',
    fr: 'Viennoiserie · Hallotes',
    he: 'מאפה · חלות',
    descFr: 'La corbeille du vendredi, tiède si vous arrivez tôt.',
    descHe: 'סל יום שישי — חם, אם תקדימו.',
    price: 12,
    tags: ['individuel', 'sucre'],
    img: 5
  },
  {
    id: 'gateau-individuel',
    fr: 'Gâteau individuel',
    he: 'עוגה אישית',
    descFr: 'La vitrine change chaque jour. Demandez ce qui sort du four.',
    descHe: 'התצוגה מתחלפת מדי יום. שאלו מה יצא מהתנור.',
    price: 20,
    tags: ['individuel', 'sucre'],
    img: 6
  },
  {
    id: 'saint-honore',
    fr: 'Saint-Honoré · Tarte aux fruits',
    he: 'סנט-הונורה · טארט פירות',
    descFr: 'Le classique parisien et sa version fruitée.',
    descHe: 'הקלאסיקה הפריזאית והגרסה הפירותית שלה.',
    price: 22,
    tags: ['individuel', 'sucre'],
    img: 7
  },

  // ---------------------------- GRAND FORMAT ----------------------------
  {
    id: 'petit-plateau-sale',
    fr: 'Petit plateau salé',
    he: 'מגש מלוח קטן',
    descFr: 'Pour une réunion, un kiddouch intime, un apéritif à la maison.',
    descHe: 'לפגישה, לקידוש קטן, לאפריטיף בבית.',
    price: 125,
    tags: ['grand', 'sale', 'evenement'],
    img: 8
  },
  {
    id: 'petit-plateau-sucre',
    fr: 'Petit plateau sucré',
    he: 'מגש מתוק קטן',
    descFr: 'Un assortiment de mignardises, dressé pour être vu.',
    descHe: 'מבחר מיני-מתוקים, מסודר להיראות.',
    price: 145,
    tags: ['grand', 'sucre', 'evenement'],
    img: 9
  },
  {
    id: 'plateau-sale',
    fr: 'Plateau salé',
    he: 'מגש מלוח',
    descFr: 'Le format des grandes tablées. Arrive prêt à servir.',
    descHe: 'הפורמט לשולחנות הגדולים. מגיע מוכן להגשה.',
    price: 200,
    tags: ['grand', 'sale', 'evenement'],
    img: 10
  },
  {
    id: 'plateau-sucre',
    fr: 'Plateau sucré',
    he: 'מגש מתוק',
    descFr: 'La fin de repas qui fait sortir les téléphones.',
    descHe: 'סוף הארוחה שמוציא את הטלפונים.',
    price: 220,
    tags: ['grand', 'sucre', 'evenement'],
    img: 11
  },
  {
    id: 'tarte-citron',
    fr: 'Tarte au citron',
    he: 'טארט לימון',
    descFr: 'Acidulée, meringuée, tranchée net.',
    descHe: 'חמצמצה, מרנג, פרוסה נקייה.',
    price: 160,
    tags: ['grand', 'sucre'],
    img: 12
  },
  {
    id: 'tarte-chocolat',
    fr: 'Tarte au chocolat',
    he: 'טארט שוקולד',
    descFr: 'Ganache dense, pâte sablée fine.',
    descHe: 'גנאש עשיר, בצק פריך דק.',
    price: 160,
    tags: ['grand', 'sucre'],
    img: 13
  },
  {
    id: 'bavarois',
    fr: 'Bavarois',
    he: 'בווארואה',
    descFr: 'Mousse légère, insert fruité, finition miroir.',
    descHe: 'מוס אוורירי, מילוי פירות, גימור מראה.',
    price: 180,
    tags: ['grand', 'sucre', 'evenement'],
    img: 14
  },
  {
    id: 'opera',
    fr: 'Opéra',
    he: 'אופרה',
    descFr: 'Café, chocolat, sept couches, aucune approximation.',
    descHe: 'קפה, שוקולד, שבע שכבות, בלי פשרות.',
    price: 180,
    tags: ['grand', 'sucre', 'evenement'],
    img: 15
  },
  {
    id: 'rocher',
    fr: 'Rocher',
    he: 'רושה',
    descFr: 'Praliné, croustillant, chocolat noir.',
    descHe: 'פרלינה, קראנץ׳, שוקולד מריר.',
    price: 200,
    tags: ['grand', 'sucre', 'evenement'],
    img: 16
  },
  {
    id: 'succes',
    fr: 'Succès',
    he: 'סוקסה',
    descFr: 'Dacquoise aux amandes et crème pralinée.',
    descHe: 'דקואז שקדים וקרם פרלינה.',
    price: 200,
    tags: ['grand', 'sucre', 'evenement'],
    img: 17
  },
  {
    id: 'tarte-fruits-grand',
    fr: 'Tarte aux fruits — grand format',
    he: 'טארט פירות — גדול',
    descFr: 'Fruits de saison, montés à la commande.',
    descHe: 'פירות העונה, מורכב לפי הזמנה.',
    price: 200,
    tags: ['grand', 'sucre', 'evenement'],
    img: 18
  }
]
