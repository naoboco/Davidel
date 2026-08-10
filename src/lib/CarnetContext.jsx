import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CarnetContext = createContext(null)
const KEY = 'davidel-carnet'

export function CarnetProvider({ children }) {
  const [lines, setLines] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })
  const [open, setOpen] = useState(false)
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch (e) { /* mode privé */ }
  }, [lines])

  const add = useCallback((product) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === product.id)
      if (found) return prev.map((l) => (l.id === product.id ? { ...l, qty: l.qty + 1 } : l))
      return [...prev, { id: product.id, fr: product.fr, he: product.he, price: product.price, qty: 1 }]
    })
    setFlash(product.id)
    if (navigator.vibrate) navigator.vibrate(8)
    setTimeout(() => setFlash((f) => (f === product.id ? null : f)), 1400)
  }, [])

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    )
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const total = lines.reduce((s, l) => s + l.qty * l.price, 0)
    return { lines, add, setQty, clear, count, total, open, setOpen, flash }
  }, [lines, add, setQty, clear, open, flash])

  return <CarnetContext.Provider value={value}>{children}</CarnetContext.Provider>
}

export const useCarnet = () => {
  const ctx = useContext(CarnetContext)
  if (!ctx) throw new Error('useCarnet doit être utilisé dans <CarnetProvider>')
  return ctx
}
