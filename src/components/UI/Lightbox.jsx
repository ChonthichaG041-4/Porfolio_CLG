import YALightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { toSlides } from '@/utils/helpers'

/**
 * Lightbox — wraps yet-another-react-lightbox
 *
 * Props:
 *   open    boolean
 *   index   number     — which image to open first
 *   images  string[]   — array of image URLs
 *   onClose () => void
 */
export function Lightbox({ open, index = 0, images = [], onClose }) {
  return (
    <YALightbox
      open={open}
      close={onClose}
      index={index}
      slides={toSlides(images)}
      plugins={[Zoom, Thumbnails]}
      styles={{
        container: { backgroundColor: 'rgba(13,13,15,0.95)' },
      }}
      carousel={{ finite: false }}
      zoom={{ maxZoomPixelRatio: 4 }}
    />
  )
}
