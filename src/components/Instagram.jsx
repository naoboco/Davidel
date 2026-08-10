import { Instagram as Ig, ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { INSTA, CONTACT, img } from '../data/siteData'
import { Reveal, MaskLine } from '../lib/motion'

export default function Instagram() {
  const { t } = useLang()

  return (
    <section className="section" id="instagram">
      <div className="section-head">
        <Reveal as="p" className="eyebrow" y={10}>{t.instaEyebrow}</Reveal>
        <h2 className="display display-m"><MaskLine>{t.instaTitle}</MaskLine></h2>
      </div>

      <Reveal className="insta-grid" y={18}>
        {INSTA.map((n) => (
          <a key={n} className="insta-cell" href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label={t.follow}>
            <img src={img(n)} alt="" loading="lazy" />
            <span className="ico"><Ig size={22} strokeWidth={1.2} /></span>
          </a>
        ))}
      </Reveal>

      <div className="menu-foot">
        <p>@davidel</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a className="btn btn-rose" href={CONTACT.instagram} target="_blank" rel="noreferrer">
            <Ig size={15} strokeWidth={1.5} />{t.follow}
          </a>
          <a className="btn btn-ligne" href={CONTACT.instagram} target="_blank" rel="noreferrer">
            {t.moreCreations}<ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  )
}
