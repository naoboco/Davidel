import { MessageCircle } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { img } from '../data/siteData'
import { waOccasion } from '../lib/whatsapp'
import EventForm from './EventForm'
import { Reveal, MaskLine } from '../lib/motion'

export default function Events() {
  const { t, lang } = useLang()

  return (
    <section className="events" id="events">
      <div className="events-bg">
        <img src={img(2)} alt="" aria-hidden="true" />
      </div>

      <div className="events-inner">
        <div>
          <Reveal as="p" className="eyebrow" y={10}>{t.evEyebrow}</Reveal>
          <h2 className="display display-l" style={{ margin: '18px 0 22px' }}>
            <MaskLine>{t.evTitle1}</MaskLine>
            <MaskLine delay={0.08}>{t.evTitle2}</MaskLine>
            <MaskLine delay={0.16}><span className="rose italic">{t.evTitle3}</span></MaskLine>
          </h2>
          <Reveal as="p" className="lede" y={12} delay={0.1}>{t.evText}</Reveal>
          <Reveal y={12} delay={0.16} style={{ marginTop: 22 }}>
            <a className="btn btn-ligne" href={waOccasion(t.evEyebrow, lang)} target="_blank" rel="noreferrer">
              <MessageCircle size={15} strokeWidth={1.5} />{t.continueWhats}
            </a>
          </Reveal>
        </div>

        <Reveal y={22} delay={0.12}>
          <EventForm />
        </Reveal>
      </div>
    </section>
  )
}
