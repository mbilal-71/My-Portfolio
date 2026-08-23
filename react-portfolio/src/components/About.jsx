import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioData from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

/* ── Icon helpers ───────────────────────────────────────── */
function SchoolIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

/* ── Core stack groups ──────────────────────────────────── */
const STACK = [
  { label: 'Frontend',       items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { label: 'Backend',        items: ['Node.js', 'Express.js'] },
  { label: 'Database',       items: ['MongoDB'] },
  { label: 'AI',             items: ['OpenAI', 'Gemini', 'Claude', 'Grok'] },
  { label: 'Design',         items: ['Figma', 'UI/UX Designing'] },
];

/* ── Quick connect links ────────────────────────────────── */
function QuickContact() {
  const { whatsapp, email, github, linkedin, phoneTel, phone } = portfolioData;
  const items = [
    {
      id: 'about-wa', label: 'WhatsApp', sub: phone, href: whatsapp,
      color: '#22c55e', bg: 'rgba(34,197,94,0.09)', border: 'rgba(34,197,94,0.25)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
        </svg>
      ),
    },
    {
      id: 'about-email', label: 'Email', sub: email, href: `mailto:${email}`,
      color: '#F9CA1C', bg: 'rgba(249,202,28,0.09)', border: 'rgba(249,202,28,0.25)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      id: 'about-github', label: 'GitHub', sub: 'mbilal-71', href: github,
      color: '#f0f0f0', bg: 'rgba(240,240,240,0.06)', border: 'rgba(240,240,240,0.15)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      id: 'about-linkedin', label: 'LinkedIn', sub: 'muhammad-bilal71', href: linkedin,
      color: '#0A66C2', bg: 'rgba(10,102,194,0.1)', border: 'rgba(10,102,194,0.3)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      id: 'about-phone', label: 'Phone', sub: phone, href: phoneTel,
      color: '#a78bfa', bg: 'rgba(167,139,250,0.09)', border: 'rgba(167,139,250,0.25)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map(({ id, label, sub, href, color, bg, border, icon }) => (
        <a
          key={id} id={id} href={href}
          target={href.startsWith('mailto') || href.startsWith('tel') ? undefined : '_blank'}
          rel={href.startsWith('mailto') || href.startsWith('tel') ? undefined : 'noopener noreferrer'}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: bg, border: `1px solid ${border}`, color }}
        >
          <span className="flex-shrink-0">{icon}</span>
          <div className="min-w-0">
            <p className="text-xs font-bold">{label}</p>
            <p className="text-[0.65rem] truncate" style={{ color: 'var(--text-muted)' }}>{sub}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.ab-hdr', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-hdr', start: 'top 87%' },
      });
      gsap.from('.ab-card', {
        opacity: 0, y: 44, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-grid', start: 'top 83%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 lg:py-28"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="ab-hdr mb-14">
          <p className="section-label mb-3">About Me</p>
          <h2 className="section-heading">
            The Developer <span className="accent">Behind the Code</span>
          </h2>
        </div>

        {/* 2×2 Grid */}
        <div className="ab-grid grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Card 1 — About Me */}
          <div className="ab-card card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(249,202,28,0.1)', border: '1px solid rgba(249,202,28,0.22)', color: 'var(--accent)' }}
              >
                <PersonIcon />
              </div>
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>About Me</p>
                <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>{portfolioData.name}</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I'm a Full Stack Developer and {portfolioData.degree} student at {portfolioData.universityShort}.
              I build modern, responsive web applications with clean frontends, solid backend architecture,
              and AI-powered capabilities.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              My curiosity drives me to explore new technologies and solve real-world problems through code.
              I believe great software is both functional and beautiful.
            </p>
          </div>

          {/* Card 2 — Education */}
          <div className="ab-card card flex flex-col gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(96,165,250,0.09)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA' }}
            >
              <SchoolIcon />
            </div>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Education</p>
              <h3 className="text-base font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                {portfolioData.degree}
              </h3>
              <p className="text-sm mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                {portfolioData.university}
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                {portfolioData.universityShort}, Pakistan
              </p>
              <span
                className="inline-flex px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider"
                style={{
                  background: 'rgba(249,202,28,0.1)',
                  border: '1px solid rgba(249,202,28,0.22)',
                  color: 'var(--accent)',
                }}
              >
                Currently Enrolled
              </span>
            </div>
          </div>

          {/* Card 3 — Core Stack */}
          <div className="ab-card card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(249,202,28,0.1)', border: '1px solid rgba(249,202,28,0.22)', color: 'var(--accent)' }}
              >
                <CodeIcon />
              </div>
              <p className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Core Stack</p>
            </div>
            <div className="flex flex-col gap-3">
              {STACK.map(({ label, items }) => (
                <div key={label}>
                  <p className="text-[0.58rem] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 — Quick Contact */}
          <div className="ab-card card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}
              >
                <LinkIcon />
              </div>
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>Quick Contact</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Reach out — I'd love to connect.</p>
              </div>
            </div>
            <QuickContact />
          </div>

        </div>
      </div>
    </section>
  );
}
