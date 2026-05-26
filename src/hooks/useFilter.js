import { useState, useMemo } from 'react'
import { getWorksByCategory } from '@/data/works'

/**
 * useFilter
 * Manages active category filter for the Portfolio page.
 * Returns filtered works and setter.
 */
export function useFilter(initialCategory = 'all') {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [showAll, setShowAll] = useState(false)

  const filteredWorks = useMemo(
    () => getWorksByCategory(activeCategory, showAll),
    [activeCategory, showAll]
  )

  const handleCategory = (categoryId) => {
    setActiveCategory(categoryId)
  }

  const toggleShowAll = () => {
    setShowAll(prev => !prev)
  }

  return {
    activeCategory,
    filteredWorks,
    showAll,
    handleCategory,
    toggleShowAll,
  }
}
