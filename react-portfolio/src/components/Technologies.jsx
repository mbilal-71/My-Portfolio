import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { MdCode } from 'react-icons/md';
import { technologies } from '../data/technologies';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  SiHtml5,
  SiCss3: SiCss,         // Mapped from old name
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVisualstudiocode: MdCode,  // Fallback: no vscode icon in this version
};

const colorMap = {
  SiHtml5: '#E34F26',
  SiCss3: '#1572B6',
  SiJavascript: '#F7DF1E',
  SiReact: '#61DAFB',
  SiNodedotjs: '#339933',
  SiExpress: '#ffffff',
  SiMongodb: '#47A248',
  SiGit: '#F05032',
  SiGithub: '#ffffff',
  SiVisualstudiocode: '#007ACC',
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & Utilities',
};

export default function Technologies() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.tech-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.tech-header', start: 'top 85%' },
      });

      gsap.from('.tech-category', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.tech-grid', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technologies" className="section" ref={sectionRef}>
      <div className="section-divider" />
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="tech-header section-header">
          <p className="section-label">Tech Stack</p>
          <h2 className="section-heading">
            Technologies I <span className="accent">Work With</span>
          </h2>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            The tools and technologies I use to build modern web applications.
          </p>
        </div>

        <div className="tech-grid">
          {Object.entries(technologies).map(([category, items]) => (
            <div key={category} className="tech-category card">
              <h3 className="tech-cat-title">{categoryLabels[category]}</h3>
              <div className="tech-items">
                {items.map((tech) => {
                  const Icon = iconMap[tech.icon];
                  const color = colorMap[tech.icon];
                  return (
                    <div key={tech.name} className="tech-item" title={tech.name}>
                      {Icon && (
                        <span className="tech-item-icon" style={{ color }}>
                          <Icon />
                        </span>
                      )}
                      <span className="tech-item-name">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .tech-category {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .tech-cat-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-orange);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tech-cat-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-subtle);
        }

        .tech-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .tech-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: default;
          transition: all 0.25s ease;
        }

        .tech-item:hover {
          border-color: var(--accent-orange-border);
          color: var(--text-primary);
          background: var(--accent-orange-dim);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(230, 126, 80, 0.12);
        }

        .tech-item-icon {
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .tech-item:hover .tech-item-icon {
          transform: scale(1.15);
        }

        .tech-item-name {
          line-height: 1;
        }

        @media (max-width: 768px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
