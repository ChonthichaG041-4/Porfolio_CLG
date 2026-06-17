import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * AboutHeroBackground
 *
 * Layers (back → front):
 *  1. Cosmic dust particles — soft animated purple specks
 *  2. Inner polygon dark fill
 *  3. Outermost + 2nd rhombus outlines (dim static)
 *  4. Middle two rhombuses — dim, proximity-lit by outer meteor via SVG mask
 *  5. Innermost rhombus — dim static + bright inner meteor trail
 *  6. G logo — glassmorphism panel + neon border + hover/scroll burst
 *  7. Outer meteor (8 s)  ← drives proximity glow on middle rects
 *  8. Inner meteor (5 s)  ← races the innermost rhombus
 */

// ── Constants ──────────────────────────────────────────────────
const LOGO =
  "M372.501 244.704C389.532 262.414 389.261 290.514 371.713 307.89L320.17 358.922L320.126 358.966L320.088 359.015C316.945 363.011 315.07 368.045 315.069 373.514V373.515C315.07 378.738 316.783 383.563 319.675 387.468L319.72 387.528L319.773 387.582L372.722 440.197C372.803 440.278 372.82 440.299 372.925 440.404L373.628 441.113L374.338 440.41L431.734 383.521L433.459 381.81H393.052L427.608 343.382H471.319C488.352 360.659 488.219 388.397 470.956 405.508L373.824 501.783L373.68 501.639L373.453 501.866L275.004 404.036C257.927 387.066 257.667 359.689 274.236 342.402L274.245 342.393C274.634 341.976 275.029 341.566 275.433 341.164L372.501 244.704Z";

const OUTER_D  = "M373.3,0.7 L745.9,373.3 L373.3,745.9 L0.7,373.3 Z";
const INNER_D  = "M373.6,79.1 L667.7,373.3 L373.6,667.4 L79.4,373.3 Z";
const OUTER_PTS = "373.3,0.7 745.9,373.3 373.3,745.9 0.7,373.3";
const INNER_PTS = "373.6,79.1 667.7,373.3 373.6,667.4 79.4,373.3";

// Polygon equivalents of the two middle rotated rects (computed from transforms)
const MID1_PTS = "31.06,373.29 374.0,30.35 715.95,372.29 373.01,715.23";
const MID2_PTS = "55.06,373.29 373.07,55.28 691.08,373.29 373.07,691.29";

// Cosmic dust — 42 particles [cx, cy, r, opacity, pulseDelaySecs, pulseDurSecs]
const PARTICLES = [
  [476.4, 37.5, 1.04, 0.23, 4.4, 5.0],
  [633.2, 80.9, 1.28, 0.13, 1.3, 4.4],
  [96.5, 159.2, 1.64, 0.39, 1.3, 4.7],
  [581.8, 24.5, 1.89, 0.47, 2.0, 3.3],
  [673.5, 255.6, 0.75, 0.17, 5.1, 4.7],
  [580.4, 530.8, 1.46, 0.61, 2.3, 4.6],
  [594.2, 453.0, 1.98, 0.41, 4.2, 2.9],
  [221.3, 222.6, 0.73, 0.24, 0.6, 3.7],
  [474.1, 275.4, 1.19, 0.22, 1.6, 5.8],
  [481.8, 446.4, 0.87, 0.48, 1.0, 4.0],
  [693.5, 468.0, 1.49, 0.46, 5.1, 5.3],
  [222.0, 42.5, 1.10, 0.25, 1.3, 5.8],
  [623.3, 240.3, 1.65, 0.32, 5.5, 4.3],
  [244.2, 192.6, 1.50, 0.25, 3.5, 5.7],
  [327.6, 173.5, 2.20, 0.37, 0.5, 3.0],
  [148.0, 459.2, 1.87, 0.33, 0.4, 4.0],
  [697.6, 390.4, 2.15, 0.55, 0.1, 5.1],
  [502.7, 395.9, 1.03, 0.44, 0.7, 4.2],
  [361.3, 687.7, 2.00, 0.25, 3.0, 3.4],
  [645.8, 629.4, 1.08, 0.44, 3.7, 3.3],
  [552.8, 397.6, 1.85, 0.39, 0.0, 3.8],
  [92.1,  670.4, 2.01, 0.54, 1.8, 3.0],
  [624.4, 682.9, 0.74, 0.36, 0.4, 5.2],
  [554.8, 109.9, 1.36, 0.39, 1.6, 5.6],
  [342.3, 168.3, 1.46, 0.48, 1.2, 3.8],
  [697.0, 474.9, 1.30, 0.38, 0.7, 3.5],
  [289.6, 431.8, 0.97, 0.23, 0.4, 4.8],
  [221.9, 653.8, 1.98, 0.16, 1.4, 4.9],
  [212.8, 112.6, 2.10, 0.41, 2.8, 5.3],
  [580.6, 153.3, 0.76, 0.34, 2.5, 4.3],
  [532.0, 491.4, 2.17, 0.17, 2.4, 3.9],
  [614.2, 194.1, 0.90, 0.34, 2.5, 3.7],
  [234.9, 666.3, 1.31, 0.55, 3.3, 3.0],
  [699.6, 605.2, 2.15, 0.58, 5.1, 3.3],
  [381.1, 169.6, 1.24, 0.15, 2.3, 6.0],
  [244.4, 568.8, 1.33, 0.33, 5.7, 6.0],
  [424.6, 522.9, 0.85, 0.27, 5.8, 4.7],
  [416.2, 543.6, 0.69, 0.41, 3.0, 5.5],
  [177.6, 692.5, 0.73, 0.21, 3.6, 5.0],
  [225.8, 103.9, 2.02, 0.24, 3.6, 4.8],
  [339.9, 428.6, 1.44, 0.59, 1.2, 5.1],
  [228.0, 297.1, 1.67, 0.27, 1.9, 5.2],
];

// ── Meteor component ───────────────────────────────────────────
function Meteor({
  pathHref, gradId, dur,
  tailLen = 68, r = 4.5,
  tipColor = "#f5d0fe", haloColor = "#7c3aed",
}) {
  return (
    <motion.g
      animate={{ opacity: [0.82, 1, 0.82] }}
      transition={{ duration: parseFloat(dur) * 0.28, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ambient halo */}
      <circle cx="0" cy="0" r={r * 2.8} fill={haloColor} fillOpacity={0.22} filter="url(#abg_halo)">
        <animateMotion dur={dur} repeatCount="indefinite">
          <mpath href={pathHref} />
        </animateMotion>
      </circle>
      {/* Tail + tip */}
      <g>
        <rect x={-tailLen} y={-(r*0.4)} width={tailLen} height={r*0.8} rx={r*0.4}
          fill={`url(#${gradId})`} />
        <ellipse cx={-(r*1.6)} cy={0} rx={r*2} ry={r*0.9}
          fill={tipColor} fillOpacity={0.35} filter="url(#abg_neon)" />
        <circle cx={0} cy={0} r={r}        fill={tipColor} filter="url(#abg_neon)" />
        <circle cx={0} cy={0} r={r * 0.45} fill="#ffffff"  fillOpacity={0.9} />
        <animateMotion dur={dur} repeatCount="indefinite" rotate="auto">
          <mpath href={pathHref} />
        </animateMotion>
      </g>
    </motion.g>
  );
}

// ── Main component ─────────────────────────────────────────────
export function AboutHeroBackground({ className, style }) {
  const [logoBurst, setLogoBurst] = useState(false);

  useEffect(() => {
    let timer = null;
    const onScroll = () => {
      setLogoBurst(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setLogoBurst(false), 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (timer) clearTimeout(timer); };
  }, []);

  return (
    <svg
      className={className}
      style={{ ...style, pointerEvents: "auto" }}
      viewBox="0 0 747 747"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Motion path targets */}
        <path id="abg_outer_path" d={OUTER_D} />
        <path id="abg_inner_path" d={INNER_D} />

        {/* ── Proximity mask ─────────────────────────────────────
            Circle tracks outer meteor (8 s).  Reveals middle-rhombus
            strokes at full brightness in a 140 px radius; elsewhere
            the rects stay at their dim base (8 % white = 8 % visible). */}
        <mask id="abg_prox_mask">
          <rect width="747" height="747" fill="white" fillOpacity="0" />
          <circle cx="0" cy="0" r="150" fill="white" fillOpacity="0.5">
            <animateMotion dur="8s" repeatCount="indefinite">
              <mpath href="#abg_outer_path" />
            </animateMotion>
          </circle>
        </mask>

        {/* ── Middle-rhombus per-segment gradients ───────────────
            Each edge: transparent at both corners → bright at midpoint.
            gradientUnits="userSpaceOnUse" so coordinates match the SVG canvas. */}
        {/* MID1 (outer middle ring) */}
        <linearGradient id="m1_AB">
  <stop offset="0%" stopColor="#b06dff" stopOpacity="0"/>
  <stop offset="25%" stopColor="#b06dff" stopOpacity="0.2"/>
  <stop offset="50%" stopColor="#b06dff" stopOpacity="1"/>
  <stop offset="75%" stopColor="#b06dff" stopOpacity="0.2"/>
  <stop offset="100%" stopColor="#b06dff" stopOpacity="0"/>
</linearGradient>
        <linearGradient id="abg_m1_BC" x1="374.0" y1="30.35" x2="715.95" y2="372.29" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#b06dff" stopOpacity="0" />
          <stop offset="20%"  stopColor="#b06dff" stopOpacity="1" />
          <stop offset="100%" stopColor="#b06dff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="abg_m1_CD" x1="715.95" y1="372.29" x2="373.01" y2="715.23" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#b06dff" stopOpacity="0" />
          <stop offset="20%"  stopColor="#b06dff" stopOpacity="1" />
          <stop offset="100%" stopColor="#b06dff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="abg_m1_DA" x1="373.01" y1="715.23" x2="31.06" y2="373.29" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#b06dff" stopOpacity="0" />
          <stop offset="20%"  stopColor="#b06dff" stopOpacity="1" />
          <stop offset="100%" stopColor="#b06dff" stopOpacity="0" />
        </linearGradient>
        {/* MID2 (inner middle ring) */}
        <linearGradient id="abg_m2_AB" x1="55.06" y1="373.29" x2="373.07" y2="55.28" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#9d4edd" stopOpacity="0" />
          <stop offset="20%"  stopColor="#9d4edd" stopOpacity="1" />
          <stop offset="100%" stopColor="#9d4edd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="abg_m2_BC" x1="373.07" y1="55.28" x2="691.08" y2="373.29" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#9d4edd" stopOpacity="0" />
          <stop offset="20%"  stopColor="#9d4edd" stopOpacity="1" />
          <stop offset="100%" stopColor="#9d4edd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="abg_m2_CD" x1="691.08" y1="373.29" x2="373.07" y2="691.29" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#9d4edd" stopOpacity="0" />
          <stop offset="20%"  stopColor="#9d4edd" stopOpacity="1" />
          <stop offset="100%" stopColor="#9d4edd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="abg_m2_DA" x1="373.07" y1="691.29" x2="55.06" y2="373.29" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#9d4edd" stopOpacity="0" />
          <stop offset="20%"  stopColor="#9d4edd" stopOpacity="1" />
          <stop offset="100%" stopColor="#9d4edd" stopOpacity="0" />
        </linearGradient>

        {/* Logo clip-path (diamond shape around the G glyph area) */}
        <clipPath id="abg_logo_clip">
          <polygon points="373,218 470,315 373,512 276,315" />
        </clipPath>

        {/* Filters */}
        <filter id="abg_neon" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"  result="b0" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="7"  result="b1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b2" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="36" result="b3" />
          <feMerge>
            <feMergeNode in="b3"/><feMergeNode in="b2"/>
            <feMergeNode in="b1"/><feMergeNode in="b0"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="abg_halo" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="26" />
        </filter>
        <filter id="abg_mid_glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Frosted glass look for logo panel */}
        <filter id="abg_glass" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
          <feColorMatrix in="blur" type="saturate" values="1.6" result="sat" />
          <feMerge><feMergeNode in="sat"/></feMerge>
        </filter>
        {/* Logo base glow */}
        <filter id="abg_logo_fx" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Logo burst */}
        <filter id="abg_logo_burst" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8"  result="b1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="b2" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="44" result="b3" />
          <feMerge>
            <feMergeNode in="b3"/><feMergeNode in="b2"/>
            <feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        {/* Particle soft glow */}
        <filter id="abg_particle_glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
        </filter>

        {/* Gradients */}
        <linearGradient id="abg_tail_outer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4c1cad" stopOpacity="0"   />
          <stop offset="45%"  stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="80%"  stopColor="#c084fc" stopOpacity="0.65"/>
          <stop offset="100%" stopColor="#f5d0fe" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="abg_tail_inner" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#3b0764" stopOpacity="0"   />
          <stop offset="45%"  stopColor="#6d28d9" stopOpacity="0.3" />
          <stop offset="80%"  stopColor="#a78bfa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="abg_logo_grad" x1="373" y1="243.285" x2="373" y2="503.285"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#A259FF" />
          <stop offset="1" stopColor="#613599" />
        </linearGradient>
        <linearGradient id="abg_logo_grad_burst" x1="373" y1="243.285" x2="373" y2="503.285"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#e9d5ff" />
          <stop offset="0.5" stopColor="#c084fc" />
          <stop offset="1"   stopColor="#a855f7" />
        </linearGradient>
        {/* Glassmorphism panel gradient */}
        <linearGradient id="abg_glass_grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6d28d9" stopOpacity="0.18" />
          <stop offset="50%"  stopColor="#3b0764" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#1a0d35" stopOpacity="0.22" />
        </linearGradient>
        <radialGradient id="abg_inner_fill" cx="373.5" cy="373.3" r="294"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#3A2950" stopOpacity="0.18" />
          <stop offset="60%"  stopColor="#1a0d35" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000"  stopOpacity="0.55" />
        </radialGradient>
        {/* Particle color */}
        <radialGradient id="abg_particle_grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#e9d5ff" stopOpacity="1" />
          <stop offset="70%" stopColor="#a855f7" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* ══ 1. COSMIC DUST PARTICLES ═══════════════════════════ */}
      <g>
        {PARTICLES.map(([cx, cy, r, op, delay, dur], i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="url(#abg_particle_grad)"
            opacity={op}
            filter="url(#abg_particle_glow)"
          >
            <animate attributeName="opacity"
              values={`${op};${Math.min(op*1.9, 0.82)};${op}`}
              dur={`${dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* ══ 2. INNER POLYGON FILL ══════════════════════════════ */}
      <polygon points={INNER_PTS} fill="url(#abg_inner_fill)" />

      {/* ══ 3. OUTERMOST + 2nd RHOMBUS (dim static lines) ══════ */}
      <rect x="0.707107" y="373.285" width="526.905" height="526.905"
        transform="rotate(-45 0.707107 373.285)"
        stroke="#A259FF" strokeOpacity="0.50" strokeWidth="1" />
      <rect x="31.0607" y="373.285" width="484.989" height="483.585"
        transform="rotate(-45 31.0607 373.285)"
        stroke="#A259FF" strokeOpacity="0.20" strokeWidth="1" />

      {/* ══ 4. MIDDLE TWO RHOMBUSES — proximity-lit ════════════
          Extremely dim by default; the abg_prox_mask circle (following
          the 8 s outer meteor) reveals full brightness as it sweeps by. */}
      {/* Middle two rhombuses — gradient lines (bright centre → transparent at corners)
          Masked so they only glow where the outer meteor sweeps nearby. */}
      <g mask="url(#abg_prox_mask)" filter="url(#abg_mid_glow)">
        {/* MID1 — outer middle ring */}
        <line x1="31.06"  y1="373.29" x2="374.0"  y2="30.35"  stroke="url(#abg_m1_AB)" strokeWidth="1.5" />
        <line x1="374.0"  y1="30.35"  x2="715.95" y2="372.29" stroke="url(#abg_m1_BC)" strokeWidth="1.5" />
        <line x1="715.95" y1="372.29" x2="373.01" y2="715.23" stroke="url(#abg_m1_CD)" strokeWidth="1.5" />
        <line x1="373.01" y1="715.23" x2="31.06"  y2="373.29" stroke="url(#abg_m1_DA)" strokeWidth="1.5" />
        
        {/* MID2 — inner middle ring */}
        <line x1="55.06"  y1="373.29" x2="373.07" y2="55.28"  stroke="url(#abg_m2_AB)" strokeWidth="1.5" />
        <line x1="373.07" y1="55.28"  x2="691.08" y2="373.29" stroke="url(#abg_m2_BC)" strokeWidth="1.5" />
        <line x1="691.08" y1="373.29" x2="373.07" y2="691.29" stroke="url(#abg_m2_CD)" strokeWidth="1.5" />
        <line x1="373.07" y1="691.29" x2="55.06"  y2="373.29" stroke="url(#abg_m2_DA)" strokeWidth="1.5" />
      </g>

      {/* ══ 5. INNERMOST RHOMBUS (dim base + inner meteor) ═════ */}
      <rect x="79.4142" y="373.285" width="416" height="416"
        transform="rotate(-45 79.4142 373.285)"
        stroke="#A259FF" strokeOpacity="1.10" strokeWidth="2" />
      {/* Faint outer path dim guide */}
      <polygon points={OUTER_PTS} stroke="#7c3aed" strokeOpacity="0.10" strokeWidth="1.5" fill="none" />

      {/* ══ 6. G LOGO — glassmorphism panel + neon border ══════ */}
      <g
        style={{ pointerEvents: "auto", cursor: "pointer" }}
        onMouseEnter={() => setLogoBurst(true)}
        onMouseLeave={() => setLogoBurst(false)}
      >

        {/* Hit area */}
        <path d={LOGO} fill="transparent" stroke="transparent" strokeWidth="22" />

        {/* Base logo */}
        <path d={LOGO} stroke="url(#abg_logo_grad)" strokeWidth="2" filter="url(#abg_logo_fx)" />

        {/* Burst overlay (hover / scroll) */}
        <motion.path
          d={LOGO}
          stroke="url(#abg_logo_grad_burst)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#abg_logo_burst)"
          initial={{ opacity: 0 }}
          animate={{ opacity: logoBurst ? 1 : 0 }}
          transition={{ duration: logoBurst ? 0.12 : 0.75, ease: "easeOut" }}
        />
      </g>

      {/* ══ 7. OUTER METEOR — 8 s, outermost rhombus ══════════ */}
      <Meteor
        pathHref="#abg_outer_path" gradId="abg_tail_outer"
        dur="8s" tailLen={160} r={4.5}
        tipColor="#f5d0fe" haloColor="#7c3aed"
      />

      {/* ══ 8. INNER METEOR — 5 s, innermost rhombus ══════════ */}
      <Meteor
        pathHref="#abg_inner_path" gradId="abg_tail_inner"
        dur="5s" tailLen={110} r={3.5}
        tipColor="#ede9fe" haloColor="#6d28d9"
      />
    </svg>
  );
}
