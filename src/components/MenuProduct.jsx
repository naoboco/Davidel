import { forwardRef } from 'react'
import { MessageCircle, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { img } from '../data/siteData'
import { waProduct } from '../lib/whatsapp'
import { useCarnet } from '../lib/CarnetContext'

const MenuProduct = forwardRef(function MenuProduct({ product }, ref) {
  const { t, f, lang } = useLang()
  const { add, flash } = useCarnet()
  const isFlash = flash === product.id
  const tag = product.tags.includes('grand') ? (lang === 'he' ? 'גדול' : 'Grand format') : (lang === 'he' ? 'יחיד' : 'Individuel')

  return (
    <motion.article className="product" layout ref={ref}
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <div className="product-media">
        <img src={img(product.img)} alt={f(product)} loading="lazy" />
        <span className="product-tag">{tag}</span>
      </div>

      <div className="product-top">
        <h3 className="product-name">{f(product)}</h3>
        <span className="product-price">{product.price} ₪</span>
      </div>

      <p className="product-desc">{f(product, 'desc')}</p>

      <div className="product-actions">
        <a className="btn btn-ligne btn-sm" href={waProduct(product, lang)} target="_blank" rel="noreferrer">
          <MessageCircle size={13} strokeWidth={1.6} />{t.interested}
        </a>
        <button className="btn btn-rose btn-sm" onClick={() => add(product)} aria-label={t.addToCarnet}>
          <Plus size={13} strokeWidth={1.8} />
        </button>
        {isFlash && <span className="added-flash">{t.added}</span>}
      </div>
    </motion.article>
  )
})

export default MenuProduct
