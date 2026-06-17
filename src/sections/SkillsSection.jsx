import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/i18n/context";
import { cx } from "@/utils/helpers";
import styles from "./SkillsSection.module.css";

import iconCsp    from "@/assets/icons/csp_dack.svg";
import iconSkp    from "@/assets/icons/skp_dack.svg";
import iconPc     from "@/assets/icons/pc_dack.svg";
import iconFigma  from "@/assets/icons/figma_dack.svg";
import iconBlender from "@/assets/icons/blender-icon.svg";
import iconClaude from "@/assets/icons/claude-icon.svg";

/* ── Software data (icon cards) ──────────────────────────── */
const SOFTWARE_ITEMS = [
  { name: "Procreate",         icon: iconPc,        isImg: true,  role: "Thumbnail · Sketch · Illustration" },
  { name: "Clip Studio Paint", icon: iconCsp,       isImg: true,  role: "Line Art · Panel · Comic" },
  { name: "Photoshop",         icon: "PS",          isImg: false, role: "Painting · FX · Export" },
  { name: "SketchUp",          icon: iconSkp,       isImg: true,  role: "Reference Management" },
  { name: "Blender",           icon: iconBlender,   isImg: true,  role: "3D Reference · Scene Setup" },
  { name: "Figma",             icon: iconFigma,     isImg: true,  role: "Layout · Typography · UI" },
  { name: "Claude AI",         icon: iconClaude,    isImg: true,  role: "Writing · Planning · Research" },
];

/* ── Non-software skill columns ──────────────────────────── */
const SKILL_COLS = [
  {
    key: "art",
    titleKey: "artTitle",
    pillMod: "pillArt",
    items: [
      "Character Design",
      "Concept Art",
      "Environment Design",
      "Storyboarding",
      "Color Theory",
      "Typography Design",
      "Expression Sheet",
      "World Building",
    ],
  },
  {
    key: "writing",
    titleKey: "writingTitle",
    pillMod: "pillWriting",
    items: [
      "Story Development",
      "Plot Structuring",
      "Character Writing",
      "Dialogue Writing",
      "Narrative Design",
      "Worldbuilding",
      "Script Writing",
      "Story Planning",
    ],
  },
  {
    key: "production",
    titleKey: "productionTitle",
    pillMod: "pillProd",
    items: [
      "Vertical Scroll Format",
      "Panel Composition",
      "Visual Storytelling",
      "Style Guide Creation",
      "Production Pipeline",
      "Project Documentation",
    ],
  },
  {
    key: "dev",
    titleKey: "devTitle",
    pillMod: "pillDev",
    items: [
      "Python",
      "JavaScript",
      "React",
      "Vite",
      "HTML5",
      "CSS3",
      "Node.js",
      "Express.js",
      "Phaser 3",
      "DragonBones",
      "Git",
      "Docker",
    ],
  },
];

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useI18n();
  const ts = t.skills;

  return (
    <section
      ref={ref}
      className={cx("section", styles.section, isVisible && styles.visible)}
      aria-label="Skills"
    >
      <div className="container">
        <p className="section-label">{ts.label}</p>
        <h2 className="section-title">{ts.title}</h2>

        <div className={styles.skillsLayout}>
          {/* ── Column 1: Software icon cards ── */}
          <div className={styles.skillsCol}>
            <p className={styles.colTitle}>{ts.softwareTitle}</p>
            <div className={styles.softwareGrid}>
              {SOFTWARE_ITEMS.map((sw) => (
                <div key={sw.name} className={styles.softwareCard}>
                  {sw.isImg
                    ? <span className={styles.softwareIconBox}>
                        <img src={sw.icon} alt="" className={styles.softwareIconImg} aria-hidden="true" />
                      </span>
                    : <span className={styles.softwareIcon}>{sw.icon}</span>
                  }
                  <span className={styles.softwareName}>{sw.name}</span>
                  <span className={styles.softwareRole}>{sw.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Columns 2-5: Skill pill stacks ── */}
          {SKILL_COLS.map((col) => (
            <div key={col.key} className={styles.skillsCol}>
              <p className={styles.colTitle}>{ts[col.titleKey]}</p>
              <div className={styles.skillPills}>
                {col.items.map((item) => (
                  <span
                    key={item}
                    className={cx(styles.skillPill, styles[col.pillMod])}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
