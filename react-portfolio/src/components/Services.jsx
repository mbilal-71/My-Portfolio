import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MdOutlineDesktopWindows,
  MdOutlineStorage,
  MdOutlineCode,
  MdOutlinePalette,
  MdOutlineAutoAwesome,
} from 'react-icons/md';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  MdOutlineDesktopWindows: MdOutlineDesktopWindows,
  MdOutlineStorage: MdOutlineStorage,
  MdOutlineCode: MdOutlineCode,
  MdOutlinePalette: MdOutlinePalette,
  MdOutlineAutoAwesome: MdOutlineAutoAwesome,
};

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.services-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-header', start: 'top 85%' },
      });

      gsap.from('.service-card', {
        opacity: 0, y: 50, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section" ref={sectionRef}>
      <div className="section-divider" />
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="services-header section-header">
          <p className="section-label">What I Build</p>
          <h2 className="section-heading">
            Services &amp; <span className="accent">Expertise</span>
          </h2>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            From pixel-perfect frontends to scalable backends — here&apos;s what I bring to every project.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className="service-card card">
                <div className="service-number">{service.number}</div>
                <div className="service-icon-wrap">
                  {Icon && <Icon />}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-arrow">→</div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .service-card {
          position: relative;
          overflow: hidden;
          cursor: default;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-orange), var(--accent-blue));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-number {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .service-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--accent-orange-dim);
          border: 1px solid var(--accent-orange-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: var(--accent-orange);
          margin-bottom: 1.25rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon-wrap {
          background: var(--accent-orange);
          color: #fff;
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 8px 20px rgba(230, 126, 80, 0.3);
        }

        .service-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .service-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.75;
          flex: 1;
        }

        .service-arrow {
          margin-top: 1.25rem;
          font-size: 1.1rem;
          color: var(--accent-orange);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
        }

        .service-card:hover .service-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
