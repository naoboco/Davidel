import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Share, MoreVertical, X } from 'lucide-react'
import { useLang } from '../i18n/LangContext'

const standalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches ||
  window.navigator.standalone === true

export default function InstallApp() {
  const { lang } = useLang()
  const [promptEvent, setPromptEvent] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const copy = useMemo(() => lang === 'he' ? {
    button: 'התקנת DAVIDEL',
    title: 'DAVIDEL במסך הבית',
    intro: 'התקינו את האתר כאפליקציה לגישה מהירה וישירה.',
    ios: 'באייפון: לחצו על שיתוף ואז “הוספה למסך הבית”.',
    android: 'באנדרואיד: פתחו את תפריט הדפדפן ובחרו “התקנת אפליקציה” או “הוספה למסך הבית”.',
    close: 'סגירה'
  } : {
    button: 'Installer DAVIDEL',
    title: 'DAVIDEL sur votre écran d’accueil',
    intro: 'Installez le site comme une application pour y accéder en un geste.',
    ios: 'Sur iPhone : touchez Partager, puis « Sur l’écran d’accueil ».',
    android: 'Sur Android : ouvrez le menu du navigateur puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».',
    close: 'Fermer'
  }, [lang])

  useEffect(() => {
    setInstalled(standalone())

    const onBeforeInstall = (event) => {
      event.preventDefault()
      setPromptEvent(event)
    }
    const onInstalled = () => {
      setInstalled(true)
      setPromptEvent(null)
      setHelpOpen(false)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (promptEvent) {
      await promptEvent.prompt()
      const choice = await promptEvent.userChoice
      if (choice?.outcome === 'accepted') setPromptEvent(null)
      return
    }
    setHelpOpen(true)
  }

  if (installed) return null

  return (
    <>
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
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}>
              <button className="install-help-close" onClick={() => setHelpOpen(false)} aria-label={copy.close}>
                <X size={20} strokeWidth={1.4} />
              </button>
              <img className="install-help-logo" src="./icons/icon-192.png" alt="DAVIDEL" />
              <p className="eyebrow">PWA · DAVIDEL</p>
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
