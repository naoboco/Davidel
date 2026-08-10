import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { T } from './translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('davidel-lang')
      if (saved === 'fr' || saved === 'he') return saved
    }
    return 'fr'
  })

  useEffect(() => {
    const dir = T[lang].dir
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.classList.toggle('is-rtl', dir === 'rtl')
    try { localStorage.setItem('davidel-lang', lang) } catch (e) { /* mode privé */ }
  }, [lang])

  const value = useMemo(() => {
    const t = T[lang]
    // f(objet) : renvoie le champ traduit — f(item, 'desc') -> descFr / descHe
    const f = (obj, key = '') => {
      if (!obj) return ''
      const suffix = lang === 'he' ? 'He' : 'Fr'
      return obj[key ? key + suffix : lang] ?? obj[key ? key + 'Fr' : 'fr'] ?? ''
    }
    return { lang, setLang, t, f, rtl: t.dir === 'rtl' }
  }, [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang doit être utilisé dans <LangProvider>')
  return ctx
}
