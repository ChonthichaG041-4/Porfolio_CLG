import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref and a boolean `isVisible`.
 * Attach `ref` to any element to trigger a reveal animation when it enters the viewport.
 *
 * Usage:
 *   const { ref, isVisible } = useScrollReveal()
 *   <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>...</div>
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // fire once
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
        ...options,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}
