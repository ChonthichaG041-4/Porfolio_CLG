import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { Button } from '@/components/UI/Button'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const { t } = useI18n()
  const th = t.hero

  const statusKey = {
    open:     th.statusOpen,
    closed:   th.statusClosed,
    waitlist: th.statusWaitlist,
  }

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.inner}>
        <span className={`section-label ${styles.label}`}>{th.label}</span>

        <h1 className={styles.name}>{profile.nameDisplay}</h1>
        <p className={styles.title}>{profile.title}</p>

        <p className={styles.tagline}>
          {th.tagline.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>

        <div className={styles.ctas}>
          <Button as={Link} to="/portfolio" variant="primary" size="lg">
            {th.viewPortfolio}
          </Button>
          <Button as="a" href={profile.resumeUrl} download variant="secondary" size="lg">
            {th.downloadResume}
          </Button>
          <Button as={Link} to="/contact" variant="ghost" size="lg">
            {th.contactMe}
          </Button>
        </div>

        <div className={styles.availability}>
          <span className={styles.dot} data-status={profile.commissionStatus} aria-hidden="true" />
          <span>{statusKey[profile.commissionStatus]}</span>
        </div>
      </div>

      {/* Decorative key visual */}
      <div className={styles.keyVisual} aria-hidden="true">
        <div className={styles.kvFrame}>
          <img
            src="https://picsum.photos/seed/hero-keyvisual/900/1100"
            alt=""
            className={styles.kvImage}
          />
          <div className={styles.kvOverlay} />
        </div>
        <div className={styles.kvGlow} />
      </div>

      <div className={styles.bg} aria-hidden="true" />
    </section>
  )
}
