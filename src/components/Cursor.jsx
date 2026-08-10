import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const move = (e) => { tx = e.clientX; ty = e.clientY }
    const over = (e) => {
      const t = e.target.closest('a, button, .gal-item, .uni-name')
      if (ref.current) ref.current.classList.toggle('is-active', Boolean(t))
    }
    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null
  return <div className="cursor" ref={ref} aria-hidden="true" />
}
