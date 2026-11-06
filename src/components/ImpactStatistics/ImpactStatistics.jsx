import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Handshake, Target, Layers } from 'lucide-react';

// Exact statistics data matching specifications
const STATS_DATA = [
  {
    id: 'empowered',
    icon: Users,
    target: 2173,
    startValue: 0,
    label: 'Businesses Empowered',
    format: (val, isFinal) => {
      if (isFinal) return '2,173+';
      const rounded = Math.round(val);
      return rounded === 0 ? '0' : `${rounded.toLocaleString('en-IN')}+`;
    },
  },
  {
    id: 'funding',
    icon: Handshake,
    target: 43,
    startValue: 0,
    label: 'Funding Facilitated',
    format: (val, isFinal) => {
      if (isFinal) return '₹43 Cr+';
      const rounded = Math.round(val);
      return rounded === 0 ? '₹0' : `₹${rounded} Cr+`;
    },
  },
  {
    id: 'success',
    icon: Target,
    target: 97,
    startValue: 0,
    label: 'Funding Success Rate',
    format: (val, isFinal) => {
      if (isFinal) return '97%';
      const rounded = Math.round(val);
      return `${rounded}%`;
    },
  },
  {
    id: 'industries',
    icon: Layers,
    target: 12,
    startValue: 0,
    label: 'Industries Served',
    format: (val, isFinal) => {
      if (isFinal) return '12+';
      const rounded = Math.round(val);
      return rounded === 0 ? '0' : `${rounded}+`;
    },
  },
];

function StatItem({ stat, isStarted }) {
  const Icon = stat.icon;
  // Initialize with the starting value representation
  const [displayValue, setDisplayValue] = useState(() => stat.format(stat.startValue, false));

  useEffect(() => {
    if (!isStarted) return;

    let startTime = null;
    let animId = null;
    const duration = 1800; // 1.8 seconds smooth count-up

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic bezier easeOutQuart deceleration: starts briskly, decelerates gracefully
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = stat.startValue + (stat.target - stat.startValue) * easeProgress;

      if (progress < 1) {
        setDisplayValue(stat.format(current, false));
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(stat.format(stat.target, true));
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isStarted, stat]);

  return (
    <div className="s2-stat-item">
      <div className="s2-stat-icon-wrapper" aria-hidden="true">
        <Icon size={30} strokeWidth={2.2} />
      </div>
      <div className="s2-stat-text">
        <div className="s2-stat-value">{displayValue}</div>
        <div className="s2-stat-label">{stat.label}</div>
      </div>
    </div>
  );
}

export function ImpactStatistics() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  return (
    <section className="s2-stats-section" aria-label="Our Impact in Numbers">
      {/* 1. SECTION HEADING */}
      <motion.div
        className="s2-stats-header"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="s2-stats-eyebrow">
          <span className="s2-stats-eyebrow-line" />
          <span>OUR IMPACT IN NUMBERS</span>
          <span className="s2-stats-eyebrow-line" />
        </div>
        <h2 className="s2-stats-title">
          Empowering Businesses. Enabling Growth. Delivering Results.
        </h2>
      </motion.div>

      {/* 2. & 3. MAIN STATISTICS CARD DESIGN */}
      <motion.div
        ref={containerRef}
        className="s2-stats-container"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {STATS_DATA.map((stat) => (
          <StatItem key={stat.id} stat={stat} isStarted={isInView} />
        ))}
      </motion.div>
    </section>
  );
}

export default ImpactStatistics;

