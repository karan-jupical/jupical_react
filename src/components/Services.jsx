import { useState, useEffect, useRef } from 'react';
import './Services.css';

const services = [
  {
    id: 1,
    index: '01 / 12',
    title: 'Implementation',
    desc: 'End-to-end Odoo ERP implementation tailored to your business requirements and goals.',
    tags: 'STRATEGY • CONFIGURATION • DEPLOYMENT',
    icon: '/services/implementation.png',
  },
  {
    id: 2,
    index: '02 / 12',
    title: 'Customisation',
    desc: 'Custom modules, workflows, and reports built to match your unique processes.',
    tags: 'MODULES • WORKFLOWS • REPORTS',
    icon: '/services/customisation.png',
  },
  {
    id: 3,
    index: '03 / 12',
    title: 'Product Development',
    desc: 'Building scalable, custom Odoo applications and SaaS products from scratch.',
    tags: 'APPS • SAAS • SCALABILITY',
    icon: '/services/product_dev.png',
  },
  {
    id: 4,
    index: '04 / 12',
    title: 'Dedicated',
    desc: 'Experienced Odoo developers working directly as an extension of your internal team.',
    tags: 'TEAM • FULL-TIME • EXPERT',
    icon: '/services/dedicated.png',
  },
  {
    id: 5,
    index: '05 / 12',
    title: 'Integration',
    desc: 'Seamlessly connecting Odoo with third-party software, APIs, and payment gateways.',
    tags: 'API • THIRD-PARTY • SYNC',
    icon: '/services/integration.png',
  },
  {
    id: 6,
    index: '06 / 12',
    title: 'On Demand',
    desc: 'Flexible, on-demand technical and functional assistance whenever you need it.',
    tags: 'FLEXIBLE • SLA • ON-DEMAND',
    icon: '/services/ondemand.png',
  },
  {
    id: 7,
    index: '07 / 12',
    title: 'Training',
    desc: 'Empowering your staff with comprehensive Odoo user and administrator training.',
    tags: 'USER • ADMIN • HANDS-ON',
    icon: '/services/training.png',
  },
  {
    id: 8,
    index: '08 / 12',
    title: 'Support',
    desc: 'Round-the-clock maintenance, bug fixes, and system monitoring for peak uptime.',
    tags: '24/7 • MAINTENANCE • HELP',
    icon: '/services/support.png',
  },
  {
    id: 9,
    index: '09 / 12',
    title: 'System Optimisation',
    desc: 'Fine-tuning database performance, query speeds, and overall system efficiency.',
    tags: 'PERFORMANCE • SPEED • QUERIES',
    icon: '/services/system_opt.png',
  },
  {
    id: 10,
    index: '10 / 12',
    title: 'Code Migration',
    desc: 'Updating custom modules and scripts to the latest Odoo version seamlessly.',
    tags: 'PYTHON • OWL • UPGRADES',
    icon: '/services/code_migration.png',
  },
  {
    id: 11,
    index: '11 / 12',
    title: 'Data Migration',
    desc: 'Securely migrating your data with zero downtime and complete accuracy.',
    tags: 'SECURE • ACCURATE • RELIABLE',
    icon: '/services/data_migration.png',
  },
  {
    id: 12,
    index: '12 / 12',
    title: 'Mobile Application',
    desc: 'Native and hybrid mobile app development integrated directly into your Odoo ERP.',
    tags: 'IOS • ANDROID • HYBRID',
    icon: '/services/mobile_app.png',
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Preload all 12 service icons on mount for instant rendering
  useEffect(() => {
    services.forEach((svc) => {
      const img = new Image();
      img.src = svc.icon;
    });
  }, []);

  // Continuous auto-rotation every 2 seconds across all 12 services
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getCardClass = (index) => {
    const total = services.length;
    const diff = (index - currentIndex + total) % total;

    if (diff === 0) return 'service-card--active';
    if (diff === 1) return 'service-card--right';
    if (diff === total - 1) return 'service-card--left';
    return 'service-card--hidden';
  };

  return (
    <section className="services section-white" id="services" aria-label="Services">
      <div className="container services__container">
        
        {/* Header */}
        <div className="services__header">
          <div className="eyebrow-pill">WHAT WE DO</div>
          <h2 className="services__title">
            Our <span className="text-blue-accent">Services</span>
          </h2>
          <p className="services__subtitle">
            Comprehensive Odoo ERP solutions tailored to streamline, integrate, and grow your business.
          </p>
        </div>

        {/* Showcase Wrapper */}
        <div className="services__showcase-wrapper">
          
          {/* Ghost Background Heading */}
          <div className="services__ghost-heading" aria-hidden="true">
            12 Services. One Odoo Partner.
          </div>

          {/* Card Stack Container */}
          <div 
            className="services__stack-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Prev Arrow */}
            <button 
              className="services__nav-btn services__nav-btn--prev"
              onClick={handlePrev}
              aria-label="Previous Service"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            {/* 12 Cards Stack */}
            <div className="services__cards-stage">
              {services.map((svc, i) => {
                const cardClass = getCardClass(i);
                return (
                  <div
                    key={svc.id}
                    className={`service-card ${cardClass}`}
                    onClick={() => {
                      if (cardClass.includes('service-card--left')) handlePrev();
                      if (cardClass.includes('service-card--right')) handleNext();
                    }}
                  >
                    <div className="service-card__top">
                      <span className="service-card__index">{svc.index}</span>
                    </div>

                    <div className="service-card__icon-wrap">
                      <img 
                        src={svc.icon} 
                        alt={svc.title} 
                        className="service-card__icon"
                        loading="eager"
                        decoding="async"
                      />
                    </div>

                    <div className="service-card__body">
                      <h3 className="service-card__title">{svc.title}</h3>
                      <p className="service-card__desc">{svc.desc}</p>
                      <div className="service-card__tags">{svc.tags}</div>
                      <a href="#contact" className="service-card__link">
                        Explore Service <span className="arrow">→</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Arrow */}
            <button 
              className="services__nav-btn services__nav-btn--next"
              onClick={handleNext}
              aria-label="Next Service"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="services__dots" role="tablist">
            {services.map((svc, i) => (
              <button
                key={svc.id}
                className={`services__dot ${i === currentIndex ? 'services__dot--active' : ''}`}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to service ${svc.title}`}
                role="tab"
                aria-selected={i === currentIndex}
              />
            ))}
          </div>

          {/* Bottom Trust Badge Bar */}
          <div className="services__trust-bar">
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0075FA" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Certified Odoo Experts</span>
            </div>
            <span className="trust-divider">|</span>
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0075FA" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Proven Methodologies</span>
            </div>
            <span className="trust-divider">|</span>
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0075FA" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>On-Time Delivery</span>
            </div>
            <span className="trust-divider">|</span>
            <div className="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0075FA" strokeWidth="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
              <span>Long-Term Support</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
