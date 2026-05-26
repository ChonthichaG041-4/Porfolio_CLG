import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { Button } from '@/components/UI/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './AboutSection.module.css'

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useI18n()
  const ta = t.about

  return (
    <section
      ref={ref}
      className={cx('section', styles.section, isVisible && styles.visible)}
      aria-label="About preview"
    >
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.text}>
            <p className="section-label">{ta.label}</p>
            <h2 className="section-title">{ta.title}</h2>
            <p className={styles.bio}>{ta.bio}</p>
            <Button as={Link} to="/about" variant="secondary">
              {ta.readMore}
            </Button>
          </div>

          <div className={styles.goals}>
            <h3 className={styles.goalsTitle}>{ta.careerFocus}</h3>
            <ul className={styles.goalsList}>
              {ta.careerGoals.map((goal, i) => (
                <li key={i} className={styles.goal}>
                  <span className={styles.goalArrow}>→</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
