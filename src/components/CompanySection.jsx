import { useState, useRef, useEffect } from 'react';
import './CompanySection.css';

const companyCards = [
  {
    id: 'about',
    number: '01',
    title: 'About Us',
    subtitle: 'Building Future-Ready Solutions',
    accentColor: '#2563EB',
    accentSoft: '#EAF2FF',
    accentRgb: '37, 99, 235',
    iconGradient: 'linear-gradient(135deg, #2563EB, #4F8CFF)',
    shadowColor: 'rgba(37, 99, 235, 0.25)',
    href: '#about',
    iconType: 'building',
  },
  {
    id: 'why',
    number: '02',
    title: 'Why Jupical',
    subtitle: 'Your Growth, Our Mission',
    accentColor: '#7C3AED',
    accentSoft: '#F2ECFF',
    accentRgb: '124, 58, 237',
    iconGradient: 'linear-gradient(135deg, #7C3AED, #9F67FF)',
    shadowColor: 'rgba(124, 58, 237, 0.25)',
    href: '#why',
    iconType: 'target',
  },
  {
    id: 'clients',
    number: '03',
    title: 'Our Clients',
    subtitle: 'Trusted by Growing Businesses',
    accentColor: '#0F9F9A',
    accentSoft: '#E8F8F6',
    accentRgb: '15, 159, 154',
    iconGradient: 'linear-gradient(135deg, #0F9F9A, #22C7BE)',
    shadowColor: 'rgba(15, 159, 154, 0.25)',
    href: '#clients',
    iconType: 'clients',
  },
  {
    id: 'philosophy',
    number: '04',
    title: 'Our Philosophy',
    subtitle: 'Simplicity. Scalability. Success.',
    accentColor: '#F59E0B',
    accentSoft: '#FFF6DE',
    accentRgb: '245, 158, 11',
    iconGradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    shadowColor: 'rgba(245, 158, 11, 0.25)',
    href: '#philosophy',
    iconType: 'philosophy',
  },
  {
    id: 'blog',
    number: '05',
    title: 'Blog',
    subtitle: 'Ideas, Trends & Technology',
    accentColor: '#F97316',
    accentSoft: '#FFF0E8',
    accentRgb: '249, 115, 22',
    iconGradient: 'linear-gradient(135deg, #F97316, #FB923C)',
    shadowColor: 'rgba(249, 115, 22, 0.25)',
    href: '#blogs',
    iconType: 'blog',
  },
];

/* ---- Individual Custom SVG Icons with Animations ---- */

function AboutIcon() {
  return (
    <div className="company-icon-wrapper company-icon--building">
      {/* Decorative growth line behind icon */}
      <svg className="company-icon-bg-line" viewBox="0 0 60 60" fill="none">
        <path d="M5 50 C20 45, 30 25, 55 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M50 10 L55 10 L55 15" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <svg className="company-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Building2 */}
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
        <path d="M6 12H4a2 2 0 0 0-2 2v8" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
      {/* Sparkles accent */}
      <svg className="company-icon-sparkles" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </div>
  );
}

function TargetIcon() {
  return (
    <div className="company-icon-wrapper company-icon--target">
      {/* Subtle radial glow ring */}
      <div className="company-target-pulse-ring" />
      <svg className="company-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Bullseye / Target */}
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        {/* Tiny star in center */}
        <polygon className="company-target-star" points="12,8 13.1,10.5 15.8,10.7 13.7,12.5 14.4,15.2 12,13.8 9.6,15.2 10.3,12.5 8.2,10.7 10.9,10.5" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

function ClientsIcon() {
  return (
    <div className="company-icon-wrapper company-icon--clients">
      {/* Network background nodes */}
      <div className="company-network-pattern">
        <span className="net-dot net-dot--1" />
        <span className="net-dot net-dot--2" />
        <span className="net-line" />
      </div>
      <svg className="company-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Handshake / Partnership */}
        <path d="M11 15h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
        <path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7" />
        <path d="M7 15l-3 3a2 2 0 0 0 0 2.83l.17.17a2 2 0 0 0 2.83 0l3.5-3.5" />
        <path d="M14 15.5l3.5 3.5a2 2 0 0 0 2.83 0l.17-.17a2 2 0 0 0 0-2.83l-3.5-3.5" />
        <path d="M11 11.5l1.5-1.5" />
      </svg>
    </div>
  );
}

function PhilosophyIcon() {
  return (
    <div className="company-icon-wrapper company-icon--philosophy">
      {/* Glow rays */}
      <div className="company-lightbulb-rays">
        <span className="ray ray-1" />
        <span className="ray ray-2" />
        <span className="ray ray-3" />
      </div>
      <svg className="company-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Lightbulb with infinity motif inside */}
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        {/* Infinity symbol in filament */}
        <path className="infinity-filament" d="M9.5 9.5 C9 8.5, 7.5 8.5, 7.5 9.5 C7.5 10.5, 9 10.5, 12 9.5 C15 8.5, 16.5 8.5, 16.5 9.5 C16.5 10.5, 15 10.5, 14.5 9.5" strokeWidth="1.4" fill="none" />
      </svg>
    </div>
  );
}

function BlogIcon() {
  return (
    <div className="company-icon-wrapper company-icon--blog">
      {/* Upward floating sparkle */}
      <svg className="company-blog-sparkle" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
      <svg className="company-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Newspaper */}
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8z" />
      </svg>
    </div>
  );
}

function RenderIcon({ type }) {
  switch (type) {
    case 'building': return <AboutIcon />;
    case 'target': return <TargetIcon />;
    case 'clients': return <ClientsIcon />;
    case 'philosophy': return <PhilosophyIcon />;
    case 'blog': return <BlogIcon />;
    default: return <AboutIcon />;
  }
}

/* ---- Single Card Component with Cursor Spotlight ---- */
function CompanyCard({ card, index, isVisible }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <a
      href={card.href}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      id={`company-card-${card.id}`}
      className={`company-card ${card.id === 'why' ? 'company-card--featured' : ''} ${
        isVisible ? 'company-card--visible' : ''
      }`}
      style={{
        '--card-accent': card.accentColor,
        '--card-accent-soft': card.accentSoft,
        '--card-accent-rgb': card.accentRgb,
        '--card-gradient': card.iconGradient,
        '--card-shadow': card.shadowColor,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Animated Border Traveling Highlight */}
      <div className="company-card__border-glow" aria-hidden="true" />

      {/* Spotlight Radial Overlay */}
      <div className="company-card__spotlight" aria-hidden="true" />

      {/* Soft Hover Gradient Background */}
      <div className="company-card__hover-bg" aria-hidden="true" />

      {/* Card Header: Icon + Number */}
      <div className="company-card__top">
        <div className="company-card__icon-box">
          <RenderIcon type={card.iconType} />
        </div>
        <span className="company-card__number">{card.number}</span>
      </div>

      {/* Card Content: Title + Subtitle */}
      <div className="company-card__content">
        <h3 className="company-card__title">{card.title}</h3>
        <p className="company-card__subtitle">{card.subtitle}</p>
      </div>

      {/* Bottom Right Circular Arrow Button */}
      <div className="company-card__footer">
        <div className="company-card__arrow-btn" aria-label={`Navigate to ${card.title}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function CompanySection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="company-section" id="company" ref={sectionRef} aria-label="Company Navigation">
      <div className="container company-section__container">
        
        {/* Section Heading */}
        <div className="company-section__header">
          <div className="company-section__eyebrow-wrap">
            <span className="company-section__eyebrow-line" />
            <span className="company-section__eyebrow-text">EXPLORE JUPICAL</span>
          </div>
          <h2 className="company-section__heading">
            Built Around Your Business.
          </h2>
          <p className="company-section__subheading">
            Discover the people, principles, partnerships and ideas behind Jupical.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="company-section__grid">
          {companyCards.map((card, index) => (
            <CompanyCard
              key={card.id}
              card={card}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
