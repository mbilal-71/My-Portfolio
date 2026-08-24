import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techGroups } from '../data/technologies';

gsap.registerPlugin(ScrollTrigger);

export default function Technologies() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.tech-hdr', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.tech-hdr', start: 'top 88%' },
      });
      gsap.from('.tech-group', {
        opacity: 0, y: 24, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.tech-groups', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technologies"
      ref={ref}
      className="section-spacing"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="tech-hdr mb-12 sm:mb-14">
          <p className="section-label mb-3">Stack</p>
          <h2 className="section-heading">
            Technologies I <span className="accent">work with</span>
          </h2>
          <p className="section-desc mt-3 max-w-lg">
            The tools and technologies I use to craft modern, scalable web applications and AI-powered systems.
          </p>
        </div>

        {/* Groups */}
        <div className="tech-groups flex flex-col gap-8 sm:gap-10">
          {techGroups.map(({ label, items }) => (
            <div key={label} className="tech-group">
              {/* Group label */}
              <p
                className="text-[0.65rem] font-bold uppercase tracking-[0.22em] mb-3.5"
                style={{ color: 'var(--text-muted)' }}
              >
                {label}
              </p>
              {/* Pill badges */}
              <div className="flex flex-wrap gap-2.5">
                {items.map((name) => (
                  <button
                    key={name}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 cursor-default hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.09)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-border)';
                      e.currentTarget.style.background  = 'var(--accent-dim)';
                      e.currentTarget.style.color       = 'var(--accent-bright)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.color       = 'var(--text-secondary)';
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
