import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { social } from '../data/social';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="section-divider" />
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-name">Muhammad Bilal</span>
            <p className="footer-role">Full Stack Developer</p>
          </div>

          <div className="footer-center">
            <p className="footer-copy">
              &copy; {year} Muhammad Bilal. All rights reserved.
            </p>
            <p className="footer-built">
              Built with React &amp; GSAP ❤️
            </p>
          </div>

          <div className="footer-socials">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              id="footer-github"
              aria-label="GitHub"
            >
              <SiGithub />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              id="footer-linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={`mailto:${social.email}`}
              className="footer-social-link"
              id="footer-email"
              aria-label="Email"
            >
              <MdEmail />
            </a>
            <a
              href={social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link footer-social-link--wa"
              id="footer-whatsapp"
              aria-label="WhatsApp"
            >
              <SiWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 0;
          background: var(--bg-primary);
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem 0;
          flex-wrap: wrap;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .footer-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .footer-role {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .footer-center {
          text-align: center;
          flex: 1;
        }

        .footer-copy {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.1rem;
        }

        .footer-built {
          font-size: 0.72rem;
          color: var(--text-muted);
          opacity: 0.6;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-social-link {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: var(--text-secondary);
          transition: all 0.25s ease;
        }

        .footer-social-link:hover {
          background: var(--accent-orange-dim);
          border-color: var(--accent-orange-border);
          color: var(--accent-orange);
          transform: translateY(-2px);
        }

        .footer-social-link--wa:hover {
          background: rgba(34, 197, 94, 0.08);
          border-color: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }

          .footer-brand {
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
