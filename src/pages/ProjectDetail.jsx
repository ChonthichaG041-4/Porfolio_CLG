import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getWorkBySlug }    from '@/data/works'
import { useI18n }          from '@/i18n/context'
import { CharacterCarousel } from '@/components/Shared/CharacterCarousel'
import { CharDesignPanel }   from '@/components/Shared/CharDesignPanel'
import { WebtoonReader }     from '@/components/Shared/WebtoonReader'
import { ImageViewer }       from '@/components/UI/ImageViewer'
import { TagList }           from '@/components/UI/Tag'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t }    = useI18n()
  const td       = t.detail
  const work     = getWorkBySlug(slug)

  if (!work) return <Navigate to="/portfolio" replace />

  const gallerySection     = work.sections?.find(s => s.type === 'gallery')
  const techSection        = work.sections?.find(s => s.type === 'techstack')
  const charSection        = work.sections?.find(s => s.type === 'characters')
  const charDesignSecs     = work.sections?.filter(s => s.type === 'chardesign') ?? []
  const gameScreensSec     = work.sections?.find(s => s.type === 'gamescreens')
  const webtoonCoverSec    = work.sections?.find(s => s.type === 'webtoon-cover')
  const webtoonReaderSec   = work.sections?.find(s => s.type === 'webtoon-reader')
  const commissionGalSec   = work.sections?.find(s => s.type === 'commission-gallery')
  const logoGallerySec     = work.sections?.find(s => s.type === 'logo-gallery')
  const accessoriesSecs    = work.sections?.filter(s => s.type === 'accessories-gallery') ?? []
  const lineartSecs        = work.sections?.filter(s => s.type === 'lineart-gallery') ?? []
  const finalSection       = work.sections?.find(s => s.type === 'final')
  const featureGridSec     = work.sections?.find(s => s.type === 'feature-grid')
  const resultsSec         = work.sections?.find(s => s.type === 'results')

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
            <p  className={styles.description}>{work.description}</p>
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

        {/* ─── Feature Grid (web/app projects) ─── */}
        {featureGridSec?.items?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">Features</p>
            <h2 className={styles.sectionTitle}>{featureGridSec.title}</h2>
            <div className={styles.featureGrid}>
              {featureGridSec.items.map((item, i) => (
                <div key={i} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{item.icon}</span>
                  <span className={styles.featureLabel}>{item.label}</span>
                  <p    className={styles.featureDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Overview ─── */}
        {work.overview && (
          <section className={styles.section}>
            <p className="section-label">{td.overview}</p>
            <h2 className={styles.sectionTitle}>{td.overviewTitle}</h2>
            <p  className={styles.overview}>{work.overview}</p>
          </section>
        )}

        {/* ─── Worldbuilding ─── */}
        {work.worldbuilding && (
          <section className={styles.section}>
            <p className="section-label">{td.world}</p>
            <h2 className={styles.sectionTitle}>{td.worldTitle}</h2>
            <p  className={styles.overview}>{work.worldbuilding}</p>
          </section>
        )}

        {/* ─── Webtoon Cover & Concept Art ─── */}
        {webtoonCoverSec && (
          <section className={styles.section}>
            <p className="section-label">Cover Art</p>
            <h2 className={styles.sectionTitle}>{webtoonCoverSec.title}</h2>
            <div className={styles.webtoonCover}>
              <div className={styles.webtoonCoverMain}>
                <img src={webtoonCoverSec.cover} alt="Cover" className={styles.webtoonCoverImg} />
              </div>
              <div className={styles.webtoonCoverSide}>
                {webtoonCoverSec.images?.map((item, i) => (
                  <div key={i} className={styles.webtoonCoverThumb}>
                    <img src={item.src} alt={item.caption} className={styles.webtoonThumbImg} />
                    {item.caption && <span className={styles.webtoonThumbCap}>{item.caption}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Webtoon Reader ─── */}
        {webtoonReaderSec?.strips?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">Strips</p>
            <h2 className={styles.sectionTitle}>{webtoonReaderSec.title}</h2>
            <WebtoonReader strips={webtoonReaderSec.strips} />
          </section>
        )}

        {/* ─── Commission Gallery ─── */}
        {commissionGalSec?.pieces?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">Commissions</p>
            <h2 className={styles.sectionTitle}>{commissionGalSec.title}</h2>
            <div className={styles.commissionGrid}>
              {commissionGalSec.pieces.map((piece, i) => (
                <div key={i} className={styles.commissionCard}>
                  <div className={styles.commissionImgWrap}>
                    <img
                      src={piece.src}
                      alt={piece.title}
                      className={styles.commissionImg}
                      loading="lazy"
                    />
                    <div className={styles.commissionOverlay}>
                      <span className={styles.commissionZoom}>⤢</span>
                    </div>
                  </div>
                  <div className={styles.commissionInfo}>
                    <span className={styles.commissionTitle}>{piece.title}</span>
                    {piece.desc && <p className={styles.commissionDesc}>{piece.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Character Carousel ─── */}
        {charSection?.characters?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.characters ?? 'Characters'}</p>
            <h2 className={styles.sectionTitle}>{td.playableCharacters ?? 'Playable Characters'}</h2>
            <CharacterCarousel characters={charSection.characters} />
          </section>
        )}

        {/* ─── Character Design Panels ─── */}
        {charDesignSecs.map((sec, i) =>
          sec.panels?.map((panel, j) => (
            <section key={`cd-${i}-${j}`} className={styles.section}>
              <p className="section-label">{td.chardesignLabel ?? panel.label}</p>
              <h2 className={styles.sectionTitle}>{td.chardesignTitle ?? panel.title}</h2>
              <CharDesignPanel left={panel.left} right={panel.right} note={panel.note} />
            </section>
          ))
        )}

        {/* ─── Game Screenshots ─── */}
        {gameScreensSec?.images?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.inGame ?? 'In-Game'}</p>
            <h2 className={styles.sectionTitle}>{gameScreensSec.title}</h2>
            <div className={styles.gameScreens}>
              {gameScreensSec.images.map((item, i) => (
                <div key={i} className={styles.gameScreen}>
                  <img src={item.src} alt={item.caption ?? `Screenshot ${i + 1}`}
                    className={styles.gameScreenImg} loading="lazy" />
                  {item.caption && <span className={styles.gameScreenCaption}>{item.caption}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Tech Highlights ─── */}
        {work.techHighlights?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.techHighlights ?? 'Technical Highlights'}</p>
            <h2 className={styles.sectionTitle}>{td.howItWorks ?? 'How It Works'}</h2>
            <div className={styles.techHighlights}>
              {work.techHighlights.map((item, i) => (
                <div key={i} className={styles.techHighlight}>
                  <span className={styles.techHighlightLabel}>{item.label}</span>
                  <p    className={styles.techHighlightText}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Tech Stack ─── */}
        {techSection?.items?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.techStack ?? 'Tech Stack'}</p>
            <h2 className={styles.sectionTitle}>{techSection.title}</h2>
            <div className={styles.techStack}>
              {techSection.items.map((item, i) => (
                <div key={i} className={styles.techCard}>
                  <span className={styles.techIcon}>{item.icon}</span>
                  <div className={styles.techInfo}>
                    <span className={styles.techName}>{item.name}</span>
                    <span className={styles.techRole}>{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Results / Stats ─── */}
        {resultsSec && (
          <section className={styles.section}>
            <p className="section-label">Results</p>
            <h2 className={styles.sectionTitle}>{resultsSec.title}</h2>
            {resultsSec.stats?.length > 0 && (
              <div className={styles.statsRow}>
                {resultsSec.stats.map((s, i) => (
                  <div key={i} className={styles.statItem}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
            {resultsSec.notes?.length > 0 && (
              <ul className={styles.resultNotes}>
                {resultsSec.notes.map((note, i) => (
                  <li key={i} className={styles.resultNote}>{note}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* ─── Episode Illustrations / Gallery ─── */}
        {gallerySection?.images?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.deliverables}</p>
            <h2 className={styles.sectionTitle}>{gallerySection.title}</h2>
            <div className={styles.gallery}>
              {gallerySection.images.map((src, i) => (
                <ImageViewer key={i} src={src} alt={`${work.title} — ${i + 1}`}
                  images={gallerySection.images} index={i} aspectRatio="4/3" />
              ))}
            </div>
          </section>
        )}

        {/* ─── Accessories Gallery ─── */}
        {accessoriesSecs.map((sec, i) => (
          <section key={`acc-${i}`} className={styles.section}>
            <p className="section-label">Creative Art</p>
            <h2 className={styles.sectionTitle}>{sec.title}</h2>
            <div className={styles.accessoriesGrid}>
              {sec.items.map((item, j) => (
                <div key={j} className={styles.accessoryCard}>
                  <div className={styles.accessoryImgWrap}>
                    <img src={item.src} alt={item.label} className={styles.accessoryImg} loading="lazy" />
                  </div>
                  {item.label && <span className={styles.accessoryLabel}>{item.label}</span>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ─── Lineart Gallery (hover → colour) ─── */}
        {lineartSecs.map((sec, i) => (
          <section key={`line-${i}`} className={styles.section}>
            <p className="section-label">Creative Art</p>
            <h2 className={styles.sectionTitle}>{sec.title}</h2>
            {sec.subtitle && <p className={styles.lineartHint}>{sec.subtitle}</p>}
            <div className={styles.lineartGrid}>
              {sec.items.map((item, j) => (
                <div key={j} className={styles.lineartCard}>
                  <div className={styles.lineartImgWrap}>
                    <img src={item.base}  alt={item.label} className={styles.lineartBase}  loading="lazy" />
                    {item.color && (
                      <img src={item.color} alt={`${item.label} — colour`} className={styles.lineartColor} loading="lazy" />
                    )}
                  </div>
                  {item.label && <span className={styles.lineartLabel}>{item.label}</span>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ─── Logo Gallery ─── */}
        {logoGallerySec?.groups?.length > 0 && (
          <LogoGallery sec={logoGallerySec} td={td} />
        )}

        {/* ─── Final / World Map ─── */}
        {finalSection?.images?.length > 0 && (
          <section className={styles.section}>
            <p className="section-label">{td.final}</p>
            <h2 className={styles.sectionTitle}>{finalSection.title}</h2>
            <div className={styles.finalGrid}>
              {finalSection.images.map((src, i) => (
                <ImageViewer key={i} src={src} alt={`${work.title} — ${i + 1}`}
                  images={finalSection.images} index={i} aspectRatio="4/3" />
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

function LogoGallery({ sec }) {
  const [bg, setBg] = useState('light')
  return (
    <section className={styles.section}>
      <p className="section-label">Logo Design</p>
      <h2 className={styles.sectionTitle}>{sec.title}</h2>
      <div className={styles.logoBgToggle}>
        <button
          className={cx(styles.logoBgBtn, bg === 'light' && styles.logoBgBtnActive)}
          onClick={() => setBg('light')}
        >☀ Light</button>
        <button
          className={cx(styles.logoBgBtn, bg === 'dark' && styles.logoBgBtnActive)}
          onClick={() => setBg('dark')}
        >☾ Dark</button>
      </div>
      {sec.groups.map((group) => (
        <div key={group.name} className={styles.logoGroup}>
          <h3 className={styles.logoGroupName}>{group.name}</h3>
          <div className={styles.logoGrid}>
            {group.logos.map((logo) => (
              <div key={logo.name} className={styles.logoCard}>
                <div className={cx(
                  styles.logoImgWrap,
                  bg === 'light' ? styles.logoImgWrapLight : styles.logoImgWrapDark,
                  logo.fill && styles.logoImgWrapFill
                )}>
                  <img
                    src={bg === 'light' ? logo.light : logo.dark}
                    alt={logo.name}
                    className={logo.fill ? styles.logoImgFill : styles.logoImg}
                    loading="lazy"
                  />
                </div>
                <span className={styles.logoName}>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
