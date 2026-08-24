import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import portfolioData from '../data/portfolioData';

// Nav items with SVG icon paths
const navItems = [
  {
    id: 'home', label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'about', label: 'About',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'services', label: 'Services',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="6" height="6" rx="1" /><rect x="16" y="3" width="6" height="6" rx="1" />
        <rect x="2" y="15" width="6" height="6" rx="1" /><rect x="16" y="15" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    id: 'projects', label: 'Projects',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'experience', label: 'Experience',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 'contact', label: 'Contact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [visible, setVisible] = useState(false);
  const pillRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(true);
      gsap.fromTo(
        pillRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.5)' }
      );
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver — section spy
  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };

  return (
    <>
      {/* Bottom floating pill navbar */}
      <nav
        ref={pillRef}
        className="navbar-pill"
        aria-label="Main navigation"
        style={{ opacity: visible ? undefined : 0 }}
      >
        {navItems.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              aria-label={label}
              title={label}
              onClick={() => scrollTo(id)}
              className="relative flex flex-col items-center justify-center gap-1 min-w-[3.6rem] sm:min-w-[4.4rem] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl transition-all duration-300 group"
              style={{
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                border: isActive ? '1px solid var(--accent-border)' : '1px solid transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              <span
                className="transition-transform duration-300 group-hover:scale-110"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                {icon}
              </span>
              <span
                className="text-[0.6rem] sm:text-[0.66rem] font-semibold tracking-wide hidden sm:block whitespace-nowrap"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
