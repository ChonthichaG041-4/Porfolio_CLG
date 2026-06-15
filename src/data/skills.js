// ============================================================
//  SKILLS DATA
// ============================================================

// ── Legacy exports (used by About.jsx & Resume.jsx) ──────────
export const artisticSkills = [
  { name: 'Character Design',   level: 95 },
  { name: 'Concept Art',        level: 92 },
  { name: 'Environment Design', level: 80 },
  { name: 'Storyboarding',      level: 75 },
  { name: 'Color Theory',       level: 90 },
  { name: 'Typography Design',  level: 82 },
  { name: 'Expression Sheet',   level: 88 },
  { name: 'World Building',     level: 85 },
]

export const software = [
  { name: 'Procreate',       icon: 'pc',  proficiency: 'Expert',        years: 4 },
  { name: 'Clip Studio Paint',icon: 'csp', proficiency: 'Expert',       years: 4 },
  { name: 'Photoshop',       icon: 'ps',  proficiency: 'Expert',        years: 5 },
  { name: 'SketchUp',        icon: 'skp', proficiency: 'Daily use',     years: 4 },
  { name: 'Blender',         icon: 'blender', proficiency: 'Intermediate', years: 2 },
  { name: 'Figma',           icon: 'figma', proficiency: 'Intermediate', years: 2 },
]

export const technicalSkills = [
  'Vertical Scroll Format',
  'Panel Composition',
  'Visual Storytelling',
  'Style Guide Creation',
  'Production Pipeline',
  'Project Documentation',
]

export const softSkills = [
  'Story Development',
  'Character Writing',
  'Dialogue Writing',
  'Narrative Design',
  'Script Writing',
]

// ── New grouped export (used by SkillsSection on Home) ───────
export const skillGroups = [
  {
    key: 'software',
    items: [
      'Procreate',
      'Clip Studio Paint',
      'Photoshop',
      'SketchUp',
      'Blender',
      'Figma',
      'Claude AI',
    ],
  },
  {
    key: 'art',
    items: [
      'Character Design',
      'Concept Art',
      'Environment Design',
      'Storyboarding',
      'Color Theory',
      'Typography Design',
      'Expression Sheet',
      'World Building',
    ],
  },
  {
    key: 'writing',
    items: [
      'Story Development',
      'Plot Structuring',
      'Character Writing',
      'Dialogue Writing',
      'Narrative Design',
      'Worldbuilding',
      'Script Writing',
      'Story Planning',
    ],
  },
  {
    key: 'production',
    items: [
      'Vertical Scroll Format',
      'Panel Composition',
      'Visual Storytelling',
      'Style Guide Creation',
      'Production Pipeline',
      'Project Documentation',
    ],
  },
  {
    key: 'dev',
    items: [
      'Python',
      'JavaScript',
      'React',
      'Vite',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'Phaser 3',
      'DragonBones',
      'Git',
      'Docker',
    ],
  },
]
