import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu as Burger, X, MessageCircle, Phone } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { LOGO, CONTACT } from '../data/siteData'
import { waOpen, telLink } from '../lib/whatsapp'

const SECTIONS = ['home', 'menu', 'events', 'gallery', 'contact']
const ANCHORS = { home: '#top', menu: '#menu', events: '#events', gallery: '#gallery', contact: '#contact' }

export default function Header({ onOrder }) {
  const { t, lang, setLang } = useLang()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const jump = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
  }

  return (
    <>
      <header className={`header${stuck ? ' is-stuck' : ''}`}>
        <nav className="header-nav" aria-label="Navigation principale">
          {SECTIONS.map((s) => (
            <a key={s} className="header-link" href={ANCHORS[s]}
               onClick={(e) => { e.preventDefault(); jump(ANCHORS[s]) }}>
              {t.nav[s]}
            </a>
          ))}
        </nav>

        <button className="burger" onClick={() => setOpen(true)} aria-label={t.nav.menu}>
          <Burger size={22} strokeWidth={1.2} />
        </button>

        <a className="header-logo" href="#top" aria-label="DAVIDEL">
          <img src={LOGO} alt="DAVIDEL" />
        </a>

        <div className="header-right">
          <div className="lang" role="group" aria-label="Langue">
            <button className={lang === 'fr' ? 'is-on' : ''} onClick={() => setLang('fr')}>FR</button>
            <span>/</span>
            <button className={lang === 'he' ? 'is-on' : ''} onClick={() => setLang('he')}>HE</button>
          </div>
          <button className="btn btn-rose btn-sm" onClick={onOrder}>{t.order}</button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fullmenu"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <button className="burger" style={{ position: 'absolute', top: 22, insetInlineEnd: 'var(--gutter)' }}
                    onClick={() => setOpen(false)} aria-label={t.close}>
              <X size={24} strokeWidth={1.2} />
            </button>

            <div className="fullmenu-list">
              {SECTIONS.map((s, i) => (
                <motion.button key={s} className="fullmenu-item"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => jump(ANCHORS[s])}>
                  <span className="num">0{i + 1}</span>{t.nav[s]}
                </motion.button>
              ))}
            </div>

            <div className="fullmenu-actions">
              <a className="btn btn-rose" href={waOpen(lang)} target="_blank" rel="noreferrer">
                <MessageCircle size={16} strokeWidth={1.4} />{t.whatsapp}
              </a>
              <a className="btn btn-ligne" href={telLink}>
                <Phone size={16} strokeWidth={1.4} />{CONTACT.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
