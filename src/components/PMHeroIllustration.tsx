import React from 'react';

/**
 * PMHeroIllustration
 * A lightweight inline SVG depicting PM concepts: kanban, charts, and a roadmap.
 * Designed to match the mint/sky palette used on the landing hero.
 */
type Variant = 'default' | 'duotone' | 'outline' | 'dark';

export const PMHeroIllustration: React.FC<{
  className?: string;
  variant?: Variant;
  showOKRs?: boolean;
  showBacklog?: boolean;
  showJourney?: boolean;
}> = ({ className, variant = 'default', showOKRs = true, showBacklog = true, showJourney = true }) => {
  const isDuotone = variant === 'duotone';
  const isOutline = variant === 'outline';
  const isDark = variant === 'dark';

  return (
    <svg
      className={className}
      viewBox="0 0 800 460"
      role="img"
      aria-label="Product management dashboard with kanban and charts"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isDark ? 'hsl(210 18% 16%)' : 'hsl(168 65% 58%)'} />
          <stop offset="100%" stopColor={isDark ? 'hsl(210 18% 12%)' : 'hsl(198 70% 62%)'} />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)'} />
          <stop offset="100%" stopColor={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.65)'} />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isDark ? 'hsl(160 70% 48%)' : 'hsl(142 70% 45%)'} />
          <stop offset="100%" stopColor={isDark ? 'hsl(190 70% 54%)' : 'hsl(164 70% 48%)'} />
        </linearGradient>
      </defs>

      {/* Soft background blob */}
      <rect x="0" y="0" width="800" height="460" fill="url(#bgGrad)" opacity="0.15" />

      {/* Main dashboard card */}
      <g transform="translate(60,60)">
        <rect rx="18" ry="18" width="680" height="280" fill={isOutline ? 'transparent' : 'url(#cardGrad)'} stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'} />

        {/* Top toolbar */}
        <g transform="translate(20,18)">
          <rect width="90" height="14" rx="7" fill={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'} />
          <circle cx="120" cy="7" r="7" fill={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'} />
          <circle cx="140" cy="7" r="7" fill={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'} />
          <circle cx="160" cy="7" r="7" fill={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'} />
        </g>

        {/* Kanban columns */}
        <g transform="translate(20,50)">
          {Array.from({ length: 3 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 210},0)`}>
              <rect width="190" height="190" rx="14" fill={isOutline ? 'transparent' : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} stroke={isOutline ? (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)') : 'none'} />
              <rect x="14" y="14" width="90" height="12" rx="6" fill={isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'} />
              {/* Cards */}
              <rect x="14" y="40" width="162" height="34" rx="8" fill={isDuotone ? 'hsl(198 90% 98%)' : '#fff'} stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
              <rect x="14" y="82" width="162" height="34" rx="8" fill={isDuotone ? 'hsl(168 90% 97%)' : '#fff'} stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
              <rect x="14" y="124" width="162" height="34" rx="8" fill={isDuotone ? 'hsl(164 90% 96%)' : '#fff'} stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
            </g>
          ))}
        </g>

        {/* Right analytics panel */}
        <g transform="translate(470,50)">
          <rect width="190" height="190" rx="14" fill={isOutline ? 'transparent' : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} stroke={isOutline ? (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)') : 'none'} />
          <rect x="14" y="14" width="120" height="12" rx="6" fill={isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'} />
          {/* Line chart */}
          <polyline
            points="20,150 55,120 90,140 125,90 160,110 175,80"
            fill="none"
            stroke="url(#accentGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          { [20,55,90,125,160,175].map((x, idx) => (
            <circle key={idx} cx={x} cy={[150,120,140,90,110,80][idx]} r="4" fill="url(#accentGrad)" />
          )) }
        </g>
      </g>

      {/* Optional: Roadmap (Journey) */}
      { showJourney && (
        <g transform="translate(120,360)">
          <rect rx="14" ry="14" width="560" height="70" fill={isDark ? 'rgba(255,255,255,0.06)' : '#fff'} stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
          <rect x="16" y="18" width="120" height="14" rx="7" fill={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'} />
          { [0,1,2,3].map((i) => (
            <g key={i} transform={`translate(${160 + i * 95},16)`}>
              <circle cx="0" cy="20" r="8" fill="url(#accentGrad)" />
              <rect x="14" y="12" width="60" height="16" rx="8" fill={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'} />
            </g>
          )) }
        </g>
      ) }

      {/* Optional: OKRs card */}
      { showOKRs && (
        <g transform="translate(520,18)">
          <rect width="200" height="48" rx="10" fill={isDark ? 'rgba(255,255,255,0.06)' : '#fff'} stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
          <rect x="12" y="14" width="54" height="10" rx="5" fill="url(#accentGrad)" />
          <rect x="72" y="14" width="100" height="10" rx="5" fill={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} />
          {/* Bars */}
          <rect x="12" y="30" width="60" height="6" rx="3" fill="url(#accentGrad)" />
          <rect x="78" y="30" width="36" height="6" rx="3" fill="url(#accentGrad)" opacity="0.7" />
          <rect x="120" y="30" width="46" height="6" rx="3" fill="url(#accentGrad)" opacity="0.5" />
        </g>
      ) }

      {/* Optional: Backlog sticky list */}
      { showBacklog && (
        <g transform="translate(18,24)">
          <rect width="170" height="96" rx="12" fill={isDark ? 'rgba(255,255,255,0.06)' : '#fff'} stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
          { [0,1,2].map((i) => (
            <rect key={i} x="14" y={16 + i * 26} width="140" height="14" rx="7" fill={i === 0 ? 'hsl(198 90% 96%)' : i === 1 ? 'hsl(168 90% 96%)' : 'hsl(164 90% 96%)'} />
          )) }
        </g>
      ) }

      {/* Decorative floating shapes */}
      <g opacity="0.7">
        <rect x="560" y="38" width="54" height="54" rx="12" fill="url(#accentGrad)" opacity="0.35" />
        <circle cx="742" cy="120" r="34" fill="url(#accentGrad)" opacity="0.25" />
      </g>
    </svg>
  );
};

export default PMHeroIllustration;


