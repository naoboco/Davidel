import { useLang } from '../i18n/LangContext'
import { Reveal } from '../lib/motion'

export default function TrustBar() {
  const { t } = useLang()
  return (
    <Reveal className="trust" as="div" y={12}>
      {t.trust.map((item, i) => (
        <span key={item} style={{ display: 'inline-flex', gap: '10px 24px', alignItems: 'center' }}>
          {item}
          {i < t.trust.length - 1 && <span className="sep" aria-hidden="true">·</span>}
        </span>
      ))}
    </Reveal>
  )
}
