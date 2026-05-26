import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useI18n()
  const tc = t.contactPage

  const statusLabel = {
    open:     tc.statusOpen,
    closed:   tc.statusClosed,
    waitlist: tc.statusWaitlist,
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">{tc.label}</p>
          <h1 className={styles.title}>{tc.title}</h1>
        </div>

        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.left}>
            <p className={styles.intro}>{tc.intro}</p>

            <div className={styles.statusCard}>
              <span className={styles.dot} data-status={profile.commissionStatus} aria-hidden="true" />
              <div>
                <p className={styles.statusTitle}>
                  {tc.statusTitle}{' '}
                  <strong>{statusLabel[profile.commissionStatus]}</strong>
                </p>
                <p className={styles.statusSub}>{t.contactSection.availability}</p>
              </div>
            </div>

            <div className={styles.methods}>
              <a href={`mailto:${profile.email}`} className={styles.method}>
                <span className={styles.methodLabel}>{tc.methods.email}</span>
                <span className={styles.methodValue}>{profile.email}</span>
              </a>
              {profile.discord && (
                <div className={styles.method}>
                  <span className={styles.methodLabel}>{tc.methods.discord}</span>
                  <span className={styles.methodValue}>{profile.discord}</span>
                </div>
              )}
              {profile.social.artstation && (
                <a href={profile.social.artstation} target="_blank" rel="noopener noreferrer" className={styles.method}>
                  <span className={styles.methodLabel}>{tc.methods.artstation}</span>
                  <span className={styles.methodValue}>{tc.methods.viewProfile}</span>
                </a>
              )}
              {profile.social.instagram && (
                <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.method}>
                  <span className={styles.methodLabel}>{tc.methods.instagram}</span>
                  <span className={styles.methodValue}>@cheso.art →</span>
                </a>
              )}
            </div>
          </div>

          {/* Right */}
          <div className={styles.right}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>{tc.infoTitle}</h3>
              <ul className={styles.infoList}>
                {tc.services.map((item, i) => (
                  <li key={i} className={styles.infoItem}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>{tc.responseTitle}</h3>
              <p className={styles.infoText}>{tc.responseText}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
