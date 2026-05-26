import { createContext, useContext, useState, useCallback } from 'react'
import { en } from './translations/en'
import { th } from './translations/th'
import { ja } from './translations/ja'

// ─── Available languages ─────────────────────────────────────
export const LANGUAGES = { en, th, ja }
export const LANGUAGE_LIST = [
  { code: 'en', name: en._langName, flag: en._flag },
  { code: 'th', name: th._langName, flag: th._flag },
  { code: 'ja', name: ja._langName, flag: ja._flag },
]

// ─── Context ─────────────────────────────────────────────────
const I18nContext = createContext(null)

// ─── Provider ────────────────────────────────────────────────
export function I18nProvider({ children }) {
  const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'en'
  const initial = LANGUAGES[saved] ? saved : 'en'

  const [lang, setLang] = useState(initial)
  const t = LANGUAGES[lang]

  const switchLang = useCallback((code) => {
    if (!LANGUAGES[code]) return
    setLang(code)
    localStorage.setItem('lang', code)
    // Update <html lang> for accessibility
    document.documentElement.lang = code
  }, [])

  return (
    <I18nContext.Provider value={{ lang, t, switchLang, LANGUAGE_LIST }}>
      {children}
    </I18nContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
