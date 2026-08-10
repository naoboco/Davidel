import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { FILTERS, PRODUCTS } from '../data/menuData'
import { waOpen, telLink } from '../lib/whatsapp'
import { CONTACT } from '../data/siteData'
import MenuProduct from './MenuProduct'
import { Reveal, MaskLine } from '../lib/motion'

export default function Menu({ filter, setFilter }) {
  const { t, lang } = useLang()
  const shown = filter === 'tout' ? PRODUCTS : PRODUCTS.filter((p) => p.tags.includes(filter))

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
