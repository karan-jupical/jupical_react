import { useEffect, useRef, useState } from 'react';
import './JourneyVisual.css';

const milestones = [
  { year: '2016', title: 'Founded', desc: 'Started our journey with a vision to simplify business operations.', top: '65%', left: '5%', icon: '🚀', pathPercent: 0.15 },
  { year: '2018', title: 'Pvt. Ltd. Registration', desc: 'Officially registered as a Pvt. Ltd. company and expanded capabilities.', top: '36%', left: '16%', icon: '🏢', pathPercent: 0.32 },
  { year: '2020', title: 'Global Expansion', desc: 'Extended our services to global markets and served clients worldwide.', top: '10%', left: '26%', icon: '🌐', pathPercent: 0.50 },
  { year: '2022', title: 'Odoo Expertise', desc: 'Became a trusted Odoo partner delivering powerful ERP solutions.', top: '6%', right: '12%', icon: '🏅', pathPercent: 0.67 },
  { year: '2024', title: 'Scaling Worldwide', desc: 'Strengthened our team and scaled operations across multiple regions.', top: '38%', right: '4%', icon: '👥', pathPercent: 0.84 },
  { year: '2026', title: 'Future Growth', desc: 'Continuing innovation and aiming for a smarter, automated world.', top: '72%', right: '12%', icon: '🎯', pathPercent: 1.0 },
];

export default function JourneyVisual() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pathRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [revealedMax, setRevealedMax] = useState(0);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'
  const [transformStyle, setTransformStyle] = useState('');
  const [pathLength, setPathLength] = useState(1000);
  const [particlePos, setParticlePos] = useState({ x: 180, y: 480 });

  // Viewport Observer to start/reset loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setActiveStep(0);
          setRevealedMax(0);
          setDirection('forward');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Continuous Forward -> Pause -> Reverse -> Pause -> Forward Loop
  useEffect(() => {
    if (!inView) return;

    let isPaused = false;

    const timer = setInterval(() => {
      if (isPaused) return;

      if (direction === 'forward') {
        setActiveStep((prev) => {
          const next = prev + 1;
          setRevealedMax((m) => Math.max(m, next));

          if (next >= milestones.length - 1) {
            // Reached 2026 -> Pause 1.5s then Reverse
            isPaused = true;
            setTimeout(() => {
              setDirection('backward');
              isPaused = false;
            }, 1500);
            return milestones.length - 1;
          }
          return next;
        });
      } else {
        // direction === 'backward'
        setActiveStep((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            // Reached 2016 -> Pause 1.0s then Forward
            isPaused = true;
            setTimeout(() => {
              setDirection('forward');
              isPaused = false;
            }, 1000);
            return 0;
          }
          return next;
        });
      }
    }, 1000); // 1-second interval between milestone steps

    return () => clearInterval(timer);
  }, [inView, direction]);

  // Measure SVG Path Length & Update Light Particle Position
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);

      const targetPercent = milestones[Math.max(0, Math.min(activeStep, milestones.length - 1))].pathPercent;
      const pt = pathRef.current.getPointAtLength(len * targetPercent);
      setParticlePos({ x: pt.x, y: pt.y });
    }
  }, [activeStep]);

  // Ambient Blue Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = containerRef.current.clientWidth);
    let height = (canvas.height = containerRef.current.clientHeight);

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: 1.5 + Math.random() * 3,
      alpha: 0.3 + Math.random() * 0.5,
      color: Math.random() > 0.35 ? '#00D2FF' : '#0075FF',
    }));

    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.65 + Math.sin(t + p.x) * 0.35);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;
    };

    render();

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Subtle Mouse Parallax Depth
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotX = -y * 4;
    const rotY = x * 6;
    setTransformStyle(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  // Compute Path Dash Offset based on active milestone
  const currentPathPercent = milestones[Math.max(0, Math.min(activeStep, milestones.length - 1))].pathPercent;
  const dashOffset = pathLength * (1 - currentPathPercent);

  return (
    <div
      className={`journey-visual journey-visual--enlarged ${inView ? 'is-in-view' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="journey-visual__inner" style={{ transform: transformStyle }}>
        {/* Base 3D Blue Tech Illustration */}
        <img
          src="/journey_visual_blue.png"
          alt="Jupical Blue Technology Journey Visual"
          className="journey-visual__img"
        />

        {/* Electric Blue SVG Path Overlay */}
        <svg className="journey-visual__svg" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="journeyBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0075FF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#00D2FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>
            <filter id="bluePathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track Guide */}
          <path
            d="M 180 480 C 220 380, 260 260, 360 240 C 440 220, 520 160, 600 120 C 660 180, 640 320, 620 440"
            fill="none"
            stroke="rgba(0, 117, 255, 0.2)"
            strokeWidth="8"
          />

          {/* Glowing Path */}
          <path
            ref={pathRef}
            d="M 180 480 C 220 380, 260 260, 360 240 C 440 220, 520 160, 600 120 C 660 180, 640 320, 620 440"
            fill="none"
            stroke="url(#journeyBlueGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#bluePathGlow)"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: dashOffset,
              transition: 'stroke-dashoffset 0.8s ease-in-out',
            }}
          />

          {/* Traveling Blue Energy Particle */}
          <g style={{ transform: `translate(${particlePos.x}px, ${particlePos.y}px)`, transition: 'transform 0.8s ease-in-out' }}>
            <circle r="12" fill="rgba(0, 210, 255, 0.45)" filter="url(#bluePathGlow)" />
            <circle r="6" fill="#00D2FF" />
            <circle r="3" fill="#ffffff" />
          </g>
        </svg>

        {/* Ambient Canvas Overlay */}
        <canvas ref={canvasRef} className="journey-visual__canvas" />

        {/* Rocket Engine Light */}
        <div className="journey-visual__rocket-wrapper">
          <div className="journey-visual__rocket-glow journey-visual__rocket-glow--blue" />
        </div>

        {/* Center Logo Orb */}
        <div className="journey-visual__center-orb journey-visual__center-orb--blue">
          <div className="journey-visual__orb-ring journey-visual__orb-ring--blue" />
          <div className="journey-visual__orb-glow journey-visual__orb-glow--blue" />
        </div>

        {/* Spaced Milestone Cards Layer */}
        <div className="journey-visual__milestones">
          {milestones.map((m, index) => {
            const isRevealed = index <= revealedMax;
            const isActive = index === activeStep;

            return (
              <div
                key={m.year}
                className={`journey-visual__card ${isRevealed ? 'is-revealed' : 'is-upcoming'} ${isActive ? 'is-active-step' : ''}`}
                style={{
                  top: m.top,
                  left: m.left,
                  right: m.right,
                }}
              >
                <div className="journey-visual__card-header">
                  <span className="journey-visual__card-icon">{m.icon}</span>
                  <span className="journey-visual__card-year">{m.year}</span>
                </div>
                <div className="journey-visual__card-title">{m.title}</div>
                <div className="journey-visual__card-desc">{m.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
