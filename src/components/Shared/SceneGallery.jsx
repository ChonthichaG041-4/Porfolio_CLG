import { useState } from 'react'
import styles from './SceneGallery.module.css'

/**
 * SceneGallery — full-width horizontal reveal of tall scene images
 * scenes: [{ src, title, caption }]
 */
export function SceneGallery({ scenes = [] }) {
  const [active, setActive] = useState(0)

  return (
    <div className={styles.gallery}>
      {/* Main viewport */}
      <div className={styles.viewport}>
        {scenes.map((scene, i) => (
          <div
            key={i}
            className={`${styles.scene}${i === active ? ' ' + styles.sceneActive : ''}`}
            aria-hidden={i !== active}
          >
            <img
              src={scene.src}
              alt={scene.title ?? `Scene ${i + 1}`}
              className={styles.sceneImg}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className={styles.sceneOverlay}>
              {scene.title && <span className={styles.sceneTitle}>{scene.title}</span>}
              {scene.caption && <p className={styles.sceneCaption}>{scene.caption}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail strip + nav */}
      <div className={styles.nav}>
        <button type="button" className={styles.navBtn}
          onClick={() => setActive(i => (i - 1 + scenes.length) % scenes.length)}
          aria-label="Previous scene">←</button>

        <div className={styles.thumbs}>
          {scenes.map((scene, i) => (
            <button type="button"
              key={i}
              className={`${styles.thumb}${i === active ? ' ' + styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={scene.title ?? `Scene ${i + 1}`}
            >
              <img src={scene.src} alt="" className={styles.thumbImg} loading="lazy" />
              <span className={styles.thumbLabel}>{scene.title}</span>
            </button>
          ))}
        </div>

        <button type="button" className={styles.navBtn}
          onClick={() => setActive(i => (i + 1) % scenes.length)}
          aria-label="Next scene">→</button>
      </div>
    </div>
  )
}
