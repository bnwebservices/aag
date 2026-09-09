import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AboutPage() {
  const wavePathRef = useRef(null);
  const glowPathRef = useRef(null);

  useEffect(() => {
    const waveEls = [wavePathRef.current, glowPathRef.current].filter(Boolean);
    if (!waveEls.length) return;

    waveEls.forEach((el, idx) => {
      gsap.to(el, {
        strokeDashoffset: idx === 0 ? -120 : -80,
        duration: 5 + idx * 0.6,
        repeat: -1,
        ease: 'none',
      });
    });

    return () => {
      gsap.killTweensOf(waveEls);
    };
  }, []);

  const leadershipTeam = [
    {
      name: 'Mr. Piyush Bichhoriya',
      role: 'Director',
      image: '/Stake Holder/Piyush Bichhoria.png',
      desc: 'Seasoned technology leader with over 20 years of experience in system optimization and strategic business management. Ex-Adani & Fortune 500 alumnus.'
    },
    {
      name: 'Mr. Chintan Shah',
      role: 'Director',
      image: '/Stake Holder/Chitan Sir3.png',
      desc: 'Deep expertise in strategic planning, corporate affairs, fund management, project execution, and regulatory compliance.'
    },
    {
      name: 'Mr. Sparsh Sachar',
      role: 'Director',
      image: '/Stake Holder/Sparsh Sachar.png',
      desc: 'Accomplished entrepreneur in the Agro Commodity sector with strong business acumen and focus on sustainable growth.'
    },
    {
      name: 'Mr. Bernhard Rack',
      role: 'Chief Executive Officer',
      image: '/Stake Holder/Bernhard Rack.png',
      desc: 'Physics graduate & global veteran in semiconductor and solar industries (30+ years experience, Ex-Siemens, Ex-Infineon).'
    },
    {
      name: 'Mr. Amit Kalra',
      role: 'Chief Financial Officer',
      image: '/Stake Holder/Amit Kalra.png',
      desc: 'Chartered Accountant with 20+ years of experience in energy and infrastructure, with a decade of project financing expertise.'
    },
    {
      name: 'Mr. Gaurav Tripathi',
      role: 'Director',
      image: '/Stake Holder/Gaurav-Tripathi.png',
      desc: 'ISB Hyderabad alumnus with over 15 years of experience scaling businesses across retail, FMCG, and technology.'
    },
    {
      name: 'Mr. Nikhilesh Kumar Gangele',
      role: 'Director',
      image: '/Stake Holder/Nikhlesh Gangley.png',
      desc: 'Extensive 39 years experience in oleochemicals, fatty acids, soaps, edible oil refineries, and glycerin production.'
    },
    {
      name: 'Mr. Charan Rajpoot',
      role: 'President - Sales',
      image: '/Stake Holder/Charan-rajpoot.png',
      desc: 'Over 20 years experience in sales and distribution across Cadbury, ConAgra, Cargill, and Bata India.'
    },
    {
      name: 'Mr. Anurag Bansal',
      role: 'Chief Financial Officer',
      image: '/Stake Holder/Anurag Bansal.png',
      desc: 'Chartered Accountant with 20+ years of comprehensive financial leadership.'
    },
    {
      name: 'Mr. Nand Kishore Verma',
      role: 'Director',
      image: '/Stake Holder/Nand-kishor-verma.png',
      desc: '35 years of expertise in procurement, sales, and operations management across edible oil and agribusiness sectors.'
    },
    {
      name: 'Mr. Rajiv Ranjan',
      role: 'Chief Operating Officer',
      image: '/Stake Holder/Rajiv Ranjan.png',
      desc: '23+ years of experience in plant operations, supply chain management, and manufacturing.'
    },
    {
      name: 'Dr. S. Vinodh',
      role: 'VP - Technology',
      image: '/Stake Holder/Dr. S. Vinodh.png',
      desc: '18+ years of expertise in photovoltaics, semiconductor manufacturing, and advanced solar cell technologies.'
    },
  ];

  const milestones = [
    { year: '2011', title: 'Founding Milestone', desc: 'Incorporation of B.N. Agritech Limited marking entry into edible oil manufacturing.' },
    { year: '2013', title: 'Brand Launch', desc: 'Launched flagship consumer brands Simply Fresh and Healthy Value.' },
    { year: '2015', title: 'Packaging Expansion', desc: 'Set up automated Mathura Packaging Unit for mustard oil.' },
    { year: '2018', title: 'Refinery Setup', desc: 'Established Kandla & Gandhidham Refinery with high-capacity processing.' },
    { year: '2022', title: 'Public Acquisition', desc: 'Acquisition of BSE-listed Arihant Tournesol Limited (now BN Agrochem Limited).' },
    { year: '2024', title: 'Specialty Chemicals & Nutrica', desc: 'Incorporated Epitome Industries India Limited and launched premium lifestyle brand Nutrica.' },
    { year: '2024', title: 'Global Footprint & Agastya', desc: 'Established offices in London and Dubai, and launched Agastya for renewable energy.' },
    { year: '2025', title: 'Giga Manufacturing', desc: 'Set up of 2 GW Integrated Solar Module & Cell plant at Kurnool AP, and entered IPP projects.' },
    { year: '2026', title: 'NSE Listed Acquisition', desc: 'Acquisition of NSE-listed Sanginita Chemicals Limited (now Agastya Energy & Infrastructure Limited).' },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-['Noto_Sans','Krub',sans-serif] pb-0">

      {/* Hero Header Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 border-b-2 border-[#D6B46A]/40 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
            Leadership & Corporate Structure
          </h1>
          <p className="text-stone-300 text-sm sm:text-base md:text-lg mt-4 max-w-3xl mx-auto leading-relaxed font-['Noto_Sans','Krub',sans-serif]">
            Driven by entrepreneurial conviction, visionary leadership, and a commitment to building India’s self-reliant industrial and renewable energy platforms.
          </p>
        </div>
      </section>

      {/* Founder & MD Profile - EDGE TO EDGE FULL WINDOW WIDTH */}
      <section className="w-full bg-white border-y-2 border-[#D6B46A]/40 py-12 sm:py-16 shadow-xl my-12">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center">
            {/* Image */}
            <div className="w-full h-full max-h-[420px] rounded-3xl overflow-hidden border-2 border-[#D6B46A]/40 shadow-lg bg-white p-2 flex items-center justify-center">
              <img
                src={encodeURI("/Anubhav sir personal info/Anubhav sir.png")}
                alt="Shri Anubhav Agarwal - Founder & MD"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>

            {/* Profile Bio */}
            <div className="relative">
              <a
                href="https://www.linkedin.com/in/anubhav-agarwal-15ab82121/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 right-0 w-10 h-10 rounded-full bg-[#0077b5] hover:bg-[#005582] text-white flex items-center justify-center shadow-md hover:scale-110 transition-all cursor-pointer z-10"
                title="Shri Anubhav Agarwal LinkedIn"
                aria-label="Shri Anubhav Agarwal LinkedIn"
              >
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <div className="inline-block px-3 py-1 rounded-full bg-[#D6B46A]/15 border border-[#D6B46A]/30 text-[#7a5b1e] text-xs font-bold uppercase tracking-wider mb-2 pr-12">
                Global Indian of the Year 2023 Awardee
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] text-slate-900 pr-12">
                Shri. Anubhav Agarwal
              </h2>
              <p className="text-sm font-bold text-[#A8863D] mt-1 font-['Noto_Sans','Krub',sans-serif]">Founder & Managing Director, Anubhav Agarwal Group</p>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Shri Anubhav Agarwal is a dynamic entrepreneur and visionary leader driven by a strong purpose to create meaningful industrial impact and positively influence millions of lives.
                </p>
                <p>
                  With deep expertise in technology and finance, combined with strategic foresight, he is spearheading the group's rapid expansion across high-growth sectors including edible oils, specialty chemicals, solar manufacturing, and semiconductors.
                </p>
                <p>
                  As promoter of BN Agrochem and Agastya Energy, Shri Agarwal sets the strategic direction of the organization, driving key policy decisions, capital allocation, and international corporate partnerships.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-2xl bg-stone-50 border border-[#D6B46A]/30 text-xs font-semibold text-[#7a5b1e]">
                  🏆 Global Indian of the Year 2023
                </div>
                <div className="px-4 py-2 rounded-2xl bg-stone-50 border border-[#D6B46A]/30 text-xs font-semibold text-[#7a5b1e]">
                  🇮🇳 Make-in-India Enterprise Builder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 mt-12 space-y-16">
        {/* Executive Leadership Team Grid */}
        <section className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
              Executive Leadership Team
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Distinguished industry leaders and technical veterans driving operational excellence.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-[#D6B46A]/25 shadow-md flex flex-col justify-between hover:shadow-2xl hover:border-[#D6B46A] transition-all group">
                <div>
                  {leader.image && (
                    <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-4 border border-[#D6B46A]/20 bg-stone-50 flex items-center justify-center p-1 group-hover:border-[#D6B46A]/40 transition-colors">
                      <img
                        src={encodeURI(leader.image)}
                        alt={`${leader.name} - ${leader.role}`}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8863D]">{leader.role}</span>
                  <h3 className="text-lg font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] mt-1 group-hover:text-[#7a5b1e] transition-colors">{leader.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{leader.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-semibold text-[#7a5b1e] flex items-center justify-between">
                  <span>AAG Executive Leadership</span>
                  <i className="fas fa-user-tie text-[#D6B46A]"></i>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Corporate Hierarchy Structure - EDGE TO EDGE FULL WINDOW WIDTH */}
      <section className="w-full bg-white border-y-2 border-[#D6B46A]/40 py-12 sm:py-16 shadow-xl my-12">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Corporate Governance & Hierarchy</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Google_Sans','Montserrat',sans-serif] text-slate-900 mt-1">
              Group Corporate Structure
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
              Strategic enterprise organization separating core FMCG/Specialty Chemicals from Giga-Scale Renewable Energy & Semiconductor platforms.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Structural Summary & Key Points */}
            <div className="space-y-3.5">
              <div className="p-4.5 rounded-2xl bg-stone-50 border border-[#D6B46A]/25 border-l-4 border-l-[#D6B46A] shadow-xs hover:bg-white transition-colors">
                <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider">Edible Oils & FMCG Division</span>
                <h4 className="text-base font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] mt-0.5">BN Agrochem Limited</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Anchor consumer goods arm managing high-capacity edible oil refineries at Gandhidham & Mathura, producing trusted nationwide brands Simply Fresh & Healthy Value.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-stone-50 border border-[#D6B46A]/25 border-l-4 border-l-[#CFB377] shadow-xs hover:bg-white transition-colors">
                <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider">Specialty & Oleo-Chemicals Division</span>
                <h4 className="text-base font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] mt-0.5">Epitome Industries India Limited</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Integrated oleo-chemical complex manufacturing high-grade distilled fatty acids, refined glycerin, and sustainable bio-chemical solutions for industrial applications.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-stone-50 border border-[#D6B46A]/25 border-l-4 border-l-[#A8863D] shadow-xs hover:bg-white transition-colors">
                <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider">Renewable Energy Infrastructure</span>
                <h4 className="text-base font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] mt-0.5">Agastya Energy Platform</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Giga-scale green energy division executing 12 GW Ingot & Wafer manufacturing, 5 GW Solar Cell & Module plants, BESS storage, and ~194 MW PM-KUSUM solar IPP projects.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-stone-50 border border-[#D6B46A]/25 border-l-4 border-l-[#7a5b1e] shadow-xs hover:bg-white transition-colors">
                <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider">Advanced Technology & Semiconductors</span>
                <h4 className="text-base font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] mt-0.5">Indichip Semiconductors</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Pioneering domestic Silicon Carbide (SiC) semiconductor device manufacturing in strategic tech-transfer partnership with Yitoa Micro Technology Corporation.
                </p>
              </div>
            </div>

            {/* Corporate Structure Infographic - Fit Card Container */}
            <div className="w-full h-[400px] sm:h-[440px] rounded-3xl overflow-hidden border border-[#D6B46A]/30 shadow-md bg-white p-2 flex items-center justify-center">
              <img
                src="/our structure/jq2torzwybwwrrquethq.webp"
                alt="Anubhav Agarwal Group Hierarchy Structure Chart"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Milestone Journey - HORIZONTAL WAVE TIMELINE */}
      <section className="w-full bg-gradient-to-b from-white via-stone-50/30 to-white border-t-2 border-[#D6B46A]/40 py-12 sm:py-16 shadow-xl mt-12 mb-0">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Fifteen Years of Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text mt-1">
              Milestone Journey (2011 – 2026)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              A decade and a half of relentless growth — from edible oil manufacturing to giga-scale solar and semiconductor platforms.
            </p>
            <div className="mt-4 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          {/* Desktop / Tablet: Horizontal Wave - Fits Window */}
          <div className="hidden md:block relative w-full" style={{ height: '360px' }}>
            {/* SVG Wave Curve - percentage based via viewBox */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 360"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Soft glow behind curve */}
              <path
                ref={glowPathRef}
                className="wave-timeline-path"
                d={(() => {
                  const count = milestones.length;
                  const spacing = 900 / (count - 1);
                  return milestones.map((_, i) => {
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
              {/* Main wave curve */}
              <path
                ref={wavePathRef}
                className="wave-timeline-path"
                d={(() => {
                  const count = milestones.length;
                  const spacing = 900 / (count - 1);
                  return milestones.map((_, i) => {
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

            {/* Milestone Dots & Labels - percentage positioned */}
            {milestones.map((ms, idx) => {
              const count = milestones.length;
              const pct = (50 + idx * (900 / (count - 1))) / 10; // percentage of viewBox mapped to %
              const isUp = idx % 2 === 0;
              const dotTopPct = isUp ? '35.5%' : '57%';
              return (
                <div
                  key={idx}
                  className="absolute group"
                  style={{ left: `${pct}%`, top: dotTopPct, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Dot */}
                  <div
                    className="wave-timeline-dot w-7 h-7 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#A8863D] border-[3px] border-white shadow-lg group-hover:scale-125 transition-transform cursor-default z-10 relative"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Connector tick */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-[1.5px] bg-[#D6B46A]/40"
                    style={{ height: '16px', top: isUp ? '-16px' : '28px' }}
                  />
                  {/* Label */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 text-center"
                    style={{
                      width: 'max(110px, 10vw)',
                      top: isUp ? 'auto' : '48px',
                      bottom: isUp ? '48px' : 'auto',
                    }}
                  >
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#D6B46A]/15 border border-[#D6B46A]/30 text-[#7a5b1e] text-[10px] font-bold mb-1">
                      {ms.year}
                    </span>
                    <h4 className="text-[11px] font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight group-hover:text-[#7a5b1e] transition-colors">
                      {ms.title}
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5 leading-snug hidden lg:block">{ms.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Compact Zigzag */}
          <div className="md:hidden space-y-6">
            {milestones.map((ms, idx) => {
              const isRight = idx % 2 !== 0;
              return (
                <div key={idx} className={`flex items-start gap-3 ${isRight ? 'flex-row-reverse text-right' : ''}`}>
                  {/* Dot */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#7a5b1e] to-[#D6B46A] border-[3px] border-white shadow-md flex items-center justify-center mt-1">
                    <span className="text-white text-[9px] font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#D6B46A]/15 border border-[#D6B46A]/30 text-[#7a5b1e] text-[10px] font-bold mb-1">
                      {ms.year}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight">{ms.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{ms.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
