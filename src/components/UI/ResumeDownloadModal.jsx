import { useEffect, useRef } from 'react'
import styles from './ResumeDownloadModal.module.css'

/**
 * Language-picker modal for resume PDF download.
 * Usage:
 *   const [open, setOpen] = useState(false)
 *   <button onClick={() => setOpen(true)}>Download</button>
 *   <ResumeDownloadModal open={open} onClose={() => setOpen(false)} />
 */
export function ResumeDownloadModal({ open, onClose }) {
  const overlayRef = useRef(null)

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  /* Lock body scroll while open */
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else       document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Download Resume"
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <i className="ti ti-x" />
        </button>

        <p className={styles.eyebrow}>RESUME</p>
        <h2 className={styles.title}>Download PDF</h2>
        <p className={styles.sub}>Choose your preferred language</p>

        <div className={styles.options}>
          <a
            href="/resume-en.pdf"
            download="resume-chonthicha-en.pdf"
            className={styles.optionBtn}
            onClick={onClose}
          >
            <span className={styles.flag}>🇬🇧</span>
            <span className={styles.optionLabel}>English</span>
            <i className="ti ti-download" aria-hidden="true" />
          </a>

          <a
            href="/resume-th.pdf"
            download="resume-chonthicha-th.pdf"
            className={styles.optionBtn}
            onClick={onClose}
          >
            <span className={styles.flag}>🇹🇭</span>
            <span className={styles.optionLabel}>ภาษาไทย</span>
            <i className="ti ti-download" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
