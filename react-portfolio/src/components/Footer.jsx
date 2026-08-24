import portfolioData from '../data/portfolioData';

const NAV_LINKS = [
  { id: 'footer-home',   label: 'Home',       target: 'home'       },
  { id: 'footer-about',  label: 'About',      target: 'about'      },
  { id: 'footer-svc',    label: 'Services',   target: 'services'   },
  { id: 'footer-proj',   label: 'Projects',   target: 'projects'   },
  { id: 'footer-exp',    label: 'Experience', target: 'experience' },
  { id: 'footer-cnt',    label: 'Contact',    target: 'contact'    },
];

const SOCIAL_LINKS = [
  {
    id: 'footer-github', label: 'GitHub', href: portfolioData.github,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'footer-linkedin', label: 'LinkedIn', href: portfolioData.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'footer-email', label: 'Email', href: `mailto:${portfolioData.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-card)',
        paddingBottom: '7.5rem', /* clearance for floating navbar */
      }}
    >
      <div className="section-container pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{ background: 'var(--accent)', color: '#0a0a0a' }}
              >
                {portfolioData.initials}
              </div>
              <span className="text-base font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
                {portfolioData.name}
              </span>
            </div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {portfolioData.role}
            </p>
            <p className="text-xs mt-1 max-w-[260px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Building fast, beautiful, production-quality web applications.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_LINKS.map(({ id, label, target }) => (
                <button
                  key={id}
                  id={id}
                  onClick={() => scrollTo(target)}
                  className="text-left text-sm transition-colors duration-200 hover:text-[#F9CA1C]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ id, label, href, icon }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-[#F9CA1C]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
            &copy; {year} {portfolioData.name}. All rights reserved.
          </p>
          <p className="text-xs text-center sm:text-right" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
            Built with React · Tailwind CSS · GSAP ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
