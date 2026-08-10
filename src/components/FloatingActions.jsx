import { MessageCircle, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { waOpen, telLink, mailLink } from '../lib/whatsapp'

export default function FloatingActions() {
  const { t, lang } = useLang()

  const items = [
    { Icon: MessageCircle, label: lang === 'he' ? 'לכתוב לנו בווטסאפ' : 'Écrivez-nous sur WhatsApp', href: waOpen(lang), ext: true },
    { Icon: Mail, label: lang === 'he' ? 'לשלוח אימייל' : 'Envoyer un e-mail', href: mailLink(lang) },
    { Icon: Phone, label: lang === 'he' ? 'להתקשר ל-DAVIDEL' : 'Appeler DAVIDEL', href: telLink }
  ]

  return (
    <motion.div className="rail"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      {items.map(({ Icon, label, href, ext }) => (
        <a key={label} className="rail-btn" href={href} aria-label={label}
           {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
          <span className="lb">{label}</span>
          <span className="ic"><Icon size={17} strokeWidth={1.4} /></span>
        </a>
      ))}
    </motion.div>
  )
}
