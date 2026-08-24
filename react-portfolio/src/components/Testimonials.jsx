import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STORAGE_KEY = 'portfolio_testimonials_reviews';

const DEFAULT_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Ali Khan',
    role: 'Business Owner',
    rating: 5,
    text: 'Excellent work! Delivered the project on time with clean, well-structured code. Great communication throughout. Highly recommend for any web development project.',
    tags: ['Reliable', 'Clean Code', 'On Time'],
    source: 'Client · Web Project',
    isSample: true,
  },
  {
    id: 't-2',
    name: 'Hanzla Saeed',
    role: 'Startup Founder',
    rating: 5,
    text: 'Outstanding attention to detail and a great eye for design. Built exactly what we envisioned — responsive, fast, and beautifully crafted.',
    tags: ['Detail Oriented', 'Great Design'],
    source: 'Client · Frontend Project',
    isSample: true,
  },
];

const AUTH_KEY = 'portfolio_owner_auth';
const ADMIN_PIN = '4186';

/* ── Star Icon (Clean White) ───────────────────────────── */
function StarIcon({ filled, size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? '#ffffff' : 'none'}
      stroke="#ffffff"
      strokeWidth="1.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ── Interactive Star Rating Picker (White Stars) ──────── */
function StarRatingInput({ rating, setRating }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hovered ? star <= hovered : star <= rating;
        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="p-0.5 transition-transform hover:scale-125 focus:outline-none"
            aria-label={`${star} star`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={isFilled ? '#ffffff' : 'none'}
              stroke="#ffffff"
              strokeWidth="1.5"
              className="transition-colors duration-150"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
      <span className="text-[0.7rem] font-bold ml-1 text-white">
        {rating}.0
      </span>
    </div>
  );
}

/* ── Owner Auth PIN Modal ──────────────────────────────── */
function AdminAuthModal({ isOpen, onClose, onAuthenticated }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.trim() === ADMIN_PIN) {
      onAuthenticated();
      setError('');
      setPin('');
      onClose();
    } else {
      setError('Incorrect passcode. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="card w-full max-w-xs p-6 relative flex flex-col gap-4 border border-white/15 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white text-sm"
        >
          ✕
        </button>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent-bright)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Owner Access</h4>
            <p className="text-[0.65rem] text-slate-400">Enter PIN to manage reviews</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <input
            type="password"
            autoFocus
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full px-3 py-2 rounded-lg text-xs bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[var(--accent-bright)]"
          />
          {error && <p className="text-[0.65rem] text-red-400">{error}</p>}
          <div className="flex items-center gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary text-xs py-1 px-3.5"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Compact Testimonial Card ──────────────────────────── */
function TestimonialCard({ testimonial, onDelete, isAdmin }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = testimonial.text && testimonial.text.length > 110;

  return (
    <div className="test-card card flex flex-col justify-between gap-3.5 p-5 relative overflow-hidden h-full group">
      {/* Top right container for Verified badge + Delete action (Owner Only) */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
        {/* Verified Badge */}
        <div
          className="text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1"
          style={{
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            color: '#22c55e',
          }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Verified
        </div>

        {/* Delete button (Visible & accessible ONLY to owner in Admin Mode) */}
        {isAdmin && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(testimonial.id)}
            title="Delete review (Owner only)"
            aria-label="Delete review"
            className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {/* Stars + rating in pure white */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < testimonial.rating} />
            ))}
          </div>
          <span className="text-xs font-bold text-white">
            {testimonial.rating}.0
          </span>
        </div>

        {/* Quote text */}
        <div>
          <p className="text-xs leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
            "{isLong && !isExpanded ? `${testimonial.text.slice(0, 110)}...` : testimonial.text}"
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-[0.68rem] font-semibold inline-flex items-center gap-0.5 hover:underline"
              style={{ color: 'var(--accent-bright)' }}
            >
              {isExpanded ? 'See Less ↑' : 'See More ↓'}
            </button>
          )}
        </div>

        {/* Tags */}
        {testimonial.tags && testimonial.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[0.58rem] font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[0.7rem] font-bold flex-shrink-0 uppercase"
          style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', color: 'var(--accent-bright)' }}
        >
          {testimonial.name ? testimonial.name.charAt(0) : 'U'}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold truncate leading-tight">{testimonial.name}</p>
          <p className="text-[0.6rem] truncate" style={{ color: 'var(--text-muted)' }}>
            {testimonial.source || (testimonial.role ? `Client · ${testimonial.role}` : 'Client Review')}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Streamlined Review Form Card (Condensed) ─────────── */
function ReviewFormCard({ onAddReview }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setErrorMessage('Please enter your name & review.');
      return;
    }

    setErrorMessage('');
    const newReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Client',
      rating,
      text: text.trim(),
      tags: ['Verified Feedback'],
      source: role.trim() ? `Client · ${role.trim()}` : 'Client · Verified Review',
      isSample: false,
    };

    onAddReview(newReview);
    setIsSubmitted(true);
    setName('');
    setRole('');
    setText('');
    setRating(5);
  };

  return (
    <div
      className="test-card card flex flex-col justify-between gap-3 p-5 h-full relative overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-accent)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </span>
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
            Share Review
          </h3>
        </div>
        <StarRatingInput rating={rating} setRating={setRating} />
      </div>

      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-4 text-center gap-2 my-auto">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-emerald-400"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Review Added! 🎉</h4>
            <p className="text-[0.68rem]" style={{ color: 'var(--text-secondary)' }}>
              Saved to your portfolio.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-[0.68rem] font-semibold text-[var(--accent)] hover:underline mt-1"
          >
            + Add Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Name & Role in single row */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name *"
              className="w-full px-2.5 py-1.5 rounded-lg text-[0.72rem] transition-colors focus:outline-none"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role / Title"
              className="w-full px-2.5 py-1.5 rounded-lg text-[0.72rem] transition-colors focus:outline-none"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Feedback */}
          <textarea
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full px-2.5 py-1.5 rounded-lg text-[0.72rem] transition-colors focus:outline-none resize-none"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          />

          {errorMessage && (
            <p className="text-[0.62rem] text-red-400 font-medium">
              {errorMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary text-xs py-1.5 w-full flex items-center justify-center gap-1.5"
          >
            <span>Post Review</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}

/* ── Main Testimonials Section ─────────────────────────── */
export default function Testimonials() {
  const ref = useRef(null);
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [showAdminModal, setShowAdminModal] = useState(false);

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_TESTIMONIALS;
  });

  const [showAll, setShowAll] = useState(false);

  const handleUnlockAdmin = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLockAdmin = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReview = (newReview) => {
    setTestimonials((prev) => {
      const updated = [newReview, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving review to localStorage', err);
      }
      return updated;
    });
  };

  const handleDeleteReview = (reviewId) => {
    setTestimonials((prev) => {
      const updated = prev.filter((item) => item.id !== reviewId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Error deleting review from localStorage', err);
      }
      return updated;
    });
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.test-hdr', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.test-hdr', start: 'top 88%' },
      });
      gsap.from('.test-card', {
        opacity: 0, y: 28, duration: 0.55, stagger: 0.08, ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.test-grid', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const topReviews = testimonials.slice(0, 2);
  const remainingReviews = testimonials.slice(2);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-spacing"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Admin Auth PIN Modal */}
      <AdminAuthModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onAuthenticated={handleUnlockAdmin}
      />

      <div className="section-container">

        {/* Header with discreet Owner Access trigger */}
        <div className="test-hdr mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <p className="section-label mb-0">Testimonials</p>
              {isAdmin ? (
                <button
                  type="button"
                  onClick={handleLockAdmin}
                  title="Click to lock and hide delete buttons"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.62rem] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer shadow-sm"
                >
                  <span> Owner Mode Active</span>
                  <span className="opacity-60 hover:opacity-100"></span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAdminModal(true)}
                  title="Owner login to manage reviews"
                  className="opacity-30 hover:opacity-100 text-slate-400 hover:text-[var(--accent-bright)] transition-opacity p-0.5 cursor-pointer"
                  aria-label="Owner access"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </button>
              )}
            </div>
            <h2 className="section-heading">
              What Clients <span className="accent">say</span>
            </h2>
          </div>
        </div>

        {/* Condensed 3-column Grid */}
        <div className="test-grid grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {topReviews.map((t) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              onDelete={handleDeleteReview}
              isAdmin={isAdmin}
            />
          ))}

          {/* Condensed Form Card */}
          <ReviewFormCard onAddReview={handleAddReview} />
        </div>

        {/* Expandable "See More Reviews" */}
        {remainingReviews.length > 0 && (
          <div className="mt-6 flex flex-col items-center">
            {showAll && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch mb-6">
                {remainingReviews.map((t) => (
                  <TestimonialCard
                    key={t.id}
                    testimonial={t}
                    onDelete={handleDeleteReview}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary text-xs px-5 py-2 flex items-center gap-2"
            >
              <span>{showAll ? 'Show Fewer Reviews' : `See More Reviews (${remainingReviews.length} more)`}</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
