import { useEffect, useRef, useState } from 'react';
import './HeroVisual.css';

export default function HeroVisual() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);
  
  // Multi-layer parallax state
  const [artTransform, setArtTransform] = useState('');
  const [badgeTransform, setBadgeTransform] = useState('');
  const [glowTransform, setGlowTransform] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = canvas.width = containerRef.current.clientWidth;
    let height = canvas.height = containerRef.current.clientHeight;

    // 5 Module Coordinates on the 3D visual container
    const hub = { x: 0.50, y: 0.48 };
    const modules = [
      { id: 'manufacturing', name: 'MANUFACTURING', x: 0.23, y: 0.32, color: '#0075FF' },
      { id: 'construction', name: 'CONSTRUCTION', x: 0.77, y: 0.32, color: '#F59E0B' },
      { id: 'inventory', name: 'INVENTORY', x: 0.79, y: 0.72, color: '#3B82F6' },
      { id: 'finance', name: 'FINANCE', x: 0.49, y: 0.82, color: '#10B981' },
      { id: 'integration', name: 'INTEGRATION', x: 0.20, y: 0.71, color: '#8B5CF6' },
    ];

    // Continuous Luminous Energy Particles traveling along connection paths
    const particles = [];
    modules.forEach((mod) => {
      for (let i = 0; i < 5; i++) {
        particles.push({
          targetX: mod.x,
          targetY: mod.y,
          progress: Math.random(),
          speed: 0.0025 + Math.random() * 0.003,
          size: 2.5 + Math.random() * 3,
          color: mod.color,
          direction: Math.random() > 0.4 ? 1 : -1, // flow both ways
        });
      }
    });

    // Rising Financial particles ($ & cyan glow)
    const finParticles = [];
    for (let f = 0; f < 10; f++) {
      finParticles.push({
        x: 0.49 + (Math.random() - 0.5) * 0.09,
        y: 0.82 + Math.random() * 0.06,
        startY: 0.82,
        speedY: 0.0018 + Math.random() * 0.0025,
        opacity: Math.random(),
        size: 2 + Math.random() * 3.5,
      });
    }

    // Manufacturing Smoke particles
    const smokeParticles = [];
    for (let s = 0; s < 8; s++) {
      smokeParticles.push({
        x: 0.19 + (Math.random() - 0.5) * 0.02,
        y: 0.22,
        speedY: 0.0012 + Math.random() * 0.0018,
        opacity: 0.7,
        radius: 3 + Math.random() * 4,
      });
    }

    let startTime = Date.now();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const elapsed = (Date.now() - startTime) / 1000;

      ctx.clearRect(0, 0, width, height);

      const hX = hub.x * width;
      const hY = hub.y * height;

      // 1. Connection Lines with subtle energy pulse
      modules.forEach((mod) => {
        const mX = mod.x * width;
        const mY = mod.y * height;

        const midX = (hX + mX) / 2;
        const midY = (hY + mY) / 2 - 18;

        // Outer neon glow beam
        ctx.beginPath();
        ctx.moveTo(hX, hY);
        ctx.quadraticCurveTo(midX, midY, mX, mY);
        ctx.strokeStyle = 'rgba(0, 117, 255, 0.35)';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#0075FF';
        ctx.shadowBlur = 14;
        ctx.stroke();

        // Inner white light line
        ctx.beginPath();
        ctx.moveTo(hX, hY);
        ctx.quadraticCurveTo(midX, midY, mX, mY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 0;
        ctx.stroke();
      });

      // 2. Animated Energy Particles along connection lines
      particles.forEach((p) => {
        if (p.direction === 1) {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
        } else {
          p.progress -= p.speed;
          if (p.progress < 0) p.progress = 1;
        }

        const mX = p.targetX * width;
        const mY = p.targetY * height;
        const midX = (hX + mX) / 2;
        const midY = (hY + mY) / 2 - 18;

        const t = p.progress;
        const pX = (1 - t) * (1 - t) * hX + 2 * (1 - t) * t * midX + t * t * mX;
        const pY = (1 - t) * (1 - t) * hY + 2 * (1 - t) * t * midY + t * t * mY;

        ctx.beginPath();
        ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00D2FF';
        ctx.shadowColor = '#0075FF';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Central Platform Neon Pulsing Ring
      const pulseRadius = 95 + Math.sin(elapsed * 2.2) * 14;
      const pulseOpacity = 0.22 + Math.sin(elapsed * 2.2) * 0.14;

      ctx.beginPath();
      ctx.ellipse(hX, hY + 28, pulseRadius, pulseRadius * 0.5, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 180, 255, ${pulseOpacity})`;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#0075FF';
      ctx.shadowBlur = 22;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Financial Particles rising
      finParticles.forEach((fp) => {
        fp.y -= fp.speedY;
        fp.opacity -= 0.007;
        if (fp.y < fp.startY - 0.16 || fp.opacity <= 0) {
          fp.y = fp.startY;
          fp.x = 0.49 + (Math.random() - 0.5) * 0.09;
          fp.opacity = 1;
        }

        const fX = fp.x * width;
        const fY = fp.y * height;
        ctx.beginPath();
        ctx.arc(fX, fY, fp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${fp.opacity})`;
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Smoke particles rising from Factory Chimney
      smokeParticles.forEach((sp) => {
        sp.y -= sp.speedY;
        sp.radius += 0.04;
        sp.opacity -= 0.007;
        if (sp.opacity <= 0 || sp.y < 0.12) {
          sp.y = 0.22;
          sp.x = 0.19 + (Math.random() - 0.5) * 0.02;
          sp.radius = 3;
          sp.opacity = 0.7;
        }

        const smX = sp.x * width;
        const smY = sp.y * height;
        ctx.beginPath();
        ctx.arc(smX, smY, sp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 245, ${sp.opacity * 0.45})`;
        ctx.fill();
      });

      // 6. Central Odoo Cube Sheen Shift
      const sheenOffset = ((elapsed * 0.25) % 1) * width * 0.45;
      ctx.save();
      ctx.beginPath();
      ctx.rect(hX - 65, hY - 75, 130, 130);
      ctx.clip();

      const grad = ctx.createLinearGradient(hX - 85 + sheenOffset, hY - 85, hX - 15 + sheenOffset, hY + 65);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.42)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(hX - 85, hY - 85, 170, 170);
      ctx.restore();
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Multi-Layer Mouse Parallax Depth Effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Artwork layer tilt & depth
    const artRotX = -y * 10;
    const artRotY = x * 12;
    setArtTransform(`perspective(1000px) rotateX(${artRotX}deg) rotateY(${artRotY}deg) scale3d(1.02, 1.02, 1.02)`);

    // Foreground Badges parallax offset
    const badgeX = x * 18;
    const badgeY = y * 14;
    setBadgeTransform(`translate3d(${badgeX}px, ${badgeY}px, 20px)`);

    // Background Glow offset
    const glowX = -x * 25;
    const glowY = -y * 20;
    setGlowTransform(`translate3d(${glowX}px, ${glowY}px, 0px)`);
  };

  const handleMouseLeave = () => {
    setArtTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setBadgeTransform('translate3d(0px, 0px, 0px)');
    setGlowTransform('translate3d(0px, 0px, 0px)');
  };

  const badgeLabels = [
    { name: 'MANUFACTURING', icon: '🏭', top: '14%', left: '8%' },
    { name: 'CONSTRUCTION', icon: '🏗️', top: '14%', right: '8%' },
    { name: 'INVENTORY', icon: '📦', bottom: '26%', right: '6%' },
    { name: 'FINANCE', icon: '💲', bottom: '6%', left: '40%' },
    { name: 'INTEGRATION', icon: '🧩', bottom: '26%', left: '6%' },
  ];

  return (
    <div
      className="hero-visual"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow Layer */}
      <div
        className="hero-visual__glow-overlay"
        style={{ transform: glowTransform }}
      />

      {/* 3D Base Artwork Image Wrapper */}
      <div
        className="hero-visual__artwork-wrapper"
        style={{ transform: artTransform }}
      >
        <img
          src="/odoo_3d_ecosystem.png"
          alt="Approved 3D Odoo ERP Ecosystem Visual"
          className="hero-visual__artwork-img"
        />
      </div>

      {/* HTML5 Canvas overlay for real-time light pulse & energy particles */}
      <canvas ref={canvasRef} className="hero-visual__canvas" />

      {/* Floating Glassmorphism Badges Layer */}
      <div
        className="hero-visual__badges-layer"
        style={{ transform: badgeTransform }}
      >
        {badgeLabels.map((b) => (
          <div
            key={b.name}
            className={`hero-visual__badge ${activeTab === b.name ? 'is-active' : ''}`}
            style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom }}
            onMouseEnter={() => setActiveTab(b.name)}
            onMouseLeave={() => setActiveTab(null)}
          >
            <span className="hero-visual__badge-icon">{b.icon}</span>
            <span className="hero-visual__badge-text">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
