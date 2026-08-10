import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { CONTACT, HOURS, img } from '../data/siteData'
import { waOpen, telLink, mailLink } from '../lib/whatsapp'
import { Reveal, MaskLine } from '../lib/motion'

export default function Contact() {
  const { t, lang } = useLang()

  const actions = [
    { k: t.whatsapp, v: CONTACT.whatsappDisplay, href: waOpen(lang), Icon: MessageCircle, ext: true },
    { k: t.call, v: CONTACT.phoneDisplay, href: telLink, Icon: Phone },
    { k: t.mail, v: CONTACT.email, href: mailLink(lang), Icon: Mail },
    { k: t.visit, v: lang === 'he' ? 'גבעת שאול' : 'Givat Shaul', href: CONTACT.maps, Icon: MapPin, ext: true }
  ]

  return (
    <section className="section contact" id="contact">
      <div className="contact-bg"><img src={img(6)} alt="" aria-hidden="true" /></div>

      <div className="contact-inner">
        <h2 className="display display-xl">
          <MaskLine>{t.contactTitle1}</MaskLine>
          <MaskLine delay={0.08}><span className="rose italic">{t.contactTitle2}</span></MaskLine>
        </h2>

        <div className="contact-actions">
          {actions.map(({ k, v, href, Icon, ext }) => (
            <a key={k} className="contact-big" href={href}
               {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <Icon size={20} strokeWidth={1.2} />
              <span className="k">{k}</span>
              <span className="v">{v}</span>
            </a>
          ))}
        </div>

        <div className="contact-infos">
          <div>
            <h4>{t.address}</h4>
            <p>{lang === 'he' ? CONTACT.addressHe : CONTACT.addressFr}</p>
          </div>
          <div>
            <h4>{t.hours}</h4>
            {HOURS.map((h) => (
              <div className="hours-row" key={h.v + (lang === 'he' ? h.he : h.fr)}>
                <span>{lang === 'he' ? h.he : h.fr}</span>
                <span style={{ color: 'var(--cendre)' }}>{h.v === 'Fermé' ? t.closed : h.v}</span>
              </div>
            ))}
          </div>
          <div>
            <h4>WhatsApp</h4>
            <p>{CONTACT.whatsappDisplay}</p>
            <h4 style={{ marginTop: 18 }}>{t.call}</h4>
            <p>{CONTACT.phoneDisplay}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
