import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Share, ExternalLink, X } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { useScrollLock } from '../lib/useScrollLock'
import { getInstallation, subscribeInstallation, requestInstallation, getInstallEnvironment, getChromeInstallURL } from '../lib/appInstallation'

export default function InstallApp() {
  const { lang } = useLang()
  const installation = useSyncExternalStore(subscribeInstallation, getInstallation, getInstallation)
  const environment = useMemo(getInstallEnvironment, [])
  const [helpOpen, setHelpOpen] = useState(false)
  useScrollLock(helpOpen)

  const copy = useMemo(() => lang === 'he' ? {
    button: 'התקנת DAVIDEL',
    title: 'DAVIDEL במסך הבית',
    intro: 'התקינו את האתר כאפליקציה לגישה מהירה וישירה.',
    directIntro: 'לחצו על התקנה ואשרו בחלון שיופיע. DAVIDEL יתווסף למסך הבית.',
    androidButton: 'התקנה באנדרואיד',
    iosButton: 'הוספה באייפון',
    chromeButton: 'פתיחה ב-Chrome',
    chromeIntro: 'פתחו את DAVIDEL ב-Chrome כדי לקבל את חלון ההתקנה.',
    waiting: 'הדפדפן מכין את ההתקנה. הכפתור יופעל כשהיא תהיה זמינה.',
    installing: 'ממתינים לאישור…',
    unavailable: 'ההתקנה אינה זמינה כרגע. תוכלו להמשיך לגלוש באתר.',
    ios: 'באייפון: פתחו את האתר ב-Safari, לחצו על שיתוף ואז “הוספה למסך הבית”.',
    close: 'סגירה'
  } : {
    button: 'Installer DAVIDEL',
    title: 'DAVIDEL sur votre écran d’accueil',
    intro: 'Installez le site comme une application pour y accéder en un geste.',
    directIntro: 'Touchez Installer et confirmez dans la fenêtre qui apparaît. DAVIDEL sera ajouté à votre écran d’accueil.',
    androidButton: 'Installer sur Android',
    iosButton: 'Ajouter sur iPhone',
    chromeButton: 'Ouvrir dans Chrome',
    chromeIntro: 'Ouvrez DAVIDEL dans Chrome pour accéder à la fenêtre d’installation.',
    waiting: 'Le navigateur prépare l’installation. Le bouton s’activera dès qu’elle sera disponible.',
    installing: 'En attente de confirmation…',
    unavailable: 'L’installation n’est pas disponible pour le moment. Vous pouvez continuer à parcourir le site.',
    ios: 'Sur iPhone : ouvrez le site dans Safari, touchez Partager, puis « Sur l’écran d’accueil ».',
    close: 'Fermer'
  }, [lang])

  useEffect(() => { if (installation.installed) setHelpOpen(false) }, [installation.installed])

  useEffect(() => {
    if (!helpOpen) return
    const onKey = (event) => { if (event.key === 'Escape') setHelpOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [helpOpen])

  const ready = Boolean(installation.prompt)
  const iosHelp = environment.ios && !ready
  const chromeLink = environment.openInChrome && !ready
  const buttonText = installation.pending ? copy.installing :
    environment.android ? copy.androidButton : copy.button
  const intro = ready ? copy.directIntro : iosHelp ? copy.intro :
    chromeLink ? copy.chromeIntro : installation.error ? copy.unavailable : copy.waiting

  if (installation.installed || installation.dismissed ||
      (!ready && !environment.android && !environment.ios && !environment.nativeSupported)) return null

  return (
    <>
      <aside className="install-invite" aria-label={copy.title}>
        <div>
          <h2>{copy.title}</h2>
          <p role="status">{intro}</p>
        </div>
        <div className="install-invite-actions">
          {chromeLink ? (
            <a className="btn btn-rose" href={getChromeInstallURL()}>
              <ExternalLink size={17} />{copy.chromeButton}
            </a>
          ) : iosHelp ? (
            <button className="btn btn-rose" type="button" onClick={() => setHelpOpen(true)}>
              <Share size={17} />{copy.iosButton}
            </button>
          ) : (
            <button className="btn btn-rose" type="button" onClick={requestInstallation}
              disabled={!ready || installation.pending}>
              <Download size={17} />{buttonText}
            </button>
          )}
        </div>
      </aside>

      {(ready || iosHelp) && <motion.button
        className="install-app"
        type="button"
        onClick={ready ? requestInstallation : () => setHelpOpen(true)}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.55 }}
        aria-label={copy.button}
      >
        <span className="install-app-icon"><Download size={16} strokeWidth={1.7} /></span>
        <span>{copy.button}</span>
      </motion.button>}

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
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
