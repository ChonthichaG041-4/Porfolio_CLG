import { useState, useEffect, useCallback, useRef } from 'react'
import { useI18n } from '@/i18n/context'
import styles from './CharacterCarousel.module.css'

export function CharacterCarousel({ characters = [], title }) {
  const { t } = useI18n()
  const ui   = t.carousel?.ui  ?? {}
  const dict = t.carousel?.characters ?? {}

  const [active,    setActive]    = useState(0)
  const [paused,    setPaused]    = useState(false)

  // Popup A — card click → ภาพตัวละคร + แยกส่วน (ไม่มีข้อความ)
  const [imgOpen,  setImgOpen]  = useState(false)
  const [imgIdx,   setImgIdx]   = useState(null)
  const imgPanelRef = useRef(null)

  // Popup B — ⓘ click → ข้อมูลตัวละคร + source image (ถ้า adapted)
  const [infoOpen, setInfoOpen] = useState(false)
  const [infoIdx,  setInfoIdx]  = useState(null)
  const infoPanelRef = useRef(null)

  const total = characters.length

  const tx = (char) => {
    const tr = char.key ? (dict[char.key] ?? {}) : {}
    return {
      name:        tr.name        ?? char.name,
      role:        tr.role        ?? char.role,
      description: tr.description ?? char.description,
    }
  }

  const next = useCallback(() => setActive(i => (i + 1) % total), [total])
  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total])

  const anyOpen = imgOpen || infoOpen

  useEffect(() => {
    if (paused || anyOpen || total <= 1) return
    const id = setInterval(next, 3200)
    return () => clearInterval(id)
  }, [paused, anyOpen, next, total])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') { closeImg(); closeInfo() }
      if (anyOpen) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, anyOpen])

  // Close on outside click — image popup
  useEffect(() => {
    if (!imgOpen) return
    const handle = e => {
      if (imgPanelRef.current && !imgPanelRef.current.contains(e.target)) closeImg()
    }
    setTimeout(() => document.addEventListener('mousedown', handle), 0)
    return () => document.removeEventListener('mousedown', handle)
  }, [imgOpen])

  // Close on outside click — info popup
  useEffect(() => {
    if (!infoOpen) return
    const handle = e => {
      if (infoPanelRef.current && !infoPanelRef.current.contains(e.target)) closeInfo()
    }
    setTimeout(() => document.addEventListener('mousedown', handle), 0)
    return () => document.removeEventListener('mousedown', handle)
  }, [infoOpen])

  const openImg  = (idx, e) => { e.stopPropagation(); setImgIdx(idx);  setImgOpen(true) }
  const closeImg = ()        => { setImgOpen(false);  setImgIdx(null) }

  const openInfo  = (idx, e) => { e.stopPropagation(); setInfoIdx(idx); setInfoOpen(true) }
  const closeInfo = ()        => { setInfoOpen(false);  setInfoIdx(null) }

  const getSlot = idx => {
    let d = idx - active
    if (d >  Math.floor(total / 2)) d -= total
    if (d < -Math.floor(total / 2)) d += total
    return d
  }

  const imgChar  = imgIdx  !== null ? characters[imgIdx]  : null
  const infoChar = infoIdx !== null ? characters[infoIdx] : null
  const infoTx   = infoChar ? tx(infoChar) : {}

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Fan stage ── */}
      <div className={styles.stage} aria-label="Character showcase">
        {characters.map((char, idx) => {
          const slot   = getSlot(idx)
          const charTx = tx(char)
          if (Math.abs(slot) > 2) return null

          return (
            <div
              key={idx}
              className={styles.cardWrap}
              data-slot={slot}
              style={{ '--glow': char.glowColor ?? '#90639e' }}
            >
              {/* การ์ดหลัก — คลิกเปิด image popup */}
              <button type="button"
                className={styles.card}
                onClick={e => { setActive(idx); openImg(idx, e) }}
                aria-label={`${ui.select ?? 'View'} ${charTx.name}`}
                tabIndex={slot === 0 ? 0 : -1}
              >
                <div className={styles.cardInner}>
                  <img
                    src={char.image}
                    alt={charTx.name}
                    className={styles.cardImg}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardInfo}>
                    {char.type === 'adapted' && (
                      <span className={styles.adaptedBadge}>
                        {ui.adaptedBadge ?? '✦ Adapted'}
                      </span>
                    )}
                    <span className={styles.cardRole}>{charTx.role}</span>
                    <span className={styles.cardName}>{charTx.name}</span>
                  </div>
                </div>
              </button>

              {/* ⓘ button — แสดงบนทุกการ์ดที่มองเห็น */}
              <button type="button"
                className={styles.infoBtn}
                onClick={e => openInfo(idx, e)}
                aria-label={`${ui.info ?? 'Character info'}: ${charTx.name}`}
                title={ui.info ?? 'Character info'}
              >
                ⓘ
              </button>
            </div>
          )
        })}
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={prev} aria-label={ui.prev ?? 'Previous'}>←</button>
        <div className={styles.dots}>
          {characters.map((char, i) => (
            <button type="button"
              key={i}
              className={`${styles.dot}${i === active ? ' ' + styles.dotActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={tx(char).name}
            />
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={next} aria-label={ui.next ?? 'Next'}>→</button>
      </div>

      {/* ── Popup A: ภาพตัวละคร + แยกส่วน ── */}
      {imgOpen && imgChar && (
        <div className={styles.infoBackdrop} role="dialog" aria-modal="true">
          <div
            className={`${styles.infoPanel} ${styles.imgPopupPanel}`}
            ref={imgPanelRef}
            style={{ '--glow': imgChar.glowColor ?? '#90639e' }}
          >
            <button type="button" className={styles.closeBtn} onClick={closeImg} aria-label={ui.close ?? 'Close'}>✕</button>
            <div className={styles.imgPopupInner}>
              {imgChar.characterImg && (
                <div className={styles.imgPopupCol}>
                  <img src={imgChar.characterImg} alt={tx(imgChar).name} className={styles.imgPopupImg} />
                  <span className={styles.imgPopupLabel}>{ui.design ?? 'Character Art'}</span>
                </div>
              )}
              {imgChar.disassembledImg && (
                <div className={styles.imgPopupCol}>
                  <img src={imgChar.disassembledImg} alt={`${tx(imgChar).name} — disassembled`} className={styles.imgPopupImg} />
                  <span className={styles.imgPopupLabel}>{ui.disassembled ?? 'Bone Structure'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Popup B: ข้อมูลตัวละคร ── */}
      {infoOpen && infoChar && (
        <div className={styles.infoBackdrop} role="dialog" aria-modal="true">
          <div
            className={styles.infoPanel}
            ref={infoPanelRef}
            style={{ '--glow': infoChar.glowColor ?? '#90639e' }}
          >
            <button type="button" className={styles.closeBtn} onClick={closeInfo} aria-label={ui.close ?? 'Close'}>✕</button>

            <div className={styles.infoPanelInner}>
              {/* ภาพตัวละคร + source (ถ้า adapted) */}
              <div className={styles.infoImages}>
                {infoChar.characterImg && (
                  <div className={styles.infoImgWrap}>
                    <img src={infoChar.characterImg} alt={infoTx.name} className={styles.infoImg} />
                    <span className={styles.infoImgLabel}>{ui.design ?? 'Character Art'}</span>
                  </div>
                )}
                {infoChar.type === 'adapted' && infoChar.sourceImage && (
                  <>
                    <div className={styles.infoArrow}>←</div>
                    <div className={styles.infoImgWrap}>
                      <img
                        src={infoChar.sourceImage}
                        alt={infoChar.sourceLabel ?? (ui.sourceRef ?? 'Reference')}
                        className={styles.infoImg}
                      />
                      <span className={styles.infoImgLabel}>
                        {infoChar.sourceLabel ?? (ui.sourceRef ?? 'Source Reference')}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* ข้อมูล */}
              <div className={styles.infoText}>
                <div className={styles.infoMeta}>
                  <span className={`${styles.infoTypeBadge} ${infoChar.type === 'adapted' ? styles.badgeAdapted : styles.badgeCustom}`}>
                    {infoChar.type === 'adapted'
                      ? (ui.adaptedBadge ?? '✦ Adapted Design')
                      : (ui.customBadge  ?? '✦ Original Design')}
                  </span>
                  <span className={styles.infoRole}>{infoTx.role}</span>
                </div>

                <h3 className={styles.infoName}>{infoTx.name}</h3>
                <p  className={styles.infoDesc}>{infoTx.description}</p>

                {infoChar.type === 'adapted' && (
                  <div className={styles.infoAdaptNote}>
                    <span className={styles.infoAdaptIcon}>🎨</span>
                    <p>{ui.adaptNote ?? "This character's visual design was adapted from a reference image and reinterpreted as an original in-game sprite using DragonBones skeletal animation."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
