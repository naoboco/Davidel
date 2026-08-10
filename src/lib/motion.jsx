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
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Reveal en masque vertical, réservé aux grands titres */
export function MaskLine({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className} style={{ display: 'block' }}>{children}</span>
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'block' }}
        className={className}
        initial={{ y: '108%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export { motion }
