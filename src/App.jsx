import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function App() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const ringRef = useRef(null);
  const particleGroupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const contentRef = useRef(null);
  const logoPreviewRef = useRef(null);
  const scrollAmountRef = useRef(0);
  const [logosActive, setLogosActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const [visibleCardIds, setVisibleCardIds] = useState([]);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    window.localStorage.removeItem('aag-theme');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateView = () => setIsMobile(mediaQuery.matches);
    updateView();
    mediaQuery.addEventListener('change', updateView);
    return () => mediaQuery.removeEventListener('change', updateView);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cardSections = Array.from(document.querySelectorAll('[data-animate-card]'));
    if (!cardSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const cardId = entry.target.getAttribute('data-card-id');
          if (cardId) {
            setVisibleCardIds((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]));
          }

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    cardSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);



  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 14);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambient = new THREE.AmbientLight(0xfffdf5, 0.9);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xfff8e7, 0.95);
    mainLight.position.set(4, 8, 5);
    mainLight.castShadow = false;
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0xd6b46a, 0.35);
    backLight.position.set(-5, 2, -6);
    scene.add(backLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(2, -2, 4);
    scene.add(fillLight);

    // 3D Floating "AAG" Text Mesh - Front-facing Classic Gold Poster Style
    const createAAGTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, 1200, 512);

      // Signature gold color combo
      const fillColor = '#D6B46A';

      // Font using Cinzel / Numans serif style
      ctx.font = '700 190px "Cinzel", "Numans", "Raleway", serif';
      if ('letterSpacing' in ctx) {
        ctx.letterSpacing = '40px';
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Sober ambient gold drop shadow
      ctx.shadowColor = 'rgba(214, 180, 106, 0.25)';
      ctx.shadowBlur = 24;

      ctx.fillStyle = fillColor;
      ctx.fillText('A   A   G', 600, 256);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.strokeText('A   A   G', 600, 256);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          ctx.clearRect(0, 0, 1200, 512);
          ctx.fillStyle = fillColor;
          ctx.fillText('A   A   G', 600, 256);
          ctx.strokeText('A   A   G', 600, 256);
          texture.needsUpdate = true;
        });
      }

      return texture;
    };

    const textTexture = createAAGTexture();
    const textGeo = new THREE.PlaneGeometry(9.5, 4.0);
    const textMat = new THREE.MeshBasicMaterial({
      map: textTexture,
      transparent: true,
      opacity: 0.55,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const aagTextMesh = new THREE.Mesh(textGeo, textMat);
    aagTextMesh.position.set(0, 0.5, 0);
    aagTextMesh.rotation.set(0, 0, 0);
    scene.add(aagTextMesh);
    ringRef.current = aagTextMesh;

    const updateResponsiveTextScale = () => {
      if (!aagTextMesh || !camera) return;
      const vHeight = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
      const vWidth = vHeight * camera.aspect;
      // Fit within 82% of visible width on mobile/tablet, max scale 1.0 on desktop
      const targetScale = Math.min(1.0, (vWidth * 0.82) / 9.5);
      aagTextMesh.scale.set(targetScale, targetScale, 1);
    };
    updateResponsiveTextScale();

    // Elegant Warm Gold (#D6B46A / #CFB377) & Pure White particle cloud
    const particleGroup = new THREE.Group();
    const colors = [0xffffff, 0xd6b46a, 0xcfb377, 0xf4e7c5, 0xe2e8f0, 0xa8863d];
    for (let i = 0; i < 40; i++) {
      const geom = new THREE.SphereGeometry(0.038, 6);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.2 + Math.random() * 0.28,
      });
      const mesh = new THREE.Mesh(geom, mat);
      const radius = 3 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      mesh.position.set(
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.sin(theta) * Math.sin(phi) * radius * 0.6 + 0.5,
        Math.cos(phi) * radius * 0.8
      );
      mesh.userData = { speed: 0.001 + Math.random() * 0.003 };
      particleGroup.add(mesh);
    }
    scene.add(particleGroup);
    particleGroupRef.current = particleGroup;

    // Animation Loop for Floating 3D Text & Particles
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Front-facing subtle floating (strictly no tilt)
      if (aagTextMesh) {
        aagTextMesh.position.y = 0.5 + Math.sin(elapsedTime * 0.7) * 0.1;
        aagTextMesh.rotation.set(0, 0, 0);
      }

      // Gentle orbit for particle cloud
      if (particleGroupRef.current) {
        particleGroupRef.current.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateResponsiveTextScale();
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    const logoSection = logoPreviewRef.current;
    let logoObserver;
    if (logoSection) {
      logoObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLogosActive(true);
            logoObserver.disconnect();
          }
        },
        {
          root: null,
          rootMargin: '0px 0px -20% 0px',
          threshold: 0.15,
        }
      );
      logoObserver.observe(logoSection);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (logoObserver) {
        logoObserver.disconnect();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Company data with updated descriptions
  const companies = [
    {
      id: 'bn-agrochem',
      name: 'BN Agrochem',
      icon: 'fa-droplet',
      logoIcon: 'fa-seedling',
      logoLabel: 'bn',
      color: '#0f5f8f',
      logoColors: ['#0d5f8a', '#3a9cc8', '#83d4f5'],
      logoImage: '/logos/BN-Agrochem-Limited-Logo.png',
      website: 'https://www.bn-holdings.com/',
      description: 'The organization is committed to its vision of building a healthy nation by providing the consumers with nutritious and quality products with unwavering commitment to innovation and ecologically sustainable initiatives by championing environmental stewardship and resource conservation. Our mission is to emerge as the foremost leader in the edible oil and FMCG sector while adhering to highest standards of environmental, social, and corporate governance practices to create a sustainable future and deliver a long-term value to all our stakeholders, including our customers, employees, shareholders, and the communities at large.',
      fullName: 'BN Agrochem Limited',
      stock: 'BSE: 526125 | CIN: L15315MH1991PLC326590',
      tags: ['Edible Oils', 'Solvent Extraction', 'Agri-Trading', 'BSE Listed']
    },
    {
      id: 'agastya',
      name: 'Agastya',
      icon: 'fa-star',
      logoIcon: 'fa-star',
      logoLabel: 'A',
      color: '#d95135',
      logoColors: ['#d95f03', '#f38526', '#ffd37a'],
      logoImage: '/logos/Final-AGASTYA-Logo_ctc-1-removebg-preview.png',
      website: 'https://agastyaenergy.in/',
      description: '"Agastya" symbolises Balance & Harmony. Agastya is inspired by the timeless principles of balance and harmony—a philosophy that reflects our approach to responsible growth and environmental sustainability. Agastya is an innovation-led enterprise focused on next-generation green energy and environmental solutions. Our mission is to enable the world\'s transition to a circular, balanced economy powered by clean resources.',
      fullName: 'Agastya Energy Solutions',
      stock: 'NSE: INE753W01010 | CIN: L24100GJ2005PLC047292',
      tags: ['Solar Energy', 'Wind Power', 'Circular Economy', 'Global Solutions']
    },
    {
      id: 'epitome',
      name: 'Epitome',
      icon: 'fa-fire-flame-curved',
      logoIcon: 'fa-flask',
      logoLabel: 'E',
      color: '#4c2fa0',
      logoColors: ['#5548c8', '#7f5cff', '#b38dff'],
      logoImage: '/logos/epitome.png',
      description: 'Introducing a comprehensive range of Biostimulants, Flower Booster, Organic Fertilizer Soya Based Amino Acid, Biocide, Water Treatment Chemicals, Industrial Descalents, Formulation Stabilizer All in One, Phosphonic Potassium Salt / Phosphonic Acid Technical Crystals, Humic Acid, Fulvic Acid, NATCA, LCH Mono, IAA / IBA / 2,3,5 -TIBA, Pest Repellant, Chitosan Oligosaccharide SC, etc.',
      fullName: 'Epitome Industries India Limited',
      stock: 'Oleochemicals | Biodiesel | Specialty Chemicals',
      tags: ['Bio-Chemicals', 'Oleochemicals', 'Biodiesel', 'Green Chemistry']
    },
    {
      id: 'indichip',
      name: 'Indichip',
      icon: 'fa-microchip',
      logoIcon: 'fa-microchip',
      logoLabel: 'IC',
      color: '#1a3a5a',
      logoColors: ['#1b3a68', '#4a62d1', '#8fa6ff'],
      logoImage: '/logos/Indichip.png',
      website: 'https://www.indichipsemiconductors.com/',
      description: 'At Indichip Semiconductors Limited, we are shaping the future of technology by empowering India’s journey towards self-reliance in semiconductor manufacturing. Driven by a vision to innovate and lead, we specialize in manufacturing advanced Silicon Carbide (SiC) power devices, laying the foundation for a stronger, greener, and more sustainable nation. As a proud contributor to the Government of India’s Make-in-India initiative, Indichip is committed to transforming India into a global hub for chip manufacturing. To achieve this ambitious goal, we have entered into a strategic technology transfer agreement with Yitoa Micro Technology Corporation (formerly Pioneer Micro Technology Corporation). This collaboration enables us to leverage cutting-edge technology and expertise to establish a world-class semiconductor manufacturing ecosystem.',
      fullName: 'Indichip Semiconductors',
      stock: 'Semiconductors | Technology | Innovation',
      tags: ['Chip Design', 'AI & IoT', 'Self-Reliance', 'Global Export']
    }
  ];

  return (
    <div className="relative min-w-full min-h-screen overflow-x-hidden overflow-y-hidden font-['Raleway','Manrope',sans-serif] bg-page text-theme transition-colors duration-500">
      {/* 3D Canvas */}
      <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-0"></div>

      {/* Navbar */}
      <nav className="tablet-nav fixed top-0 left-0 right-0 z-20 bg-surface/90 backdrop-blur-md border-b border-[#D6B46A]/30 px-4 sm:px-6 md:px-12 py-3 md:py-4 transition-colors duration-500 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c1917] via-[#2a2419] to-[#0c0e14] flex items-center justify-center shadow-md overflow-hidden border border-[#D6B46A]/40">
              <img src="/logos/AAg update logo.png" alt="AAG logo" className="w-full h-full object-contain p-1" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm">
            {companies.map((company) => (
              <a
                key={company.id}
                href={`#${company.id}`}
                className="nav-link-hover text-slate-800 font-semibold font-['Manrope'] text-xs uppercase tracking-wider hover:text-[#A8863D]"
              >
                {company.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-slate-800"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-3 rounded-3xl bg-surface border border-[#D6B46A]/30 shadow-xl backdrop-blur-md p-4 transition-colors duration-500">
            <div className="flex flex-col gap-3">
              {companies.map((company) => (
                <a
                  key={`mobile-${company.id}`}
                  href={`#${company.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block nav-link-hover text-sm text-slate-800 font-semibold uppercase tracking-[0.18em] hover:text-[#A8863D]"
                >
                  {company.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Scrollable content */}
      <div ref={contentRef} className="tablet-tight-content relative z-10 min-h-screen overflow-y-auto pointer-events-auto pt-12 md:pt-10 lg:pt-20">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-5rem)] lg:min-h-screen w-full flex items-center justify-center pointer-events-none p-3 sm:p-6 md:p-4 mt-0">
          <div className="pointer-events-auto bg-surface backdrop-blur-lg rounded-[24px] sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-16 w-full max-w-none md:max-w-none border border-[#D6B46A]/35 shadow-[0_20px_60px_-15px_rgba(214,180,106,0.14)] transform transition-all duration-300 hover:shadow-[0_25px_70px_-10px_rgba(214,180,106,0.2)] hover:scale-[1.005] hover:border-[#D6B46A]/60 transition-colors duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-8 mb-6 sm:mb-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#1c1917] via-[#2a2419] to-[#0c0e14] flex items-center justify-center shadow-2xl flex-shrink-0 transform transition-transform duration-300 hover:scale-105 overflow-hidden border border-[#D6B46A]/50 ring-1 ring-[#CFB377]/30">
                <img src="/logos/AAg update logo.png" alt="AAG logo" className="w-full h-full object-contain p-4" />
              </div>
              <div className="w-full">
                <div className="inline-block relative">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Cinzel','Cormorant_Garamond','Georgia',serif]">
                    Anubhav Agrawal Group
                  </h1>
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-gradient-to-r from-[#A8863D] via-[#D6B46A] via-[#CFB377] to-[#8F6E27] relative">
                    <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[hero-line-shimmer_2.4s_linear_infinite]" />
                  </div>
                </div>
                <p className="text-[#A8863D] font-semibold text-[11px] sm:text-sm tracking-[0.22em] uppercase mt-2.5 font-['Manrope']">
                  Building India's Industrial Future Through Innovation
                </p>
              </div>
            </div>

            <div className="mb-0 sm:mb-8">
              <div className="rounded-[20px] sm:rounded-3xl bg-[#FCFAFA]/80 backdrop-blur-sm border border-[#D6B46A]/25 border-l-4 border-l-[#D6B46A] p-5 sm:p-8 shadow-sm transition-colors duration-500">
                <h3 className="text-lg sm:text-xl font-bold gold-gradient-text mb-3 sm:mb-4 font-['Cinzel','Raleway',serif]">About Anubhav Agrawal Group</h3>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-7 sm:leading-8 font-['Manrope']">
                  <strong className="text-slate-900">Anubhav Agarwal Group </strong> is a diversified Indian business conglomerate committed to driving innovation, industrial excellence, and sustainable growth. With a strong presence across specialty chemicals, agrochemicals, renewable energy, advanced manufacturing, and semiconductor technology, AAG is building future-ready businesses that contribute to India's industrial progress and global competitiveness. Guided by a vision of innovation, integrity, and long-term value creation, the Group continues to empower industries, strengthen infrastructure, and deliver solutions that create a lasting impact.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Company logos preview */}
        <section ref={logoPreviewRef} className={`w-full flex items-center justify-center py-8 sm:py-12 md:py-6 pointer-events-none p-3 sm:p-6 md:px-4 transition-all duration-700 ${logosActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="pointer-events-auto max-w-6xl w-full">
            <div className="mb-6 sm:mb-8 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-['Cinzel','Raleway',serif]">AAG <span className="gold-gradient-text">Companies</span></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-4">
              {companies.map((company, index) => (
                <a
                  key={`logo-preview-${company.id}`}
                  href={company.website || `#${company.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-3xl bg-surface border border-[#D6B46A]/25 p-6 flex items-center justify-center shadow-md ${logosActive ? (index % 2 === 0 ? 'logo-enter-lr animate-vibrate-lr animate-float' : 'logo-enter-rl animate-vibrate-rl animate-float') : 'opacity-0'} transition-all duration-500 hover:ring-2 hover:ring-[#D6B46A]/60 hover:border-[#D6B46A] hover:shadow-[0_15px_35px_rgba(214,180,106,0.18)]`}
                >
                  <img src={company.logoImage || '/logos/AAg update logo.png'} alt={`${company.name} logo`} className="h-20 md:h-24 object-contain" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Company Sections */}
        {companies.map((company, index) => {
          const isVisible = visibleCardIds.includes(company.id);

          return (
            <section
              key={company.id}
              id={company.id}
              data-animate-card
              data-card-id={company.id}
              className={`min-h-auto w-full flex items-center justify-center pointer-events-none px-3 py-2 sm:px-6 sm:py-3 md:px-4 md:py-1 lg:px-4 lg:py-1 scroll-fade card-reveal ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="pointer-events-auto bg-surface backdrop-blur-lg rounded-[24px] sm:rounded-3xl p-4 sm:p-8 md:p-5 lg:p-8 max-w-6xl w-full sm:w-[95%] border border-[#D6B46A]/30 shadow-xl transform transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(214,180,106,0.2)] hover:scale-[1.005] hover:border-[#D6B46A]/60 hover:ring-1 hover:ring-[#D6B46A]/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-4 mb-6 sm:mb-8 md:mb-4 border-b border-[#D6B46A]/20 pb-4 sm:pb-6 md:pb-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 shadow-xl transform transition-all duration-300 hover:scale-105" style={{ background: `linear-gradient(135deg, ${company.logoColors.join(', ')})` }}>
                    <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden shadow-inner transition-colors duration-500">
                      {company.logoImage ? (
                        <img src={company.logoImage} alt={`${company.name} logo`} className="w-full h-full object-contain p-2" />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xl font-black tracking-tight" style={{ color: company.color }}>{company.logoLabel}</span>
                          <i className={`fas ${company.logoIcon} text-xs mt-1`} style={{ color: company.color }}></i>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Cinzel','Raleway',serif]">{company.name}</h2>
                    <p className="text-sm text-[#A8863D] font-semibold font-['Manrope'] mt-0.5">
                      {company.fullName}
                    </p>
                    {company.stock && (
                      <p className="text-xs text-slate-500 font-['Manrope'] mt-1">{company.stock}</p>
                    )}
                    {company.website && (
                      <p className="text-xs mt-2">
                        <a href={company.website} target="_blank" rel="noreferrer" className="text-[#A8863D] hover:text-[#78591f] font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors">
                          Visit {company.name} website <i className="fas fa-external-link-alt text-[10px]"></i>
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <div className={isMobile ? 'rounded-none border-0 bg-transparent p-0 shadow-none mb-5' : 'relative bg-[#FCFAFA]/80 rounded-[20px] p-4 sm:p-6 md:p-4 mb-6 sm:mb-8 md:mb-4 border-l-4 border-l-[#D6B46A] border border-[#D6B46A]/20 shadow-xs transition-all duration-300 hover:shadow-sm'}>
                  <p className={`text-slate-800 leading-7 sm:leading-8 text-sm sm:text-[15px] font-['Manrope'] ${isMobile ? 'text-base' : ''}`}>
                    {company.description}
                  </p>
                </div>

                {/* Industry tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-2">
                  {company.tags.map((tag, idx) => (
                    <div key={idx} className="px-3.5 py-2.5 rounded-2xl bg-[#FCFAFA] border border-[#D6B46A]/30 text-center shadow-xs transition-all duration-300 hover:scale-[1.03] hover:border-[#D6B46A] hover:shadow-md">
                      <p className="text-xs font-semibold text-[#A8863D] font-['Manrope']">{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Footer / Enterprise Section */}
        <footer className="w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white border-t-2 border-[#D6B46A]/40 shadow-2xl mt-12 md:mt-20">
          <div className="pointer-events-auto max-w-7xl mx-auto px-4 py-8 sm:px-8 md:px-12 md:py-16">
            <div className="grid gap-5 sm:gap-10 lg:grid-cols-[2fr_1fr]">
              <div className="flex flex-col gap-3 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-md p-3 shadow-md flex items-center justify-center border border-[#D6B46A]/50">
                    <img src="/logos/AAg update logo.png" alt="AAG logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="sm:block">
                    <h3 className="hidden sm:block text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Cinzel','Georgia',serif]">Anubhav Agrawal Group</h3>
                  </div>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-stone-300 font-['Manrope']">Anubhav Agrawal Group is an enterprise platform uniting high-growth businesses across agrochemicals, renewable energy, bio-chemicals, and semiconductor manufacturing. We combine strategic partnerships, innovation, and a Make-in-India growth agenda to create sustainable value and world-class industrial capabilities.</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 backdrop-blur-md px-3.5 py-2 text-[11px] sm:text-xs text-[#CFB377] font-medium shadow-sm">Enterprise Strategy</span>
                  <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 backdrop-blur-md px-3.5 py-2 text-[11px] sm:text-xs text-[#CFB377] font-medium shadow-sm">Make in India</span>
                  <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 backdrop-blur-md px-3.5 py-2 text-[11px] sm:text-xs text-[#CFB377] font-medium shadow-sm">Sustainable Growth</span>
                </div>
              </div>

              <div className="grid gap-3 text-left sm:gap-4 md:ml-6 lg:ml-10">
                <p className="text-sm font-semibold text-[#D6B46A] uppercase tracking-[0.24em] font-['Manrope']">Quick Links</p>
                <a href="#bn-agrochem" className="text-sm text-stone-300 hover:text-[#D6B46A] transition-colors font-['Manrope']">BN Agrochem</a>
                <a href="#agastya" className="text-sm text-stone-300 hover:text-[#D6B46A] transition-colors font-['Manrope']">Agastya</a>
                <a href="#epitome" className="text-sm text-stone-300 hover:text-[#D6B46A] transition-colors font-['Manrope']">Epitome</a>
                <a href="#indichip" className="text-sm text-stone-300 hover:text-[#D6B46A] transition-colors font-['Manrope']">Indichip</a>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 border-t border-stone-700/60 pt-6 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between text-sm text-stone-400 font-['Manrope']">
              <p className="text-center md:text-left">© 2026 Anubhav Agrawal Group. All Rights Reserved.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-stone-400 md:justify-end">
                <span className="uppercase tracking-[0.3em] text-[11px] sm:text-xs">Innovation</span>
                <span className="text-[#D6B46A]">|</span>
                <span className="uppercase tracking-[0.3em] text-[11px] sm:text-xs">Sustainability</span>
                <span className="text-[#D6B46A]">|</span>
                <span className="uppercase tracking-[0.3em] text-[11px] sm:text-xs">Growth</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default App;