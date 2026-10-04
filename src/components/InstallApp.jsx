import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Share, MoreVertical, X } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { useScrollLock } from '../lib/useScrollLock'

const standalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches ||
  window.navigator.standalone === true

const INSTALL_KEY = 'davidel-installed'

const installationKnown = () => {
  if (standalone()) return true
  try { return window.localStorage.getItem(INSTALL_KEY) === '1' } catch { return false }
}

export default function InstallApp() {
  const { lang } = useLang()
  const [promptEvent, setPromptEvent] = useState(null)
  const [installed, setInstalled] = useState(installationKnown)
  const [helpOpen, setHelpOpen] = useState(false)
  useScrollLock(helpOpen)

  const copy = useMemo(() => lang === 'he' ? {
    button: 'התקנת DAVIDEL',
    title: 'DAVIDEL במסך הבית',
    intro: 'התקינו את האתר כאפליקציה לגישה מהירה וישירה.',
    androidButton: 'התקנה באנדרואיד',
    iosButton: 'הוספה באייפון',
    ios: 'באייפון: פתחו את האתר ב-Safari, לחצו על שיתוף ואז “הוספה למסך הבית”.',
    android: 'באנדרואיד: פתחו את תפריט הדפדפן ובחרו “התקנת אפליקציה” או “הוספה למסך הבית”.',
    close: 'סגירה'
  } : {
    button: 'Installer DAVIDEL',
    title: 'DAVIDEL sur votre écran d’accueil',
    intro: 'Installez le site comme une application pour y accéder en un geste.',
    androidButton: 'Installer sur Android',
    iosButton: 'Ajouter sur iPhone',
    ios: 'Sur iPhone : ouvrez le site dans Safari, touchez Partager, puis « Sur l’écran d’accueil ».',
    android: 'Sur Android : ouvrez le menu du navigateur puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».',
    close: 'Fermer'
  }, [lang])

  useEffect(() => {
    const displayMode = window.matchMedia?.('(display-mode: standalone)')

    const onBeforeInstall = (event) => {
      event.preventDefault()
      try { window.localStorage.removeItem(INSTALL_KEY) } catch {}
      setInstalled(false)
      setPromptEvent(event)
    }
    const onInstalled = () => {
      try { window.localStorage.setItem(INSTALL_KEY, '1') } catch {}
      setInstalled(true)
      setPromptEvent(null)
      setHelpOpen(false)
    }
    const onDisplayModeChange = (event) => { if (event.matches) onInstalled() }

    if (standalone()) onInstalled()

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    displayMode?.addEventListener?.('change', onDisplayModeChange)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      displayMode?.removeEventListener?.('change', onDisplayModeChange)
    }
  }, [])

  useEffect(() => {
    if (!helpOpen) return
    const onKey = (event) => { if (event.key === 'Escape') setHelpOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [helpOpen])

  const install = async () => {
    if (promptEvent) {
      setPromptEvent(null)
      try {
        await promptEvent.prompt()
        const choice = await promptEvent.userChoice
        if (choice?.outcome === 'accepted') setInstalled(true)
      } catch {
        setHelpOpen(true)
      }
      return
    }
    setHelpOpen(true)
  }

  if (installed) return null

  return (
    <>
      <aside className="install-invite" aria-label={copy.title}>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        <div className="install-invite-actions">
          <button className="btn btn-rose" type="button" onClick={() => {
            if (/Android/i.test(window.navigator.userAgent)) install()
            else setHelpOpen(true)
          }}>
            <Download size={17} />{copy.androidButton}
          </button>
          <button className="btn" type="button" onClick={() => setHelpOpen(true)}>
            <Share size={17} />{copy.iosButton}
          </button>
        </div>
      </aside>

      <motion.button
        className="install-app"
        type="button"
        onClick={install}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.55 }}
        aria-label={copy.button}
      >
        <span className="install-app-icon"><Download size={16} strokeWidth={1.7} /></span>
        <span>{copy.button}</span>
      </motion.button>

      <AnimatePresence>
        {helpOpen && (
          <motion.div className="install-help-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setHelpOpen(false)}>
            <motion.section className="install-help"
              role="dialog" aria-modal="true" aria-label={copy.title}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}>
              <button className="install-help-close" onClick={() => setHelpOpen(false)} aria-label={copy.close}>
                <X size={20} strokeWidth={1.4} />
              </button>
              <img className="install-help-logo" src="./icons/icon-192.png" alt="DAVIDEL" />
              <p className="eyebrow">DAVIDEL</p>
              <h2>{copy.title}</h2>
              <p>{copy.intro}</p>
              <div className="install-step"><Share size={19} /><span>{copy.ios}</span></div>
              <div className="install-step"><MoreVertical size={19} /><span>{copy.android}</span></div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
