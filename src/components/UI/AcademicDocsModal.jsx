import { useEffect, useRef } from 'react'
import styles from './AcademicDocsModal.module.css'

const DOC_CONFIG = {
  certificate: {
    icon: 'ti-certificate',
    eyebrow: 'ACADEMIC DOCUMENT',
    title: 'Graduation Certificate',
    sub: 'Digital Certificate of Graduation',
    en: '/certificate-en.pdf',
    th: '/certificate-th.pdf',
  },
  transcript: {
    icon: 'ti-file-description',
    eyebrow: 'ACADEMIC DOCUMENT',
    title: 'Official Transcript',
    sub: 'Official Digital Transcript',
    en: '/transcript-en.pdf',
    th: '/transcript-th.pdf',
  },
}

export function AcademicDocsModal({ open, onClose, type = 'certificate' }) {
  const overlayRef = useRef(null)
  const doc = DOC_CONFIG[type]

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else       document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <i className="ti ti-x" />
        </button>

        <div className={styles.docIcon}>
          <i className={`ti ${doc.icon}`} />
        </div>

        <p className={styles.eyebrow}>{doc.eyebrow}</p>
        <h2 className={styles.title}>{doc.title}</h2>
        <p className={styles.sub}>{doc.sub}</p>

        <div className={styles.options}>
          <a
            href={doc.en}
            target="_blank"
            rel="noreferrer"
            className={styles.optionBtn}
            onClick={onClose}
          >
            <span className={styles.flag}>🇬🇧</span>
            <span className={styles.optionLabel}>English</span>
            <i className="ti ti-external-link" aria-hidden="true" />
          </a>

          <a
            href={doc.th}
            target="_blank"
            rel="noreferrer"
            className={styles.optionBtn}
            onClick={onClose}
          >
            <span className={styles.flag}>🇹🇭</span>
            <span className={styles.optionLabel}>ภาษาไทย</span>
            <i className="ti ti-external-link" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
