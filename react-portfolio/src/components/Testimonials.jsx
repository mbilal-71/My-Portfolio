import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Sample testimonials — PLACEHOLDER DATA ──────────────
   These are clearly marked sample testimonials.
   Replace with real client reviews when available.
   ─────────────────────────────────────────────────────── */
const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sample Client',
    role: 'Business Owner',
    rating: 5,
    text: '"Excellent work! Delivered the project on time with clean, well-structured code. Great communication throughout. Highly recommend for any web development project."',
    tags: ['Reliable', 'Clean Code', 'On Time'],
    source: 'Client · Web Project',
    isSample: true,
  },
  {
    id: 2,
    name: 'Sample Client',
    role: 'Startup Founder',
    rating: 5,
    text: '"Outstanding attention to detail and a great eye for design. Built exactly what we envisioned — responsive, fast, and beautifully crafted."',
    tags: ['Detail Oriented', 'Great Design'],
    source: 'Client · Frontend Project',
    isSample: true,
  },
];

function StarIcon({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#F9CA1C' : 'none'} stroke="#F9CA1C" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  );
}

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.test-hdr', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.test-hdr', start: 'top 88%' },
      });
      gsap.from('.test-card', {
        opacity: 0, y: 28, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.test-grid', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-spacing"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="test-hdr mb-12 sm:mb-14">
          <p className="section-label mb-3">Testimonials</p>
          <h2 className="section-heading">
            What Clients <span className="accent">say</span>
          </h2>
        </div>

        {/* 3-col grid (2 testimonial cards + 1 CTA card) */}
        <div className="test-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

          {/* Testimonial cards */}
          {SAMPLE_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="test-card card flex flex-col justify-between gap-5 relative overflow-hidden h-full"
            >
              {/* Sample label */}
              {t.isSample && (
                <div
                  className="absolute top-4 right-4 text-[0.58rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(249,202,28,0.08)',
                    border: '1px solid rgba(249,202,28,0.2)',
                    color: 'rgba(249,202,28,0.6)',
                  }}
                >
                  Sample
                </div>
              )}

              <div className="flex flex-col gap-3.5">
                {/* Stars + rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < t.rating} />
                    ))}
                  </div>
                  <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                    {t.rating}.0
                  </span>
                </div>

                {/* Quote text */}
                <p
                  className="text-sm leading-relaxed italic"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t.text}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[0.62rem] font-semibold"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                {/* Avatar placeholder */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold">{t.name}</p>
                  <p className="text-[0.62rem]" style={{ color: 'var(--text-muted)' }}>{t.source}</p>
                </div>
              </div>
            </div>
          ))}

          {/* CTA card — 3rd column */}
          <div
            className="test-card card flex flex-col items-center justify-center gap-5 text-center h-full p-8"
            style={{
              background: '#30280F',
              border: '1px solid rgba(249,202,28,0.22)',
            }}
          >
            {/* Target icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                border: '2px solid rgba(249,202,28,0.4)',
                color: 'rgba(249,202,28,0.7)',
              }}
            >
              <QuoteIcon />
            </div>
            <div>
              <p className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Real reviews coming soon
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Check out my work on GitHub
              </p>
            </div>
            <a
              href="https://github.com/mbilal-71"
              target="_blank"
              rel="noopener noreferrer"
              id="testimonials-github"
              className="btn btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
            >
              View GitHub Projects
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
