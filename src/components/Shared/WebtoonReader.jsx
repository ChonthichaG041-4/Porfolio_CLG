import { useState } from 'react'
import styles from './WebtoonReader.module.css'

/**
 * WebtoonReader — side-by-side vertical strip reader
 * strips: [{ src, title, label }]
 */
export function WebtoonReader({ strips = [] }) {
  const [active, setActive] = useState(0)

  if (!strips.length) return null
  const strip = strips[active]

  return (
    <div className={styles.reader}>
      {/* Tab selector */}
      {strips.length > 1 && (
        <div className={styles.tabs}>
          {strips.map((s, i) => (
            <button type="button"
              key={i}
              className={`${styles.tab}${i === active ? ' ' + styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {s.label ?? s.title ?? `Chapter ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      <div className={styles.viewport}>
        {/* Phone frame */}
        <div className={styles.phone}>
          <div className={styles.phoneTop}>
            <span className={styles.phoneTitle}>{strip.title}</span>
          </div>
          <div className={styles.phoneScreen}>
            <img
              src={strip.src}
              alt={strip.title}
              className={styles.strip}
              loading="lazy"
            />
          </div>
          <div className={styles.phoneBottom} />
        </div>

        {/* Info panel */}
        <div className={styles.info}>
          {strip.episode && (
            <span className={styles.episodeTag}>{strip.episode}</span>
          )}
          <h4 className={styles.stripTitle}>{strip.title}</h4>
          {strip.description && (
            <p className={styles.stripDesc}>{strip.description}</p>
          )}
          <div className={styles.scrollHint}>
            <span className={styles.scrollIcon}>↕</span>
            <span>Scroll inside frame to read</span>
          </div>
        </div>
      </div>
    </div>
  )
}
