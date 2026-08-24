import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import portfolioData from '../data/portfolioData';

/* ── Floating background particles ────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 5.7 + 7) % 100,
  y: (i * 7.1 + 4) % 100,
  size: (i % 3) * 0.7 + 1.2,
  delay: (i * 0.4) % 5,
  dur: 8 + (i % 4),
}));

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(60, 222, 251, 0.25)',
            animation: `particle-drift ${p.dur}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Top Navbar items ─────────────────────────────────────── */
const HERO_NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About me' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact me' },
];

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      gsap.set(['.hero-container-card', '.hero-top-nav', '.hero-left-content > *', '.hero-right-img-wrap'], {
        autoAlpha: 0,
      });

      tl.to('.hero-container-card', { autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
        .to('.hero-top-nav', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.3')
        .to('.hero-left-content > *', {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.2')
        .to('.hero-right-img-wrap', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.2)',
        }, '-=0.4');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen flex items-center justify-center pt-8 sm:pt-10 lg:pt-12 pb-24 sm:pb-28 lg:pb-32 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* ── Fullscreen Wallpaper Background Layer ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url(/wallpaper.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle dark vignette to ensure content contrast */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.6) 100%)',
        }}
      />

      {/* Background ambient particles */}
      <Particles />

      {/* Decorative ambient background glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px] opacity-20"
        style={{ background: 'var(--accent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none blur-[120px] opacity-15"
        style={{ background: '#091d24' }}
      />

      {/* ── Main Hero Card Container (Reference Layout) ── */}
      <div
        className="hero-container-card relative z-10 w-full max-w-[1160px] mx-auto rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden"
        style={{
          background: 'rgba(14, 14, 14, 0.92)',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        {/* Subtle geometric background accents */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.025) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)' }}
        />

        {/* ── Top Navbar (Inside Hero Card) ── */}
        <header className="hero-top-nav relative z-20 flex items-center justify-between gap-4 pb-6 sm:pb-8 lg:pb-10 border-b border-white/[0.05] mb-6 sm:mb-8 lg:mb-12">
          {/* Logo on Left */}


          {/* Nav Links in Center (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium">
            {HERO_NAV_ITEMS.map(({ id, label }, idx) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`transition-colors duration-200 hover:text-[var(--accent)] ${idx === 0 ? 'text-[var(--accent)] font-semibold' : 'text-slate-300'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Hire Me CTA on Right */}
          <button
            onClick={() => scrollTo('contact')}
            id="hero-top-hire-me"
            className="btn btn-primary text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold transition-all shadow-md hover:scale-105"
          >
            Hire Me
          </button>
        </header>

        {/* ── Two-Column Main Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">

          {/* Left Column — Text, Socials, CTAs, Stats */}
          <div className="hero-left-content lg:col-span-7 flex flex-col justify-center gap-5 sm:gap-6 order-2 lg:order-1">

            {/* Introduction & Name */}
            <div>
              <p className="text-sm sm:text-base font-medium text-slate-400 mb-1 tracking-wide">
                Hi I am
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
                {portfolioData.name}
              </h2>
            </div>

            {/* Main Title Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-black leading-[1.12] tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--accent-bright)',
              }}
            >
              {portfolioData.role}
            </h1>

            {/* CTA Buttons Row */}
            <div className="flex items-center gap-3.5 flex-wrap pt-1">
              <button
                onClick={() => scrollTo('contact')}
                id="hero-hire-me"
                className="btn btn-primary px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-[rgba(46,124,134,0.3)] hover:scale-105 transition-all"
              >
                Hire Me
              </button>
              <button
                onClick={() => scrollTo('projects')}
                id="hero-view-projects"
                className="btn btn-secondary px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border border-white/15 text-white hover:border-[var(--accent-bright)] hover:text-[var(--accent-bright)] hover:bg-white/[0.04] transition-all"
              >
                View Projects
              </button>
            </div>

            {/* Stats Block (Directly below CTAs in compact card format) */}
            <div
              className="w-full max-w-[480px] rounded-2xl p-4 sm:p-5 mt-2 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-white/[0.08]">
                {/* Stat 1 */}
                <div className="flex flex-col">
                  <span
                    className="text-xl sm:text-2xl font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--accent)',
                    }}
                  >
                    10+
                  </span>
                  <span className="text-[0.68rem] sm:text-xs text-slate-400 font-medium mt-1.5 leading-tight">
                    Projects Built
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col pl-3 sm:pl-4">
                  <span
                    className="text-xl sm:text-2xl font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--accent)',
                    }}
                  >
                    3+
                  </span>
                  <span className="text-[0.68rem] sm:text-xs text-slate-400 font-medium mt-1.5 leading-tight">
                    Happy Clients
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col pl-3 sm:pl-4">
                  <span
                    className="text-xl sm:text-2xl font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--accent)',
                    }}
                  >
                    1.5+
                  </span>
                  <span className="text-[0.68rem] sm:text-xs text-slate-400 font-medium mt-1.5 leading-tight">
                    Years Exp.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column — Profile Image Fixed Inside Neutral Circular Frame */}
          <div className="hero-right-img-wrap lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
            <div className="relative flex items-center justify-center">

              {/* Circular Background & Frame strictly containing the image */}
              <div
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[390px] md:h-[390px] lg:w-[420px] lg:h-[420px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden relative flex items-end justify-center flex-shrink-0"
                style={{
                  background: 'radial-gradient(circle at 45% 45%, #242424 0%, #141414 65%, #0a0a0a 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 0 50px rgba(0, 0, 0, 0.9), inset 0 0 40px rgba(0, 0, 0, 0.75)',
                }}
              >
                <img
                  src={portfolioData.profileImage}
                  alt={`${portfolioData.name} — ${portfolioData.role}`}
                  className="w-[88%] sm:w-[90%] md:w-[92%] h-auto object-contain object-bottom select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
