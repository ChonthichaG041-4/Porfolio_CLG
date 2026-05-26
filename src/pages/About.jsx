import { profile }         from '@/data/profile'
import { artisticSkills, software, technicalSkills } from '@/data/skills'
import { useI18n }          from '@/i18n/context'
import { Button }           from '@/components/UI/Button'
import styles from './About.module.css'

export default function About() {
  const { t } = useI18n()
  const ta = t.aboutPage
  const tab = t.about  // bio + goals from hero translations

  return (
    <main className={styles.page}>
      <div className="container">
        {/* ─── Header + Portrait ─── */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className="section-label">{ta.label}</p>
            <h1 className={styles.title}>{profile.nameDisplay}</h1>
            <p className={styles.role}>{profile.title}</p>
          </div>
          <div className={styles.portrait}>
            <img
              src="https://picsum.photos/seed/cheso-portrait/480/600"
              alt={profile.nameDisplay}
              className={styles.portraitImg}
            />
          </div>
        </div>

        {/* ─── Bio ─── */}
        <section className={styles.section}>
          <p className={styles.bio}>{tab.bio}</p>
          <p className={styles.bioExtended}>{tab.bioExtended}</p>
        </section>

        {/* ─── Career Goals ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{tab.careerFocus}</h2>
          <ul className={styles.goalsList}>
            {tab.careerGoals.map((g, i) => (
              <li key={i} className={styles.goalItem}>
                <span className={styles.arrow}>→</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Experience ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{ta.experience}</h2>
          <div className={styles.timeline}>
            {profile.experience.map((exp, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <span className={styles.period}>{exp.period}</span>
                  <span className={styles.expType}>
                    {exp.type === 'Freelance' ? ta.freelance : ta.internship}
                  </span>
                </div>
                <div className={styles.timelineRight}>
                  <h3 className={styles.expRole}>{exp.role}</h3>
                  <p className={styles.expCompany}>{exp.company}</p>
                  <p className={styles.expDesc}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Education ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{ta.education}</h2>
          <div className={styles.timeline}>
            {profile.education.map((ed, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <span className={styles.period}>{ed.period}</span>
                </div>
                <div className={styles.timelineRight}>
                  <h3 className={styles.expRole}>{ed.degree}</h3>
                  <p className={styles.expCompany}>{ed.school}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Skills ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{ta.skills}</h2>
          <div className={styles.skillsGrid}>
            <div>
              <h3 className={styles.skillCatTitle}>{ta.artistic}</h3>
              <ul className={styles.skillPills}>
                {artisticSkills.map(s => (
                  <li key={s.name} className={styles.pill}>{s.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.skillCatTitle}>{ta.technical}</h3>
              <ul className={styles.skillPills}>
                {technicalSkills.map(s => (
                  <li key={s} className={styles.pill}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Software ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{ta.software}</h2>
          <div className={styles.softwareGrid}>
            {software.map(({ name, proficiency, years }) => (
              <div key={name} className={styles.softwareItem}>
                <span className={styles.softwareName}>{name}</span>
                <span className={styles.softwareProf}>{proficiency}</span>
                <span className={styles.softwareYrs}>{years}y</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Languages ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{ta.languages}</h2>
          <div className={styles.languages}>
            {profile.languages.map(({ name, level }) => (
              <div key={name} className={styles.language}>
                <span className={styles.langName}>{name}</span>
                <span className={styles.langLevel}>{level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Resume CTA ─── */}
        <section className={styles.resumeCta}>
          <p>{ta.resumeNote}</p>
          <Button as="a" href={profile.resumeUrl} download variant="primary" size="lg">
            {ta.downloadResume}
          </Button>
        </section>
      </div>
    </main>
  )
}
