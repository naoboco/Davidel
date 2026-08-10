import { CONTACT } from '../data/siteData'

const base = (msg) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`

const hello = (lang) => (lang === 'he' ? 'שלום DAVIDEL,' : 'Bonjour DAVIDEL,')

/* Message libre */
export const waOpen = (lang = 'fr') =>
  base(
    lang === 'he'
      ? `${hello(lang)}\nהגעתי דרך האתר ורציתי לשאול משהו.`
      : `${hello(lang)}\nje vous écris depuis le site et j’aurais une question.`
  )

/* Un produit précis */
export const waProduct = (product, lang = 'fr') => {
  const name = lang === 'he' ? product.he : product.fr
  return base(
    lang === 'he'
      ? `${hello(lang)}\nאני מעוניין/ת ב: ${name} (${product.price} ₪).\nאפשר לקבל פרטים נוספים?`
      : `${hello(lang)}\nje suis intéressé(e) par : ${name} (${product.price} ₪).\nPouvez-vous me donner plus d’informations ?`
  )
}

/* Le carnet complet */
export const waCarnet = (lines, total, lang = 'fr') => {
  const body = lines
    .map((l) => `• ${lang === 'he' ? l.he : l.fr} × ${l.qty} — ${l.price * l.qty} ₪`)
    .join('\n')
  return base(
    lang === 'he'
      ? `${hello(lang)}\nהייתי רוצה להזמין:\n${body}\n\nסה״כ משוער: ${total} ₪\nאפשר לאשר זמינות ומועד איסוף?`
      : `${hello(lang)}\nje souhaiterais commander :\n${body}\n\nTotal indicatif : ${total} ₪\nPouvez-vous confirmer la disponibilité et l’heure de retrait ?`
  )
}

/* Une occasion (Shabbat, anniversaire…) */
export const waOccasion = (occasion, lang = 'fr') =>
  base(
    lang === 'he'
      ? `${hello(lang)}\nאני מארגן/ת: ${occasion}.\nאשמח להצעה מתאימה.`
      : `${hello(lang)}\nje prépare : ${occasion}.\nQue me conseillez-vous ?`
  )

/* Une demande d'événement issue du formulaire */
export const waEvent = ({ type, guests, date, name, phone, email }, lang = 'fr') => {
  if (lang === 'he') {
    return base(
      `${hello(lang)}\nאני מארגן/ת ${type || 'אירוע'} לכ-${guests || '?'} אנשים בתאריך ${date || 'שעוד ייקבע'}.\nאשמח לקבל הצעת מחיר.\n\nשם: ${name || '—'}\nטלפון: ${phone || '—'}${email ? `\nאימייל: ${email}` : ''}`
    )
  }
  return base(
    `${hello(lang)}\nj’organise ${type ? type.toLowerCase() : 'un événement'} pour environ ${guests || '?'} personnes le ${date || 'à définir'}.\nJ’aimerais recevoir une proposition.\n\nNom : ${name || '—'}\nTéléphone : ${phone || '—'}${email ? `\nE-mail : ${email}` : ''}`
  )
}

export const telLink = `tel:${CONTACT.phoneTel}`
export const mailLink = (lang = 'fr') =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    lang === 'he' ? 'פנייה מהאתר' : 'Demande depuis le site'
  )}`
