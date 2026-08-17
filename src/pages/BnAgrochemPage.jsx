import React from 'react';

export default function BnAgrochemPage() {
  const financialData = [
    { year: 'FY 24-25', revenue: '9,227.87', profit: '252.41' },
    { year: 'FY 25-26', revenue: '11,821.86', profit: '389.26' },
    { year: 'FY 26-27^', revenue: '13,053.84', profit: '432.39' },
    { year: 'FY 27-28^', revenue: '16,483.64', profit: '585.36' },
    { year: 'FY 28-29^', revenue: '20,109.26', profit: '752.09' },
  ];

  const manufacturingFacilities = [
    {
      title: 'Gandhidham Factory',
      capacity: '1,550 TPD Processing Capacity',
      description: 'Refining range of edible oils including palm, soyabean, sunflower, groundnut, and rice bran oil with state-of-the-art infrastructure.',
      image: '/Bn/z4tvqcvndlcyqto6wm02.webp',
      badge: 'Refinery Unit',
    },
    {
      title: 'Mathura Factory',
      capacity: '125 MT/day Crushing | 200 TPD Packaging',
      description: 'Traditional wood-pressed "Kachi Ghani" mustard oil unit equipped with high-precision crushing and automated packaging lines.',
      image: '/Bn/z4tvqcvndlcyqto6wm02.webp',
      badge: 'Crushing & Packaging',
    },
    {
      title: 'Epitome Industries India Limited',
      capacity: 'Integrated Oleo-Chemical Complex',
      description: 'Located at Lakhapar, Anjar (Kachchh, Gujarat). Set to produce 1,44,000 MT/yr fatty acid, 73,000 MT/yr pharma & food grade glycerin, and 43,800 MT/yr soap noodles.',
      image: '/Bn/z4tvqcvndlcyqto6wm02.webp',
      badge: 'Specialty Chemicals',
    },
  ];

  const products = [
    { name: 'Nutrica Blended Oils', category: 'Wellness & Fitness Oils', desc: 'Premium health-focused edible oil blends designed for modern nutritional balance.' },
    { name: 'Simply Fresh & Healthy Value', category: 'Core Edible Oils', desc: 'High-purity soyabean, sunflower, groundnut, and mustard oils for everyday cooking.' },
    { name: 'Healthy Value Kachi Ghani', category: 'Cold-Pressed Mustard Oil', desc: 'Traditional cold-pressed mustard oil rich in natural aroma and omega-3 fatty acids.' },
    { name: 'Nutrica Peanut Butter', category: 'Spreads & Nutrition', desc: 'High-protein creamy and crunchy peanut butter crafted from select roasted peanuts.' },
    { name: 'Nutrica Honey Range', category: 'Pure Natural Honey', desc: '100% natural, unadulterated multi-floral and bee honey harvested with strict purity checks.' },
    { name: 'Nutrica Yellow Mustard Oil', category: 'Specialty Oils', desc: 'Pungent, high-purity yellow mustard oil preserving traditional authentic taste.' },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-['Manrope'] pb-0">
      
      {/* Hero Header Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 border-b-2 border-[#D6B46A]/40 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text leading-tight">
              BN Agrochem Limited
            </h1>
            <p className="text-stone-300 text-sm sm:text-base md:text-lg mt-4 leading-relaxed font-['Manrope']">
              Transforming natural oils into high-value ingredients through science, innovation, and responsible practices across edible oils, FMCG, and specialty oleo-chemicals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#facilities"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#b89345] to-[#D6B46A] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Manufacturing Plants
              </a>
              <a
                href="#financials"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                Financial Projections
              </a>
            </div>
          </div>

          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-white p-5 shadow-2xl flex items-center justify-center border-2 border-[#D6B46A]/50 flex-shrink-0">
            <img src="/logos/BN-Agrochem-Limited-Logo.png" alt="BN Agrochem Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 mt-12 space-y-16">

        {/* Vision, Mission & Purpose Cards */}
        <section className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
              Purpose, Vision & Mission
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Guided by a strong commitment to quality, health, and sustainable industrial growth.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Purpose */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-all border-l-4 border-l-[#D6B46A]">
              <div className="w-12 h-12 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center mb-5 text-xl">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="text-xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mb-3">Our Purpose</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To move beyond traditional edible oil refining and create real value through science and innovation at the intersection of agriculture, chemistry, and sustainability—transforming plant-based oils into high-purity derivatives.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-all border-l-4 border-l-[#A8863D]">
              <div className="w-12 h-12 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center mb-5 text-xl">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="text-xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To become India’s most trusted and future-focused company for plant-based oil derivatives, delivering high-purity, sustainable solutions that improve everyday life and support global industries.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-all border-l-4 border-l-[#7a5b1e]">
              <div className="w-12 h-12 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center mb-5 text-xl">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="text-xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mb-3">Our Mission</h3>
              <ul className="text-slate-600 text-xs sm:text-sm space-y-2.5">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-[#A8863D] mt-0.5 text-xs"></i>
                  <span>Support food, health, beauty & renewable applications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-[#A8863D] mt-0.5 text-xs"></i>
                  <span>Ensure purity, consistency and reliability in every product.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-[#A8863D] mt-0.5 text-xs"></i>
                  <span>Adopt sustainable, eco-friendly manufacturing processes.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>

      {/* Financial Growth & Projections - BALANCED FULL WINDOW WIDTH */}
      <section id="financials" className="w-full bg-white border-y-2 border-[#D6B46A]/40 py-8 sm:py-10 shadow-lg my-8 sm:my-10">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Financial Performance</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mt-1">
                Revenue & Operating Profit Growth
              </h2>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-2xl bg-[#D6B46A]/15 border border-[#D6B46A]/30 text-xs font-bold text-[#7a5b1e]">
                Banking: 13+ Premier Banks
              </div>
              <div className="px-4 py-2 rounded-2xl bg-[#D6B46A]/15 border border-[#D6B46A]/30 text-xs font-bold text-[#7a5b1e]">
                Credit Rating: "A"
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Table Container - Matched Height */}
            <div className="h-[320px] sm:h-[360px] md:h-[380px] overflow-x-auto bg-stone-50/80 p-6 rounded-3xl border border-[#D6B46A]/25 shadow-sm flex flex-col justify-center">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#D6B46A]/30 bg-stone-100 text-slate-900 text-xs sm:text-sm font-bold">
                    <th className="py-3 px-4 font-['Cinzel']">Financial Year</th>
                    <th className="py-3 px-4 font-['Cinzel']">Revenue (₹ in Cr)</th>
                    <th className="py-3 px-4 font-['Cinzel']">Operating Profit (₹ in Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {financialData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">{row.year}</td>
                      <td className="py-3 px-4 font-bold text-[#7a5b1e]">₹{row.revenue} Cr</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">₹{row.profit} Cr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Graph Image - High-Definition Clear Display Container */}
            <div className="w-full h-[320px] sm:h-[360px] md:h-[380px] rounded-3xl overflow-hidden border border-[#D6B46A]/30 shadow-sm bg-white p-3 flex items-center justify-center">
              <img
                src="/Bn/plmtxjjproko6gciiqfh.webp"
                alt="BN Group Financial Projections Chart"
                className="w-full h-full object-contain rounded-2xl filter drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 space-y-16">

        {/* Global Footprint & Distribution Reach */}
        <section className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
              Global Footprint & Distribution Network
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Expanding presence across key commercial capitals with nationwide retail penetration.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Infographic map */}
            <div className="rounded-3xl overflow-hidden border border-[#D6B46A]/30 shadow-xl bg-white p-3">
              <img
                src="/Bn/uvw3bvpas4howxtcfvp8.webp"
                alt="BN Group Global Presence & Distribution Map"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>

            {/* Key stats cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-[#D6B46A]/25 shadow-md flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center text-2xl flex-shrink-0">
                  <i className="fas fa-building"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">5 Corporate Offices in India</h4>
                  <p className="text-xs text-slate-600">New Delhi, Noida, Indore, Agra, and Mumbai.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#D6B46A]/25 shadow-md flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center text-2xl flex-shrink-0">
                  <i className="fas fa-globe"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">5 International Offices</h4>
                  <p className="text-xs text-slate-600">London, Dubai, Ghana, Tanzania, and Singapore.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#D6B46A]/25 shadow-md flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center text-2xl flex-shrink-0">
                  <i className="fas fa-store"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">100,000+ Retail Outlets</h4>
                  <p className="text-xs text-slate-600">Reaching direct and indirect consumers through 30 CFAs and 800+ distributors across North, West, and East India.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Facilities */}
        <section id="facilities" className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
              Manufacturing Infrastructure
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              High-capacity refineries, crushing units, and integrated specialty chemical complexes.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturingFacilities.map((fac, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-[#D6B46A]/30 shadow-lg overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <span className="px-3 py-1 rounded-full bg-[#D6B46A]/15 text-[#A8863D] text-[10px] font-bold uppercase tracking-wider">
                    {fac.badge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-['Cinzel','Raleway',serif] mt-3">
                    {fac.title}
                  </h3>
                  <p className="text-xs font-bold text-[#7a5b1e] mt-1">{fac.capacity}</p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{fac.description}</p>
                </div>
                <div className="p-4 bg-stone-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>BN Agrochem Plant</span>
                  <i className="fas fa-industry text-[#A8863D]"></i>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Product Portfolio Range - EDGE TO EDGE FULL WINDOW WIDTH */}
      <section className="w-full bg-white border-t-2 border-[#D6B46A]/40 py-10 sm:py-14 shadow-lg mt-10 mb-6">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
              Product Portfolio Range
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              From wellness cooking oils to premium peanut butter, honey, and specialty mustard oils.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-stone-50 border border-[#D6B46A]/25 hover:border-[#D6B46A] hover:bg-white transition-all shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8863D]">{prod.category}</span>
                <h4 className="text-lg font-bold text-slate-900 font-['Cinzel','Raleway',serif] mt-1">{prod.name}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{prod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
