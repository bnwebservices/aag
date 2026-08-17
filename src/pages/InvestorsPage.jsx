import React, { useState } from 'react';

function BankLogoItem({ bank }) {
  const primaryUrl = bank.logo ? encodeURI(bank.logo) : '';
  const [imgSrc, setImgSrc] = useState(primaryUrl);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setImgSrc(bank.logo ? encodeURI(bank.logo) : '');
    setHasError(false);
  }, [bank.logo]);

  const handleError = () => {
    if (imgSrc === encodeURI(bank.logo) && bank.fallbackLogo) {
      setImgSrc(encodeURI(bank.fallbackLogo));
    } else if (bank.domain && !imgSrc.includes('favicons')) {
      setImgSrc(`https://www.google.com/s2/favicons?domain=${bank.domain}&sz=128`);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="flex-shrink-0 mx-3 sm:mx-5 group">
      <div className="h-24 sm:h-28 px-6 py-4 bg-white rounded-2xl border border-[#D6B46A]/30 shadow-md hover:shadow-xl hover:border-[#D6B46A] transition-all duration-300 flex items-center justify-center min-w-[190px] sm:min-w-[230px]">
        {!hasError ? (
          <img
            src={imgSrc}
            alt={`${bank.name} logo`}
            onError={handleError}
            className="max-h-16 sm:max-h-20 max-w-[170px] sm:max-w-[200px] object-contain group-hover:scale-110 transition-all duration-300 filter drop-shadow-xs"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7a5b1e] to-[#D6B46A] text-white font-bold text-base flex items-center justify-center shadow-md">
            {bank.short}
          </div>
        )}
      </div>
    </div>
  );
}

export default function InvestorsPage() {
  const investors = [
    {
      name: 'Siddhant Commercial Pvt Ltd',
      role: 'Strategic Equity Investor',
      badge: 'Private Equity'
    },
    {
      name: 'Global Focus Fund',
      role: 'Institutional Global Fund',
      badge: 'Global Capital',
      logo: '/Bank Logo/GFF new logo.png'
    },
    {
      name: 'Plentitude',
      role: 'Strategic Investment Partner',
      badge: 'Strategic Growth',
      logo: '/Bank Logo/plentitude.jpg'
    },
    {
      name: 'Prosperitas Capital Pte. Ltd.',
      role: 'Singapore Institutional Investor',
      badge: 'International Equity',
      logo: '/Bank Logo/prosperitas.png'
    },
  ];

  const bankingPartners = [
    {
      name: 'State Bank of India (SBI)',
      short: 'SBI',
      domain: 'sbi.co.in',
      logo: '/Bank Logo/SBI_!.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/State_Bank_of_India_logo.svg',
    },
    {
      name: 'Bank of Baroda',
      short: 'BOB',
      domain: 'bankofbaroda.in',
      logo: '/Bank Logo/BOB.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Bank_of_Baroda_Logo.svg',
    },
    {
      name: 'Punjab National Bank (PNB)',
      short: 'PNB',
      domain: 'pnbindia.in',
      logo: '/Bank Logo/PNB.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Punjab_National_Bank_logo.svg',
    },
    {
      name: 'Union Bank of India',
      short: 'UBI',
      domain: 'unionbankofindia.co.in',
      logo: '/Bank Logo/UBI_1.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Union_Bank_of_India_logo.svg',
    },
    {
      name: 'Indian Overseas Bank',
      short: 'IOB',
      domain: 'iob.in',
      logo: '/Bank Logo/IOB_1.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Indian_Overseas_Bank_logo.svg',
    },
    {
      name: 'UCO Bank',
      short: 'UCO',
      domain: 'ucobank.com',
      logo: '/Bank Logo/UCO.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/UCO_Bank_logo.svg',
    },
    {
      name: 'IDBI Bank',
      short: 'IDBI',
      domain: 'idbibank.in',
      logo: '/Bank Logo/IDBI.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/IDBI_Bank_logo.svg',
    },
    {
      name: 'IREDA',
      short: 'IREDA',
      domain: 'ireda.in',
      logo: '/Bank Logo/IREDA.jpg',
      fallbackLogo: 'https://logo.clearbit.com/ireda.in',
    },
    {
      name: 'Bank of Maharashtra',
      short: 'BOM',
      domain: 'bankofmaharashtra.in',
      logo: '/Bank Logo/BOMa.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Bank_of_Maharashtra_logo.svg',
    },
    {
      name: 'Axis Bank',
      short: 'AXIS',
      domain: 'axisbank.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg',
      fallbackLogo: 'https://logo.clearbit.com/axisbank.com',
    },
    {
      name: 'Karnataka Bank',
      short: 'KBL',
      domain: 'karnatakabank.com',
      logo: '/Bank Logo/Karnataka.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Karnataka_Bank_logo.svg',
    },
    {
      name: 'Jana Small Finance Bank',
      short: 'JANA',
      domain: 'janabank.com',
      logo: '/Bank Logo/Jana.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Jana_Small_Finance_Bank_logo.svg',
    },
    {
      name: 'Yes Bank',
      short: 'YES',
      domain: 'yesbank.in',
      logo: '/Bank Logo/Yes_!.png',
      fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Yes_Bank_logo.svg',
    },
  ];

  const treDSPlatforms = [
    {
      name: 'RXIL (NSE - SIDBI JV)',
      desc: 'Receivables Exchange of India Limited for seamless working capital liquidity.',
      domain: 'rxil.in',
      logo: '/Bank Logo/rxil.jpeg',
      fallbackLogo: 'https://logo.clearbit.com/rxil.in'
    },
    {
      name: 'M1 Exchange',
      desc: 'Leading TReDS platform powering supply chain finance across corporate networks.',
      domain: 'm1xchange.com',
      logo: '/Bank Logo/m1.jpeg',
      fallbackLogo: 'https://logo.clearbit.com/m1xchange.com'
    },
    {
      name: 'TReDS',
      desc: 'RBI-regulated trade receivables discounting platform.',
      domain: 'invoicemart.com',
      logo: '/Bank Logo/treds.jpeg',
      fallbackLogo: 'https://logo.clearbit.com/invoicemart.com'
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-['Manrope'] pb-0">
      
      {/* Hero Header Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 border-b-2 border-[#D6B46A]/40 shadow-2xl">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
            Our Investors & Banking Partners
          </h1>
          <p className="text-stone-300 text-sm sm:text-base md:text-lg mt-4 max-w-3xl mx-auto leading-relaxed font-['Manrope']">
            Supported by global institutional investors, leading Indian public & private banks, and credit rating "A" governance frameworks.
          </p>
        </div>
      </section>

      {/* Institutional Investors */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 my-12">
        <section className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
              Institutional Equity Investors
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Backed by prominent private equity and strategic global funds.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {investors.map((inv, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
                <div>
                  {inv.logo && (
                    <div className="h-16 w-full mb-3 flex items-center justify-center">
                      <img
                        src={encodeURI(inv.logo)}
                        alt={`${inv.name} logo`}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        className="max-h-14 max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 font-['Cinzel','Raleway',serif] mt-1 group-hover:text-[#7a5b1e] transition-colors">{inv.name}</h3>
                  <p className="text-xs text-slate-600 mt-1">{inv.role}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#7a5b1e] font-semibold">
                  <span>Capital Partner</span>
                  <i className="fas fa-[#D6B46A] fa-handshake"></i>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Banking Partners Network - EDGE TO EDGE FULL WINDOW WIDTH ANIMATED MARQUEE */}
      <section className="w-full bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y-2 border-[#D6B46A]/40 py-12 sm:py-16 shadow-xl my-12 overflow-hidden">
        <div className="w-full text-center mb-8 px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8863D]">Robust Banking Relationships</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] text-slate-900 mt-1">
            Our Premier Banking Partners
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Strong credit relationships with India's leading public sector, private sector, and renewable energy development banks.
          </p>
          <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
        </div>

        {/* Continuous Smooth Horizontal Marquee */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Side Fading Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee Container */}
          <div className="animate-marquee-running flex items-center">
            {[...bankingPartners, ...bankingPartners, ...bankingPartners].map((bank, idx) => (
              <BankLogoItem key={idx} bank={bank} />
            ))}
          </div>
        </div>
      </section>

      {/* TReDS Supply Chain Platforms */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 my-12">
        <section className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel','Raleway',serif] gold-gradient-text">
              Trade Receivable Discounting Platforms
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Ensuring rapid working capital liquidity across vendor networks.
            </p>
            <div className="mt-3 mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treDSPlatforms.map((tred, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-[#D6B46A]/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
                <div>
                  <div className="h-24 sm:h-28 w-full mb-4 flex items-center justify-center p-3 bg-stone-50/60 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-[#D6B46A]/40 transition-colors">
                    <img
                      src={encodeURI(tred.logo)}
                      alt={`${tred.name} logo`}
                      onError={(e) => {
                        if (tred.fallbackLogo && e.currentTarget.src !== encodeURI(tred.fallbackLogo)) {
                          e.currentTarget.src = encodeURI(tred.fallbackLogo);
                        } else {
                          e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${tred.domain}&sz=128`;
                        }
                      }}
                      className="max-h-16 sm:max-h-20 max-w-[85%] object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Cinzel','Raleway',serif] group-hover:text-[#7a5b1e] transition-colors">{tred.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{tred.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#7a5b1e] font-semibold">
                  <span>Supply Chain Liquidity</span>
                  <i className="fas fa-file-invoice-dollar text-[#D6B46A]"></i>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
