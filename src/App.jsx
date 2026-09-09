import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aagImageBg from './assets/AAG_image_bg.png';
import anubhavSirMessageImg from './assets/Anubhavsir_imageformessage.png';
import BnAgrochemPage from './pages/BnAgrochemPage';
import AgastyaPage from './pages/AgastyaPage';
import AboutPage from './pages/AboutPage';
import InvestorsPage from './pages/InvestorsPage';
import MediaPage from './pages/MediaPage';

const companyStatistics = [
  { value: '11.3k Crore+', label: 'Group turnover in FY 26' },
  { value: '750+', label: 'Group employees' },
  { value: '1.20 Lakhs+', label: 'Retail touch points' },
  { value: '20mn', label: 'Lives touched' },
  { value: '30k Crore+', label: 'Project pipeline' },
];

function StatisticsSection({ scrollContainerRef }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const numbersSectionRef = useRef(null);
  const trackRef = useRef(null);
  const taglineRef = useRef(null);
  const progressDotsRef = useRef(null);
  const splitGridRef = useRef(null);
  const leftCardFlipperRef = useRef(null);
  const rightCardFlipperRef = useRef(null);
  const laserBeamRef = useRef(null);
  const waveThreadRef = useRef(null);
  const wavePathRef = useRef(null);
  const glowPathRef = useRef(null);
  const leadDotRef = useRef(null);
  const startDotRef = useRef(null);
  const bridgeDotRef = useRef(null);
  const endDotRef = useRef(null);
  const pathLengthRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const numbersSection = numbersSectionRef.current;
    const track = trackRef.current;
    const tagline = taglineRef.current;
    const progressDots = progressDotsRef.current;
    const splitGrid = splitGridRef.current;
    const leftCard = leftCardFlipperRef.current;
    const rightCard = rightCardFlipperRef.current;
    const laserBeam = laserBeamRef.current;
    const waveThread = waveThreadRef.current;
    const wavePath = wavePathRef.current;
    const glowPath = glowPathRef.current;
    const leadDot = leadDotRef.current;
    const startDot = startDotRef.current;
    const bridgeDot = bridgeDotRef.current;
    const endDot = endDotRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !sticky || !track || !tagline || !scrollContainer) return;

    const cards = track.querySelectorAll('[data-stat-card]');
    const dots = progressDots?.querySelectorAll('[data-stat-dot]');
    if (!cards.length) return;

    const totalCards = cards.length;

    let currentProgress = 0;
    let targetProgress = 0;
    let rafId;

    const getScrollDistance = () => {
      const parentWidth = track.parentElement?.offsetWidth || 0;
      return Math.max(0, track.scrollWidth - parentWidth);
    };

    // Precompute / cache path length safely
    if (wavePath && typeof wavePath.getTotalLength === 'function') {
      try {
        const len = wavePath.getTotalLength();
        if (len > 0) {
          pathLengthRef.current = len;
          wavePath.style.strokeDasharray = `${len}`;
          wavePath.style.strokeDashoffset = `${len}`;
          if (glowPath) {
            glowPath.style.strokeDasharray = `${len}`;
            glowPath.style.strokeDashoffset = `${len}`;
          }
        }
      } catch (err) {
        pathLengthRef.current = 2400;
      }
    }

    const updateAnimation = () => {
      rafId = requestAnimationFrame(updateAnimation);

      currentProgress += (targetProgress - currentProgress) * 0.18;
      if (Math.abs(targetProgress - currentProgress) < 0.0004) {
        currentProgress = targetProgress;
      }

      const p = Math.max(0, Math.min(1, currentProgress));

      // PHASE 1 (0.00 -> 0.28): Numbers Horizontal Scroll & Tagline Reveal
      const cardProgress = Math.min(1, p / 0.20);
      const scrollDistance = getScrollDistance();
      const xMove = -scrollDistance * cardProgress;
      track.style.transform = `translate3d(${xMove}px, 0, 0)`;

      cards.forEach((card, i) => {
        const focusPoint = i / (totalCards - 1);
        const dist = Math.abs(cardProgress - focusPoint);
        const focusStrength = Math.max(0, 1 - dist * 3.5);
        const s = 0.90 + focusStrength * 0.10;
        const o = 0.45 + focusStrength * 0.55;
        card.style.transform = `scale(${s})`;
        card.style.opacity = o;
      });

      if (dots?.length) {
        dots.forEach((dot, i) => {
          const focusPoint = i / (totalCards - 1);
          const dist = Math.abs(cardProgress - focusPoint);
          const focusStrength = Math.max(0, 1 - dist * 3.5);
          dot.style.transform = `scaleX(${1 + focusStrength * 1.5})`;
          dot.style.opacity = 0.3 + focusStrength * 0.7;
          dot.style.backgroundColor = focusStrength > 0.5 ? '#A8863D' : '#D6B46A';
        });
      }

      // Tagline appears at (0.20 -> 0.28)
      const taglineIn = Math.min(1, Math.max(0, (p - 0.20) / 0.08));
      const fadeOutNumbers = Math.min(1, Math.max(0, (p - 0.28) / 0.16));
      const taglineOpacity = taglineIn * (1 - fadeOutNumbers);
      tagline.style.opacity = taglineOpacity.toString();
      tagline.style.transform = `translate3d(0, ${(1 - taglineIn) * 12}px, 0)`;

      // PHASE 2 (0.28 -> 0.55): Smooth 3D Transition from Numbers to Vision & Mission Cards
      const numbersOpacity = Math.max(0, 1 - fadeOutNumbers * 1.6);
      if (numbersSection) {
        numbersSection.style.opacity = numbersOpacity.toString();
        numbersSection.style.pointerEvents = numbersOpacity <= 0.05 ? 'none' : 'auto';
        numbersSection.style.transform = `scale(${1 - fadeOutNumbers * 0.05}) translate3d(0, ${-fadeOutNumbers * 16}px, 0)`;
        numbersSection.style.display = numbersOpacity <= 0.001 ? 'none' : 'block';
      }

      const enterProgress = Math.min(1, Math.max(0, (p - 0.28) / 0.24));
      if (splitGrid) {
        if (enterProgress <= 0.001) {
          splitGrid.style.opacity = '0';
          splitGrid.style.pointerEvents = 'none';
          splitGrid.style.display = 'none';
        } else {
          splitGrid.style.display = 'flex';
          const gridOpacity = Math.min(1, enterProgress * 2.0);
          splitGrid.style.opacity = gridOpacity.toString();
          splitGrid.style.pointerEvents = enterProgress >= 0.85 ? 'auto' : 'none';
        }
      }

      // Center Laser Beam Flash
      if (laserBeam) {
        if (enterProgress > 0 && enterProgress < 1) {
          const beamIntensity = Math.sin(enterProgress * Math.PI);
          laserBeam.style.opacity = (beamIntensity * 0.95).toString();
          laserBeam.style.transform = `scaleY(${Math.max(0.1, enterProgress)})`;
        } else {
          laserBeam.style.opacity = '0';
        }
      }

      // 3D glide into place for Vision & Mission cards
      if (leftCard && rightCard) {
        const isMobile = window.innerWidth < 768;
        const spreadX = isMobile ? 0 : (1 - enterProgress) * 32;
        const spreadY = isMobile ? (1 - enterProgress) * 16 : 0;
        const tiltAngle = (1 - enterProgress) * 10;

        leftCard.style.transform = `translate3d(${-spreadX}px, ${spreadY}px, 0) perspective(1200px) rotateY(${-tiltAngle}deg)`;
        rightCard.style.transform = `translate3d(${spreadX}px, ${spreadY}px, 0) perspective(1200px) rotateY(${tiltAngle}deg)`;
      }

      // PHASE 3 (0.58 -> 0.92): Cards are 100% SETTLED -> User scrolls to DRAW Golden Boundary Thread
      const drawProgress = Math.min(1, Math.max(0, (p - 0.58) / 0.32));

      if (waveThread && wavePath && glowPath) {
        let totalLength = pathLengthRef.current;
        if (!totalLength && typeof wavePath.getTotalLength === 'function') {
          try {
            totalLength = wavePath.getTotalLength();
            pathLengthRef.current = totalLength;
          } catch (e) {
            totalLength = 2400;
          }
        }
        if (!totalLength) totalLength = 2400;

        if (drawProgress <= 0.005) {
          waveThread.style.opacity = '0';
          wavePath.style.strokeDasharray = `${totalLength}`;
          wavePath.style.strokeDashoffset = `${totalLength}`;
          glowPath.style.strokeDasharray = `${totalLength}`;
          glowPath.style.strokeDashoffset = `${totalLength}`;
          if (leadDot) leadDot.style.opacity = '0';
          if (startDot) startDot.style.opacity = '0';
          if (bridgeDot) bridgeDot.style.opacity = '0';
          if (endDot) endDot.style.opacity = '0';
        } else {
          waveThread.style.opacity = '1';
          const drawnLength = totalLength * drawProgress;
          const offset = Math.max(0, totalLength - drawnLength);
          wavePath.style.strokeDasharray = `${totalLength}`;
          wavePath.style.strokeDashoffset = `${offset}`;
          glowPath.style.strokeDasharray = `${totalLength}`;
          glowPath.style.strokeDashoffset = `${offset}`;

          if (startDot) startDot.style.opacity = drawProgress >= 0.02 ? '1' : '0';
          if (bridgeDot) bridgeDot.style.opacity = drawProgress >= 0.52 ? '1' : '0';
          if (endDot) endDot.style.opacity = drawProgress >= 0.98 ? '1' : '0';

          if (leadDot && typeof wavePath.getPointAtLength === 'function') {
            try {
              if (drawProgress > 0.005 && drawProgress < 0.995) {
                leadDot.style.opacity = '1';
                const pt = wavePath.getPointAtLength(Math.min(totalLength, Math.max(0, drawnLength)));
                if (pt && !isNaN(pt.x) && !isNaN(pt.y)) {
                  leadDot.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
                }
              } else {
                leadDot.style.opacity = '0';
              }
            } catch (err) {
              leadDot.style.opacity = '0';
            }
          }
        }
      }

      // PHASE 4 (0.92 -> 1.00): Settle & Hold Stationary for Reading
    };

    const onScroll = () => {
      const sectionTop = section.offsetTop;
      const stickyHeight = sticky.offsetHeight;
      const sectionHeight = section.offsetHeight;
      const travelDistance = sectionHeight - stickyHeight;

      if (travelDistance <= 0) {
        targetProgress = 0;
        return;
      }

      const scrolled = scrollContainer.scrollTop - sectionTop;
      targetProgress = Math.max(0, Math.min(1, scrolled / travelDistance));
    };

    // Initial styles
    tagline.style.opacity = '0';
    tagline.style.transform = 'translate3d(0, 12px, 0)';

    cards.forEach((card, i) => {
      card.style.opacity = i === 0 ? '1' : '0.45';
      card.style.transform = i === 0 ? 'scale(1)' : 'scale(0.90)';
    });

    if (numbersSection) {
      numbersSection.style.opacity = '1';
      numbersSection.style.display = 'block';
    }
    if (splitGrid) {
      splitGrid.style.opacity = '0';
      splitGrid.style.display = 'none';
    }
    if (waveThread) {
      waveThread.style.opacity = '0';
    }

    rafId = requestAnimationFrame(updateAnimation);
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      scrollContainer.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrollContainerRef, reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="w-full px-3 sm:px-6 md:px-4 py-8">
        <div className="bg-surface backdrop-blur-lg rounded-[24px] sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-[#D6B46A]/35 shadow-[0_20px_60px_-15px_rgba(214,180,106,0.14)]">
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">AAG in numbers</h2>
            <div className="mt-2 mx-auto h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {companyStatistics.map((statistic) => (
              <div key={statistic.label} className="rounded-[20px] border border-[#D6B46A]/30 bg-white/95 p-6 shadow-[0_16px_35px_rgba(35,28,18,0.08)]">
                <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#A8863D] to-[#D6B46A] mb-4" />
                <p className="text-3xl font-bold tracking-tight text-[#7a5b1e] font-['Google_Sans','Montserrat',sans-serif]">{statistic.value}</p>
                <p className="mt-3 text-xs sm:text-sm leading-6 text-slate-600 font-['Noto_Sans','Krub',sans-serif]">{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full relative px-3 sm:px-6 md:px-4" style={{ height: '480vh' }}>
      {/* Sticky viewport container */}
      <div ref={stickyRef} className="sticky top-0 w-full overflow-hidden flex flex-col justify-center py-4" style={{ minHeight: 'calc(100vh - 5.5rem)' }}>
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[480px] sm:min-h-[540px]">

          {/* 1. AAG IN NUMBERS SECTION CARD */}
          <div
            ref={numbersSectionRef}
            className="w-full bg-surface/95 backdrop-blur-xl rounded-[24px] sm:rounded-3xl p-5 sm:p-7 md:p-9 border border-[#D6B46A]/35 shadow-[0_20px_60px_-15px_rgba(214,180,106,0.14)] relative overflow-hidden z-10"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D6B46A]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#D6B46A]/10 blur-3xl" />

            {/* Header */}
            <div className="mb-4 text-center sm:mb-6 relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
                AAG in numbers
              </h2>
              <div className="mt-2 mx-auto h-[2.5px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
            </div>

            {/* Horizontal scroll track area */}
            <div className="relative overflow-hidden mx-auto max-w-5xl rounded-2xl py-2">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-px bg-gradient-to-r from-transparent via-[#D6B46A]/40 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />

              {/* Horizontal Track */}
              <div
                ref={trackRef}
                className="flex gap-5 sm:gap-7 py-4 sm:py-6"
                style={{
                  paddingLeft: 'calc(50% - min(36vw, 12.5rem))',
                  paddingRight: 'calc(50% - min(36vw, 12.5rem))',
                  willChange: 'transform',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                {companyStatistics.map((statistic) => (
                  <div
                    key={statistic.label}
                    data-stat-card
                    className="flex-shrink-0 w-[min(72vw,25rem)] rounded-[22px] border border-[#D6B46A]/35 bg-white p-6 sm:p-7 shadow-[0_16px_35px_rgba(35,28,18,0.08)] backdrop-blur-sm transition-all duration-200 relative overflow-hidden"
                    style={{ willChange: 'transform, opacity', transform: 'scale(0.90)', opacity: 0.45 }}
                  >
                    <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#A8863D] to-[#D6B46A] mb-5" />
                    <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#7a5b1e] font-['Google_Sans','Montserrat',sans-serif]">
                      {statistic.value}
                    </p>
                    <p className="mt-3 text-sm sm:text-base font-medium leading-6 text-slate-700 font-['Noto_Sans','Krub',sans-serif]">
                      {statistic.label}
                    </p>
                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8863D]">
                      AAG in numbers
                    </p>
                  </div>
                ))}
              </div>

              {/* Tagline Overlay */}
              <div
                ref={taglineRef}
                className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-white/95 backdrop-blur-sm px-6 text-center rounded-2xl"
                style={{ willChange: 'transform, opacity', opacity: 0 }}
              >
                <div className="max-w-2xl px-4">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight gold-gradient-text font-['Google_Sans','Montserrat',sans-serif] leading-snug">
                    Building enduring enterprises, powering India
                  </p>
                  <div className="mt-4 mx-auto h-[2.5px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div ref={progressDotsRef} className="mt-4 sm:mt-5 flex items-center justify-center gap-2" aria-hidden="true">
              {companyStatistics.map((statistic) => (
                <span
                  key={`dot-${statistic.label}`}
                  data-stat-dot
                  className="h-1.5 w-5 rounded-full bg-[#D6B46A] origin-center transition-all duration-150"
                  style={{ willChange: 'transform, opacity' }}
                />
              ))}
            </div>

          </div>

          {/* 2. SPLIT TWO-CARD DECK (Left: Our Vision | Right: Our Mission) */}
          <div
            ref={splitGridRef}
            className="absolute inset-0 w-full max-w-6xl mx-auto flex items-center justify-center z-30"
            style={{ willChange: 'opacity', pointerEvents: 'none', display: 'none' }}
          >
            {/* Center Laser Divider Line */}
            <div
              ref={laserBeamRef}
              className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D6B46A] via-white to-transparent shadow-[0_0_15px_#D6B46A] z-40 hidden md:block"
              style={{ willChange: 'transform, opacity', opacity: 0 }}
            />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative z-10">

              {/* Continuous Animated Golden Wave Thread hugging Vision & Mission card boundaries */}
              <div
                ref={waveThreadRef}
                className="pointer-events-none absolute inset-0 w-full h-full z-50 hidden md:block"
                style={{ willChange: 'opacity', opacity: 0 }}
              >
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 1000 440"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="waveThreadGold" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7a5b1e" />
                      <stop offset="25%" stopColor="#D6B46A" />
                      <stop offset="50%" stopColor="#FFF2D6" />
                      <stop offset="75%" stopColor="#D6B46A" />
                      <stop offset="100%" stopColor="#8f6e27" />
                    </linearGradient>
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="softWideGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                    </filter>
                  </defs>

                  {/* Soft wide background glow */}
                  <path
                    ref={glowPathRef}
                    d="M 2 414 L 2 26 A 24 24 0 0 1 26 2 L 458 2 A 24 24 0 0 1 482 26 L 482 414 C 482 432, 496 438, 518 438 L 974 438 C 988 438, 998 450, 998 476 L 998 510"
                    stroke="#D6B46A"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.25"
                    filter="url(#softWideGlow)"
                  />

                  {/* Main Crisp Golden Wave Thread */}
                  <path
                    ref={wavePathRef}
                    d="M 2 414 L 2 26 A 24 24 0 0 1 26 2 L 458 2 A 24 24 0 0 1 482 26 L 482 414 C 482 432, 496 438, 518 438 L 974 438 C 988 438, 998 450, 998 476 L 998 510"
                    stroke="url(#waveThreadGold)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#goldGlow)"
                  />

                  {/* Start node */}
                  <g ref={startDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
                    <circle cx="2" cy="414" r="5.5" fill="#D6B46A" filter="url(#goldGlow)" />
                    <circle cx="2" cy="414" r="3" fill="#FFFFFF" />
                  </g>

                  {/* Bridge node */}
                  <g ref={bridgeDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
                    <circle cx="518" cy="438" r="5" fill="#D6B46A" filter="url(#goldGlow)" />
                    <circle cx="518" cy="438" r="2.5" fill="#FFFFFF" />
                  </g>

                  {/* End node (Top-Right corner of next AAG Companies section) */}
                  <g ref={endDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
                    <circle cx="998" cy="510" r="5.5" fill="#D6B46A" filter="url(#goldGlow)" />
                    <circle cx="998" cy="510" r="3" fill="#FFFFFF" />
                  </g>

                  {/* Dynamic Leading Head */}
                  <g ref={leadDotRef} style={{ opacity: 0 }}>
                    <circle r="9" fill="#D6B46A" opacity="0.45" filter="url(#goldGlow)" />
                    <circle r="5.5" fill="#D6B46A" filter="url(#goldGlow)" />
                    <circle r="2.8" fill="#FFFFFF" />
                  </g>
                </svg>
              </div>

              {/* Left Card: OUR VISION */}
              <div
                ref={leftCardFlipperRef}
                className="w-full h-full min-h-[380px] sm:min-h-[420px] rounded-[24px] sm:rounded-3xl border-2 border-[#D6B46A]/45 bg-gradient-to-br from-[#ffffff] via-[#fffdfa] to-[#faf6ec] p-6 sm:p-9 shadow-[0_20px_50px_-10px_rgba(214,180,106,0.25)] flex flex-col justify-center overflow-hidden relative"
                style={{ willChange: 'transform' }}
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] to-[#8f6e27]" />

                <div>
                  {/* Header */}
                  <div className="pb-4 sm:pb-5 border-b border-[#D6B46A]/20">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
                      Our Vision
                    </h3>
                    <div className="mt-2 h-[2.5px] w-16 rounded-full bg-gradient-to-r from-[#A8863D] to-[#D6B46A]" />
                  </div>

                  {/* Statement Body */}
                  <div className="pt-6 sm:pt-8">
                    <p className="text-base sm:text-[17px] md:text-[19px] text-slate-800 leading-relaxed sm:leading-9 font-medium font-['Noto_Sans','Krub',sans-serif]">
                      To build a <strong className="text-slate-950 font-bold">healthier, prosperous and sustainable world</strong> through innovative and robust enterprises powered by <strong className="text-[#7a5b1e] font-bold">globally competitive trusted ecosystems</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Card: OUR MISSION */}
              <div
                ref={rightCardFlipperRef}
                className="w-full h-full min-h-[380px] sm:min-h-[420px] rounded-[24px] sm:rounded-3xl border-2 border-[#D6B46A]/45 bg-gradient-to-br from-[#ffffff] via-[#fffdfa] to-[#faf6ec] p-6 sm:p-9 shadow-[0_20px_50px_-10px_rgba(214,180,106,0.25)] flex flex-col justify-center overflow-hidden relative"
                style={{ willChange: 'transform' }}
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] to-[#8f6e27]" />

                <div>
                  {/* Header */}
                  <div className="pb-4 sm:pb-5 border-b border-[#D6B46A]/20">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
                      Our Mission
                    </h3>
                    <div className="mt-2 h-[2.5px] w-16 rounded-full bg-gradient-to-r from-[#A8863D] to-[#D6B46A]" />
                  </div>

                  {/* Statement Body */}
                  <div className="pt-5 sm:pt-6">
                    <p className="text-sm sm:text-[15px] md:text-[16px] text-slate-700 leading-relaxed sm:leading-8 font-normal font-['Noto_Sans','Krub',sans-serif]">
                      By 2035, to build and scale <strong className="text-slate-900 font-semibold">globally competitive enterprises</strong> that secure a 10% share of India’s edible oil market, establish a 10 GW renewable energy portfolio, advance India’s semiconductor capabilities, and create world-class industrial ecosystems that attract global manufacturers, technology and talent to India, enabling people and enterprises to thrive sustainably.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ChairmanMessageSection({ scrollContainerRef }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const bioContainerRef = useRef(null);
  const bulletsContainerRef = useRef(null);
  const wordsRef = useRef([]);
  const bulletItemsRef = useRef([]);
  const leadCursorRef = useRef(null);
  const imageRef = useRef(null);
  const goldenCardRef = useRef(null);
  const isCardDroppedRef = useRef(false);
  const waveThreadRef = useRef(null);
  const wavePathRef = useRef(null);
  const glowPathRef = useRef(null);
  const startDotRef = useRef(null);
  const endDotRef = useRef(null);
  const leadDotRef = useRef(null);
  const pathLengthRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const bioText = "Anubhav Agarwal is the Founder and Chairman of AAG, building next-generation industrial ecosystems and enabling long-term economic growth. Since 2011, he has led the growth of diversified enterprises spanning Agribusiness, FMCG, Renewable energy, Infrastructure, and Industrial development, transforming into a multi-industry portfolio with a strong national presence and an expanding international footprint.";

  const bioWords = bioText.split(' ');

  const bulletPoints = [
    "Visionary entrepreneur and institution builder driving investments across essential sectors, including clean energy and advanced industrial platforms.",
    "Focused on building sustainable, globally competitive enterprises.",
    "Honoured with the Global Indian of the Year 2023 award for his contribution to entrepreneurship and business excellence.",
    "Contributes to employment-driven economic progress, self-reliance, and reduced import dependence.",
    "Recognised as a next-generation business leader, shaping the future of industry through, innovation, economies of scale & scope, and industrial development for long-term value creation."
  ];

  // Highlights keywords with gold emphasis
  const isKeyWord = (w) => {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    return ['founder', 'chairman', 'aag', 'agribusiness', 'fmcg', 'renewable', 'energy', 'infrastructure', 'industrial', 'global', 'indian', '2023', 'sustainable'].includes(clean);
  };

  useEffect(() => {
    if (reducedMotion) {
      if (bioContainerRef.current) {
        bioContainerRef.current.style.display = 'none';
      }
      if (bulletsContainerRef.current) {
        bulletsContainerRef.current.style.display = 'flex';
        bulletsContainerRef.current.style.opacity = '1';
      }
      if (goldenCardRef.current) {
        gsap.set(goldenCardRef.current, { y: 0, opacity: 1, scale: 1 });
      }
      bulletItemsRef.current.forEach((b) => {
        if (b) {
          b.style.opacity = '1';
          b.style.transform = 'none';
        }
      });
      return;
    }

    if (goldenCardRef.current) {
      gsap.set(goldenCardRef.current, {
        y: -150,
        opacity: 0,
        scale: 0.88,
        transformOrigin: '50% 15%'
      });
    }

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const bioContainer = bioContainerRef.current;
    const bulletsContainer = bulletsContainerRef.current;
    const scrollContainer = scrollContainerRef?.current;
    if (!section || !sticky || !scrollContainer) return;

    let currentP = 0;
    let targetP = 0;
    let rafId;

    const updatePrintAnimation = () => {
      rafId = requestAnimationFrame(updatePrintAnimation);

      currentP += (targetP - currentP) * 0.18;
      if (Math.abs(targetP - currentP) < 0.0004) {
        currentP = targetP;
      }

      const p = Math.max(0, Math.min(1, currentP));

      // Left Image parallax & glow
      if (imageRef.current) {
        const imgScale = 0.96 + p * 0.04;
        imageRef.current.style.transform = `scale(${imgScale})`;
      }

      // PHASE 1 (0.00 -> 0.32): Bio Paragraph Word-by-Word Typewriter Print
      const totalWords = bioWords.length;
      const wordProgress = Math.min(1, Math.max(0, p / 0.30));

      wordsRef.current.forEach((wEl, idx) => {
        if (!wEl) return;
        const wordThreshold = idx / totalWords;
        if (wordProgress >= wordThreshold) {
          wEl.style.opacity = '1';
          wEl.style.color = isKeyWord(bioWords[idx]) ? '#7a5b1e' : '#0f172a';
          wEl.style.fontWeight = isKeyWord(bioWords[idx]) ? '700' : '500';
          wEl.style.transform = 'translateY(0px)';
        } else {
          wEl.style.opacity = '0.18';
          wEl.style.color = '#94a3b8';
          wEl.style.fontWeight = '400';
          wEl.style.transform = 'translateY(2px)';
        }
      });

      // Active gold typing cursor
      if (leadCursorRef.current) {
        if (wordProgress > 0.02 && wordProgress < 0.98) {
          leadCursorRef.current.style.opacity = '1';
        } else {
          leadCursorRef.current.style.opacity = '0';
        }
      }

      // Golden Wave Thread Animation synced with Bio Paragraph Typing (p: 0.00 -> 0.30)
      const waveThread = waveThreadRef.current;
      const wavePath = wavePathRef.current;
      const glowPath = glowPathRef.current;
      const startDot = startDotRef.current;
      const endDot = endDotRef.current;
      const leadDot = leadDotRef.current;

      if (waveThread && wavePath && glowPath) {
        let totalLength = pathLengthRef.current;
        if (!totalLength && typeof wavePath.getTotalLength === 'function') {
          try {
            totalLength = wavePath.getTotalLength();
            pathLengthRef.current = totalLength;
          } catch (e) {
            totalLength = 650;
          }
        }
        if (!totalLength) totalLength = 650;

        const threadDrawProgress = Math.min(1, Math.max(0, p / 0.30));

        if (threadDrawProgress <= 0.005) {
          waveThread.style.opacity = '0';
          wavePath.style.strokeDasharray = `${totalLength}`;
          wavePath.style.strokeDashoffset = `${totalLength}`;
          glowPath.style.strokeDasharray = `${totalLength}`;
          glowPath.style.strokeDashoffset = `${totalLength}`;
          if (leadDot) leadDot.style.opacity = '0';
          if (startDot) startDot.style.opacity = '0';
          if (endDot) endDot.style.opacity = '0';
        } else {
          const bioExitProgress = Math.min(1, Math.max(0, (p - 0.34) / 0.09));
          if (bioExitProgress >= 1) {
            waveThread.style.opacity = '0';
            waveThread.style.display = 'none';
          } else {
            waveThread.style.display = 'block';
            waveThread.style.opacity = (1 - bioExitProgress).toString();
            waveThread.style.transform = `translate3d(0, ${-bioExitProgress * 22}px, 0)`;

            const drawnLength = totalLength * threadDrawProgress;
            const offset = Math.max(0, totalLength - drawnLength);
            wavePath.style.strokeDasharray = `${totalLength}`;
            wavePath.style.strokeDashoffset = `${offset}`;
            glowPath.style.strokeDasharray = `${totalLength}`;
            glowPath.style.strokeDashoffset = `${offset}`;

            if (startDot) startDot.style.opacity = threadDrawProgress >= 0.02 ? '1' : '0';
            if (endDot) endDot.style.opacity = threadDrawProgress >= 0.98 ? '1' : '0';

            if (leadDot && typeof wavePath.getPointAtLength === 'function') {
              try {
                if (threadDrawProgress > 0.005 && threadDrawProgress < 0.995) {
                  leadDot.style.opacity = '1';
                  const pt = wavePath.getPointAtLength(Math.min(totalLength, Math.max(0, drawnLength)));
                  if (pt && !isNaN(pt.x) && !isNaN(pt.y)) {
                    leadDot.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
                  }
                } else {
                  leadDot.style.opacity = '0';
                }
              } catch (err) {
                leadDot.style.opacity = '0';
              }
            }
          }
        }
      }

      // GSAP Dropping Golden Card Animation behind Chairman on Bullets Stage
      if (goldenCardRef.current) {
        if (p >= 0.40 && !isCardDroppedRef.current) {
          isCardDroppedRef.current = true;
          gsap.to(goldenCardRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'back.out(1.5)',
            overwrite: 'auto'
          });
        } else if (p < 0.38 && isCardDroppedRef.current) {
          isCardDroppedRef.current = false;
          gsap.to(goldenCardRef.current, {
            y: -140,
            opacity: 0,
            scale: 0.88,
            duration: 0.45,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      }

      // PHASE 2 (0.34 -> 0.44): Bio Paragraph Exits (Slides up & Fades out)
      const bioExitProgress = Math.min(1, Math.max(0, (p - 0.34) / 0.09));
      if (bioContainer) {
        if (bioExitProgress >= 1) {
          bioContainer.style.display = 'none';
          bioContainer.style.opacity = '0';
        } else {
          bioContainer.style.display = 'block';
          bioContainer.style.opacity = (1 - bioExitProgress).toString();
          bioContainer.style.transform = `translate3d(0, ${-bioExitProgress * 22}px, 0)`;
        }
      }

      // PHASE 3 (0.42 -> 0.94): Bullets Enter & Stack One by One at Paragraph's Place
      if (bulletsContainer) {
        if (p < 0.40) {
          bulletsContainer.style.display = 'none';
          bulletsContainer.style.opacity = '0';
        } else {
          bulletsContainer.style.display = 'flex';
          const containerFade = Math.min(1, (p - 0.40) / 0.05);
          bulletsContainer.style.opacity = containerFade.toString();
        }
      }

      // Each bullet point animates in and stacks sequentially per scroll notch
      bulletItemsRef.current.forEach((bEl, bIdx) => {
        if (!bEl) return;
        const bStart = 0.44 + bIdx * 0.10;
        const bProgress = Math.min(1, Math.max(0, (p - bStart) / 0.08));

        if (bProgress <= 0) {
          bEl.style.opacity = '0';
          bEl.style.transform = 'translate3d(0, 18px, 0)';
          const dot = bEl.querySelector('[data-bullet-beacon]');
          if (dot) {
            dot.style.opacity = '0.2';
            dot.style.transform = 'scale(0.6)';
          }
        } else {
          bEl.style.opacity = bProgress.toString();
          bEl.style.transform = `translate3d(0, ${(1 - bProgress) * 18}px, 0)`;
          const dot = bEl.querySelector('[data-bullet-beacon]');
          if (dot) {
            dot.style.opacity = '1';
            dot.style.transform = `scale(${0.7 + bProgress * 0.3})`;
          }
        }
      });

      // PHASE 4 (0.94 -> 1.00): Fully Stacked and Settle Stationary
    };

    const onScroll = () => {
      const sectionTop = section.offsetTop;
      const stickyHeight = sticky.offsetHeight;
      const sectionHeight = section.offsetHeight;
      const travelDistance = sectionHeight - stickyHeight;

      if (travelDistance <= 0) {
        targetP = 0;
        return;
      }

      const scrolled = scrollContainer.scrollTop - sectionTop;
      targetP = Math.max(0, Math.min(1, scrolled / travelDistance));
    };

    rafId = requestAnimationFrame(updatePrintAnimation);
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      scrollContainer.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrollContainerRef, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="w-full relative px-4 sm:px-6 md:px-12"
      style={{ height: '340vh' }}
    >
      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden flex flex-col justify-center py-6 sm:py-10"
        style={{ minHeight: 'calc(100vh - 5.5rem)' }}
      >
        {/* Ambient gold background glow */}
        <div className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#D6B46A]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#D6B46A]/8 blur-3xl" />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-14 relative z-10">

          {/* Left Side: Image with dynamic GSAP dropping golden card background */}
          <div className="w-full md:w-5/12 lg:w-4/12 flex items-center justify-center md:justify-start">
            <div
              ref={imageRef}
              className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-none transition-transform duration-200 flex items-center justify-center"
              style={{ willChange: 'transform' }}
            >
              {/* Dropping Golden Card (Triggered by GSAP on Bullets Scroll) */}
              <div
                ref={goldenCardRef}
                className="absolute rounded-[34px] sm:rounded-[42px] md:rounded-[48px] bg-gradient-to-br from-[#dfb95e] via-[#cca348] to-[#b78c33] border-2 border-[#f7dc9b]/80 shadow-[0_25px_60px_rgba(183,140,51,0.42)] pointer-events-none overflow-hidden"
                style={{
                  width: '92%',
                  height: '80%',
                  top: '12%',
                  left: '4%',
                  zIndex: 1,
                  willChange: 'transform, opacity',
                }}
              >
                {/* Subtle inner highlight border & sheen */}
                <div className="absolute inset-0 rounded-[32px] sm:rounded-[40px] md:rounded-[46px] border border-white/30 pointer-events-none" />
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              <img
                src={anubhavSirMessageImg}
                alt="Shri Anubhav Agarwal"
                className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(214,180,106,0.25)] select-none pointer-events-none relative z-10"
              />
            </div>
          </div>

          {/* Right Side: Chairman's Message Stage */}
          <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col justify-center pt-2 sm:pt-4 relative">

            {/* Heading (Always pinned at top of stage) */}
            <div className="mb-6 pb-4 border-b border-[#D6B46A]/25 relative">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text tracking-tight">
                Founder and Chairman
              </h2>
              <div className="mt-3 h-[2.5px] w-28 rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] to-transparent" />
            </div>

            {/* Interactive Content Stage Area */}
            <div className="relative w-full min-h-[360px] sm:min-h-[400px]">

              {/* Continuous Golden Wave Thread (Tracks down alongside bio paragraph on scroll) */}
              <div
                ref={waveThreadRef}
                className="pointer-events-none absolute inset-0 w-full h-full z-20 hidden md:block"
                style={{ willChange: 'opacity, transform', opacity: 0 }}
              >
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 800 360"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="waveThreadGoldChairman" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7a5b1e" />
                      <stop offset="25%" stopColor="#D6B46A" />
                      <stop offset="50%" stopColor="#FFF2D6" />
                      <stop offset="75%" stopColor="#D6B46A" />
                      <stop offset="100%" stopColor="#8f6e27" />
                    </linearGradient>
                    <filter id="goldGlowChairman" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="softWideGlowChairman" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="7" result="blur" />
                    </filter>
                  </defs>

                  {/* Soft wide background glow */}
                  <path
                    ref={glowPathRef}
                    d="M 796 -16 L 796 320 A 24 24 0 0 1 772 344 L 540 344"
                    stroke="#D6B46A"
                    strokeWidth="7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.25"
                    filter="url(#softWideGlowChairman)"
                  />

                  {/* Main Crisp Golden Wave Thread */}
                  <path
                    ref={wavePathRef}
                    d="M 796 -16 L 796 320 A 24 24 0 0 1 772 344 L 540 344"
                    stroke="url(#waveThreadGoldChairman)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#goldGlowChairman)"
                  />

                  {/* Start node */}
                  <g ref={startDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
                    <circle cx="796" cy="-16" r="5.5" fill="#D6B46A" filter="url(#goldGlowChairman)" />
                    <circle cx="796" cy="-16" r="3" fill="#FFFFFF" />
                  </g>

                  {/* End node at bottom level of paragraph */}
                  <g ref={endDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
                    <circle cx="540" cy="344" r="5.5" fill="#D6B46A" filter="url(#goldGlowChairman)" />
                    <circle cx="540" cy="344" r="3" fill="#FFFFFF" />
                  </g>

                  {/* Dynamic Leading Head */}
                  <g ref={leadDotRef} style={{ opacity: 0 }}>
                    <circle r="9" fill="#D6B46A" opacity="0.45" filter="url(#goldGlowChairman)" />
                    <circle r="5.5" fill="#D6B46A" filter="url(#goldGlowChairman)" />
                    <circle r="2.8" fill="#FFFFFF" />
                  </g>
                </svg>
              </div>

              {/* 1. Bio Paragraph Container (Types out, then slides away) */}
              <div
                ref={bioContainerRef}
                className="absolute inset-0 w-full pr-6 sm:pr-10 md:pr-12 text-base sm:text-lg md:text-[19px] leading-relaxed sm:leading-9 font-['Noto_Sans','Krub',sans-serif]"
                style={{ willChange: 'opacity, transform' }}
              >
                <p className="flex flex-wrap gap-x-1.5 gap-y-1">
                  {bioWords.map((word, idx) => (
                    <span
                      key={`bio-word-${idx}`}
                      ref={(el) => (wordsRef.current[idx] = el)}
                      className="transition-all duration-150 inline-block font-['Noto_Sans','Krub',sans-serif]"
                      style={{ willChange: 'opacity, color, transform', opacity: 0.18, color: '#94a3b8' }}
                    >
                      {word}
                    </span>
                  ))}
                  {/* Dynamic Golden Typewriter Blinking Cursor */}
                  <span
                    ref={leadCursorRef}
                    className="inline-block w-2.5 h-6 ml-1 bg-[#D6B46A] rounded-xs shadow-[0_0_12px_#D6B46A] animate-pulse transition-opacity duration-150 align-middle"
                    style={{ opacity: 0 }}
                  />
                </p>
              </div>

              {/* 2. Sequential Stacking Bullet Points Container */}
              <div
                ref={bulletsContainerRef}
                className="absolute inset-0 w-full flex flex-col justify-start space-y-3.5 sm:space-y-4"
                style={{ willChange: 'opacity', display: 'none', opacity: 0 }}
              >
                {bulletPoints.map((point, idx) => (
                  <div
                    key={`bullet-${idx}`}
                    ref={(el) => (bulletItemsRef.current[idx] = el)}
                    className="flex items-start gap-3.5 sm:gap-4 transition-all duration-300 relative group"
                    style={{ willChange: 'opacity, transform', opacity: 0, transform: 'translate3d(0, 18px, 0)' }}
                  >
                    {/* Glowing Golden Bullet Beacon */}
                    <div
                      data-bullet-beacon
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-1.5 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#8f6e27] border-2 border-white shadow-[0_0_10px_rgba(214,180,106,0.7)] flex-shrink-0 transition-transform duration-200"
                      style={{ willChange: 'transform, opacity' }}
                    />

                    {/* Bullet Text */}
                    <p className="text-sm sm:text-base md:text-[16.5px] text-slate-800 leading-relaxed sm:leading-7 font-medium font-['Noto_Sans','Krub',sans-serif]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function OurJourneySection({ scrollContainerRef, isMobile, navigateTo, onPortfolioActiveChange }) {
  const trackRef = useRef(null);
  const wavePathRef = useRef(null);
  const glowPathRef = useRef(null);
  const gridRef = useRef(null);
  const [gridWidth, setGridWidth] = useState(1140);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [manualFlipped, setManualFlipped] = useState({});
  const targetProgressRef = useRef(0);
  const rafRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const journeySteps = [
    { year: '2011', title: 'Agri Trading' },
    { year: '2013', title: 'FMCG' },
    { year: '2015', title: 'Manufacturing' },
    { year: '2016', title: 'Port based expansion' },
    { year: '2022', title: 'Business acquisition & listing on stock exchange' },
    { year: '2023', title: 'Global partnerships & International offices' },
    { year: '2024', title: 'Renewable Energy' },
    { year: '2025', title: 'Electronics & Technology' },
    { year: '2026', title: 'Infrastructure Platform' },
  ];

  // Clean cards data with exact user-provided content on back face
  const portfolioCards = [
    {
      id: '01',
      title: 'FMCG &\nOleo-Chemicals',
      link: 'bn-agrochem',
      backHeadline: 'Legacy\nconsumer and\nindustrial\ningredient\nplatform',
      backBullets: [
        'Edible Oils',
        'Specialty fats\n& Oleochemicals',
      ],
    },
    {
      id: '02',
      title: 'Energy Transition',
      link: 'agastya',
      backHeadline: 'Complete Solar\nManufacturing\nValue Chain',
      backBullets: [],
    },
    {
      id: '03',
      title: 'New Age\nInfra',
      link: 'about',
      backHeadline: 'Future - facing hard infra opportunities',
      backBullets: [
        'semi-conductors',
        'Data centers',
      ],
    },
    {
      id: '04',
      title: 'Integrated\nInfra',
      link: 'home',
      backHeadline: 'Integrated\ninfrastructure\nplatform for\nupcoming\nexpansion',
      backBullets: [],
    },
  ];

  useEffect(() => {
    const waveEls = [wavePathRef.current, glowPathRef.current].filter(Boolean);
    if (!waveEls.length) return;

    waveEls.forEach((el, idx) => {
      gsap.to(el, {
        strokeDashoffset: idx === 0 ? -110 : -90,
        duration: 4.8 + idx * 0.8,
        repeat: -1,
        ease: 'none',
      });
    });

    return () => {
      gsap.killTweensOf(waveEls);
    };
  }, []);

  // Update container width for responsive slot math
  useEffect(() => {
    const updateWidth = () => {
      if (gridRef.current) {
        setGridWidth(gridRef.current.clientWidth || 1140);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Pinned scroll progress tracker from scrollContainerRef
  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current;
    const track = trackRef.current;
    if (!scrollContainer || !track) return;

    const onScroll = () => {
      const trackRect = track.getBoundingClientRect();
      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      const vh = scrollContainer.clientHeight || window.innerHeight;

      const trackTop = trackRect.top - scrollContainerRect.top;
      const trackBottom = trackRect.bottom - scrollContainerRect.top;
      const totalScrollable = track.offsetHeight - vh;

      if (totalScrollable <= 0) {
        targetProgressRef.current = 0;
      } else {
        const p = Math.max(0, Math.min(1, -trackTop / totalScrollable));
        targetProgressRef.current = p;
      }

      // Hide navbar instantly as soon as user reaches / approaches Our Journey section
      if (!isMobile && onPortfolioActiveChange) {
        const isNearOrInsideJourney = trackTop <= 120 && trackBottom > 80;
        onPortfolioActiveChange(isNearOrInsideJourney);
      }
    };

    const updateLoop = () => {
      rafRef.current = requestAnimationFrame(updateLoop);
      if (reducedMotion) {
        setCurrentProgress(targetProgressRef.current);
        return;
      }
      setCurrentProgress((prev) => {
        const diff = targetProgressRef.current - prev;
        if (Math.abs(diff) < 0.0004) return targetProgressRef.current;
        return prev + diff * 0.24;
      });
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    rafRef.current = requestAnimationFrame(updateLoop);

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      onPortfolioActiveChange?.(false);
    };
  }, [scrollContainerRef, reducedMotion, isMobile, onPortfolioActiveChange]);

  // Multi-phase scroll timeline:
  // Phase 1 (p: 0.00 -> 0.22): Our Journey timeline
  // Phase 2 (p: 0.22 -> 0.35): Group Portfolio appears in Fanned Playing Card Deck formation (matching reference image)
  // Phase 3 (p: 0.35 -> 0.58): Sequential separation into 4 columns, starting from first card
  // Phase 4 (p: 0.58 -> 0.94): Sequential 3D card flips (0deg -> 180deg) to reveal specific content on each card!
  const p = currentProgress;
  const showPortfolio = isMobile ? false : p >= 0.22;
  const journeyOpacity = isMobile ? 1 : Math.max(0, Math.min(1, 1 - (p / 0.22)));
  const portfolioOpacity = isMobile ? 1 : Math.max(0, Math.min(1, (p - 0.22) / 0.12));

  // Sequential separation curve per card: [Card 0 -> Card 1 -> Card 2 -> Card 3]
  const getCardSeparation = (idx) => {
    if (isMobile) return 1;
    const startPoints = [0.35, 0.42, 0.49, 0.56];
    const duration = 0.14;
    const raw = Math.max(0, Math.min(1, (p - startPoints[idx]) / duration));
    return raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
  };

  // Sequential 3D Flip angle (0deg -> 180deg) per card
  const getCardFlipAngle = (idx) => {
    if (isMobile) return manualFlipped[idx] ? 180 : 0;
    const flipStartPoints = [0.60, 0.68, 0.76, 0.84];
    const flipDuration = 0.09;
    const raw = Math.max(0, Math.min(1, (p - flipStartPoints[idx]) / flipDuration));
    const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
    return eased * 180;
  };

  // Fanned deck configuration (Aces card fan from reference image)
  const fanRotations = [-18, -6, 6, 18];
  const fanYOffsets = [14, 2, 2, 14];
  const fanClusterXOffsets = [-55, -18, 18, 55];
  const baseZIndexes = [10, 20, 25, 15];

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: isMobile ? 'auto' : '380vh' }}
    >
      <div className={isMobile ? 'relative w-full py-10 px-4' : 'sticky top-0 h-screen w-full flex flex-col justify-center py-6 sm:py-8 px-4 sm:px-6 md:px-12 overflow-hidden'}>
        <div className="w-full max-w-7xl mx-auto relative">

          {/* Section Header: Smoothly replaces 'Our Journey' with 'Group Portfolio' in exact same place on scroll */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 relative">
            <div className="relative h-12 sm:h-14 md:h-16 flex items-center justify-center">
              {/* Heading 1: Our Journey */}
              <h2
                className={`absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text tracking-tight transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showPortfolio
                    ? 'opacity-0 -translate-y-5 scale-95 pointer-events-none'
                    : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  }`}
              >
                Our Journey
              </h2>

              {/* Heading 2: Group Portfolio */}
              <h2
                className={`absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text tracking-tight transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showPortfolio
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-5 scale-95 pointer-events-none'
                  }`}
              >
                Group Portfolio
              </h2>
            </div>
            <div className="mt-3 mx-auto h-[2.5px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
          </div>

          {/* Body Area: Hosts Journey Timeline OR 4 Fanned / Separating / Flipping Vertical Cards */}
          <div className="relative w-full min-h-[420px] sm:min-h-[440px] flex items-center justify-center">

            {/* 1. OUR JOURNEY WAVE TIMELINE */}
            <div
              className={`w-full transition-all duration-300 ${!isMobile && portfolioOpacity > 0.6 ? 'pointer-events-none' : ''}`}
              style={{
                opacity: isMobile ? 1 : journeyOpacity,
                transform: isMobile ? 'none' : `translate3d(0, ${-p * 30}px, 0)`,
                display: !isMobile && journeyOpacity <= 0.01 ? 'none' : 'block',
              }}
            >
              {/* Desktop / Tablet: Horizontal Wave Timeline */}
              <div className="hidden lg:block relative w-full overflow-visible" style={{ height: '380px' }}>
                <svg
                  className="absolute inset-0 w-full h-full overflow-visible"
                  viewBox="0 0 1300 380"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    ref={glowPathRef}
                    className="wave-timeline-path"
                    d={(() => {
                      const count = journeySteps.length;
                      const startX = 60;
                      const totalW = 1180;
                      const spacing = totalW / (count - 1);
                      return journeySteps.map((_, i) => {
                        const x = startX + i * spacing;
                        const y = i % 2 === 0 ? 145 : 235;
                        if (i === 0) return `M ${x} ${y}`;
                        const prevX = startX + (i - 1) * spacing;
                        const prevY = (i - 1) % 2 === 0 ? 145 : 235;
                        const cx = (prevX + x) / 2;
                        return `C ${cx} ${prevY} ${cx} ${y} ${x} ${y}`;
                      }).join(' ');
                    })()}
                    stroke="#D6B46A"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.15"
                    strokeDasharray="16 18"
                  />
                  <path
                    ref={wavePathRef}
                    className="wave-timeline-path"
                    d={(() => {
                      const count = journeySteps.length;
                      const startX = 60;
                      const totalW = 1180;
                      const spacing = totalW / (count - 1);
                      return journeySteps.map((_, i) => {
                        const x = startX + i * spacing;
                        const y = i % 2 === 0 ? 145 : 235;
                        if (i === 0) return `M ${x} ${y}`;
                        const prevX = startX + (i - 1) * spacing;
                        const prevY = (i - 1) % 2 === 0 ? 145 : 235;
                        const cx = (prevX + x) / 2;
                        return `C ${cx} ${prevY} ${cx} ${y} ${x} ${y}`;
                      }).join(' ');
                    })()}
                    stroke="url(#waveGoldJourney)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeDasharray="18 20"
                  />
                  <defs>
                    <linearGradient id="waveGoldJourney" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7a5b1e" />
                      <stop offset="25%" stopColor="#D6B46A" />
                      <stop offset="50%" stopColor="#FFF2D6" />
                      <stop offset="75%" stopColor="#D6B46A" />
                      <stop offset="100%" stopColor="#8f6e27" />
                    </linearGradient>
                  </defs>
                </svg>

                {journeySteps.map((step, idx) => {
                  const count = journeySteps.length;
                  const startX = 60;
                  const totalW = 1180;
                  const spacing = totalW / (count - 1);
                  const x = startX + idx * spacing;
                  const pct = (x / 1300) * 100;
                  const isUp = idx % 2 === 0;
                  const dotTopPct = isUp ? '38.2%' : '61.8%';

                  return (
                    <div
                      key={`journey-step-${idx}`}
                      className="absolute group"
                      style={{ left: `${pct}%`, top: dotTopPct, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="wave-timeline-dot w-8 h-8 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#A8863D] border-[3px] border-white shadow-lg group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(214,180,106,0.8)] transition-all duration-300 cursor-default z-10 relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div
                        className="absolute left-1/2 -translate-x-1/2 w-[1.5px] bg-[#D6B46A]/50 group-hover:bg-[#7a5b1e] transition-colors"
                        style={{ height: '18px', top: isUp ? '-18px' : '30px' }}
                      />

                      <div
                        className="absolute left-1/2 -translate-x-1/2 text-center transition-all duration-300 group-hover:-translate-y-1"
                        style={{
                          width: '135px',
                          top: isUp ? 'auto' : '52px',
                          bottom: isUp ? '52px' : 'auto',
                        }}
                      >
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D6B46A]/15 border border-[#D6B46A]/35 text-[#7a5b1e] text-[11px] font-bold mb-1.5 shadow-xs group-hover:bg-[#7a5b1e] group-hover:text-white transition-all">
                          {step.year}
                        </span>
                        <h4 className="text-[12px] font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight group-hover:text-[#7a5b1e] transition-colors">
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile View */}
              <div className="lg:hidden space-y-6 sm:space-y-8 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:-translate-x-1/2 before:w-[2px] before:bg-gradient-to-b before:from-[#7a5b1e] before:via-[#D6B46A] before:to-[#8f6e27]">
                {journeySteps.map((step, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={`mobile-step-${idx}`}
                      className={`relative flex items-center gap-4 sm:gap-8 ${isEven ? 'sm:flex-row-reverse sm:text-right' : 'sm:flex-row'}`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#A8863D] border-[3px] border-white shadow-md flex items-center justify-center z-10 sm:mx-auto">
                        <span className="text-white text-[10px] font-bold">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      <div className={`flex-1 sm:w-1/2 ${isEven ? 'sm:pr-4' : 'sm:pl-4'}`}>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D6B46A]/15 border border-[#D6B46A]/35 text-[#7a5b1e] text-[11px] font-bold mb-1">
                          {step.year}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight">
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. GROUP PORTFOLIO - FANNED DECK & SEQUENTIAL 3D CARD ROTATION */}
            <div
              className={`w-full transition-all duration-300 ${!isMobile ? 'absolute inset-0 flex items-center justify-center' : 'mt-8'}`}
              style={{
                opacity: isMobile ? 1 : portfolioOpacity,
                display: !isMobile && portfolioOpacity <= 0.01 ? 'none' : 'block',
                pointerEvents: isMobile || portfolioOpacity > 0.5 ? 'auto' : 'none',
              }}
            >
              <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 w-full max-w-6xl mx-auto relative"
              >
                {portfolioCards.map((card, idx) => {
                  const sep = getCardSeparation(idx);
                  const flipAngle = getCardFlipAngle(idx);

                  // Calculate center offset from natural 4-column grid position
                  const colCenter = (idx - 1.5) * (gridWidth / 4);
                  const pullToCenter = -colCenter;
                  const initialX = pullToCenter + fanClusterXOffsets[idx];
                  const initialY = fanYOffsets[idx];
                  const initialRot = fanRotations[idx];

                  // Interpolate from Fanned Deck cluster (sep = 0) -> Separated Column (sep = 1)
                  const curX = isMobile ? 0 : initialX * (1 - sep);
                  const curY = isMobile ? 0 : initialY * (1 - sep);
                  const curRot = isMobile ? 0 : initialRot * (1 - sep);
                  const isHovered = hoveredCard === idx;
                  const curZ = isHovered ? 50 : (isMobile ? 1 : (sep > 0.92 ? 10 : baseZIndexes[idx]));

                  return (
                    <div
                      key={card.id}
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={(e) => {
                        if (isMobile) {
                          setManualFlipped((prev) => ({ ...prev, [idx]: !prev[idx] }));
                        } else if (navigateTo && (flipAngle > 90 || sep > 0.95)) {
                          navigateTo(card.link, e);
                        }
                      }}
                      style={{
                        transform: isMobile
                          ? 'none'
                          : `translate3d(${curX}px, ${curY}px, 0) rotate(${isHovered ? 0 : curRot}deg) scale(${isHovered ? 1.05 : 1})`,
                        zIndex: curZ,
                        transformOrigin: '50% 90%',
                        perspective: '1200px',
                        willChange: 'transform, opacity',
                        transition: isMobile
                          ? 'none'
                          : (isHovered ? 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease' : 'none'),
                      }}
                      className="relative w-full min-h-[380px] sm:min-h-[410px] md:min-h-[420px] cursor-pointer"
                    >
                      {/* 3D Rotating Inner Card Box */}
                      <div
                        className="relative w-full h-full transition-transform duration-600 rounded-3xl"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: `rotateY(${flipAngle}deg)`,
                          willChange: 'transform',
                        }}
                      >
                        {/* ================= FRONT FACE (Heading & Number Only - No extra text) ================= */}
                        <div
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                          className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white via-[#FCFAFA] to-[#F8F5EE] border border-[#D6B46A]/35 shadow-[0_14px_36px_rgba(214,180,106,0.14)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-[#D6B46A] hover:shadow-[0_24px_55px_rgba(214,180,106,0.32)]"
                        >
                          {/* Top ambient gold light shimmer */}
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent opacity-60" />

                          {/* Top Index */}
                          <div className="flex items-center justify-between">
                            <span className="text-3xl sm:text-4xl font-black text-[#A8863D]/80 font-['Google_Sans','Montserrat',sans-serif] tracking-tight">
                              {card.id}
                            </span>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D6B46A]" />
                          </div>

                          {/* Center Main Heading Only */}
                          <div className="my-auto py-4">
                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-snug whitespace-pre-line tracking-tight">
                              {card.title}
                            </h3>
                            <div className="w-12 h-[2.5px] rounded-full bg-gradient-to-r from-[#D6B46A] via-[#CFB377] to-transparent mt-4" />
                          </div>

                          {/* Minimal bottom spacing dot */}
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D6B46A]/40" />
                        </div>

                        {/* ================= BACK FACE (Exact User Content Only - No extra badges/buttons) ================= */}
                        <div
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                          className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FCFAFA] to-[#F5EFE4] border-2 border-[#D6B46A]/50 shadow-[0_16px_40px_rgba(214,180,106,0.22)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
                        >
                          {/* Top ambient gold light shimmer */}
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />

                          {/* Top Index */}
                          <div className="flex items-center justify-between">
                            <span className="text-2xl sm:text-3xl font-black text-[#A8863D]/70 font-['Google_Sans','Montserrat',sans-serif]">
                              {card.id}
                            </span>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D6B46A]" />
                          </div>

                          {/* Main Content Area */}
                          <div className="my-auto py-2 flex flex-col justify-center">
                            <h4 className="text-base sm:text-lg md:text-[18px] font-bold text-slate-900 leading-snug font-['Google_Sans','Montserrat',sans-serif] whitespace-pre-line mb-3.5">
                              {card.backHeadline}
                            </h4>

                            {card.backBullets && card.backBullets.length > 0 && (
                              <ul className="space-y-2.5 mt-3">
                                {card.backBullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-[14px] font-semibold text-slate-800 leading-relaxed font-['Noto_Sans','Krub',sans-serif]">
                                    <span className="text-[#A8863D] text-sm leading-none font-black mt-0.5">▪</span>
                                    <span className="whitespace-pre-line">{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          {/* Minimal bottom spacing dot */}
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D6B46A]/40" />
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function CompanyCard({ company, isMobile, navigateTo }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const scrollParent = el.closest('.overflow-y-auto');

    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (observer) observer.disconnect();
            }
          });
        },
        {
          root: scrollParent || null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.08,
        }
      );
      observer.observe(el);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section
      id={company.id}
      className="scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 min-h-auto w-full flex items-center justify-center px-3 py-2 sm:px-6 sm:py-3 md:px-4 md:py-3"
    >
      <div
        ref={cardRef}
        data-company-card-inner="true"
        className="bg-surface backdrop-blur-lg rounded-[24px] sm:rounded-3xl p-4 sm:p-7 md:p-5 lg:p-7 max-w-6xl w-full sm:w-[95%] border border-[#D6B46A]/30 shadow-xl"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          willChange: 'opacity',
        }}
      >
        {/* Gold accent top bar */}
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] via-[#CFB377] to-[#8f6e27] mb-5 sm:mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 md:gap-4 mb-6 sm:mb-8 md:mb-4 border-b border-[#D6B46A]/20 pb-4 sm:pb-6 md:pb-3 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-4 flex-1">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 shadow-xl transform transition-all duration-300 hover:scale-105 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${company.logoColors.join(', ')})` }}>
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
              <h2 className="text-2xl sm:text-3xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">{company.name}</h2>
              <p className="text-sm text-[#A8863D] font-semibold font-['Noto_Sans','Krub',sans-serif] mt-0.5">
                {company.fullName}
              </p>
              {company.stock && (
                <p className="text-xs text-slate-500 font-['Noto_Sans','Krub',sans-serif] mt-1">{company.stock}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-gradient-to-r from-[#7a5b1e] via-[#b89345] to-[#D6B46A] text-white font-bold px-3.5 py-1.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <i className="fas fa-globe text-[11px]"></i>
                    <span>Visit Official Website</span>
                    <i className="fas fa-external-link-alt text-[9px]"></i>
                  </a>
                )}
                {company.id === 'bn-agrochem' && (
                  <button
                    onClick={(e) => navigateTo('bn-agrochem', e)}
                    className="text-xs text-[#A8863D] hover:text-[#78591f] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer py-1"
                  >
                    Explore Full BN Agrochem Page <i className="fas fa-arrow-right text-[10px]"></i>
                  </button>
                )}
                {company.id === 'agastya' && (
                  <button
                    onClick={(e) => navigateTo('agastya', e)}
                    className="text-xs text-[#A8863D] hover:text-[#78591f] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer py-1"
                  >
                    Explore Full Agastya Energy Industries Page <i className="fas fa-arrow-right text-[10px]"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* LinkedIn Icon Button on Top-Right Corner */}
          {company.linkedin && (
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto sm:self-start sm:mt-1 w-9 h-9 rounded-full bg-[#0077b5] hover:bg-[#005582] text-white flex items-center justify-center shadow-md hover:scale-110 transition-all cursor-pointer flex-shrink-0"
              title={`${company.name} LinkedIn`}
              aria-label={`${company.name} LinkedIn`}
            >
              <i className="fab fa-linkedin-in text-base"></i>
            </a>
          )}
        </div>

        <div className={isMobile ? 'rounded-none border-0 bg-transparent p-0 shadow-none mb-5' : 'relative bg-[#FCFAFA]/80 rounded-[20px] p-4 sm:p-6 md:p-4 mb-6 sm:mb-8 md:mb-4 border-l-4 border-l-[#D6B46A] border border-[#D6B46A]/20 shadow-xs transition-all duration-300 hover:shadow-sm'}>
          <p className={`text-slate-800 leading-7 sm:leading-8 text-sm sm:text-[15px] font-['Noto_Sans','Krub',sans-serif] ${isMobile ? 'text-base' : ''}`}>
            {company.description}
          </p>
        </div>

        {/* Industry tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-2">
          {company.tags.map((tag, idx) => (
            <div key={idx} className="px-3.5 py-2.5 rounded-2xl bg-[#FCFAFA] border border-[#D6B46A]/30 text-center shadow-xs transition-all duration-300 hover:scale-[1.03] hover:border-[#D6B46A] hover:shadow-md">
              <p className="text-xs font-semibold text-[#A8863D] font-['Noto_Sans','Krub',sans-serif]">{tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCardsSectionWithThread({ scrollContainerRef, companies, isMobile, navigateTo }) {
  const containerRef = useRef(null);
  const waveThreadRef = useRef(null);
  const wavePathRef = useRef(null);
  const glowPathRef = useRef(null);
  const startDotRef = useRef(null);
  const endDotRef = useRef(null);
  const leadDotRef = useRef(null);
  const pathLengthRef = useRef(0);
  const cardMetricsRef = useRef(null);

  const [pathD, setPathD] = useState('');
  const [svgSize, setSvgSize] = useState({ width: 1200, height: 2600 });
  const [startCoords, setStartCoords] = useState({ x: 960, y: 0 });
  const [endCoords, setEndCoords] = useState({ x: 200, y: 2400 });

  const calculatePath = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardEls = container.querySelectorAll('[data-company-card-inner]');
    if (cardEls.length < 4) return;

    const containerRect = container.getBoundingClientRect();
    const cWidth = Math.round(container.offsetWidth || 1200);
    const cHeight = Math.round(container.offsetHeight || 2600);
    setSvgSize({ width: cWidth, height: cHeight });

    const cardRects = Array.from(cardEls).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        left: Math.round(r.left - containerRect.left),
        right: Math.round(r.right - containerRect.left),
        top: Math.round(r.top - containerRect.top),
        bottom: Math.round(r.bottom - containerRect.top),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    });

    const R = 24; // rounded-3xl / 1.5rem corner radius

    const c0 = cardRects[0];
    const c1 = cardRects[1];
    const c2 = cardRects[2];
    const c3 = cardRects[3];

    // Compute exact physical path lengths matching the SVG path commands
    const L0 = Math.max(1, c0.bottom - c0.top);
    const L1 = Math.max(1, Math.hypot(c1.right - c0.right, (c1.top + R) - c0.bottom));
    const L2 = Math.max(1, (c1.right - c1.left - 2 * R) + Math.PI * R);
    const L3 = Math.max(1, c1.bottom - (c1.top + R));
    const L4 = Math.max(1, Math.hypot(c2.left - c1.left, (c2.top + R) - c1.bottom));
    const L5 = Math.max(1, (c2.right - c2.left - 2 * R) + Math.PI * R);
    const L6 = Math.max(1, c2.bottom - (c2.top + R));
    const L7 = Math.max(1, Math.hypot(c3.right - c2.right, (c3.top + R) - c2.bottom));
    const L8 = Math.max(1, (c3.right - c3.left - 2 * R) + Math.PI * R);
    const L9 = Math.max(1, c3.bottom - (c3.top + R));

    const W0 = 0;
    const W1 = W0 + L0;
    const W2 = W1 + L1;
    const W3 = W2 + L2;
    const W4 = W3 + L3;
    const W5 = W4 + L4;
    const W6 = W5 + L5;
    const W7 = W6 + L6;
    const W8 = W7 + L7;
    const W9 = W8 + L8;
    const W10 = W9 + L9;
    const totalLen = W10;

    cardMetricsRef.current = {
      c0, c1, c2, c3,
      W0, W1, W2, W3, W4, W5, W6, W7, W8, W9, W10,
      totalLen,
    };

    const d = [
      // 1. Start at Card 0 (BN Agrochem) Top-Right & Down Right Border
      `M ${c0.right} ${c0.top}`,
      `L ${c0.right} ${c0.bottom}`,
      // 2. Transition & Card 1 (Agastya Energy): Down to Top-Right -> Top Border (Right to Left) -> Left Border (Down)
      `L ${c1.right} ${c1.top + R}`,
      `A ${R} ${R} 0 0 0 ${c1.right - R} ${c1.top}`,
      `L ${c1.left + R} ${c1.top}`,
      `A ${R} ${R} 0 0 0 ${c1.left} ${c1.top + R}`,
      `L ${c1.left} ${c1.bottom}`,
      // 3. Transition & Card 2 (BN Bio-Chemicals): Down to Top-Left -> Top Border (Left to Right) -> Right Border (Down)
      `L ${c2.left} ${c2.top + R}`,
      `A ${R} ${R} 0 0 1 ${c2.left + R} ${c2.top}`,
      `L ${c2.right - R} ${c2.top}`,
      `A ${R} ${R} 0 0 1 ${c2.right} ${c2.top + R}`,
      `L ${c2.right} ${c2.bottom}`,
      // 4. Transition & Card 3 (AAG Semiconductor / Indichip): Down to Top-Right -> Top Border (Right to Left) -> Left Border (Down to finish)
      `L ${c3.right} ${c3.top + R}`,
      `A ${R} ${R} 0 0 0 ${c3.right - R} ${c3.top}`,
      `L ${c3.left + R} ${c3.top}`,
      `A ${R} ${R} 0 0 0 ${c3.left} ${c3.top + R}`,
      `L ${c3.left} ${c3.bottom}`,
    ].join(' ');

    setPathD(d);
    setStartCoords({ x: c0.right, y: c0.top });
    setEndCoords({ x: c3.left, y: c3.bottom });
  }, []);

  useEffect(() => {
    calculatePath();
    const timer = setTimeout(calculatePath, 250);

    const container = containerRef.current;
    let ro;
    if (typeof ResizeObserver !== 'undefined' && container) {
      ro = new ResizeObserver(() => {
        calculatePath();
      });
      ro.observe(container);
    }

    window.addEventListener('resize', calculatePath);

    return () => {
      clearTimeout(timer);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', calculatePath);
    };
  }, [calculatePath]);

  useEffect(() => {
    const wavePath = wavePathRef.current;
    const glowPath = glowPathRef.current;
    if (!wavePath || !glowPath || !pathD) return;

    try {
      const len = wavePath.getTotalLength();
      if (len > 0) {
        pathLengthRef.current = len;
        wavePath.style.strokeDasharray = `${len}`;
        wavePath.style.strokeDashoffset = `${len}`;
        glowPath.style.strokeDasharray = `${len}`;
        glowPath.style.strokeDashoffset = `${len}`;
      }
    } catch (e) { }
  }, [pathD]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef?.current;
    const waveThread = waveThreadRef.current;
    const wavePath = wavePathRef.current;
    const glowPath = glowPathRef.current;
    const startDot = startDotRef.current;
    const endDot = endDotRef.current;
    const leadDot = leadDotRef.current;

    if (!container || !scrollContainer) return;

    let rafId;
    let targetProgress = 0;
    let currentProgress = 0;

    const onScroll = () => {
      const metrics = cardMetricsRef.current;
      if (!metrics) return;

      const containerRect = container.getBoundingClientRect();
      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      const vh = scrollContainer.clientHeight || window.innerHeight;
      const scrollTop = scrollContainer.scrollTop || 0;
      const scrollHeight = scrollContainer.scrollHeight || 1;
      const maxScroll = Math.max(1, scrollHeight - vh);

      const { c0, c1, c2, c3, W0, W1, W2, W3, W4, W5, W6, W7, W8, W9, W10, totalLen } = metrics;

      // Position of each card's top relative to the viewport top
      const top0 = (c0.top + containerRect.top) - scrollContainerRect.top;
      const h0 = Math.max(1, c0.height);

      const top1 = (c1.top + containerRect.top) - scrollContainerRect.top;
      const h1 = Math.max(1, c1.height);

      const top2 = (c2.top + containerRect.top) - scrollContainerRect.top;
      const h2 = Math.max(1, c2.height);

      const top3 = (c3.top + containerRect.top) - scrollContainerRect.top;
      const h3 = Math.max(1, c3.height);

      // Phase 0: Card 0 Right Border (Down)
      const f0 = Math.max(0, Math.min(1, (0.65 * vh - top0) / (h0 * 0.85)));

      // Phase 1: Card 1 Top Border sweep Right-to-Left (W1 -> W3)
      const t1 = Math.max(0, Math.min(1, (0.85 * vh - top1) / (0.35 * vh)));

      // Phase 2: Card 1 Left Border (Down) (W3 -> W4)
      const d1 = Math.max(0, Math.min(1, (0.50 * vh - top1) / (h1 * 0.85)));

      // Phase 3: Card 2 Top Border sweep Left-to-Right (W4 -> W6)
      const t2 = Math.max(0, Math.min(1, (0.85 * vh - top2) / (0.35 * vh)));

      // Phase 4: Card 2 Right Border (Down) (W6 -> W7)
      const d2 = Math.max(0, Math.min(1, (0.50 * vh - top2) / (h2 * 0.85)));

      // Phase 5: Card 3 (Indichip) Top Border sweep Right-to-Left (W7 -> W9)
      const t3 = Math.max(0, Math.min(1, (0.85 * vh - top3) / (0.33 * vh)));

      // Phase 6: Card 3 (Indichip) Left Border (Down to finish) (W9 -> W10)
      const d3Scroll = Math.max(0, Math.min(1, (0.52 * vh - top3) / (h3 * 0.65)));
      const bottomProximity = maxScroll > 0 ? Math.max(0, Math.min(1, (scrollTop - (maxScroll - 160)) / 160)) : 0;
      const d3 = Math.max(d3Scroll, bottomProximity);

      let currentLen = 0;
      if (f0 < 1) {
        currentLen = W0 + f0 * (W1 - W0);
      } else if (t1 < 1) {
        currentLen = W1 + t1 * (W3 - W1);
      } else if (d1 < 1) {
        currentLen = W3 + d1 * (W4 - W3);
      } else if (t2 < 1) {
        currentLen = W4 + t2 * (W6 - W4);
      } else if (d2 < 1) {
        currentLen = W6 + d2 * (W7 - W6);
      } else if (t3 < 1) {
        currentLen = W7 + t3 * (W9 - W7);
      } else {
        currentLen = W9 + d3 * (W10 - W9);
      }

      targetProgress = Math.max(0, Math.min(1, currentLen / totalLen));
    };

    const updateThread = () => {
      rafId = requestAnimationFrame(updateThread);

      currentProgress += (targetProgress - currentProgress) * 0.25;
      if (Math.abs(targetProgress - currentProgress) < 0.0003) {
        currentProgress = targetProgress;
      }

      const p = Math.max(0, Math.min(1, currentProgress));
      const len = pathLengthRef.current || 0;

      if (!waveThread || !wavePath || !glowPath || len <= 0) return;

      if (p <= 0.003) {
        waveThread.style.opacity = '0';
        wavePath.style.strokeDashoffset = `${len}`;
        glowPath.style.strokeDashoffset = `${len}`;
        if (startDot) startDot.style.opacity = '0';
        if (endDot) endDot.style.opacity = '0';
        if (leadDot) leadDot.style.opacity = '0';
      } else {
        waveThread.style.opacity = '1';
        const drawnLength = len * p;
        const offset = Math.max(0, len - drawnLength);

        wavePath.style.strokeDashoffset = `${offset}`;
        glowPath.style.strokeDashoffset = `${offset}`;

        if (startDot) startDot.style.opacity = p >= 0.008 ? '1' : '0';
        if (endDot) endDot.style.opacity = p >= 0.98 ? '1' : '0';

        if (leadDot && typeof wavePath.getPointAtLength === 'function') {
          try {
            if (p > 0.004 && p < 0.996) {
              leadDot.style.opacity = '1';
              const pt = wavePath.getPointAtLength(drawnLength);
              leadDot.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            } else {
              leadDot.style.opacity = '0';
            }
          } catch (err) { }
        }
      }
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    rafId = requestAnimationFrame(updateThread);

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scrollContainerRef, pathD]);

  return (
    <div ref={containerRef} className="relative space-y-2 sm:space-y-3 pb-8 sm:pb-12 z-20">
      {/* Continuous Connected Golden Thread Tracker coinciding on Card Boundaries */}
      <div
        ref={waveThreadRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-30 hidden md:block overflow-visible"
        style={{ willChange: 'opacity', opacity: 0 }}
      >
        <svg
          className="w-full h-full overflow-visible"
          width={svgSize.width}
          height={svgSize.height}
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          fill="none"
        >
          <defs>
            <linearGradient id="waveThreadGoldCompanies" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7a5b1e" />
              <stop offset="15%" stopColor="#D6B46A" />
              <stop offset="35%" stopColor="#FFF2D6" />
              <stop offset="50%" stopColor="#D6B46A" />
              <stop offset="70%" stopColor="#FFF2D6" />
              <stop offset="85%" stopColor="#D6B46A" />
              <stop offset="100%" stopColor="#8f6e27" />
            </linearGradient>
            <filter id="goldGlowCompanies" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="softWideGlowCompanies" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur" />
            </filter>
          </defs>

          {/* Soft wide background glow */}
          {pathD && (
            <path
              ref={glowPathRef}
              d={pathD}
              stroke="#D6B46A"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.25"
              filter="url(#softWideGlowCompanies)"
            />
          )}

          {/* Main Crisp Golden Wave Thread Coinciding ON Card Borders */}
          {pathD && (
            <path
              ref={wavePathRef}
              d={pathD}
              stroke="url(#waveThreadGoldCompanies)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#goldGlowCompanies)"
            />
          )}

          {/* Start node (Card 0 Top-Right corner) */}
          <g ref={startDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
            <circle cx={startCoords.x} cy={startCoords.y} r="5.5" fill="#D6B46A" filter="url(#goldGlowCompanies)" />
            <circle cx={startCoords.x} cy={startCoords.y} r="3" fill="#FFFFFF" />
          </g>

          {/* End node (Card 3 bottom-left corner) */}
          <g ref={endDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
            <circle cx={endCoords.x} cy={endCoords.y} r="5.5" fill="#D6B46A" filter="url(#goldGlowCompanies)" />
            <circle cx={endCoords.x} cy={endCoords.y} r="3" fill="#FFFFFF" />
          </g>

          {/* Dynamic Leading Head */}
          <g ref={leadDotRef} style={{ opacity: 0 }}>
            <circle r="11" fill="#D6B46A" opacity="0.35" filter="url(#goldGlowCompanies)" />
            <circle r="6.5" fill="#D6B46A" filter="url(#goldGlowCompanies)" />
            <circle r="3.2" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          isMobile={isMobile}
          navigateTo={navigateTo}
        />
      ))}
    </div>
  );
}

function App() {
  const containerRef = useRef(null);
  const particleGroupRef = useRef(null);
  const contentRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const [hideNavbar, setHideNavbar] = useState(false);

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
    setMenuOpen(false);
  };

  // Scroll to top on every page switch
  useEffect(() => {
    const resetScroll = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
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
    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 14);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

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

      // Font using Google Sans / Montserrat style
      ctx.font = '700 190px "Google Sans", "Montserrat", sans-serif';
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

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      scene.traverse((object) => {
        if (!object.isMesh) return;
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material?.dispose();
        }
      });
      textTexture.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
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
      linkedin: 'https://www.linkedin.com/company/bn-agrochem-limited/posts/?feedView=all',
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
      linkedin: 'https://www.linkedin.com/company/agastya-energy-industries/',
      description: '"Agastya" symbolises Balance & Harmony. Agastya is inspired by the timeless principles of balance and harmony—a philosophy that reflects our approach to responsible growth and environmental sustainability. Agastya is an innovation-led enterprise focused on next-generation green energy and environmental solutions. Our mission is to enable the world\'s transition to a circular, balanced economy powered by clean resources.',
      fullName: 'Agastya Energy Industries',
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
      website: 'https://epitome-india.com/',
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
      linkedin: 'https://www.linkedin.com/company/indichip-semiconductors-limited/',
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
    }
  };

  return (
    <div className="relative min-w-full min-h-screen overflow-x-clip font-['Noto_Sans','Krub',sans-serif] bg-page text-theme transition-colors duration-500">
      {/* 3D Canvas */}
      <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-0"></div>

      {/* Navbar */}
      <nav className={`tablet-nav fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#D6B46A]/40 px-4 sm:px-6 md:px-12 py-5 sm:py-5.5 md:py-6.5 shadow-md transition-all duration-500 ease-in-out ${hideNavbar ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            onClick={(e) => navigateTo('home', e)}
            className="flex items-center cursor-pointer group"
          >
            <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img
                src="/logos/aag-navlogo.png"
                alt="AAG logo"
                className="h-full w-auto max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] object-contain filter drop-shadow-[0_2px_10px_rgba(214,180,106,0.3)] group-hover:drop-shadow-[0_4px_16px_rgba(214,180,106,0.5)] transition-all duration-300"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm ml-auto mr-2 md:mr-6">

            {/* Companies Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompaniesDropdownOpen(true)}
              onMouseLeave={() => setCompaniesDropdownOpen(false)}
            >
              <button
                onClick={() => setCompaniesDropdownOpen((prev) => !prev)}
                className={`nav-link-hover font-semibold font-['Noto_Sans','Krub',sans-serif] text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer py-1.5 transition-colors ${activePage === 'bn-agrochem' || activePage === 'agastya' ? 'text-[#A8863D] font-bold' : 'text-slate-800 hover:text-[#A8863D]'
                  }`}
              >
                <span>Companies</span>
                <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${companiesDropdownOpen ? 'rotate-180 text-[#A8863D]' : ''}`}></i>
              </button>

              {/* Dropdown Menu Box */}
              {companiesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#D6B46A]/40 shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                  <div className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider px-3 py-1.5 border-b border-stone-100 font-['Noto_Sans','Krub',sans-serif]">
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
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#A8863D] transition-colors font-['Google_Sans','Montserrat',sans-serif]">
                            {company.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-['Noto_Sans','Krub',sans-serif] truncate max-w-[150px]">
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
                  className={`nav-link-hover font-semibold font-['Noto_Sans','Krub',sans-serif] text-xs uppercase tracking-wider transition-colors ${isActive ? 'text-[#A8863D] font-bold border-b-2 border-[#D6B46A] pb-0.5' : 'text-slate-800 hover:text-[#A8863D]'
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
                <span className="text-[10px] font-bold text-[#A8863D] uppercase tracking-wider px-1 mb-1 font-['Noto_Sans','Krub',sans-serif]">
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
                  className={`block text-xs font-semibold uppercase tracking-[0.18em] py-1.5 ${activePage === item.id ? 'text-[#A8863D] font-bold' : 'text-slate-800 hover:text-[#A8863D]'
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
      <div ref={contentRef} className="tablet-tight-content relative z-10 min-h-screen overflow-y-auto pointer-events-auto pt-20 sm:pt-24 md:pt-28 lg:pt-28">

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
                    <img src="/logos/logo new.webp" alt="AAG logo" className="w-full h-full object-contain p-0 transform scale-135" />
                  </div>
                  <div className="w-full">
                    <div className="inline-block relative">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
                        Anubhav Agarwal Group
                      </h1>
                      <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-gradient-to-r from-[#A8863D] via-[#D6B46A] via-[#CFB377] to-[#8F6E27] relative">
                        <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[hero-line-shimmer_2.4s_linear_infinite]" />
                      </div>
                    </div>
                    <p className="text-[#A8863D] font-semibold text-[11px] sm:text-sm tracking-[0.22em] uppercase mt-2.5 font-['Noto_Sans','Krub',sans-serif]">
                      Building India's Industrial Future Through Innovation
                    </p>
                  </div>
                </div>

                <div className="mb-0 sm:mb-8">
                  <div className="rounded-[20px] sm:rounded-3xl bg-[#FCFAFA]/80 backdrop-blur-sm border border-[#D6B46A]/25 border-l-4 border-l-[#D6B46A] p-5 sm:p-8 shadow-sm transition-colors duration-500 relative">
                    <a
                      href="https://www.linkedin.com/in/anubhav-agarwal-15ab82121/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#0077b5] hover:bg-[#005582] text-white flex items-center justify-center shadow-md hover:scale-110 transition-all cursor-pointer z-10"
                      title="Shri Anubhav Agarwal LinkedIn"
                      aria-label="Shri Anubhav Agarwal LinkedIn"
                    >
                      <i className="fab fa-linkedin-in text-base"></i>
                    </a>
                    <h3 className="text-lg sm:text-xl font-bold gold-gradient-text mb-3 sm:mb-4 font-['Google_Sans','Montserrat',sans-serif] pr-10">About Anubhav Agarwal Group</h3>
                    <p className="text-sm sm:text-[15px] text-slate-700 leading-7 sm:leading-8 font-['Noto_Sans','Krub',sans-serif]">
                      <strong className="text-slate-900">Anubhav Agarwal Group (AAG) </strong> is a purpose-driven conglomerate with a legacy of 15 years of building enduring businesses that contribute to nation building. With a portfolio spanning consumer products, agribusiness, Oleo-chemicals, renewable energy and advanced manufacturing, the Group combines operational excellence with bold long-term ambition. Guided by innovation, integrity and nation building, AAG is creating scalable ecosystems and expanding into emerging growth opportunities that strengthen India's self-reliance while delivering meaningful value to customers, partners, communities and future generations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <StatisticsSection scrollContainerRef={contentRef} />

            {/* Chairman's Message Section */}
            <ChairmanMessageSection scrollContainerRef={contentRef} />

            {/* Our Journey Section & Group Portfolio (Pinned with In-Place Synchronized Transition) */}
            <OurJourneySection
              scrollContainerRef={contentRef}
              isMobile={isMobile}
              navigateTo={navigateTo}
              onPortfolioActiveChange={setHideNavbar}
            />

            {/* Company logos preview - RUNNING RIGHT TO LEFT MARQUEE */}
            <section className="w-full overflow-hidden py-10 sm:py-16 pointer-events-none transition-all duration-700 opacity-100 translate-y-0">
              <div className="pointer-events-auto w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] border-y-2 border-[#D6B46A]/40 py-10 sm:py-14 shadow-2xl">
                <div className="mb-6 sm:mb-8 text-center px-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">AAG Companies</h2>
                  <p className="text-xs sm:text-sm text-stone-300 font-semibold font-['Noto_Sans','Krub',sans-serif] mt-1.5 uppercase tracking-wider">
                    Our portfolio across four core industrial sectors
                  </p>
                  <div className="mt-2.5 mx-auto h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" />
                </div>

                {/* Continuous Running Cards Marquee Strip (Right to Left) */}
                <div className="relative w-full overflow-hidden py-6 sm:py-8 bg-gradient-to-r from-[#7a5b1e] via-[#b89345] via-[#D6B46A] via-[#CFB377] to-[#8f6e27] shadow-[0_10px_35px_rgba(214,180,106,0.3)] border-y-2 border-[#D6B46A]">
                  {/* Shimmer Light Sweep Effect across the Gold Lane */}
                  <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[hero-line-shimmer_3s_linear_infinite] pointer-events-none" />

                  <div className="flex gap-8 animate-marquee-running items-stretch relative z-10">
                    {[...companies, ...companies, ...companies].map((company, index) => (
                      <a
                        key={`logo-marquee-${company.id}-${index}`}
                        href={company.website || `/${company.id}`}
                        onClick={(e) => {
                          if (!company.website) {
                            handleNavClick(e, company.id);
                          }
                        }}
                        target={company.website ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-72 h-44 sm:w-88 sm:h-52 rounded-3xl bg-white border-2 border-white/80 p-5 sm:p-6 flex items-center justify-center text-center shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-[#D6B46A] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)] group relative overflow-hidden cursor-pointer"
                      >
                        <img
                          src={company.logoImage || '/logos/logo new.webp'}
                          alt={`${company.name} logo`}
                          className="max-h-full max-w-full object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Bottom Golden Accent Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Company Cards Section with Snaking Golden Border Thread Tracker */}
            <CompanyCardsSectionWithThread
              scrollContainerRef={contentRef}
              companies={companies}
              isMobile={isMobile}
              navigateTo={navigateTo}
            />

          </>
        )}

        {/* Footer / Enterprise Section */}
        <footer className="w-full bg-gradient-to-br from-[#1c1813] via-[#2a2219] to-[#120f0c] text-white border-t-2 border-[#D6B46A]/40 shadow-2xl mt-6 sm:mt-8">
          <div className="pointer-events-auto max-w-7xl mx-auto px-4 py-8 sm:px-8 md:px-12 md:py-16">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[2fr_1fr]">
              <div className="flex flex-col md:flex-row items-start gap-5 sm:gap-6 md:gap-8">
                <div className="w-36 h-36 sm:w-48 sm:h-48 flex items-start justify-center flex-shrink-0 self-start">
                  <img
                    src="/logos/logo new.webp"
                    alt="AAG logo"
                    className="w-full h-full object-contain object-top filter drop-shadow-[0_4px_28px_rgba(214,180,106,0.5)] hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-start pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Google_Sans','Montserrat',sans-serif] leading-tight">Anubhav Agarwal Group</h3>
                  <p className="text-xs sm:text-sm text-[#CFB377] font-['Noto_Sans','Krub',sans-serif] mt-0.5 font-semibold">Building India's Industrial Future</p>
                  <p className="max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-stone-300 font-['Noto_Sans','Krub',sans-serif] mt-3">
                    Anubhav Agarwal Group is an enterprise platform uniting high-growth businesses across agrochemicals, renewable energy, bio-chemicals, and semiconductor manufacturing. We combine strategic partnerships, innovation, and a Make-in-India growth agenda to create sustainable value.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 px-3 py-1 text-[10px] sm:text-xs text-[#CFB377] font-medium">Enterprise Strategy</span>
                    <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 px-3 py-1 text-[10px] sm:text-xs text-[#CFB377] font-medium">Make in India</span>
                    <span className="rounded-full border border-[#D6B46A]/40 bg-white/5 px-3 py-1 text-[10px] sm:text-xs text-[#CFB377] font-medium">Sustainable Growth</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 text-left sm:gap-3.5 md:ml-6">
                <p className="text-xs font-bold text-[#D6B46A] uppercase tracking-[0.24em] font-['Noto_Sans','Krub',sans-serif]">Site Navigation</p>
                <a href="/" onClick={(e) => navigateTo('home', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Home</a>
                <a href="/bn-agrochem" onClick={(e) => navigateTo('bn-agrochem', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">BN Agrochem Limited</a>
                <a href="/agastya" onClick={(e) => navigateTo('agastya', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Agastya Energy Industries</a>
                <a href="/about" onClick={(e) => navigateTo('about', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Leadership & Structure</a>
                <a href="/investors" onClick={(e) => navigateTo('investors', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Investors & Banking</a>
                <a href="/media" onClick={(e) => navigateTo('media', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Media & Press</a>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-700/60 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-stone-400 font-['Noto_Sans','Krub',sans-serif]">
              <p>© 2026 Anubhav Agarwal Group. All Rights Reserved.</p>
              <div className="flex items-center gap-3 text-stone-400">
                <a
                  href="https://www.linkedin.com/in/anubhav-agarwal-15ab82121/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0077b5] hover:bg-[#005582] text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="Shri Anubhav Agarwal LinkedIn"
                  aria-label="Shri Anubhav Agarwal LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-xs"></i>
                </a>
                <span className="text-[#D6B46A]">|</span>
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