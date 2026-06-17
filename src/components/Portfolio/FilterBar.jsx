import { CATEGORIES } from '@/data/works'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './FilterBar.module.css'

export function FilterBar({ activeCategory, onSelect, showAll, onToggleShowAll }) {
  const { t } = useI18n()

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} role="tablist" aria-label="Filter by category">
        {CATEGORIES.map(({ id }) => (
          <button type="button"
            key={id}
            role="tab"
            aria-selected={activeCategory === id}
            className={cx(styles.tab, activeCategory === id && styles.active)}
            onClick={() => onSelect(id)}
          >
            {t.categories[id] ?? id}
          </button>
        ))}
      </div>

      <button type="button"
        className={cx(styles.toggle, showAll && styles.toggleActive)}
        onClick={onToggleShowAll}
      >
        {showAll ? t.portfolio.showPro : t.portfolio.showAll}
      </button>
    </div>
  )
}
