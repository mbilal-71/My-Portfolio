import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MdArrowOutward, MdEmail } from 'react-icons/md';
import { social } from '../data/social';

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-eyebrow', { opacity: 0, y: 20 });
      gsap.set('.hero-name', { opacity: 0, y: 40 });
      gsap.set('.hero-role', { opacity: 0, y: 30 });
      gsap.set('.hero-desc', { opacity: 0, y: 20 });
      gsap.set('.hero-actions', { opacity: 0, y: 20 });
      gsap.set('.hero-stats', { opacity: 0, y: 20 });
      gsap.set('.hero-image-wrap', { opacity: 0, scale: 1.05 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to('.hero-role', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .to('.hero-stats', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .to(
          '.hero-image-wrap',
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

      // Subtle floating on image
      gsap.to('.hero-image-wrap', {
        y: -10,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section" ref={containerRef}>
      <div className="hero-bg-orb hero-orb-1" />
      <div className="hero-bg-orb hero-orb-2" />

      <div className="container">
        <div className="hero-grid">
          {/* ── Content ── */}
          <div className="hero-content" ref={contentRef}>
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Available for Work
            </div>

            <h1 className="hero-name">
              Muhammad<br />
              <span className="hero-name-accent">Bilal</span>
            </h1>

            <p className="hero-role">
              Full Stack Developer
            </p>

            <p className="hero-desc">
              BS Computer Science student at UMT, Lahore — building modern,
              responsive web applications with a focus on clean code,
              great user experience, and solid backend architecture.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleScroll('projects')}
                id="hero-view-projects"
              >
                View Projects <MdArrowOutward />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleScroll('contact')}
                id="hero-lets-connect"
              >
                Let&apos;s Connect <MdEmail />
              </button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">3+</span>
                <span className="hero-stat-label">Projects Built</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">5+</span>
                <span className="hero-stat-label">Technologies</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">BS</span>
                <span className="hero-stat-label">CS Student</span>
              </div>
            </div>
          </div>

          {/* ── Image ── */}
          <div className="hero-image-area">
            <div className="hero-image-wrap" ref={imageRef}>
              <div className="hero-image-glow" />
              <img
                src="/img.png"
                alt="Muhammad Bilal — Full Stack Developer"
                className="hero-profile-img"
                loading="eager"
              />
              <div className="hero-image-badge">
                <span className="badge-dot" />
                Open to opportunities
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 6rem 0 8rem;
        }

        .hero-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(230, 126, 80, 0.06) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }

        .hero-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.04) 0%, transparent 70%);
          bottom: 0;
          left: -50px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 9999px;
          padding: 0.4rem 1rem;
          width: fit-content;
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-name {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }

        .hero-name-accent {
          color: var(--accent-orange);
        }

        .hero-role {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 2vw, 1.2rem);
          font-weight: 500;
          color: var(--accent-blue);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 480px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-top: 0.5rem;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .hero-stat-number {
          font-family: 'Outfit', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--accent-orange);
          line-height: 1;
        }

        .hero-stat-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-stat-divider {
          width: 1px;
          height: 32px;
          background: var(--border-subtle);
          flex-shrink: 0;
        }

        /* ── Image area ── */
        .hero-image-area {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image-wrap {
          position: relative;
          width: min(400px, 90%);
          aspect-ratio: 3/4;
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid rgba(230, 126, 80, 0.25);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(230, 126, 80, 0.06);
          background: var(--bg-card);
        }

        .hero-image-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(230,126,80,0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .hero-image-badge {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 20, 25, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          padding: 0.4rem 1rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: #94A3B8;
          letter-spacing: 0.04em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          z-index: 2;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          .hero-content {
            align-items: center;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .hero-desc {
            text-align: center;
          }
          .hero-image-area {
            order: -1;
          }
          .hero-image-wrap {
            width: min(280px, 80%);
            aspect-ratio: 1/1;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 5rem 0 7rem;
          }
          .hero-image-wrap {
            width: min(240px, 75%);
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
