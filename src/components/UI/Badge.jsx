import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './Badge.module.css'

export function Badge({ tier, className }) {
  const { t } = useI18n()
  return (
    <span className={cx(styles.badge, styles[tier], className)}>
      {t.tiers?.[tier] ?? tier}
    </span>
  )
}
