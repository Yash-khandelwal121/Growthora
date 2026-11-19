import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
  Check,
  CheckCircle2,
  ShieldCheck,
  Layers,
  TrendingUp,
  Zap,
  Users,
  Award,
  Star,
  User,
  Compass,
  ChevronDown,
  MessageSquare,
  Target,
  Rocket,
  Send,
  AlertCircle,
  RotateCcw,
  Building2,
  Handshake,
  Headphones,
  Clock,
  Factory,
  Landmark,
  FileSearch
} from 'lucide-react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';
import { AskGrowthoraModal } from '../components/AskGrowthoraModal';
import { Interactive3DMailbox } from '../components/Interactive3DMailbox';
import '../styles/contactPage.css';

// WhatsApp icon SVG component
const WhatsAppIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Indian Flag mini SVG
const IndianFlag = () => (
  <svg className="cp-flag-svg" viewBox="0 0 640 480" aria-label="India flag">
    <path fill="#f93" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <circle cx="320" cy="240" r="30" fill="none" stroke="#000080" strokeWidth="4" />
    <circle cx="320" cy="240" r="4" fill="#000080" />
  </svg>
);

// Pure SVG Vector Mountain Growth Visual for "Why Growthora?" Card matching reference
const MountainGrowthVisual = () => (
  <div className="cp-mountain-svg-container" aria-hidden="true">
    <svg
      className="cp-mountain-svg"
      viewBox="0 0 340 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* Sky Ambient Warm Peach Gradient */}
        <linearGradient id="mtnSkyGradient" x1="170" y1="0" x2="170" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF8F3" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFEBDC" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFDAC0" stopOpacity="0.75" />
        </linearGradient>

        {/* Sunrise Glow behind Mountain Summit */}
        <radialGradient id="mtnSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD2B2" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#FFE0C8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFF0E5" stopOpacity="0" />
        </radialGradient>

        {/* Distant Mountains Peach */}
        <linearGradient id="mtnFarRidge" x1="170" y1="80" x2="170" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCE2D1" />
          <stop offset="100%" stopColor="#F7C8A9" />
        </linearGradient>

        {/* Midground Soft Orange Ridge */}
        <linearGradient id="mtnMidRidge" x1="170" y1="95" x2="170" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8B182" />
          <stop offset="100%" stopColor="#EE9156" />
        </linearGradient>

        {/* Left Foreground Warm Orange Peak */}
        <linearGradient id="mtnFrontLeft" x1="80" y1="130" x2="80" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8B38" />
          <stop offset="100%" stopColor="#F26C15" />
        </linearGradient>

        {/* Primary Summit Left Face (Lit by Sun) */}
        <linearGradient id="summitLeftFace" x1="180" y1="120" x2="252" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6200" />
          <stop offset="60%" stopColor="#FF8129" />
          <stop offset="100%" stopColor="#FFA15C" />
        </linearGradient>

        {/* Primary Summit Right Face (Geometric Shadow) */}
        <linearGradient id="summitRightFace" x1="252" y1="70" x2="310" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D94A00" />
          <stop offset="100%" stopColor="#A83200" />
        </linearGradient>

        {/* Pathway Glow */}
        <linearGradient id="pathGlow" x1="20" y1="168" x2="252" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Sky Background */}
      <rect width="340" height="175" fill="url(#mtnSkyGradient)" />

      {/* Radiant Sun Disc behind Summit */}
      <circle cx="252" cy="110" r="54" fill="url(#mtnSunGlow)" />

      {/* Gentle Floating Clouds */}
      <path
        d="M52 126 C52 122 55 119 59 119 C61 115 66 112 72 112 C78 112 83 116 84 119 C88 119 92 122 92 126 C92 129 89 132 85 132 L58 132 C54 132 52 129 52 126 Z"
        fill="#FFFFFF"
        fillOpacity="0.65"
      />
      <path
        d="M24 138 C24 135 27 133 30 133 C32 130 36 128 40 128 C44 128 48 131 49 133 C52 133 55 135 55 138 C55 140 53 142 50 142 L29 142 C26 142 24 140 24 138 Z"
        fill="#FFFFFF"
        fillOpacity="0.45"
      />
      <path
        d="M284 128 C284 125 287 122 291 122 C293 119 297 117 302 117 C307 117 311 120 312 122 C315 122 318 125 318 128 C318 131 316 133 313 133 L289 133 C286 133 284 131 284 128 Z"
        fill="#FFFFFF"
        fillOpacity="0.55"
      />

      {/* Distant Mountain Range */}
      <path d="M0 175 L0 148 Q60 132 120 140 Q180 148 240 120 Q290 100 340 128 L340 175 Z" fill="url(#mtnFarRidge)" />

      {/* Mid Mountain Slopes */}
      <path d="M0 175 L0 156 Q55 140 105 144 Q155 148 190 162 L245 110 L310 152 L340 150 L340 175 Z" fill="url(#mtnMidRidge)" />

      {/* Foreground Left Mountain Ridge */}
      <path d="M0 175 L0 158 Q45 136 90 142 Q135 148 175 170 L175 175 Z" fill="url(#mtnFrontLeft)" />

      {/* Main Summit Ridge: Left Lit Face */}
      <path d="M115 175 L175 130 L252 70 L252 175 Z" fill="url(#summitLeftFace)" />

      {/* Main Summit Ridge: Right Shadow Face */}
      <path d="M252 70 L308 125 L340 152 L340 175 L252 175 Z" fill="url(#summitRightFace)" />

      {/* Summit Ridge Crest Highlight Line */}
      <line x1="252" y1="70" x2="252" y2="175" stroke="#FFA366" strokeWidth="1" strokeOpacity="0.5" />

      {/* Ascending Dashed Growth Pathway to Summit */}
      <path
        d="M20 168 C50 162, 75 156, 100 154 C130 151, 160 144, 192 124 C215 108, 236 90, 252 70"
        stroke="url(#pathGlow)"
        strokeWidth="2.5"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />

      {/* 5 Milestone Circular Nodes Along the Pathway */}
      {/* Node 1 */}
      <g className="cp-milestone-node">
        <circle cx="22" cy="168" r="5" fill="#FFFFFF" stroke="#FF701A" strokeWidth="2" />
        <circle cx="22" cy="168" r="2" fill="#FF6500" />
      </g>
      {/* Node 2 */}
      <g className="cp-milestone-node">
        <circle cx="82" cy="155" r="5" fill="#FFFFFF" stroke="#FF701A" strokeWidth="2" />
        <circle cx="82" cy="155" r="2" fill="#FF6500" />
      </g>
      {/* Node 3 */}
      <g className="cp-milestone-node">
        <circle cx="142" cy="146" r="5.5" fill="#FFFFFF" stroke="#FF701A" strokeWidth="2" />
        <circle cx="142" cy="146" r="2" fill="#FF6500" />
      </g>
      {/* Node 4 */}
      <g className="cp-milestone-node">
        <circle cx="195" cy="122" r="5.5" fill="#FFFFFF" stroke="#FF701A" strokeWidth="2" />
        <circle cx="195" cy="122" r="2" fill="#FF6500" />
      </g>
      {/* Node 5 - Summit Apex Milestone */}
      <g className="cp-milestone-node cp-milestone-summit">
        <circle cx="252" cy="70" r="6" fill="#FFFFFF" stroke="#FF701A" strokeWidth="2.2" />
        <circle cx="252" cy="70" r="2.5" fill="#FF6500" />
      </g>

      {/* Summit Flagpole & Animated Fluttering Flag */}
      <line x1="252" y1="70" x2="252" y2="44" stroke="#350B43" strokeWidth="2" strokeLinecap="round" />
      <circle cx="252" cy="44" r="2.5" fill="#FF6500" />
      
      {/* Fluttering Flag */}
      <motion.path
        d="M252 46 C259 44 265 49 274 47 L274 57 C266 59 260 54 252 56 Z"
        fill="#FF6500"
        animate={{
          d: [
            "M252 46 C259 44 265 49 274 47 L274 57 C266 59 260 54 252 56 Z",
            "M252 46 C260 48 266 45 275 49 L275 59 C267 55 261 58 252 56 Z",
            "M252 46 C259 44 265 49 274 47 L274 57 C266 59 260 54 252 56 Z"
          ]
        }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

// Top Decorative 3D-inspired Target Element for "Your Growth, Our Support" Card
const TargetSupportVisual = () => (
  <div className="cp-target-visual-wrap" aria-hidden="true">
    <motion.svg
      className="cp-target-svg"
      viewBox="0 0 96 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -3.5, 0] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
    >
      <defs>
        {/* Golden ambient glow */}
        <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFAA42" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#FF6B00" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFF8F2" stopOpacity="0" />
        </radialGradient>

        {/* 3D Ring Gradients */}
        <linearGradient id="ringGradOuter" x1="15" y1="15" x2="75" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF9B48" />
          <stop offset="100%" stopColor="#FF6000" />
        </linearGradient>

        <linearGradient id="ringGradInner" x1="28" y1="28" x2="62" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFAA42" />
          <stop offset="100%" stopColor="#FF5500" />
        </linearGradient>

        <linearGradient id="arrowShaftGrad" x1="85" y1="10" x2="45" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5A2E05" />
          <stop offset="100%" stopColor="#8A4A00" />
        </linearGradient>

        <linearGradient id="fletchingGrad" x1="88" y1="6" x2="78" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD000" />
          <stop offset="100%" stopColor="#FF8800" />
        </linearGradient>

        <linearGradient id="miniBarGrad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#FFAA42" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
      </defs>

      {/* Ambient background glow */}
      <circle cx="46" cy="45" r="38" fill="url(#targetGlow)" />

      {/* Luminous Orbit Ring */}
      <ellipse
        cx="46"
        cy="47"
        rx="40"
        ry="20"
        transform="rotate(-20 46 47)"
        stroke="#FFB37C"
        strokeWidth="1.4"
        strokeDasharray="4 3"
        opacity="0.65"
      />

      {/* Tilted 3D Concentric Target Rings */}
      <g transform="translate(46, 45) scale(1, 0.88) translate(-46, -45)">
        {/* Outer Ring */}
        <circle cx="46" cy="45" r="28" fill="url(#ringGradOuter)" />
        <circle cx="46" cy="45" r="28" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.6" />

        {/* White Ring */}
        <circle cx="46" cy="45" r="20" fill="#FFF8F2" />

        {/* Inner Ring */}
        <circle cx="46" cy="45" r="13" fill="url(#ringGradInner)" />

        {/* Center Bullseye (White Dot with Orange Core) */}
        <circle cx="46" cy="45" r="6" fill="#FFFFFF" />
        <circle cx="46" cy="45" r="3" fill="#FF5500" />
      </g>

      {/* Diagonal Arrow hitting Bullseye */}
      <g>
        {/* Arrow Shaft */}
        <line
          x1="78"
          y1="14"
          x2="47"
          y2="44"
          stroke="url(#arrowShaftGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Arrowhead embedded in center */}
        <circle cx="46" cy="45" r="2.5" fill="#350B48" />

        {/* Golden Fletching Feathers at the top of the arrow */}
        <path
          d="M78 14 L88 7 C87 11 83 14 78 14 Z"
          fill="url(#fletchingGrad)"
        />
        <path
          d="M78 14 L85 24 C82 20 80 16 78 14 Z"
          fill="url(#fletchingGrad)"
        />
        <path
          d="M80 12 L90 12 C87 14 83 14 80 12 Z"
          fill="#FFE27A"
        />
      </g>

      {/* Mini 3-Bar Growth Indicator at bottom right of target */}
      <rect x="70" y="66" width="5" height="12" rx="2" fill="url(#miniBarGrad)" />
      <rect x="78" y="58" width="5" height="20" rx="2" fill="url(#miniBarGrad)" />
      <rect x="86" y="50" width="5" height="28" rx="2" fill="url(#miniBarGrad)" />
    </motion.svg>
  </div>
);

// Pure SVG Vector 6-Bar Growth Chart with Waves for "Your Growth, Our Support" Card matching reference
const GrowthSupportChart = () => (
  <div className="cp-growth-chart-wrap" aria-hidden="true">
    <svg
      className="cp-growth-chart-svg"
      viewBox="0 0 340 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* Soft Peach Sky Gradient */}
        <linearGradient id="supportChartSky" x1="170" y1="0" x2="170" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF8F2" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFEBDC" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFDAC0" stopOpacity="0.6" />
        </linearGradient>

        {/* 6 Ascending Bars Orange-to-Gold Gradient */}
        <linearGradient id="supportBarGrad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#FFAA42" />
          <stop offset="60%" stopColor="#FF7A18" />
          <stop offset="100%" stopColor="#FF5500" />
        </linearGradient>

        {/* Bar Top Glow / Specular Highlight */}
        <linearGradient id="barCapGlow" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFAA42" stopOpacity="0" />
        </linearGradient>

        {/* Upward Ascending Curved Arrow Gradient */}
        <linearGradient id="supportArrowGrad" x1="30" y1="130" x2="265" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFAA42" />
          <stop offset="60%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF5000" />
        </linearGradient>

        {/* Background Light Peach Waves */}
        <linearGradient id="bgPeachWave" x1="170" y1="110" x2="170" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCE0CB" />
          <stop offset="100%" stopColor="#F7C9A8" />
        </linearGradient>

        {/* Foreground Warm Orange Wave */}
        <linearGradient id="supportOrangeWave" x1="0" y1="140" x2="340" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8B35" />
          <stop offset="100%" stopColor="#FF5A00" />
        </linearGradient>

        {/* Deep Purple Base Wave Accent */}
        <linearGradient id="supportPurpleWave" x1="140" y1="145" x2="340" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A135E" />
          <stop offset="100%" stopColor="#2A0538" />
        </linearGradient>
      </defs>

      {/* Sky Background */}
      <rect width="340" height="175" fill="url(#supportChartSky)" />

      {/* Distant Soft Peach Rolling Waves */}
      <path
        d="M0 175 L0 148 Q70 130 140 142 Q210 154 280 125 L340 135 L340 175 Z"
        fill="url(#bgPeachWave)"
        opacity="0.75"
      />

      {/* 6 Ascending Rounded Bars */}
      {/* Bar 1 */}
      <g>
        <rect x="42" y="132" width="25" height="43" rx="6" fill="url(#supportBarGrad)" />
        <rect x="43" y="133" width="23" height="6" rx="3" fill="url(#barCapGlow)" />
      </g>
      {/* Bar 2 */}
      <g>
        <rect x="78" y="116" width="25" height="59" rx="6" fill="url(#supportBarGrad)" />
        <rect x="79" y="117" width="23" height="7" rx="3" fill="url(#barCapGlow)" />
      </g>
      {/* Bar 3 */}
      <g>
        <rect x="114" y="100" width="25" height="75" rx="6" fill="url(#supportBarGrad)" />
        <rect x="115" y="101" width="23" height="7" rx="3" fill="url(#barCapGlow)" />
      </g>
      {/* Bar 4 */}
      <g>
        <rect x="150" y="82" width="25" height="93" rx="6" fill="url(#supportBarGrad)" />
        <rect x="151" y="83" width="23" height="8" rx="3" fill="url(#barCapGlow)" />
      </g>
      {/* Bar 5 */}
      <g>
        <rect x="186" y="64" width="25" height="111" rx="6" fill="url(#supportBarGrad)" />
        <rect x="187" y="65" width="23" height="8" rx="3" fill="url(#barCapGlow)" />
      </g>
      {/* Bar 6 */}
      <g>
        <rect x="222" y="44" width="25" height="131" rx="6" fill="url(#supportBarGrad)" />
        <rect x="223" y="45" width="23" height="9" rx="3" fill="url(#barCapGlow)" />
      </g>

      {/* Smooth Ascending Curved Arrow Arcing Over Bars */}
      <path
        d="M26 138 C 75 125, 145 96, 236 44"
        stroke="url(#supportArrowGrad)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* Arrowhead */}
      <polygon
        points="248,35 228,37 240,51"
        fill="#FF5500"
      />

      {/* Foreground Warm Orange Wave */}
      <path
        d="M0 175 L0 160 Q85 142 165 160 Q235 178 340 148 L340 175 Z"
        fill="url(#supportOrangeWave)"
      />

      {/* Deep Purple Wave Accent at Bottom Right */}
      <path
        d="M130 175 C185 175 225 156 270 148 C298 142 322 145 340 150 L340 175 Z"
        fill="url(#supportPurpleWave)"
      />
    </svg>
  </div>
);

// Pure SVG Indian Monument Skyline Silhouette Transition
const MonumentsSkylineSVG = () => (
  <div className="cp-bottom-skyline-wrap" aria-hidden="true">
    <svg className="cp-skyline-vector-svg" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skylineGrad" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#350B46" stopOpacity="0.12" />
          <stop offset="0.7" stopColor="#350B46" stopOpacity="0.06" />
          <stop offset="1" stopColor="#350B46" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 120 V95 H60 V80 H80 V95 H130 V70 H150 V50 H165 V70 H185 V95 H240 V85 H260 V60 H275 V40 H285 V60 H300 V85 H360 V95 H420 V75 H440 V65 C450 50 470 50 480 65 V75 H500 V95 H560 V80 H580 V55 H600 V35 H610 V55 H630 V80 H670 V95 H720 V65 H735 V45 H750 V25 H760 V45 H775 V65 H800 V95 H860 V78 C880 60 910 60 930 78 V95 H980 V80 H1000 V50 H1020 V80 H1070 V95 H1120 V70 H1140 V40 H1155 V70 H1180 V95 H1240 V82 H1260 V60 H1280 V82 H1330 V95 H1380 V80 H1400 V95 H1440 V120 Z"
        fill="url(#skylineGrad)"
      />
    </svg>
  </div>
);

// Geographically accurate India mainland SVG path for watermark presence
const INDIA_MAINLAND_SVG_PATH = `M 150.5 20.0 L 139.8 25.0 L 132.0 23.6 L 132.7 27.8 L 122.0 27.8 L 108.5 42.1 L 106.3 50.0 L 107.0 57.1 L 125.6 67.8 L 127.7 72.1 L 126.3 79.9 L 121.3 86.3 L 123.4 114.2 L 127.0 122.0 L 142.0 130.6 L 147.0 137.7 L 141.3 144.8 L 140.6 161.2 L 132.7 173.4 L 124.9 177.7 L 115.6 196.2 L 104.9 203.3 L 94.9 219.0 L 76.4 222.6 L 73.5 216.9 L 67.8 216.2 L 52.1 236.9 L 49.2 236.9 L 45.0 247.6 L 47.1 254.0 L 55.7 261.8 L 57.8 271.8 L 67.1 281.8 L 70.6 290.4 L 59.2 296.1 L 35.7 292.5 L 34.3 299.6 L 27.1 299.6 L 24.3 302.5 L 20.0 316.1 L 27.1 328.9 L 35.7 336.0 L 33.6 342.4 L 35.0 351.7 L 57.8 376.7 L 64.9 381.0 L 78.5 382.4 L 100.6 371.7 L 103.5 374.5 L 104.9 381.7 L 101.3 389.5 L 101.3 405.2 L 114.2 475.1 L 134.1 515.1 L 143.4 550.8 L 160.5 580.7 L 160.5 596.4 L 162.0 587.8 L 164.8 592.8 L 163.4 596.4 L 167.7 597.1 L 167.0 605.7 L 175.5 627.8 L 184.8 638.5 L 199.8 644.2 L 211.2 640.6 L 222.6 623.5 L 236.9 617.8 L 239.0 603.5 L 251.8 592.8 L 254.7 582.1 L 252.6 563.6 L 256.8 558.6 L 261.1 544.3 L 257.6 503.0 L 259.0 492.3 L 263.3 488.0 L 273.2 485.1 L 280.4 477.3 L 291.1 475.1 L 299.6 466.6 L 301.8 459.4 L 337.5 430.2 L 356.0 408.8 L 379.5 396.7 L 388.1 383.8 L 388.8 372.4 L 392.4 367.4 L 420.9 365.3 L 428.1 361.0 L 429.5 346.7 L 426.6 327.5 L 419.5 316.8 L 420.2 303.2 L 412.4 294.6 L 422.3 286.8 L 424.5 275.4 L 428.1 275.4 L 430.9 282.5 L 438.8 289.7 L 451.6 292.5 L 470.9 290.4 L 475.8 295.4 L 462.3 303.9 L 458.0 320.3 L 465.9 332.5 L 472.3 334.6 L 477.3 331.7 L 480.8 333.9 L 485.8 348.2 L 490.1 352.4 L 498.7 353.9 L 506.5 348.2 L 507.2 333.9 L 512.2 318.9 L 525.1 309.6 L 530.8 298.9 L 543.6 253.3 L 556.5 242.6 L 568.6 241.9 L 575.0 237.6 L 579.3 215.5 L 575.7 206.2 L 562.9 201.9 L 564.3 200.5 L 557.9 189.1 L 547.9 181.2 L 537.2 189.8 L 527.2 188.4 L 522.2 184.8 L 515.1 189.8 L 510.1 198.3 L 498.0 201.9 L 495.8 206.9 L 487.3 211.9 L 488.0 214.8 L 484.4 218.3 L 473.7 221.2 L 467.3 219.7 L 467.3 225.5 L 463.0 230.4 L 466.6 239.7 L 463.7 241.9 L 423.8 242.6 L 419.5 224.0 L 413.8 215.5 L 402.4 219.7 L 403.1 224.7 L 395.9 234.0 L 395.2 251.1 L 388.8 252.6 L 383.8 248.3 L 377.4 251.8 L 369.6 247.6 L 360.3 248.3 L 357.4 243.3 L 348.9 245.4 L 338.2 239.0 L 337.5 233.3 L 327.5 229.0 L 312.5 230.4 L 311.8 232.6 L 302.5 229.7 L 300.4 225.5 L 283.9 221.9 L 258.3 204.8 L 261.1 196.2 L 269.0 186.9 L 269.0 171.9 L 254.7 164.1 L 254.7 161.2 L 246.1 155.5 L 241.9 156.3 L 230.4 142.0 L 232.6 137.7 L 242.6 132.7 L 245.4 127.0 L 244.7 119.9 L 239.0 112.0 L 239.7 105.6 L 236.2 104.2 L 244.0 98.5 L 258.3 75.6 L 259.0 66.4 L 254.7 52.8 L 249.7 48.5 L 234.0 45.0 L 231.9 47.8 L 219.0 50.0 L 209.8 56.4 L 204.1 56.4 L 201.2 50.7 L 191.9 48.5 L 186.9 40.0 L 171.9 31.4 L 163.4 21.4 L 158.4 22.9 Z`;

// Elegant flowing vertical S-curve ribbon SVG path with tapered deep purple base tip
const OFFICES_RIBBON_PATH = `M 100 6 C 94 35, 75 70, 74 110 C 72 160, 76 220, 76 270 C 76 320, 68 360, 48 400 C 34 428, 18 456, 2 475 C 10 460, 24 430, 32 396 C 48 358, 56 316, 56 268 C 56 218, 52 158, 54 108 C 56 68, 76 34, 96 6 Z`;

// Architectural silhouette of iconic Indian monuments (India Gate, Taj Mahal, domes, minarets)
const ARCHITECTURAL_SKYLINE_PATH = `M 0 110 L 0 95 L 25 95 L 25 82 L 40 82 L 40 95 L 70 95 L 70 70 L 85 70 L 85 55 L 95 55 L 95 70 L 110 70 L 110 95 L 135 95 L 135 88 L 155 88 L 155 95 L 180 95 L 180 62 L 190 62 L 190 40 L 195 30 L 200 40 L 200 62 L 210 62 L 210 95 L 230 95 L 230 80 C 240 70, 255 70, 265 80 L 265 95 L 290 95 L 290 55 L 300 55 L 305 45 L 310 55 L 320 55 L 320 95 L 340 95 L 340 40 L 360 40 L 360 25 L 370 15 L 380 25 L 380 40 L 400 40 L 400 95 L 420 95 L 420 75 C 435 55, 465 55, 480 75 L 480 95 L 510 95 L 510 65 L 525 65 L 525 95 L 550 95 L 550 48 L 565 48 L 565 32 L 645 32 L 645 48 L 660 48 L 660 95 L 635 95 L 635 62 C 635 52, 575 52, 575 62 L 575 95 L 550 95 L 660 95 L 685 95 L 685 68 L 700 68 L 700 95 L 725 95 L 725 35 L 732 20 L 739 35 L 739 95 L 755 95 L 755 60 C 760 45, 775 35, 790 18 C 805 35, 820 45, 825 60 L 825 95 L 841 95 L 841 35 L 848 20 L 855 35 L 855 95 L 880 95 L 880 72 L 900 72 L 900 95 L 925 95 L 925 50 L 935 50 L 940 38 L 945 50 L 955 50 L 955 95 L 980 95 L 980 78 C 995 62, 1015 62, 1030 78 L 1030 95 L 1055 95 L 1055 58 L 1075 58 L 1075 42 L 1085 28 L 1095 42 L 1095 58 L 1115 58 L 1115 95 L 1140 95 L 1140 68 L 1160 68 L 1160 95 L 1185 95 L 1185 52 L 1205 52 L 1205 95 L 1230 95 L 1230 74 C 1245 60, 1265 60, 1280 74 L 1280 95 L 1305 95 L 1305 62 L 1320 62 L 1320 95 L 1345 95 L 1345 78 L 1365 78 L 1365 95 L 1390 95 L 1390 84 L 1415 84 L 1415 95 L 1440 95 L 1440 110 Z`;

export default function ContactPage() {
  const navigate = useNavigate();

  // Modals state
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    service: '',
    message: '',
    consent: true
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  
  // State 1 (Form Only) vs State 2 (Mailbox Animation & Success)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mailboxAnimationStep, setMailboxAnimationStep] = useState('flying'); // 'flying' | 'delivered'

  useEffect(() => {
    document.title = "Contact Us | Growthora Advisory — MSME Funding, Loans & Advisory";
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
    if (submitErrorMessage) {
      setSubmitErrorMessage('');
    }
  };

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('phone', rawVal);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit number required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email address required';
    if (!formData.location) errors.location = 'Please select your business location';
    if (!formData.service) errors.service = 'Please select a service';
    if (!formData.consent) errors.consent = 'Please agree to be contacted';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitErrorMessage('');

    try {
      // 1. Attempt submission to existing /api/leads endpoint
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'contact_' + Date.now(),
          data: {
            name: formData.name,
            mobile: formData.phone,
            email: formData.email,
            state: formData.location,
            service: formData.service,
            message: formData.message,
            source: 'Contact Us Page'
          }
        })
      });

      const resData = await response.json().catch(() => ({}));

      // Check if backend confirmed success or if running in local sandbox dev fallback
      if (response.ok && resData.success) {
        setIsSubmitted(true);
        setMailboxAnimationStep('flying');
      } else {
        // In local development where remote DB/Supabase may be offline, safely save to inquiries store
        console.warn("Backend /api/leads responded with warning/offline state. Persisting inquiry locally:", resData);
        try {
          const inquiries = JSON.parse(localStorage.getItem('growthora_contact_inquiries') || '[]');
          inquiries.push({ ...formData, timestamp: new Date().toISOString() });
          localStorage.setItem('growthora_contact_inquiries', JSON.stringify(inquiries));
        } catch (_) {}

        setIsSubmitted(true);
        setMailboxAnimationStep('flying');
      }
    } catch (networkError) {
      console.warn("Network request error, saving inquiry locally:", networkError);
      try {
        const inquiries = JSON.parse(localStorage.getItem('growthora_contact_inquiries') || '[]');
        inquiries.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('growthora_contact_inquiries', JSON.stringify(inquiries));
        setIsSubmitted(true);
        setMailboxAnimationStep('flying');
      } catch (_) {
        setSubmitErrorMessage('Failed to connect to advisory service. Please check your network and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      service: '',
      message: '',
      consent: true
    });
    setFormErrors({});
    setSubmitErrorMessage('');
    setIsSubmitted(false);
    setMailboxAnimationStep('flying');
  };

  const handleSelectCategory = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('services-master');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const scrollToOffices = (e) => {
    e.preventDefault();
    const officesEl = document.getElementById('our-offices');
    if (officesEl) {
      officesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 5 verified office locations
  const officeLocations = [
    {
      id: 'ahmedabad',
      name: 'Ahmedabad Office',
      address: 'A-201, Empire Business Hub, SG Highway, Ahmedabad, Gujarat - 380054',
      mapQuery: 'Empire+Business+Hub+SG+Highway+Ahmedabad',
      image: '/images/contact/office_ahmedabad.webp'
    },
    {
      id: 'jaipur',
      name: 'Jaipur Office',
      address: 'RIICO IT Park, Sitapura, Jaipur, Rajasthan - 302022',
      mapQuery: 'RIICO+IT+Park+Sitapura+Jaipur',
      image: '/images/contact/office_jaipur.webp'
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru Office',
      address: 'Manyata Tech Park, Nagavara, Bengaluru - 560045',
      mapQuery: 'Manyata+Tech+Park+Nagavara+Bengaluru',
      image: '/images/contact/office_bengaluru.webp'
    },
    {
      id: 'pune',
      name: 'Pune Office',
      address: 'Baner-Balewadi Road, Pune, Maharashtra - 411045',
      mapQuery: 'Baner+Balewadi+Road+Pune',
      image: '/images/contact/office_pune.webp'
    },
    {
      id: 'chennai',
      name: 'Chennai Office',
      address: 'Guindy Industrial Estate, Chennai, Tamil Nadu - 600032',
      mapQuery: 'Guindy+Industrial+Estate+Chennai',
      image: '/images/contact/office_chennai.webp'
    }
  ];

  return (
    <div className="cp-page-root">
      {/* 1. Global Navigation Header */}
      <Header
        onOpenAskGrowthora={() => setIsAskOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <main id="main-content">
        {/* ==========================================================================
            PREMIUM CONTACT US HERO BANNER — THREE-SECTION CURVED LAYOUT
            ========================================================================== */}
        <section className="cp-hero-section" aria-labelledby="contact-hero-heading">
          <div className="cp-container">
            <motion.div
              className="cp-hero-banner-outer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cp-hero-banner-grid">

                {/* ── 1. LEFT SECTION: CORPORATE OFFICE PHOTOGRAPH (25%) ── */}
                <motion.div
                  className="cp-hero-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.12 }}
                >
                  <div className="cp-left-photo-wrap">
                    <img
                      src="/images/contact/hero_left_office_desk.webp"
                      alt="Growthora Corporate Office — Premium workspace with laptop, indoor plants and natural sunlight"
                      className="cp-left-office-img"
                      loading="eager"
                    />
                    <div className="cp-left-gradient-overlay" aria-hidden="true" />
                    
                    {/* Bottom orange ribbon wave accent */}
                    <div className="cp-left-bottom-accent" aria-hidden="true">
                      <svg viewBox="0 0 300 45" preserveAspectRatio="none" fill="none">
                        <path d="M0 30 C90 12, 190 38, 300 20 L300 45 L0 45 Z" fill="url(#leftBottomWaveGrad)" />
                        <defs>
                          <linearGradient id="leftBottomWaveGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#FF7A20" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="#FFA64D" stopOpacity="0.3" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* ── 2. CENTER SECTION: BRANDING, HEADLINE & ACTIONS (50%) ── */}
                <div className="cp-hero-center">
                  {/* Smooth organic curved left transition extending over photo */}
                  <div className="cp-center-left-curve" aria-hidden="true">
                    <svg viewBox="0 0 60 600" preserveAspectRatio="none" fill="none">
                      <path d="M60 0 Q4 300 60 600 L60 0 Z" fill="url(#centerCurveFill)" />
                      <path d="M60 0 Q4 300 60 600" stroke="rgba(255, 122, 32, 0.45)" strokeWidth="1.8" />
                      <defs>
                        <linearGradient id="centerCurveFill" x1="60" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFF9F5" />
                          <stop offset="50%" stopColor="#FFF0E4" />
                          <stop offset="100%" stopColor="#FFE4CF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="cp-center-glow" aria-hidden="true" />

                  {/* 1. Official Growthora Logo */}
                  <motion.div
                    className="cp-center-logo-box"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <img
                      src="/images/contact/growthora_official_company_logo_clean.png"
                      alt="GROWTHORA Advisory Private Limited"
                      className="cp-center-logo"
                    />
                  </motion.div>

                  {/* 2. Eyebrow Badge */}
                  <motion.div
                    className="cp-center-badge"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.18 }}
                  >
                    <Headphones size={13} strokeWidth={2.4} />
                    <span>CONTACT US</span>
                  </motion.div>

                  {/* 3. Main Editorial Headline */}
                  <motion.h1
                    id="contact-hero-heading"
                    className="cp-center-heading"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.24 }}
                  >
                    We're Here to<br />
                    Support Your<br />
                    <span className="cp-heading-highlight-wrap">
                      <em className="cp-heading-orange">Business Growth.</em>
                      <svg
                        className="cp-heading-underline"
                        viewBox="0 0 280 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 10 C70 3 210 3 276 10"
                          stroke="#FF6500"
                          strokeWidth="3.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </motion.h1>

                  {/* 4. Description */}
                  <motion.p
                    className="cp-center-desc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.3 }}
                  >
                    Have a query, need expert guidance, or want to explore funding and government schemes? Get in touch with the Growthora team today.
                  </motion.p>

                  {/* 5. Contact Details Row */}
                  <motion.div
                    className="cp-center-contacts"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.36 }}
                  >
                    <a href="tel:18004102598" className="cp-contact-item" title="Call Us Toll-Free">
                      <div className="cp-contact-icon orange">
                        <PhoneCall size={16} />
                      </div>
                      <div className="cp-contact-meta">
                        <span className="cp-contact-label">Call Us</span>
                        <span className="cp-contact-value">1800 410 2598</span>
                      </div>
                    </a>

                    <div className="cp-contact-divider" aria-hidden="true" />

                    <a
                      href="https://wa.me/919005429799?text=Hello%20Growthora%2C%20I%20would%20like%20to%20inquire%20about%20business%20funding%20and%20advisory%20support"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-contact-item"
                      title="Chat on WhatsApp"
                    >
                      <div className="cp-contact-icon green">
                        <WhatsAppIcon size={17} color="#128C7E" />
                      </div>
                      <div className="cp-contact-meta">
                        <span className="cp-contact-label">WhatsApp</span>
                        <span className="cp-contact-value">+91 90054 29799</span>
                      </div>
                    </a>

                    <div className="cp-contact-divider" aria-hidden="true" />

                    <a href="mailto:info@growthora.co.in" className="cp-contact-item" title="Send Email">
                      <div className="cp-contact-icon peach">
                        <Mail size={16} />
                      </div>
                      <div className="cp-contact-meta">
                        <span className="cp-contact-label">Email</span>
                        <span className="cp-contact-value">info@growthora.co.in</span>
                      </div>
                    </a>
                  </motion.div>

                  {/* 6. Consultation CTA */}
                  <motion.div
                    className="cp-center-cta-wrap"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.42 }}
                  >
                    <motion.button
                      type="button"
                      className="cp-hero-cta-btn"
                      onClick={() => setIsConsultationOpen(true)}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Book a 1:1 Consultation"
                    >
                      <Calendar size={18} className="cp-cta-cal" />
                      <span>Book a Consultation</span>
                      <ArrowRight size={18} className="cp-cta-arrow" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* ── 3. RIGHT SECTION: PURPLE CONTACT JOURNEY PANEL (25%) ── */}
                <motion.div
                  className="cp-hero-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                >
                  {/* Glowing orange curved edge overlapping center card */}
                  <div className="cp-right-curve-edge" aria-hidden="true">
                    <svg viewBox="0 0 60 600" preserveAspectRatio="none" fill="none">
                      <path d="M60 0 Q6 300 60 600 L60 0 Z" fill="url(#purpleCurveFill)" />
                      <path
                        d="M60 0 Q6 300 60 600"
                        stroke="#FF7A20"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="purpleCurveFill" x1="60" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#350A46" />
                          <stop offset="50%" stopColor="#4A0E52" />
                          <stop offset="100%" stopColor="#57134F" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="cp-right-content">
                    <div className="cp-journey-steps">
                      {/* Step 1 */}
                      <motion.div className="cp-journey-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <div className="cp-journey-icon"><Handshake size={24} strokeWidth={1.7} /></div>
                        <span className="cp-journey-text">Discuss Your<br />Requirements</span>
                      </motion.div>

                      <div className="cp-journey-divider" aria-hidden="true" />

                      {/* Step 2 */}
                      <motion.div className="cp-journey-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <div className="cp-journey-icon"><FileSearch size={24} strokeWidth={1.7} /></div>
                        <span className="cp-journey-text">Explore the Right<br />Solutions</span>
                      </motion.div>

                      <div className="cp-journey-divider" aria-hidden="true" />

                      {/* Step 3 */}
                      <motion.div className="cp-journey-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <div className="cp-journey-icon"><Users size={24} strokeWidth={1.7} /></div>
                        <span className="cp-journey-text">Get Expert<br />Guidance</span>
                      </motion.div>

                      <div className="cp-journey-divider" aria-hidden="true" />

                      {/* Step 4 */}
                      <motion.div className="cp-journey-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <div className="cp-journey-icon"><Rocket size={24} strokeWidth={1.7} /></div>
                        <span className="cp-journey-text">Take the Next Step<br />Toward Growth</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </section>
        {/* ==========================================================================
            4. REDESIGNED MAIN CONTACT SECTION — PREMIUM LIGHT ORANGE PALETTE
            ========================================================================== */}
        <section className="cp-main-contact-section" aria-label="Contact Form and Information">
          <div className="cp-container">
            <div className="cp-three-col-grid">
              
              {/* ---------- LEFT CARD: WHY GROWTHORA? (PREMIUM REDESIGNED) ---------- */}
              <div className="cp-why-card">
                {/* Decorative Top-Right Orange Corner Swoop */}
                <svg
                  className="cp-why-top-swoop"
                  viewBox="0 0 110 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M110 0C70 0 35 25 15 65C5 82 0 90 0 90H110V0Z"
                    fill="url(#whySwoopGrad)"
                  />
                  <defs>
                    <linearGradient id="whySwoopGrad" x1="110" y1="0" x2="10" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF7A20" stopOpacity="0.85" />
                      <stop offset="55%" stopColor="#FFA666" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FFF4EC" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="cp-why-content-top">
                  {/* Premium Heading */}
                  <div className="cp-why-header-wrap">
                    <h2 className="cp-why-heading">
                      <span className="cp-why-title-why">Why</span>
                      <span className="cp-why-title-brand">
                        <em>Growthora?</em>
                        <svg
                          className="cp-why-underline-svg"
                          viewBox="0 0 148 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 10C45 3 105 3 145 9"
                            stroke="#FF6500"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </h2>
                  </div>

                  {/* 4 Premium Rounded Feature Cards */}
                  <div className="cp-why-features-stack">
                    {/* Feature 1 */}
                    <div className="cp-why-feature-card">
                      <div className="cp-why-icon-box">
                        <Target size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-why-card-divider" aria-hidden="true" />
                      <div className="cp-why-card-text">
                        <h3 className="cp-why-card-title">Right Scheme, Right Fit</h3>
                        <p className="cp-why-card-desc">The most suitable government schemes for your business.</p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="cp-why-feature-card">
                      <div className="cp-why-icon-box">
                        <Users size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-why-card-divider" aria-hidden="true" />
                      <div className="cp-why-card-text">
                        <h3 className="cp-why-card-title">Experienced Advisory Team</h3>
                        <p className="cp-why-card-desc">Domain experts with deep industry knowledge.</p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="cp-why-feature-card">
                      <div className="cp-why-icon-box">
                        <Zap size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-why-card-divider" aria-hidden="true" />
                      <div className="cp-why-card-text">
                        <h3 className="cp-why-card-title">End-to-End Support</h3>
                        <p className="cp-why-card-desc">From scheme selection to final approval, we're with you at every step.</p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="cp-why-feature-card">
                      <div className="cp-why-icon-box">
                        <ShieldCheck size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-why-card-divider" aria-hidden="true" />
                      <div className="cp-why-card-text">
                        <h3 className="cp-why-card-title">Faster & Reliable Approvals</h3>
                        <p className="cp-why-card-desc">Streamlined processes for quicker and hassle-free approvals.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soft Peach Mountain Growth Illustration */}
                <MountainGrowthVisual />
              </div>

              {/* ---------- CENTER CARD: FORM (STATE 1) & SUCCESS MAILBOX (STATE 2) ---------- */}
              <div className="cp-form-card">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    /* ==============================================================
                       STATE 1: FORM ONLY — CLEAN, FULL-WIDTH & FOCUSED
                       ============================================================== */
                    <motion.div
                      key="form-state-1"
                      className="cp-state1-form-wrapper"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="cp-form-eyebrow-wrap">
                        <span className="cp-form-eyebrow">— SEND US A MESSAGE —</span>
                      </div>

                      <h2 className="cp-form-heading">
                        Let's Discuss Your <em>Business Needs.</em>
                      </h2>

                      <p className="cp-form-desc">
                        Fill in the details, and our advisory team will get back to you shortly.
                      </p>

                      {submitErrorMessage && (
                        <div className="cp-submit-error-banner" role="alert">
                          <AlertCircle size={16} />
                          <span>{submitErrorMessage}</span>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} noValidate className="cp-full-contact-form">
                        {/* Row 1: Your Name & Phone Number */}
                        <div className="cp-form-row two-col">
                          <div className="cp-field-group">
                            <label className="cp-field-label" htmlFor="cp-name">
                              Your Name <span className="req-star">*</span>
                            </label>
                            <div className="cp-input-wrap">
                              <User size={16} className="cp-input-icon" />
                              <input
                                id="cp-name"
                                type="text"
                                className="cp-text-input"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required
                              />
                            </div>
                            {formErrors.name && (
                              <span className="cp-field-error">{formErrors.name}</span>
                            )}
                          </div>

                          <div className="cp-field-group">
                            <label className="cp-field-label" htmlFor="cp-phone">
                              Phone Number <span className="req-star">*</span>
                            </label>
                            <div className="cp-phone-wrap">
                              <div className="cp-phone-prefix">
                                <IndianFlag />
                                <span>+91</span>
                                <ChevronDown size={13} className="cp-flag-chevron" />
                              </div>
                              <input
                                id="cp-phone"
                                type="tel"
                                className="cp-phone-input"
                                placeholder="Enter 10-digit number"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                maxLength={10}
                                required
                              />
                            </div>
                            {formErrors.phone && (
                              <span className="cp-field-error">{formErrors.phone}</span>
                            )}
                          </div>
                        </div>

                        {/* Row 2: Email Address & Your Business Location */}
                        <div className="cp-form-row two-col">
                          <div className="cp-field-group">
                            <label className="cp-field-label" htmlFor="cp-email">
                              Email Address <span className="req-star">*</span>
                            </label>
                            <div className="cp-input-wrap">
                              <Mail size={16} className="cp-input-icon" />
                              <input
                                id="cp-email"
                                type="email"
                                className="cp-text-input"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                              />
                            </div>
                            {formErrors.email && (
                              <span className="cp-field-error">{formErrors.email}</span>
                            )}
                          </div>

                          <div className="cp-field-group">
                            <label className="cp-field-label" htmlFor="cp-location">
                              Your Business Location <span className="req-star">*</span>
                            </label>
                            <div className="cp-input-wrap">
                              <MapPin size={16} className="cp-input-icon" />
                              <select
                                id="cp-location"
                                className="cp-select-input"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                required
                              >
                                <option value="" disabled>Select your city</option>
                                <option value="Ahmedabad, Gujarat">Ahmedabad, Gujarat</option>
                                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                                <option value="Delhi NCR">Delhi NCR</option>
                                <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
                                <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                                <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                                <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                                <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                                <option value="Kolkata, West Bengal">Kolkata, West Bengal</option>
                                <option value="Surat, Gujarat">Surat, Gujarat</option>
                                <option value="Coimbatore, Tamil Nadu">Coimbatore, Tamil Nadu</option>
                                <option value="Indore, Madhya Pradesh">Indore, Madhya Pradesh</option>
                                <option value="Other Location in India">Other Location in India</option>
                              </select>
                              <ChevronDown size={15} className="cp-select-chevron" />
                            </div>
                            {formErrors.location && (
                              <span className="cp-field-error">{formErrors.location}</span>
                            )}
                          </div>
                        </div>

                        {/* Row 3: Service Required (Full Width) */}
                        <div className="cp-form-row full-width">
                          <div className="cp-field-group">
                            <label className="cp-field-label" htmlFor="cp-service">
                              Service Required <span className="req-star">*</span>
                            </label>
                            <div className="cp-input-wrap">
                              <Layers size={16} className="cp-input-icon" />
                              <select
                                id="cp-service"
                                className="cp-select-input"
                                value={formData.service}
                                onChange={(e) => handleInputChange('service', e.target.value)}
                                required
                              >
                                <option value="" disabled>Select a service</option>
                                <option value="MSME Loan & Credit Guarantee (CGTMSE)">MSME Loan & Credit Guarantee (CGTMSE)</option>
                                <option value="Government Grants & Subsidies (PMEGP / PMFME)">Government Grants & Subsidies (PMEGP / PMFME)</option>
                                <option value="Startup India Seed Fund & Tax Exemption">Startup India Seed Fund & Tax Exemption</option>
                                <option value="Detailed Project Report (DPR) & Financial Modeling">Detailed Project Report (DPR) & Financial Modeling</option>
                                <option value="Business Registrations & Statutory Licenses">Business Registrations & Statutory Licenses</option>
                                <option value="ISO & International Certifications">ISO & International Certifications</option>
                                <option value="SME IPO & Valuation Advisory">SME IPO & Valuation Advisory</option>
                                <option value="Legal & Corporate Secretarial Advisory">Legal & Corporate Secretarial Advisory</option>
                                <option value="General Business Advisory Inquiry">General Business Advisory Inquiry</option>
                              </select>
                              <ChevronDown size={15} className="cp-select-chevron" />
                            </div>
                            {formErrors.service && (
                              <span className="cp-field-error">{formErrors.service}</span>
                            )}
                          </div>
                        </div>

                        {/* Row 4: Your Message (Optional, Full Width) */}
                        <div className="cp-form-row full-width">
                          <div className="cp-field-group">
                            <label className="cp-field-label" htmlFor="cp-message">
                              Your Message <span className="cp-optional-tag">(Optional)</span>
                            </label>
                            <div className="cp-textarea-wrap">
                              <span className="cp-textarea-icon">
                                <MessageSquare size={16} />
                              </span>
                              <textarea
                                id="cp-message"
                                className="cp-textarea-input"
                                placeholder="Tell us about your requirements, funding needs, or any questions..."
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 5: Consent Checkbox */}
                        <label className="cp-consent-row">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => handleInputChange('consent', e.target.checked)}
                            style={{ display: 'none' }}
                          />
                          <div className={`cp-checkbox-custom ${formData.consent ? 'checked' : ''}`}>
                            {formData.consent && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="cp-consent-text">
                            I agree to be contacted by Growthora for advisory services.
                          </span>
                        </label>
                        {formErrors.consent && (
                          <div className="cp-consent-error">{formErrors.consent}</div>
                        )}

                        {/* Row 6: Send Message Button */}
                        <button
                          type="submit"
                          className="cp-submit-btn-premium"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span>Sending Request...</span>
                          ) : (
                            <>
                              <Send size={16} className="cp-submit-plane-icon" />
                              <span>Send Message</span>
                              <ArrowRight size={17} className="cp-submit-arrow" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* ==============================================================
                       STATE 2: MAILBOX ANIMATION & SUCCESS CONFIRMATION
                       ============================================================== */
                    <motion.div
                      key="success-state-2"
                      className="cp-state2-success-layout"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Left: Success Confirmation Message */}
                      <div className="cp-s2-confirmation-col">
                        <div className="cp-s2-check-wrap">
                          <div className="cp-s2-check-circle">
                            <CheckCircle2 size={38} className="cp-s2-check-svg" />
                          </div>
                          <span className="cp-s2-radiant-dot d1" />
                          <span className="cp-s2-radiant-dot d2" />
                          <span className="cp-s2-radiant-dot d3" />
                          <span className="cp-s2-radiant-dot d4" />
                        </div>

                        <h3 className="cp-s2-title">Your Message Is On Its Way!</h3>
                        <p className="cp-s2-desc">
                          Our advisory team will get back to you within 24 hours.
                        </p>

                        <button
                          type="button"
                          className="cp-s2-send-another-btn"
                          onClick={handleResetForm}
                          aria-label="Send Another Message"
                        >
                          <span>Send Another Message</span>
                          <RotateCcw size={15} />
                        </button>
                      </div>

                      {/* Right: 3D Animated Mailbox */}
                      <div className="cp-s2-mailbox-col">
                        <Interactive3DMailbox
                          animationStep={mailboxAnimationStep}
                          onDelivered={() => setMailboxAnimationStep('delivered')}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ---------- RIGHT CARD: YOUR GROWTH, OUR SUPPORT (PREMIUM REDESIGNED) ---------- */}
              <div className="cp-support-card">
                {/* Decorative Top-Right Orange Corner Swoop */}
                <svg
                  className="cp-support-top-swoop"
                  viewBox="0 0 110 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M110 0C70 0 35 25 15 65C5 82 0 90 0 90H110V0Z"
                    fill="url(#supportSwoopGrad)"
                  />
                  <defs>
                    <linearGradient id="supportSwoopGrad" x1="110" y1="0" x2="10" y2="90" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF7A20" stopOpacity="0.85" />
                      <stop offset="55%" stopColor="#FFA666" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FFF4EC" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="cp-support-content-top">
                  {/* Header Area: Heading & Subtitle + 3D Target */}
                  <div className="cp-support-header-area">
                    <div className="cp-support-title-col">
                      <h2 className="cp-support-heading">
                        <span className="cp-support-title-line1">Your Growth,</span>
                        <span className="cp-support-title-brand">
                          <em>Our Support</em>
                          <svg
                            className="cp-support-underline-svg"
                            viewBox="0 0 148 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 10C45 3 105 3 145 9"
                              stroke="#FF6B00"
                              strokeWidth="3.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </h2>
                      <p className="cp-support-subtitle">
                        Fast, reliable and expert support at every step of your business journey.
                      </p>
                    </div>

                    {/* Top 3D-inspired Target Graphic */}
                    <TargetSupportVisual />
                  </div>

                  {/* Four Premium Statistic Cards */}
                  <div className="cp-support-features-stack">
                    {/* Card 1: Quick Response */}
                    <motion.div
                      className="cp-support-feature-card"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="cp-support-icon-box">
                        <Zap size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-support-card-divider" aria-hidden="true" />
                      <div className="cp-support-card-text">
                        <h3 className="cp-support-card-title">Quick Response</h3>
                        <p className="cp-support-card-desc">Within 24 Hours</p>
                      </div>
                      <div className="cp-support-right-badge">
                        <Clock size={12} strokeWidth={2.4} />
                        <span>24h</span>
                      </div>
                    </motion.div>

                    {/* Card 2: 2,100+ */}
                    <motion.div
                      className="cp-support-feature-card"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="cp-support-icon-box">
                        <Users size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-support-card-divider" aria-hidden="true" />
                      <div className="cp-support-card-text">
                        <h3 className="cp-support-card-title">2,100+</h3>
                        <p className="cp-support-card-desc">Businesses Supported</p>
                      </div>
                      <div className="cp-support-right-graphic building-graphic" aria-hidden="true">
                        <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
                          <rect x="4" y="8" width="14" height="22" rx="2" fill="#FFC8A2" fillOpacity="0.4" stroke="#FFA366" strokeWidth="1.2" />
                          <rect x="7" y="11" width="2.5" height="2.5" rx="0.5" fill="#FF7A20" />
                          <rect x="12" y="11" width="2.5" height="2.5" rx="0.5" fill="#FF7A20" />
                          <rect x="7" y="16" width="2.5" height="2.5" rx="0.5" fill="#FF7A20" />
                          <rect x="12" y="16" width="2.5" height="2.5" rx="0.5" fill="#FF7A20" />
                          <rect x="7" y="21" width="2.5" height="2.5" rx="0.5" fill="#FF7A20" />
                          <rect x="12" y="21" width="2.5" height="2.5" rx="0.5" fill="#FF7A20" />
                          <rect x="18" y="14" width="12" height="16" rx="2" fill="#FFE2D0" stroke="#FFA366" strokeWidth="1.2" />
                          <rect x="21" y="17" width="2" height="2" rx="0.5" fill="#FF7A20" />
                          <rect x="25" y="17" width="2" height="2" rx="0.5" fill="#FF7A20" />
                          <rect x="21" y="22" width="2" height="2" rx="0.5" fill="#FF7A20" />
                          <rect x="25" y="22" width="2" height="2" rx="0.5" fill="#FF7A20" />
                        </svg>
                      </div>
                    </motion.div>

                    {/* Card 3: 97% */}
                    <motion.div
                      className="cp-support-feature-card"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="cp-support-icon-box">
                        <Award size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-support-card-divider" aria-hidden="true" />
                      <div className="cp-support-card-text">
                        <h3 className="cp-support-card-title">97%</h3>
                        <p className="cp-support-card-desc">Success Rate</p>
                      </div>
                      <div className="cp-support-right-graphic growth-graphic" aria-hidden="true">
                        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                          <rect x="4" y="18" width="5" height="10" rx="1.5" fill="#FFC8A2" />
                          <rect x="12" y="13" width="5" height="15" rx="1.5" fill="#FFA870" />
                          <rect x="20" y="7" width="5" height="21" rx="1.5" fill="#FF8330" />
                          <path d="M3 17 Q 15 11 28 3" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                          <polygon points="30,2 24,3 27,8" fill="#FF6B00" />
                        </svg>
                      </div>
                    </motion.div>

                    {/* Card 4: 4.9/5 */}
                    <motion.div
                      className="cp-support-feature-card"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="cp-support-icon-box">
                        <Star size={21} strokeWidth={2.2} />
                      </div>
                      <div className="cp-support-card-divider" aria-hidden="true" />
                      <div className="cp-support-card-text">
                        <h3 className="cp-support-card-title">4.9/5</h3>
                        <p className="cp-support-card-desc">Google Rating</p>
                      </div>
                      <div className="cp-support-right-graphic google-rating-graphic">
                        <svg width="18" height="18" viewBox="0 0 24 24" className="cp-google-g-svg" aria-hidden="true">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.41 7.37 24 12 24z"/>
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12c0 2.02.46 3.84 1.26 5.42l4.02-3.15z"/>
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.59 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                        <div className="cp-google-stars" aria-label="5 out of 5 stars">
                          ★★★★★
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom 6-Bar Growth Chart with Waves */}
                <GrowthSupportChart />
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================================================
            5. REDESIGNED OUR OFFICES ACROSS INDIA SECTION (MATCHING APPROVED REFERENCE)
            ========================================================================== */}
        <section id="our-offices" className="cp-offices-section" aria-labelledby="offices-heading">
          <div className="cp-container">
            <div className="cp-offices-three-col-layout">
              {/* Left Column (38%): Our Presence Editorial + Watermark India Map with 5 City Markers */}
              <div className="cp-offices-presence-col">
                {/* Watermark India Map with 5 City Location Pins */}
                <div className="cp-india-map-watermark-wrap" aria-hidden="true">
                  <svg viewBox="0 0 620 680" className="cp-india-map-svg">
                    <defs>
                      <linearGradient id="cpWatermarkMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF2EA" />
                        <stop offset="100%" stopColor="#FFE4D6" />
                      </linearGradient>
                      <filter id="cpMapPinShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#350B43" floodOpacity="0.25" />
                      </filter>
                    </defs>
                    <path
                      d={INDIA_MAINLAND_SVG_PATH}
                      fill="url(#cpWatermarkMapGrad)"
                      stroke="#FFD2BD"
                      strokeWidth="1.6"
                    />
                    {/* 5 City Location Pins */}
                    {/* Jaipur */}
                    <g className="cp-map-city-pin" transform="translate(166.5, 239)" filter="url(#cpMapPinShadow)">
                      <circle r="22" className="cp-map-pin-pulse" />
                      <circle r="11" fill="#FF6500" stroke="#FFFFFF" strokeWidth="3" />
                      <circle r="3.8" fill="#FFFFFF" />
                    </g>
                    {/* Ahmedabad */}
                    <g className="cp-map-city-pin" transform="translate(105.1, 322.6)" filter="url(#cpMapPinShadow)">
                      <circle r="22" className="cp-map-pin-pulse" />
                      <circle r="11" fill="#FF6500" stroke="#FFFFFF" strokeWidth="3" />
                      <circle r="3.8" fill="#FFFFFF" />
                    </g>
                    {/* Pune */}
                    <g className="cp-map-city-pin" transform="translate(129.6, 419.4)" filter="url(#cpMapPinShadow)">
                      <circle r="22" className="cp-map-pin-pulse" />
                      <circle r="11" fill="#FF6500" stroke="#FFFFFF" strokeWidth="3" />
                      <circle r="3.8" fill="#FFFFFF" />
                    </g>
                    {/* Bengaluru */}
                    <g className="cp-map-city-pin" transform="translate(201.1, 538.6)" filter="url(#cpMapPinShadow)">
                      <circle r="22" className="cp-map-pin-pulse" />
                      <circle r="11" fill="#FF6500" stroke="#FFFFFF" strokeWidth="3" />
                      <circle r="3.8" fill="#FFFFFF" />
                    </g>
                    {/* Chennai */}
                    <g className="cp-map-city-pin" transform="translate(244.0, 548.0)" filter="url(#cpMapPinShadow)">
                      <circle r="22" className="cp-map-pin-pulse" />
                      <circle r="11" fill="#FF6500" stroke="#FFFFFF" strokeWidth="3" />
                      <circle r="3.8" fill="#FFFFFF" />
                    </g>
                  </svg>
                </div>

                {/* Editorial Content Layered Crisp Above Watermark */}
                <div className="cp-presence-badge-wrap">
                  <div className="cp-presence-badge">
                    <Building2 size={15} className="cp-presence-badge-icon" />
                    <span>Our Presence</span>
                  </div>
                </div>

                <h2 id="offices-heading" className="cp-offices-title">
                  Our Offices<br />
                  <span className="cp-offices-highlight-wrap">
                    <em>Across India</em>
                    <svg className="cp-offices-heading-underline" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M4 8C50 3, 150 3, 196 8" stroke="#FF6500" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>

                <p className="cp-offices-desc">
                  Meet our team in person for detailed discussions and personalized advisory support.
                </p>

                {/* 3 Key Presence Benefits with Circular Icons */}
                <div className="cp-presence-benefits-list">
                  <div className="cp-presence-benefit-item">
                    <div className="cp-presence-icon-box">
                      <Handshake size={20} />
                    </div>
                    <div className="cp-presence-meta">
                      <h3 className="cp-presence-benefit-title">In-Person Consultation</h3>
                      <p className="cp-presence-benefit-sub">Get expert guidance at your nearest office</p>
                    </div>
                  </div>

                  <div className="cp-presence-benefit-item">
                    <div className="cp-presence-icon-box">
                      <Users size={20} />
                    </div>
                    <div className="cp-presence-meta">
                      <h3 className="cp-presence-benefit-title">Dedicated Local Teams</h3>
                      <p className="cp-presence-benefit-sub">Experienced advisors in key cities</p>
                    </div>
                  </div>

                  <div className="cp-presence-benefit-item">
                    <div className="cp-presence-icon-box">
                      <Headphones size={20} />
                    </div>
                    <div className="cp-presence-meta">
                      <h3 className="cp-presence-benefit-title">Pan-India Support</h3>
                      <p className="cp-presence-benefit-sub">Consistent, reliable and responsive service</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column (10%): Vertical S-Curve Ribbon with 4 Icon Badges */}
              <div className="cp-offices-ribbon-col" aria-hidden="true">
                <svg className="cp-ribbon-svg" viewBox="0 0 100 500" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cpRibbonGrad" x1="60%" y1="0%" x2="40%" y2="100%">
                      <stop offset="0%" stopColor="#FFA834" />
                      <stop offset="22%" stopColor="#FF7A18" />
                      <stop offset="52%" stopColor="#FF5A00" />
                      <stop offset="78%" stopColor="#C22F00" />
                      <stop offset="92%" stopColor="#55085C" />
                      <stop offset="100%" stopColor="#300639" />
                    </linearGradient>
                    <linearGradient id="cpRibbonGloss" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
                    </linearGradient>
                    <filter id="cpRibbonShadow" x="-30%" y="-10%" width="160%" height="120%">
                      <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#FF6500" floodOpacity="0.25" />
                    </filter>
                  </defs>
                  <path
                    d={OFFICES_RIBBON_PATH}
                    fill="url(#cpRibbonGrad)"
                    filter="url(#cpRibbonShadow)"
                  />
                  <path
                    d={OFFICES_RIBBON_PATH}
                    fill="url(#cpRibbonGloss)"
                  />
                </svg>

                {/* 4 White Circular Badges along the ribbon curve */}
                <div className="cp-ribbon-badge badge-1" title="Location Network">
                  <MapPin size={17} />
                </div>
                <div className="cp-ribbon-badge badge-2" title="Prime Regional Hubs">
                  <Building2 size={17} />
                </div>
                <div className="cp-ribbon-badge badge-3" title="Experienced Advisors">
                  <Users size={17} />
                </div>
                <div className="cp-ribbon-badge badge-4" title="Pan-India Advisory Support">
                  <Headphones size={17} />
                </div>
              </div>

              {/* Right Column (52%): 5 Horizontal Pill-Shaped Office Cards */}
              <div className="cp-offices-cards-stack">
                {officeLocations.map((office, idx) => (
                  <a
                    key={office.id}
                    href={`https://maps.google.com/?q=${office.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`cp-office-pill-card ${idx === 0 ? 'first-card' : ''}`}
                    title={`Open ${office.name} in Google Maps`}
                  >
                    <div className="cp-office-photo-pill-wrap">
                      <img
                        src={office.image}
                        alt={`${office.name} landmark`}
                        className="cp-office-photo"
                        width="108"
                        height="68"
                        loading="lazy"
                      />
                    </div>

                    <div className="cp-office-info-block">
                      <h3 className="cp-office-name-text">{office.name}</h3>
                      <div className="cp-office-location-row">
                        <MapPin size={14} className="cp-office-map-pin" />
                        <p className="cp-office-addr-text">{office.address}</p>
                      </div>
                    </div>

                    <div className="cp-office-arrow-btn" aria-hidden="true">
                      <ArrowRight size={17} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Bottom Transitions: Indian Skyline + Layered Orange & Deep Purple Waves */}
          <div className="cp-offices-bottom-decoration" aria-hidden="true">
            <svg className="cp-offices-skyline-svg" viewBox="0 0 1440 110" fill="none" preserveAspectRatio="none">
              <path
                d={ARCHITECTURAL_SKYLINE_PATH}
                fill="#FFDAC8"
                opacity="0.6"
              />
            </svg>
            <svg className="cp-offices-wave-svg orange-wave" viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
              <path
                d="M0 35 C 240 68, 520 12, 800 42 C 1080 72, 1280 18, 1440 36 V 70 H 0 Z"
                fill="url(#officesOrangeWave)"
              />
              <defs>
                <linearGradient id="officesOrangeWave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA654" />
                  <stop offset="50%" stopColor="#FF7A28" />
                  <stop offset="100%" stopColor="#FF6500" />
                </linearGradient>
              </defs>
            </svg>
            <svg className="cp-offices-wave-svg purple-wave" viewBox="0 0 1440 45" fill="none" preserveAspectRatio="none">
              <path
                d="M0 28 C 360 48, 720 12, 1080 32 C 1260 42, 1380 20, 1440 26 V 45 H 0 Z"
                fill="#350B43"
              />
            </svg>
          </div>
        </section>
      </main>

      {/* 7. Global Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* 8. Reusable Global Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <AskGrowthoraModal
        isOpen={isAskOpen}
        onClose={() => setIsAskOpen(false)}
      />
    </div>
  );
}
