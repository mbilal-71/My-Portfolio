import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

/* ── Service icons ─────────────────────────────────────── */
const ServiceIcons = {
  frontend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  backend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10a1.5 1.5 0 0 0 1.5-1.5c0-.4-.15-.77-.42-1.04-.26-.27-.43-.64-.43-1.05 0-.83.67-1.5 1.5-1.5h1.92c3.55 0 6.43-2.88 6.43-6.43C22 6.48 17.52 2 12 2z" />
      <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
};

/* ── Card accent colors per service ───────────────────── */
const cardColors = [
  { color: '#3cdefb', bg: 'rgba(60,222,251,0.08)', border: 'rgba(60,222,251,0.22)' },
  { color: '#60A5FA', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
  { color: '#F472B6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.2)' },
  { color: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.svc-hdr', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.svc-hdr', start: 'top 88%' },
      });
      gsap.from('.svc-card', {
        opacity: 0, y: 28, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.svc-grid', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="section-spacing"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="svc-hdr mb-12 sm:mb-14">
          <p className="section-label mb-3">Services</p>
          <h2 className="section-heading">
            What I <span className="accent">Deliver</span>
          </h2>
          <p className="section-desc mt-3 max-w-lg">
            From pixel-perfect frontends to scalable backends and AI-powered systems — here's what I bring to every project.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div className="svc-grid grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {services.map((s, i) => {
            const { color, bg, border } = cardColors[i] || cardColors[0];
            const Icon = ServiceIcons[s.icon];
            return (
              <div
                key={s.id}
                className="svc-card card relative overflow-hidden group cursor-default flex flex-col justify-between gap-5 h-full"
              >
                {/* Top accent line — reveals on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />

                <div className="flex flex-col gap-4">
                  {/* Top row: Number + Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg] flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}`, color }}
                    >
                      {Icon}
                    </div>
                    <span
                      className="text-[0.68rem] font-bold uppercase tracking-[0.22em]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {s.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-lg sm:text-xl font-bold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {s.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[0.65rem] font-semibold"
                      style={{
                        background: bg,
                        border: `1px solid ${border}`,
                        color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
