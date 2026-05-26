/**
 * Utility helpers
 */

/** Capitalise first letter */
export const capitalise = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1)

/** Join class names (filters falsy) */
export const cx = (...classes) =>
  classes.filter(Boolean).join(' ')

/** Format year range */
export const yearRange = (start, end) =>
  end ? `${start} – ${end}` : `${start} – Present`

/** Scroll to element by ID */
export const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Build slide array for yet-another-react-lightbox */
export const toSlides = (images = []) =>
  images.map((src) => ({ src }))

/** Clamp a number between min and max */
export const clamp = (val, min, max) =>
  Math.min(Math.max(val, min), max)
