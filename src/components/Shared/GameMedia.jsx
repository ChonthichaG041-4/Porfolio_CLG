import { useState } from 'react'
import styles from './GameMedia.module.css'

/**
 * GameMedia — shows videos (looping autoplay) and images
 * Props:
 *   items: [{ type: 'video'|'image', src, poster?, caption }]
 *   title: string
 */
export function GameMedia({ items = [], title }) {
  const [active, setActive] = useState(0)
  const current = items[active]

  if (!items.length) return null

  return (
    <div className={styles.wrapper}>
      {/* ── Main viewport ── */}
      <div className={styles.viewport}>
        {current?.type === 'video' ? (
          <video
            key={current.src}
            className={styles.media}
            src={current.src}
            poster={current.poster}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            key={current.src}
            className={styles.media}
            src={current.src}
            alt={current.caption ?? title}
            loading="lazy"
          />
        )}

        {/* Corner badge */}
        {current?.type === 'video' && (
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} /> LOOP
          </span>
        )}

        {current?.caption && (
          <div className={styles.caption}>{current.caption}</div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {items.length > 1 && (
        <div className={styles.strip}>
          {items.map((item, i) => (
            <button type="button"
              key={i}
              className={styles.thumb + (i === active ? ' ' + styles.thumbActive : '')}
              onClick={() => setActive(i)}
              aria-label={item.caption ?? `Media ${i + 1}`}
            >
              <img
                src={item.poster ?? item.src}
                alt={item.caption ?? `thumb-${i}`}
                className={styles.thumbImg} loading="lazy"
              />
              {item.type === 'video' && (
                <span className={styles.playIcon}>▶</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
