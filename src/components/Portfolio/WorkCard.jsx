import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './WorkCard.module.css'

export function WorkCard({ work, className }) {
  const { slug, title, category, tier, year, role, client, mood, thumbnail, description, customRoute } = work
  const { t } = useI18n()
  const td = t.detail

  return (
    <Link
      to={customRoute ?? `/portfolio/${slug}`}
      className={cx(styles.card, className)}
      aria-label={`${td.viewProject.replace('\u2192','').trim()}: ${title}`}
    >
      {/* ── Thumbnail ── */}
      <div className={styles.thumb}>
        <img src={thumbnail} alt={title} loading="lazy" />
        {/* badge overlay — visible on mobile only */}
        <span className={cx(styles.badgeMobile, styles[tier])}>
          {t.tiers[tier] ?? tier}
        </span>
        {/* hover overlay — desktop only */}
        <div className={styles.overlay}>
          <p className={styles.overlayDesc}>{description}</p>
          <span className={styles.viewBtn}>{td.viewProject}</span>
        </div>
      </div>

      {/* ── Desktop info ── */}
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

      {/* ── Mobile expanded info ── */}
      <div className={styles.mobileInfo}>
        <h3 className={styles.mobileName}>{title}</h3>
        {description && <p className={styles.mobileDesc}>{description}</p>}
        <div className={styles.mobileMetaRows}>
          {[
            { label: td.meta?.role,   value: role   },
            { label: td.meta?.year,   value: year   },
            { label: td.meta?.client, value: client },
            { label: td.meta?.mood,   value: mood   },
          ].filter(m => m.value && m.label).map(({ label, value }) => (
            <div key={label} className={styles.mobileMetaRow}>
              <span className={styles.mobileMetaLabel}>{label}</span>
              <span className={styles.mobileMetaValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}
