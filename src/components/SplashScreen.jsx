import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduce ? 450 : 1450)
    return () => window.clearTimeout(timer)
  }, [reduce])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="launch-splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.38 }}
          aria-hidden="true"
        >
          <motion.div
            className="launch-orbit launch-orbit-a"
            initial={reduce ? false : { opacity: 0, scale: 0.72, rotate: -28 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="launch-orbit launch-orbit-b"
            initial={reduce ? false : { opacity: 0, scale: 0.84, rotate: 24 }}
            animate={{ opacity: 0.72, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.img
            className="launch-logo"
            src="./icons/davidel-brand-source.svg"
            alt=""
            initial={reduce ? false : { opacity: 0, scale: 0.82, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.span
            className="launch-glint"
            initial={reduce ? false : { opacity: 0, x: '-150%' }}
            animate={{ opacity: [0, 1, 0], x: '170%' }}
            transition={{ duration: 1.05, delay: 0.28, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
