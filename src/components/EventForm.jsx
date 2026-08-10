import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { waEvent } from '../lib/whatsapp'

const STEPS = 4

export default function EventForm() {
  const { t, lang } = useLang()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ type: '', guests: '', date: '', name: '', phone: '', email: '' })
  const [sent, setSent] = useState(false)

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const next = () => setStep((s) => Math.min(s + 1, STEPS - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const canNext =
    (step === 0 && data.type) ||
    (step === 1 && data.guests) ||
    (step === 2 && data.date) ||
    (step === 3 && data.name && data.phone)

  const submit = () => {
    if (!canNext) return
    setSent(true)
    window.open(waEvent(data, lang), '_blank', 'noopener')
  }

  const questions = [t.q1, t.q2, t.q3, t.q4]

  return (
    <div className="form-card">
      {sent ? (
        <div className="form-done">
          <div className="seal"><Check size={22} strokeWidth={1.4} /></div>
          <p className="lede" style={{ margin: '0 auto' }}>{t.formDone}</p>
          <a className="btn btn-rose" style={{ marginTop: 18 }} href={waEvent(data, lang)} target="_blank" rel="noreferrer">
            <MessageCircle size={15} strokeWidth={1.5} />{t.continueWhats}
          </a>
        </div>
      ) : (
        <>
          <div className="form-progress" aria-hidden="true">
            {Array.from({ length: STEPS }).map((_, i) => (
              <i key={i} className={i <= step ? 'is-done' : ''}>
                {i <= step && (
                  <motion.span layoutId={`bar-${i}`}
                    style={{ position: 'absolute', inset: 0, background: 'var(--rose)' }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }} />
                )}
              </i>
            ))}
          </div>

          <div className="form-step-label">
            <span>{t.formStep} {step + 1} {t.formOf} {STEPS}</span>
            <span>{Math.round(((step + 1) / STEPS) * 100)} %</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <h3 className="form-q">{questions[step]}</h3>

              {step === 0 && (
                <div className="form-options">
                  {t.types.map((ty) => (
                    <button key={ty} className={`form-option${data.type === ty ? ' is-on' : ''}`}
                      onClick={() => { set('type', ty); setTimeout(next, 220) }}>{ty}</button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="form-options">
                  {t.guests.map((g) => (
                    <button key={g} className={`form-option${data.guests === g ? ' is-on' : ''}`}
                      onClick={() => { set('guests', g); setTimeout(next, 220) }}>{g}</button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="field">
                  <label htmlFor="ev-date">{t.q3}</label>
                  <input id="ev-date" type="date" value={data.date} onChange={(e) => set('date', e.target.value)} />
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="field">
                    <label htmlFor="ev-name">{t.name}</label>
                    <input id="ev-name" value={data.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="ev-phone">{t.phone}</label>
                    <input id="ev-phone" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="ev-email">{t.email}</label>
                    <input id="ev-email" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="form-nav">
            {step > 0 && <button className="form-back" onClick={back}>{t.back}</button>}
            <span style={{ flex: 1 }} />
            {step < STEPS - 1 ? (
              <button className="btn btn-craie btn-sm" onClick={next} disabled={!canNext}
                style={{ opacity: canNext ? 1 : 0.4 }}>
                {t.next}<ArrowRight size={14} strokeWidth={1.5} />
              </button>
            ) : (
              <button className="btn btn-rose btn-sm" onClick={submit} disabled={!canNext}
                style={{ opacity: canNext ? 1 : 0.4 }}>
                {t.send}<ArrowRight size={14} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
