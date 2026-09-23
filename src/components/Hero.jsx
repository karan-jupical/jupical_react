import HeroVisual from './HeroVisual';
import Clients from './Clients';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Clean soft gradient backdrop */}
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__glow hero__glow--blue" />
        <div className="hero__glow hero__glow--cyan" />
        <div className="hero__grid-pattern" />
      </div>

      <div className="container hero__container">
        <div className="hero__grid">
          {/* LEFT SIDE CONTENT */}
          <div className="hero__left">
            {/* Certification Badge */}
            <div className="hero__eyebrow">
              <svg className="hero__shield-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 3.5V7.5C2 11.2 4.6 14.6 8 15.5C11.4 14.6 14 11.2 14 7.5V3.5L8 1Z" stroke="#0075FF" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M5.5 7.5L7 9L10.5 5.5" stroke="#0075FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>CERTIFIED ODOO ERP PARTNER</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero__title">
              Building Smarter
              <br />
              Operations.
              <br />
              Driving <span className="hero__title-highlight">Real Growth.</span>
            </h1>

            {/* Subtitle Description */}
            <p className="hero__description">
              Jupical helps manufacturers, construction, and finance businesses automate, integrate, and scale with expert Odoo ERP implementation and custom development.
            </p>

            {/* Action Buttons */}
            <div className="hero__actions">
              <a href="#solutions" className="hero__btn hero__btn--primary" id="hero-btn-explore">
                <span>Explore Solutions</span>
                <span className="hero__btn-icon">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>

              <a href="#contact" className="hero__btn hero__btn--secondary" id="hero-btn-contact">
                <span>Contact Us</span>
                <span className="hero__btn-icon hero__btn-icon--outline">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Trust Flags & Social Proof */}
            <div className="hero__trust-wrapper">
              <div className="hero__country-chips">
                <span className="hero__country-chip"><span className="chip-flag">🇺🇸</span> USA</span>
                <span className="hero__country-chip"><span className="chip-flag">🇮🇳</span> INDIA</span>
                <span className="hero__country-chip"><span className="chip-flag">🇬🇧</span> UK</span>
                <span className="hero__country-chip"><span className="chip-flag">🇦🇪</span> UAE</span>
                <span className="hero__country-chip"><span className="chip-flag">🇨🇦</span> CANADA</span>
              </div>
              <div className="hero__trust-sub">
                Trusted by <strong>5000+ Businesses</strong> across <strong>32+ Countries</strong>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — INTERACTIVE 3D ODOO ERP ECOSYSTEM / DASHBOARD */}
          <div className="hero__right">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* OUR CLIENTS SHOWCASE — PLACED RIGHT NEXT TO / BELOW THE HERO DASHBOARD */}
      <Clients />

    </section>
  );
}
