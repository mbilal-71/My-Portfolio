import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MdOutlineSchool,
  MdOutlinePerson,
  MdOutlineCode,
  MdOutlineOpenInNew,
  MdEmail,
} from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { social } from '../data/social';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-header',
          start: 'top 85%',
        },
      });

      gsap.from('.about-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-cards-grid',
          start: 'top 82%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        <div className="about-header section-header">
          <p className="section-label">About Me</p>
          <h2 className="section-heading">
            The Developer<br />
            <span className="accent">Behind the Code</span>
          </h2>
        </div>

        <div className="about-cards-grid">
          {/* About Card */}
          <div className="card about-card about-card--main">
            <div className="about-card-icon">
              <MdOutlinePerson />
            </div>
            <h3 className="about-card-title">Muhammad Bilal</h3>
            <p className="about-card-text">
              I&apos;m a Full Stack Developer and BS Computer Science student at UMT,
              Lahore. I build modern web applications that combine clean,
              responsive frontends with solid backend architecture. I&apos;m passionate
              about writing maintainable code and crafting great user experiences.
            </p>
            <p className="about-card-text">
              My curiosity drives me to constantly explore new technologies and
              tackle real-world problems through code. I believe great software
              is both functional and beautiful.
            </p>
          </div>

          {/* Education Card */}
          <div className="card about-card">
            <div className="about-card-icon about-card-icon--blue">
              <MdOutlineSchool />
            </div>
            <h3 className="about-card-title">Education</h3>
            <div className="about-edu">
              <p className="about-edu-degree">BS Computer Science</p>
              <p className="about-edu-uni">University of Management and Technology</p>
              <p className="about-edu-location">Lahore, Pakistan</p>
              <span className="about-edu-badge">Currently Enrolled</span>
            </div>
          </div>

          {/* Stack Card */}
          <div className="card about-card">
            <div className="about-card-icon">
              <MdOutlineCode />
            </div>
            <h3 className="about-card-title">Core Stack</h3>
            <div className="about-stack">
              <div className="about-stack-group">
                <p className="about-stack-label">Frontend</p>
                <div className="about-stack-tags">
                  {['HTML', 'CSS', 'JavaScript', 'React.js'].map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
              <div className="about-stack-group">
                <p className="about-stack-label">Backend</p>
                <div className="about-stack-tags">
                  {['Node.js', 'Express.js'].map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
              <div className="about-stack-group">
                <p className="about-stack-label">Database</p>
                <div className="about-stack-tags">
                  {['MongoDB'].map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connect Card */}
          <div className="card about-card about-card--connect">
            <div className="about-card-icon about-card-icon--green">
              <MdOutlineOpenInNew />
            </div>
            <h3 className="about-card-title">Quick Connect</h3>
            <p className="about-card-text">Let&apos;s build something together. Reach out on any platform.</p>
            <div className="about-social-grid">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-btn"
                id="about-linkedin"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-btn"
                id="about-github"
                aria-label="GitHub"
              >
                <SiGithub />
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${social.email}`}
                className="about-social-btn"
                id="about-email"
                aria-label="Email"
              >
                <MdEmail />
                <span>Email</span>
              </a>
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-btn about-social-btn--whatsapp"
                id="about-whatsapp"
                aria-label="WhatsApp"
              >
                <SiWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .about-card--main {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0 1.5rem;
          align-items: start;
        }

        .about-card--main .about-card-title {
          grid-column: 2;
        }

        .about-card--main .about-card-text {
          grid-column: 2;
        }

        .about-card--main .about-card-icon {
          grid-row: 1 / 3;
        }

        .about-card-icon {
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
          margin-bottom: 1rem;
        }

        .about-card-icon--blue {
          background: var(--accent-blue-dim);
          border-color: rgba(96, 165, 250, 0.2);
          color: var(--accent-blue);
        }

        .about-card-icon--green {
          background: rgba(34, 197, 94, 0.08);
          border-color: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .about-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .about-card-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 0.75rem;
        }

        .about-card-text:last-child {
          margin-bottom: 0;
        }

        /* Education */
        .about-edu {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .about-edu-degree {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .about-edu-uni {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .about-edu-location {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .about-edu-badge {
          margin-top: 0.5rem;
          display: inline-flex;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent-blue);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          width: fit-content;
        }

        /* Stack */
        .about-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .about-stack-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .about-stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        /* Social */
        .about-social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
          margin-top: 1rem;
        }

        .about-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .about-social-btn:hover {
          border-color: var(--accent-orange-border);
          color: var(--accent-orange);
          background: var(--accent-orange-dim);
          transform: translateY(-2px);
        }

        .about-social-btn--whatsapp:hover {
          border-color: rgba(34, 197, 94, 0.3);
          color: #22c55e;
          background: rgba(34, 197, 94, 0.08);
        }

        @media (max-width: 768px) {
          .about-cards-grid {
            grid-template-columns: 1fr;
          }
          .about-card--main {
            grid-column: 1;
            grid-template-columns: 1fr;
          }
          .about-card--main .about-card-icon {
            grid-row: auto;
          }
          .about-card--main .about-card-title,
          .about-card--main .about-card-text {
            grid-column: 1;
          }
        }

        @media (max-width: 480px) {
          .about-social-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
