import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SiWhatsapp } from 'react-icons/si';
import { social } from '../data/social';

export default function FloatingWhatsApp() {
  const btnRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Entrance animation
    gsap.fromTo(
      btnRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 2 }
    );

    // Pulse ring
    gsap.to('.wa-pulse', {
      scale: 1.8,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      repeat: -1,
      delay: 2.5,
    });

    return () => {
      gsap.killTweensOf(btnRef.current);
      gsap.killTweensOf('.wa-pulse');
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href={social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      id="floating-whatsapp-btn"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <span className="wa-pulse" />
      <SiWhatsapp className="wa-icon" />

      <style>{`
        .floating-wa {
          position: fixed;
          bottom: 5.5rem;
          right: 1.5rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          z-index: 9990;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
          text-decoration: none;
        }

        .floating-wa:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);
        }

        .wa-icon {
          font-size: 1.6rem;
          position: relative;
          z-index: 1;
        }

        .wa-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.4);
          transform-origin: center;
        }

        @media (max-width: 600px) {
          .floating-wa {
            bottom: 5rem;
            right: 1rem;
            width: 50px;
            height: 50px;
          }
          .wa-icon {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </a>
  );
}
