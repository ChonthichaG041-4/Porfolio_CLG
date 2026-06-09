import { useI18n } from '@/i18n/context'
import { WorkCard } from './WorkCard'
import styles from './WorkGrid.module.css'

export function WorkGrid({ works }) {
  const { t } = useI18n()

  if (!works.length) {
    return (
      <div className={styles.empty}>
        <p>{t.portfolio.noResults}</p>
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
