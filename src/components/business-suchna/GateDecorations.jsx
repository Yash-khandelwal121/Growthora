import React from 'react';

/**
 * GateDecorations — High-fidelity botanical arch greenery, potted plants,
 * and realistic ground ambience matching Reference Image 2.
 */
export default function GateDecorations() {
  return (
    <>
      {/* ─── Arch Vines & Greenery ─── */}
      <div className="premium-gate__greenery-wrapper" aria-hidden="true">
        <svg
          className="premium-gate__greenery-svg"
          viewBox="0 0 720 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pgBranchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2E2318" />
              <stop offset="50%" stopColor="#4A3B29" />
              <stop offset="100%" stopColor="#2E2318" />
            </linearGradient>
            
            <linearGradient id="pgLeafDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#436B2B" />
              <stop offset="50%" stopColor="#2D4C1D" />
              <stop offset="100%" stopColor="#1B3310" />
            </linearGradient>
            
            <linearGradient id="pgLeafMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C9742" />
              <stop offset="50%" stopColor="#49752A" />
              <stop offset="100%" stopColor="#2B4917" />
            </linearGradient>
            
            <linearGradient id="pgLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8EBD5B" />
              <stop offset="60%" stopColor="#649439" />
              <stop offset="100%" stopColor="#3C651F" />
            </linearGradient>

            <filter id="pgLeafShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#12260B" floodOpacity="0.32" />
            </filter>
          </defs>

          <g filter="url(#pgLeafShadow)">
            {/* Primary Arch Wood Vines */}
            <path
              d="M 45 270 C 65 140, 160 22, 360 18 C 560 22, 655 140, 675 270"
              stroke="url(#pgBranchGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 58 250 C 95 110, 185 36, 360 32 C 535 36, 625 110, 662 250"
              stroke="url(#pgBranchGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 85 210 C 130 90, 220 48, 360 46 C 500 48, 590 90, 635 210"
              stroke="url(#pgBranchGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Arch Clusters (Varied natural ovate leaves with realistic angles) */}
            {/* Lower-left cluster */}
            <path d="M 46 250 C 20 238, 22 214, 46 220 C 68 226, 62 255, 46 250 Z" fill="url(#pgLeafDark)" />
            <path d="M 52 230 C 28 214, 34 192, 54 204 C 74 216, 68 244, 52 230 Z" fill="url(#pgLeafMid)" />
            <path d="M 64 210 C 38 190, 48 168, 70 180 C 92 192, 84 222, 64 210 Z" fill="url(#pgLeafLight)" />
            <path d="M 78 185 C 50 160, 64 138, 88 152 C 110 165, 102 195, 78 185 Z" fill="url(#pgLeafDark)" />
            
            {/* Mid-left cluster */}
            <path d="M 98 160 C 68 132, 85 110, 110 125 C 132 140, 122 172, 98 160 Z" fill="url(#pgLeafMid)" />
            <path d="M 120 135 C 92 105, 114 84, 138 100 C 160 115, 148 148, 120 135 Z" fill="url(#pgLeafLight)" />
            <path d="M 148 112 C 122 80, 148 60, 172 78 C 194 94, 178 126, 148 112 Z" fill="url(#pgLeafDark)" />
            <path d="M 180 90 C 155 58, 184 40, 206 58 C 226 74, 210 105, 180 90 Z" fill="url(#pgLeafMid)" />

            {/* Upper-left cluster */}
            <path d="M 218 72 C 195 40, 226 22, 248 40 C 268 56, 250 86, 218 72 Z" fill="url(#pgLeafLight)" />
            <path d="M 260 56 C 240 24, 272 10, 292 28 C 310 44, 292 72, 260 56 Z" fill="url(#pgLeafDark)" />
            <path d="M 305 44 C 288 14, 320 2, 338 20 C 354 36, 334 60, 305 44 Z" fill="url(#pgLeafMid)" />

            {/* Keystone / Apex Central Lush Canopy */}
            <path d="M 360 38 C 340 4, 380 4, 360 38 Z" fill="url(#pgLeafLight)" />
            <path d="M 338 42 C 318 12, 354 10, 345 36 Z" fill="url(#pgLeafDark)" />
            <path d="M 382 42 C 402 12, 366 10, 375 36 Z" fill="url(#pgLeafMid)" />
            <path d="M 358 24 C 335 -4, 385 -4, 358 24 Z" fill="url(#pgLeafLight)" />
            <path d="M 325 50 C 305 22, 342 16, 334 44 Z" fill="url(#pgLeafMid)" />
            <path d="M 395 50 C 415 22, 378 16, 386 44 Z" fill="url(#pgLeafDark)" />

            {/* Upper-right cluster */}
            <path d="M 415 44 C 432 14, 400 2, 382 20 C 366 36, 386 60, 415 44 Z" fill="url(#pgLeafMid)" />
            <path d="M 460 56 C 480 24, 448 10, 428 28 C 410 44, 428 72, 460 56 Z" fill="url(#pgLeafDark)" />
            <path d="M 502 72 C 525 40, 494 22, 472 40 C 452 56, 470 86, 502 72 Z" fill="url(#pgLeafLight)" />

            {/* Mid-right cluster */}
            <path d="M 540 90 C 565 58, 536 40, 514 58 C 494 74, 510 105, 540 90 Z" fill="url(#pgLeafMid)" />
            <path d="M 572 112 C 598 80, 572 60, 548 78 C 526 94, 542 126, 572 112 Z" fill="url(#pgLeafDark)" />
            <path d="M 600 135 C 628 105, 606 84, 582 100 C 560 115, 572 148, 600 135 Z" fill="url(#pgLeafLight)" />
            <path d="M 622 160 C 652 132, 635 110, 610 125 C 588 140, 598 172, 622 160 Z" fill="url(#pgLeafMid)" />

            {/* Lower-right cluster */}
            <path d="M 642 185 C 670 160, 656 138, 632 152 C 610 165, 618 195, 642 185 Z" fill="url(#pgLeafDark)" />
            <path d="M 656 210 C 682 190, 672 168, 650 180 C 628 192, 636 222, 656 210 Z" fill="url(#pgLeafLight)" />
            <path d="M 668 230 C 692 214, 686 192, 666 204 C 646 216, 652 244, 668 230 Z" fill="url(#pgLeafMid)" />
            <path d="M 674 250 C 700 238, 698 214, 674 220 C 652 226, 658 255, 674 250 Z" fill="url(#pgLeafDark)" />

            {/* Trailing Tendrils & Miniature Hanging Shoots */}
            <path d="M 115 155 Q 105 185 118 205" stroke="url(#pgBranchGrad)" strokeWidth="1.8" fill="none" />
            <path d="M 118 205 C 110 215, 126 218, 122 208 Z" fill="url(#pgLeafLight)" />
            
            <path d="M 195 95 Q 188 125 198 145" stroke="url(#pgBranchGrad)" strokeWidth="1.6" fill="none" />
            <path d="M 198 145 C 190 155, 206 158, 202 148 Z" fill="url(#pgLeafMid)" />

            <path d="M 525 95 Q 532 125 522 145" stroke="url(#pgBranchGrad)" strokeWidth="1.6" fill="none" />
            <path d="M 522 145 C 530 155, 514 158, 518 148 Z" fill="url(#pgLeafMid)" />

            <path d="M 605 155 Q 615 185 602 205" stroke="url(#pgBranchGrad)" strokeWidth="1.8" fill="none" />
            <path d="M 602 205 C 610 215, 594 218, 598 208 Z" fill="url(#pgLeafLight)" />
          </g>
        </svg>
      </div>

      {/* ─── Flanking Ceramic Potted Plants at Ground Level ─── */}
      <div className="premium-gate__ground-flankers" aria-hidden="true">
        {/* Left Plant */}
        <div className="premium-planter planter-left">
          <div className="planter-leaves">
            <span className="foliage-leaf fl-1" />
            <span className="foliage-leaf fl-2" />
            <span className="foliage-leaf fl-3" />
            <span className="foliage-leaf fl-4" />
            <span className="foliage-leaf fl-5" />
          </div>
          <div className="ceramic-urn" />
        </div>

        {/* Right Plant */}
        <div className="premium-planter planter-right">
          <div className="planter-leaves">
            <span className="foliage-leaf fl-1" />
            <span className="foliage-leaf fl-2" />
            <span className="foliage-leaf fl-3" />
            <span className="foliage-leaf fl-4" />
            <span className="foliage-leaf fl-5" />
          </div>
          <div className="ceramic-urn" />
        </div>

        {/* Glossy Floor Soft Reflection */}
        <div className="premium-floor-reflection" />
      </div>
    </>
  );
}

