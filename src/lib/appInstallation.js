const INSTALL_KEY = 'davidel-installed'
const listeners = new Set()

const standalone = () =>
  typeof window !== 'undefined' && (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )

const installationKnown = () => {
  if (standalone()) return true
  try { return window.localStorage.getItem(INSTALL_KEY) === '1' } catch { return false }
}

let state = { installed: installationKnown(), prompt: null, pending: false, dismissed: false, error: false }

const update = (changes) => {
  state = { ...state, ...changes }
  listeners.forEach((listener) => listener())
}

const installed = () => {
  try { window.localStorage.setItem(INSTALL_KEY, '1') } catch {}
  update({ installed: true, prompt: null, pending: false, dismissed: false, error: false })
}

const beforeInstall = (event) => {
  event.preventDefault()
  try { window.localStorage.removeItem(INSTALL_KEY) } catch {}
  update({ installed: false, prompt: event, pending: false, dismissed: false, error: false })
}

const displayModeChange = (event) => { if (event.matches) installed() }

if (typeof window !== 'undefined') {
  const displayMode = window.matchMedia?.('(display-mode: standalone)')
  window.addEventListener('beforeinstallprompt', beforeInstall)
  window.addEventListener('appinstalled', installed)
  displayMode?.addEventListener?.('change', displayModeChange)
  if (standalone()) installed()

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener('beforeinstallprompt', beforeInstall)
      window.removeEventListener('appinstalled', installed)
      displayMode?.removeEventListener?.('change', displayModeChange)
    })
  }
}

export const getInstallation = () => state

export const subscribeInstallation = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export async function requestInstallation() {
  const prompt = state.prompt
  if (!prompt || state.pending || state.installed) return
  update({ prompt: null, pending: true, error: false })
  try {
    const result = await prompt.prompt()
    const choice = result?.outcome ? result : await prompt.userChoice
    if (choice?.outcome === 'accepted') installed()
    else if (!state.installed) update({ pending: false, dismissed: true })
  } catch {
    if (!state.installed) update({ pending: false, error: true })
  }
}

export function getInstallEnvironment() {
  const ua = window.navigator.userAgent
  const android = /Android/i.test(ua)
  const ios = /iPhone|iPad|iPod/i.test(ua) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
  const inApp = /\bwv\b|FBAN|FBAV|Instagram|WhatsApp|Line\/|Telegram|Snapchat/i.test(ua)
  const nativeSupported = 'onbeforeinstallprompt' in window && !ios
  return { android, ios, nativeSupported, openInChrome: android && (inApp || !nativeSupported) }
}

export function getChromeInstallURL() {
  const url = new URL('./', window.location.href)
  return `intent://${url.host}${url.pathname}#Intent;scheme=${url.protocol.slice(0, -1)};package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url.href)};end`
}
