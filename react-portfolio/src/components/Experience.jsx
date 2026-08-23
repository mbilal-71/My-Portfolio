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
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-hdr', start: 'top 87%' },
      });
      gsap.from('.exp-card', {
        opacity: 0, x: -30, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-card', start: 'top 84%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 lg:py-28"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="exp-hdr mb-14">
          <p className="section-label mb-3">Career</p>
          <h2 className="section-heading">
            Where I've <span className="accent">worked</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-6">

          {experience.map((exp) => (
            <div key={exp.id} className="flex gap-6 items-start">

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
              <div
                className="exp-card card flex-1"
                style={{ marginBottom: '0.5rem' }}
              >
                {/* Card header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <h3
                      className="text-base font-bold mb-0.5"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(249,202,28,0.08)',
                        border: '1px solid rgba(249,202,28,0.2)',
                        color: 'var(--accent)',
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="flex flex-col gap-2.5 mb-5">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="flex-shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Type tag */}
                <div>
                  <span
                    className="inline-flex px-3 py-1 rounded-full text-[0.62rem] font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(249,202,28,0.1)',
                      border: '1px solid rgba(249,202,28,0.22)',
                      color: 'var(--accent)',
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
