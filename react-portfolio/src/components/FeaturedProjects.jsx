import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdArrowOutward, MdCode } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.fp-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-header', start: 'top 85%' },
      });

      gsap.from('.fp-card', {
        opacity: 0, y: 50, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-grid', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="section-divider" />
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="fp-header section-header">
          <p className="section-label">Featured Projects</p>
          <h2 className="section-heading">
            <span className="accent">Featured</span> Work
          </h2>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            A selection of projects I&apos;ve built — each one a learning experience and a step forward.
          </p>
        </div>

        <div className="fp-grid">
          {projects.map((project) => (
            <article key={project.id} className="fp-card card">
              {/* Image */}
              <div className="fp-card-img-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="fp-card-img"
                  loading="lazy"
                />
                <div className="fp-card-img-overlay">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fp-overlay-btn"
                    id={`fp-live-${project.id}`}
                    aria-label={`View live demo of ${project.title}`}
                  >
                    Live Demo <MdArrowOutward />
                  </a>
                </div>
                <span className="fp-category">{project.category}</span>
              </div>

              {/* Info */}
              <div className="fp-card-body">
                <h3 className="fp-card-title">{project.title}</h3>
                <p className="fp-card-desc">{project.description}</p>

                <div className="fp-card-tech">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                <div className="fp-card-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline fp-btn"
                    id={`fp-github-${project.id}`}
                    aria-label={`View GitHub for ${project.title}`}
                  >
                    <SiGithub /> GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary fp-btn"
                    id={`fp-demo-${project.id}`}
                    aria-label={`View live demo of ${project.title}`}
                  >
                    Live Demo <MdArrowOutward />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .fp-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .fp-card:hover {
          transform: translateY(-6px);
        }

        /* ── Image ── */
        .fp-card-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .fp-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .fp-card:hover .fp-card-img {
          transform: scale(1.06);
        }

        .fp-card-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 20, 25, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .fp-card:hover .fp-card-img-overlay {
          opacity: 1;
        }

        .fp-overlay-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          background: var(--accent-orange);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          transform: translateY(8px);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .fp-card:hover .fp-overlay-btn {
          transform: translateY(0);
        }

        .fp-category {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(15, 20, 25, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          padding: 0.2rem 0.6rem;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-blue);
        }

        /* ── Body ── */
        .fp-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .fp-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          transition: color 0.2s ease;
        }

        .fp-card:hover .fp-card-title {
          color: var(--accent-orange);
        }

        .fp-card-desc {
          font-size: 0.84rem;
          color: var(--text-secondary);
          line-height: 1.7;
          flex: 1;
        }

        .fp-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .fp-card-actions {
          display: flex;
          gap: 0.6rem;
          padding-top: 0.25rem;
        }

        .fp-btn {
          flex: 1;
          justify-content: center;
          padding: 0.55rem 0.75rem;
          font-size: 0.8rem;
        }

        @media (max-width: 900px) {
          .fp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .fp-grid {
            grid-template-columns: 1fr;
          }
          .fp-card-img-wrap {
            height: 180px;
          }
        }
      `}</style>
    </section>
  );
}
