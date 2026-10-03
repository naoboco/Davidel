import { PRODUCTS } from '../data/menuData.js'

const separators = /\s*(?:[·•/|]|\s+\+\s+|\s+&\s+|\s+et\s+)\s*/u

export const splitProductNames = (name = '') => String(name).split(separators).map((part) => part.trim()).filter(Boolean)

const key = (name = '') => String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

const aliases = {
  hallotes: 'hallote',
  hallah: 'hallote',
  halla: 'hallote',
  challah: 'hallote',
  'חלות': 'hallote'
}

export function catalogProduct(name, tags = []) {
  const normalized = key(name)
  const alias = aliases[normalized]
  if (alias) return PRODUCTS.find((product) => product.id === alias)
  const candidates = PRODUCTS.filter((product) => (
    key(product.fr) === normalized
    || key(product.fr).replace(/ grand format$/, '') === normalized
    || key(product.he) === normalized
    || key(product.he).replace(/ גדול$/, '') === normalized
  ))
  return candidates.find((product) => product.tags.includes('grand') === tags.includes('grand')) || candidates[0]
}

export function normalizeProducts(products) {
  const unique = new Map()

  for (const [position, source] of products.entries()) {
    const namesFr = splitProductNames(source.fr)
    const namesHe = splitProductNames(source.he)
    const grouped = namesFr.length > 1 || namesHe.length > 1
    const count = Math.max(namesFr.length, namesHe.length)

    for (let index = 0; index < count; index++) {
      const fr = namesFr[index] || namesHe[index]
      const he = namesHe[index] || fr
      const tags = Array.isArray(source.tags) ? source.tags : []
      const template = catalogProduct(fr, tags) || catalogProduct(he, tags)
      const legacyImage = /davidel\.co\.il\/img\/cms\/gallery\//i.test(source.image_url || '')
      const product = {
        ...source,
        id: index === 0 ? source.id : `${source.id}:${template?.id || index}`,
        catalogId: template?.id || source.catalogId || source.id,
        fr: template?.fr || fr,
        he: template?.he || he,
        descFr: grouped ? (template?.descFr || '') : (source.descFr || template?.descFr || ''),
        descHe: grouped ? (template?.descHe || '') : (source.descHe || template?.descHe || ''),
        tags: grouped && template ? template.tags : tags,
        image_url: grouped || legacyImage || !source.image_url ? (template?.image_url || source.image_url) : source.image_url,
        img: template?.img || source.img
      }
      const identity = `${key(product.fr)}:${product.tags.includes('grand') ? 'grand' : 'individuel'}`
      const previous = unique.get(identity)
      if (!previous || (previous.grouped && !grouped)) unique.set(identity, { product, grouped, position, index })
    }
  }

  return [...unique.values()]
    .sort((a, b) => a.position - b.position || a.index - b.index)
    .map(({ product }) => product)
}

export function singleProductError(product) {
  if (splitProductNames(product.name_fr).length > 1 || splitProductNames(product.name_he).length > 1) {
    return 'Créez une fiche par produit : par exemple « Croissant » et « Pain au chocolat » sur deux fiches séparées.'
  }
  return ''
}
