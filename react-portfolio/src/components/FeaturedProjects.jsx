import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function FeaturedProjects() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.proj-hdr', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-hdr', start: 'top 87%' },
      });
      gsap.from('.proj-card', {
        opacity: 0, y: 50, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-grid', start: 'top 82%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 lg:py-28"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="proj-hdr mb-14">
          <p className="section-label mb-3">Portfolio</p>
          <h2 className="section-heading">
            Featured <span className="accent">Projects</span>
          </h2>
          <p className="section-desc mt-3 max-w-lg">
            A selection of projects I've built — crafted with care, clean code, and attention to detail.
          </p>
        </div>

        {/* 2-col grid */}
        <div className="proj-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.id}
              className="proj-card card overflow-hidden group flex flex-col"
              style={{ padding: 0 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 210 }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                  style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                >
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                    style={{ background: 'var(--accent)', color: '#0a0a0a' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalIcon /> View Live
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon /> GitHub
                  </a>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(249,202,28,0.15)',
                      border: '1px solid rgba(249,202,28,0.3)',
                      color: 'var(--accent)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-6 flex-1">
                <h3
                  className="text-lg font-bold group-hover:text-[#F9CA1C] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {p.description}
                </p>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {p.technologies.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
                {/* Actions */}
                <div className="flex gap-2.5 mt-2">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:text-[#F9CA1C]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ExternalIcon /> Live Demo
                  </a>
                  <span style={{ color: 'var(--border-card)' }}>·</span>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:text-[#F9CA1C]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <GithubIcon /> Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
