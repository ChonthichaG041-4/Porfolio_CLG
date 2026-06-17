import { useState, useRef, useEffect } from 'react'
import styles from './CharDesignPanel.module.css'

/**
 * CharDesignPanel — DragonBones-style two-panel showcase
 * Label + title are rendered OUTSIDE by ProjectDetail (matches section heading style)
 */
export function CharDesignPanel({ left, right, note }) {
  const anims      = right?.animations ?? []
  const [activeId, setActiveId] = useState(anims[anims.length - 1]?.id ?? anims[0]?.id)
  const videoRef   = useRef(null)
  const currentAnim = anims.find(a => a.id === activeId) ?? anims[0]

  useEffect(() => {
    const v = videoRef.current
    if (!v || !currentAnim?.video) return
    v.load()
    v.muted = true
    v.play().catch(() => {})
  }, [activeId, currentAnim?.video])

  return (
    <div className={styles.root}>
      <div className={styles.panels}>

        {/* boxcharacter — large border frame behind both columns */}
        <div className={styles.boxCharacter} />

        {/* imgRow — centred in left half */}
        <div className={styles.imgRow}>
          {left?.images?.map((img, i) => (
            <div key={i} className={styles.imgWrap}>
              <img
                src={img.src}
                alt={img.caption ?? `Design ${i + 1}`}
                className={styles.designImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* bg_animetiongif — purple outer video box */}
        <div className={styles.videoBox}>
          {/* animetiongif — inner rounded viewport */}
          <div className={styles.videoInner}>
            {currentAnim?.video && (
              <video
                key={currentAnim.video}
                ref={videoRef}
                className={styles.animVideo}
                src={currentAnim.video}
                autoPlay loop muted playsInline
              />
            )}
          </div>
        </div>

        {/* selete — animation selector floating panel */}
        <div className={styles.animList}>
          {anims.map(anim => (
            <button type="button"
              key={anim.id}
              className={`${styles.animItem}${anim.id === activeId ? ' ' + styles.animActive : ''}`}
              onClick={() => setActiveId(anim.id)}
            >
              {anim.id === activeId && <span className={styles.animDot} />}
              {anim.label}
            </button>
          ))}
        </div>

      </div>

      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
