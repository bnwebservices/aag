import React, { useState, useEffect, useRef } from 'react';

export default function BnAgrochemPage() {
  const [pvmVisible, setPvmVisible] = useState([false, false, false]);
  const pvmGridRef = useRef(null);

  const [finVisible, setFinVisible] = useState(false);
  const finSectionRef = useRef(null);

  const [modalProduct, setModalProduct] = useState(null);

  // Active expanded section state (hover or click)
  const [expandedSectionId, setExpandedSectionId] = useState(null);
  const [pinnedSectionId, setPinnedSectionId] = useState(null);

  const financialData = [
    { year: 'FY 24-25', revNum: 9227.87, revStr: '9,227.87', profitNum: 252.41, profitStr: '252.41' },
    { year: 'FY 25-26', revNum: 11821.86, revStr: '11,821.86', profitNum: 389.26, profitStr: '389.26' },
    { year: 'FY 26-27^', revNum: 13053.84, revStr: '13,053.84', profitNum: 432.39, profitStr: '432.39' },
    { year: 'FY 27-28^', revNum: 16483.64, revStr: '16,483.64', profitNum: 585.36, profitStr: '585.36' },
    { year: 'FY 28-29^', revNum: 20109.26, revStr: '20,109.26', profitNum: 752.09, profitStr: '752.09' },
  ];

  const [animatedFin, setAnimatedFin] = useState(
    financialData.map(() => ({ rev: '0.00', profit: '0.00' }))
  );

  useEffect(() => {
    const checkPvm = () => {
      if (!pvmGridRef.current) return;
      const { top } = pvmGridRef.current.getBoundingClientRect();
      if (top < window.innerHeight * 0.78) {
        setPvmVisible([true, true, true]);
      }
    };
    const scrollParent = pvmGridRef.current?.closest('.tablet-tight-content');
    if (scrollParent) scrollParent.addEventListener('scroll', checkPvm, { passive: true });
    window.addEventListener('scroll', checkPvm, { passive: true });
    return () => {
      if (scrollParent) scrollParent.removeEventListener('scroll', checkPvm);
      window.removeEventListener('scroll', checkPvm);
    };
  }, []);

  // Financial Section Scroll & Count-up Animation
  useEffect(() => {
    const checkFin = () => {
      if (!finSectionRef.current || finVisible) return;
      const { top } = finSectionRef.current.getBoundingClientRect();
      if (top < window.innerHeight * 0.82) {
        setFinVisible(true);
      }
    };

    const scrollParent = finSectionRef.current?.closest('.tablet-tight-content');
    if (scrollParent) scrollParent.addEventListener('scroll', checkFin, { passive: true });
    window.addEventListener('scroll', checkFin, { passive: true });
    checkFin();

    return () => {
      if (scrollParent) scrollParent.removeEventListener('scroll', checkFin);
      window.removeEventListener('scroll', checkFin);
    };
  }, [finVisible]);

  useEffect(() => {
    if (!finVisible) return;

    let animId;
    const duration = 3500; // 3.5 seconds
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

      if (progress >= 1) {
        setAnimatedFin(
          financialData.map((d) => ({
            rev: d.revStr,
            profit: d.profitStr,
          }))
        );
      } else {
        setAnimatedFin(
          financialData.map((d) => ({
            rev: (d.revNum * eased).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            profit: (d.profitNum * eased).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          }))
        );
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => {
      if (animId) cancelAnimationFrame(animate);
    };
  }, [finVisible]);

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

  // 1. Nutrica Blended Oils SKUs
  const nutricaBlendedProducts = [
    // Pro-Fitness
    { id: 'pf-bot', variant: 'Pro-Fitness', name: 'Nutrica Pro-Fitness Oil', pack: '1L Bottle', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Cooking Oil/Nutrica New Bottles/Nutrica Pro Fitness Oil-Bottle-front_converted.webp', desc: 'Heart & Active Wellness formula with high Gamma-Oryzanol & Zero Trans-Fat.' },
    { id: 'pf-pch', variant: 'Pro-Fitness', name: 'Nutrica Pro-Fitness Oil', pack: '1L Pouch', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Cooking Oil/Pouch/Nutrica-Pro-Fitness-Oil-FOP_converted.webp', desc: 'Economical 1L pouch for daily active healthy cooking.' },
    { id: 'pf-can2', variant: 'Pro-Fitness', name: 'Nutrica Pro-Fitness Oil', pack: '2L Can', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Cooking Oil/Jerry Can 2Ltr/Pro-Fitness Jerry Can 2 Ltr_converted.webp', desc: 'Ergonomic 2L handle jerry can for household wellness.' },
    { id: 'pf-can3', variant: 'Pro-Fitness', name: 'Nutrica Pro-Fitness Oil', pack: '3L Can', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Cooking Oil/Jerry Can 3Ltr/Pro-Fitness Jerry Can 3 Ltr-FOP_converted.webp', desc: '3L family capacity jerry can with easy-pour nozzle.' },
    { id: 'pf-can5', variant: 'Pro-Fitness', name: 'Nutrica Pro-Fitness Oil', pack: '5L Can', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Cooking Oil/Jerry Can 5Ltr/Pro-Fitness Jerry Can 5 Ltr-FOP_converted.webp', desc: '5L large capacity jerry can with sturdy handle.' },
    { id: 'pf-jar15', variant: 'Pro-Fitness', name: 'Nutrica Pro-Fitness Oil', pack: '15L Jar', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Cooking Oil/Nutrica 15 Ltr/Nutrica 15 Ltr Jar-Fitness_converted.webp', desc: '15L commercial & bulk kitchen jar format.' },

    // Pro-Immunity
    { id: 'pi-bot', variant: 'Pro-Immunity', name: 'Nutrica Pro-Immunity Oil', pack: '1L Bottle', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Cooking Oil/Nutrica New Bottles/Nutrica Pro Immunity Oil-Bottle-front_converted.webp', desc: 'Antioxidant shield & natural immunity booster formula.' },
    { id: 'pi-pch', variant: 'Pro-Immunity', name: 'Nutrica Pro-Immunity Oil', pack: '1L Pouch', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Cooking Oil/Pouch/Nutrica-Pro-Immunity-Oil-FOP_converted.webp', desc: '1L pouch pack with balanced Omega 3 & 6 nutrients.' },
    { id: 'pi-can2', variant: 'Pro-Immunity', name: 'Nutrica Pro-Immunity Oil', pack: '2L Can', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Cooking Oil/Jerry Can 2Ltr/Pro-Immunity Jerry Can 2 Ltr_converted.webp', desc: '2L ergonomic jerry can for immunity active cooking.' },
    { id: 'pi-can3', variant: 'Pro-Immunity', name: 'Nutrica Pro-Immunity Oil', pack: '3L Can', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Cooking Oil/Jerry Can 3Ltr/Pro-Immunity Jerry Can 3 Ltr-FOP_converted.webp', desc: '3L family health jerry can pack.' },
    { id: 'pi-can5', variant: 'Pro-Immunity', name: 'Nutrica Pro-Immunity Oil', pack: '5L Can', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Cooking Oil/Jerry Can 5Ltr/Pro-Immunity Jerry Can 5 Ltr-FOP_converted.webp', desc: '5L heavy duty jerry can format.' },
    { id: 'pi-jar15', variant: 'Pro-Immunity', name: 'Nutrica Pro-Immunity Oil', pack: '15L Jar', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Cooking Oil/Nutrica 15 Ltr/Nutrica 15 Ltr Jar-Immunity_converted.webp', desc: '15L commercial bulk jar.' },

    // Pro-Energy
    { id: 'pe-bot', variant: 'Pro-Energy', name: 'Nutrica Pro-Energy Oil', pack: '1L Bottle', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Cooking Oil/Nutrica New Bottles/Nutrica-Pro-Energy-Oil-Bottle-Front_converted.webp', desc: 'High thermal stability & active energy metabolism oil.' },
    { id: 'pe-pch', variant: 'Pro-Energy', name: 'Nutrica Pro-Energy Oil', pack: '1L Pouch', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Cooking Oil/Pouch/Nutrica-Pro-Energy-Oil-FOP_converted.webp', desc: '1L pouch format for high smoke point cooking.' },
    { id: 'pe-can2', variant: 'Pro-Energy', name: 'Nutrica Pro-Energy Oil', pack: '2L Can', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Cooking Oil/Jerry Can 2Ltr/Pro-Energy Jerry Can 2 Ltr_converted.webp', desc: '2L jerry can format.' },
    { id: 'pe-can3', variant: 'Pro-Energy', name: 'Nutrica Pro-Energy Oil', pack: '3L Can', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Cooking Oil/Jerry Can 3Ltr/Pro-Energy Jerry Can 3 Ltr-FOP_converted.webp', desc: '3L jerry can format.' },
    { id: 'pe-can5', variant: 'Pro-Energy', name: 'Nutrica Pro-Energy Oil', pack: '5L Can', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Cooking Oil/Jerry Can 5Ltr/Pro-Energy Jerry Can 5 Ltr-FOP_converted.webp', desc: '5L jerry can format.' },
  ];

  // 2. Simply Fresh SKUs (Soyabean & Sunflower)
  const simplyFreshProducts = [
    // Refined Soyabean Oil SKUs
    { id: 'sf-soya-bot450', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '450g Bottle', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Soyabean SF 450g bottle-FOP_converted.webp', desc: 'Light, healthy refined soyabean oil enriched with natural Omega-3 & Vitamin A, D.' },
    { id: 'sf-soya-bot900', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '900g Bottle', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Soyabean SF 900g bottle-FOP_converted.webp', desc: 'High purity refined soyabean oil in ergonomic 900g PET bottle.' },
    { id: 'sf-soya-pch450', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '450g Pouch', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Soyabean SF 450g Pouch-FOP_converted.webp', desc: 'Economical 450g pouch for everyday light cooking.' },
    { id: 'sf-soya-pch900', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '900g Pouch', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Soyabean SF 900g Pouch-FOP_converted.webp', desc: '900g pouch pack for nutritious family meals.' },
    { id: 'sf-soya-hdpe45', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '4.5L Jar', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Soyabean SF 4-50kg-HDPE-FOP_converted.webp', desc: 'Heavy duty 4.5L HDPE jar format.' },
    { id: 'sf-soya-hdpe135', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '13.5kg Jar', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Soyabean SF 13.5kg HDPE -Rectangular white_Front_converted.webp', desc: '13.5kg rectangular white HDPE commercial jar.' },
    { id: 'sf-soya-hdpe15', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '15L Jar', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Simply_Fresh_Soyabean_15_ltr_HDPE_Front_converted.webp', desc: '15L commercial HDPE container format.' },
    { id: 'sf-soya-tin13', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '13kg Tin', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Simply_Fresh_Soyabean_13kg_Tin_converted.webp', desc: '13kg commercial tin for catering and food processing.' },
    { id: 'sf-soya-tin15', variant: 'Soyabean Oil', name: 'Simply Fresh Refined Soyabean Oil', pack: '15kg Tin', color: '#0284c7', badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]', img: '/Simply Fresh/Soyabean/Simply_Fresh_Soyabean_15 kg_Tin_converted.webp', desc: '15kg heavy duty commercial metal tin.' },

    // Refined Sunflower Oil SKUs
    { id: 'sf-sun-bot1', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '1L Bottle', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/SF-Sunflower-1-Ltr-Bottle-FOP_converted.webp', desc: '100% pure light refined sunflower oil rich in Vitamin E.' },
    { id: 'sf-sun-pch1', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '1L Pouch', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/Simply_Fresh_Sunflower_pouch-FOP_converted.webp', desc: '1L pouch pack for light healthy frying and everyday cooking.' },
    { id: 'sf-sun-bot2', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '2L Bottle', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/Sunflower SF 2Ltr bottle-HDPE-Front_converted.webp', desc: '2L ergonomic HDPE bottle with easy-grip handle.' },
    { id: 'sf-sun-hdpe45', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '4.5L Jar', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/Sunflower SF 4-50kg-HDPE-FOP-3D_converted.webp', desc: '4.5L HDPE jar for family cooking.' },
    { id: 'sf-sun-can5', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '5L Can', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/Simply_Fresh_Sunflower_5_Ltr_HDPE-FOP_converted.webp', desc: '5L heavy duty jerry can with pour spout.' },
    { id: 'sf-sun-hdpe15', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '15L Jar', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/Simply_Fresh_Sunflower_15_ltr_HDPE_converted.webp', desc: '15L bulk commercial HDPE container.' },
    { id: 'sf-sun-tin15l', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '15L Tin', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/Sunflower SF 15Ltr Tin Single Side_converted.webp', desc: '15L commercial tin for food establishments.' },
    { id: 'sf-sun-tin15k', variant: 'Sunflower Oil', name: 'Simply Fresh Refined Sunflower Oil', pack: '15kg Tin', color: '#eab308', badgeClass: 'bg-[#fef9c3] text-[#a16207] border-[#fde047]', img: '/Simply Fresh/Sunflower/Sunflower SF 15kg Tin Single Side_converted.webp', desc: '15kg commercial metal tin for heavy culinary usage.' },
  ];

  // 3. Healthy Value Kachi Ghani SKUs
  const healthyValueProducts = [
    { id: 'hv-100m', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '100ml Bottle', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_100ml_converted.webp', desc: 'Traditional cold-pressed wood pressed mustard oil in handy 100ml pack.' },
    { id: 'hv-200m', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '200ml Bottle', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_200ml_converted.webp', desc: 'Authentic high-pungency cold-pressed mustard oil.' },
    { id: 'hv-500m', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '500ml Bottle', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_500ml_converted.webp', desc: '500ml PET bottle rich in natural Allyl Isothiocyanate.' },
    { id: 'hv-1l-bot', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '1L Bottle', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_1Ltr_converted.webp', desc: '1L PET bottle pure mustard oil for authentic Indian cooking.' },
    { id: 'hv-2l-bot', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '2L Bottle', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_2Ltr_Bottle_Front_converted.webp', desc: '2L ergonomic PET bottle with easy-pour cap.' },
    { id: 'hv-5l-bot', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '5L Bottle', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_5Ltr_Bottle_Front_converted.webp', desc: '5L PET jar bottle format.' },
    { id: 'hv-500m-pch', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '500ml Pouch', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_500ml_pouch_Front_without_shadow_converted.webp', desc: 'Economical 500ml pouch pack.' },
    { id: 'hv-1l-pch', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '1L Pouch', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_1ltr_pouch2_converted.webp', desc: '1L pouch format rich in natural Omega-3 fatty acids.' },
    { id: 'hv-2l-hdpe', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '2L Can', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_2 Ltr_HDPE_converted.webp', desc: '2L sturdy HDPE jerry can.' },
    { id: 'hv-5l-hdpe', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '5L Can', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_5 Ltr_HDPE_converted.webp', desc: '5L HDPE jerry can for commercial and family kitchens.' },
    { id: 'hv-15l-hdpe', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '15L Jar', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy_value_15_ltr_HDPE_converted.webp', desc: '15L bulk commercial HDPE container.' },
    { id: 'hv-15l-tin', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '15L Tin', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy Value Tin 15Ltr fullwrap_converted.webp', desc: '15L commercial tin with traditional full wrap graphics.' },
    { id: 'hv-15k-tin', variant: 'Kachi Ghani', name: 'Healthy Value Kachi Ghani Mustard Oil', pack: '15kg Tin', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Healthy Value/Healthy Value Tin 15kg fullwrap_converted.webp', desc: '15kg commercial metal tin for heavy catering.' },
  ];

  // 4. Nutrica Peanut Butter SKUs
  const nutricaPeanutButterProducts = [
    { id: 'pb-cmy-300', variant: 'Pro-Fitness Creamy', name: 'Nutrica Peanut Butter', pack: '300g Jar', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Peanut Butter/300gm/Nutrica-Pro-Fitness-Creamy-300gm_FOP - Copy_converted.webp', desc: 'High-protein smooth & creamy peanut butter crafted from select roasted peanuts.' },
    { id: 'pb-crc-300', variant: 'Pro-Fitness Crunchy', name: 'Nutrica Peanut Butter', pack: '300g Jar', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Nutrica Peanut Butter/300gm/Nutrica-Pro-Fitness-Crunchy-300gm_FOP_converted.webp', desc: 'Protein-rich crunchy peanut butter with real roasted peanut bits.' },
    { id: 'pb-cmy-900', variant: 'Pro-Fitness Creamy', name: 'Nutrica Peanut Butter', pack: '900g Jar', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Peanut Butter/Nutrica Peanut Butter 1Kg/Nutrica-Pro Fitness-Creamy-900gm_converted.webp', desc: '900g family pack smooth & creamy high-protein peanut butter.' },
    { id: 'pb-crc-900', variant: 'Pro-Fitness Crunchy', name: 'Nutrica Peanut Butter', pack: '900g Jar', color: '#d97706', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Nutrica Peanut Butter/Nutrica Peanut Butter 1Kg/Nutrica-Pro-Fitness-Crunchy-900gm_converted.webp', desc: '900g family pack crunchy roasted peanut butter.' },
  ];

  // 5. Nutrica Honey SKUs
  const nutricaHoneyProducts = [
    { id: 'h-pf-250', variant: 'Pro-Fitness', name: 'Nutrica Honey', pack: '250g Jar', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Honey/Nutrica Honey 250gm/Honey-Pro Fitness-New-250g_converted.webp', desc: '100% natural, active wellness multi-floral honey formulation.' },
    { id: 'h-pi-250', variant: 'Pro-Immunity', name: 'Nutrica Honey', pack: '250g Jar', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Honey/Nutrica Honey 250gm/Honey-Pro Immunity-New-250g_converted.webp', desc: 'Rich in natural antioxidants and enzymes for daily immunity.' },
    { id: 'h-pe-250', variant: 'Pro-Energy', name: 'Nutrica Honey', pack: '250g Jar', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Honey/Nutrica Honey 250gm/Honey-Pro Energy-New-250g_converted.webp', desc: 'Pure unadulterated bee honey for instant natural energy boost.' },
    { id: 'h-pf-500', variant: 'Pro-Fitness', name: 'Nutrica Honey', pack: '500g Jar', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Honey/Nutrica Honey 500gm/Honey-Pro Fitness-New-New-500g_converted.webp', desc: '500g pure honey jar for healthy active lifestyle.' },
    { id: 'h-pi-500', variant: 'Pro-Immunity', name: 'Nutrica Honey', pack: '500g Jar', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Honey/Nutrica Honey 500gm/Honey-Pro Immunity-New-500g_converted.webp', desc: '500g immunity defense raw honey formulation.' },
    { id: 'h-pe-500', variant: 'Pro-Energy', name: 'Nutrica Honey', pack: '500g Jar', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Honey/Nutrica Honey 500gm/Honey-Pro Energy-New-500g_converted.webp', desc: '500g natural energy honey for daily metabolism.' },
    { id: 'h-pf-1k', variant: 'Pro-Fitness', name: 'Nutrica Honey', pack: '1kg Jar', color: '#10b981', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', img: '/Nutrica Honey/Nutrica Honey 1kg/Honey-Pro Fitness-New_converted.webp', desc: '1kg large family pack pure raw multi-floral honey.' },
    { id: 'h-pi-1k', variant: 'Pro-Immunity', name: 'Nutrica Honey', pack: '1kg Jar', color: '#f59e0b', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', img: '/Nutrica Honey/Nutrica Honey 1kg/Honey-Pro Immunity-New_converted.webp', desc: '1kg family pack natural immunity honey jar.' },
    { id: 'h-pe-1k', variant: 'Pro-Energy', name: 'Nutrica Honey', pack: '1kg Jar', color: '#ef4444', badgeClass: 'bg-rose-100 text-rose-800 border-rose-300', img: '/Nutrica Honey/Nutrica Honey 1kg/Honey-Pro Energy-New_converted.webp', desc: '1kg family pack natural energy booster honey.' },
  ];

  // 6. Nutrica Yellow Mustard Oil SKUs
  const nutricaYellowMustardProducts = [
    { id: 'ymo-1l-bot', variant: 'Yellow Mustard Oil', name: 'Nutrica Yellow Mustard Oil', pack: '1L Bottle', color: '#eab308', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Nutrica YMO/Nutrica Mustard Oil-1Ltr-Final_converted.webp', desc: '100% pure pungent yellow mustard oil rich in natural aroma & essential nutrients.' },
    { id: 'ymo-5l-can', variant: 'Yellow Mustard Oil', name: 'Nutrica Yellow Mustard Oil', pack: '5L Can', color: '#eab308', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300', img: '/Nutrica YMO/5Ltr Nutrica-YMO-FOP-BOP_converted.webp', desc: '5L heavy duty jerry can yellow mustard oil for authentic taste.' },
  ];

  // Master Portfolio Categories Data for Hover/Click Dropdown Cards
  const portfolioCategories = [
    {
      id: 'blended-oils',
      title: 'Nutrica Blended Oils',
      categoryTag: 'Wellness & Fitness Oils',
      countLabel: '17 SKUs Available',
      desc: 'Premium health-focused edible oil blends (Pro-Fitness, Pro-Immunity, Pro-Energy) engineered for active wellness.',
      heroImg: '/Nutrica Cooking Oil/Nutrica New Bottles/Nutrica Pro Fitness Oil-Bottle-front_converted.webp',
      accentColor: '#D6B46A',
      items: nutricaBlendedProducts,
    },
    {
      id: 'simply-fresh',
      title: 'Simply Fresh & Healthy Value',
      categoryTag: 'Core Edible Oils',
      countLabel: '17 SKUs (Soyabean & Sunflower)',
      desc: 'High-purity refined soyabean and sunflower oils for everyday culinary perfection.',
      heroImg: '/Simply Fresh/Soyabean/Soyabean SF 900g bottle-FOP_converted.webp',
      accentColor: '#0284c7',
      items: simplyFreshProducts,
    },
    {
      id: 'kachi-ghani',
      title: 'Healthy Value Kachi Ghani',
      categoryTag: 'Cold-Pressed Mustard Oil',
      countLabel: '13 SKUs Available',
      desc: 'Traditional wood-pressed Kachi Ghani mustard oil rich in natural aroma and omega-3 fatty acids.',
      heroImg: '/Healthy Value/Healthy_value_1Ltr_converted.webp',
      accentColor: '#d97706',
      items: healthyValueProducts,
    },
    {
      id: 'peanut-butter',
      title: 'Nutrica Peanut Butter',
      categoryTag: 'Spreads & High-Protein Nutrition',
      countLabel: '4 SKUs (Creamy & Crunchy)',
      desc: 'High-protein smooth creamy and crunchy peanut butter crafted from select roasted peanuts.',
      heroImg: '/Nutrica Peanut Butter/300gm/Nutrica-Pro-Fitness-Creamy-300gm_FOP - Copy_converted.webp',
      accentColor: '#10b981',
      items: nutricaPeanutButterProducts,
    },
    {
      id: 'honey-range',
      title: 'Nutrica Honey Range',
      categoryTag: 'Pure Natural Honey',
      countLabel: '9 SKUs Available',
      desc: '100% natural, unadulterated multi-floral raw honey harvested under strict purity protocols.',
      heroImg: '/Nutrica Honey/Nutrica Honey 500gm/Honey-Pro Fitness-New-New-500g_converted.webp',
      accentColor: '#f59e0b',
      items: nutricaHoneyProducts,
    },
    {
      id: 'yellow-mustard',
      title: 'Nutrica Yellow Mustard Oil',
      categoryTag: 'Specialty Mustard Oils',
      countLabel: '2 SKUs Available',
      desc: 'Pungent, high-purity yellow mustard oil preserving traditional authentic taste.',
      heroImg: '/Nutrica YMO/Nutrica Mustard Oil-1Ltr-Final_converted.webp',
      accentColor: '#eab308',
      items: nutricaYellowMustardProducts,
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-['Manrope'] pb-0">
      
      {/* Hero Header Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white pt-12 sm:pt-16 md:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 border-b-2 border-[#D6B46A]/40 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text leading-tight">
              BN Agrochem Limited
            </h1>
            <p className="text-stone-300 text-sm sm:text-base md:text-lg mt-4 leading-relaxed font-['Manrope']">
              Transforming natural oils into high-value ingredients through science, innovation, and responsible practices across edible oils, FMCG, and specialty oleo-chemicals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="https://www.bn-holdings.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#b89345] to-[#D6B46A] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <i className="fas fa-globe"></i>
                <span>Visit Official Website</span>
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
              <a
                href="#facilities"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                Manufacturing Plants
              </a>
              <a
                href="#financials"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                Financial Projections
              </a>
              <a
                href="#products-portfolio"
                className="px-6 py-3 rounded-full bg-[#D6B46A]/20 hover:bg-[#D6B46A]/30 text-[#D6B46A] font-semibold text-xs sm:text-sm border border-[#D6B46A]/40 transition-all"
              >
                Product Portfolio
              </a>
            </div>
          </div>

          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-white p-5 shadow-2xl flex items-center justify-center border-2 border-[#D6B46A]/50 flex-shrink-0 my-auto">
            <img src="/logos/BN-Agrochem-Limited-Logo.png" alt="BN Agrochem Logo" className="w-full h-full object-contain p-2" />
            <a
              href="https://www.linkedin.com/company/bn-agrochem-limited/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0077b5] hover:bg-[#005582] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer z-10 border-2 border-white"
              title="BN Agrochem LinkedIn"
              aria-label="BN Agrochem LinkedIn"
            >
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>
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

          <div ref={pvmGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Purpose — slides from LEFT */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-shadow border-l-4 border-l-[#D6B46A]"
              style={{
                opacity: pvmVisible[0] ? 1 : 0,
                transform: pvmVisible[0] ? 'translateX(0)' : 'translateX(-80px)',
                transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center mb-5 text-xl">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="text-xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mb-3">Our Purpose</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To move beyond traditional edible oil refining and create real value through science and innovation at the intersection of agriculture, chemistry, and sustainability—transforming plant-based oils into high-purity derivatives.
              </p>
            </div>

            {/* Vision — slides from RIGHT */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-shadow border-l-4 border-l-[#A8863D]"
              style={{
                opacity: pvmVisible[1] ? 1 : 0,
                transform: pvmVisible[1] ? 'translateX(0)' : 'translateX(80px)',
                transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s',
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D6B46A]/15 text-[#A8863D] flex items-center justify-center mb-5 text-xl">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="text-xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To become India's most trusted and future-focused company for plant-based oil derivatives, delivering high-purity, sustainable solutions that improve everyday life and support global industries.
              </p>
            </div>

            {/* Mission — slides from TOP */}
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-shadow border-l-4 border-l-[#7a5b1e]"
              style={{
                opacity: pvmVisible[2] ? 1 : 0,
                transform: pvmVisible[2] ? 'translateY(0)' : 'translateY(-80px)',
                transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s',
              }}
            >
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
      <section id="financials" ref={finSectionRef} className="w-full bg-white border-y-2 border-[#D6B46A]/40 py-8 sm:py-10 shadow-lg my-8 sm:my-10">
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
            <div
              className="h-[320px] sm:h-[360px] md:h-[380px] overflow-x-auto bg-stone-50/80 p-6 rounded-3xl border border-[#D6B46A]/25 shadow-sm flex flex-col justify-center"
              style={{
                opacity: finVisible ? 1 : 0,
                transform: finVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
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
                      <td className="py-3 px-4 font-bold text-[#7a5b1e]">₹{animatedFin[idx]?.rev || '0.00'} Cr</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">₹{animatedFin[idx]?.profit || '0.00'} Cr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Graph Image Card - Entrance Animated */}
            <div
              className="w-full h-[320px] sm:h-[360px] md:h-[380px] rounded-3xl overflow-hidden border border-[#D6B46A]/30 shadow-sm bg-white p-3 flex items-center justify-center"
              style={{
                opacity: finVisible ? 1 : 0,
                transform: finVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)',
                transition: 'opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s, transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s',
              }}
            >
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Infographic Map Container (Height Matched) */}
            <div className="rounded-3xl overflow-hidden border border-[#D6B46A]/30 shadow-xl bg-white p-4 sm:p-6 h-full flex flex-col justify-center">
              <img
                src="/Bn/uvw3bvpas4howxtcfvp8.webp"
                alt="BN Group Global Presence & Distribution Map"
                className="w-full h-full object-contain rounded-2xl filter drop-shadow-sm"
              />
            </div>

            {/* Single Unified Executive Line Card (Height Matched) */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#D6B46A]/30 shadow-xl h-full flex flex-col justify-between space-y-4">
              
              {/* Section 1: Corporate Offices in India (Golden Background Sub-Container) */}
              <div className="bg-gradient-to-br from-[#D6B46A]/12 via-amber-50/60 to-[#D6B46A]/5 rounded-2xl p-4 sm:p-5 border border-[#D6B46A]/35 shadow-sm hover:border-[#D6B46A]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#D6B46A]/25">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-['Cinzel','Raleway',serif] flex items-center gap-2">
                    <span className="text-[#A8863D]">01.</span> Corporate Offices in India
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D6B46A]/20 text-[#7a5b1e] border border-[#D6B46A]/40">
                    5 Locations
                  </span>
                </div>

                {/* 5 Sleek Thin-Line Location Items */}
                <div className="space-y-2">
                  {[
                    { city: 'New Delhi', role: 'Headquarters' },
                    { city: 'Noida', role: 'Corporate HQ' },
                    { city: 'Indore', role: 'Regional Hub' },
                    { city: 'Agra', role: 'Regional Office' },
                    { city: 'Mumbai', role: 'Commercial Hub' },
                  ].map((loc, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex items-center justify-between text-xs py-0.5">
                        <span className="font-bold text-slate-900 group-hover:text-[#7a5b1e] transition-colors">
                          {loc.city}
                        </span>
                        <span className="text-[11px] text-slate-600 font-medium group-hover:text-slate-950 transition-colors">
                          {loc.role}
                        </span>
                      </div>
                      <div className="w-full h-[1px] bg-[#D6B46A]/30 group-hover:bg-[#D6B46A] transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-0 bg-[#7a5b1e] group-hover:w-full transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: International Offices (Golden Background Sub-Container) */}
              <div className="bg-gradient-to-br from-amber-50/70 via-[#D6B46A]/10 to-stone-50 rounded-2xl p-4 sm:p-5 border border-[#D6B46A]/35 shadow-sm hover:border-[#D6B46A]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#D6B46A]/25">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-['Cinzel','Raleway',serif] flex items-center gap-2">
                    <span className="text-[#A8863D]">02.</span> International Offices
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D6B46A]/20 text-[#7a5b1e] border border-[#D6B46A]/40">
                    5 Countries
                  </span>
                </div>

                {/* 5 Sleek Thin-Line International Location Items */}
                <div className="space-y-2">
                  {[
                    { city: 'London', region: 'UK & Europe' },
                    { city: 'Dubai', region: 'Middle East' },
                    { city: 'Ghana', region: 'West Africa' },
                    { city: 'Tanzania', region: 'East Africa' },
                    { city: 'Singapore', region: 'Asia-Pacific' },
                  ].map((loc, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex items-center justify-between text-xs py-0.5">
                        <span className="font-bold text-slate-900 group-hover:text-[#7a5b1e] transition-colors">
                          {loc.city}
                        </span>
                        <span className="text-[11px] text-slate-600 font-medium group-hover:text-slate-950 transition-colors">
                          {loc.region}
                        </span>
                      </div>
                      <div className="w-full h-[1px] bg-[#D6B46A]/30 group-hover:bg-[#D6B46A] transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-0 bg-[#7a5b1e] group-hover:w-full transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Distribution Network (Golden Background Sub-Container) */}
              <div className="bg-gradient-to-br from-[#D6B46A]/15 via-amber-50/50 to-[#D6B46A]/10 rounded-2xl p-4 sm:p-5 border border-[#D6B46A]/35 shadow-sm hover:border-[#D6B46A]/60 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#D6B46A]/25">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-['Cinzel','Raleway',serif] flex items-center gap-2">
                    <span className="text-[#A8863D]">03.</span> Distribution Network
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-900 border border-emerald-300">
                    Nationwide Reach
                  </span>
                </div>

                {/* 3 Sleek Thin Metric Lines */}
                <div className="space-y-2">
                  {[
                    { label: 'Retail Outlets', val: '100,000+' },
                    { label: 'Authorized Distributors', val: '800+' },
                    { label: 'Carrying & Forwarding Agents (CFAs)', val: '30' },
                  ].map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex items-center justify-between text-xs py-0.5">
                        <span className="font-semibold text-slate-700">{item.label}</span>
                        <span className="font-extrabold text-[#7a5b1e]">{item.val}</span>
                      </div>
                      <div className="w-full h-[1px] bg-[#D6B46A]/30 group-hover:bg-[#D6B46A] transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-0 bg-emerald-600 group-hover:w-full transition-all duration-300" />
                      </div>
                    </div>
                  ))}
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

      {/* Product Portfolio Range - SMOOTH HOVER / CLICK DROP-DOWN REVEAL SECTION */}
      <section id="products-portfolio" className="w-full bg-white border-t-2 border-[#D6B46A]/40 py-10 sm:py-14 shadow-lg mt-10 mb-0">
        <div className="w-full px-3 sm:px-6 md:px-8 lg:px-10 max-w-none">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
              Product Portfolio Range
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Explore our complete range of cooking oils and FMCG products.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          {/* COMPACT CATEGORIES WITH SMOOTH DROP-DOWN REVEAL ON HOVER/CLICK */}
          <div className="space-y-6">
            {portfolioCategories.map((catSection) => {
              const isExpanded = expandedSectionId === catSection.id || pinnedSectionId === catSection.id;

              return (
                <div
                  key={catSection.id}
                  onMouseEnter={() => setExpandedSectionId(catSection.id)}
                  onMouseLeave={() => setExpandedSectionId(null)}
                  className={`rounded-3xl border transition-all duration-500 bg-white overflow-hidden ${
                    isExpanded
                      ? 'border-[#D6B46A] shadow-xl ring-2 ring-[#D6B46A]/20'
                      : 'border-stone-200 hover:border-[#D6B46A]/60 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Category Header Card (Compact View) */}
                  <div
                    onClick={() => {
                      setPinnedSectionId(pinnedSectionId === catSection.id ? null : catSection.id);
                    }}
                    className="p-5 sm:p-6 md:p-8 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-stone-50/80 via-white to-stone-50/50 hover:bg-amber-50/20 transition-colors"
                  >
                    <div className="flex items-center gap-5 flex-1">
                      {/* Hero Image Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-100 border border-stone-200 p-2 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <img
                          src={catSection.heroImg}
                          alt={catSection.title}
                          className="max-h-full max-w-full object-contain filter drop-shadow"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8863D]">
                            {catSection.categoryTag}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D6B46A]/15 text-[#7a5b1e] border border-[#D6B46A]/30">
                            {catSection.countLabel}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mt-1">
                          {catSection.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed hidden sm:block">
                          {catSection.desc}
                        </p>
                      </div>
                    </div>

                    {/* Expand Indicator Button */}
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-[#7a5b1e] border border-[#D6B46A]/40 flex items-center justify-center flex-shrink-0 self-end md:self-auto shadow-sm">
                      <i
                        className={`fas fa-chevron-down text-sm transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-[#D6B46A]' : ''
                        }`}
                      ></i>
                    </div>
                  </div>

                  {/* Drop-Down Hardware-Accelerated Smooth Grid Container */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div className="p-4 sm:p-6 md:p-8 bg-stone-50/70 border-t border-stone-200">
                        
                        {/* Product SKUs Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
                          {catSection.items.map((item) => (
                            <div
                              key={item.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalProduct(item);
                              }}
                              className="bg-white rounded-2xl border border-stone-200 hover:border-[#D6B46A] p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                            >
                              <div>
                                {/* Clean Product Image Container */}
                                <div className="w-full h-40 sm:h-44 rounded-xl bg-stone-50 p-3 flex items-center justify-center relative overflow-hidden border border-stone-100 group-hover:bg-amber-50/20 transition-colors mb-3">
                                  <img
                                    src={item.img}
                                    alt={item.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-full max-w-full object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-105"
                                  />
                                </div>

                              {/* Badges Row */}
                              <div className="flex items-center justify-between gap-1.5 mb-2">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${item.badgeClass}`}>
                                  {item.variant}
                                </span>
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-900 text-white flex-shrink-0">
                                  {item.pack}
                                </span>
                              </div>

                              {/* Title & Description */}
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#7a5b1e] transition-colors leading-tight font-['Cinzel','Raleway',serif]">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px] font-bold text-[#A8863D]">
                              <span>Click to Enlarge</span>
                              <i className="fas fa-search-plus text-xs group-hover:translate-x-0.5 transition-transform"></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

        </div>
      </section>

      {/* LIGHTBOX / ENLARGE IMAGE MODAL */}
      {modalProduct && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#D6B46A]/50 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className="fas fa-times text-sm"></i>
            </button>

            <div className="flex flex-col items-center text-center">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border mb-3 ${modalProduct.badgeClass}`}>
                {modalProduct.variant} • {modalProduct.pack}
              </span>
              <h3 className="text-xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mb-4">
                {modalProduct.name}
              </h3>

              <div className="w-full h-64 sm:h-72 rounded-2xl bg-stone-50 border border-stone-200 p-4 flex items-center justify-center mb-4">
                <img
                  src={modalProduct.img}
                  alt={modalProduct.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xl"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {modalProduct.desc}
              </p>

              <button
                onClick={() => setModalProduct(null)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#b89345] to-[#D6B46A] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
