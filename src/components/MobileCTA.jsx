import { MessageCircle, ShoppingBag, Phone } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { waOpen, telLink } from '../lib/whatsapp'

export default function MobileCTA({ onOrder }) {
  const { t, lang } = useLang()

  const tap = () => { if (navigator.vibrate) navigator.vibrate(6) }

  return (
    <nav className="mobile-bar" aria-label="Actions rapides">
      <a href={waOpen(lang)} target="_blank" rel="noreferrer" onClick={tap}>
        <MessageCircle size={19} strokeWidth={1.4} />{t.whatsapp}
      </a>
      <button className="is-primary" onClick={() => { tap(); onOrder() }}>
        <ShoppingBag size={19} strokeWidth={1.4} />{t.order}
      </button>
      <a href={telLink} onClick={tap}>
        <Phone size={19} strokeWidth={1.4} />{t.call}
      </a>
    </nav>
  )
}
