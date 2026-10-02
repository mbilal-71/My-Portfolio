import React from 'react';
import portfolioData from '../data/portfolioData';

/* ── Stats Bar Icons ─────────────────────────────────────── */
const ICONS = {
  code: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  users: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  experience: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  satisfaction: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  zap: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  target: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      className="stats-bar w-full max-w-[440px] sm:max-w-xl lg:max-w-5xl mx-auto lg:h-18 rounded-2xl sm:rounded-3xl lg:rounded-full px-5 py-4 sm:px-7 sm:py-4.5 lg:px-8 lg:py-0 flex items-center justify-center transition-all duration-300"
      style={{
        background: 'rgba(14, 14, 14, 0.90)',
        border: '1px solid rgba(249, 202, 28, 0.18)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(249, 202, 28, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="w-full h-full grid grid-cols-2 lg:flex lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-3 xl:gap-6">
        {stats.map((s, i) => (
          <React.Fragment key={i}>
            {/* Statistic Item */}
            <div
              className="stat-item flex-1 h-full flex items-center justify-start sm:justify-center lg:justify-center gap-3 sm:gap-3.5 lg:gap-4 px-2.5 sm:px-4 lg:px-4 xl:px-5 py-1.5 lg:py-0 rounded-xl group cursor-default transition-all duration-300 hover:bg-white/[0.02]"
            >
              {/* Circular Icon Badge */}
              <div
                className="w-11 h-11 sm:w-11 sm:h-11 lg:w-11 lg:h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(249, 202, 28, 0.08)',
                  border: '1px solid rgba(249, 202, 28, 0.22)',
                  color: 'var(--accent)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                }}
              >
                {ICONS[s.icon] || ICONS.code}
              </div>

              {/* Number + Label */}
              <div className="flex flex-col justify-center min-w-0">
                <span
                  className="text-xl sm:text-2xl lg:text-[1.65rem] font-black leading-none tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[0.72rem] sm:text-xs lg:text-[0.78rem] font-medium tracking-normal text-slate-300/85 mt-1 truncate whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>

            {/* Vertical Divider between items (Desktop Only) */}
            {i < stats.length - 1 && (
              <div
                className="hidden lg:block w-[1px] h-8 lg:h-8 flex-shrink-0 self-center opacity-80"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.02), rgba(249, 202, 28, 0.25), rgba(255, 255, 255, 0.02))',
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
