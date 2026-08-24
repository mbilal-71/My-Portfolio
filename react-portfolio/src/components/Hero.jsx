import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  SiJavascript, SiReact, SiMongodb, SiNextdotjs,
  SiNodedotjs, SiExpress, SiFigma,
} from 'react-icons/si';
import { MdArrowOutward } from 'react-icons/md';
import portfolioData from '../data/portfolioData';
import StatsBar from './StatsBar';

/* ── Orbit config ────────────────────────────────────────────
   Two rings. Angles are the starting position of each icon.
   CSS handles the continuous orbit; GSAP only handles entrance.
   ─────────────────────────────────────────────────────────── */
const RINGS = [
  { r: 120, speed: '22s', dir: 'cw' },
  { r: 185, speed: '36s', dir: 'ccw' },
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
  const size = ring === 0 ? 36 : 38;
  const half = size / 2;
  const iconSz = ring === 0 ? 16 : 18;

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

      {/* Outermost ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 440, height: 440,
          background: 'radial-gradient(circle, #30280F 0%, rgba(48,40,15,0.4) 45%, transparent 72%)',
          animation: 'glow-breathe 5s ease-in-out infinite',
        }}
      />

      {/* Outer decorative ring (orbit-1, r=185) */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          width: 372, height: 372,
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
              transform: `rotate(${a}deg) translateX(186px) translateX(-2.5px) translateY(-2.5px)`,
            }}
          />
        ))}
      </div>

      {/* Inner decorative ring (orbit-0, r=120) */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          width: 242, height: 242,
          borderColor: 'rgba(249,202,28,0.08)',
          animation: 'spin-slow-ccw 32s linear infinite',
        }}
      />

      {/* Profile image */}
      <div
        className="profile-img-wrap relative rounded-full overflow-hidden z-10 flex-shrink-0"
        style={{
          width: 195, height: 195,
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

/* ── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Set initial states
      gsap.set(['.hero-badge', '.hero-h1', '.hero-name', '.hero-desc', '.hero-ctas'], {
        autoAlpha: 0, y: 20,
      });
      gsap.set('.profile-orbit-root', { autoAlpha: 0, scale: 0.85 });
      gsap.set('.stats-bar', { autoAlpha: 0, y: 20 });
      gsap.set('.stat-item', { autoAlpha: 0 });

      tl.to('.hero-badge', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' })
        .to('.hero-h1', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.25')
        .to('.hero-name', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.3')
        .to('.hero-desc', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.2')
        .to('.hero-ctas', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.2')
        .to('.profile-orbit-root', { autoAlpha: 1, scale: 1, duration: 0.75, ease: 'back.out(1.4)' }, '-=0.5')
        .to('.stats-bar', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' }, '-=0.1')
        .to('.stat-item', { autoAlpha: 1, duration: 0.3, stagger: 0.06, ease: 'power2.out' }, '-=0.25');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen lg:h-screen lg:max-h-[920px] flex flex-col justify-between overflow-hidden pt-4 sm:pt-6 lg:pt-4 pb-28 sm:pb-32 lg:pb-30"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background ambient particles */}
      <Particles />

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 w-full section-container flex-1 flex items-center py-3 sm:py-5 lg:py-3">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Left — text content */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">

            {/* Badge */}
            <div
              className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border w-fit text-[0.68rem] font-semibold tracking-widest uppercase"
              style={{
                borderColor: 'rgba(249,202,28,0.22)',
                background: 'rgba(249,202,28,0.06)',
                color: 'var(--text-secondary)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.8)',
                }}
              />
              {portfolioData.badge}
            </div>

            {/* Headline */}
            <h1 className="hero-h1" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="block text-3xl sm:text-4xl lg:text-[3.1rem] font-black leading-[1.1] tracking-tight text-white">
                Building Modern Digital
              </span>
              <span
                className="block text-3xl sm:text-4xl lg:text-[3.1rem] font-black leading-[1.1] tracking-tight"
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
              className="hero-name text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}
            >
              {portfolioData.name}
            </p>

            {/* Description */}
            <p
              className="hero-desc text-xs sm:text-[0.88rem] leading-relaxed max-w-[440px]"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              {portfolioData.heroDesc}
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex gap-3.5 flex-wrap pt-1">
              <button
                className="btn btn-primary"
                id="hero-contact"
                onClick={() => scrollTo('contact')}
                style={{
                  boxShadow: '0 4px 24px rgba(249,202,28,0.35)',
                }}
              >
                Contact Me <MdArrowOutward />
              </button>
              <button
                className="btn btn-secondary"
                id="hero-projects"
                onClick={() => scrollTo('projects')}
                style={{
                  background: 'rgba(18,18,18,0.6)',
                  borderColor: 'rgba(249,202,28,0.28)',
                  color: 'var(--text-primary)',
                }}
              >
                View Projects
              </button>
            </div>
          </div>

          {/* Right — Orbit system */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div
              className="orbit-wrap relative flex-shrink-0"
              style={{ width: 420, height: 420 }}
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

      {/* ── Stats bar ── */}
      <div className="relative z-10 w-full section-container lg:-translate-y-6 mt-6 sm:mt-8 lg:mt-0 pb-6 lg:pb-0">
        <StatsBar />
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 1024px) {
          .orbit-wrap { width: 340px !important; height: 340px !important; }
          .profile-orbit-root { transform: scale(0.78); }
        }
        @media (max-width: 640px) {
          .orbit-wrap { width: 280px !important; height: 280px !important; }
          .profile-orbit-root { transform: scale(0.62); }
        }
      `}</style>
    </section>
  );
}
