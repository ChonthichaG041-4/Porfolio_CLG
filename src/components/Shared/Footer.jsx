import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  const rightsText = t.footer.rights
    .replace('{year}', year)
    .replace('{name}', profile.nameDisplay)

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link to="/" className={styles.name}>{profile.nameDisplay}</Link>
          <p className={styles.tagline}>{profile.title}</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/portfolio">{t.nav.portfolio}</Link>
          <Link to="/about">{t.nav.about}</Link>
          <Link to="/contact">{t.nav.contact}</Link>
          <Link to="/resume">{t.nav.resume}</Link>
        </nav>

        <div className={styles.social}>
          {profile.social.artstation && (
            <a href={profile.social.artstation} target="_blank" rel="noopener noreferrer">ArtStation</a>
          )}
          {profile.social.instagram && (
            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          )}
          {profile.social.facebook && (
            <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{rightsText}</p>
      </div>
    </footer>
  )
}
