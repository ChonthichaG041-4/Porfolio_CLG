import { useParams, Link, Navigate } from 'react-router-dom'
import { getWorkBySlug } from '@/data/works'
import { useI18n }       from '@/i18n/context'
import { ProcessSlider } from '@/components/Shared/ProcessSlider'
import { ImageViewer }   from '@/components/UI/ImageViewer'
import { TagList }       from '@/components/UI/Tag'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t } = useI18n()
  const td = t.detail
  const work = getWorkBySlug(slug)

  if (!work) return <Navigate to="/portfolio" replace />

  const finalSection   = work.sections?.find(s => s.type === 'final')
  const gallerySection = work.sections?.find(s => s.type === 'gallery')
  const hasProcBreak   = work.sections?.some(s => s.type === 'process' || s.type === 'breakdown')

  return (
    <main className={styles.page}>
      {/* ─── Hero Banner ─── */}
      <section className={styles.hero}>
        {work.banner && (
          <div className={styles.bannerWrap}>
            <img src={work.banner} alt={work.title} className={styles.banner} />
            <div className={styles.bannerOverlay} />
          </div>
        )}
        <div className={styles.heroContent}>
          <div className="container">
            <span className={cx(styles.tierBadge, styles[work.tier])}>
              {t.tiers[work.tier]}
            </span>
            <h1 className={styles.title}>{work.title}</h1>
            <p className={styles.description}>{work.description}</p>
            <div className={styles.meta}>
              {[
                { label: td.meta.role,   value: work.role   },
                { label: td.meta.year,   value: work.year   },
                { label: td.meta.client, value: work.client },
                { label: td.meta.mood,   value: work.mood   },
              ].filter(m => m.value).map(({ label, value }) => (
                <div key={label} className={styles.metaItem}>
                  <span className={styles.metaLabel}>{label}</span>
                  <span className={styles.metaValue}>{value}</span>
                </div>
              ))}
            </div>
            <TagList tags={work.software} className={styles.softwareTags} />
          </div>
        </div>
      </section>

      <div className="container">
        {/* ─── Overview ─── */}
        {work.overview && (
          <section className={styles.section}>
            <p className="section-label">{td.overview}</p>
            <h2 className={styles.sectionTitle}>{td.overviewTitle}</h2>
            <p className={styles.overview}>{work.overview}</p>
          </section>
        )}

        {/* ─── Worldbuilding ─── */}
        {work.worldbuilding && (
          <section className={styles.section}>
            <p className="section-label">{td.world}</p>
            <h2 className={styles.sectionTitle}>{td.worldTitle}</h2>
            <p className={styles.overview}>{work.worldbuilding}</p>
          </section>
        )}

        {/* ─── Process ─── */}
        {hasProcBreak && (
          <section className={styles.section}>
            <p className="section-label">{td.process}</p>
            <h2 className={styles.sectionTitle}>{td.processTitle}</h2>
            <ProcessSlider sections={work.sections} />
          </section>
        )}

        {/* ─── Final Artwork ─── */}
        {finalSection?.images?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.final}</p>
            <h2 className={styles.sectionTitle}>{td.finalTitle}</h2>
            <div className={styles.finalGrid}>
              {finalSection.images.map((src, i) => (
                <ImageViewer
                  key={i}
                  src={src}
                  alt={`${work.title} — ${td.final} ${i + 1}`}
                  images={finalSection.images}
                  index={i}
                  aspectRatio={i === 0 ? '16/9' : '4/3'}
                  className={i === 0 ? styles.finalHero : ''}
                />
              ))}
            </div>
          </section>
        )}

        {/* ─── Gallery ─── */}
        {gallerySection?.images?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.deliverables}</p>
            <h2 className={styles.sectionTitle}>{gallerySection.title}</h2>
            <div className={styles.gallery}>
              {gallerySection.images.map((src, i) => (
                <ImageViewer
                  key={i}
                  src={src}
                  alt={`${work.title} — ${i + 1}`}
                  images={gallerySection.images}
                  index={i}
                  aspectRatio="4/3"
                />
              ))}
            </div>
          </section>
        )}

        <div className={styles.back}>
          <Link to="/portfolio" className={styles.backLink}>{td.back}</Link>
        </div>
      </div>
    </main>
  )
}

function cx(...cls) { return cls.filter(Boolean).join(' ') }
