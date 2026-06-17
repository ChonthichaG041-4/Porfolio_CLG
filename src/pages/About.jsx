import { useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/context";
import { ResumeDownloadModal } from "@/components/UI/ResumeDownloadModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cx } from "@/utils/helpers";
import { AboutHeroBackground } from "@/components/AboutHeroBackground";
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

export default function About() {
  const { t } = useI18n();
  const ta = t.aboutPage;
  const [dlOpen, setDlOpen] = useState(false);

  return (
    <main className={styles.page}>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <header className={styles.header}>
        {/* Rhombus background — right side */}
        <div className={styles.rhombusWrap} aria-hidden="true">
          <AboutHeroBackground className={styles.rhombusSvg} />
        </div>

        {/* Hero text — aligned with .container */}
        <div className={cx("container", styles.heroOuter)}>
          <div className={styles.heroContent}>
            <p className={cx("section-label", styles.headerLabel)}>{ta.label}</p>

            <h1 className={styles.heroName}>
              <span className={styles.nameFirst}>Chonthicha</span>
              <span className={styles.nameLast}>Leepreecha</span>
            </h1>

            <div className={styles.heroDivider} aria-hidden="true" />

            <p className={styles.subtitle}>{ta.subtitle}</p>
            <p className={styles.also}>{ta.also}</p>

            <p className={styles.chipsLabel}>{ta.skillsLabel ?? 'SKILLS'}</p>
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
          <Reveal delay={120} className={styles.mobileCtas}>
            <Link to="/portfolio" className={styles.mobileCtaBtn}>
              <i className="ti ti-briefcase" aria-hidden="true" />
              {ta.viewPortfolio ?? 'View Portfolio'}
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
            <Link to="/contact" className={styles.mobileCtaBtnGhost}>
              <i className="ti ti-mail" aria-hidden="true" />
              {ta.contactMe ?? 'Contact Me'}
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
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
            <button
              type="button"
              className={styles.resumeCtaBtn}
              onClick={() => setDlOpen(true)}
            >
              {ta.downloadResume}
            </button>
          </section>
        </Reveal>

      </div>

      <ResumeDownloadModal open={dlOpen} onClose={() => setDlOpen(false)} />
    </main>
  );
}