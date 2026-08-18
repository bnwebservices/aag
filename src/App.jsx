import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import MediaSection from './components/MediaSection';
import BnAgrochemPage from './pages/BnAgrochemPage';
import AgastyaPage from './pages/AgastyaPage';
import AboutPage from './pages/AboutPage';
import InvestorsPage from './pages/InvestorsPage';
import MediaPage from './pages/MediaPage';

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
  const [logosActive, setLogosActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const [visibleCardIds, setVisibleCardIds] = useState(['bn-agrochem', 'agastya', 'epitome', 'indichip', 'media']);
  const [companiesDropdownOpen, setCompaniesDropdownOpen] = useState(false);
  
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace('/', '').toLowerCase();
      if (['bn-agrochem', 'agastya', 'about', 'investors', 'media'].includes(path)) {
        return path;
      }
    }
    return 'home';
  });

  const navigateTo = (pageId, e = null) => {
    if (e) e.preventDefault();
    setActivePage(pageId);
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState(null, '', pageId === 'home' ? '/' : `/${pageId}`);
    }
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setMenuOpen(false);
  };

  // Scroll to top on every page switch
  useEffect(() => {
    const resetScroll = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    };
    resetScroll();
    const timer = setTimeout(resetScroll, 50);
    return () => clearTimeout(timer);
  }, [activePage]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '').toLowerCase();
      const targetPage = ['bn-agrochem', 'agastya', 'about', 'investors', 'media'].includes(path) ? path : 'home';
      setActivePage(targetPage);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  // Scroll offset handler to render cards comfortably below fixed navbar
  const handleNavClick = (e, companyId) => {
    e.preventDefault();
    const targetElement = document.getElementById(companyId);
    if (!targetElement) return;

    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState(null, '', `/${companyId}`);
    }

    const navbarOffset = 100; // Fixed navbar height + breathing room

    if (contentRef.current && contentRef.current.scrollHeight > contentRef.current.clientHeight) {
      const containerRect = contentRef.current.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const currentScroll = contentRef.current.scrollTop;
      const targetScroll = currentScroll + (targetRect.top - containerRect.top) - navbarOffset;

      contentRef.current.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    } else {
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navbarOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative min-w-full min-h-screen overflow-x-hidden overflow-y-hidden font-['Raleway','Manrope',sans-serif] bg-page text-theme transition-colors duration-500">
      {/* 3D Canvas */}
      <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-0"></div>

      {/* Navbar */}
      <nav className="tablet-nav fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#D6B46A]/40 px-4 sm:px-6 md:px-12 py-3.5 md:py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            onClick={(e) => navigateTo('home', e)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center -my-2.5 transition-all duration-300 group-hover:scale-105">
              <img
                src="/logos/logo new.webp"
                alt="AAG logo"
                className="h-full w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(214,180,106,0.3)] group-hover:drop-shadow-[0_4px_16px_rgba(214,180,106,0.5)] transition-all duration-300"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm">
            
            {/* Companies Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompaniesDropdownOpen(true)}
              onMouseLeave={() => setCompaniesDropdownOpen(false)}
            >
              <button
                onClick={() => setCompaniesDropdownOpen((prev) => !prev)}
                className={`nav-link-hover font-semibold font-['Manrope'] text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer py-1.5 transition-colors ${
                  activePage === 'bn-agrochem' || activePage === 'agastya' ? 'text-[#A8863D] font-bold' : 'text-slate-800 hover:text-[#A8863D]'
                }`}
              >
                <span>Companies</span>
                <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${companiesDropdownOpen ? 'rotate-180 text-[#A8863D]' : ''}`}></i>
              </button>

              {/* Dropdown Menu Box */}
              {companiesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#D6B46A]/40 shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                  <div className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider px-3 py-1.5 border-b border-stone-100 font-['Manrope']">
                    AAG Enterprise Companies
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    {companies.map((company) => (
                      <a
                        key={`drop-${company.id}`}
                        href={company.id === 'bn-agrochem' ? '/bn-agrochem' : company.id === 'agastya' ? '/agastya' : `/${company.id}`}
                        onClick={(e) => {
                          setCompaniesDropdownOpen(false);
                          if (company.id === 'bn-agrochem') {
                            navigateTo('bn-agrochem', e);
                          } else if (company.id === 'agastya') {
                            navigateTo('agastya', e);
                          } else {
                            if (activePage !== 'home') {
                              navigateTo('home', e);
                              setTimeout(() => handleNavClick(e, company.id), 150);
                            } else {
                              handleNavClick(e, company.id);
                            }
                          }
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-stone-100 p-1 flex items-center justify-center border border-stone-200 group-hover:border-[#D6B46A] flex-shrink-0">
                          {company.logoImage ? (
                            <img src={company.logoImage} alt={company.name} className="w-full h-full object-contain" />
                          ) : (
                            <i className={`fas ${company.logoIcon} text-xs`} style={{ color: company.color }}></i>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#A8863D] transition-colors font-['Cinzel','Raleway',serif]">
                            {company.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-['Manrope'] truncate max-w-[150px]">
                            {company.sector}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {[
              { id: 'about', label: 'Leadership & Structure' },
              { id: 'investors', label: 'Investors' },
              { id: 'media', label: 'Media' },
            ].map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={`/${item.id}`}
                  onClick={(e) => navigateTo(item.id, e)}
                  className={`nav-link-hover font-semibold font-['Manrope'] text-xs uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#A8863D] font-bold border-b-2 border-[#D6B46A] pb-0.5' : 'text-slate-800 hover:text-[#A8863D]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-slate-800 p-2"
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
              {/* Mobile Companies Sub-list */}
              <div className="flex flex-col gap-1 border-b border-stone-200/60 pb-3">
                <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider px-1 mb-1 font-['Manrope']">
                  Our Companies
                </span>
                {companies.map((company) => (
                  <a
                    key={`mobile-drop-${company.id}`}
                    href={company.id === 'bn-agrochem' ? '/bn-agrochem' : company.id === 'agastya' ? '/agastya' : `/${company.id}`}
                    onClick={(e) => {
                      setMenuOpen(false);
                      if (company.id === 'bn-agrochem') navigateTo('bn-agrochem', e);
                      else if (company.id === 'agastya') navigateTo('agastya', e);
                      else {
                        if (activePage !== 'home') {
                          navigateTo('home', e);
                          setTimeout(() => handleNavClick(e, company.id), 150);
                        } else {
                          handleNavClick(e, company.id);
                        }
                      }
                    }}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-[#A8863D]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#D6B46A]"></span>
                    <span>{company.name}</span>
                  </a>
                ))}
              </div>

              {/* Mobile Other Items */}
              {[
                { id: 'about', label: 'Leadership & Structure' },
                { id: 'investors', label: 'Investors & Banking' },
                { id: 'media', label: 'Media' },
              ].map((item) => (
                <a
                  key={`mobile-${item.id}`}
                  href={`/${item.id}`}
                  onClick={(e) => navigateTo(item.id, e)}
                  className={`block text-xs font-semibold uppercase tracking-[0.18em] py-1.5 ${
                    activePage === item.id ? 'text-[#A8863D] font-bold' : 'text-slate-800 hover:text-[#A8863D]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Scrollable Content Viewport */}
      <div ref={contentRef} className="tablet-tight-content relative z-10 min-h-screen overflow-y-auto pointer-events-auto pt-16 sm:pt-20 md:pt-24 lg:pt-24">
        
        {/* Page Switcher */}
        {activePage === 'bn-agrochem' && <BnAgrochemPage />}
        {activePage === 'agastya' && <AgastyaPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'investors' && <InvestorsPage />}
        {activePage === 'media' && <MediaPage />}

        {/* Home Page */}
        {activePage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="min-h-[calc(100vh-5rem)] lg:min-h-screen w-full flex items-center justify-center pointer-events-none p-3 sm:p-6 md:p-4 mt-0">
              <div className="pointer-events-auto bg-surface backdrop-blur-lg rounded-[24px] sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-16 w-full max-w-none md:max-w-none border border-[#D6B46A]/35 shadow-[0_20px_60px_-15px_rgba(214,180,106,0.14)] transform transition-all duration-300 hover:shadow-[0_25px_70px_-10px_rgba(214,180,106,0.2)] hover:scale-[1.005] hover:border-[#D6B46A]/60 transition-colors duration-500">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-8 mb-6 sm:mb-10">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#796F5C] flex items-center justify-center shadow-md flex-shrink-0 transform transition-transform duration-300 hover:scale-105 overflow-hidden border border-[#D6B46A]/60 ring-1 ring-[#CFB377]/40">
                    <img src="/logos/logo new.webp" alt="AAG logo" className="w-full h-full object-contain p-2 sm:p-3" />
                  </div>
                  <div className="w-full">
                    <div className="inline-block relative">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-['Cinzel','Cormorant_Garamond','Georgia',serif] gold-gradient-text">
                        Anubhav Agarwal Group
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
                    <h3 className="text-lg sm:text-xl font-bold gold-gradient-text mb-3 sm:mb-4 font-['Cinzel','Raleway',serif]">About Anubhav Agarwal Group</h3>
                    <p className="text-sm sm:text-[15px] text-slate-700 leading-7 sm:leading-8 font-['Manrope']">
                      <strong className="text-slate-900">Anubhav Agarwal Group </strong> is a diversified Indian business conglomerate committed to driving innovation, industrial excellence, and sustainable growth. With a strong presence across specialty chemicals, agrochemicals, renewable energy, advanced manufacturing, and semiconductor technology, AAG is building future-ready businesses that contribute to India's industrial progress and global competitiveness. Guided by a vision of innovation, integrity, and long-term value creation, the Group continues to empower industries, strengthen infrastructure, and deliver solutions that create a lasting impact.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Company logos preview - RUNNING RIGHT TO LEFT MARQUEE */}
            <section ref={logoPreviewRef} className="w-full overflow-hidden py-10 sm:py-16 pointer-events-none transition-all duration-700 opacity-100 translate-y-0">
              <div className="pointer-events-auto w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] border-y-2 border-[#D6B46A]/40 py-10 sm:py-14 shadow-2xl">
                <div className="mb-6 sm:mb-8 text-center px-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">AAG Companies</h2>
                  <p className="text-xs sm:text-sm text-stone-300 font-semibold font-['Manrope'] mt-1.5 uppercase tracking-wider">
                    Our portfolio across four core industrial sectors
                  </p>
                  <div className="mt-2.5 mx-auto h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
                </div>

                {/* Continuous Running Cards Marquee Strip (Right to Left) - GOLD GRADIENT LANE MATCHED TO TITLE */}
                <div className="relative w-full overflow-hidden py-6 sm:py-8 bg-gradient-to-r from-[#7a5b1e] via-[#b89345] via-[#D6B46A] via-[#CFB377] to-[#8f6e27] shadow-[0_10px_35px_rgba(214,180,106,0.3)] border-y-2 border-[#D6B46A]">
                  
                  {/* Shimmer Light Sweep Effect across the Gold Lane */}
                  <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[hero-line-shimmer_3s_linear_infinite] pointer-events-none" />

                  <div className="flex gap-8 animate-marquee-running items-stretch relative z-10">
                    {[...companies, ...companies, ...companies].map((company, index) => (
                      <a
                        key={`logo-marquee-${company.id}-${index}`}
                        href={company.website || `/${company.id}`}
                        onClick={(e) => {
                          if (company.id === 'bn-agrochem') navigateTo('bn-agrochem', e);
                          else if (company.id === 'agastya') navigateTo('agastya', e);
                          else if (!company.website) handleNavClick(e, company.id);
                        }}
                        target={company.website ? "_blank" : "_self"}
                        rel="noreferrer"
                        className="flex-shrink-0 w-72 sm:w-88 rounded-3xl bg-white border-2 border-white/80 p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-[#D6B46A] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)] group relative overflow-hidden"
                      >
                        {/* Big Prominent Logo Container */}
                        <div className="h-40 sm:h-48 w-full flex items-center justify-center p-4 rounded-2xl bg-white shadow-inner border border-slate-100 transition-all duration-300 group-hover:border-[#D6B46A]/60 group-hover:shadow-md">
                          <img
                            src={company.logoImage || '/logos/logo new.webp'}
                            alt={`${company.name} logo`}
                            className="max-h-full max-w-full object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* Clean Company Name */}
                        <div className="mt-4 w-full text-center">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#A8863D] transition-colors font-['Cinzel','Raleway',serif]">
                            {company.name}
                          </h3>
                        </div>

                        {/* Bottom Golden Accent Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Company Sections */}
            {companies.map((company, index) => {
              return (
                <section
                  key={company.id}
                  id={company.id}
                  data-animate-card
                  data-card-id={company.id}
                  className="scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-36 min-h-auto w-full flex items-center justify-center pointer-events-none px-3 py-3 sm:px-6 sm:py-5 md:px-4 md:py-3 lg:px-4 lg:py-4 opacity-100 translate-y-0"
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
                        <h2 className="text-2xl sm:text-3xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">{company.name}</h2>
                        <p className="text-sm text-[#A8863D] font-semibold font-['Manrope'] mt-0.5">
                          {company.fullName}
                        </p>
                        {company.stock && (
                          <p className="text-xs text-slate-500 font-['Manrope'] mt-1">{company.stock}</p>
                        )}
                        <div className="mt-2 flex gap-3">
                          {company.id === 'bn-agrochem' && (
                            <button
                              onClick={(e) => navigateTo('bn-agrochem', e)}
                              className="text-xs text-[#A8863D] hover:text-[#78591f] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              Explore Full BN Agrochem Page <i className="fas fa-arrow-right text-[10px]"></i>
                            </button>
                          )}
                          {company.id === 'agastya' && (
                            <button
                              onClick={(e) => navigateTo('agastya', e)}
                              className="text-xs text-[#A8863D] hover:text-[#78591f] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              Explore Full Agastya Energy Page <i className="fas fa-arrow-right text-[10px]"></i>
                            </button>
                          )}
                        </div>
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

            {/* Media Section */}
            <MediaSection />
          </>
        )}

        {/* Footer / Enterprise Section */}
        <footer className="w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white border-t-2 border-[#D6B46A]/40 shadow-2xl mt-6 sm:mt-8">
          <div className="pointer-events-auto max-w-7xl mx-auto px-4 py-8 sm:px-8 md:px-12 md:py-16">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[2fr_1fr]">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/logos/logo new.webp"
                      alt="AAG logo"
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(214,180,106,0.35)] hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Cinzel','Georgia',serif]">Anubhav Agarwal Group</h3>
                    <p className="text-xs text-[#CFB377] font-['Manrope']">Building India's Industrial Future</p>
                  </div>
                </div>
                <p className="max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-stone-300 font-['Manrope']">
                  Anubhav Agarwal Group is an enterprise platform uniting high-growth businesses across agrochemicals, renewable energy, bio-chemicals, and semiconductor manufacturing. We combine strategic partnerships, innovation, and a Make-in-India growth agenda to create sustainable value.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 px-3 py-1.5 text-[10px] sm:text-xs text-[#CFB377] font-medium">Enterprise Strategy</span>
                  <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 px-3 py-1.5 text-[10px] sm:text-xs text-[#CFB377] font-medium">Make in India</span>
                  <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 px-3 py-1.5 text-[10px] sm:text-xs text-[#CFB377] font-medium">Sustainable Growth</span>
                </div>
              </div>

              <div className="grid gap-3 text-left sm:gap-3.5 md:ml-6">
                <p className="text-xs font-bold text-[#D6B46A] uppercase tracking-[0.24em] font-['Manrope']">Site Navigation</p>
                <a href="/" onClick={(e) => navigateTo('home', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Home</a>
                <a href="/bn-agrochem" onClick={(e) => navigateTo('bn-agrochem', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">BN Agrochem Limited</a>
                <a href="/agastya" onClick={(e) => navigateTo('agastya', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Agastya Energy Group</a>
                <a href="/about" onClick={(e) => navigateTo('about', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Leadership & Structure</a>
                <a href="/investors" onClick={(e) => navigateTo('investors', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Investors & Banking</a>
                <a href="/media" onClick={(e) => navigateTo('media', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Media & Press</a>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-700/60 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-stone-400 font-['Manrope']">
              <p>© 2026 Anubhav Agarwal Group. All Rights Reserved.</p>
              <div className="flex items-center gap-2 text-stone-400">
                <span className="uppercase tracking-widest text-[10px]">Innovation</span>
                <span className="text-[#D6B46A]">|</span>
                <span className="uppercase tracking-widest text-[10px]">Sustainability</span>
                <span className="text-[#D6B46A]">|</span>
                <span className="uppercase tracking-widest text-[10px]">Growth</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default App;