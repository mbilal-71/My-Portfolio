import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.exp-hdr', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.exp-hdr', start: 'top 88%' },
      });
      gsap.from('.exp-card', {
        opacity: 0, x: -20, duration: 0.6, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.exp-card', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="section-spacing"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="exp-hdr mb-12 sm:mb-14">
          <p className="section-label mb-3">Career</p>
          <h2 className="section-heading">
            Where I've <span className="accent">worked</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-6 lg:gap-8">

          {experience.map((exp) => (
            <div key={exp.id} className="flex gap-4 sm:gap-6 items-start">

              {/* Timeline indicator */}
              <div className="flex flex-col items-center flex-shrink-0 mt-1" style={{ width: 28 }}>
                {/* Outer ring */}
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: '2px solid var(--accent)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  {/* Inner dot */}
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                </div>
                {/* Vertical line */}
                <div
                  className="w-px flex-1 mt-2"
                  style={{ background: 'var(--border-subtle)', minHeight: 40 }}
                />
              </div>

              {/* Card */}
              <div className="exp-card card flex-1 flex flex-col justify-between gap-5">
                {/* Card header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3
                      className="text-base sm:text-lg font-bold mb-0.5"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: 'var(--accent-dim)',
                        border: '1px solid var(--accent-border)',
                        color: 'var(--accent-bright)',
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="flex flex-col gap-3">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--accent-bright)' }}
                      />
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Type tag */}
                <div className="pt-2 border-t border-white/[0.04]">
                  <span
                    className="inline-flex px-3 py-1 rounded-full text-[0.62rem] font-bold uppercase tracking-wider"
                    style={{
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--accent-bright)',
                    }}
                  >
                    {exp.tag}
                  </span>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
