import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/context";
import styles from "./KKULLibraryMap.module.css";

// ── Assets ──────────────────────────────────────────────────
import heroImg      from "@/assets/images/KKUL-LibraryMap/Hero Screenshot.webp";
import pageMain     from "@/assets/images/KKUL-LibraryMap/KKUL-LibraryMap-pagemain.webp";
import specialRoom  from "@/assets/images/KKUL-LibraryMap/Special-Room-Information.webp";

import vidSearch    from "@/assets/images/KKUL-LibraryMap/Search Flow.mp4";
import vidFloors    from "@/assets/images/KKUL-LibraryMap/Changing building floors.mp4";
import vidStats     from "@/assets/images/KKUL-LibraryMap/Displaying data and statistics..mp4";
import vidDarkLight from "@/assets/images/KKUL-LibraryMap/Dark-Light Mode.mp4";
import vidAccess    from "@/assets/images/KKUL-LibraryMap/Access hours.mp4";

// Video sources in order matching translation videos array
const VIDEO_SRCS = [vidFloors, vidAccess, vidSearch, vidDarkLight, vidStats];

// ── Fullscreen Lightbox ──────────────────────────────────────

function Lightbox({ item, hint, onClose }) {
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
        {item.type === "video" ? (
          <video src={item.src} autoPlay loop muted playsInline controls className={styles.lbMedia} />
        ) : (
          <img src={item.src} alt={item.alt ?? ""} className={styles.lbMedia} loading="lazy" />
        )}
        {item.caption && <p className={styles.lbCaption}>{item.caption}</p>}
      </div>
      <p className={styles.lbHint}>{hint}</p>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────

export default function KKULLibraryMap() {
  const { t } = useI18n();
  const km = t.kkulMap;

  const [lbItem, setLbItem] = useState(null);
  const open  = useCallback((item) => setLbItem(item), []);
  const close = useCallback(() => setLbItem(null), []);

  return (
    <main className={styles.page}>

      <Lightbox item={lbItem} hint={km.lbHint} onClose={close} />

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBannerWrap}>
          <img
            src={heroImg}
            alt={km.title}
            className={`${styles.heroBanner} ${styles.zoomable}`}
            onDoubleClick={() => open({ type: "image", src: heroImg, alt: km.title })}
            loading="lazy"
          />
          <div className={styles.heroGradient} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.container}>
            <span className={styles.heroBadge}>{km.badge}</span>
            <h1 className={styles.heroTitle}>{km.title}</h1>
            <p className={styles.heroSub}>
              {km.subtitle.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
            <div className={styles.heroMeta}>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>{km.meta.roleLabel}</span>
                <span className={styles.heroMetaValue}>{km.meta.role}</span>
              </div>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>{km.meta.durationLabel}</span>
                <span className={styles.heroMetaValue}>{km.meta.duration}</span>
              </div>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>{km.meta.orgLabel}</span>
                <span className={styles.heroMetaValue}>{km.meta.org}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.container}>

        {/* ─── Overview ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.overview.label}</p>
          <h2 className={styles.sectionTitle}>{km.overview.title}</h2>
          <p className={styles.overviewText}>{km.overview.text}</p>
          <div
            className={`${styles.overviewScreenshot} ${styles.zoomable}`}
            onDoubleClick={() => open({ type: "image", src: pageMain, alt: km.overview.title })}
          >
            <img src={pageMain} alt={km.overview.title} className={styles.overviewImg} loading="lazy" />
          </div>
        </section>

        {/* ─── Problem & Solution ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.ps.label}</p>
          <h2 className={styles.sectionTitle}>{km.ps.title}</h2>
          <div className={styles.psGrid}>
            <div className={styles.psCard}>
              <div className={styles.psCardHeader}>
                <span className={styles.psIconProblem}>✕</span>
                <h3 className={styles.psCardTitle}>{km.ps.problemsTitle}</h3>
              </div>
              <ul className={styles.psList}>
                {km.ps.problems.map((p, i) => (
                  <li key={i} className={styles.psItem}>
                    <span className={styles.psBullet} aria-hidden="true">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.psCard} ${styles.psCardSolution}`}>
              <div className={styles.psCardHeader}>
                <span className={styles.psIconSolution}>✓</span>
                <h3 className={styles.psCardTitle}>{km.ps.solutionsTitle}</h3>
              </div>
              <ul className={styles.psList}>
                {km.ps.solutions.map((s, i) => (
                  <li key={i} className={`${styles.psItem} ${styles.psItemSolution}`}>
                    <span className={styles.psBulletSolution} aria-hidden="true">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Key Features ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.features.label}</p>
          <h2 className={styles.sectionTitle}>{km.features.title}</h2>
          <div className={styles.featGrid}>
            {km.features.items.map((f, i) => (
              <div key={i} className={styles.featCard}>
                <span className={styles.featIcon}>
                  {/* eslint-disable-next-line react/no-unknown-property */}
                  <iconify-icon icon={f.icon} width="28" height="28" aria-hidden="true" />
                </span>
                <span className={styles.featLabel}>{f.title}</span>
                <p className={styles.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Video Showcase ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.showcase.label}</p>
          <h2 className={styles.sectionTitle}>{km.showcase.title}</h2>
          <div className={styles.videoGrid}>
            {km.videos.map((v, i) => (
              <div key={i} className={styles.videoCard}>
                <div
                  className={`${styles.videoWrap} ${styles.zoomable}`}
                  onDoubleClick={() => open({ type: "video", src: VIDEO_SRCS[i], caption: v.caption })}
                >
                  <video src={VIDEO_SRCS[i]} autoPlay loop muted playsInline className={styles.video} />
                  <div className={styles.videoOverlay}>
                    <span className={styles.videoLabel}>{v.label}</span>
                  </div>
                  <span className={styles.zoomHint}>⤢</span>
                </div>
                <p className={styles.videoCaption}>{v.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Special Room Screenshot ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.specialRoom.label}</p>
          <h2 className={styles.sectionTitle}>{km.specialRoom.title}</h2>
          <div
            className={`${styles.featureScreenshot} ${styles.zoomable}`}
            onDoubleClick={() => open({ type: "image", src: specialRoom, alt: km.specialRoom.title, caption: km.specialRoom.caption })}
          >
            <img src={specialRoom} alt={km.specialRoom.title} className={styles.featureScreenImg} loading="lazy" />
            <div className={styles.featureScreenCaption}>{km.specialRoom.caption}</div>
          </div>
        </section>

        {/* ─── Tech Stack ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.tech.label}</p>
          <h2 className={styles.sectionTitle}>{km.tech.title}</h2>
          <div className={styles.techGrid}>
            {km.tech.items.map((t, i) => (
              <div key={i} className={styles.techCard}>
                <span className={styles.techIcon}>{t.icon}</span>
                <div className={styles.techInfo}>
                  <span className={styles.techName}>{t.name}</span>
                  <span className={styles.techRole}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Design Highlights ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.highlights.label}</p>
          <h2 className={styles.sectionTitle}>{km.highlights.title}</h2>
          <div className={styles.highlightList}>
            {km.highlights.items.map((h, i) => (
              <div key={i} className={styles.highlightItem}>
                <span className={styles.highlightIcon}>
                  {/* eslint-disable-next-line react/no-unknown-property */}
                  <iconify-icon icon={h.icon} width="28" height="28" aria-hidden="true" />
                </span>
                <div className={styles.highlightBody}>
                  <h3 className={styles.highlightLabel}>{h.title}</h3>
                  <p className={styles.highlightDesc}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Results ─── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{km.results.label}</p>
          <h2 className={styles.sectionTitle}>{km.results.title}</h2>
          <div className={styles.statsRow}>
            {km.results.stats.map((s, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.outcomeList}>
            {km.results.outcomes.map((o, i) => (
              <div key={i} className={styles.outcomeItem}>{o}</div>
            ))}
          </div>
        </section>

      </div>

      <div className={styles.back}>
        <Link to="/portfolio" className={styles.backLink}>{km.back}</Link>
      </div>

    </main>
  );
}
