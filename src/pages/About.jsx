import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/context";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cx } from "@/utils/helpers";
import styles from "./About.module.css";

function Reveal({ children, delay = 0, className }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={cx(styles.reveal, isVisible && styles.revealed, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const LP_A =
  "M46.0879 75.0078C31.2787 91.8739 44.8988 98.2489 68.1591 121.105C88.9764 101.006 100.921 95.0982 86.4492 78.7441L108.287 81.0146C120.816 82.3175 126.256 97.5484 117.389 106.494L68.208 156.105L67.4472 155.345L67.3759 155.416L14.539 102.145C5.51705 93.0484 11.3145 77.5582 24.0918 76.6211L46.0879 75.0078Z";
const LP_B =
  "M75.115 32.8781C82.0173 21.9744 78.9114 7.75116 68.5874 0.00853412L11.6946 81.7931C7.57386 87.7169 8.25493 95.7352 13.3158 100.879L35.0883 123.009C20.0787 100.053 46.382 78.2683 75.115 32.8781Z";
const LP_C =
  "M57.8773 81.2485L81.6098 49.9416L115.362 79.0736C124.319 86.8043 124.643 100.578 116.06 108.722L102.588 121.505C114.439 104.803 85.2537 65.4859 57.8773 81.2485Z";

const STARS = [
  [48,35,.8],[298,22,.6],[712,50,.7],[935,18,.9],[1028,42,.6],[1388,14,.7],[1572,58,.8],
  [92,125,.6],[445,98,.7],[748,115,.6],[1068,88,.7],[1358,108,.9],[1528,78,.6],
  [28,225,.7],[188,245,.8],[515,218,.6],[1158,212,.7],[1450,232,.8],
  [62,345,.8],[275,365,.6],[618,348,.7],[1328,358,.6],[1555,378,.7],
  [108,485,.6],[372,505,.8],[715,478,.6],[1438,475,.8],
  [52,605,.7],[285,628,.9],[638,612,.6],[1358,618,.6],[1575,605,.8],
  [35,725,.8],[195,745,.6],[575,718,.7],[915,738,.8],[1258,725,.6],[1508,745,.7],
  [78,845,.6],[345,862,.8],[725,848,.6],[1428,845,.6],
  [818,68,.7],[1580,292,.8],[785,688,.7],[648,782,.6],[128,668,.6],
];

export default function About() {
  const { t } = useI18n();
  const ta = t.aboutPage;

  return (
    <main className={styles.page}>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <header className={styles.header}>
        {/* Architectural SVG background */}
        <svg
          className={styles.geoBg}
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="a_bg" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#04010B" />
              <stop offset="65%"  stopColor="#070215" />
              <stop offset="100%" stopColor="#0E0525" />
            </linearGradient>
            <radialGradient id="a_atm" cx="1300" cy="450" r="520" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#160B32" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#04010B"  stopOpacity="0" />
            </radialGradient>
            <radialGradient id="a_vig" cx="800" cy="450" r="900" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#04010B" stopOpacity="0" />
              <stop offset="100%" stopColor="#04010B" stopOpacity="0.70" />
            </radialGradient>
            <pattern id="a_dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="11" cy="11" r="0.65" fill="#6E4BFF" fillOpacity="0.20" />
            </pattern>
            <clipPath id="a_clip">
              <polygon points="1200,55 1598,450 1200,845 802,450" />
            </clipPath>
            <filter id="a_fe" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base layers */}
          <rect width="1600" height="900" fill="url(#a_bg)" />
          <rect width="1600" height="900" fill="url(#a_atm)" />
          <rect width="1600" height="900" fill="url(#a_vig)" />

          {/* Dot matrix clipped to outer rhombus */}
          <rect x="802" y="55" width="796" height="790" fill="url(#a_dots)" clipPath="url(#a_clip)" opacity="0.55" />

          {/* Starfield */}
          {STARS.map(([x, y, r], i) => (
            <circle
              key={`s${i}`}
              cx={x} cy={y} r={r}
              fill={i % 4 === 0 ? "#DCCBFF" : i % 4 === 1 ? "#9E7BFF" : "#ffffff"}
              fillOpacity={0.10 + (i % 5) * 0.04}
            />
          ))}

          {/* Diagonal light streaks */}
          <line x1="960"  y1="0"   x2="1598" y2="640" stroke="#9E7BFF" strokeOpacity="0.06" strokeWidth="0.5" />
          <line x1="1060" y1="0"   x2="1598" y2="538" stroke="#6E4BFF" strokeOpacity="0.04" strokeWidth="0.4" />
          <line x1="802"  y1="450" x2="1200" y2="55"  stroke="#9E7BFF" strokeOpacity="0.05" strokeWidth="0.5" />
          <line x1="802"  y1="450" x2="1200" y2="845" stroke="#6E4BFF" strokeOpacity="0.04" strokeWidth="0.4" />
          <line x1="1200" y1="55"  x2="1598" y2="450" stroke="#9E7BFF" strokeOpacity="0.05" strokeWidth="0.5" />
          <line x1="1200" y1="845" x2="1598" y2="450" stroke="#6E4BFF" strokeOpacity="0.04" strokeWidth="0.4" />
          <line x1="710"  y1="0"   x2="1600" y2="890" stroke="#6E4BFF" strokeOpacity="0.03" strokeWidth="0.4" />
          <line x1="1600" y1="0"   x2="710"  y2="900" stroke="#6E4BFF" strokeOpacity="0.03" strokeWidth="0.4" />

          {/* 4 nested rhombuses — thin architectural lines */}
          <polygon points="1200,55 1598,450 1200,845 802,450"   stroke="#6E4BFF" strokeOpacity="0.18" strokeWidth="0.6" />
          <polygon points="1200,148 1504,450 1200,752 896,450"  stroke="#9E7BFF" strokeOpacity="0.20" strokeWidth="0.7" filter="url(#a_fe)" />
          <polygon points="1200,248 1404,450 1200,652 996,450"  stroke="#9E7BFF" strokeOpacity="0.26" strokeWidth="0.9" filter="url(#a_fe)" />
          <polygon points="1200,348 1302,450 1200,552 1098,450" stroke="#DCCBFF" strokeOpacity="0.14" strokeWidth="0.6" />

          {/* Corner cross-tick markers */}
          <line x1="1200" y1="44"  x2="1200" y2="66"  stroke="#9E7BFF" strokeOpacity="0.50" strokeWidth="0.7" />
          <line x1="1191" y1="55"  x2="1209" y2="55"  stroke="#9E7BFF" strokeOpacity="0.30" strokeWidth="0.5" />
          <circle cx="1200" cy="55"  r="1.2" fill="#DCCBFF" fillOpacity="0.65" />

          <line x1="1587" y1="450" x2="1609" y2="450" stroke="#9E7BFF" strokeOpacity="0.50" strokeWidth="0.7" />
          <line x1="1598" y1="441" x2="1598" y2="459" stroke="#9E7BFF" strokeOpacity="0.30" strokeWidth="0.5" />
          <circle cx="1598" cy="450" r="1.2" fill="#DCCBFF" fillOpacity="0.65" />

          <line x1="1200" y1="834" x2="1200" y2="856" stroke="#9E7BFF" strokeOpacity="0.42" strokeWidth="0.7" />
          <line x1="1191" y1="845" x2="1209" y2="845" stroke="#9E7BFF" strokeOpacity="0.25" strokeWidth="0.5" />
          <circle cx="1200" cy="845" r="1.2" fill="#DCCBFF" fillOpacity="0.50" />

          <line x1="802"  y1="441" x2="802"  y2="459" stroke="#9E7BFF" strokeOpacity="0.42" strokeWidth="0.7" />
          <line x1="791"  y1="450" x2="813"  y2="450" stroke="#9E7BFF" strokeOpacity="0.25" strokeWidth="0.5" />
          <circle cx="802"  cy="450" r="1.2" fill="#DCCBFF" fillOpacity="0.50" />

          {/* Edge midpoint accents */}
          {[[1200,152],[1400,302],[1400,598],[1200,748],[1000,598],[1000,302]].map(([x,y],i) => (
            <circle key={`em${i}`} cx={x} cy={y} r="0.9" fill="#9E7BFF" fillOpacity="0.28" />
          ))}

          {/* G logo — watermark only */}
          <g transform="translate(1150,387) scale(0.88)" opacity="0.07">
            <path d={LP_A} fill="#DCCBFF" />
            <path d={LP_B} fill="#DCCBFF" />
            <path d={LP_C} fill="#DCCBFF" />
          </g>
        </svg>

        {/* Hero text */}
        <div className={styles.heroContent}>
          <p className={cx("section-label", styles.headerLabel)}>{ta.label}</p>

          <h1 className={styles.heroName}>
            <span className={styles.nameFirst}>Chonthicha</span>
            <span className={styles.nameLast}>Leepreecha</span>
          </h1>

          <div className={styles.heroDivider} aria-hidden="true" />

          <p className={styles.subtitle}>{ta.subtitle}</p>
          <p className={styles.also}>{ta.also}</p>

          <div className={styles.chips}>
            {ta.chips.map((c, i) => (
              <span
                key={c}
                className={styles.chip}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          BODY SECTIONS
      ══════════════════════════════════════════════════════ */}
      <div className="container">

        {/* WHO I AM */}
        <section className={styles.section}>
          <Reveal>
            <p className={styles.sLabel}>{ta.whoIAm.sectionLabel}</p>
            <h2 className={styles.sHeading}>
              {ta.whoIAm.heading}{" "}
              <em className={styles.italic}>{ta.whoIAm.headingItalic}</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className={styles.bodyText}>{ta.whoIAm.body}</p>
          </Reveal>
        </section>

        {/* WHAT INSPIRES ME */}
        <section className={styles.section}>
          <Reveal>
            <p className={styles.sLabel}>{ta.inspires.sectionLabel}</p>
            <h2 className={styles.sHeading}>
              {ta.inspires.heading}{" "}
              <em className={styles.italic}>{ta.inspires.headingItalic}</em>
            </h2>
          </Reveal>
          <div className={styles.cardGrid}>
            {ta.inspires.cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 70}>
                <div className={styles.card}>
                  <p className={styles.cardLabel}>{card.label}</p>
                  <p
                    className={styles.cardBody}
                    dangerouslySetInnerHTML={{ __html: card.body }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CREATIVE PHILOSOPHY */}
        <section className={styles.section}>
          <Reveal>
            <p className={styles.sLabel}>{ta.philosophy.sectionLabel}</p>
            <h2 className={styles.sHeading}>
              {ta.philosophy.heading}{" "}
              <em className={styles.italic}>{ta.philosophy.headingItalic}</em>
            </h2>
          </Reveal>
          <ol className={styles.philosophyList}>
            {ta.philosophy.items.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <li className={styles.philosophyItem}>
                  <span className={styles.romanNum} aria-hidden="true">
                    {["i", "ii", "iii", "iv", "v"][i]}.
                  </span>
                  <div>
                    <p className={styles.philosophyTitle}>{item.title}</p>
                    <p className={styles.philosophyBody}>{item.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* CAREER GOAL */}
        <section className={styles.section}>
          <Reveal>
            <p className={styles.sLabel}>{ta.career.sectionLabel}</p>
            <h2 className={styles.sHeading}>
              {ta.career.heading}{" "}
              <em className={styles.italic}>{ta.career.headingItalic}</em>
            </h2>
          </Reveal>
          <div className={styles.careerGrid}>
            <Reveal delay={0}>
              <div className={cx(styles.careerCard, styles.careerPrimary)}>
                <span className={styles.careerTag}>{ta.career.primary.tag}</span>
                <h3 className={styles.careerTitle}>{ta.career.primary.title}</h3>
                <p className={styles.careerBody}>{ta.career.primary.body}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.careerCard}>
                <span className={styles.careerTag}>{ta.career.secondary.tag}</span>
                <h3 className={styles.careerTitle}>{ta.career.secondary.title}</h3>
                <p className={styles.careerBody}>{ta.career.secondary.body}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WORKING PROCESS */}
        <section className={styles.section}>
          <Reveal>
            <p className={styles.sLabel}>{ta.process.sectionLabel}</p>
            <h2 className={styles.sHeading}>
              {ta.process.heading && <>{ta.process.heading} </>}
              <em className={styles.italic}>{ta.process.headingItalic}</em>
              {ta.process.headingEnd && <> {ta.process.headingEnd}</>}
            </h2>
          </Reveal>
          <ol className={styles.stepList}>
            {ta.process.steps.map((step, i) => (
              <Reveal key={i} delay={i * 55}>
                <li className={styles.stepItem}>
                  <div className={styles.stepNumWrap}>
                    <span className={styles.stepNum}>{i + 1}</span>
                    {i < ta.process.steps.length - 1 && (
                      <span className={styles.stepLine} aria-hidden="true" />
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <p className={styles.stepTitle}>{step.title}</p>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* RESUME CTA */}
        <Reveal>
          <section className={styles.resumeCta}>
            <p>{ta.resumeNote}</p>
            <a
              href={profile.resumeUrl}
              download
              className={styles.resumeCtaBtn}
            >
              {ta.downloadResume}
            </a>
          </section>
        </Reveal>

      </div>
    </main>
  );
}
