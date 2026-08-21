import { useEffect, useRef, useState } from 'react';
import {
  MdHome,
  MdPerson,
  MdBuild,
  MdFolder,
  MdWork,
  MdCode,
  MdEmail,
} from 'react-icons/md';

const navItems = [
  { id: 'home', label: 'Home', icon: MdHome },
  { id: 'about', label: 'About', icon: MdPerson },
  { id: 'services', label: 'Services', icon: MdBuild },
  { id: 'projects', label: 'Projects', icon: MdFolder },
  { id: 'experience', label: 'Work', icon: MdWork },
  { id: 'technologies', label: 'Tech', icon: MdCode },
  { id: 'contact', label: 'Contact', icon: MdEmail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < 100 || currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="navbar"
      style={{
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(120px)',
        opacity: visible ? 1 : 0,
      }}
      aria-label="Main navigation"
    >
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`nav-item ${activeSection === id ? 'nav-item--active' : ''}`}
          onClick={() => handleNavClick(id)}
          aria-label={`Navigate to ${label}`}
          title={label}
        >
          <Icon className="nav-icon" />
          <span className="nav-label">{label}</span>
        </button>
      ))}

      <style>{`
        .navbar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.15rem;
          background: rgba(15, 20, 25, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(230, 126, 80, 0.2);
          border-radius: 9999px;
          padding: 0.5rem 0.75rem;
          z-index: 9999;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
          padding: 0.5rem 0.85rem;
          border-radius: 9999px;
          color: #64748B;
          transition: all 0.25s ease;
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
          min-width: 44px;
          min-height: 44px;
          justify-content: center;
        }

        .nav-item:hover {
          color: #E67E50;
          background: rgba(230, 126, 80, 0.1);
        }

        .nav-item--active {
          color: #E67E50;
          background: rgba(230, 126, 80, 0.15);
        }

        .nav-icon {
          font-size: 1.15rem;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .nav-item:hover .nav-icon {
          transform: translateY(-1px);
        }

        .nav-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
        }

        @media (max-width: 600px) {
          .navbar {
            padding: 0.4rem 0.4rem;
            gap: 0;
            bottom: 1rem;
          }
          .nav-item {
            padding: 0.5rem 0.6rem;
          }
          .nav-label {
            display: none;
          }
          .nav-icon {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 380px) {
          .nav-item {
            padding: 0.45rem 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
}
