import { useLang } from '../i18n/LangContext'
import { CONTACT } from '../data/siteData'
import BrandLogo from './BrandLogo'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <BrandLogo className="footer-logo" />
      <small>{t.footerNote} · {CONTACT.phoneDisplay}</small>
      <small>© {new Date().getFullYear()} DAVIDEL. {t.rights}</small>
    </footer>
  )
}
