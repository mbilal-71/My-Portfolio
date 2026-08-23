import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  SiJavascript, SiReact, SiMongodb, SiNextdotjs,
  SiNodedotjs, SiExpress, SiFigma,
} from 'react-icons/si';
import { MdArrowOutward } from 'react-icons/md';
import portfolioData from '../data/portfolioData';

/* ── Orbit config ────────────────────────────────────────────
   Two rings. Angles are the starting position of each icon.
   CSS handles the continuous orbit; GSAP only handles entrance.
   ─────────────────────────────────────────────────────────── */
const RINGS = [
  { r: 125, speed: '22s', dir: 'cw' },
  { r: 195, speed: '36s', dir: 'ccw' },
];

const ORBIT_TECHS = [
  { Icon: SiReact, color: '#61DAFB', label: 'React', ring: 0, angle: 0 },
  { Icon: SiNodedotjs, color: '#6CC24A', label: 'Node.js', ring: 0, angle: 120 },
  { Icon: SiJavascript, color: '#F9CA1C', label: 'JavaScript', ring: 0, angle: 240 },
  { Icon: SiMongodb, color: '#47A248', label: 'MongoDB', ring: 1, angle: 30 },
  { Icon: SiNextdotjs, color: '#ffffff', label: 'Next.js', ring: 1, angle: 138 },
  { Icon: SiExpress, color: '#dddddd', label: 'Express.js', ring: 1, angle: 246 },
  { Icon: SiFigma, color: '#F24E1E', label: 'Figma', ring: 1, angle: 354 },
];

/* ── Floating particles ───────────────────────────────────── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: (i * 4.7 + 9) % 100,
  y: (i * 6.3 + 5) % 100,
  size: (i % 3) * 0.8 + 1.2,
  delay: (i * 0.37) % 6,
  dur: 7 + (i % 5),
}));

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: 'rgba(249,202,28,0.22)',
            animation: `particle-drift ${p.dur}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Single orbit icon ───────────────────────────────────── */
function TechOrbitIcon({ Icon, color, label, ring, angle }) {
  const { r, speed, dir } = RINGS[ring];
  const size = ring === 0 ? 38 : 40;
  const half = size / 2;
  const iconSz = ring === 0 ? 17 : 19;

  return (
    <div
      className="tech-orbit-icon absolute"
      title={label}
      aria-label={label}
      style={{
        left: '50%', top: '50%',
        width: size, height: size,
        marginLeft: -half, marginTop: -half,
        transform: `rotate(${angle}deg) translateX(${r}px) rotate(-${angle}deg)`,
        animation: `orbit-${dir} ${speed} linear infinite`,
        '--orbit-r': `${r}px`,
        '--start-angle': `${angle}deg`,
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center rounded-xl border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-125"
        style={{
          background: 'rgba(10,10,10,0.88)',
          boxShadow: `0 0 12px ${color}44, 0 2px 8px rgba(0,0,0,0.5)`,
        }}
      >
        <Icon size={iconSz} color={color} />
      </div>
    </div>
  );
}

/* ── Profile + orbit composition ─────────────────────────── */
function ProfileOrbit() {
  return (
    <div className="profile-orbit-root relative flex items-center justify-center select-none">

      {/* Outermost ambient glow — uses #30280F */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 480, height: 480,
          background: 'radial-gradient(circle, #30280F 0%, rgba(48,40,15,0.4) 45%, transparent 72%)',
          animation: 'glow-breathe 5s ease-in-out infinite',
        }}
      />

      {/* Outer decorative ring (orbit-1, r=195) */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          width: 398, height: 398,
          borderColor: 'rgba(249,202,28,0.13)',
          animation: 'spin-slow 50s linear infinite',
        }}
      >
        {[0, 72, 144, 216, 288].map((a) => (
          <div
            key={a}
            className="absolute rounded-full"
            style={{
              width: 5, height: 5,
              background: 'rgba(249,202,28,0.5)',
              top: '50%', left: '50%',
              transform: `rotate(${a}deg) translateX(199px) translateX(-2.5px) translateY(-2.5px)`,
            }}
          />
        ))}
      </div>

      {/* Inner decorative ring (orbit-0, r=125) */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          width: 258, height: 258,
          borderColor: 'rgba(249,202,28,0.08)',
          animation: 'spin-slow-ccw 32s linear infinite',
        }}
      />

      {/* Profile image */}
      <div
        className="profile-img-wrap relative rounded-full overflow-hidden z-10 flex-shrink-0"
        style={{
          width: 215, height: 215,
          background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
          border: '2.5px solid rgba(249,202,28,0.4)',
          boxShadow: '0 0 0 6px rgba(249,202,28,0.05), 0 0 60px rgba(249,202,28,0.18)',
        }}
      >
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-full border border-yellow-400/30 pointer-events-none"
          style={{ animation: 'pulse-ring 3s ease-out infinite' }}
        />
        <img
          src={portfolioData.profileImage}
          alt={`${portfolioData.name} — ${portfolioData.role}`}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(249,202,28,0.04), transparent 60%)' }}
        />
      </div>

      {/* Orbit icons */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {ORBIT_TECHS.map((t, i) => (
          <TechOrbitIcon key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

/* ── Stats Bar ───────────────────────────────────────────── */
function StatsBar() {
  const stats = portfolioData.stats;
  const icons = {
    code: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    users: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    zap: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    target: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  };

  return (
    <div
      className="stats-bar mx-auto max-w-6xl p-8 rounded-2xl overflow-hidden grid grid-cols-2 md:grid-cols-4 lg:mb-4"
      style={{
        background: 'rgba(18,18,18,0.95)',
        border: '1px solid rgba(249,202,28,0.13)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,202,28,0.04)',
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="stat-item flex flex-col items-center justify-center gap-2 py-7 px-4 cursor-default transition-all duration-300"
          style={{
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(249,202,28,0.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span className='translateY-(4px)'
            style={{
              color: 'var(--accent)',
              opacity: 0.75,
              transform: 'translateY(4px)',

            }}
          >
            {icons[s.icon]}
          </span>
          <span
            className="text-3xl font-extrabold leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
          >
            {s.value}
          </span>
          <span
            className="text-[0.62rem] font-semibold uppercase tracking-widest text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Set initial states
      gsap.set(['.hero-badge', '.hero-h1', '.hero-name', '.hero-desc', '.hero-ctas'], {
        autoAlpha: 0, y: 24,
      });
      gsap.set('.profile-orbit-root', { autoAlpha: 0, scale: 0.82 });
      gsap.set('.stats-bar', { autoAlpha: 0, y: 28 });
      gsap.set('.stat-item', { autoAlpha: 0 });

      tl.to('.hero-badge', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
        .to('.hero-h1', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to('.hero-name', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')
        .to('.hero-desc', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
        .to('.hero-ctas', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
        .to('.profile-orbit-root', { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'back.out(1.4)' }, '-=0.6')
        .to('.stats-bar', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.15')
        .to('.stat-item', { autoAlpha: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out' }, '-=0.3');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Top-right gold glow */}
        <div
          className="absolute -top-48 -right-48 rounded-full"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(48,40,15,0.9) 0%, rgba(48,40,15,0.3) 40%, transparent 70%)',
            animation: 'glow-breathe 7s ease-in-out infinite',
          }}
        />
        {/* Bottom-left glow */}
        <div
          className="absolute -bottom-40 -left-40 rounded-full"
          style={{
            width: 480, height: 480,
            background: 'radial-gradient(circle, rgba(48,40,15,0.5) 0%, transparent 70%)',
          }}
        />
        <Particles />
      </div>

      {/* ── Main grid ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-28 lg:py-36">

            {/* Left — text content */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">

              {/* Badge */}
              <div
                className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full border w-fit text-[0.68rem] font-semibold tracking-widest uppercase"
                style={{
                  borderColor: 'rgba(249,202,28,0.22)',
                  background: 'rgba(249,202,28,0.06)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px rgba(249,202,28,0.8)',
                    animation: 'blink-dot 2.5s ease-in-out infinite',
                  }}
                />
                {portfolioData.badge}
              </div>

              {/* Headline */}
              <h1 className="hero-h1" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="block text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-[1.08] tracking-tight text-white">
                  Building Modern Digital
                </span>
                <span
                  className="block text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-[1.08] tracking-tight"
                  style={{
                    background: 'linear-gradient(90deg, #F9CA1C, #FFD93D)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Experiences
                </span>
              </h1>

              {/* Name */}
              <p
                className="hero-name text-sm font-bold tracking-[0.2em] uppercase"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}
              >
                {portfolioData.name}
              </p>

              {/* Description */}
              <p
                className="hero-desc text-[0.92rem] leading-relaxed max-w-[430px]"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
              >
                {portfolioData.heroDesc}
              </p>

              {/* CTAs */}
              <div className="hero-ctas flex gap-3 flex-wrap">
                <button
                  className="btn btn-primary"
                  id="hero-contact"
                  onClick={() => scrollTo('contact')}
                >
                  Contact Me <MdArrowOutward />
                </button>
                <button
                  className="btn btn-secondary"
                  id="hero-projects"
                  onClick={() => scrollTo('projects')}
                >
                  View Projects
                </button>
              </div>
            </div>

            {/* Right — orbital system */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <div
                className="orbit-wrap relative flex-shrink-0"
                style={{ width: 460, height: 460 }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ animation: 'float-gentle 7s ease-in-out infinite' }}
                >
                  <ProfileOrbit />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-10 w-full section-container -translate-y-26 pb-14">
        <StatsBar />
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 1024px) {
          .orbit-wrap { width: 370px !important; height: 370px !important; }
          .profile-orbit-root { transform: scale(0.80); }
        }
        @media (max-width: 640px) {
          .orbit-wrap { width: 290px !important; height: 290px !important; }
          .profile-orbit-root { transform: scale(0.63); }
        }
        @media (max-width: 640px) {
          .stat-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.04) !important; }
          .stat-item:nth-child(odd)  { border-right: 1px solid rgba(255,255,255,0.04) !important; }
          .stat-item:last-child, .stat-item:nth-last-child(2):nth-child(odd) { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
