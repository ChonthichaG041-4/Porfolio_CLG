import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/context";
import styles from "./WebtoonPortfolio.module.css";

// ── Software icons ──────────────────────────────────────────
import iconCsp    from "@/assets/icons/csp_dack.svg";
import iconSkp    from "@/assets/icons/skp_dack.svg";
import iconPc     from "@/assets/icons/pc_dack.svg";
import iconFigma  from "@/assets/icons/figma_dack.svg";
import iconBlender from "@/assets/icons/blender-icon.svg";
import iconClaude from "@/assets/icons/claude-icon.svg";

// ── Webtoon assets ──────────────────────────────────────────
import wtCover        from "@/assets/images/webtoon/wt-cover.jpg";
import wtCoverBg2     from "@/assets/images/webtoon/Wtconverbg2.jpg";
import wtMap          from "@/assets/images/webtoon/wt-map.jpg";
import wtMapWar       from "@/assets/images/webtoon/wt-map-war.jpg";
import wtMapPaper     from "@/assets/images/webtoon/wt-map-paper.jpg";
import wtMapRed       from "@/assets/images/webtoon/wt-map-red.jpg";
// ── Webtoon videos ──────────────────────────────────────────
import wtVdo0         from "@/assets/images/webtoon/wt-vdo.mp4";
import wtVdo1         from "@/assets/images/webtoon/wt-vdo1.mp4";
import wtVdo2         from "@/assets/images/webtoon/wt-vdo2.mp4";
import wtContinueDark from "@/assets/images/webtoon/wt-continue-dark.jpg";
import wtContinueLight from "@/assets/images/webtoon/wt-continue-light.jpg";
import wtIllus0       from "@/assets/images/webtoon/wt-illus-0.jpg";
import wtIllus1       from "@/assets/images/webtoon/wt-illus-1.jpg";
import wtIllus2       from "@/assets/images/webtoon/wt-illus-2.jpg";
import wtIllus3       from "@/assets/images/webtoon/wt-illus-3.jpg";
import wtIllus4       from "@/assets/images/webtoon/wt-illus-4.jpg";
import wtIllus5       from "@/assets/images/webtoon/wt-illus-5.jpg";
import wtStripTurmoil from "@/assets/images/webtoon/wt-strip-turmoil.webp";
import wtStripDrowning from "@/assets/images/webtoon/wt-strip-drowning.webp";
import wtStripTomb    from "@/assets/images/webtoon/wt-strip-tomb.webp";
// ── Characters ─────────────────────────────────────────────
import wtCharNemesis  from "@/assets/images/webtoon/character/wt-char-nemesis.jpg";
import wtCharThamil   from "@/assets/images/webtoon/character/wt-char-thamil.png";
import wtCharDaraporn from "@/assets/images/webtoon/character/wt-char-daraporn.png";
import wtCharKoin     from "@/assets/images/webtoon/character/wt-char-koin.jpg";
import wtCharLilil    from "@/assets/images/webtoon/character/wt-char-lilil.jpg";
import wtCharOrchkan  from "@/assets/images/webtoon/character/wt-char-orchkan.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// Non-translatable visual data (images, colours, numeric stats)
// ─────────────────────────────────────────────────────────────────────────────

const CHAR_META = [
  { key: "nemesis",  image: wtCharNemesis,  glowColor: "#6b21a8", accentColor: "#c084fc", age: 17, height: 175, isMain: true  },
  { key: "thamil",   image: wtCharThamil,   glowColor: "#92400e", accentColor: "#f59e0b", age: 19, height: 187, isMain: false },
  { key: "daraporn", image: wtCharDaraporn, glowColor: "#1e3a5f", accentColor: "#93c5fd", age: 18, height: 167, isMain: false },
  { key: "koin",     image: wtCharKoin,     glowColor: "#7f1d1d", accentColor: "#ef4444", age: 18, height: 185, isMain: false },
  { key: "lilil",    image: wtCharLilil,    glowColor: "#1e3a8a", accentColor: "#60a5fa", age: 15, height: 163, isMain: false },
  { key: "orchkan",  image: wtCharOrchkan,  glowColor: "#14532d", accentColor: "#86efac", age: 16, height: 165, isMain: false },
];

const ILLUS_IMAGES = [wtIllus0, wtIllus1, wtIllus2, wtIllus3, wtIllus4, wtIllus5];
const STRIP_IMAGES = [wtStripTurmoil, wtStripDrowning, wtStripTomb];
const MAP_IMAGES   = [wtMap, wtMapWar, wtMapPaper, wtMapRed];
const VIDEO_SRCS   = [wtVdo0, wtVdo1, wtVdo2];

const SOFTWARE = [
  { name: "Clip Studio Paint", icon: iconCsp,   role: "Line Art · Panel · Comic" },
  { name: "Photoshop",         icon: "PS",       role: "Painting · FX · Export"   },
  { name: "Blender",           icon: iconBlender,        role: "3D Reference · Scene Setup" },
  { name: "SketchUp",          icon: iconSkp,   role: "Reference Management"     },
  { name: "Procreate",         icon: iconPc,    role: "Thumbnail · Sketch"       },
  { name: "Figma",             icon: iconFigma, role: "Layout · Typography"      },
  // { name: "Claude",            icon: iconClaude, role: "AI Assistance"             },
];

const CONTACTS = [
  { platform: "Email",      handle: "hello@chonthicha.art", href: "mailto:hello@chonthicha.art",      icon: "✉" },
  { platform: "ArtStation", handle: "artstation.com/cheso", href: "https://artstation.com/cheso",     icon: "⬡" },
  { platform: "Behance",    handle: "behance.net/cheso",    href: "https://behance.net/cheso",         icon: "⬡" },
  { platform: "Instagram",  handle: "@cheso.art",           href: "https://instagram.com/cheso.art",  icon: "◈" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;
  return (
    <div className={styles.lbOverlay} onClick={onClose}>
      <button type="button" className={styles.lbClose} onClick={onClose} aria-label="Close">✕</button>
      <div className={styles.lbContent} onClick={e => e.stopPropagation()} onDoubleClick={e => { e.stopPropagation(); onClose(); }}>
        {item.type === "video"
          ? <video src={item.src} autoPlay loop muted playsInline controls className={styles.lbMedia} />
          : <img src={item.src} alt={item.alt ?? ""} className={styles.lbMedia} />
        }
        {item.caption && <p className={styles.lbCaption}>{item.caption}</p>}
      </div>
      <p className={styles.lbHint}>ดับเบิลคลิกหรือกด Esc เพื่อปิด</p>
    </div>
  );
}

function ImgPlaceholder({ label, aspectRatio = "16/9", className = "" }) {
  return (
    <div className={`${styles.placeholder} ${className}`} style={{ aspectRatio }}>
      <div className={styles.placeholderInner}>
        <span className={styles.placeholderIcon}>⬡</span>
        <span className={styles.placeholderLabel}>{label}</span>
        <span className={styles.placeholderHint}>DROP IMAGE HERE</span>
      </div>
    </div>
  );
}

function Img({ src, alt, aspectRatio, className = "", placeholderLabel }) {
  if (!src) return <ImgPlaceholder label={placeholderLabel ?? alt} aspectRatio={aspectRatio} className={className} />;
  return (
    <img src={src} alt={alt} className={`${styles.realImg} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined} loading="lazy" />
  );
}

/** Section heading — takes a `s` object from tw.sections.* */
function SectionHead({ s }) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionLabel}>{s.num} — {s.label}</span>
      <h2 className={styles.sectionTitle}>{s.title}</h2>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WebtoonPortfolio() {
  const { t } = useI18n();
  const tw = t.webtoon;   // shorthand — all text comes from here

  const [lbItem, setLbItem] = useState(null);
  const open  = useCallback((item) => setLbItem(item), []);
  const close = useCallback(() => setLbItem(null), []);

  return (
    <main className={styles.page}>

      <Lightbox item={lbItem} onClose={close} />

      {/* ═══════════════════════════════════════════════════
          01 — COVER  (Thai Poison hero style)
      ═══════════════════════════════════════════════════ */}
      <section className={styles.hero} id="cover">
        <div className={styles.bannerWrap}>
          <img src={wtCoverBg2} alt="" className={styles.banner} />
          <div className={styles.bannerOverlay} />
        </div>

        <div className={styles.heroCoverArt}>
          {/* <img src={wtCover} alt={tw.title} className={styles.heroCoverImg} /> */}
        </div>

        <div className={styles.heroContent}>
          <div className="container">
            <span className={styles.heroBadge}>{tw.badge}</span>

            <h1 className={styles.heroTitle}>{tw.title}</h1>
            {tw.titleSub && <p className={styles.heroTitleSub}>{tw.titleSub}</p>}

            <p className={styles.heroTagline}>{tw.tagline}</p>

            <div className={styles.heroMeta}>
              {Object.entries(tw.metaLabels).map(([k, label]) => (
                <div key={k} className={styles.heroMetaItem}>
                  <span className={styles.heroMetaLabel}>{label}</span>
                  <span className={styles.heroMetaValue}>{tw.metaValues[k]}</span>
                </div>
              ))}
            </div>

            <div className={styles.heroRoles}>
              {tw.roleChips.map((r) => (
                <span key={r} className={styles.heroRole}>{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          02 — PROJECT OVERVIEW
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionOverview}`} id="overview">
        <div className="container">
          <SectionHead s={tw.sections.overview} />
          <div className={styles.overviewGrid}>
            <div className={styles.overviewText}>
              <p className={styles.overviewPara}>{tw.overview.p1}</p>
              <p className={styles.overviewPara} style={{ marginTop: "1.5rem" }}>{tw.overview.p2}</p>
            </div>
            <div className={styles.overviewTable}>
              <table className={styles.infoTable}>
                <tbody>
                  {tw.info.map(({ label, value }) => (
                    <tr key={label} className={styles.infoRow}>
                      <td className={styles.infoLabel}>{label}</td>
                      <td className={styles.infoValue}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          03 — TYPOGRAPHY
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionTypo}`} id="typography">
        <div className="container">
          <SectionHead s={tw.sections.typography} />
          <div className={styles.typoGrid}>
            <div className={`${styles.typoCard} ${styles.typoCardWhite}`}>
              <div className={styles.typoImgWrap}>
                <Img src={wtContinueLight} alt={tw.typo.whiteVersion} aspectRatio="4/3" className={styles.typoImg} />
              </div>
              <div className={styles.typoInfo}>
                <span className={styles.typoVersion}>{tw.typo.whiteVersion}</span>
                <p className={styles.typoDesc}>{tw.typo.whiteDesc}</p>
              </div>
            </div>
            <div className={`${styles.typoCard} ${styles.typoCardBlack}`}>
              <div className={styles.typoImgWrap}>
                <Img src={wtContinueDark} alt={tw.typo.blackVersion} aspectRatio="4/3" className={styles.typoImg} />
              </div>
              <div className={styles.typoInfo}>
                <span className={styles.typoVersion}>{tw.typo.blackVersion}</span>
                <p className={styles.typoDesc}>{tw.typo.blackDesc}</p>
              </div>
            </div>
          </div>
          <div className={styles.moodRow}>
            {tw.typo.mood.map(({ label, value }) => (
              <div key={label} className={styles.moodItem}>
                <span className={styles.moodLabel}>{label}</span>
                <span className={styles.moodValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          04 — CHARACTER DESIGN
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionChars}`} id="characters">
        <div className="container">
          <SectionHead s={tw.sections.characters} />

          {/* Main character — featured full-width row */}
          {CHAR_META.filter((c) => c.isMain).map((meta) => {
            const ch = tw.chars[meta.key];
            return (
              <div key={meta.key} className={styles.charMainRow}>
                <div className={styles.charMainImgWrap} style={{ "--glow": meta.glowColor }}>
                  <Img src={meta.image} alt={ch.name} aspectRatio="3/4" className={styles.charMainImg} />
                </div>
                <div className={styles.charMainInfo}>
                  <h3 className={styles.charNameEn}>{ch.name}</h3>
                  <div className={styles.charFullName}>{ch.fullName}</div>
                  <span className={styles.charAlias}>{ch.alias}</span>
                  <span className={styles.charRole} style={{ color: meta.accentColor }}>{ch.role}</span>
                  <div className={styles.charStats}>
                    <span>{tw.chars.ageLabel} {meta.age}</span>
                    <span>{meta.height} {tw.chars.heightUnit}</span>
                  </div>
                  <div className={styles.charTraits}>
                    {ch.traits.map((t) => <span key={t} className={styles.charTrait}>{t}</span>)}
                  </div>
                  <p className={styles.charColorNote}>{ch.colorNote}</p>
                  <div className={styles.charDesignBlock}>
                    <p className={styles.charDesignNote}>{ch.designNotes}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Supporting cast */}
          <div className={styles.charSupportGrid}>
            {CHAR_META.filter((c) => !c.isMain).map((meta) => {
              const ch = tw.chars[meta.key];
              return (
                <div key={meta.key} className={styles.charCard}>
                  <div className={styles.charImgWrap} style={{ "--glow": meta.glowColor }}>
                    <Img src={meta.image} alt={ch.name} aspectRatio="4/5" className={styles.charImg} />
                  </div>
                  <div className={styles.charInfo}>
                    <span className={styles.charNameEn}>{ch.name}</span>
                    <span className={styles.charRole} style={{ color: meta.accentColor }}>{ch.role}</span>
                    <div className={styles.charStats}>
                      <span>{tw.chars.ageLabel} {meta.age}</span>
                      <span>{meta.height} {tw.chars.heightUnit}</span>
                    </div>
                    <div className={styles.charTraits}>
                      {ch.traits.map((t) => <span key={t} className={styles.charTrait}>{t}</span>)}
                    </div>
                    <p className={styles.charColorNote}>{ch.colorNote}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          04 — WORLD MAP DESIGN
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionWorld}`} id="worldbuilding">
        <div className="container">
          <SectionHead s={tw.sections.world} />
          <div className={styles.worldDesc}>
            <p>{tw.world.desc}</p>
          </div>
          <div className={styles.worldMaps}>
            {tw.world.mapVariants.map((variant, i) => (
              <div key={i} className={styles.worldMapCard}>
                <p className={styles.worldMapLabel}>{variant.label}</p>
                <div
                  className={styles.zoomable}
                  onDoubleClick={() => open({ type: "image", src: MAP_IMAGES[i], alt: variant.label })}
                >
                  <Img src={MAP_IMAGES[i]} alt={variant.label} aspectRatio="16/10" className={styles.worldMapImg} />
                  <span className={styles.zoomHint}>⤢</span>
                </div>
              </div>
            ))}
          </div>
          {/* <div className={styles.factions}>
            {tw.world.factions.map((f) => (
              <div key={f.name} className={styles.factionCard}>
                <span className={styles.factionSymbol} style={{ color: f.color }}>{f.symbol}</span>
                <div>
                  <span className={styles.factionName}>{f.name}</span>
                  <p className={styles.factionDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          05 — ILLUSTRATION SHOWCASE
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionIllus}`} id="illustrations">
        <div className="container">
          <SectionHead s={tw.sections.illustrations} />
          <div className={styles.illusGrid}>
            {tw.illustrations.items.map((item, i) => {
              const isFirst = i === 0
              const isLast  = i === tw.illustrations.items.length - 1
              const isFeatured = isFirst || isLast
              return (
              <div key={i} className={`${styles.illusCard} ${isFeatured ? styles.illusCardFeatured : ""} ${isLast ? styles.illusCardLast : ""}`}>
                <div className={styles.illusImgWrap}>
                  <Img src={ILLUS_IMAGES[i]} alt={item.title}
                    aspectRatio={isFirst ? "4/3" : isLast ? "2/4" : "4/5"} className={styles.illusImg} />
                  <div className={styles.illusOverlay}>
                    <span className={styles.illusType}>{item.type}</span>
                  </div>
                </div>
                <p className={styles.illusTitle}>{item.title}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          06 — COMIC SAMPLE
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionComic}`} id="comic">
        <div className="container">
          <SectionHead s={tw.sections.comic} />
          <p className={styles.comicIntro}>{tw.comic.intro}</p>
          <div className={styles.comicReader}>
            <div className={styles.comicStrips}>
              {tw.comic.strips.map((strip, i) => (
                <div key={strip.ep} className={styles.comicStrip}>
                  <Img src={STRIP_IMAGES[i]} alt={strip.title} className={styles.comicStripImg} />
                  <div className={styles.comicStripMeta}>
                    <span className={styles.comicEp}>{strip.ep}</span>
                    <span className={styles.comicTitle}>{strip.title}</span>
                    <p className={styles.comicCaption}>{strip.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.comicHint}>{tw.comic.hint}</p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          07 — VIDEO SHOWCASE
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionVideo}`} id="video">
        <div className="container">
          <SectionHead s={tw.sections.video} />
          <p className={styles.videoIntro}>{tw.video.intro}</p>
          <div className={styles.videoGrid}>
            {tw.video.items.map((item, i) => (
              <div key={i} className={styles.videoCard}>
                <div
                  className={`${styles.videoWrap} ${styles.zoomable}`}
                  onDoubleClick={() => open({ type: "video", src: VIDEO_SRCS[i], caption: item.caption })}
                >
                  <video
                    src={VIDEO_SRCS[i]}
                    autoPlay loop muted playsInline
                    className={styles.videoEl}
                  />
                  <div className={styles.videoOverlay}>
                    <span className={styles.videoLabel}>{item.label}</span>
                  </div>
                  <span className={styles.zoomHint}>⤢</span>
                </div>
                <p className={styles.videoCaption}>{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          08 — SKILLS & TOOLS
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionSkills}`} id="skills">
        <div className="container">
          <SectionHead s={tw.sections.skills} />
          <div className={styles.skillsLayout}>

            <div className={styles.skillsCol}>
              <p className={styles.skillsColTitle}>{tw.skills.softwareTitle}</p>
              <div className={styles.softwareGrid}>
                {SOFTWARE.map((sw) => (
                  <div key={sw.name} className={styles.softwareCard}>
                    {typeof sw.icon === 'string' && !sw.icon.startsWith('/')
                      ? <span className={styles.softwareIcon}>{sw.icon}</span>
                      : <span className={styles.softwareIconBox}>
                          <span
                            className={styles.softwareIconMask}
                            style={{ WebkitMaskImage: `url(${sw.icon})`, maskImage: `url(${sw.icon})` }}
                            aria-hidden="true"
                          />
                        </span>
                    }
                    <span className={styles.softwareName}>{sw.name}</span>
                    <span className={styles.softwareRole}>{sw.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.skillsCol}>
              <p className={styles.skillsColTitle}>{tw.skills.artTitle}</p>
              <div className={styles.skillPills}>
                {tw.skills.art.map((s) => (
                  <span key={s} className={`${styles.skillPill} ${styles.skillPillArt}`}>{s}</span>
                ))}
              </div>
            </div>

            <div className={styles.skillsCol}>
              <p className={styles.skillsColTitle}>{tw.skills.writingTitle}</p>
              <div className={styles.skillPills}>
                {tw.skills.writing.map((s) => (
                  <span key={s} className={`${styles.skillPill} ${styles.skillPillWriting}`}>{s}</span>
                ))}
              </div>
            </div>

            <div className={styles.skillsCol}>
              <p className={styles.skillsColTitle}>{tw.skills.prodTitle}</p>
              <div className={styles.skillPills}>
                {tw.skills.prod.map((s) => (
                  <span key={s} className={`${styles.skillPill} ${styles.skillPillProd}`}>{s}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          09 — READ THE SERIES
      ═══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionContact}`} id="contact">
        <div className="container">
          <SectionHead s={tw.sections.contact} />
          <p className={styles.contactIntro}>{tw.contact.intro}</p>
          <div className={styles.contactGrid}>
            {tw.readLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className={styles.contactCard}>
                <span className={styles.contactIcon}>🔗</span>
                <div className={styles.contactInfo}>
                  <span className={styles.contactPlatform}>{link.label}</span>
                  <span className={styles.contactHandle}>{link.url.replace(/^https?:\/\//, '').split('/')[0]}</span>
                </div>
                <span className={styles.contactArrow}>→</span>
              </a>
            ))}
          </div>
          <div className={styles.contactBack}>
            <Link to="/portfolio" className={styles.backLink}>{tw.contact.back}</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
