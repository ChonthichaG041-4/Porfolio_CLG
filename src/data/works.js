// ============================================================
//  WORKS DATA
//  Images use picsum.photos for placeholder previews.
//  Replace URLs with your real artwork when ready.
//  Format: https://picsum.photos/seed/[seed]/[width]/[height]
// ============================================================

export const CATEGORIES = [
  { id: 'all',          label: 'All' },
  { id: 'character',    label: 'Character' },
  { id: 'concept-art',  label: 'Concept Art' },
  { id: 'illustration', label: 'Illustration' },
  { id: 'webtoon',      label: 'Webtoon' },
  { id: 'environment',  label: 'Environment' },
  { id: 'prop-design',  label: 'Prop Design' },
  { id: 'editorial',    label: 'Editorial' },
]

export const TIERS = {
  PROFESSIONAL: 'professional',
  PERSONAL:     'personal',
  FANART:       'fanart',
  PRACTICE:     'practice',
}

// ─── Image helper ───────────────────────────────────────────
const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const works = [
  // ────────────────────────────────────────────────────────
  {
    id: '001',
    slug: 'solaris-commander',
    title: 'Solaris Commander',
    category: 'character',
    tier: TIERS.PROFESSIONAL,
    role: 'Character Concept Artist',
    client: 'Indie Game Studio (NDA)',
    year: 2024,
    featured: true,
    thumbnail: img('solaris-thumb',  800, 600),
    banner:    img('solaris-banner', 1600, 900),
    description: 'A military commander from a sun-powered empire. Designed for a strategy RPG with solar-punk themes.',
    mood: 'Epic, Regal, Warm',
    software: ['Photoshop', 'PureRef'],
    tags: ['fantasy', 'character', 'armor', 'rpg', 'solar-punk'],

    overview: `The brief called for a military leader who embodies the empire's solar-worship religion —
power, warmth, and authority fused into a single silhouette. Every design element from the
crown-like helmet to the layered pauldrons references the sun.`,

    worldbuilding: `The Solaris Empire draws power from crystallised sunlight stored in
amber-coloured conduits woven into their armour. Commanders are chosen via
trials at high noon — only those who can "hold the light" ascend.`,

    sections: [
      {
        type: 'process',
        title: 'Silhouette Exploration',
        description: 'Started with 12 silhouette variants to nail the read from a distance.',
        images: [
          img('solaris-sil-1', 1200, 800),
          img('solaris-sil-2', 1200, 800),
        ],
        notes: 'Pushed the helmet to be more crown-like in iteration 8 — made the power status clearer.',
      },
      {
        type: 'process',
        title: 'Colour Exploration',
        description: 'Tested warm golds vs cooler bronzes. Gold won — reads as "sun" immediately.',
        images: [
          img('solaris-col-1', 1200, 800),
          img('solaris-col-2', 1200, 800),
        ],
        notes: 'Added deep amber shadow tones to avoid the character reading as a trophy rather than a person.',
      },
      {
        type: 'breakdown',
        title: 'Design Breakdown',
        points: [
          { label: 'Character Personality', text: 'Strict but honourable. Never retreats.' },
          { label: 'Colour Theory',         text: 'Golden hour palette — warmth of command, not decoration.' },
          { label: 'Costume Logic',         text: 'Solar conduits visible at shoulder joints for lore-accurate power routing.' },
          { label: 'Cultural References',   text: 'Byzantine military dress, Aztec solar iconography, Japanese Mon crests.' },
          { label: 'Shape Language',        text: 'Triangular silhouette — upward energy, strength, hierarchy.' },
        ],
      },
      {
        type: 'final',
        title: 'Final Artwork',
        images: [
          img('solaris-final-1', 1600, 900),
          img('solaris-final-2', 800, 1000),
          img('solaris-final-3', 800, 1000),
        ],
      },
      {
        type: 'gallery',
        title: 'Deliverables',
        images: [
          img('solaris-sheet-1', 1200, 800),
          img('solaris-sheet-2', 1200, 800),
          img('solaris-sheet-3', 1200, 800),
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  {
    id: '002',
    slug: 'void-garden',
    title: 'Void Garden',
    category: 'environment',
    tier: TIERS.PERSONAL,
    role: 'Environment Concept Artist',
    client: 'Personal Project',
    year: 2024,
    featured: true,
    thumbnail: img('voidgarden-thumb',  800, 600),
    banner:    img('voidgarden-banner', 1600, 900),
    description: 'An abandoned temple garden where reality has started dissolving — bioluminescent flora grows through cracked stone.',
    mood: 'Eerie, Serene, Mysterious',
    software: ['Photoshop', 'Blender', 'PureRef'],
    tags: ['environment', 'fantasy', 'bioluminescent', 'ruins'],

    overview: `A personal project exploring the intersection of decay and growth —
what happens when a sacred space is reclaimed not by nature, but by something
that exists between dimensions?`,

    sections: [
      {
        type: 'process',
        title: 'Composition Studies',
        description: '3-point perspective thumbnails to find the right camera angle.',
        images: [
          img('voidgarden-comp-1', 1200, 800),
          img('voidgarden-comp-2', 1200, 800),
        ],
        notes: 'Low angle with foreground flora creates depth and makes the void portal feel imposing.',
      },
      {
        type: 'process',
        title: 'Lighting Pass',
        description: 'Tested cool moonlight vs warm bioluminescent glow as the primary light source.',
        images: [
          img('voidgarden-light-1', 1200, 800),
          img('voidgarden-light-2', 1200, 800),
        ],
        notes: 'Layering both sources — cold rim from above, warm fill from the ground — gave the best depth.',
      },
      {
        type: 'final',
        title: 'Final Artwork',
        images: [
          img('voidgarden-final', 1600, 900),
        ],
      },
      {
        type: 'gallery',
        title: 'Environment Variants',
        images: [
          img('voidgarden-var-day',   1200, 800),
          img('voidgarden-var-night', 1200, 800),
          img('voidgarden-var-rain',  1200, 800),
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  {
    id: '003',
    slug: 'ironveil-rogue',
    title: 'Ironveil Rogue',
    category: 'character',
    tier: TIERS.PERSONAL,
    role: 'Character Design',
    client: 'Personal Project',
    year: 2023,
    featured: true,
    thumbnail: img('ironveil-thumb',  800, 600),
    banner:    img('ironveil-banner', 1600, 900),
    description: 'A steampunk thief specialising in information brokerage. Designed for a personal game pitch.',
    mood: 'Sharp, Cunning, Urban',
    software: ['Clip Studio', 'Photoshop'],
    tags: ['character', 'steampunk', 'rogue', 'game-pitch'],

    overview: `A steampunk thief who trades in secrets. The design needed to balance practical
thief gear with readable steampunk flair — without tipping into costume.`,

    sections: [
      {
        type: 'process',
        title: 'Sketch Exploration',
        description: 'Over 20 loose sketches to nail the asymmetric design language.',
        images: [
          img('ironveil-sk-1', 1200, 800),
          img('ironveil-sk-2', 1200, 800),
          img('ironveil-sk-3', 1200, 800),
        ],
        notes: 'Went through 20+ sketches — the key was finding the right balance between practical thief gear and readable steampunk flair.',
      },
      {
        type: 'breakdown',
        title: 'Design Breakdown',
        points: [
          { label: 'Personality',    text: 'Charismatic liar. Collects secrets, not gold.' },
          { label: 'Shape Language', text: 'Asymmetric — one armoured arm vs one bare arm. Contradiction is the point.' },
          { label: 'Colour',         text: 'Desaturated slate + warm copper accent. Competent, not flashy.' },
          { label: 'Props',          text: 'Brass ear-horn amplifier doubles as a lock-pick. Every tool has two uses.' },
        ],
      },
      {
        type: 'final',
        title: 'Final Artwork',
        images: [
          img('ironveil-final-1', 1000, 1400),
          img('ironveil-final-2', 1000, 1400),
        ],
      },
      {
        type: 'gallery',
        title: 'Character Sheets',
        images: [
          img('ironveil-sheet-turn', 1400, 900),
          img('ironveil-sheet-expr', 1400, 900),
          img('ironveil-sheet-prop', 1400, 900),
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  {
    id: '004',
    slug: 'lantern-festival',
    title: 'Lantern Festival',
    category: 'illustration',
    tier: TIERS.PERSONAL,
    role: 'Illustrator',
    client: 'Personal',
    year: 2023,
    featured: false,
    thumbnail: img('lantern-thumb',  800, 600),
    banner:    img('lantern-banner', 1600, 900),
    description: 'Atmospheric editorial illustration of a fantasy lantern festival at dusk.',
    mood: 'Warm, Celebratory, Nostalgic',
    software: ['Photoshop'],
    tags: ['illustration', 'editorial', 'fantasy', 'atmosphere'],
    sections: [
      {
        type: 'process',
        title: 'Value Study',
        description: 'Greyscale value pass before committing to colour.',
        images: [
          img('lantern-value-1', 1200, 800),
          img('lantern-value-2', 1200, 800),
        ],
        notes: 'Kept the sky at mid-value to let the glowing lanterns read clearly as the lightest element.',
      },
      {
        type: 'final',
        title: 'Final Artwork',
        images: [
          img('lantern-final', 1600, 1000),
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  {
    id: '005',
    slug: 'ember-knight',
    title: 'Ember Knight',
    category: 'concept-art',
    tier: TIERS.PROFESSIONAL,
    role: 'Concept Artist',
    client: 'Game Studio (NDA)',
    year: 2024,
    featured: false,
    thumbnail: img('ember-thumb',  800, 600),
    banner:    img('ember-banner', 1600, 900),
    description: 'Paladin character designed around fire-and-ash aesthetics for a dark fantasy RPG.',
    mood: 'Intense, Tragic, Heroic',
    software: ['Photoshop', 'PureRef'],
    tags: ['character', 'paladin', 'dark-fantasy', 'fire'],
    sections: [
      {
        type: 'process',
        title: 'Concept Sketches',
        description: 'Early exploration of the ash-and-ember visual language.',
        images: [
          img('ember-sk-1', 1200, 800),
          img('ember-sk-2', 1200, 800),
        ],
        notes: 'The cracked armour with embers visible underneath was chosen in round 2 — it tells the story of a falling hero.',
      },
      {
        type: 'breakdown',
        title: 'Design Breakdown',
        points: [
          { label: 'Personality',   text: 'A hero who lost their faith but kept fighting anyway.' },
          { label: 'Colour',        text: 'Charcoal base with deep orange cracks — controlled burn.' },
          { label: 'Silhouette',    text: 'Heavy, grounded — shoulders forward, weight-bearing stance.' },
          { label: 'Story Detail',  text: 'The censer on the belt is shattered — faith broken but carried still.' },
        ],
      },
      {
        type: 'final',
        title: 'Final Artwork',
        images: [
          img('ember-final-1', 1000, 1400),
          img('ember-final-2', 1000, 1400),
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  {
    id: '006',
    slug: 'thornwood-witch',
    title: 'Thornwood Witch',
    category: 'character',
    tier: TIERS.PERSONAL,
    role: 'Character Design',
    client: 'Personal Project',
    year: 2023,
    featured: false,
    thumbnail: img('witch-thumb',  800, 600),
    banner:    img('witch-banner', 1600, 900),
    description: 'A forest witch whose magic grows from pain — thorns bloom from her wounds.',
    mood: 'Dark, Melancholic, Wild',
    software: ['Clip Studio', 'Photoshop'],
    tags: ['character', 'witch', 'dark-fantasy', 'nature'],
    sections: [
      {
        type: 'process',
        title: 'Shape Exploration',
        description: 'Silhouette pass focusing on integrating organic thorn shapes into clothing.',
        images: [
          img('witch-shape-1', 1200, 800),
          img('witch-shape-2', 1200, 800),
        ],
        notes: 'The hair becoming branches was the breakthrough moment — it unified the character with her environment.',
      },
      {
        type: 'final',
        title: 'Final Artwork',
        images: [
          img('witch-final', 1000, 1400),
        ],
      },
    ],
  },
]

// ─── Helpers ────────────────────────────────────────────────
export const getFeaturedWorks   = ()      => works.filter(w => w.featured)
export const getWorkBySlug      = (slug)  => works.find(w => w.slug === slug)
export const getWorksByCategory = (categoryId, showAll = false) => {
  const base = showAll
    ? works
    : works.filter(w => w.tier !== TIERS.FANART && w.tier !== TIERS.PRACTICE)
  if (categoryId === 'all') return base
  return base.filter(w => w.category === categoryId)
}
