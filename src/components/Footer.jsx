import { useLang } from '../i18n/LangContext'
import { LOGO, CONTACT } from '../data/siteData'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <img className="footer-logo" src={LOGO} alt="DAVIDEL" />
      <small>{t.footerNote} · {CONTACT.phoneDisplay}</small>
      <small>© {new Date().getFullYear()} DAVIDEL. {t.rights}</small>
    </footer>
  )
}
