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
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [logoStart, setLogoStart] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('aag-theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('aag-theme', theme);
  }, [theme]);

  useEffect(() => {
    const body = document.body;
    if (loading) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    return () => {
      body.style.overflow = '';
    };
  }, [loading]);

  useEffect(() => {
    const startTimeout = setTimeout(() => setLogoStart(true), 0);
    const completeTimeout = setTimeout(() => setLoading(false), 1000);
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(completeTimeout);
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      const bgColor = theme === 'dark' ? 0x0b1320 : 0xf0f5fa;
      sceneRef.current.background = new THREE.Color(bgColor);
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme === 'dark' ? 0x0b1320 : 0xf0f5fa);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(6, 4, 14);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.85);
    mainLight.position.set(4, 8, 5);
    mainLight.castShadow = false;
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0x4488ff, 0.18);
    backLight.position.set(-4, 1, -6);
    scene.add(backLight);

    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.2);
    fillLight.position.set(0, 2, 4);
    scene.add(fillLight);

    // Professional 3D elements
    const ringGeo = new THREE.TorusGeometry(2.0, 0.03, 32, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x2c5f8a,
      emissive: 0x1a3a5a,
      emissiveIntensity: 0.05,
      transparent: true,
      opacity: 0.2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(0, 0.5, 0);
    ring.rotation.x = Math.PI / 3;
    ring.rotation.z = Math.PI / 6;
    scene.add(ring);
    ringRef.current = ring;

    const innerRingGeo = new THREE.TorusGeometry(1.4, 0.02, 32, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x4a7fb5,
      transparent: true,
      opacity: 0.15,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.set(0, 0.5, 0);
    innerRing.rotation.x = -Math.PI / 4;
    innerRing.rotation.y = Math.PI / 4;
    scene.add(innerRing);

    const particleGroup = new THREE.Group();
    const colors = [0x2c5f8a, 0x4a7fb5, 0x6a9fc5, 0x1a3a5a];
    for (let i = 0; i < 35; i++) {
      const geom = new THREE.SphereGeometry(0.035, 6);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.1 + Math.random() * 0.15,
      });
      const mesh = new THREE.Mesh(geom, mat);
      const radius = 3 + Math.random() * 2.5;
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

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    renderer.render(scene, camera);

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
      stock: 'Power | Energy | Renewables',
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

      {loading && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <div className={`logo-loader rounded-[2rem] w-56 h-56 md:w-72 md:h-72 bg-white border border-card shadow-2xl flex items-center justify-center ${logoStart ? 'animate-logo-to-navbar' : ''}`}>
            <img src="/logos/AAG.png" alt="AAG logo" className="w-3/4 h-3/4 object-contain" />
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 bg-surface backdrop-blur-md border-b border-theme px-6 md:px-12 py-3 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shadow-md overflow-hidden border border-card">
              <img src="/logos/AAG.png" alt="AAG logo" className="w-full h-full object-contain p-1" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {companies.map((company) => (
              <a 
                key={company.id}
                href={`#${company.id}`} 
                className="nav-link-hover text-theme font-medium font-['Manrope'] text-xs uppercase tracking-wider"
              >
                {company.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-theme bg-panel px-3 py-2 text-sm font-medium text-theme transition hover:bg-panel-soft"
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              aria-label="Toggle theme"
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-[var(--accent)]`}></i>
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button
              className="md:hidden text-theme"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-3 rounded-3xl bg-surface border border-card shadow-lg backdrop-blur-md p-4 transition-colors duration-500">
            <div className="flex flex-col gap-3">
              {companies.map((company) => (
                <a
                  key={`mobile-${company.id}`}
                  href={`#${company.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block nav-link-hover text-sm text-theme font-medium uppercase tracking-[0.18em]"
                >
                  {company.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Scrollable content */}
      <div ref={contentRef} className="relative z-10 min-h-screen overflow-y-auto pointer-events-auto pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-5rem)] md:min-h-screen w-full flex items-center justify-center pointer-events-none p-6 mt-0">
          <div className="pointer-events-auto bg-surface backdrop-blur-lg rounded-3xl p-8 md:p-16 max-w-full md:max-w-6xl w-full sm:w-[95%] border border-card shadow-2xl transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.01] transition-colors duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
              <div className="w-28 h-28 rounded-2xl bg-surface flex items-center justify-center shadow-xl flex-shrink-0 transform transition-transform duration-300 hover:scale-110 overflow-hidden border border-card">
                <img src="/logos/AAG.png" alt="AAG logo" className="w-full h-full object-contain p-4" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-theme tracking-tight font-['Georgia','Times New Roman',serif]">
                  Anubhav Agrawal Group
                </h1>
                <p className="text-muted-strong font-medium text-sm tracking-[0.2em] uppercase mt-2 font-['Manrope']">
                  Building India's Industrial Future Through Innovation
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="rounded-3xl bg-panel border border-card p-8 shadow-lg transition-colors duration-500">
                <h3 className="text-xl font-semibold text-theme mb-4 font-['Raleway']">About Anubhav Agrawal Group</h3>
                <p className="text-sm text-muted leading-8 font-['Manrope']">
                  <strong>Anubhav Agarwal Group </strong> is a diversified Indian business conglomerate committed to driving innovation, industrial excellence, and sustainable growth. With a strong presence across specialty chemicals, agrochemicals, renewable energy, advanced manufacturing, and semiconductor technology, AAG is building future-ready businesses that contribute to India's industrial progress and global competitiveness. Guided by a vision of innovation, integrity, and long-term value creation, the Group continues to empower industries, strengthen infrastructure, and deliver solutions that create a lasting impact.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Company logos preview */}
        <section ref={logoPreviewRef} className={`w-full flex items-center justify-center py-12 pointer-events-none p-6 transition-all duration-700 ${logosActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="pointer-events-auto max-w-6xl w-full">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-theme">AAG Group Companies</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {companies.map((company, index) => (
                <a
                  key={`logo-preview-${company.id}`}
                  href={company.website || `#${company.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-3xl bg-surface border border-card p-6 flex items-center justify-center shadow-lg ${logosActive ? (index % 2 === 0 ? 'logo-enter-lr animate-vibrate-lr animate-float' : 'logo-enter-rl animate-vibrate-rl animate-float') : 'opacity-0'} transition-colors duration-500 hover:ring-1 hover:ring-[var(--accent)]`}
                >
                  <img src={company.logoImage || '/logos/AAG.png'} alt={`${company.name} logo`} className="h-20 md:h-24 object-contain" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Company Sections */}
        {companies.map((company, index) => (
          <section key={company.id} id={company.id} className="min-h-[calc(100vh-5rem)] md:min-h-screen w-full flex items-center justify-center pointer-events-none p-6 scroll-fade">
            <div className="pointer-events-auto bg-surface backdrop-blur-lg rounded-3xl p-8 md:p-14 max-w-full md:max-w-5xl w-full sm:w-[95%] border border-card shadow-2xl transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] hover:border-theme">
              <div className="flex items-center gap-6 mb-8 border-b border-theme/20 pb-6">
                <div className="w-24 h-24 rounded-full p-1 shadow-2xl transform transition-all duration-300 hover:scale-110" style={{ background: `linear-gradient(135deg, ${company.logoColors.join(', ')})` }}>
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
                  <h2 className="text-3xl font-bold text-theme font-['Raleway']">{company.name}</h2>
                  <p className="text-sm text-muted-strong font-medium font-['Manrope']">
                    {company.fullName}
                  </p>
                  {company.stock && (
                    <p className="text-xs text-muted font-['Manrope'] mt-1">{company.stock}</p>
                  )}
                  {company.website && (
                    <p className="text-xs mt-2">
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-[var(--accent)] font-semibold hover:underline">
                        Visit {company.name} website
                      </a>
                    </p>
                  )}
                </div>
              </div>
              
              <div className="relative bg-panel-soft rounded-xl p-6 mb-8 border-l border-theme transition-all duration-300 hover:shadow-inner">
                <p className="text-theme leading-relaxed text-sm font-['Manrope']">
                  {company.description}
                </p>
              </div>

              {/* Industry tags */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {company.tags.map((tag, idx) => (
                  <div key={idx} className="p-3 rounded-3xl bg-gradient-to-br from-[rgba(255,255,255,0.85)] via-[rgba(243,249,255,0.65)] to-[rgba(223,238,255,0.55)] text-center shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <p className="text-xs font-semibold text-[var(--accent)] font-['Manrope']">{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Footer / Enterprise Section */}
        <footer className="w-full p-8 bg-panel-soft transition-colors duration-500">
          <div className="pointer-events-auto w-full max-w-full bg-surface text-theme rounded-[42px] border border-card shadow-theme px-6 py-10 md:px-16 md:py-16 transition-colors duration-500">
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-panel p-3 shadow-sm flex items-center justify-center border border-card">
                    <img src="/logos/AAG.png" alt="AAG logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-theme">Anubhav Agrawal Group</h3>
                  </div>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-muted">Anubhav Agrawal Group is an enterprise platform uniting high-growth businesses across agrochemicals, renewable energy, bio-chemicals, and semiconductor manufacturing. We combine strategic partnerships, innovation, and a Make-in-India growth agenda to create sustainable value and world-class industrial capabilities.</p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-card bg-panel-soft px-4 py-2 text-xs text-muted">Enterprise Strategy</span>
                  <span className="rounded-full border border-card bg-panel-soft px-4 py-2 text-xs text-muted">Make in India</span>
                  <span className="rounded-full border border-card bg-panel-soft px-4 py-2 text-xs text-muted">Sustainable Growth</span>
                </div>
              </div>

              <div className="grid gap-4 justify-self-start text-left md:ml-6 lg:ml-10">
                <p className="text-sm font-semibold text-muted-strong uppercase tracking-[0.24em]">Quick Links</p>
                <a href="#bn-agrochem" className="text-sm text-theme hover:text-[var(--accent)]">BN Agrochem</a>
                <a href="#agastya" className="text-sm text-theme hover:text-[var(--accent)]">Agastya</a>
                <a href="#epitome" className="text-sm text-theme hover:text-[var(--accent)]">Epitome</a>
                <a href="#indichip" className="text-sm text-theme hover:text-[var(--accent)]">Indichip</a>
              </div>
            </div>

            <div className="mt-10 border-t border-card pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted">
              <p>© 2026 Anubhav Agrawal Group. All Rights Reserved.</p>
              <div className="flex flex-wrap items-center gap-3 text-muted">
                <span className="uppercase tracking-[0.3em]">Innovation</span>
                <span className="text-muted-strong">|</span>
                <span className="uppercase tracking-[0.3em]">Sustainability</span>
                <span className="text-muted-strong">|</span>
                <span className="uppercase tracking-[0.3em]">Growth</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default App;