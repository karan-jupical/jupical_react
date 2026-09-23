import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobalEarthSection.css';

gsap.registerPlugin(ScrollTrigger);

// 16 Languages requested by user with exact names, flags (SVG Data URI / Code), coordinates, and routes
const LANGUAGES = [
  {
    id: 'ar',
    name: 'العربية',
    country: 'UAE / Middle East',
    flag: '🇦🇪',
    lat: 23.8859,
    lng: 45.0792,
    url: 'https://www.jupical.io/ar',
  },
  {
    id: 'cs',
    name: 'Čeština',
    country: 'Czech Republic',
    flag: '🇨🇿',
    lat: 49.8175,
    lng: 15.473,
    url: 'https://www.jupical.io/cs_CZ',
  },
  {
    id: 'da',
    name: 'Dansk',
    country: 'Denmark',
    flag: '🇩🇰',
    lat: 56.2639,
    lng: 9.5018,
    url: 'https://www.jupical.io/da_DK',
  },
  {
    id: 'nl',
    name: 'Nederlands',
    country: 'Netherlands',
    flag: '🇳🇱',
    lat: 52.1326,
    lng: 5.2913,
    url: 'https://www.jupical.io/nl',
  },
  {
    id: 'en_IN',
    name: 'English (IN)',
    country: 'India',
    flag: '🇮🇳',
    lat: 20.5937,
    lng: 78.9629,
    url: 'https://www.jupical.io/en_IN',
  },
  {
    id: 'en_US',
    name: 'English (US)',
    country: 'United States',
    flag: '🇺🇸',
    lat: 37.0902,
    lng: -95.7129,
    url: 'https://www.jupical.io/our-clients',
  },
  {
    id: 'fr',
    name: 'Français',
    country: 'France',
    flag: '🇫🇷',
    lat: 46.2276,
    lng: 2.2137,
    url: 'https://www.jupical.io/fr',
  },
  {
    id: 'de',
    name: 'Deutsch',
    country: 'Germany',
    flag: '🇩🇪',
    lat: 51.1657,
    lng: 10.4515,
    url: 'https://www.jupical.io/de',
  },
  {
    id: 'el',
    name: 'Ελληνικά',
    country: 'Greece',
    flag: '🇬🇷',
    lat: 39.0742,
    lng: 21.8243,
    url: 'https://www.jupical.io/el_GR',
  },
  {
    id: 'hu',
    name: 'Magyar',
    country: 'Hungary',
    flag: '🇭🇺',
    lat: 47.1625,
    lng: 19.5033,
    url: 'https://www.jupical.io/hu',
  },
  {
    id: 'it',
    name: 'Italiano',
    country: 'Italy',
    flag: '🇮🇹',
    lat: 41.8719,
    lng: 12.5674,
    url: 'https://www.jupical.io/it',
  },
  {
    id: 'ja',
    name: '日本語',
    country: 'Japan',
    flag: '🇯🇵',
    lat: 36.2048,
    lng: 138.2529,
    url: 'https://www.jupical.io/ja',
  },
  {
    id: 'ko',
    name: '한국어 (KP)',
    country: 'Korea',
    flag: '🇰🇷',
    lat: 37.6639,
    lng: 127.9785,
    url: 'https://www.jupical.io/ko_KP',
  },
  {
    id: 'nb',
    name: 'Norsk bokmål',
    country: 'Norway',
    flag: '🇳🇴',
    lat: 60.472,
    lng: 8.4689,
    url: 'https://www.jupical.io/nb_NO',
  },
  {
    id: 'ro',
    name: 'română',
    country: 'Romania',
    flag: '🇷🇴',
    lat: 45.9432,
    lng: 24.9668,
    url: 'https://www.jupical.io/ro',
  },
  {
    id: 'sv',
    name: 'Svenska',
    country: 'Sweden',
    flag: '🇸🇪',
    lat: 60.1282,
    lng: 18.6435,
    url: 'https://www.jupical.io/sv',
  },
];

// Helper to convert Lat / Lng to 3D Cartesian Vector3 on sphere of radius R
function latLngToVector3(lat, lng, radius = 2.5) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Custom Procedural Canvas Texture Generator for Vibrant Blue Earth on White Background
function createCinematicEarthTextures() {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Rich Vibrant Blue Ocean Gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#004aa8');
  oceanGrad.addColorStop(0.5, '#0075FA');
  oceanGrad.addColorStop(1, '#004aa8');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Draw subtle latitude/longitude tech gridlines on oceans
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw land continent shapes in crisp bright white & cyan accent
  const landCanvas = document.createElement('canvas');
  landCanvas.width = width;
  landCanvas.height = height;
  const lctx = landCanvas.getContext('2d');

  lctx.fillStyle = '#ffffff';

  // North America
  lctx.beginPath();
  lctx.ellipse(450, 320, 220, 140, -0.2, 0, Math.PI * 2);
  lctx.fill();

  // South America
  lctx.beginPath();
  lctx.ellipse(650, 700, 120, 200, 0.4, 0, Math.PI * 2);
  lctx.fill();

  // Europe & Asia
  lctx.beginPath();
  lctx.ellipse(1250, 300, 380, 180, 0.1, 0, Math.PI * 2);
  lctx.fill();

  // Africa
  lctx.beginPath();
  lctx.ellipse(1100, 580, 160, 220, -0.1, 0, Math.PI * 2);
  lctx.fill();

  // Australia
  lctx.beginPath();
  lctx.ellipse(1650, 720, 140, 100, 0.1, 0, Math.PI * 2);
  lctx.fill();

  // Draw land onto main ocean canvas with glowing coastal outlines
  ctx.drawImage(landCanvas, 0, 0);
  ctx.strokeStyle = 'rgba(165, 243, 252, 0.9)';
  ctx.lineWidth = 3.5;

  // Add glowing city light hotspots across continents
  ctx.fillStyle = '#a5f3fc';
  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    ctx.beginPath();
    ctx.arc(rx, ry, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function GlobalEarthSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeLang, setActiveLang] = useState(null);
  const [hoveredLang, setHoveredLang] = useState(null);
  const [cardPositions, setCardPositions] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sceneRef = useRef({});

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. SCENE & CAMERA SETUP
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0075fa, 2.0);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    // 3. EARTH SPHERE & ATMOSPHERE
    const globeRadius = 2.5;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Earth Map Material with rich vibrant blue depth
    const earthTexture = createCinematicEarthTextures();
    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 35,
      specular: new THREE.Color(0x38bdf8),
      emissive: new THREE.Color(0x002d6b),
      bumpScale: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Atmosphere Outer Shroud (Light Blue Glow)
    const atmosGeo = new THREE.SphereGeometry(globeRadius + 0.15, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(0.0, 0.46, 0.98, 0.6) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // Orbital Rings around Earth
    const ringGeo1 = new THREE.RingGeometry(globeRadius + 0.4, globeRadius + 0.42, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0075fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    globeGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(globeRadius + 0.7, globeRadius + 0.71, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    globeGroup.add(ring2);

    // Ambient Floating Data Particles Background
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x0075fa,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. LANGUAGE HOTSPOTS & PIN MARKERS
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const pinMeshes = [];
    LANGUAGES.forEach((lang) => {
      const pos = latLngToVector3(lang.lat, lang.lng, globeRadius + 0.02);

      // Glowing Point Marker
      const dotGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x0075fa });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      dotMesh.userData = { lang };
      pinGroup.add(dotMesh);

      // Outer Pulse Ring
      const pulseGeo = new THREE.RingGeometry(0.08, 0.12, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x0075fa,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(pos.clone().multiplyScalar(1.01));
      pulseMesh.lookAt(pos.clone().multiplyScalar(2));
      pinGroup.add(pulseMesh);

      pinMeshes.push({ lang, mesh: dotMesh, pulse: pulseMesh, vec: pos });
    });

    // 5. INTERACTION CONTROLS (DRAG & ROTATION INERTIA)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.003 };
    let targetRotation = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / height) * 2 + 1;

      // Parallax effect on camera
      gsap.to(camera.position, {
        x: mouseX * 0.4,
        y: mouseY * 0.4,
        duration: 1,
        ease: 'power2.out',
      });

      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.005;
      rotationVelocity.x = deltaY * 0.005;

      globeGroup.rotation.y += rotationVelocity.y;
      globeGroup.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasElem = canvasRef.current;
    canvasElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        rotationVelocity.y = deltaX * 0.005;
        rotationVelocity.x = deltaY * 0.005;
        globeGroup.rotation.y += rotationVelocity.y;
        globeGroup.rotation.x += rotationVelocity.x;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    canvasElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Save refs for animation loop & callbacks
    sceneRef.current = {
      scene,
      camera,
      renderer,
      globeGroup,
      pinMeshes,
      rotationVelocity,
      cameraTargetZoom: 7.5,
    };

    // 6. ANIMATION & RAYCASTING LOOP
    let animationFrameId;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Inertia & Auto-Rotation when not dragging
      if (!isDragging) {
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;

        // Base background rotation
        globeGroup.rotation.y += rotationVelocity.y + 0.0015;
        globeGroup.rotation.x += rotationVelocity.x;
      }

      // Pulse ring scaling animation
      const time = Date.now() * 0.003;
      pinMeshes.forEach(({ pulse }) => {
        const scale = 1 + Math.sin(time * 3) * 0.25;
        pulse.scale.set(scale, scale, scale);
      });

      // Project 3D sphere point coordinates to 2D Screen space for card connection lines
      const newCardPositions = pinMeshes.map(({ lang, vec }) => {
        tempVec.copy(vec);
        tempVec.applyMatrix4(globeGroup.matrixWorld);
        tempVec.project(camera);

        // Check if on visible front hemisphere of sphere facing camera
        const isVisible = tempVec.z < 0.99;

        const screenX = (tempVec.x * 0.5 + 0.5) * width;
        const screenY = (-(tempVec.y * 0.5) + 0.5) * height;

        return {
          id: lang.id,
          x: screenX,
          y: screenY,
          isVisible,
        };
      });

      setCardPositions(newCardPositions);

      // Render Three scene
      renderer.render(scene, camera);
    };

    animate();

    // 7. GSAP SCROLLTRIGGER STORYTELLING SEQUENCE
    const scrollSection = containerRef.current;

    const st = ScrollTrigger.create({
      trigger: scrollSection,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // 1. Earth scales 0.7 -> 1.0
        const globeScale = 0.7 + progress * 0.35;
        globeGroup.scale.set(globeScale, globeScale, globeScale);

        // 2. Camera smooth depth positioning
        camera.position.z = 7.5 - progress * 1.2;
      },
    });

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      st.kill();
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasElem.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Smoothly rotate Earth to chosen location on Hover or Click
  const focusOnLanguage = (lang, isClick = false) => {
    const { globeGroup, camera } = sceneRef.current;
    if (!globeGroup) return;

    // Target rotation based on Lat/Lng
    const targetY = -(lang.lng + 180) * (Math.PI / 180) + Math.PI / 2;
    const targetX = lang.lat * (Math.PI / 180);

    gsap.to(globeGroup.rotation, {
      x: targetX,
      y: targetY,
      duration: isClick ? 1.8 : 1.2,
      ease: 'power3.inOut',
    });

    if (isClick) {
      setActiveLang(lang.id);
      gsap.to(camera.position, {
        z: 4.8,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete: () => {
          // Navigate to language route after zoom transition
          window.open(lang.url, '_blank');
          // Reset zoom back after opening
          gsap.to(camera.position, { z: 7.5, duration: 1.2 });
        },
      });
    }
  };

  const handleCardHover = (lang) => {
    setHoveredLang(lang ? lang.id : null);
    if (lang) {
      focusOnLanguage(lang, false);
    }
  };

  const handleCardClick = (lang) => {
    focusOnLanguage(lang, true);
  };

  return (
    <section className="global-earth-section" ref={containerRef} id="global-presence">
      {/* Dark Ambient Glowing Background & Starfield Canvas */}
      <div className="global-earth__bg-glow" />
      <canvas ref={canvasRef} className="global-earth__canvas" />

      {/* Dynamic 2D Overlay SVG Connecting Lines */}
      <svg className="global-earth__svg-lines">
        {cardPositions.map((pos) => {
          if (!pos.isVisible) return null;
          const isHovered = hoveredLang === pos.id;
          const isActive = activeLang === pos.id;

          // Find card DOM anchor position
          const cardElem = document.getElementById(`lang-card-${pos.id}`);
          if (!cardElem) return null;

          const containerRect = containerRef.current.getBoundingClientRect();
          const cardRect = cardElem.getBoundingClientRect();

          const cardX = cardRect.left + cardRect.width / 2 - containerRect.left;
          const cardY = cardRect.top + cardRect.height / 2 - containerRect.top;

          // Bezier control point for smooth futuristic curve
          const controlX = (pos.x + cardX) / 2;
          const controlY = (pos.y + cardY) / 2 - 30;

          return (
            <g key={`line-${pos.id}`}>
              <path
                d={`M ${pos.x} ${pos.y} Q ${controlX} ${controlY} ${cardX} ${cardY}`}
                className={`earth-connection-line ${isHovered ? 'line--hovered' : ''} ${isActive ? 'line--active' : ''
                  }`}
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? '5' : '3'}
                className="earth-connection-dot"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Glassmorphism Language Cards Overlay */}
      <div
        className="global-earth__cards-container"
        style={{
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.15) * 3)),
          transform: `scale(${0.9 + Math.min(0.1, scrollProgress * 0.1)})`,
        }}
      >
        {LANGUAGES.map((lang, index) => {
          const isHovered = hoveredLang === lang.id;
          const isActive = activeLang === lang.id;

          return (
            <div
              key={lang.id}
              id={`lang-card-${lang.id}`}
              className={`glass-lang-card ${isHovered ? 'card--hovered' : ''} ${isActive ? 'card--active' : ''
                }`}
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
              onMouseEnter={() => handleCardHover(lang)}
              onMouseLeave={() => handleCardHover(null)}
              onClick={() => handleCardClick(lang)}
              title={`Click to explore in ${lang.name}`}
            >
              <div className="glass-lang-card__flag">{lang.flag}</div>
              <div className="glass-lang-card__content">
                <span className="glass-lang-card__name">{lang.name}</span>
                <span className="glass-lang-card__country">{lang.country}</span>
              </div>
              <div className="glass-lang-card__glow-point" />

              {/* Tooltip on Hover */}
              {isHovered && (
                <div className="glass-lang-card__tooltip">
                  <span>Explore {lang.name} Website →</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scroll-Driven Storytelling Section Title & CTA positioned centrally */}
      <div
        className="global-earth__content"
        style={{
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.2) * 2.5)),
          transform: `translate(-50%, -50%) translateY(${(1 - Math.min(1, scrollProgress * 1.5)) * 30}px)`,
        }}
      >
        <div className="global-earth__badge">
          <span className="badge-ping" />
          Global ERP Reach & Localization
        </div>

        <h2 className="global-earth__title">Explore Our Global Presence</h2>

        <p className="global-earth__subtext">
          Choose your language and discover our experience around the world. Serving multi-site
          enterprises across 16+ localized regions.
        </p>
      </div>
    </section>
  );
}
