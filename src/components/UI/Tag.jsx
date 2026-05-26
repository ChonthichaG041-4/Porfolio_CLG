import { cx } from '@/utils/helpers'
import styles from './Tag.module.css'

/** Tag — small label chip for software, skills, keywords */
export function Tag({ children, className }) {
  return (
    <span className={cx(styles.tag, className)}>
      {children}
    </span>
  )
}

/** TagList — renders an array of string tags */
export function TagList({ tags = [], className }) {
  return (
    <div className={cx(styles.list, className)}>
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  )
}
