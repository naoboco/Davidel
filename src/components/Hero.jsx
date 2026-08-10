import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { img } from '../data/siteData'
import { waOpen } from '../lib/whatsapp'
import { MaskLine } from '../lib/motion'

export default function Hero({ onOrder }) {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 20 })
  const y = useSpring(my, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e) => {
      const cx = e.clientX / window.innerWidth - 0.5
      const cy = e.clientY / window.innerHeight - 0.5
      mx.set(cx * -26)
      my.set(cy * -18)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduce])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-text">
        <motion.p className="eyebrow"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 1 }}>
          {t.heroEyebrow}
        </motion.p>

        <h1 className="hero-title display display-xl">
          <MaskLine delay={0.2}>{t.heroTitle1}</MaskLine>
          <MaskLine delay={0.32}>{t.heroTitle2}</MaskLine>
          <motion.span className="l3"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            {t.heroTitle3}
          </motion.span>
        </h1>

        <motion.p className="lede"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.9 }}>
          {t.heroText}
        </motion.p>

        <motion.div className="hero-actions"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.84, duration: 0.9 }}>
          <button className="btn btn-rose" onClick={onOrder}>
            {t.heroCta}<ArrowRight size={15} strokeWidth={1.5} />
          </button>
          <a className="btn btn-ligne" href={waOpen(lang)} target="_blank" rel="noreferrer">
            <MessageCircle size={15} strokeWidth={1.5} />{t.whatsapp}
          </a>
        </motion.div>

        <motion.p className="hero-note"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          <span className="dot" />{t.heroNote}
        </motion.p>
      </div>

      <div className="hero-media">
        <motion.div style={{ x, y, position: 'absolute', inset: '-3%', width: '106%', height: '106%' }}>
          <motion.img
            src={img(1)} alt="Création DAVIDEL"
            initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} />
        </motion.div>
        <span className="hero-tag">Maison DAVIDEL · Givat Shaul</span>
      </div>

      <div className="scroll-hint"><span className="line" />{t.scroll}</div>
    </section>
  )
}
