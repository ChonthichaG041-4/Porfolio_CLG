import { useState } from 'react'
import { Lightbox } from './Lightbox'
import { cx } from '@/utils/helpers'
import styles from './ImageViewer.module.css'

/**
 * ImageViewer — clickable image that opens in Lightbox
 *
 * Props:
 *   src         string
 *   alt         string
 *   images      string[]  — if part of a gallery, pass all images for navigation
 *   index       number    — which image this is in the gallery
 *   className   string
 */
export function ImageViewer({
  src,
  alt = '',
  images,
  index = 0,
  className,
  aspectRatio,
}) {
  const [open, setOpen] = useState(false)
  const gallery = images ?? [src]

  return (
    <>
      <button type="button"
        className={cx(styles.viewer, className)}
        onClick={() => setOpen(true)}
        aria-label={`View full size: ${alt}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <img src={src} alt={alt} loading="lazy" />
        <span className={styles.overlay}>
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>

      <Lightbox
        open={open}
        index={index}
        images={gallery}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
