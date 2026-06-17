import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { Button } from '@/components/UI/Button'
import heroImage from '@/assets/images/me.png'
import styles from './HeroSection.module.css'

/* ── Simple inline SVG icons ── */
const IconDiscord   = () => <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
const IconInstagram = () => <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
const IconArtStation = () => <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.164-1.333H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg>
const IconEmail = () => <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>

export function HeroSection() {
  const { t } = useI18n()
  const th = t.hero

  const statusLabel = {
    open:     th.statusOpen,
    closed:   th.statusClosed,
    waitlist: th.statusWaitlist,
  }[profile.commissionStatus]

  return (
    <section className={styles.hero} aria-label="Hero">

      {/* ── Background FX ── */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      {/* ── Key Visual — locked to hero background ── */}
      <div className={styles.keyVisual} aria-hidden="true">
        <div className={styles.kvGlow} />
        <img
          src={heroImage}
          alt={profile.nameDisplay}
          className={styles.kvImage}
        />
      </div>

      {/* ── Main Content ── */}
      <div className={styles.content}>
        <div className={styles.textContent}>
          <span className={styles.label}>{th.label}</span>

          <h1 className={styles.name}>{profile.nameDisplay}</h1>

          <p className={styles.title}>{profile.title}</p>

          <div className={styles.divider} aria-hidden="true" />

          <p className={styles.tagline}>{th.tagline}</p>

          <div className={styles.ctas}>
            <Button as={Link} to="/portfolio" variant="primary" size="lg">
              {th.viewPortfolio}
            </Button>
            <Button as={Link} to="/contact" variant="ghost" size="lg">
              {th.contactMe}
            </Button>
          </div>

          <div className={styles.availability}>
            <span className={styles.dot} data-status={profile.commissionStatus} aria-hidden="true" />
            <span>{statusLabel}</span>
          </div>

          <div className={styles.social} aria-label="Social links">
            {profile.social?.discord && (
              <a href={profile.social.discord} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label="Discord">
                <IconDiscord />
              </a>
            )}
            {profile.social?.instagram && (
              <a href={profile.social.instagram} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
            )}
            {profile.social?.artstation && (
              <a href={profile.social.artstation} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label="ArtStation">
                <IconArtStation />
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className={styles.socialLink} aria-label="Email">
                <IconEmail />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
