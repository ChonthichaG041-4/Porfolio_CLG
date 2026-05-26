import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { Button } from '@/components/UI/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useI18n()
  const tc = t.contactSection

  const statusLabel = {
    open:     tc.statusOpen,
    closed:   tc.statusClosed,
    waitlist: tc.statusWaitlist,
  }

  return (
    <section
      ref={ref}
      className={cx('section', styles.section, isVisible && styles.visible)}
      aria-label="Contact CTA"
    >
      <div className="container">
        <div className={styles.card}>
          <div className={styles.status}>
            <span className={styles.dot} data-status={profile.commissionStatus} aria-hidden="true" />
            <span>{statusLabel[profile.commissionStatus]}</span>
          </div>

          <h2 className={styles.heading}>{tc.heading}</h2>
          <p className={styles.sub}>
            {tc.sub.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>

          <div className={styles.actions}>
            <Button as={Link} to="/contact" variant="primary" size="lg">
              {tc.getInTouch}
            </Button>
            <a href={`mailto:${profile.email}`} className={styles.email}>
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
