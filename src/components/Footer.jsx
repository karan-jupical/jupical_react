import { useState } from 'react';
import JourneyVisual from './JourneyVisual';
import './Footer.css';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/jupical-technologies/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    href: 'https://twitter.com/jupical',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@jupicaltechnologies',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.8C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9l5.4 2.8-5.4 2.7z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); }
  };

  return (
    <footer className="footer" id="contact" aria-label="Site footer">
      {/* About & Hire Odoo Expert Section */}
      <div className="footer__about-section">
        <div className="container">
          <div className="footer__about-grid">
            {/* Left Column: Animated Journey Visual Image */}
            <div className="footer__about-image-col">
              <JourneyVisual />
            </div>

            {/* Right Column: Text & Hire Odoo Expert Button */}
            <div className="footer__about-content-col">
              <p className="footer__about-paragraph">
                Founded in 2016 and officially registered as a Pvt. Ltd. in 2018, Jupical began with a vision to revolutionize business operations for industries worldwide. As a certified Odoo partner, our relentless pursuit of innovation has helped organizations across the globe achieve automation, efficiency, and measurable growth.
              </p>
              <p className="footer__about-paragraph">
                Our dedicated resource model allows us to deliver Odoo ERP implementation and support services with consistent quality no matter where our clients are located.
              </p>
              <div className="footer__about-action">
                <a href="mailto:info@jupical.io" className="footer__hire-btn" id="hire-odoo-expert-btn">
                  Hire Odoo Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Brand section */}
      <div className="footer__links-section">
        <div className="container footer__brand-container">
          <div className="footer__brand-clean">
            <div className="footer__logo">
              <img src="/footer-logo.png" alt="Jupical Technologies Logo" className="footer__logo-img" />
            </div>
            <p className="footer__brand-desc">
              Jupical is a Certified Odoo ERP Partner specializing in manufacturing, finance, and enterprise digital transformation. Through expert ERP implementation and offshore development services, we deliver precision-built solutions that streamline operations, eliminate inefficiencies, and position businesses for long term growth across 32+ countries and counting.
            </p>
            <div className="footer__brand-bottom">
              <div className="footer__social">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    id={`footer-social-${s.label.toLowerCase().replace(/\//g, '-')}`}
                    className="footer__social-link" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="footer__contact-info">
                <a href="mailto:info@jupical.io" className="footer__contact-link">info@jupical.io</a>
                <span className="contact-divider">•</span>
                <a href="tel:+919327155568" className="footer__contact-link">+91 93271 55568</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Jupical Technologies Pvt. Ltd. All rights reserved.</span>
          <span className="footer__odoo-badge">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" fill="#875A7B" />
            </svg>
            Powered by Odoo
          </span>
        </div>
      </div>
    </footer>
  );
}
