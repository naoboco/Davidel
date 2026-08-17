import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { FILTERS, PRODUCTS } from '../data/menuData'
import { waOpen, telLink } from '../lib/whatsapp'
import { CONTACT } from '../data/siteData'
import { cmsConfigured, publicProducts } from '../lib/supabaseCms'
import MenuProduct from './MenuProduct'
import { Reveal, MaskLine } from '../lib/motion'

function fromCms(row) {
  return {
    id: row.id,
    fr: row.name_fr,
    he: row.name_he,
    descFr: row.description_fr || '',
    descHe: row.description_he || '',
    price: Number(row.price || 0),
    tags: Array.isArray(row.tags) ? row.tags : [],
    image_url: row.image_url || '',
    unavailable: Boolean(row.unavailable_label),
  }
}

export default function Menu({ filter, setFilter }) {
  const { t, lang } = useLang()
  const [products, setProducts] = useState(PRODUCTS)

  useEffect(() => {
    if (!cmsConfigured) return
    let alive = true
    publicProducts()
      .then(rows => {
        if (alive && Array.isArray(rows) && rows.length) setProducts(rows.map(fromCms))
      })
      .catch(err => console.warn('DAVIDEL CMS fallback local:', err.message))
    return () => { alive = false }
  }, [])

  const shown = useMemo(
    () => filter === 'tout' ? products : products.filter((p) => p.tags.includes(filter)),
    [filter, products]
  )

  return (
    <section className="section" id="menu">
      <div className="section-head">
        <Reveal as="p" className="eyebrow" y={10}>{t.menuEyebrow}</Reveal>
        <h2 className="display display-l"><MaskLine>{t.menuTitle}</MaskLine></h2>
        <Reveal as="p" className="lede" y={12} delay={0.08}>{t.menuLead}</Reveal>
      </div>

      <div className="menu-filters" role="group" aria-label={t.menuEyebrow}>
        {FILTERS.map((ft) => (
          <button key={ft.id}
            className={`menu-filter${filter === ft.id ? ' is-on' : ''}`}
            onClick={() => setFilter(ft.id)}
            aria-pressed={filter === ft.id}>
            {lang === 'he' ? ft.he : ft.fr}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <div className="menu-grid">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => <MenuProduct key={p.id} product={p} />)}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      <div className="menu-foot">
        <p>{t.menuAdvice}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a className="btn btn-rose" href={waOpen(lang)} target="_blank" rel="noreferrer">
            <MessageCircle size={15} strokeWidth={1.5} />{t.whatsapp}
          </a>
          <a className="btn btn-ligne" href={telLink}>
            <Phone size={15} strokeWidth={1.5} />{CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
