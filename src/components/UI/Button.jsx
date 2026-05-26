import { cx } from '@/utils/helpers'
import styles from './Button.module.css'

/**
 * Button
 * variant: 'primary' | 'secondary' | 'ghost' | 'accent'
 * size:    'sm' | 'md' | 'lg'
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className,
  ...props
}) {
  return (
    <Tag
      className={cx(styles.btn, styles[variant], styles[size], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
