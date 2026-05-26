import { profile } from '@/data/profile'
import { artisticSkills, software, technicalSkills, softSkills } from '@/data/skills'
import { useI18n }  from '@/i18n/context'
import { Button }   from '@/components/UI/Button'
import styles from './Resume.module.css'

export default function Resume() {
  const { t } = useI18n()
  const tr = t.resumePage
  const ta = t.aboutPage

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="section-label">{tr.label}</p>
            <h1 className={styles.name}>{profile.nameDisplay}</h1>
            <p className={styles.title}>{profile.title}</p>
            <p className={styles.location}>{profile.location} · {profile.email}</p>
          </div>
          <Button as="a" href={profile.resumeUrl} download variant="primary">
            {tr.downloadPDF}
          </Button>
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{tr.experience}</h2>
            {profile.experience.map((exp, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.entryRole}>{exp.role}</h3>
                    <p className={styles.entryCompany}>{exp.company}</p>
                  </div>
                  <span className={styles.entryPeriod}>{exp.period}</span>
                </div>
                <p className={styles.entryDesc}>{exp.description}</p>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{tr.education}</h2>
            {profile.education.map((ed, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.entryRole}>{ed.degree}</h3>
                    <p className={styles.entryCompany}>{ed.school}</p>
                  </div>
                  <span className={styles.entryPeriod}>{ed.period}</span>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{tr.skills}</h2>
            <div className={styles.skillsGrid}>
              <div>
                <h3 className={styles.skillGroup}>{tr.artistic}</h3>
                <p className={styles.skillList}>{artisticSkills.map(s => s.name).join(' · ')}</p>
              </div>
              <div>
                <h3 className={styles.skillGroup}>{tr.technical}</h3>
                <p className={styles.skillList}>{technicalSkills.join(' · ')}</p>
              </div>
              <div>
                <h3 className={styles.skillGroup}>{tr.soft}</h3>
                <p className={styles.skillList}>{softSkills.join(' · ')}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{tr.software}</h2>
            <div className={styles.softwareRow}>
              {software.map(({ name, proficiency }) => (
                <div key={name} className={styles.softwareChip}>
                  <span className={styles.chipName}>{name}</span>
                  <span className={styles.chipLevel}>{proficiency}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{tr.languages}</h2>
            <div className={styles.langRow}>
              {profile.languages.map(({ name, level }) => (
                <span key={name} className={styles.langChip}>{name} — {level}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
