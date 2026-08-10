import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Plus } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { OCCASIONS, img } from '../data/siteData'
import { PRODUCTS } from '../data/menuData'
import { waOccasion } from '../lib/whatsapp'
import { useCarnet } from '../lib/CarnetContext'
import { Reveal, MaskLine } from '../lib/motion'

export default function Occasions({ onSeeAll }) {
  const { t, f, lang } = useLang()
  const { add } = useCarnet()
  const [active, setActive] = useState(OCCASIONS[0].id)
  const occ = OCCASIONS.find((o) => o.id === active)
  const list = occ.products.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)

  return (
    <section className="section" id="occasions">
      <div className="section-head">
        <Reveal as="p" className="eyebrow" y={10}>{t.occSelection}</Reveal>
        <h2 className="display display-l">
          <MaskLine>{t.occTitle1}</MaskLine>
          <MaskLine delay={0.08}>{t.occTitle2}</MaskLine>
        </h2>
        <Reveal as="p" className="lede" y={12} delay={0.1}>{t.occLead}</Reveal>
      </div>

      <Reveal className="occ-grid" y={16}>
        {OCCASIONS.map((o) => (
          <button key={o.id}
            className={`occ-chip${o.id === active ? ' is-on' : ''}`}
            onClick={() => setActive(o.id)}
            aria-pressed={o.id === active}>
            {f(o)}
          </button>
        ))}
      </Reveal>

      <div className="occ-panel">
        <div className="occ-visual">
          <AnimatePresence mode="wait">
            <motion.img key={occ.id} src={img(occ.img)} alt={f(occ)}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
          </AnimatePresence>
          <span className="cap">{f(occ)}</span>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div key={occ.id}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <p className="lede" style={{ marginTop: 0 }}>{f(occ, 'line')}</p>
              <div className="occ-list">
                {list.map((p) => (
                  <div className="occ-line" key={p.id}>
                    <span className="nm">{f(p)}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span className="pr">{p.price} ₪</span>
                      <button className="btn btn-ligne btn-sm" onClick={() => add(p)} aria-label={t.addToCarnet}>
                        <Plus size={13} strokeWidth={1.6} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="occ-cta">
            <a className="btn btn-rose" href={waOccasion(f(occ), lang)} target="_blank" rel="noreferrer">
              <MessageCircle size={15} strokeWidth={1.5} />{t.occWhats(f(occ))}
            </a>
            <button className="btn btn-ligne" onClick={() => onSeeAll('tout')}>
              {t.seeAll}<ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
