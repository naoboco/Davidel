import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, MessageCircle, NotebookPen } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { useCarnet } from '../lib/CarnetContext'
import { waCarnet } from '../lib/whatsapp'

export default function Carnet() {
  const { t, lang, rtl } = useLang()
  const { lines, setQty, clear, count, total, open, setOpen } = useCarnet()

  return (
    <>
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button className="carnet-tab"
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 22 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(true)}>
            <NotebookPen size={16} strokeWidth={1.4} />
            {t.carnet}
            <span className="n">{count}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="scrim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />

            <motion.aside className="carnet-panel"
              initial={{ x: rtl ? '-100%' : '100%' }} animate={{ x: 0 }} exit={{ x: rtl ? '-100%' : '100%' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              role="dialog" aria-label={t.carnet}>
              <div className="carnet-head">
                <span className="ttl">{t.carnet}</span>
                <button onClick={() => setOpen(false)} aria-label={t.close}>
                  <X size={22} strokeWidth={1.2} />
                </button>
              </div>
              <hr className="stitch" style={{ marginInline: 24 }} />

              <div className="carnet-body">
                {lines.length === 0 ? (
                  <p className="carnet-empty">{t.carnetEmpty}</p>
                ) : (
                  lines.map((l) => (
                    <div className="carnet-line" key={l.id}>
                      <span className="nm">{lang === 'he' ? l.he : l.fr}</span>
                      <span className="pr">{l.price * l.qty} ₪</span>
                      <div className="qty">
                        <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="−">
                          <Minus size={13} strokeWidth={1.6} />
                        </button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="+">
                          <Plus size={13} strokeWidth={1.6} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="carnet-foot">
                <div className="carnet-total">
                  <span className="k">{t.carnetTotal}</span>
                  <span className="v">{total} ₪</span>
                </div>
                <a className="btn btn-rose"
                   style={{ justifyContent: 'center', opacity: lines.length ? 1 : 0.35, pointerEvents: lines.length ? 'auto' : 'none' }}
                   href={waCarnet(lines, total, lang)} target="_blank" rel="noreferrer">
                  <MessageCircle size={15} strokeWidth={1.5} />{t.carnetSend}
                </a>
                {lines.length > 0 && (
                  <button className="form-back" onClick={clear}>{t.carnetClear}</button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
