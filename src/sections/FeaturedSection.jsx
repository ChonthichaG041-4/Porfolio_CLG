import { Link } from 'react-router-dom'
import { getFeaturedWorks } from '@/data/works'
import { WorkCard } from '@/components/Portfolio/WorkCard'
import { Button } from '@/components/UI/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './FeaturedSection.module.css'

export function FeaturedSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useI18n()
  const featured = getFeaturedWorks()

  return (
    <section
      ref={ref}
      className={cx('section', styles.section, isVisible && styles.visible)}
      id="featured"
      aria-label="Featured works"
    >
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="section-label">{t.featured.label}</p>
            <h2 className="section-title">{t.featured.title}</h2>
          </div>
          <Button as={Link} to="/portfolio" variant="secondary">
            {t.featured.viewAll}
          </Button>
        </div>

        <div className={styles.grid}>
          {featured.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  )
}
