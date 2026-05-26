import { useState, useCallback } from 'react'

/**
 * useLightbox
 * Manages lightbox open/close state and which image is active.
 *
 * Usage:
 *   const { isOpen, index, openAt, close } = useLightbox()
 *   <Lightbox open={isOpen} index={index} slides={images} onClose={close} />
 */
export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [index,  setIndex]  = useState(0)

  const openAt = useCallback((i = 0) => {
    setIndex(i)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, index, openAt, close }
}
