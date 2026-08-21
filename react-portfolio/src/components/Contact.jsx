import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdEmail, MdArrowOutward } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { social } from '../data/social';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    id: 'email',
    icon: MdEmail,
    label: 'Email',
    value: 'mb16837157@gmail.com',
    href: `mailto:mb16837157@gmail.com`,
    color: '#E67E50',
    bgColor: 'rgba(230, 126, 80, 0.08)',
    borderColor: 'rgba(230, 126, 80, 0.2)',
    description: 'Drop me a line anytime',
  },
  {
    id: 'whatsapp',
    icon: SiWhatsapp,
    label: 'WhatsApp',
    value: '+92 308 8346800',
    href: social.whatsapp,
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.08)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
    description: 'Chat with me directly',
  },
  {
    id: 'linkedin',
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'muhammad-bilal71',
    href: social.linkedin,
    color: '#60A5FA',
    bgColor: 'rgba(96, 165, 250, 0.08)',
    borderColor: 'rgba(96, 165, 250, 0.2)',
    description: 'Connect professionally',
  },
  {
    id: 'github',
    icon: SiGithub,
    label: 'GitHub',
    value: 'mbilal-71',
    href: social.github,
    color: '#F1F5F9',
    bgColor: 'rgba(241, 245, 249, 0.06)',
    borderColor: 'rgba(241, 245, 249, 0.1)',
    description: 'Explore my code',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-header', start: 'top 85%' },
      });

      gsap.from('.contact-method-card', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-methods-grid', start: 'top 82%' },
      });

      gsap.from('.contact-cta-box', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-cta-box', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="section-divider" />
      <div className="container" style={{ paddingTop: '7rem' }}>
        <div className="contact-header section-header">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-heading">
            Let&apos;s Build Something <span className="accent">Together</span>
          </h2>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Whether you have a project in mind, a collaboration idea, or just want to say hi —
            I&apos;d love to hear from you. Pick your preferred channel.
          </p>
        </div>

        <div className="contact-methods-grid">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.id}
                href={method.href}
                target={method.id !== 'email' ? '_blank' : undefined}
                rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                className="contact-method-card card"
                id={`contact-${method.id}`}
                aria-label={`Contact via ${method.label}`}
              >
                <div
                  className="contact-icon-wrap"
                  style={{
                    background: method.bgColor,
                    borderColor: method.borderColor,
                    color: method.color,
                  }}
                >
                  <Icon />
                </div>
                <div className="contact-method-body">
                  <span className="contact-method-label">{method.label}</span>
                  <p className="contact-method-value">{method.value}</p>
                  <p className="contact-method-desc">{method.description}</p>
                </div>
                <MdArrowOutward className="contact-arrow" />
              </a>
            );
          })}
        </div>

        {/* CTA box */}
        <div className="contact-cta-box">
          <div className="contact-cta-content">
            <h3 className="contact-cta-title">Ready to start a project?</h3>
            <p className="contact-cta-desc">
              I&apos;m currently available for freelance work and open to full-time opportunities.
            </p>
          </div>
          <a
            href={social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="contact-cta-whatsapp"
          >
            Message on WhatsApp <MdArrowOutward />
          </a>
        </div>
      </div>

      <style>{`
        .contact-methods-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .contact-method-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          position: relative;
          cursor: pointer;
          text-decoration: none;
        }

        .contact-method-card:hover {
          transform: translateY(-4px);
        }

        .contact-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .contact-method-card:hover .contact-icon-wrap {
          transform: scale(1.1);
        }

        .contact-method-body {
          flex: 1;
          min-width: 0;
        }

        .contact-method-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.2rem;
        }

        .contact-method-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .contact-method-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .contact-arrow {
          font-size: 1rem;
          color: var(--text-muted);
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .contact-method-card:hover .contact-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: var(--accent-orange);
        }

        /* CTA Box */
        .contact-cta-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--accent-orange-border);
          border-radius: var(--radius-lg);
          padding: 2rem 2.5rem;
          margin-top: 1.5rem;
          background: linear-gradient(135deg, rgba(230, 126, 80, 0.05) 0%, var(--bg-card) 100%);
        }

        .contact-cta-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .contact-cta-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .contact-methods-grid {
            grid-template-columns: 1fr;
          }
          .contact-cta-box {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem;
          }
          .contact-cta-box .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .contact-method-value {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
