import { FilterBar } from '@/components/Portfolio/FilterBar'
import { WorkGrid }   from '@/components/Portfolio/WorkGrid'
import { useFilter }  from '@/hooks/useFilter'
import { useI18n }    from '@/i18n/context'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const { activeCategory, filteredWorks, showAll, handleCategory, toggleShowAll } = useFilter()
  const { t } = useI18n()
  const tp = t.portfolio

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">{tp.label}</p>
          <h1 className={styles.title}>{tp.title}</h1>
          <p className={styles.sub}>{tp.sub}</p>
        </div>

        <FilterBar
          activeCategory={activeCategory}
          onSelect={handleCategory}
          showAll={showAll}
          onToggleShowAll={toggleShowAll}
        />

        <WorkGrid works={filteredWorks} />
      </div>
    </main>
  )
}
