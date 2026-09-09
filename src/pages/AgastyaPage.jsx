import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const kurnoolStats = [
  { label: 'Industrial Land', value: 465, suffix: '+ Acres' },
  { label: 'Solar Manufacturing', value: 12, suffix: ' GW' },
  { label: 'Cell & Module Capacity', value: 5, suffix: ' GW' },
  { label: 'IPP / Storage Target', value: 250, suffix: ' MWh' },
];

export default function AgastyaPage() {
  const wavePathRef = useRef(null);
  const glowPathRef = useRef(null);
  const [revealed, setRevealed] = useState({ ecosystem: false, hub: false, roadmap: false });
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const ecosystemRef = useRef(null);
  const hubRef = useRef(null);
  const roadmapRef = useRef(null);

  useEffect(() => {
    const scrollParent = ecosystemRef.current?.closest('.tablet-tight-content');
    const handleScroll = () => {
      const refs = [
        { key: 'ecosystem', ref: ecosystemRef },
        { key: 'hub', ref: hubRef },
        { key: 'roadmap', ref: roadmapRef },
      ];

      refs.forEach(({ key, ref }) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewportTop = scrollParent?.getBoundingClientRect().top ?? 0;
        const viewportHeight = scrollParent?.clientHeight ?? window.innerHeight;
        if (rect.top < viewportTop + viewportHeight * 0.82) {
          setRevealed((prev) => ({ ...prev, [key]: true }));
        }
      });
    };

    handleScroll();
    scrollParent?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      scrollParent?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const waveEls = [wavePathRef.current, glowPathRef.current].filter(Boolean);
    if (!waveEls.length) return;

    waveEls.forEach((el, idx) => {
      gsap.to(el, {
        strokeDashoffset: idx === 0 ? -110 : -90,
        duration: 4.7 + idx * 0.8,
        repeat: -1,
        ease: 'none',
      });
    });

    return () => {
      gsap.killTweensOf(waveEls);
    };
  }, []);

  useEffect(() => {
    if (!revealed.hub) return;

    let rafId;
    const duration = 1800;
    const start = performance.now();
    const targets = kurnoolStats.map((stat) => stat.value);

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats(
        targets.map((target, index) => {
          const rawValue = target * eased;
          if (index === 0) return Math.round(rawValue);
          return Number((rawValue).toFixed(1));
        })
      );

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [revealed.hub]);

  const financialProjections = [
    { year: 'FY 27-28^', revenue: '2,899.27', profit: '348.24' },
    { year: 'FY 28-29^', revenue: '3,782.85', profit: '853.00' },
    { year: 'FY 29-30^', revenue: '6,660.65', profit: '1,916.35' },
    { year: 'FY 30-31^', revenue: '8,369.97', profit: '2,504.04' },
  ];

  const projectDetails = [
    {
      type: 'Solar Manufacturing',
      title: '12 GW Silicon Ingot & Wafer Plant',
      location: 'Kurnool - Andhra Pradesh',
      cost: '₹7,800 Crore',
      debt: '₹5,850 Crore',
      cod: 'January 2029',
      land: '~157 Acres',
      badge: 'Giga Manufacturing',
    },
    {
      type: 'Solar Manufacturing',
      title: '5 GW Solar Module & Cell Plant',
      location: 'Kurnool - Andhra Pradesh',
      cost: '₹1,499 Crore (Phase-1)',
      debt: '₹1,049 Crore (Phase-1)',
      cod: 'April 2027',
      land: '~111 Acres',
      badge: 'Cell & Module',
    },
    {
      type: 'IPP - Solar',
      title: '57.5 MW / 71.88 MWp PM-Kusum Solar IPP',
      location: '28 Sites in Uttar Pradesh',
      cost: '₹315 Crore',
      debt: '₹228 Crore',
      cod: 'November 2026',
      land: 'Lease Basis',
      badge: 'Kusum IPP',
    },
    {
      type: 'IPP - Solar',
      title: '47.8 MW / 57.36 MWp PM-Kusum Solar IPP',
      location: '15 Sites in Uttar Pradesh',
      cost: '₹238 Crore',
      debt: '₹160 Crore',
      cod: 'March 2027',
      land: 'Lease Basis',
      badge: 'Kusum IPP',
    },
    {
      type: 'IPP - BESS',
      title: '62.5 MW / 250 MWh BESS Capacity',
      location: 'Uttar Pradesh',
      cost: '₹533 Crore',
      debt: '₹399 Crore',
      cod: 'January 2028',
      land: 'Lease Basis',
      badge: 'Battery Storage',
    },
  ];

  const roadmapSteps = [
    { year: '2026 - 2027', title: 'Phase 1 Initiation', desc: '12 GW Ingot & Wafer production initiation, 100 MW plant operational, and 5 GW BESS initiation.' },
    { year: '2027 - 2028', title: 'Phase 2 Commissioning', desc: '2 GW Module & Cell commissioning, 5 GW BESS commissioning, and 62.5 MW / 250 MWh IPP BESS commissioning.' },
    { year: '2028 - 2029', title: 'Giga Expansion', desc: '12 GW Ingot & Wafer commissioning, 2 GW IPP with >5 GW BESS commissioning, and 3 GW Module/Cell expansion.' },
    { year: '2029 - 2030', title: 'Top 5 Leadership', desc: 'Aiming to be among India\'s Top 5 integrated solar manufacturing and IPP enterprise platforms.' },
  ];

  const ecosystemPillars = [
    { title: 'Ingot & Wafer Manufacturing', desc: 'High-purity silicon ingots and wafers forming the foundation of the solar manufacturing value chain.', icon: 'fa-sun' },
    { title: 'Cell Manufacturing', desc: 'Advanced high-efficiency solar cell production powered by next-generation technologies.', icon: 'fa-microchip' },
    { title: 'Solar Module Manufacturing', desc: 'Reliable and high-performance solar modules designed for utility-scale and commercial applications.', icon: 'fa-[#D6B46A] fa-solar-panel' },
    { title: 'Independent Power Producer (IPP)', desc: 'Independent power generation focused on delivering sustainable long-term renewable energy solutions at scale.', icon: 'fa-[#D6B46A] fa-bolt' },
    { title: 'EPC Execution', desc: 'End-to-end engineering, procurement, and construction executing ~194 MW of PM-KUSUM solar EPC projects in UP.', icon: 'fa-tools' },
    { title: 'BESS Battery Storage', desc: 'Intelligent battery energy storage solutions enabling grid stability, energy optimization, and reliable power management.', icon: 'fa-battery-full' },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-['Noto_Sans','Krub',sans-serif] pb-0">

      {/* Hero Header Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white pt-12 sm:pt-16 md:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 border-b-2 border-[#D6B46A]/40 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text leading-tight">
              Agastya Energy Industries and infrastructure
            </h1>
            <p className="text-stone-300 text-sm sm:text-base md:text-lg mt-4 leading-relaxed font-['Noto_Sans','Krub',sans-serif]">
              Building a fully integrated renewable energy platform spanning the complete solar value chain—from silicon ingots & wafers to solar cells, modules, IPP generation, and battery energy storage.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="https://agastyaenergy.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#b89345] to-[#D6B46A] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <i className="fas fa-globe"></i>
                <span>Visit Official Website</span>
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                Project Pipeline
              </a>
              <a
                href="#kurnool"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                Kurnool AP Giga Hub
              </a>
            </div>
          </div>

          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-white p-5 shadow-2xl flex items-center justify-center border-2 border-[#D6B46A]/50 flex-shrink-0 my-auto">
            <img src="/logos/Final-AGASTYA-Logo_ctc-1-removebg-preview.png" alt="Agastya Logo" className="w-full h-full object-contain p-2" />
            <a
              href="https://www.linkedin.com/company/agastya-energy-industries/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0077b5] hover:bg-[#005582] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer z-10 border-2 border-white"
              title="Agastya Energy LinkedIn"
              aria-label="Agastya Energy LinkedIn"
            >
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 mt-12 space-y-16">

        {/* Vision & Mission */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-[#D6B46A]/30 shadow-xl border-l-4 border-l-[#D6B46A]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Our Vision</span>
              <h3 className="text-2xl font-bold font-['Google_Sans','Montserrat',sans-serif] text-slate-900 mt-2">
                To Empower India's Journey to Energy Security
              </h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Accelerating the national green energy transformation through gigawatt-scale manufacturing, advanced technological innovation, and self-reliant domestic energy infrastructure.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#D6B46A]/30 shadow-xl border-l-4 border-l-[#7a5b1e]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Our Mission</span>
              <h3 className="text-2xl font-bold font-['Google_Sans','Montserrat',sans-serif] text-slate-900 mt-2">
                Powering India's Sustainable Future
              </h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                To build integrated renewable energy platforms that secure India's present power needs, power its economic growth, and advance long-term national energy independence.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Integrated Renewable Energy Ecosystem - EDGE TO EDGE FULL WINDOW WIDTH */}
      <section ref={ecosystemRef} className={`w-full bg-white border-y-2 border-[#D6B46A]/40 py-12 sm:py-16 shadow-xl my-12 transition-all duration-700 ${revealed.ecosystem ? 'card-reveal is-visible' : 'card-reveal'}`}>
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
              Integrated Renewable Energy Ecosystem
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
              Spanning the full value chain from raw silicon ingot refining to utility-scale solar generation and battery storage.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-stone-50 border border-[#D6B46A]/20 hover:border-[#D6B46A] hover:bg-white transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <i className={`fas ${pillar.icon}`}></i>
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif]">{pillar.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 space-y-16">

        {/* Kurnool AP Giga Hub & Layout Map */}
        <section ref={hubRef} id="kurnool" className={`w-full transition-all duration-700 ${revealed.hub ? 'card-reveal is-visible' : 'card-reveal'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
              Orvakal Industrial Area Kurnool, Andhra Pradesh
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
              Mega integrated solar manufacturing and semiconductor hub spanning over 465+ acres.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {kurnoolStats.map((stat, index) => (
              <div key={stat.label} className="rounded-2xl border border-[#D6B46A]/25 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-xl sm:text-2xl font-black font-['Google_Sans','Montserrat',sans-serif] text-[#7a5b1e]">
                  {index === 0 ? `${animatedStats[index]}${stat.suffix}` : `${animatedStats[index]}${stat.suffix}`}
                </div>
                <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.14em] text-slate-500 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-7 items-stretch">
            {/* Infographic Layout Map */}
            <div className="rounded-3xl overflow-hidden border border-[#D6B46A]/30 shadow-xl bg-white p-3 h-full">
              <img
                src="/Agastya/kg4ica1xnihwamommjvy.webp"
                alt="Orvakal Industrial Area Layout Map Kurnool AP"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>

            {/* Land Allocations & Subsidies */}
            <div className="grid grid-cols-1 gap-4 h-full">
              <div className="group bg-white rounded-3xl p-5 border border-[#D6B46A]/25 shadow-md border-l-4 border-l-[#D6B46A] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-[0.18em]">AGEL Parcel</span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">156.96 Acres</h4>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-[#7a5b1e] text-[10px] font-bold rounded-full whitespace-nowrap">12 GW Ingot & Wafer</span>
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">Dedicated land parcel for high-purity silicon ingot and wafer manufacturing facility.</p>
              </div>

              <div className="group bg-white rounded-3xl p-5 border border-[#D6B46A]/25 shadow-md border-l-4 border-l-[#A8863D] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-[0.18em]">AEIPL Parcel</span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">111.66 Acres</h4>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-[#7a5b1e] text-[10px] font-bold rounded-full whitespace-nowrap">5 GW Solar Cell & Module</span>
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">Allocated under AP Industrial Policy 4.0 2024-29 with capital incentive of 69.41% of FCI including subsidy of ₹2,410.65 Crore.</p>
              </div>

              <div className="group bg-white rounded-3xl p-5 border border-[#D6B46A]/25 shadow-md border-l-4 border-l-[#7a5b1e] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-[0.18em]">Indichip & Grydonn</span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">197.65 Acres Combined</h4>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-[#7a5b1e] text-[10px] font-bold rounded-full whitespace-nowrap">SiC Semiconductor & Solar</span>
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">Indichip (150 Acres for SiC Semiconductor) and Grydonn (47.65 Acres for 3 GW Solar Cell & Module).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Pipeline & Financials Table */}
        <section id="projects" className="w-full bg-white rounded-3xl p-6 sm:p-10 border border-[#D6B46A]/30 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Project Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Google_Sans','Montserrat',sans-serif] text-slate-900 mt-1">
              Manufacturing & IPP Project Pipeline
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#D6B46A]/30 bg-stone-50 text-slate-900 text-xs sm:text-sm font-bold">
                  <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Category</th>
                  <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Project Description</th>
                  <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Location</th>
                  <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Project Cost</th>
                  <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Debt</th>
                  <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">CoD Date</th>
                  <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Land</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {projectDetails.map((proj, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#D6B46A]/15 text-[#A8863D] text-[10px] font-bold">
                        {proj.badge}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{proj.title}</td>
                    <td className="py-3.5 px-4 text-slate-600">{proj.location}</td>
                    <td className="py-3.5 px-4 font-bold text-[#7a5b1e]">{proj.cost}</td>
                    <td className="py-3.5 px-4 text-slate-600">{proj.debt}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{proj.cod}</td>
                    <td className="py-3.5 px-4 text-slate-500">{proj.land}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      {/* Financial Projections Chart Section - EDGE TO EDGE FULL WINDOW WIDTH */}
      <section className="w-full bg-white border-y-2 border-[#D6B46A]/40 py-10 sm:py-14 shadow-xl my-12">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Financial Projections</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Google_Sans','Montserrat',sans-serif] text-slate-900 mt-1">
              Projected Revenue & Operating Profit (FY28 – FY31)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Projections Table */}
            <div className="h-[320px] sm:h-[360px] md:h-[380px] overflow-x-auto bg-stone-50/80 p-6 rounded-3xl border border-[#D6B46A]/25 shadow-sm flex flex-col justify-center">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#D6B46A]/30 bg-stone-100 text-slate-900 text-xs sm:text-sm font-bold">
                    <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Financial Year</th>
                    <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Revenue Projected (₹ in Cr)</th>
                    <th className="py-3.5 px-4 font-['Google_Sans','Montserrat',sans-serif]">Operating Profit (₹ in Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {financialProjections.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{row.year}</td>
                      <td className="py-3.5 px-4 font-bold text-[#7a5b1e]">₹{row.revenue} Cr</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">₹{row.profit} Cr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Infographic Graphic */}
            <div className="h-[320px] sm:h-[360px] md:h-[380px] rounded-3xl overflow-hidden border border-[#D6B46A]/30 shadow-md bg-white p-3 flex items-center justify-center">
              <img
                src="/Agastya/vdsbvhekg6l6p1eu3zhc.webp"
                alt="Agastya Revenue & Operating Profit Projections"
                className="w-full h-full object-contain rounded-2xl filter drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Future Road Map Timeline - full width like leadership milestone section */}
      <section ref={roadmapRef} className={`w-full bg-gradient-to-b from-white via-stone-50/30 to-white border-t-2 border-[#D6B46A]/40 py-12 sm:py-16 shadow-xl mt-12 mb-0 transition-all duration-700 ${revealed.roadmap ? 'card-reveal is-visible' : 'card-reveal'}`}>
        <div className="w-full px-0 sm:px-0 md:px-0 lg:px-0">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A8863D]">Growth Strategy</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text mt-1">
                2026–2030 Growth Roadmap
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
                Strategic execution timeline to becoming a Top 5 integrated solar company in India.
              </p>
              <div className="mt-4 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
            </div>

            {/* Desktop / Tablet: Horizontal Wave Timeline */}
            <div className="hidden md:block relative w-full" style={{ height: '360px' }}>
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 360"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  ref={glowPathRef}
                  className="wave-timeline-path"
                  d={(() => {
                    const count = roadmapSteps.length;
                    const spacing = 900 / (count - 1);
                    return roadmapSteps.map((_, i) => {
                      const x = 50 + i * spacing;
                      const y = i % 2 === 0 ? 140 : 220;
                      if (i === 0) return `M ${x} ${y}`;
                      const prevX = 50 + (i - 1) * spacing;
                      const prevY = (i - 1) % 2 === 0 ? 140 : 220;
                      const cx = (prevX + x) / 2;
                      return `C ${cx} ${prevY} ${cx} ${y} ${x} ${y}`;
                    }).join(' ');
                  })()}
                  stroke="#D6B46A"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.12"
                  strokeDasharray="16 18"
                />
                <path
                  ref={wavePathRef}
                  className="wave-timeline-path"
                  d={(() => {
                    const count = roadmapSteps.length;
                    const spacing = 900 / (count - 1);
                    return roadmapSteps.map((_, i) => {
                      const x = 50 + i * spacing;
                      const y = i % 2 === 0 ? 140 : 220;
                      if (i === 0) return `M ${x} ${y}`;
                      const prevX = 50 + (i - 1) * spacing;
                      const prevY = (i - 1) % 2 === 0 ? 140 : 220;
                      const cx = (prevX + x) / 2;
                      return `C ${cx} ${prevY} ${cx} ${y} ${x} ${y}`;
                    }).join(' ');
                  })()}
                  stroke="url(#waveGold)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="18 20"
                />
                <defs>
                  <linearGradient id="waveGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7a5b1e" />
                    <stop offset="50%" stopColor="#D6B46A" />
                    <stop offset="100%" stopColor="#A8863D" />
                  </linearGradient>
                </defs>
              </svg>

              {roadmapSteps.map((step, idx) => {
                const count = roadmapSteps.length;
                const pct = (50 + idx * (900 / (count - 1))) / 10;
                const isUp = idx % 2 === 0;
                const dotTopPct = isUp ? '35.5%' : '57%';
                return (
                  <div
                    key={idx}
                    className="absolute group"
                    style={{ left: `${pct}%`, top: dotTopPct, transform: 'translate(-50%, -50%)' }}
                  >
                    <div
                      className="wave-timeline-dot w-7 h-7 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#A8863D] border-[3px] border-white shadow-lg group-hover:scale-125 transition-transform cursor-default z-10 relative"
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-[1.5px] bg-[#D6B46A]/40"
                      style={{ height: '16px', top: isUp ? '-16px' : '28px' }}
                    />
                    <div
                      className="absolute left-1/2 -translate-x-1/2 text-center"
                      style={{
                        width: 'max(120px, 10vw)',
                        top: isUp ? 'auto' : '48px',
                        bottom: isUp ? '48px' : 'auto',
                      }}
                    >
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#D6B46A]/15 border border-[#D6B46A]/30 text-[#7a5b1e] text-[10px] font-bold mb-1">
                        {step.year}
                      </span>
                      <h4 className="text-[11px] font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight group-hover:text-[#7a5b1e] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-[9px] text-slate-500 mt-0.5 leading-snug hidden xl:block">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile: Compact Zigzag Timeline */}
            <div className="md:hidden space-y-6">
              {roadmapSteps.map((step, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${idx % 2 !== 0 ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#7a5b1e] to-[#D6B46A] border-[3px] border-white shadow-md flex items-center justify-center mt-1">
                    <span className="text-white text-[9px] font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#D6B46A]/15 border border-[#D6B46A]/30 text-[#7a5b1e] text-[10px] font-bold mb-1">
                      {step.year}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
