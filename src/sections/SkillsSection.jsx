import { artisticSkills, software } from '@/data/skills'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n } from '@/i18n/context'
import { cx } from '@/utils/helpers'
import styles from './SkillsSection.module.css'

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useI18n()
  const ts = t.skills

  return (
    <section
      ref={ref}
      className={cx('section', styles.section, isVisible && styles.visible)}
      aria-label="Skills"
    >
      <div className="container">
        <p className="section-label">{ts.label}</p>
        <h2 className="section-title">{ts.title}</h2>

        <div className={styles.grid}>
          <div className={styles.col}>
            <h3 className={styles.colTitle}>{ts.artisticTitle}</h3>
            <ul className={styles.skillList}>
              {artisticSkills.map(({ name, level }) => (
                <li key={name} className={styles.skillItem}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{name}</span>
                    <span className={styles.skillLevel}>{level}%</span>
                  </div>
                  <div className={styles.bar}>
                    <div className={styles.fill} style={{ '--target': `${level}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>{ts.softwareTitle}</h3>
            <ul className={styles.softwareList}>
              {software.map(({ name, proficiency, years }) => (
                <li key={name} className={styles.softwareItem}>
                  <div className={styles.softwareName}>{name}</div>
                  <div className={styles.softwareMeta}>
                    <span className={styles.proficiency}>{proficiency}</span>
                    <span className={styles.years}>{years}y</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
