import { cx } from '@/utils/helpers'
import styles from './Badge.module.css'

/**
 * Badge — tier indicator (Professional / Personal / Fan Art / Practice)
 * tier: 'professional' | 'personal' | 'fanart' | 'practice'
 */
const TIER_LABELS = {
  professional: 'Professional',
  personal:     'Personal',
  fanart:       'Fan Art',
  practice:     'Practice',
}

export function Badge({ tier, className }) {
  return (
    <span className={cx(styles.badge, styles[tier], className)}>
      {TIER_LABELS[tier] ?? tier}
    </span>
  )
}
