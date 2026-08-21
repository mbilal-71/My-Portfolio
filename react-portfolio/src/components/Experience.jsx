import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdOutlineWork, MdOutlineCalendarToday, MdArrowOutward } from 'react-icons/md';
import { experience } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.exp-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-header', start: 'top 85%' },
      });

      gsap.from('.exp-card', {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="section-divider" />
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="exp-header section-header">
          <p className="section-label">Where I Worked</p>
          <h2 className="section-heading">
            Work <span className="accent">Experience</span>
          </h2>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            My professional journey — hands-on experience building real-world applications.
          </p>
        </div>

        <div className="exp-timeline">
          {experience.map((item) => (
            <div key={item.id} className="exp-card card">
              <div className="exp-card-header">
                <div className="exp-icon-wrap">
                  <MdOutlineWork />
                </div>
                <div className="exp-header-text">
                  <h3 className="exp-role">{item.role}</h3>
                  <p className="exp-company">{item.company}</p>
                </div>
                <div className="exp-duration">
                  <MdOutlineCalendarToday className="exp-cal-icon" />
                  {item.duration}
                </div>
              </div>

              <p className="exp-desc">{item.description}</p>

              <div className="exp-tech">
                {item.technologies.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>

              <div className="exp-type-badge">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
        }

        .exp-card {
          position: relative;
          overflow: visible;
        }

        .exp-card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .exp-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--accent-orange-dim);
          border: 1px solid var(--accent-orange-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--accent-orange);
          flex-shrink: 0;
        }

        .exp-header-text {
          flex: 1;
        }

        .exp-role {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .exp-company {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--accent-orange);
        }

        .exp-duration {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
          white-space: nowrap;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 9999px;
          padding: 0.35rem 0.75rem;
          flex-shrink: 0;
        }

        .exp-cal-icon {
          font-size: 0.9rem;
        }

        .exp-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 1rem;
          padding-left: calc(44px + 1rem);
        }

        .exp-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding-left: calc(44px + 1rem);
        }

        .exp-type-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-blue);
          background: var(--accent-blue-dim);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 9999px;
          padding: 0.2rem 0.65rem;
        }

        @media (max-width: 640px) {
          .exp-card-header {
            flex-wrap: wrap;
          }
          .exp-duration {
            margin-left: calc(44px + 1rem);
          }
          .exp-desc,
          .exp-tech {
            padding-left: 0;
          }
          .exp-type-badge {
            position: static;
            margin-top: 1rem;
            width: fit-content;
          }
        }
      `}</style>
    </section>
  );
}
