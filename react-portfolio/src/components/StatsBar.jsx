import React from 'react';
import portfolioData from '../data/portfolioData';

/* ── Stats Bar Icons ─────────────────────────────────────── */
const ICONS = {
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  experience: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  satisfaction: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  // Backward compatibility fallbacks
  zap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

export default function StatsBar() {
  const stats = portfolioData.stats;

  return (
    <div
      className="stats-bar w-full max-w-5xl mx-auto rounded-2xl md:rounded-3xl lg:rounded-full px-5 py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-3.5 transition-all duration-300"
      style={{
        background: 'rgba(14, 14, 14, 0.88)',
        border: '1px solid rgba(249, 202, 28, 0.16)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(249, 202, 28, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 lg:gap-0">
        {stats.map((s, i) => (
          <React.Fragment key={i}>
            {/* Single Statistic Column */}
            <div
              className="stat-item flex-1 flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-3 sm:px-4 py-2 rounded-xl group cursor-default transition-all duration-300 hover:bg-white/[0.03]"
            >
              {/* Circular Icon Badge */}
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(249, 202, 28, 0.08)',
                  border: '1px solid rgba(249, 202, 28, 0.22)',
                  color: 'var(--accent)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                }}
              >
                {ICONS[s.icon] || ICONS.code}
              </div>

              {/* Number + Label (Vertically Stacked) */}
              <div className="flex flex-col justify-center min-w-0">
                <span
                  className="text-2xl sm:text-[1.65rem] lg:text-[1.75rem] font-black leading-none tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs sm:text-[0.78rem] lg:text-[0.8rem] font-medium tracking-normal text-slate-300/85 mt-1 whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>

            {/* Vertical Divider (between items on desktop) */}
            {i < stats.length - 1 && (
              <div
                className="hidden lg:block w-[1px] h-9 flex-shrink-0 self-center"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.02), rgba(249, 202, 28, 0.22), rgba(255, 255, 255, 0.02))',
                }}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
