import { WorkCard } from './WorkCard'
import styles from './WorkGrid.module.css'

/**
 * WorkGrid — masonry-style responsive grid of WorkCards
 */
export function WorkGrid({ works }) {
  if (!works.length) {
    return (
      <div className={styles.empty}>
        <p>No works found in this category.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}
