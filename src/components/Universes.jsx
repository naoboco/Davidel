import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { UNIVERSES, img } from '../data/siteData'
import { waOccasion } from '../lib/whatsapp'
import { Reveal, MaskLine } from '../lib/motion'

export default function Universes({ onFilter }) {
  const { t, f, lang } = useLang()
  const universes = UNIVERSES.filter((u) => u.id !== 'sushi')
  const [active, setActive] = useState(universes[0].id)
  const uni = universes.find((u) => u.id === active) || universes[0]

  return (
    <section className="section uni" id="univers" style={{ paddingBottom: 0 }}>
      <div className="section-head">
        <Reveal as="p" className="eyebrow" y={10}>{t.uniEyebrow}</Reveal>
        <h2 className="display display-l"><MaskLine>{t.uniTitle}</MaskLine></h2>
      </div>

      <div className="uni-stage">
        <div className="uni-names">
          {universes.map((u, i) => (
            <div key={u.id}>
              <button
                className={`uni-name${u.id === active ? ' is-on' : ''}`}
                onMouseEnter={() => setActive(u.id)}
                onFocus={() => setActive(u.id)}
                onClick={() => setActive(u.id)}
                aria-expanded={u.id === active}>
                <span className="idx">0{i + 1}</span>{f(u)}
              </button>

              <AnimatePresence initial={false}>
                {u.id === active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}>
                    <p className="uni-desc">{f(u, 'line')}</p>
                    <div className="uni-actions">
                      <button className="btn btn-craie btn-sm" onClick={() => onFilter(u.filter)}>
                        {f(u, 'cta')}<ArrowRight size={14} strokeWidth={1.5} />
                      </button>
                      <a className="btn btn-ligne btn-sm" href={waOccasion(f(u), lang)} target="_blank" rel="noreferrer">
                        <MessageCircle size={14} strokeWidth={1.5} />{t.quote}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="uni-media">
          <AnimatePresence mode="wait">
            <motion.img key={uni.id} src={img(uni.img)} alt={f(uni)}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
