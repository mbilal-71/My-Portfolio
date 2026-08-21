import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdArrowOutward, MdPlayArrow } from 'react-icons/md';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function SeeItInAction() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.sia-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.sia-header', start: 'top 85%' },
      });

      gsap.from('.sia-featured', {
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.sia-featured', start: 'top 82%' },
      });

      gsap.from('.sia-small-card', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.sia-small-grid', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = projects;

  return (
    <section id="see-in-action" className="section" ref={sectionRef}>
      <div className="section-divider" />
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="sia-header section-header">
          <p className="section-label">See It In Action</p>
          <h2 className="section-heading">
            Projects That <span className="accent">Speak</span>
          </h2>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Real projects, real results. Click to explore the live demos.
          </p>
        </div>

        {/* Featured Project */}
        <a
          href={featured.live}
          target="_blank"
          rel="noopener noreferrer"
          className="sia-featured"
          id="sia-featured-project"
          aria-label={`View ${featured.title}`}
        >
          <div className="sia-featured-img-wrap">
            <img
              src={featured.image}
              alt={featured.title}
              className="sia-featured-img"
              loading="lazy"
            />
            <div className="sia-overlay">
              <div className="sia-play">
                <MdPlayArrow />
              </div>
            </div>
            <span className="sia-category-badge">{featured.category}</span>
          </div>
          <div className="sia-featured-info">
            <div className="sia-meta">
              <h3 className="sia-title">{featured.title}</h3>
              <MdArrowOutward className="sia-link-icon" />
            </div>
            <p className="sia-desc">{featured.description}</p>
            <div className="sia-tags">
              {featured.technologies.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </a>

        {/* Rest of projects */}
        <div className="sia-small-grid">
          {rest.map((project) => (
            <a
              key={project.id}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="sia-small-card"
              id={`sia-project-${project.id}`}
              aria-label={`View ${project.title}`}
            >
              <div className="sia-small-img-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="sia-small-img"
                  loading="lazy"
                />
                <div className="sia-overlay sia-overlay--small">
                  <div className="sia-play sia-play--sm">
                    <MdPlayArrow />
                  </div>
                </div>
                <span className="sia-category-badge sia-category-badge--sm">{project.category}</span>
              </div>
              <div className="sia-small-info">
                <div className="sia-meta">
                  <h3 className="sia-title sia-title--sm">{project.title}</h3>
                  <MdArrowOutward className="sia-link-icon" />
                </div>
                <p className="sia-desc sia-desc--sm">{project.description}</p>
                <div className="sia-tags">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Featured ── */
        .sia-featured {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .sia-featured:hover {
          border-color: var(--accent-orange-border);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card), var(--shadow-glow);
        }

        .sia-featured-img-wrap {
          position: relative;
          width: 100%;
          height: 380px;
          overflow: hidden;
        }

        .sia-featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sia-featured:hover .sia-featured-img {
          transform: scale(1.03);
        }

        .sia-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 20, 25, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sia-featured:hover .sia-overlay,
        .sia-small-card:hover .sia-overlay {
          opacity: 1;
        }

        .sia-play {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent-orange);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #fff;
          transform: scale(0.7);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 30px rgba(230, 126, 80, 0.4);
        }

        .sia-featured:hover .sia-play,
        .sia-small-card:hover .sia-play {
          transform: scale(1);
        }

        .sia-play--sm {
          width: 48px;
          height: 48px;
          font-size: 1.5rem;
        }

        .sia-category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(15, 20, 25, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-orange);
        }

        .sia-category-badge--sm {
          font-size: 0.62rem;
        }

        .sia-featured-info {
          padding: 1.75rem;
        }

        .sia-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .sia-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .sia-title--sm {
          font-size: 1.05rem;
        }

        .sia-link-icon {
          font-size: 1.2rem;
          color: var(--accent-orange);
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .sia-featured:hover .sia-link-icon,
        .sia-small-card:hover .sia-link-icon {
          opacity: 1;
          transform: translateX(0);
        }

        .sia-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .sia-desc--sm {
          font-size: 0.82rem;
        }

        .sia-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        /* ── Small Grid ── */
        .sia-small-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .sia-small-card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .sia-small-card:hover {
          border-color: var(--accent-orange-border);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card), var(--shadow-glow);
        }

        .sia-small-img-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .sia-small-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sia-small-card:hover .sia-small-img {
          transform: scale(1.04);
        }

        .sia-small-info {
          padding: 1.25rem;
        }

        @media (max-width: 768px) {
          .sia-featured-img-wrap {
            height: 260px;
          }
          .sia-small-grid {
            grid-template-columns: 1fr;
          }
          .sia-small-img-wrap {
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .sia-featured-img-wrap {
            height: 200px;
          }
          .sia-featured-info {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
