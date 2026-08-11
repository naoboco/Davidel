import { motion, useReducedMotion } from 'framer-motion'

/* Reveal par masque : le texte monte derrière une ligne, comme un rideau d'atelier */
export function Reveal({ children, delay = 0, y = 26, as = 'div', className = '', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  if (reduce) return <Tag className={className} {...rest}>{children}</Tag>
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Les grands titres restent visibles sur tous les écrans.
   L'ancienne animation pouvait rester bloquée sous son masque sur certains grands écrans. */
export function MaskLine({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <span className="mask-line" style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'block' }}
        className={className}
        initial={reduce ? false : { opacity: 0, y: '32%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export { motion }
