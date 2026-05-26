import { useState } from 'react'
import { ImageViewer } from '@/components/UI/ImageViewer'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './ProcessSlider.module.css'

/**
 * ProcessSlider — shows process sections (sketches, colour studies, etc.)
 * from a work's sections array.
 *
 * sections: Array<{ type, title, description, images, notes, points }>
 */
export function ProcessSlider({ sections = [] }) {
  const { t } = useI18n()
  const processSections = sections.filter(
    s => s.type === 'process' || s.type === 'breakdown'
  )
  const [active, setActive] = useState(0)

  if (!processSections.length) return null

  const current = processSections[active]

  return (
    <div className={styles.wrapper}>
      {/* Step tabs */}
      {processSections.length > 1 && (
        <div className={styles.tabs}>
          {processSections.map((s, i) => (
            <button
              key={i}
              className={cx(styles.tab, active === i && styles.active)}
              onClick={() => setActive(i)}
            >
              <span className={styles.stepNum}>0{i + 1}</span>
              <span className={styles.stepLabel}>{s.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className={styles.content} key={active}>
        <div className={styles.header}>
          <h3 className={styles.title}>{current.title}</h3>
          {current.description && (
            <p className={styles.desc}>{current.description}</p>
          )}
        </div>

        {/* Image grid for process type */}
        {current.type === 'process' && current.images?.length > 0 && (
          <div className={styles.imageGrid}>
            {current.images.map((src, i) => (
              <ImageViewer
                key={i}
                src={src}
                alt={`${current.title} — step ${i + 1}`}
                images={current.images}
                index={i}
                aspectRatio="16/10"
              />
            ))}
          </div>
        )}

        {/* Notes */}
        {current.notes && (
          <aside className={styles.notes}>
            <span className={styles.notesLabel}>{t.detail.artistNote}</span>
            <p>{current.notes}</p>
          </aside>
        )}

        {/* Breakdown points */}
        {current.type === 'breakdown' && current.points?.length > 0 && (
          <ul className={styles.points}>
            {current.points.map((pt, i) => (
              <li key={i} className={styles.point}>
                <span className={styles.pointLabel}>{pt.label}</span>
                <span className={styles.pointText}>{pt.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
