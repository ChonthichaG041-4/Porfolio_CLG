import { profile }        from '@/data/profile'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useI18n }         from '@/i18n/context'
import { cx }              from '@/utils/helpers'
import styles from './Resume.module.css'

function Reveal({ children, delay = 0 }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div ref={ref} className={cx(styles.reveal, isVisible && styles.revealed)}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const SOFTWARE = [
  { name: 'Clip Studio Paint', level: 'proficient',    icon: 'ti-pencil'         },
  { name: 'Procreate',         level: 'advanced',      icon: 'ti-pencil-plus'    },
  { name: 'Photoshop',         level: 'intermediate',  icon: 'ti-photo'          },
  { name: 'Figma',             level: 'proficient',    icon: 'ti-vector'         },
  { name: 'Blender',           level: 'beginner',      icon: 'ti-box'            },
  { name: 'SketchUp',          level: 'beginner',      icon: 'ti-building'       },
  { name: 'DragonBones',       level: 'proficient',    icon: 'ti-device-gamepad' },
  { name: 'Adobe XD',          level: 'proficient',    icon: 'ti-layout'         },
  { name: 'VS Code',           level: 'proficient',    icon: 'ti-code'           },
  { name: 'GitHub',            level: 'basic',         icon: 'ti-brand-github'   },
]

const PROF_SKILLS = [
  'Professional Growth',
  'Self-Learning',
  'Adaptability',
  'Critical Thinking',
  'Attention to Detail',
]

const DEV_SKILLS = [
  {
    category: 'Programming',
    items: [
      'Python','JavaScript','React','Vite','HTML5','CSS3',
      'Tailwind CSS','Node.js','Express.js','Phaser 3','Git','Docker',
    ],
  },
  {
    category: 'Other',
    items: ['DragonBones','NLP / AI'],
  },
]

export default function Resume() {
  const { t } = useI18n()
  const tr = t.resumePage

  const BADGE_LABEL = {
    art:   tr.badgeArt,
    dev:   tr.badgeDev,
    both:  tr.badgeBoth,
    anim:  tr.badgeAnim,
    write: tr.badgeWrite,
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgOrb} aria-hidden="true" />
      <div className={styles.inner}>

        {/* ── Hero band ─────────────────────────────────── */}
        <div className={styles.heroBand}>
          <div className={styles.heroLeft}>
            <div className={styles.avatar}>CL</div>
            <div>
              <h1 className={styles.heroName}>Chonthicha Leepreecha</h1>
              <p className={styles.heroRole1}>2D Artist · Character Concept Artist</p>
              <p className={styles.heroRole2}>Frontend Developer · UX/UI Designer</p>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.contactRow}>
              <i className="ti ti-phone" aria-hidden="true" />
              <span>{profile.phone}</span>
            </div>
            <div className={styles.contactRow}>
              <i className="ti ti-mail" aria-hidden="true" />
              <span>{profile.email}</span>
            </div>
            <div className={styles.contactRow}>
              <i className="ti ti-map-pin" aria-hidden="true" />
              <span>{profile.location}</span>
            </div>
            <a href={profile.resumeUrl} download className={styles.dlBtn}>
              <i className="ti ti-download" aria-hidden="true" />
              {tr.downloadPDF}
            </a>
          </div>
        </div>

        {/* ── Experience ─────────────────────────────────── */}
        <section className={styles.block}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowExperience}</p>
            <h2 className={styles.blockHeading}>{tr.experience}</h2>
          </Reveal>
          <div className={styles.timeline}>
            {profile.experience.map((exp, i) => (
              <Reveal key={i} delay={i * 45}>
                <div className={styles.titem}>
                  <div className={styles.tdot}><div className={styles.tdotInner} /></div>
                  <p className={styles.tyear}>{exp.year}</p>
                  <div className={styles.tcard}>
                    <div className={styles.tcardTop}>
                      <p className={styles.tcardTitle}>{exp.title}</p>
                      {exp.badge && (
                        <span className={cx(styles.tcardBadge,
                          styles[`badge${exp.badge.charAt(0).toUpperCase() + exp.badge.slice(1)}`])}>
                          {BADGE_LABEL[exp.badge]}
                        </span>
                      )}
                    </div>
                    <p className={styles.tcardDesc}>{exp.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        {/* ── Education ──────────────────────────────────── */}
        <section className={styles.block}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowEducation}</p>
            <h2 className={styles.blockHeading}>{tr.education}</h2>
          </Reveal>
          <div className={styles.eduList}>
            {profile.education.map((ed, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={styles.eduCard}>
                  <div className={styles.eduIcon}>
                    <i className={`ti ${ed.tiIcon}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className={styles.eduSchool}>{ed.school}</p>
                    <p className={styles.eduDegree}>{ed.degree}</p>
                    <p className={styles.eduYear}>{ed.period}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        {/* ── Professional Skills ────────────────────────── */}
        <section className={styles.block}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowProfSkills}</p>
            <h2 className={styles.blockHeading}>{tr.profSkillsHeading}</h2>
          </Reveal>
          <Reveal delay={40}>
            <div className={styles.chipWrap}>
              {PROF_SKILLS.map((label) => (
                <span key={label} className={cx(styles.chip, styles.chipMain)}>{label}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className={styles.divider} />

        {/* ── Development Skills ─────────────────────────── */}
        <section className={styles.block}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowSkills}</p>
            <h2 className={styles.blockHeading}>Development Skills</h2>
          </Reveal>
          <div className={styles.skillsGrid}>
            {DEV_SKILLS.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 60}>
                <div className={styles.skillGroup}>
                  <p className={styles.skillCat}>{group.category}</p>
                  <div className={styles.chipWrap}>
                    {group.items.map((label) => (
                      <span key={label} className={cx(styles.chip, styles.chipMain)}>{label}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        {/* ── Art & Illustration ─────────────────────────── */}
        <section className={styles.block}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowArtIllus}</p>
            <h2 className={styles.blockHeading}>{tr.skillCatArtIllus}</h2>
          </Reveal>
          <Reveal delay={40}>
            <div className={styles.chipWrap}>
              {tr.skillsArtIllus.map((label) => (
                <span key={label} className={cx(styles.chip, styles.chipMain)}>{label}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className={styles.divider} />

        {/* ── Writing & Story ────────────────────────────── */}
        <section className={styles.block}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowWriting}</p>
            <h2 className={styles.blockHeading}>{tr.skillCatWriting}</h2>
          </Reveal>
          <Reveal delay={40}>
            <div className={styles.chipWrap}>
              {tr.skillsWriting.map((label) => (
                <span key={label} className={cx(styles.chip, styles.chipMain)}>{label}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className={styles.divider} />

        {/* ── Software ───────────────────────────────────── */}
        <section className={styles.block}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowSoftware}</p>
            <h2 className={styles.blockHeading}>{tr.software}</h2>
          </Reveal>
          <Reveal delay={50}>
            <div className={styles.swGrid}>
              {SOFTWARE.map((sw) => (
                <div key={sw.name} className={styles.swItem}>
                  <i className={`ti ${sw.icon}`} aria-hidden="true" />
                  <div>
                    <p className={styles.swName}>{sw.name}</p>
                    <p className={styles.swLvl}>{tr.levels?.[sw.level] ?? sw.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <div className={styles.divider} />

        {/* ── Languages ──────────────────────────────────── */}
        <section className={cx(styles.block, styles.blockLast)}>
          <Reveal>
            <p className={styles.eyebrow}>{tr.eyebrowLanguages}</p>
            <h2 className={styles.blockHeading}>{tr.languages}</h2>
          </Reveal>
          <Reveal delay={40}>
            <div className={styles.langRowOuter}>
              {profile.languages.map(({ name, level, bar }) => (
                <div key={name} className={styles.langItem}>
                  <div className={styles.langTop}>
                    <span className={styles.langName}>{name}</span>
                    <span className={styles.langLvl}>{level}</span>
                  </div>
                  <div className={styles.langTrack}>
                    <div className={styles.langFill} style={{ width: `${bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

      </div>
    </div>
  )
}
