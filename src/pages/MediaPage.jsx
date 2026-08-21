import React, { useState, useEffect } from 'react';

// 1. Factual Group Awards & Certificates Data
const groupAwards = [
  {
    id: 'g-award-1',
    title: 'Global Indian of the Year 2023',
    subtitle: 'Conferred on MD Anubhav Agarwal by AsiaOne & URS Media Consulting',
    image: '/Awards Image/Awards1.webp',
    tag: 'AsiaOne Global Honor',
  },
  {
    id: 'g-award-2',
    title: "Asia's Greatest Brands 2023",
    subtitle: 'Pride of Asia & GCC Award for BN Group in Edible Oil Manufacturing',
    image: '/Awards Image/Awards2.webp',
    tag: "Asia's Greatest Brand",
  },
  {
    id: 'g-award-3',
    title: 'MarTech Excellence Award 2024',
    subtitle: 'Best Multi-Channel Marketing Campaign (Food & Beverages) for Nutrica',
    image: '/Awards Image/Awards3.webp',
    tag: 'Quantic Media Honor',
  },
  {
    id: 'g-award-4',
    title: 'ET Edge Iconic Brands of India 2023',
    subtitle: '6th Edition Made in India Felicitation by Times Strategic Solutions',
    image: '/Awards Image/Awards4.webp',
    tag: 'Times Group Award',
  },
  {
    id: 'g-award-5',
    title: 'Top 10 Oil Mills in India 2023',
    subtitle: 'Industry Outlook National Excellence Award for BN Group',
    image: '/Awards Image/Awards5.webp',
    tag: 'Industry Outlook',
  },
  {
    id: 'g-award-6',
    title: 'ET Edge Certificate of Recognition',
    subtitle: 'Official Citation of Iconic Brands of India signed by Times Group CEO',
    image: '/Awards Image/Awards 6.webp',
    tag: 'Times Group Certificate',
  },
  {
    id: 'g-award-7',
    title: "Asia's Greatest Brands Official Certificate",
    subtitle: 'Citation for BN Group FMCG & Edible Oil Manufacturing Division',
    image: '/Awards Image/BN Group (1)_page-0001.webp',
    tag: 'Official Citation',
  },
  {
    id: 'g-award-8',
    title: 'Nutrica Award-Winning Brand 2024',
    subtitle: 'Showcase of MarTech Excellence & afaqs! Digies Awards for #JaisaGharWaisaCookingOil',
    image: '/Awards Image/Nutrica-Award-page.webp',
    tag: 'FMCG Brand Award',
  },
  {
    id: 'g-award-9',
    title: 'MarTech Best Marketing Campaign Trophy',
    subtitle: 'Quantic Excellence Trophy for Nutrica Multi-Channel Launch Campaign',
    image: '/Awards Image/Award.webp',
    tag: 'Trophy',
  },
  {
    id: 'g-award-10',
    title: 'BN Group Wall of Excellence',
    subtitle: 'Complete Collection of National & International Group Trophies',
    image: '/Awards Image/Award-bg.webp',
    tag: 'Group Showcase',
  },
];

// 2. Factual Team Receiving Awards Data
const teamAwards = [
  {
    id: 'team-1',
    title: 'Global Indian of the Year Presentation',
    subtitle: 'MD Anubhav Agarwal holding the GOY 2023 trophy at AsiaOne Forum',
    image: '/Taking Awards/0F2A6686.webp',
    objectPos: 'object-top',
  },
  {
    id: 'team-2',
    title: "Asia's Greatest Brands Leadership Felicitation",
    subtitle: 'Group MD & Executive Team with AsiaOne International Trophies',
    image: '/Taking Awards/0F2A6690.webp',
  },
  {
    id: 'team-3',
    title: 'GLOBOIL India 2024 Stage Award',
    subtitle: 'Award presentation to BN Agritech by Bollywood actor Ameesha Patel',
    image: '/Taking Awards/1 (25).webp',
  },
  {
    id: 'team-4',
    title: 'GLOBOIL India 2024 Participation Honor',
    subtitle: 'Official GLOBOIL India Trophy presented to B.N. Agritech Limited',
    image: '/Taking Awards/1 (27).webp',
  },
  {
    id: 'team-5',
    title: 'MarTech Excellence Stage Felicitation',
    subtitle: 'BN Group marketing leadership receiving Best Multi-Channel Campaign Award',
    image: '/Taking Awards/DSC_0990.webp',
  },
  {
    id: 'team-6',
    title: '21st Asian Business & Social Forum Gala',
    subtitle: "MD Anubhav Agarwal receiving Asia's Greatest Brands trophy on stage",
    image: '/Taking Awards/DSC_5695.webp',
  },
  {
    id: 'team-7',
    title: 'ET Edge Iconic Brands Ceremony',
    subtitle: 'BN Group leadership receiving 6th Edition Iconic Brands of India trophy',
    image: '/Taking Awards/EOSR4677.webp',
  },
  {
    id: 'team-8',
    title: 'Voted Product of the Year 2024',
    subtitle: 'Consumer Survey of Product Innovation Award for Nutrica Cooking Oil',
    image: '/Taking Awards/IMG-20250710-WA0247.webp',
  },
  {
    id: 'team-9',
    title: 'Global Indian & Greatest Brands Felicitation',
    subtitle: 'MD Anubhav Agarwal with AsiaOne International Trophies at Awards Summit',
    image: '/Taking Awards/IMGL5010.webp',
  },
];

// 3. Factual WBR Awards Data
const wbrAwards = [
  {
    id: 'wbr-1',
    title: 'WBR Certificate of Excellence - House of Commons',
    subtitle: 'Awarded to BN Group as Fastest Growing Edible Oil Manufacturer of the Year',
    image: '/WBR/IMG-20250405-WA0012.webp',
  },
  {
    id: 'wbr-2',
    title: 'London Daily & WBR UK Delegation',
    subtitle: 'BN Group executive delegation at the Parliament Buildings, London, UK',
    image: '/WBR/IMG-20250405-WA0013.webp',
  },
  {
    id: 'wbr-3',
    title: 'WBR International Excellence Summit',
    subtitle: 'Stage presentation of Global Excellence Award in London, UK',
    image: '/WBR/IMG-20250405-WA0021.webp',
  },
  {
    id: 'wbr-4',
    title: 'UK Parliament House of Commons Felicitation',
    subtitle: 'MD Anubhav Agarwal holding WBR Certificate of Excellence in Central Lobby',
    image: '/WBR/IMG-20250405-WA0022.webp',
  },
  {
    id: 'wbr-5',
    title: 'WBR Global Business Forum Award',
    subtitle: 'International business excellence recognition by WBR Corp UK Limited',
    image: '/WBR/IMG-20250405-WA0024.webp',
  },
  {
    id: 'wbr-6',
    title: 'Westminster Hall Commemorative Presentation',
    subtitle: 'MD Anubhav Agarwal at the historic Westminster Hall, Parliament of UK',
    image: '/WBR/IMG-20250405-WA0025.webp',
  },
  {
    id: 'wbr-7',
    title: 'WBR Asian UK Excellence Forum',
    subtitle: 'Executive delegation receiving international manufacturing accolade',
    image: '/WBR/IMG-20250405-WA0026.webp',
  },
  {
    id: 'wbr-8',
    title: 'Global Business Leadership Keynote',
    subtitle: 'WBR Corp UK honors BN Group for cross-border expansion & excellence',
    image: '/WBR/IMG-20250405-WA0027.webp',
  },
  {
    id: 'wbr-9',
    title: 'WBR Award Gala Executive Council',
    subtitle: 'Group leadership at the WBR Global Business Gala in London',
    image: '/WBR/IMG-20250405-WA0028.webp',
  },
  {
    id: 'wbr-10',
    title: 'WBR Official Certificate Citation',
    subtitle: 'Citation of Excellence for Significant Industrial Contribution',
    image: '/WBR/IMG-20250405-WA0029.webp',
  },
  {
    id: 'wbr-11',
    title: 'WBR UK Parliament Delegation Group',
    subtitle: 'Commemorative photo of delegates at the House of Commons, London',
    image: '/WBR/IMG-20250405-WA0030.webp',
  },
];

// 4. Factual Media & Press Coverage Data
const mediaCoverage = [
  {
    id: 'mc-1',
    type: 'corporate',
    title: 'ETRetail: Nutrica Wellness Oil Launch',
    subtitle: 'BN Group forays into wellness oil category with Nutrica; eyes ₹500 Cr revenue',
    image: '/Media Coverage/Media Coverage 01.png',
    publication: 'ETRetail / Economic Times',
  },
  {
    id: 'mc-2',
    type: 'corporate',
    title: 'ET Insights: Decade of Excellence',
    subtitle: 'BN Group\'s decade journey of sustainability & customer-centricity led by MD Anubhav Agarwal',
    image: '/Media Coverage/Media Coverage 02.png',
    publication: 'ET Insights (Times Group)',
  },
  {
    id: 'mc-3',
    type: 'corporate',
    title: 'Industry Outlook: Top 10 Oil Mills in India',
    subtitle: 'Spotlighting BN Group\'s edible oil manufacturing transformation & high-capacity refineries',
    image: '/Media Coverage/Media Coverage 03.png',
    publication: 'Industry Outlook',
  },
  {
    id: 'mc-4',
    type: 'corporate',
    title: 'Femina Magazine: A Legacy to Behold',
    subtitle: 'Entrepreneurial vision, ancestral heritage, and expansion journey of MD Anubhav Agarwal',
    image: '/Media Coverage/Media Coverage 04.png',
    publication: 'Femina Magazine',
  },
  {
    id: 'mc-5',
    type: 'corporate',
    title: 'Asia\'s Greatest Brands: Building a Legacy',
    subtitle: 'Feature on BN Group\'s FMCG portfolio, specialty chemicals, and manufacturing plants',
    image: '/Media Coverage/Media Coverage 05.png',
    publication: 'Asia\'s Greatest Brands',
  },
  {
    id: 'mc-6',
    type: 'corporate',
    title: 'Business Standard: 10th Foundation Day',
    subtitle: 'Union Minister Nitin Gadkari & dignitaries attend BN Group\'s 10th Foundation Day gala',
    image: '/Media Coverage/Media Coverage 06.png',
    publication: 'Business Standard',
  },
  {
    id: 'nmc-1',
    type: 'nutrica',
    title: 'e4m: Nutrica National TVC Launch',
    subtitle: 'Nutrica challenges \'one-size-fits-all\' approach towards cooking oil in campaign by GOZOOP',
    image: '/Nutrica Media Coverage/Nutrica Media Coverage 01.png',
    publication: 'exchange4media (e4m)',
  },
  {
    id: 'nmc-2',
    type: 'nutrica',
    title: 'Campaign India: Nutrica Commercials Feature',
    subtitle: 'Nutrica Oil\'s clever campaign is greased with giggles across three new commercial films',
    image: '/Nutrica Media Coverage/Nutrica Media Coverage 02.png',
    publication: 'Campaign India',
  },
  {
    id: 'nmc-3',
    type: 'nutrica',
    title: 'afaqs!: #JaisaGharWaisaCookingOil Spotlight',
    subtitle: 'BN Group promotes Nutrica wellness & fitness cooking oil range for diverse Indian households',
    image: '/Nutrica Media Coverage/Nutrica Media Coverage 03.png',
    publication: 'afaqs!',
  },
  {
    id: 'nmc-4',
    type: 'nutrica',
    title: 'Indian Television: Nutrica Ad Unveiling',
    subtitle: 'BN Group unveils national TV & digital media campaign for Nutrica oil range',
    image: '/Nutrica Media Coverage/Nutrica Media Coverage 04.png',
    publication: 'Indian Television',
  },
  {
    id: 'nmc-5',
    type: 'nutrica',
    title: 'Storyboard18: New Portfolio Brand Nutrica',
    subtitle: 'BN Group launches ad campaign for Nutrica targeting health-conscious consumers',
    image: '/Nutrica Media Coverage/Nutrica Media Coverage 05.png',
    publication: 'Storyboard18',
  },
];

export default function MediaPage() {
  const [lightboxState, setLightboxState] = useState({ isOpen: false, list: [], index: 0 });
  const [mediaFilter, setMediaFilter] = useState('all');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openLightbox = (list, index) => {
    setLightboxState({ isOpen: true, list, index });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextLightboxItem = (e) => {
    if (e) e.stopPropagation();
    setLightboxState((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.list.length,
    }));
  };

  const prevLightboxItem = (e) => {
    if (e) e.stopPropagation();
    setLightboxState((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.list.length) % prev.list.length,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxState.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxItem();
      if (e.key === 'ArrowLeft') prevLightboxItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen]);

  const filteredMediaCoverage = mediaCoverage.filter((item) => {
    if (mediaFilter === 'corporate') return item.type === 'corporate';
    if (mediaFilter === 'nutrica') return item.type === 'nutrica';
    return true;
  });

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-['Manrope'] pb-16">
      
      {/* 1. Hero Header Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 px-4 sm:px-8 md:px-16 border-b-2 border-[#D6B46A]/40 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
            Media & Achievements
          </h1>
          <p className="text-stone-300 text-sm sm:text-base md:text-lg mt-4 max-w-3xl mx-auto leading-relaxed font-['Manrope']">
            A comprehensive showcase of our global honors, leadership award ceremonies, World Business Records recognitions, and national press coverage.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mt-12 flex flex-col gap-16">

        {/* 2. SECTION 1: Group Awards & Certificates */}
        <section id="group-awards" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D6B46A]/30 gap-4">
            <div>
              <div className="text-xs font-bold text-[#A8863D] uppercase tracking-widest font-['Manrope'] mb-1">
                Section 01
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Cinzel','Georgia',serif] text-slate-900">
                Group Awards & Trophies
              </h2>
              <p className="text-sm text-slate-600 font-['Manrope'] mt-1">
                Official certificates, excellence honors, and prestigious corporate trophies.
              </p>
            </div>
            <span className="text-xs font-bold text-[#A8863D] bg-[#A8863D]/10 px-3 py-1.5 rounded-full border border-[#D6B46A]/40 self-start md:self-auto">
              {groupAwards.length} Honors Displayed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupAwards.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(groupAwards, idx)}
                className="group bg-white rounded-2xl border border-[#D6B46A]/30 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col transform hover:-translate-y-1 hover:border-[#D6B46A]"
              >
                <div className="relative w-full h-60 bg-stone-50 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-[#1c1813]/80 backdrop-blur-md text-[#CFB377] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D6B46A]/40">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between border-t border-stone-100 bg-white">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Cinzel','Georgia',serif] group-hover:text-[#A8863D] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#A8863D] font-semibold">
                    <span>Click to Expand</span>
                    <i className="fas fa-expand-alt text-[11px] group-hover:scale-110 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SECTION 2: Team Receiving Awards */}
        <section id="team-awards" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D6B46A]/30 gap-4">
            <div>
              <div className="text-xs font-bold text-[#A8863D] uppercase tracking-widest font-['Manrope'] mb-1">
                Section 02
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Cinzel','Georgia',serif] text-slate-900">
                Leadership & Teams Receiving Awards
              </h2>
              <p className="text-sm text-slate-600 font-['Manrope'] mt-1">
                Capturing moments of pride as AAG executives and team members accept accolades on national stages.
              </p>
            </div>
            <span className="text-xs font-bold text-[#A8863D] bg-[#A8863D]/10 px-3 py-1.5 rounded-full border border-[#D6B46A]/40 self-start md:self-auto">
              {teamAwards.length} Ceremonies Recorded
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamAwards.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(teamAwards, idx)}
                className="group bg-white rounded-2xl border border-[#D6B46A]/30 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col transform hover:-translate-y-1 hover:border-[#D6B46A]"
              >
                <div className="relative w-full h-64 bg-stone-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover ${item.objectPos || 'object-top'} filter group-hover:scale-105 transition-transform duration-500 will-change-transform`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6B46A] bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#D6B46A]/40">
                      Award Ceremony
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Cinzel','Georgia',serif] group-hover:text-[#A8863D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#A8863D] font-semibold">
                    <span>View High-Res Photo</span>
                    <i className="fas fa-search-plus text-[11px] group-hover:scale-110 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SECTION 3: WBR Global Awards & Recognition */}
        <section id="wbr-awards" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D6B46A]/30 gap-4">
            <div>
              <div className="text-xs font-bold text-[#A8863D] uppercase tracking-widest font-['Manrope'] mb-1">
                Section 03
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Cinzel','Georgia',serif] text-slate-900">
                World Business Records (WBR) Recognition
              </h2>
              <p className="text-sm text-slate-600 font-['Manrope'] mt-1">
                Highlights from World Business Records & Global Business Forum award galas in London, UK.
              </p>
            </div>
            <span className="text-xs font-bold text-[#A8863D] bg-[#A8863D]/10 px-3 py-1.5 rounded-full border border-[#D6B46A]/40 self-start md:self-auto">
              {wbrAwards.length} Event Highlights
            </span>
          </div>

          {/* WBR 4 Video Cards with Separate Individual Backgrounds */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              { id: 'v1', src: '/wbr video/VID-20250405-WA0005.mp4', poster: '/WBR/IMG-20250405-WA0012.webp' },
              { id: 'v2', src: '/wbr video/VID-20250405-WA0006.mp4', poster: '/WBR/IMG-20250405-WA0013.webp' },
              { id: 'v3', src: '/wbr video/VID-20250405-WA0031.mp4', poster: '/WBR/IMG-20250405-WA0021.webp' },
              { id: 'v4', src: '/wbr video/VID-20250405-WA0005.mp4', poster: '/WBR/IMG-20250405-WA0024.webp' },
            ].map((vid) => (
              <div
                key={vid.id}
                className="rounded-2xl bg-gradient-to-br from-[#1c1813] via-[#261f17] to-[#120f0c] p-3 sm:p-4 border border-[#D6B46A]/40 shadow-md hover:shadow-xl transition-all duration-300 hover:border-[#D6B46A] flex flex-col items-center justify-center"
              >
                <div className="w-full max-w-lg aspect-video rounded-xl overflow-hidden border border-[#D6B46A]/30 shadow-inner bg-black">
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    poster={vid.poster}
                  >
                    <source src={vid.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>

          {/* WBR Image Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wbrAwards.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(wbrAwards, idx)}
                className="group bg-white rounded-2xl border border-[#D6B46A]/30 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col transform hover:-translate-y-1 hover:border-[#D6B46A]"
              >
                <div className="relative w-full h-60 bg-stone-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter group-hover:scale-105 transition-transform duration-500 will-change-transform"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6B46A] bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#D6B46A]/40">
                      WBR London UK
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm font-['Cinzel','Georgia',serif] group-hover:text-[#A8863D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#A8863D] font-semibold">
                    <span>View Photo</span>
                    <i className="fas fa-search-plus text-[11px] group-hover:scale-110 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SECTION 4: Media & Press Coverage */}
        <section id="media-coverage" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-[#D6B46A]/30 gap-4">
            <div>
              <div className="text-xs font-bold text-[#A8863D] uppercase tracking-widest font-['Manrope'] mb-1">
                Section 04
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Cinzel','Georgia',serif] text-slate-900">
                Mainstream & FMCG Media Coverage
              </h2>
              <p className="text-sm text-slate-600 font-['Manrope'] mt-1">
                Features, press releases, and editorial spotlights across major national print and digital publications.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-white p-1 rounded-full border border-[#D6B46A]/40 shadow-sm">
              {[
                { id: 'all', label: 'All Articles' },
                { id: 'corporate', label: 'Group Coverage' },
                { id: 'nutrica', label: 'Nutrica FMCG' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMediaFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    mediaFilter === tab.id
                      ? 'bg-[#A8863D] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#A8863D]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMediaCoverage.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(filteredMediaCoverage, idx)}
                className="group bg-white rounded-2xl border border-[#D6B46A]/30 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col transform hover:-translate-y-1 hover:border-[#D6B46A]"
              >
                <div className="relative w-full h-64 bg-stone-50 overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#1c1813]/85 text-[#CFB377] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D6B46A]/40">
                    {item.publication}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-stone-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm font-['Cinzel','Georgia',serif] group-hover:text-[#A8863D] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#A8863D] font-semibold">
                    <span>Read Full Clipping</span>
                    <i className="fas fa-newspaper text-xs"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* LIGHTBOX MODAL PREVIEW */}
      {lightboxState.isOpen && lightboxState.list.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white z-10 py-2">
            <span className="text-xs font-semibold text-[#D6B46A] tracking-wider font-['Manrope']">
              {lightboxState.index + 1} / {lightboxState.list.length}
            </span>
            <button
              onClick={closeLightbox}
              className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-xl"
              aria-label="Close Lightbox"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Main Image View */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center p-2 my-auto">
            {/* Prev Button */}
            <button
              onClick={prevLightboxItem}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#A8863D] text-white p-3 sm:p-4 rounded-full transition-colors cursor-pointer z-20 border border-[#D6B46A]/40"
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left text-sm sm:text-base"></i>
            </button>

            {/* Image */}
            <img
              src={lightboxState.list[lightboxState.index]?.image}
              alt={lightboxState.list[lightboxState.index]?.title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-[#D6B46A]/30"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Button */}
            <button
              onClick={nextLightboxItem}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#A8863D] text-white p-3 sm:p-4 rounded-full transition-colors cursor-pointer z-20 border border-[#D6B46A]/40"
              aria-label="Next"
            >
              <i className="fas fa-chevron-right text-sm sm:text-base"></i>
            </button>
          </div>

          {/* Caption Footer */}
          <div
            className="w-full max-w-3xl bg-[#1c1813]/90 border border-[#D6B46A]/40 rounded-2xl p-4 text-center text-white backdrop-blur-md mt-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-base sm:text-lg font-bold font-['Cinzel','Georgia',serif] gold-gradient-text">
              {lightboxState.list[lightboxState.index]?.title}
            </h4>
            {lightboxState.list[lightboxState.index]?.subtitle && (
              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-['Manrope']">
                {lightboxState.list[lightboxState.index]?.subtitle}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
