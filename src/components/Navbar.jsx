import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

/* ---- Custom Navigation Icons (16-18px thin-line minimal design) ---- */

function CompanyNavIcon() {
  return (
    <svg className="navbar__nav-icon navbar__nav-icon--company" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11" />
      <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" />
    </svg>
  );
}

function ErpNetworkIcon() {
  return (
    <svg className="navbar__nav-icon navbar__erp-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="6" y1="18" x2="12" y2="6" stroke="#0075FF" strokeWidth="1.8" className="erp-line erp-line--1" />
      <line x1="18" y1="18" x2="12" y2="6" stroke="#0075FF" strokeWidth="1.8" className="erp-line erp-line--2" />
      <line x1="6" y1="18" x2="18" y2="18" stroke="#0075FF" strokeWidth="1.8" className="erp-line erp-line--3" />
      <circle cx="12" cy="6" r="3" fill="#0075FF" className="erp-node erp-node--top" />
      <circle cx="6" cy="18" r="3" fill="#0075FF" className="erp-node erp-node--left" />
      <circle cx="18" cy="18" r="3" fill="#0075FF" className="erp-node erp-node--right" />
      <circle cx="12" cy="14" r="1.5" fill="#38BDF8" className="erp-node erp-node--center" />
    </svg>
  );
}

function ConnectorsNavIcon() {
  return (
    <svg className="navbar__nav-icon navbar__nav-icon--connectors" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6" /><path d="M12 16v6" />
      <path d="M4.93 10.93l4.24 4.24" /><path d="M14.83 8.83l4.24 4.24" />
      <circle cx="12" cy="12" r="3" stroke="#0075FF" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="2" r="1.5" fill="#0075FF" />
      <circle cx="12" cy="22" r="1.5" fill="#0075FF" />
    </svg>
  );
}

function ResourcesNavIcon() {
  return (
    <svg className="navbar__nav-icon navbar__nav-icon--resources" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" />
    </svg>
  );
}

function ContactNavIcon() {
  return (
    <svg className="navbar__contact-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function LoginNavIcon() {
  return (
    <svg className="navbar__login-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

/* Platform Logo Icons */
function ConnectorPlatformLogo({ id }) {
  switch (id) {
    case 'shopify':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#95BF47" />
          <path d="M15.5 8L14 17.5L8.5 16.5L7 9.5L15.5 8Z" fill="white" fillOpacity="0.3" />
          <path d="M15 6.5L13.5 17L9 16L7.5 8L15 6.5Z" fill="white" />
          <path d="M11 9.5C11 9 11.5 8.5 12 8.5C12.5 8.5 13 9 13 9.5" stroke="#95BF47" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'woocommerce':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#96588A" />
          <path d="M5 9.5L7.5 15.5L10 9.5L12 15.5L14.5 9.5L16.5 15.5L19 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'bigcommerce':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#1B2B4A" />
          <path d="M7 7H13C14.5 7 15.5 8 15.5 9.5C15.5 10.5 14.8 11.3 13.8 11.7C15 12.1 16 13.1 16 14.5C16 16.2 14.6 17 13 17H7V7Z" fill="white" />
        </svg>
      );
    case 'opencart':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#22B573" />
          <path d="M7 9H17L15.5 14H8.5L7 9Z" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="9.5" cy="17" r="1.5" fill="white" />
          <circle cx="14.5" cy="17" r="1.5" fill="white" />
        </svg>
      );
    case 'magento':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#F36423" />
          <path d="M6 9L12 5.5L18 9V16.5L15 18V11L12 13L9 11V18L6 16.5V9Z" fill="white" />
        </svg>
      );
    case 'prestashop':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#DF0067" />
          <path d="M12 6C9 6 7 8 7 11C7 15 12 18 12 18C12 18 17 15 17 11C17 8 15 6 12 6Z" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="10" r="2" fill="white" />
        </svg>
      );
    case 'quickbooks':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#2CA01C" />
          <path d="M7.5 9C7.5 7.6 8.6 6.5 10 6.5C11.4 6.5 12.5 7.6 12.5 9V15C12.5 16.4 11.4 17.5 10 17.5C8.6 17.5 7.5 16.4 7.5 15V9Z" fill="white" opacity="0.4" />
          <path d="M11.5 9C11.5 7.6 12.6 6.5 14 6.5C15.4 6.5 16.5 7.6 16.5 9V15C16.5 16.4 15.4 17.5 14 17.5C12.6 17.5 11.5 16.4 11.5 15V9Z" fill="white" />
        </svg>
      );
    case 'sage':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#00D639" />
          <path d="M8 15C8 12.5 11 12 12 10.5C13 9 12 8 10.5 8C9 8 8 9 8 9M16 9C16 11.5 13 12 12 13.5C11 15 12 16 13.5 16C15 16 16 15 16 15" stroke="#003B00" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'xero':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#13B5EA" />
          <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'zohobooks':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#1284E7" />
          <rect x="6" y="6" width="5" height="5" rx="1" fill="#E42528" />
          <rect x="13" y="6" width="5" height="5" rx="1" fill="#2CA01C" />
          <rect x="6" y="13" width="5" height="5" rx="1" fill="#F8B133" />
          <rect x="13" y="13" width="5" height="5" rx="1" fill="#0075FF" />
        </svg>
      );
    case 'akaunting':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#5F63F2" />
          <path d="M12 6L6 18H9.5L12 13L14.5 18H18L12 6Z" fill="white" />
        </svg>
      );
    case 'netvisor':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#0080FF" />
          <path d="M6 14C8 10 10 10 12 14C14 18 16 18 18 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'bamboohr':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#73B721" />
          <path d="M12 6C12 6 9 9 9 13C9 15.5 10.5 17.5 12 18C13.5 17.5 15 15.5 15 13C15 9 12 6 12 6Z" fill="white" />
          <path d="M12 9V17" stroke="#73B721" strokeWidth="1.2" />
        </svg>
      );
    case 'zohopeople':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#F59E0B" />
          <circle cx="12" cy="9" r="2.5" fill="white" />
          <path d="M7.5 17C7.5 14.5 9.5 13 12 13C14.5 13 16.5 14.5 16.5 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'gusto':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#F44336" />
          <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2.2" fill="none" />
          <path d="M12 7V12H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#0075FF" />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      );
  }
}

const companyDropdownItems = [
  {
    num: '01',
    label: 'About Us',
    sub: 'Building Future-Ready Solutions',
    href: '#about',
    accent: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB, #4F8CFF)',
    rgb: '37, 99, 235',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
        <path d="M6 12H4a2 2 0 0 0-2 2v8" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11" />
        <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Why Jupical',
    sub: 'Your Growth, Our Mission',
    href: '#why',
    accent: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #9F67FF)',
    rgb: '124, 58, 237',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Our Clients',
    sub: 'Trusted by Growing Businesses',
    href: '#clients',
    accent: '#0F9F9A',
    gradient: 'linear-gradient(135deg, #0F9F9A, #22C7BE)',
    rgb: '15, 159, 154',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 15h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
        <path d="M18 11V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7" />
        <path d="M7 15l-3 3a2 2 0 0 0 0 2.83l.17.17a2 2 0 0 0 2.83 0l3.5-3.5" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Our Philosophy',
    sub: 'Simplicity. Scalability. Success.',
    href: '#philosophy',
    accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    rgb: '245, 158, 11',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" /><path d="M10 21h4" />
      </svg>
    ),
  },
  {
    num: '05',
    label: 'Blog',
    sub: 'Ideas, Trends & Technology',
    href: '#blogs',
    accent: '#F97316',
    gradient: 'linear-gradient(135deg, #F97316, #FB923C)',
    rgb: '249, 115, 22',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" />
      </svg>
    ),
  },
];

/* ---- Odoo ERPs Mega Menu Items ---- */
const odooErpItemsLeft = [
  {
    num: '01',
    label: 'Manufacturing ERP',
    sub: 'Automate production & shop floor',
    href: '#manufacturing',
    gradient: 'linear-gradient(135deg, #0075FF, #38BDF8)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16z"/>
        <path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Construction ERP',
    sub: 'Protecting materials with precision',
    href: '#construction',
    gradient: 'linear-gradient(135deg, #059669, #34D399)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/>
        <path d="M6 12H4a2 2 0 0 0-2 2v8"/><path d="M18 9h2a2 2 0 0 1 2 2v11"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Healthcare ERP',
    sub: 'Open-Source Healthcare ERP',
    href: '#healthcare',
    gradient: 'linear-gradient(135deg, #0284C7, #38BDF8)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Education ERP',
    sub: 'Open Source Education ERP',
    href: '#education',
    gradient: 'linear-gradient(135deg, #E11D48, #FB7185)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
];

const odooErpItemsRight = [
  {
    num: '05',
    label: 'Inventory ERP',
    sub: 'Smart inventory & warehouse management',
    href: '#inventory',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    num: '06',
    label: 'Finance ERP',
    sub: 'Accounting & financial management',
    href: '#finance',
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    num: '07',
    label: 'Hotel ERP',
    sub: 'Open Source ERP for Hospitality',
    href: '#hotel',
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>
        <path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
        <path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
      </svg>
    ),
  },
  {
    num: '08',
    label: 'Loan Management',
    sub: 'Open-Source Loan Management',
    href: '#lms',
    gradient: 'linear-gradient(135deg, #8B5CF6, #C084FC)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
];

/* ---- Odoo Connectors Data Structure (IMAGE 2) ---- */
const connectorsData = {
  ecommerce: [
    { id: 'shopify', name: 'Shopify', sub: 'E-Commerce', href: '#shopify' },
    { id: 'woocommerce', name: 'WooCommerce', sub: 'E-Commerce', href: '#woo' },
    { id: 'bigcommerce', name: 'BigCommerce', sub: 'E-Commerce', href: '#bigcommerce' },
    { id: 'opencart', name: 'OpenCart', sub: 'E-Commerce', href: '#opencart' },
    { id: 'magento', name: 'Magento', sub: 'E-Commerce', href: '#magento' },
    { id: 'prestashop', name: 'Prestashop', sub: 'E-Commerce', href: '#prestashop' },
  ],
  accounting: [
    { id: 'quickbooks', name: 'QuickBooks', sub: 'Accounting', href: '#qb' },
    { id: 'sage', name: 'Sage 50 Quantum desktop', sub: 'Accounting', href: '#sage' },
    { id: 'xero', name: 'Xero', sub: 'Accounting', href: '#xero' },
    { id: 'zohobooks', name: 'Zoho Books', sub: 'Accounting', href: '#zohobooks' },
    { id: 'akaunting', name: 'Akaunting', sub: 'Accounting', href: '#akaunting' },
    { id: 'netvisor', name: 'Netvisor', sub: 'Accounting', href: '#netvisor' },
  ],
  hr: [
    { id: 'bamboohr', name: 'Bamboo HR', sub: 'HR', href: '#bamboo' },
    { id: 'zohopeople', name: 'Zoho People', sub: 'HR', href: '#zohopeople' },
    { id: 'gusto', name: 'Gusto', sub: 'HR', href: '#gusto' },
  ],
};

/* ---- Resources Data Structure (Reference Image) ---- */
const resourcesData = {
  blogs: {
    title: 'Blogs',
    sub: 'Insights on ERP & Tech',
    accent: '#0075FF',
    badgeBg: 'rgba(0, 117, 255, 0.1)',
    badgeColor: '#0075FF',
    lineGrad: 'linear-gradient(90deg, #0075FF 0%, #38BDF8 80%, transparent 100%)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    items: [
      {
        id: 'latest-articles',
        label: 'Latest Articles',
        href: '#blogs',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        ),
      },
      {
        id: 'expert-insights',
        label: 'Expert Insights',
        href: '#blogs',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6"/><path d="M10 22h4"/>
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
          </svg>
        ),
      },
      {
        id: 'tech-trends',
        label: 'ERP & Tech Trends',
        href: '#blogs',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        ),
      },
    ],
    footerLabel: 'Explore All Blogs',
    footerHref: '#blogs',
  },
  caseStudies: {
    title: 'Case Studies',
    sub: 'Real-world success stories',
    accent: '#7C3AED',
    badgeBg: 'rgba(124, 58, 237, 0.1)',
    badgeColor: '#7C3AED',
    lineGrad: 'linear-gradient(90deg, #7C3AED 0%, #A78BFA 80%, transparent 100%)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    items: [
      {
        id: 'customer-stories',
        label: 'Customer Stories',
        href: '#case-studies',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
      },
      {
        id: 'industry-solutions',
        label: 'Industry Solutions',
        href: '#case-studies',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v8"/>
            <path d="M18 9h2a2 2 0 0 1 2 2v11"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/>
          </svg>
        ),
      },
      {
        id: 'implementation-journeys',
        label: 'Implementation Journeys',
        href: '#case-studies',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
        ),
      },
    ],
    footerLabel: 'Explore All Case Studies',
    footerHref: '#case-studies',
  },
  successStories: {
    title: 'Success Stories',
    sub: 'Video testimonials',
    accent: '#06B6D4',
    badgeBg: 'rgba(6, 182, 212, 0.1)',
    badgeColor: '#06B6D4',
    lineGrad: 'linear-gradient(90deg, #06B6D4 0%, #67E8F9 80%, transparent 100%)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    items: [
      {
        id: 'video-testimonials',
        label: 'Video Testimonials',
        href: '#success',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
          </svg>
        ),
      },
      {
        id: 'client-experiences',
        label: 'Client Experiences',
        href: '#success',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        ),
      },
      {
        id: 'success-highlights',
        label: 'Success Highlights',
        href: '#success',
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
            <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
          </svg>
        ),
      },
    ],
    footerLabel: 'Explore All Success Stories',
    footerHref: '#success',
  },
};

const navItems = [
  { label: 'Company', href: '#company', isCompany: true, icon: <CompanyNavIcon /> },
  { label: 'Odoo ERPs', href: '#odoo-erps', isOdooMega: true, icon: <ErpNetworkIcon /> },
  { label: 'Odoo Connectors', href: '#connectors', isConnectorsMega: true, icon: <ConnectorsNavIcon /> },
  { label: 'Resources', href: '#resources', isResourcesMega: true, icon: <ResourcesNavIcon /> },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-btn"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-toggle__track${isDark ? ' theme-toggle__track--dark' : ''}`}>
        <span className="theme-toggle__thumb">
          <span className={`theme-toggle__icon theme-toggle__icon--sun${!isDark ? ' theme-toggle__icon--active' : ''}`}>
            <SunIcon />
          </span>
          <span className={`theme-toggle__icon theme-toggle__icon--moon${isDark ? ' theme-toggle__icon--active' : ''}`}>
            <MoonIcon />
          </span>
        </span>
      </span>
    </button>
  );
}

/* Navbar Company Card */
function NavbarCompanyCard({ item, onClose }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <a
      href={item.href}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClose}
      className="nav-company-card"
      style={{
        '--nav-card-accent': item.accent,
        '--nav-card-gradient': item.gradient,
        '--nav-card-rgb': item.rgb,
      }}
    >
      <div className="nav-company-card__spotlight" aria-hidden="true" />
      <div className="nav-company-card__top">
        <div className="nav-company-card__icon" style={{ background: item.gradient }}>
          {item.icon}
        </div>
        <span className="nav-company-card__num">{item.num}</span>
      </div>
      <div className="nav-company-card__content">
        <div className="nav-company-card__title-row">
          <span className="nav-company-card__title">{item.label}</span>
          <svg className="nav-company-card__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
        <span className="nav-company-card__sub">{item.sub}</span>
      </div>
    </a>
  );
}

/* Odoo ERP Card inside Mega Dropdown */
function OdooErpMegaCard({ item, onClose }) {
  return (
    <a href={item.href} className="nav-odoo-card" onClick={onClose}>
      <div className="nav-odoo-card__icon" style={{ background: item.gradient }}>
        {item.icon}
      </div>
      <div className="nav-odoo-card__info">
        <div className="nav-odoo-card__header">
          <span className="nav-odoo-card__num">{item.num}</span>
          <span className="nav-odoo-card__title">{item.label}</span>
        </div>
        <p className="nav-odoo-card__sub">{item.sub}</p>
      </div>
      <div className="nav-odoo-card__arrow-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </a>
  );
}

/* Individual Connector Card Item (IMAGE 2 Style) */
function ConnectorCardItem({ item, hoveredId, onHover, onClose }) {
  const isHovered = hoveredId === item.id;
  return (
    <a
      href={item.href}
      className={`nav-connector-card ${isHovered ? 'nav-connector-card--active' : ''}`}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClose}
    >
      <div className="nav-connector-card__left">
        <div className="nav-connector-card__logo">
          <ConnectorPlatformLogo id={item.id} />
        </div>
        <span className="nav-connector-card__name">{item.name}</span>
      </div>
      <div className="nav-connector-card__arrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredConnector, setHoveredConnector] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getErpUrl = () => {
    return 'https://jupical-cg0lj6xz8-jupical-technologies.vercel.app/';
  };

  const handleErpLogin = (e) => {
    e.preventDefault();
    const targetUrl = getErpUrl();
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLoginContextMenu = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner container">

        {/* Logo */}
        <a href="#" className="navbar__logo" id="nav-logo">
          <img src="/jupical-logo.png" alt="Jupical Technologies Logo" className="navbar__logo-img" />
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="menubar">
          {navItems.map((item) => (
            <li
              key={item.label}
              className={`navbar__item ${item.isCompany ? 'navbar__item--company' : ''} ${item.isOdooMega ? 'navbar__item--odoo' : ''} ${item.isConnectorsMega ? 'navbar__item--connectors' : ''}`}
              role="none"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openDropdown === item.label}
                className={`navbar__link${activeItem === item.label ? ' navbar__link--active' : ''}`}
                onClick={() => setActiveItem(item.label)}
              >
                {item.icon}
                <span>{item.label}</span>

                <svg className="navbar__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Mega-Dropdowns & Standard Dropdowns rendered ONLY when openDropdown matches */}
              {openDropdown === item.label ? (
                item.isCompany ? (
                  <div
                    className="navbar__dropdown navbar__dropdown--company navbar__dropdown--open"
                    role="menu"
                  >
                    <div className="nav-company-dropdown__header">
                      <span className="nav-company-dropdown__badge-line" />
                      <span className="nav-company-dropdown__badge-text">EXPLORE JUPICAL</span>
                    </div>
                    <div className="nav-company-dropdown__grid">
                      {companyDropdownItems.map((cItem) => (
                        <NavbarCompanyCard
                          key={cItem.num}
                          item={cItem}
                          onClose={() => setOpenDropdown(null)}
                        />
                      ))}
                    </div>
                  </div>
                ) : item.isOdooMega ? (
                  /* PREMIUM ANIMATED ODOO ERPs MEGA DROPDOWN */
                  <div
                    className="navbar__dropdown navbar__dropdown--odoo navbar__dropdown--open"
                    role="menu"
                  >
                    <div className="nav-odoo-dropdown__header">
                      <span className="nav-odoo-dropdown__badge">+ INDUSTRY SOLUTIONS +</span>
                      <h3 className="nav-odoo-dropdown__title">
                        Smart ERP for <span className="nav-odoo-dropdown__title-blue">Every Industry</span>
                      </h3>
                      <p className="nav-odoo-dropdown__sub">
                        Powerful, flexible and open-source ERP solutions built to simplify and scale your business.
                      </p>
                    </div>

                    <div className="nav-odoo-dropdown__body">
                      <div className="nav-odoo-dropdown__column">
                        {odooErpItemsLeft.map((item) => (
                          <OdooErpMegaCard key={item.num} item={item} onClose={() => setOpenDropdown(null)} />
                        ))}
                      </div>

                      <div className="nav-odoo-dropdown__divider" aria-hidden="true">
                        <svg className="nav-odoo-dropdown__divider-svg" viewBox="0 0 20 320" fill="none">
                          <path id="odooDividerPath" d="M 10 0 C 18 80, 2 160, 10 240 C 18 280, 10 320, 10 320" stroke="rgba(0, 117, 255, 0.25)" strokeWidth="2" fill="none" />
                          
                          {/* Glowing Traveling Dot 1 - Blue */}
                          <circle r="4.5" fill="#0075FF" className="nav-odoo-svg-dot nav-odoo-svg-dot--1">
                            <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto">
                              <mpath href="#odooDividerPath" />
                            </animateMotion>
                          </circle>

                          {/* Glowing Traveling Dot 2 - Emerald Green */}
                          <circle r="4.5" fill="#10B981" className="nav-odoo-svg-dot nav-odoo-svg-dot--2">
                            <animateMotion dur="4.5s" begin="1.5s" repeatCount="indefinite" rotate="auto">
                              <mpath href="#odooDividerPath" />
                            </animateMotion>
                          </circle>

                          {/* Glowing Traveling Dot 3 - Purple */}
                          <circle r="4.5" fill="#8B5CF6" className="nav-odoo-svg-dot nav-odoo-svg-dot--3">
                            <animateMotion dur="4.5s" begin="3s" repeatCount="indefinite" rotate="auto">
                              <mpath href="#odooDividerPath" />
                            </animateMotion>
                          </circle>
                        </svg>
                      </div>

                      <div className="nav-odoo-dropdown__column">
                        {odooErpItemsRight.map((item) => (
                          <OdooErpMegaCard key={item.num} item={item} onClose={() => setOpenDropdown(null)} />
                        ))}
                      </div>
                    </div>

                    <div className="nav-odoo-dropdown__footer">
                      <a href="#odoo-erps" className="nav-odoo-dropdown__footer-link" onClick={() => setOpenDropdown(null)}>
                        <span>Explore All Odoo ERP Solutions</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ) : item.isConnectorsMega ? (
                  /* NEW ODOO CONNECTORS MEGA DROPDOWN (EXACTLY MATCHING IMAGE 2) */
                  <div
                    className="navbar__dropdown navbar__dropdown--connectors navbar__dropdown--open"
                    role="menu"
                  >
                    <div className="nav-connectors-mega__grid">
                      {/* LEFT VISUAL HUB — Interactive 3D Odoo Ecosystem */}
                      <div className="nav-connectors-mega__visual-hub">
                        <h3 className="nav-connectors-hub__title">
                          Connect Everything.
                          <br />
                          <span className="nav-connectors-hub__title-purple">Run Everything.</span>
                        </h3>
                        <p className="nav-connectors-hub__sub">
                          Seamlessly integrate your favorite tools with Odoo ERP.
                        </p>

                        {/* 3D Visual Hub Graphic */}
                        <div className="nav-connectors-hub__stage">
                          {/* Animated Glowing Connection Lines SVG */}
                          <svg className="nav-connectors-hub__lines-svg" viewBox="0 0 260 220" fill="none">
                            <path d="M130 110 L65 55" stroke="url(#lineGrad1)" strokeWidth="1.6" className={`hub-line ${hoveredConnector === 'shopify' ? 'hub-line--active' : ''}`} />
                            <path d="M130 110 L195 55" stroke="url(#lineGrad2)" strokeWidth="1.6" className={`hub-line ${hoveredConnector === 'quickbooks' ? 'hub-line--active' : ''}`} />
                            <path d="M130 110 L45 115" stroke="url(#lineGrad3)" strokeWidth="1.6" className={`hub-line ${hoveredConnector === 'woocommerce' ? 'hub-line--active' : ''}`} />
                            <path d="M130 110 L215 115" stroke="url(#lineGrad4)" strokeWidth="1.6" className={`hub-line ${hoveredConnector === 'xero' ? 'hub-line--active' : ''}`} />
                            <path d="M130 110 L65 175" stroke="url(#lineGrad5)" strokeWidth="1.6" className={`hub-line ${hoveredConnector === 'zohobooks' ? 'hub-line--active' : ''}`} />
                            <path d="M130 110 L195 175" stroke="url(#lineGrad6)" strokeWidth="1.6" className={`hub-line ${hoveredConnector === 'bamboohr' ? 'hub-line--active' : ''}`} />

                            <defs>
                              <linearGradient id="lineGrad1" x1="130" y1="110" x2="65" y2="55"><stop offset="0%" stopColor="#0075FF"/><stop offset="100%" stopColor="#38BDF8"/></linearGradient>
                              <linearGradient id="lineGrad2" x1="130" y1="110" x2="195" y2="55"><stop offset="0%" stopColor="#0075FF"/><stop offset="100%" stopColor="#2CA01C"/></linearGradient>
                              <linearGradient id="lineGrad3" x1="130" y1="110" x2="45" y2="115"><stop offset="0%" stopColor="#0075FF"/><stop offset="100%" stopColor="#96588A"/></linearGradient>
                              <linearGradient id="lineGrad4" x1="130" y1="110" x2="215" y2="115"><stop offset="0%" stopColor="#0075FF"/><stop offset="100%" stopColor="#13B5EA"/></linearGradient>
                              <linearGradient id="lineGrad5" x1="130" y1="110" x2="65" y2="175"><stop offset="0%" stopColor="#0075FF"/><stop offset="100%" stopColor="#1284E7"/></linearGradient>
                              <linearGradient id="lineGrad6" x1="130" y1="110" x2="195" y2="175"><stop offset="0%" stopColor="#0075FF"/><stop offset="100%" stopColor="#73B721"/></linearGradient>
                            </defs>
                          </svg>

                          {/* Pulsing Circular Platform Underneath */}
                          <div className="nav-connectors-hub__platform">
                            <div className="nav-connectors-hub__ring nav-connectors-hub__ring--1" />
                            <div className="nav-connectors-hub__ring nav-connectors-hub__ring--2" />
                          </div>

                          {/* Central Animated Floating 3D Odoo Cube */}
                          <div className="nav-connectors-hub__cube-wrapper">
                            <div className="nav-connectors-hub__cube">
                              <span className="hub-cube__brand">odoo</span>
                              <span className="hub-cube__sub">ERP</span>
                            </div>
                          </div>

                          {/* Floating Platform Cards Surrounding Odoo Hub */}
                          <div className={`hub-platform-card hub-platform-card--top-left ${hoveredConnector === 'shopify' ? 'is-active' : ''}`}>
                            <ConnectorPlatformLogo id="shopify" />
                            <span>Shopify</span>
                          </div>

                          <div className={`hub-platform-card hub-platform-card--top-right ${hoveredConnector === 'quickbooks' ? 'is-active' : ''}`}>
                            <ConnectorPlatformLogo id="quickbooks" />
                            <span>QuickBooks</span>
                          </div>

                          <div className={`hub-platform-card hub-platform-card--mid-left ${hoveredConnector === 'woocommerce' ? 'is-active' : ''}`}>
                            <ConnectorPlatformLogo id="woocommerce" />
                            <span>WooCommerce</span>
                          </div>

                          <div className={`hub-platform-card hub-platform-card--mid-right ${hoveredConnector === 'xero' ? 'is-active' : ''}`}>
                            <ConnectorPlatformLogo id="xero" />
                            <span>Xero</span>
                          </div>

                          <div className={`hub-platform-card hub-platform-card--bot-left ${hoveredConnector === 'zohobooks' ? 'is-active' : ''}`}>
                            <ConnectorPlatformLogo id="zohobooks" />
                            <span>Zoho Books</span>
                          </div>

                          <div className={`hub-platform-card hub-platform-card--bot-right ${hoveredConnector === 'bamboohr' ? 'is-active' : ''}`}>
                            <ConnectorPlatformLogo id="bamboohr" />
                            <span>Bamboo HR</span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT 3 COLUMNS: E-COMMERCE, ACCOUNTING, HR */}
                      <div className="nav-connectors-mega__columns">
                        {/* Column 1: E-COMMERCE */}
                        <div className="nav-connectors-col">
                          <div className="nav-connectors-col__header">
                            <span className="nav-connectors-col__title">E-COMMERCE</span>
                            <span className="nav-connectors-col__line" />
                          </div>
                          <div className="nav-connectors-col__list">
                            {connectorsData.ecommerce.map((c) => (
                              <ConnectorCardItem
                                key={c.id}
                                item={c}
                                hoveredId={hoveredConnector}
                                onHover={setHoveredConnector}
                                onClose={() => setOpenDropdown(null)}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Column 2: ACCOUNTING */}
                        <div className="nav-connectors-col">
                          <div className="nav-connectors-col__header">
                            <span className="nav-connectors-col__title">ACCOUNTING</span>
                            <span className="nav-connectors-col__line" />
                          </div>
                          <div className="nav-connectors-col__list">
                            {connectorsData.accounting.map((c) => (
                              <ConnectorCardItem
                                key={c.id}
                                item={c}
                                hoveredId={hoveredConnector}
                                onHover={setHoveredConnector}
                                onClose={() => setOpenDropdown(null)}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Column 3: HR */}
                        <div className="nav-connectors-col">
                          <div className="nav-connectors-col__header">
                            <span className="nav-connectors-col__title">HR</span>
                            <span className="nav-connectors-col__line" />
                          </div>
                          <div className="nav-connectors-col__list">
                            {connectorsData.hr.map((c) => (
                              <ConnectorCardItem
                                key={c.id}
                                item={c}
                                hoveredId={hoveredConnector}
                                onHover={setHoveredConnector}
                                onClose={() => setOpenDropdown(null)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM CTA BAR */}
                    <div className="nav-connectors-mega__footer">
                      <div className="nav-connectors-footer__info">
                        <div className="nav-connectors-footer__sparkle">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2">
                            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                          </svg>
                        </div>
                        <div className="nav-connectors-footer__text">
                          <strong>Connect your business tools with Odoo.</strong>
                          <span>Seamlessly integrate your favorite platforms with your Odoo ERP.</span>
                        </div>
                      </div>

                      <a href="#connectors" className="nav-connectors-footer__btn" onClick={() => setOpenDropdown(null)}>
                        <span>Explore All Connectors</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ) : item.isResourcesMega ? (
                  /* NEW RESOURCES MEGA DROPDOWN (EXACTLY MATCHING REFERENCE IMAGE) */
                  <div
                    className="navbar__dropdown navbar__dropdown--resources navbar__dropdown--open"
                    role="menu"
                  >
                    <div className="nav-resources-mega__grid">
                      {/* LEFT VISUAL HUB — 3D Open Book Illustration */}
                      <div className="nav-resources-mega__visual-hub">
                        <h3 className="nav-resources-hub__title">
                          Knowledge that
                          <br />
                          <span className="nav-resources-hub__title-blue">Drives Growth.</span>
                        </h3>
                        <p className="nav-resources-hub__sub">
                          Explore insights, real stories, and expert resources to transform your business.
                        </p>

                        {/* 3D Illustration Stage */}
                        <div className="nav-resources-hub__stage">
                          {/* SVG Particle Orbit Lines */}
                          <svg className="nav-resources-hub__orbit-svg" viewBox="0 0 240 200" fill="none">
                            <ellipse cx="120" cy="115" rx="90" ry="45" stroke="rgba(0, 117, 255, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" className="resources-orbit-line" />
                            <circle cx="50" cy="95" r="3.5" fill="#0075FF" className="resources-orbit-dot resources-orbit-dot--1" />
                            <circle cx="190" cy="135" r="3.5" fill="#7C3AED" className="resources-orbit-dot resources-orbit-dot--2" />
                          </svg>

                          {/* Layered Pulsing Base Platform */}
                          <div className="nav-resources-hub__platform">
                            <div className="nav-resources-hub__ring nav-resources-hub__ring--1" />
                            <div className="nav-resources-hub__ring nav-resources-hub__ring--2" />
                          </div>

                          {/* Central 3D Open Hardcover Book Illustration (IMAGE 2) */}
                          <div className="nav-resources-hub__book-wrapper">
                            <svg className="nav-resources-hub__book-svg" viewBox="0 0 140 110" fill="none">
                              <defs>
                                {/* Book Drop Shadow */}
                                <filter id="bookGlowShadow" x="-20%" y="-20%" width="140%" height="140%">
                                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0075FF" floodOpacity="0.32" />
                                  <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.1" />
                                </filter>
                                {/* Center Spine Gradient Shadow */}
                                <linearGradient id="spineCreaseShadow" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="rgba(15, 23, 42, 0.22)" />
                                  <stop offset="40%" stopColor="rgba(15, 23, 42, 0.02)" />
                                  <stop offset="60%" stopColor="rgba(15, 23, 42, 0.02)" />
                                  <stop offset="100%" stopColor="rgba(15, 23, 42, 0.22)" />
                                </linearGradient>
                                {/* Left Page Shading */}
                                <linearGradient id="leftPageSurface" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="#E2E8F0" />
                                  <stop offset="12%" stopColor="#FFFFFF" />
                                  <stop offset="88%" stopColor="#FFFFFF" />
                                  <stop offset="100%" stopColor="#CBD5E1" />
                                </linearGradient>
                                {/* Right Page Shading */}
                                <linearGradient id="rightPageSurface" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="#CBD5E1" />
                                  <stop offset="12%" stopColor="#FFFFFF" />
                                  <stop offset="88%" stopColor="#FFFFFF" />
                                  <stop offset="100%" stopColor="#E2E8F0" />
                                </linearGradient>
                                {/* Hardcover Royal Blue Gradient */}
                                <linearGradient id="royalBlueCover" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#0075FF" />
                                  <stop offset="100%" stopColor="#004CBD" />
                                </linearGradient>
                                {/* Thumbnail Image Gradient */}
                                <linearGradient id="thumbGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#38BDF8" />
                                  <stop offset="100%" stopColor="#0075FF" />
                                </linearGradient>
                              </defs>

                              {/* 1. ROYAL BLUE 3D HARDCOVER BASE */}
                              <g filter="url(#bookGlowShadow)">
                                {/* Left Hardcover Wing */}
                                <path d="M 69 92 C 40 92, 16 82, 10 77 L 16 28 C 22 32, 42 41, 69 41 Z" fill="url(#royalBlueCover)" stroke="#003EA3" strokeWidth="1.2" />
                                {/* Right Hardcover Wing */}
                                <path d="M 71 92 C 100 92, 124 82, 130 77 L 124 28 C 118 32, 98 41, 71 41 Z" fill="url(#royalBlueCover)" stroke="#003EA3" strokeWidth="1.2" />
                                {/* Hardcover Spine Notch */}
                                <path d="M 63 92 C 67 94, 73 94, 77 92 L 77 41 C 73 43, 67 43, 63 41 Z" fill="#00338A" />
                              </g>

                              {/* 2. REALISTIC 3D PAGE STACK THICKNESS */}
                              <path d="M 12 76 C 18 80, 42 88, 68 88 L 68 90 C 42 90, 18 82, 12 78 Z" fill="#94A3B8" />
                              <path d="M 14 74 C 20 78, 42 86, 68 86 L 68 88 C 42 88, 20 80, 14 76 Z" fill="#E2E8F0" />
                              
                              <path d="M 128 76 C 122 80, 98 88, 72 88 L 72 90 C 98 90, 122 82, 128 78 Z" fill="#94A3B8" />
                              <path d="M 126 74 C 120 78, 98 86, 72 86 L 72 88 C 98 88, 120 80, 126 76 Z" fill="#E2E8F0" />

                              {/* 3. MAIN OPEN PAGES */}
                              {/* Left Page Surface */}
                              <path d="M 69 86 C 44 86, 22 78, 14 72 L 20 22 C 27 27, 46 35, 69 35 Z" fill="url(#leftPageSurface)" stroke="#CBD5E1" strokeWidth="0.8" />
                              {/* Right Page Surface */}
                              <path d="M 71 86 C 96 86, 118 78, 126 72 L 120 22 C 113 27, 94 35, 71 35 Z" fill="url(#rightPageSurface)" stroke="#CBD5E1" strokeWidth="0.8" />

                              {/* 4. FANNING TOP PAGES (DEPTH LAYERS) */}
                              <path d="M 69 85 C 45 84, 24 77, 16 71 L 22 23 Q 46 35, 69 34 Z" fill="#FFFFFF" opacity="0.95" />
                              <path d="M 71 85 C 95 84, 116 77, 124 71 L 118 23 Q 94 35, 71 34 Z" fill="#FFFFFF" opacity="0.95" />

                              {/* Center Spine Crease Shadow */}
                              <path d="M 63 87 Q 70 88, 77 87 L 77 33 Q 70 34, 63 33 Z" fill="url(#spineCreaseShadow)" />
                              <line x1="70" y1="34" x2="70" y2="87" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="1.5 1.5" />

                              {/* 5. TEXT CONTENT LINES (LEFT PAGE) */}
                              <g opacity="0.65">
                                <line x1="28" y1="36" x2="58" y2="43" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
                                <line x1="27" y1="43" x2="60" y2="50" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="26" y1="50" x2="59" y2="57" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="25" y1="57" x2="58" y2="64" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="24" y1="64" x2="57" y2="71" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="23" y1="71" x2="50" y2="76" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                              </g>

                              {/* 6. TEXT CONTENT LINES (RIGHT PAGE) */}
                              <g opacity="0.65">
                                <line x1="82" y1="43" x2="112" y2="36" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
                                <line x1="80" y1="50" x2="98" y2="46" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="81" y1="57" x2="99" y2="53" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="82" y1="64" x2="115" y2="57" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="83" y1="71" x2="116" y2="64" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="84" y1="76" x2="110" y2="71" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                              </g>

                              {/* 7. LANDSCAPE ARTWORK CARD ON RIGHT PAGE (MATCHING IMAGE 2) */}
                              <g transform="translate(100, 42) rotate(-8)">
                                <rect x="0" y="0" width="20" height="15" rx="2" fill="url(#thumbGrad)" />
                                <circle cx="15" cy="4" r="2" fill="#FEF08A" />
                                <path d="M 2 13 L 7 7 L 13 13 Z" fill="#1E3A8A" opacity="0.75" />
                                <path d="M 7 13 L 13 8 L 18 13 Z" fill="#93C5FD" opacity="0.9" />
                              </g>
                            </svg>
                          </div>

                          {/* Floating Resource Badge Icons */}
                          <div className="hub-resource-badge hub-resource-badge--top-left">
                            <div className="hub-resource-badge__icon" style={{ background: 'linear-gradient(135deg, #0075FF, #38BDF8)' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                              </svg>
                            </div>
                          </div>

                          <div className="hub-resource-badge hub-resource-badge--top-right">
                            <div className="hub-resource-badge__icon" style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                              </svg>
                            </div>
                          </div>

                          <div className="hub-resource-badge hub-resource-badge--bot-right">
                            <div className="hub-resource-badge__icon" style={{ background: 'linear-gradient(135deg, #06B6D4, #67E8F9)' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT 3 COLUMNS: BLOGS, CASE STUDIES, SUCCESS STORIES */}
                      <div className="nav-resources-mega__columns">
                        {/* Column 1: Blogs */}
                        <div className="nav-resources-col">
                          <div className="nav-resources-col__header">
                            <div className="nav-resources-col__badge-icon" style={{ background: resourcesData.blogs.badgeBg, color: resourcesData.blogs.badgeColor }}>
                              {resourcesData.blogs.icon}
                            </div>
                            <div className="nav-resources-col__title-wrapper">
                              <h4 className="nav-resources-col__title">{resourcesData.blogs.title}</h4>
                              <p className="nav-resources-col__sub">{resourcesData.blogs.sub}</p>
                            </div>
                          </div>
                          <div className="nav-resources-col__indicator-line" style={{ background: resourcesData.blogs.lineGrad }} />

                          <div className="nav-resources-col__list">
                            {resourcesData.blogs.items.map((card) => (
                              <a key={card.id} href={card.href} className="nav-resource-card" onClick={() => setOpenDropdown(null)}>
                                <div className="nav-resource-card__left">
                                  <div className="nav-resource-card__icon">
                                    {card.icon}
                                  </div>
                                  <span className="nav-resource-card__label">{card.label}</span>
                                </div>
                                <div className="nav-resource-card__arrow">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"/>
                                  </svg>
                                </div>
                              </a>
                            ))}
                          </div>

                          <a href={resourcesData.blogs.footerHref} className="nav-resources-col__footer-link" style={{ color: resourcesData.blogs.accent }} onClick={() => setOpenDropdown(null)}>
                            <span>{resourcesData.blogs.footerLabel}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </a>
                        </div>

                        {/* Column 2: Case Studies */}
                        <div className="nav-resources-col">
                          <div className="nav-resources-col__header">
                            <div className="nav-resources-col__badge-icon" style={{ background: resourcesData.caseStudies.badgeBg, color: resourcesData.caseStudies.badgeColor }}>
                              {resourcesData.caseStudies.icon}
                            </div>
                            <div className="nav-resources-col__title-wrapper">
                              <h4 className="nav-resources-col__title">{resourcesData.caseStudies.title}</h4>
                              <p className="nav-resources-col__sub">{resourcesData.caseStudies.sub}</p>
                            </div>
                          </div>
                          <div className="nav-resources-col__indicator-line" style={{ background: resourcesData.caseStudies.lineGrad }} />

                          <div className="nav-resources-col__list">
                            {resourcesData.caseStudies.items.map((card) => (
                              <a key={card.id} href={card.href} className="nav-resource-card" onClick={() => setOpenDropdown(null)}>
                                <div className="nav-resource-card__left">
                                  <div className="nav-resource-card__icon">
                                    {card.icon}
                                  </div>
                                  <span className="nav-resource-card__label">{card.label}</span>
                                </div>
                                <div className="nav-resource-card__arrow">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"/>
                                  </svg>
                                </div>
                              </a>
                            ))}
                          </div>

                          <a href={resourcesData.caseStudies.footerHref} className="nav-resources-col__footer-link" style={{ color: resourcesData.caseStudies.accent }} onClick={() => setOpenDropdown(null)}>
                            <span>{resourcesData.caseStudies.footerLabel}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </a>
                        </div>

                        {/* Column 3: Success Stories */}
                        <div className="nav-resources-col">
                          <div className="nav-resources-col__header">
                            <div className="nav-resources-col__badge-icon" style={{ background: resourcesData.successStories.badgeBg, color: resourcesData.successStories.badgeColor }}>
                              {resourcesData.successStories.icon}
                            </div>
                            <div className="nav-resources-col__title-wrapper">
                              <h4 className="nav-resources-col__title">{resourcesData.successStories.title}</h4>
                              <p className="nav-resources-col__sub">{resourcesData.successStories.sub}</p>
                            </div>
                          </div>
                          <div className="nav-resources-col__indicator-line" style={{ background: resourcesData.successStories.lineGrad }} />

                          <div className="nav-resources-col__list">
                            {resourcesData.successStories.items.map((card) => (
                              <a key={card.id} href={card.href} className="nav-resource-card" onClick={() => setOpenDropdown(null)}>
                                <div className="nav-resource-card__left">
                                  <div className="nav-resource-card__icon">
                                    {card.icon}
                                  </div>
                                  <span className="nav-resource-card__label">{card.label}</span>
                                </div>
                                <div className="nav-resource-card__arrow">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"/>
                                  </svg>
                                </div>
                              </a>
                            ))}
                          </div>

                          <a href={resourcesData.successStories.footerHref} className="nav-resources-col__footer-link" style={{ color: resourcesData.successStories.accent }} onClick={() => setOpenDropdown(null)}>
                            <span>{resourcesData.successStories.footerLabel}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM CTA BAR */}
                    <div className="nav-resources-mega__footer">
                      <div className="nav-resources-footer__info">
                        <div className="nav-resources-footer__sparkle">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2">
                            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                          </svg>
                        </div>
                        <div className="nav-resources-footer__text">
                          <strong>Stay informed. Stay ahead.</strong>
                          <span>Curated resources to help you innovate and grow with Odoo.</span>
                        </div>
                      </div>

                      <a href="#resources" className="nav-resources-footer__btn" onClick={() => setOpenDropdown(null)}>
                        <span>View All Resources</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ) : null
              ) : null}
            </li>
          ))}
        </ul>

        {/* Right Controls — Theme toggle + ERP Login + Contact Us CTA */}
        <div className="navbar__cta">
          <ThemeToggle />
          <a
            href={getErpUrl()}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-login-btn"
            className="navbar__login-btn"
            title="Sign in to Jupical ERP (Right-click or Shift-click to change Port)"
            onClick={handleErpLogin}
            onContextMenu={handleLoginContextMenu}
          >
            <LoginNavIcon />
            <span>Login</span>
          </a>
          <a href="#contact" id="nav-contact-btn" className="btn-primary navbar__contact-btn">
            <ContactNavIcon />
            <span>Contact Us</span>
          </a>
          <button
            className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            id="nav-hamburger"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile navbar__mobile--open">
          <div className="navbar__mobile-group">
            <span className="navbar__mobile-heading">Company</span>
            {companyDropdownItems.map((c) => (
              <a key={c.label} href={c.href} className="navbar__mobile-link navbar__mobile-link--company" onClick={() => setMobileOpen(false)}>
                <span className="mobile-num" style={{ color: c.accent }}>{c.num}</span>
                <div className="mobile-text">
                  <span className="mobile-title">{c.label}</span>
                  <span className="mobile-sub">{c.sub}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile Odoo ERPs Group */}
          <div className="navbar__mobile-group">
            <span className="navbar__mobile-heading">Odoo ERP Solutions</span>
            {[...odooErpItemsLeft, ...odooErpItemsRight].map((item) => (
              <a key={item.num} href={item.href} className="navbar__mobile-link navbar__mobile-link--company" onClick={() => setMobileOpen(false)}>
                <span className="mobile-num" style={{ color: '#0075FF' }}>{item.num}</span>
                <div className="mobile-text">
                  <span className="mobile-title">{item.label}</span>
                  <span className="mobile-sub">{item.sub}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile Odoo Connectors Group (IMAGE 2 Items) */}
          <div className="navbar__mobile-group">
            <span className="navbar__mobile-heading">Odoo Connectors</span>
            {[...connectorsData.ecommerce, ...connectorsData.accounting, ...connectorsData.hr].map((item) => (
              <a key={item.id} href={item.href} className="navbar__mobile-link navbar__mobile-link--company" onClick={() => setMobileOpen(false)}>
                <div className="mobile-text">
                  <span className="mobile-title">{item.name}</span>
                  <span className="mobile-sub">{item.sub}</span>
                </div>
              </a>
            ))}
          </div>

          {navItems.filter(i => !i.isCompany && !i.isOdooMega && !i.isConnectorsMega).map((item) => (
            <div key={item.label} className="navbar__mobile-group">
              <span className="navbar__mobile-heading">{item.label}</span>
              {item.dropdown?.map((d) => (
                <a key={d.label} href={d.href} className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
                  {d.label}
                </a>
              ))}
            </div>
          ))}

          <div className="navbar__mobile-footer">
            <ThemeToggle />
            <div className="navbar__mobile-footer-actions">
              <a
                href={getErpUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__login-btn"
                title="Sign in to Jupical ERP (Right-click or Shift-click to change Port)"
                onClick={(e) => {
                  setMobileOpen(false);
                  handleErpLogin(e);
                }}
                onContextMenu={handleLoginContextMenu}
              >
                <LoginNavIcon />
                <span>Login</span>
              </a>
              <a href="#contact" className="btn-primary navbar__contact-btn" onClick={() => setMobileOpen(false)}>
                <ContactNavIcon />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
