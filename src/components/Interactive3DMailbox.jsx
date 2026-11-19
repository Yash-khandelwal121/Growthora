import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Interactive3DMailbox Component — State 2 Mailbox
 * 
 * Design Spec:
 * - Warm cream exterior (#FFFDF8 to #F6E8D8) with subtle pearlescent gradients & specular sheen.
 * - Metallic orange front door and rim (#FF6A00 to #FF8A00).
 * - Deep purple interior cavity (#2B083B) with warm golden/orange inner glow.
 * - "Growthora" branding in deep purple with orange swoosh on the mailbox side.
 * - Orange flag (#FF6A00) raised upright with bouncy physics.
 * - Wooden timber post grounded with fresh green leaves and river stones.
 * - Branded cream envelope entering the mailbox along a curved golden path.
 * - Respects prefers-reduced-motion for accessibility.
 */
export const Interactive3DMailbox = ({
  animationStep = 'flying', // 'flying' | 'delivered'
  onDelivered
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (animationStep === 'flying') {
      const delay = prefersReducedMotion ? 200 : 1400;
      const timer = setTimeout(() => {
        if (onDelivered) onDelivered();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animationStep, prefersReducedMotion, onDelivered]);

  const isDelivered = animationStep === 'delivered';

  return (
    <div className="cp-s2-mailbox-stage" aria-label="3D Growthora Delivery Mailbox">
      {/* Soft Ambient Ground Glow */}
      <div className="cp-s2-mailbox-ambient-glow" aria-hidden="true" />

      {/* Dynamic Flying Envelope */}
      <AnimatePresence>
        {!prefersReducedMotion && !isDelivered && (
          <motion.div
            className="cp-s2-flying-envelope"
            initial={{
              x: -140,
              y: 80,
              scale: 0.5,
              rotate: -22,
              opacity: 0
            }}
            animate={{
              x: [-140, -60, 0, 18],
              y: [80, -25, -2, 6],
              scale: [0.55, 1.05, 0.75, 0.4],
              rotate: [-22, 14, -6, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 1.3,
              times: [0, 0.45, 0.85, 1],
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Branded Cream Envelope */}
            <div className="cp-s2-envelope-card">
              <svg viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="cp-s2-envelope-svg">
                {/* Envelope Body */}
                <rect x="1" y="1" width="70" height="46" rx="4" fill="#FFFDF9" stroke="#FF9D55" strokeWidth="1.5" />
                {/* Bottom Folds */}
                <path d="M2 46L30 26L36 32L42 26L70 46" fill="#FFF4EC" stroke="#FFD7BA" strokeWidth="1" />
                {/* Top Flap Fold */}
                <path d="M2 2L36 27L70 2" fill="#FFF9F4" stroke="#FFC49A" strokeWidth="1.2" />
                {/* Growthora Orange Feather Logo Stamp */}
                <circle cx="36" cy="19" r="6.5" fill="#FFEFE2" stroke="#FF7A28" strokeWidth="1" />
                <path
                  d="M33 22C34 17 38 15 39 14C39 17 37 20 34.5 22.5L33 22Z"
                  fill="#FF6A00"
                />
              </svg>

              {/* Particle Golden Trail */}
              <div className="cp-s2-motion-trail" aria-hidden="true">
                <span className="cp-s2-trail-dot d-1" />
                <span className="cp-s2-trail-dot d-2" />
                <span className="cp-s2-trail-dot d-3" />
                <span className="cp-s2-trail-star s-1">✦</span>
                <span className="cp-s2-trail-star s-2">★</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Sparkles Around Mailbox */}
      <div className="cp-s2-burst-sparkles" aria-hidden="true">
        <span className="cp-s2-sparkle sp-1">✦</span>
        <span className="cp-s2-sparkle sp-2">★</span>
        <span className="cp-s2-sparkle sp-3">✦</span>
        <span className="cp-s2-sparkle sp-4">✦</span>
      </div>

      {/* Master 3D Mailbox SVG */}
      <svg
        viewBox="0 0 340 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cp-s2-mailbox-svg"
      >
        <defs>
          {/* Ground Soft Shadow */}
          <radialGradient id="s2GroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#350B46" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#FF6A00" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
          </radialGradient>

          {/* Wooden Post Gradients */}
          <linearGradient id="s2WoodPost" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E3D18" />
            <stop offset="35%" stopColor="#9B5C2C" />
            <stop offset="70%" stopColor="#BA753D" />
            <stop offset="100%" stopColor="#663614" />
          </linearGradient>

          {/* Warm Cream Body Gradients */}
          <linearGradient id="s2BodyGradient" x1="0%" y1="0%" x2="100%" y2="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFFBF6" />
            <stop offset="75%" stopColor="#FFF1E3" />
            <stop offset="100%" stopColor="#EED9C4" />
          </linearGradient>

          <linearGradient id="s2BodyHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Metallic Orange Door & Rim Gradients */}
          <linearGradient id="s2OrangeRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA64D" />
            <stop offset="40%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#D94B00" />
          </linearGradient>

          <linearGradient id="s2OrangeDoor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA347" />
            <stop offset="50%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#C94400" />
          </linearGradient>

          {/* Deep Purple Interior with Golden Inner Glow */}
          <radialGradient id="s2InteriorCavity" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FF9B42" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#350B46" />
            <stop offset="85%" stopColor="#1E0528" />
            <stop offset="100%" stopColor="#0F0114" />
          </radialGradient>

          {/* Orange Flag Gradient */}
          <linearGradient id="s2FlagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB366" />
            <stop offset="45%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#DE4D00" />
          </linearGradient>

          {/* Foliage Greens */}
          <linearGradient id="s2Leaf1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#62D67F" />
            <stop offset="100%" stopColor="#257E3B" />
          </linearGradient>
          <linearGradient id="s2Leaf2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4BB867" />
            <stop offset="100%" stopColor="#1B5B2A" />
          </linearGradient>
          <linearGradient id="s2Pebble1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFE8DF" />
            <stop offset="100%" stopColor="#B3A698" />
          </linearGradient>
          <linearGradient id="s2Pebble2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFD5CA" />
            <stop offset="100%" stopColor="#8C7D6F" />
          </linearGradient>
        </defs>

        {/* 1. Ground Shadow & Pebbles */}
        <ellipse cx="170" cy="282" rx="105" ry="18" fill="url(#s2GroundShadow)" />

        <ellipse cx="120" cy="280" rx="18" ry="9" fill="url(#s2Pebble1)" />
        <ellipse cx="118" cy="278" rx="14" ry="6" fill="#FFFFFF" opacity="0.6" />

        <ellipse cx="218" cy="282" rx="22" ry="10" fill="url(#s2Pebble2)" />
        <ellipse cx="215" cy="280" rx="16" ry="6" fill="#F4ECE2" opacity="0.5" />

        <ellipse cx="140" cy="286" rx="12" ry="6" fill="url(#s2Pebble1)" />

        {/* 2. Wooden Post */}
        <rect x="156" y="152" width="28" height="128" rx="4" fill="url(#s2WoodPost)" />
        <line x1="164" y1="154" x2="164" y2="278" stroke="#D28C54" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="172" y1="154" x2="172" y2="278" stroke="#48240A" strokeWidth="1.2" strokeOpacity="0.6" />

        {/* Wood collar bracket */}
        <path d="M148 152H192L186 166H154L148 152Z" fill="#753C14" />
        <circle cx="170" cy="172" r="3" fill="#3A1C0A" stroke="#BA753D" strokeWidth="1" />
        <circle cx="170" cy="204" r="3" fill="#3A1C0A" stroke="#BA753D" strokeWidth="1" />

        {/* 3. Base Foliage / Leaves */}
        <path
          d="M156 276 C136 265, 110 262, 94 274 C112 284, 138 284, 156 276 Z"
          fill="url(#s2Leaf1)"
        />
        <path
          d="M158 270 C144 252, 130 244, 116 250 C124 266, 142 274, 158 270 Z"
          fill="url(#s2Leaf2)"
        />
        <path
          d="M184 276 C204 262, 232 264, 246 274 C228 284, 202 284, 184 276 Z"
          fill="url(#s2Leaf1)"
        />
        <path
          d="M182 270 C194 254, 212 250, 222 258 C212 270, 196 274, 182 270 Z"
          fill="url(#s2Leaf2)"
        />

        {/* 4. Mailbox Warm Cream Cylinder Body (3D depth) */}
        <path
          d="M110 68
             C110 68, 140 50, 225 68
             C245 72, 252 82, 252 100
             L252 135
             C252 148, 240 155, 222 152
             L110 152
             C90 152, 78 144, 78 126
             L78 100
             C78 78, 95 68, 110 68 Z"
          fill="url(#s2BodyGradient)"
          stroke="#E6CEB6"
          strokeWidth="1.2"
        />

        {/* Top curvature highlight */}
        <path
          d="M110 68
             C140 50, 225 68, 225 68
             C245 72, 252 82, 252 100
             L252 108
             C230 84, 145 68, 110 82
             C95 86, 78 100, 78 100
             C78 78, 95 68, 110 68 Z"
          fill="url(#s2BodyHighlight)"
        />

        {/* Specular sheen stripe down cylinder */}
        <path
          d="M106 78
             L244 86
             L242 96
             L104 88 Z"
          fill="#FFFFFF"
          opacity="0.45"
        />

        {/* 5. Growthora Branding on Mailbox Side */}
        <g transform="translate(142, 108) rotate(-2)">
          {/* Growthora Wordmark in Deep Purple */}
          <text
            x="0"
            y="0"
            fill="#350B46"
            fontFamily="'DM Sans', -apple-system, sans-serif"
            fontSize="16"
            fontWeight="800"
            letterSpacing="0.4"
          >
            Growthora
          </text>
          {/* Signature Orange Swoosh Underline */}
          <path
            d="M1 5 C18 10, 48 8, 68 3"
            stroke="#FF6A00"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* 6. Front Opening Rim & Deep Purple Interior */}
        {/* Metallic Orange Arch Rim */}
        <path
          d="M82 100
             C82 66, 126 66, 126 100
             L126 142
             C126 148, 120 152, 114 152
             L94 152
             C88 152, 82 148, 82 142
             Z"
          fill="url(#s2OrangeRim)"
          stroke="#D44900"
          strokeWidth="1.2"
        />

        {/* Deep Purple Interior Cavity with Glow */}
        <path
          d="M85 101
             C85 70, 123 70, 123 101
             L123 140
             C123 146, 118 149, 112 149
             L96 149
             C90 149, 85 146, 85 140
             Z"
          fill="url(#s2InteriorCavity)"
        />

        {/* Delivered Envelope Resting Inside Mailbox */}
        <g transform="translate(90, 118) scale(0.46)">
          <rect x="0" y="0" width="66" height="44" rx="3" fill="#FFFDF8" stroke="#FF9D55" strokeWidth="2" />
          <path d="M0 0 L33 24 L66 0" fill="#FFF4EC" stroke="#FFB074" strokeWidth="1.5" />
          <circle cx="33" cy="16" r="5" fill="#FFEFE2" />
          <path d="M31 18C32 14 35 12 36 11C36 14 34 16 32 18Z" fill="#FF6A00" />
        </g>

        {/* 7. Metallic Orange Front Door Hinged Open */}
        <g
          style={{
            transformOrigin: "104px 150px",
            transform: "perspective(600px) rotateX(75deg)"
          }}
        >
          <path
            d="M84 102
               C84 69, 124 69, 124 102
               L124 144
               C124 150, 118 152, 112 152
               L96 152
               C90 152, 84 150, 84 144
               Z"
            fill="url(#s2OrangeDoor)"
            stroke="#D44900"
            strokeWidth="1.2"
          />
          <circle cx="104" cy="92" r="4" fill="#FFE0B8" stroke="#D44900" strokeWidth="1" />
        </g>

        {/* 8. Orange Mailbox Flag — Raised Upright */}
        <motion.g
          initial={{ rotate: 10 }}
          animate={{ rotate: -82 }}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 10,
            mass: 0.8
          }}
          style={{ transformOrigin: "238px 116px" }}
        >
          {/* Flag Bar */}
          <rect
            x="234"
            y="112"
            width="54"
            height="8"
            rx="3"
            fill="url(#s2FlagGrad)"
            stroke="#D44900"
            strokeWidth="1"
          />
          {/* Flag Paddle */}
          <path
            d="M272 96
               H292
               C295 96, 297 98, 297 101
               V118
               H272
               Z"
            fill="url(#s2FlagGrad)"
            stroke="#D44900"
            strokeWidth="1"
          />
          <rect x="276" y="100" width="4" height="14" rx="1" fill="#FFCF8C" opacity="0.8" />
        </motion.g>

        {/* Silver Pivot Bolt at Flag Base */}
        <circle cx="238" cy="116" r="5" fill="#CFD3DC" stroke="#78340F" strokeWidth="1.5" />
        <circle cx="237" cy="115" r="1.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

export default Interactive3DMailbox;
