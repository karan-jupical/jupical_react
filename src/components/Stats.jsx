import { useRef, useEffect, useState } from 'react';
import './Stats.css';

const statsData = [
  {
    value: '32+',
    label: 'Countries Served',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    value: '5000+',
    label: 'Happy Clients',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: '1000+',
    label: 'Successful Implementations',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    value: '98%',
    label: 'Client Retention Rate',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0075FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

function useCountUp(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    if (isNaN(num)) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const num = useCountUp(stat.value, 1500, visible);
  const suffix = stat.value.replace(/[0-9]/g, '').trim();

  return (
    <div ref={ref} className="stat-card" id={`stat-card-${index}`}>
      <div className="stat-card__badge">{stat.icon}</div>
      <div className="stat-card__content">
        <div className="stat-card__value">
          {visible ? `${num}${suffix}` : stat.value}
        </div>
        <div className="stat-card__label">{stat.label}</div>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats-section" id="stats" aria-label="Company statistics">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
