import { Fragment, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { GALLERY, img } from '../data/siteData'
import { waOpen } from '../lib/whatsapp'
import { Reveal, MaskLine } from '../lib/motion'

export default function Gallery() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(null)

  const items = GALLERY
  const go = useCallback((dir) => {
    setOpen((i) => (i === null ? null : (i + dir + items.length) % items.length))
  }, [items.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, go])

  return (
    <section className="section" id="gallery">
      <div className="section-head">
        <Reveal as="p" className="eyebrow" y={10}>{t.galEyebrow}</Reveal>
        <h2 className="display display-l"><MaskLine>{t.galTitle}</MaskLine></h2>
      </div>

      <div className="gal-grid">
        {items.map((g, i) => (
          <Fragment key={g.n}>
            {i === 4 && <Reveal className="gal-quote" y={14}>“{t.galQuote}”</Reveal>}
            {i === 9 && <Reveal className="gal-quote" y={14}>“{t.galQuote2}”</Reveal>}
            <motion.button
              className={`gal-item gal-${g.size}`}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: reduce ? 0 : 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              aria-label={`Photo ${i + 1}`}>
              <img src={img(g.n)} alt="" loading="lazy" />
            </motion.button>
          </Fragment>
        ))}
      </div>

      <div className="menu-foot">
        <p>{t.galWant}</p>
        <a className="btn btn-rose" href={waOpen(lang)} target="_blank" rel="noreferrer">
          <MessageCircle size={15} strokeWidth={1.5} />{t.talk}
        </a>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}>
            <button type="button" className="lightbox-close" onClick={(e) => { e.stopPropagation(); setOpen(null) }} aria-label={t.close}>
              <X size={28} strokeWidth={1.35} />
            </button>
            <button type="button" className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="←">
              <ChevronLeft size={30} strokeWidth={1} />
            </button>
            <motion.img
              key={open}
              src={img(items[open].n)}
              alt=""
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(e, info) => {
                if (info.offset.x < -70) go(1)
                else if (info.offset.x > 70) go(-1)
              }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }} />
            <button type="button" className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="→">
              <ChevronRight size={30} strokeWidth={1} />
            </button>
            <span className="lightbox-count">{open + 1} / {items.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
