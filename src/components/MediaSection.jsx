import { useState, useEffect } from 'react';

const mediaData = [
  // Awards & Accolades
  {
    id: 'award-1',
    category: 'Awards & Accolades',
    title: 'Global Excellence Award - UK Parliament',
    subtitle: 'Certificate of Excellence Presented to BN Group at House of Commons, London',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Awards & Accolades/Awards & Accolades 01.png',
  },
  {
    id: 'award-2',
    category: 'Awards & Accolades',
    title: 'Global Indian of the Year 2023',
    subtitle: 'Prestigious Honor Conferred on Group Chairman Anubhav Agarwal',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Awards & Accolades/Awards & Accolades 02.png',
  },
  {
    id: 'award-3',
    category: 'Awards & Accolades',
    title: 'Asia-Africa Business Forum Award 2023',
    subtitle: 'Greatest Brands & Leaders Award at 21st Asian Business & Social Forum',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Awards & Accolades/Awards & Accolades 03.png',
  },
  {
    id: 'award-4',
    category: 'Awards & Accolades',
    title: 'ET Edge Iconic Brands of India 2023',
    subtitle: 'Felicitation for Building Nation-Centric Iconic Enterprise',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Awards & Accolades/Awards & Accolades 04.png',
  },

  // Media Coverage
  {
    id: 'media-1',
    category: 'Media Coverage',
    title: 'ETRetail Feature: Nutrica Launch',
    subtitle: 'BN Group enters wellness & fitness oil category, targeting ₹500 Cr revenue',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Media Coverage/Media Coverage 01.png',
  },
  {
    id: 'media-2',
    category: 'Media Coverage',
    title: 'ET Insights Growth Story',
    subtitle: 'Decade of Innovation, Sustainability & Growth led by MD Anubhav Agarwal',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Media Coverage/Media Coverage 02.png',
  },
  {
    id: 'media-3',
    category: 'Media Coverage',
    title: 'Top 10 Oil Mills in India 2023',
    subtitle: "Industry Outlook Feature on BN Group's Edible Oil Transformation",
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Media Coverage/Media Coverage 03.png',
  },
  {
    id: 'media-4',
    category: 'Media Coverage',
    title: 'Femina Magazine: A Legacy To Behold',
    subtitle: 'Entrepreneurial Vision & Expansion Journey of BN Group Leadership',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Media Coverage/Media Coverage 04.png',
  },
  {
    id: 'media-5',
    category: 'Media Coverage',
    title: "Asia's Greatest Brands 2023",
    subtitle: "Spotlight on BN Group's Industrial Infrastructure & FMCG Legacy",
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Media Coverage/Media Coverage 05.png',
  },
  {
    id: 'media-6',
    category: 'Media Coverage',
    title: 'Business Standard: 10th Foundation Day',
    subtitle: 'BN Group Celebrates Decade Milestone with Major Strategic Announcements',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Media Coverage/Media Coverage 06.png',
  },

  // Nutrica Media Coverage
  {
    id: 'nutrica-1',
    category: 'Nutrica Media Coverage',
    title: 'e4m Feature: Nutrica Ad Campaign',
    subtitle: 'Revolutionary Campaign Challenging Conventional Cooking Oil Norms',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Nutrica Media Coverage/Nutrica Media Coverage 01.png',
  },
  {
    id: 'nutrica-2',
    category: 'Nutrica Media Coverage',
    title: 'Campaign India: Nutrica Commercials',
    subtitle: 'Creative Commercials & Brand Storytelling Highlighted by Campaign India',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Nutrica Media Coverage/Nutrica Media Coverage 02.png',
  },
  {
    id: 'nutrica-3',
    category: 'Nutrica Media Coverage',
    title: 'afaqs! Media Spotlight',
    subtitle: '#JaisaGharWaisaCookingOil Campaign for Wellness Oil Range',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Nutrica Media Coverage/Nutrica Media Coverage 03.png',
  },
  {
    id: 'nutrica-4',
    category: 'Nutrica Media Coverage',
    title: 'Indian Television Feature',
    subtitle: 'Broadcasting Debut & Strategic Media Launch for Nutrica',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Nutrica Media Coverage/Nutrica Media Coverage 04.png',
  },
  {
    id: 'nutrica-5',
    category: 'Nutrica Media Coverage',
    title: 'Storyboard18 Media Feature',
    subtitle: 'BN Group Launches National Ad Campaign for Portfolio Brand Nutrica',
    image: '/OneDrive_2026-08-17 (1)/MEDIA IMAGES/Nutrica Media Coverage/Nutrica Media Coverage 05.png',
  },
];

const categories = ['All Media', 'Awards & Accolades', 'Media Coverage', 'Nutrica Media Coverage'];

export default function MediaSection() {
  const [activeTab, setActiveTab] = useState('All Media');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const allCategoryMedia = activeTab === 'All Media'
    ? mediaData
    : mediaData.filter((item) => item.category === activeTab);

  // Show top 6 items by default, or all items if user clicks Show More
  const displayedMedia = (showAll && allCategoryMedia.length > 6)
    ? allCategoryMedia
    : allCategoryMedia.slice(0, 6);

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setShowAll(false);
  };

  // Auto-switch tabs every 2 seconds (All Media -> Awards & Accolades -> Media Coverage -> Nutrica Media Coverage -> Repeat)
  useEffect(() => {
    if (isPaused || showAll || lightboxIndex !== null) return;

    const timer = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = categories.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % categories.length;
        setShowAll(false);
        return categories[nextIndex];
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused, showAll, lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % displayedMedia.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + displayedMedia.length) % displayedMedia.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % displayedMedia.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + displayedMedia.length) % displayedMedia.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, displayedMedia.length]);

  return (
    <section
      id="media"
      data-animate-card
      data-card-id="media"
      className="scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 w-full pointer-events-auto bg-surface/95 backdrop-blur-xl border-y-2 border-[#D6B46A]/40 py-10 sm:py-14 md:py-16 shadow-xl transition-colors duration-500 my-8 sm:my-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
            Media & Achievements
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-['Noto_Sans','Krub',sans-serif] mt-2 max-w-2xl mx-auto">
            Explore our press coverage, industry awards, and key media highlights representing our continuous commitment to industrial excellence.
          </p>
          <div className="mt-4 mx-auto h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => handleTabChange(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 font-['Noto_Sans','Krub',sans-serif] cursor-pointer ${isActive
                  ? 'bg-gradient-to-r from-[#7a5b1e] via-[#b89345] to-[#D6B46A] text-white shadow-md scale-105 border border-[#D6B46A]'
                  : 'bg-[#FCFAFA] text-slate-700 hover:text-[#A8863D] border border-[#D6B46A]/30 hover:border-[#D6B46A] hover:bg-white'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedMedia.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#D6B46A]/20 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:border-[#D6B46A] cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 bg-stone-50 overflow-hidden flex items-center justify-center p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />


              </div>

              {/* Text Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#A8863D] font-['Noto_Sans','Krub',sans-serif]">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 font-['Google_Sans','Montserrat',sans-serif] group-hover:text-[#A8863D] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-['Noto_Sans','Krub',sans-serif] mt-1.5 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#A8863D] font-['Noto_Sans','Krub',sans-serif] group-hover:underline flex items-center gap-1">
                    View Feature <i className="fas fa-arrow-right text-[10px]"></i>
                  </span>
                  <span className="text-[10px] text-slate-400 font-['Noto_Sans','Krub',sans-serif]">AAG Media</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {allCategoryMedia.length > 6 && (
          <div className="mt-8 sm:mt-10 text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#b89345] to-[#D6B46A] text-white font-semibold text-xs sm:text-sm font-['Noto_Sans','Krub',sans-serif] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-[#D6B46A]"
            >
              <span>{showAll ? 'Show Less' : 'Show More'}</span>
              <i className={`fas ${showAll ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white text-3xl font-light cursor-pointer z-50 p-2 transition-colors"
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Previous Arrow */}
          {displayedMedia.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-3 cursor-pointer z-50 transition-colors"
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          {/* Image */}
          <div
            className="relative flex items-center justify-center max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayedMedia[lightboxIndex].image}
              alt={displayedMedia[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl select-none"
            />
          </div>

          {/* Next Arrow */}
          {displayedMedia.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-3 cursor-pointer z-50 transition-colors"
              aria-label="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
