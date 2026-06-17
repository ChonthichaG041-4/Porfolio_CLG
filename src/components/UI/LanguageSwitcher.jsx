import { useState, useRef, useEffect } from 'react'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './LanguageSwitcher.module.css'

const FLAG_ICON = {
  en: 'circle-flags:uk',
  th: 'circle-flags:th',
  ja: 'circle-flags:jp',
}

/**
 * LanguageSwitcher — compact dropdown for EN / TH / JA
 */
export function LanguageSwitcher() {
  const { lang, switchLang, LANGUAGE_LIST } = useI18n()
  const [open, setOpen] = useState(false)
  const ref  = useRef(null)

  const current = LANGUAGE_LIST.find(l => l.code === lang)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={styles.wrapper} ref={ref}>
      <button type="button"
        className={styles.trigger}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current?.name}`}
      >
        <iconify-icon icon={FLAG_ICON[lang] ?? 'circle-flags:uk'} width="18" height="18" aria-hidden="true" className={styles.flag} />
        <span className={styles.code}>{lang.toUpperCase()}</span>
        <svg aria-hidden="true"
          className={cx(styles.chevron, open && styles.chevronOpen)}
          width="10" height="10" viewBox="0 0 10 10"
          fill="none" stroke="currentColor" strokeWidth="1.5"
        >
          <path d="M2 3.5 5 6.5 8 3.5" />
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label="Select language">
          {LANGUAGE_LIST.map(({ code, name, flag }) => (
            <li key={code} role="option" aria-selected={lang === code}>
              <button type="button"
                className={cx(styles.option, lang === code && styles.active)}
                onClick={() => { switchLang(code); setOpen(false) }}
              >
                <iconify-icon icon={FLAG_ICON[code] ?? 'circle-flags:uk'} width="18" height="18" aria-hidden="true" className={styles.flag} />
                <span className={styles.optionName}>{name}</span>
                {lang === code && <span className={styles.check}>✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
