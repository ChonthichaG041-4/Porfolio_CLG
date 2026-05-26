import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './WorkCard.module.css'

export function WorkCard({ work, className }) {
  const { slug, title, category, tier, year, role, thumbnail, description } = work
  const { t } = useI18n()

  return (
    <Link
      to={`/portfolio/${slug}`}
      className={cx(styles.card, className)}
      aria-label={`${t.detail.viewProject.replace('→','').trim()}: ${title}`}
    >
      <div className={styles.thumb}>
        <img src={thumbnail} alt={title} loading="lazy" />
        <div className={styles.overlay}>
          <p className={styles.overlayDesc}>{description}</p>
          <span className={styles.viewBtn}>{t.detail.viewProject}</span>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.category}>
            {t.categories[category] ?? category.replace('-', ' ')}
          </span>
          <span className={styles.year}>{year}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footer}>
          <span className={styles.role}>{role}</span>
          <span className={cx(styles.badge, styles[tier])}>
            {t.tiers[tier] ?? tier}
          </span>
        </div>
      </div>
    </Link>
  )
}
