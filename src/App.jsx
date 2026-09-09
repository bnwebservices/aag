import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
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
                className="w-full h-full min-h-[320px] sm:min-h-[360px] rounded-[24px] sm:rounded-3xl border-2 border-[#D6B46A]/45 bg-gradient-to-br from-[#ffffff] via-[#fffdfa] to-[#faf6ec] p-6 sm:p-7 md:p-8 shadow-[0_20px_50px_-10px_rgba(214,180,106,0.25)] flex flex-col justify-center overflow-hidden relative"
                style={{ willChange: 'transform' }}
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] to-[#8f6e27]" />

                <div>
                  {/* Header */}
                  <div className="pb-3 sm:pb-4 border-b border-[#D6B46A]/20">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
                      Our Vision
                    </h3>
                    <div className="mt-2 h-[2.5px] w-16 rounded-full bg-gradient-to-r from-[#A8863D] to-[#D6B46A]" />
                  </div>

                  {/* Statement Body */}
                  <div className="pt-4 sm:pt-5">
                    <p className="text-sm sm:text-[15px] md:text-base text-slate-800 leading-relaxed sm:leading-7 font-medium font-['Noto_Sans','Krub',sans-serif]">
                      To build a <strong className="text-slate-950 font-bold">healthier, prosperous and sustainable world</strong> through innovative and robust enterprises powered by <strong className="text-[#7a5b1e] font-bold">globally competitive trusted ecosystems</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Card: OUR MISSION */}
              <div
                ref={rightCardFlipperRef}
                className="w-full h-full min-h-[320px] sm:min-h-[360px] rounded-[24px] sm:rounded-3xl border-2 border-[#D6B46A]/45 bg-gradient-to-br from-[#ffffff] via-[#fffdfa] to-[#faf6ec] p-6 sm:p-7 md:p-8 shadow-[0_20px_50px_-10px_rgba(214,180,106,0.25)] flex flex-col justify-center overflow-hidden relative"
                style={{ willChange: 'transform' }}
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] to-[#8f6e27]" />

                <div>
                  {/* Header */}
                  <div className="pb-3 sm:pb-4 border-b border-[#D6B46A]/20">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text">
                      Our Mission
                    </h3>
                    <div className="mt-2 h-[2.5px] w-16 rounded-full bg-gradient-to-r from-[#A8863D] to-[#D6B46A]" />
                  </div>

                  {/* Statement Body */}
                  <div className="pt-4 sm:pt-5">
                    <p className="text-sm sm:text-[15px] md:text-base text-slate-800 leading-relaxed sm:leading-7 font-medium font-['Noto_Sans','Krub',sans-serif]">
                      By 2035, to build and scale <strong className="text-slate-950 font-bold">globally competitive enterprises</strong> that secure a 10% share of India’s edible oil market, establish a 10 GW renewable energy portfolio, advance India’s semiconductor capabilities, and create world-class industrial ecosystems that attract global manufacturers, technology and talent to India, enabling people and enterprises to <strong className="text-[#7a5b1e] font-bold">thrive sustainably</strong>.
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
      backHeadline: 'Legacy consumer and industrial ingredient platform',
      backBullets: [
        'Edible Oils',
        'Specialty fats & Oleochemicals',
      ],
      logos: [
        { name: 'BN Agrochem', src: '/logos/BN-Agrochem-Limited-Logo.png' },
        { name: 'Epitome', src: '/logos/epitome.png' },
      ],
      expandedMetrics: [
        { value: '₹11,822 crore', label: 'current turnover' },
        { value: '21.5%', label: 'projected CAGR' },
        { value: '1,000+', label: 'distributors across 17 states' },
        { value: '1 lakh+', label: 'retail outlets' },
        { value: '1,850 TPD', label: 'current capacity' },
        { value: '9,000 TPD', label: 'planned capacity' },
        { value: '750+', label: 'employees' },
        { value: 'A', label: 'external credit rating' },
        { value: '₹3,500+ crore', label: 'investment pipeline' },
      ],
    },
    {
      id: '02',
      title: 'Energy Transition',
      link: 'agastya',
      backHeadline: 'Complete Solar Manufacturing Value Chain',
      backBullets: [
        'Ingot & Wafer to Solar Cells',
        'High-Efficiency PV Modules',
      ],
      logos: [
        { name: 'Agastya', src: '/logos/Final-AGASTYA-Logo_ctc-1-removebg-preview.png' },
      ],
    },
    {
      id: '03',
      title: 'New Age\nInfra',
      link: 'about',
      backHeadline: 'Future-facing hard infra opportunities',
      backBullets: [
        'Semi-conductors',
        'Data centers',
      ],
      logos: [
        { name: 'Indichip', src: '/logos/Indichip.png' },
      ],
    },
    {
      id: '04',
      title: 'Integrated\nInfra',
      link: 'home',
      backHeadline: 'Integrated infrastructure platform for upcoming expansion',
      backBullets: [
        'Industrial Asset Base',
        'Synergistic Ecosystem',
      ],
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

  // Update container width for responsive slot math with ResizeObserver and clientWidth
  useEffect(() => {
    const updateWidth = () => {
      if (gridRef.current) {
        const w = gridRef.current.clientWidth || gridRef.current.getBoundingClientRect().width;
        if (w > 0) {
          setGridWidth(w);
        }
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);

    let ro;
    if (typeof ResizeObserver !== 'undefined' && gridRef.current) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 0) {
            setGridWidth(w);
          }
        }
      });
      ro.observe(gridRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      if (ro) ro.disconnect();
    };
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
  // Phase 1 (p: 0.00 -> 0.12): Our Journey timeline
  // Phase 2 (p: 0.12 -> 0.20): Group Portfolio appears in Fanned Playing Card Deck formation
  // Phase 3 (p: 0.20 -> 0.34): Sequential separation into 4 columns
  // Phase 4 (p: 0.34 -> 0.48): Sequential 3D card flips (Card 0 -> 1 -> 2 -> 3 completely unfolded by 0.48)
  // Phase 5 (p: 0.50 -> 0.58): SIMULTANEOUS ON SAME SCROLL - Heading fades out & cards smoothly shift upward
  // Phase 6 (p: 0.60 -> 0.99): SEQUENTIAL CARD EXPANSION (Card 1 -> 2 -> 3 -> 4, equal scroll window per card)
  const p = currentProgress;
  const showPortfolio = isMobile ? false : p >= 0.12;
  const journeyOpacity = isMobile ? 1 : Math.max(0, Math.min(1, 1 - (p / 0.12)));
  const portfolioOpacity = isMobile ? 1 : Math.max(0, Math.min(1, (p - 0.12) / 0.08));

  // Sequential separation curve per card: [Card 0 -> Card 1 -> Card 2 -> Card 3]
  const getCardSeparation = (idx) => {
    if (isMobile) return 1;
    const startPoints = [0.20, 0.23, 0.26, 0.29];
    const duration = 0.08;
    const raw = Math.max(0, Math.min(1, (p - startPoints[idx]) / duration));
    return raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
  };

  // Sequential 3D Flip angle (0deg -> 180deg) per card
  const getCardFlipAngle = (idx) => {
    if (isMobile) return manualFlipped[idx] ? 180 : 0;
    const flipStartPoints = [0.34, 0.38, 0.42, 0.46];
    const flipDuration = 0.055;
    const raw = Math.max(0, Math.min(1, (p - flipStartPoints[idx]) / flipDuration));
    const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
    return eased * 180;
  };

  // Simultaneous on the SAME scroll (p: 0.50 -> 0.58): Heading fades out & cards shift up
  const getHeaderFadeStyle = () => {
    if (isMobile || p < 0.50) return { opacity: 1, transform: 'none' };
    const raw = Math.max(0, Math.min(1, (p - 0.50) / 0.08));
    const ease = Math.sin((raw * Math.PI) / 2);
    return {
      opacity: Math.max(0, 1 - ease),
      transform: `translate3d(0, ${-24 * ease}px, 0)`,
      pointerEvents: raw >= 0.95 ? 'none' : 'auto',
    };
  };

  // Upward shift of cards happening simultaneously on the SAME scroll (p: 0.50 -> 0.58)
  const getGridShiftY = () => {
    if (isMobile || p < 0.50) return 0;
    const raw = Math.max(0, Math.min(1, (p - 0.50) / 0.08));
    const ease = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
    return -55 * ease;
  };

  const gridShiftY = getGridShiftY();

  // Card 1 9 Metrics Data with numeric values for count-up animation
  const card1Metrics = [
    { id: 'turnover', value: 11822, prefix: '₹', suffix: ' crore', label: 'current turnover', staticText: '₹11,822 crore' },
    { id: 'cagr', value: 21.5, prefix: '', suffix: '%', isDecimal: true, label: 'projected CAGR', staticText: '21.5%' },
    { id: 'distributors', value: 1000, prefix: '', suffix: '+', label: 'distributors across 17 states', staticText: '1,000+' },
    { id: 'retail', value: 1, prefix: '', suffix: ' lakh+', isLakh: true, label: 'retail outlets', staticText: '1 lakh+' },
    { id: 'curr_cap', value: 1850, prefix: '', suffix: ' TPD', label: 'current capacity', staticText: '1,850 TPD' },
    { id: 'plan_cap', value: 9000, prefix: '', suffix: ' TPD', label: 'planned capacity', staticText: '9,000 TPD' },
    { id: 'employees', value: 750, prefix: '', suffix: '+', label: 'employees', staticText: '750+' },
    { id: 'rating', isStatic: true, staticText: 'A', label: 'external credit rating' },
    { id: 'pipeline', value: 3500, prefix: '₹', suffix: '+ crore', label: 'investment pipeline', staticText: '₹3,500+ crore' },
  ];

  // Card 1 Financial Bar Charts Data
  const revenueChartData = [
    { label: 'FY 24- 25', value: 9227.87, display: '9,227.87' },
    { label: 'FY 25- 26', value: 11821.86, display: '11,821.86' },
    { label: 'FY 26-27^', value: 13053.84, display: '13,053.84' },
    { label: 'FY 27-28^', value: 16483.64, display: '16,483.64' },
    { label: 'FY 28-29^', value: 20109.26, display: '20,109.26' },
  ];

  const profitChartData = [
    { label: 'FY 24- 25', value: 252.41, display: '252.41' },
    { label: 'FY 25- 26', value: 389.26, display: '389.26' },
    { label: 'FY 26-27^', value: 432.39, display: '432.39' },
    { label: 'FY 27-28^', value: 585.36, display: '585.36' },
    { label: 'FY 28-29^', value: 752.09, display: '752.09' },
  ];

  // Card 2 (Renewable Energy) Metrics Data
  const card2Metrics = [
    { id: 'turnover', value: 8370, prefix: '₹', suffix: ' crore', label: 'projected turnover in FY2031', staticText: '₹8,370 crore' },
    { id: 'cagr', value: 43.8, prefix: '', suffix: '%', isDecimal: true, label: 'projected CAGR', staticText: '43.8%' },
    { id: 'capacity', value: 3, prefix: '', suffix: '+ GW', label: 'committed & installed capacity', staticText: '3+ GW' },
    { id: 'projects', value: 5, prefix: '', suffix: '', label: 'upcoming projects', staticText: '5' },
    { id: 'pipeline', value: 10000, prefix: '₹', suffix: '+ crore', label: 'investment pipeline', staticText: '₹10,000+ crore' },
    { id: 'chain', isStatic: true, staticText: 'Complete Solar Value Chain', label: 'covering ingot, wafer, cell, module, IPP, BESS & EPC' },
  ];

  // Card 2 (Renewable Energy) Financial Bar Charts Data
  const card2RevenueData = [
    { label: 'FY 27-28^', value: 2899.27, display: '2,899.27' },
    { label: 'FY 28-29^', value: 3782.85, display: '3,782.85' },
    { label: 'FY 29-30^', value: 6660.65, display: '6,660.65' },
    { label: 'FY 30-31^', value: 8369.97, display: '8,369.97' },
  ];

  const card2ProfitData = [
    { label: 'FY 27-28^', value: 348.24, display: '348.24' },
    { label: 'FY 28-29^', value: 853.00, display: '853.00' },
    { label: 'FY 29-30^', value: 1916.35, display: '1,916.35' },
    { label: 'FY 30-31^', value: 2504.04, display: '2,504.04' },
  ];

  // Card 3 (Electronics & Technology) Metrics Data
  const card3Metrics = [
    { id: 'pipeline', value: 14000, prefix: '₹', suffix: ' crore', label: 'investment pipeline', staticText: '₹14,000 crore' },
    { id: 'sic_fab', value: 12000, prefix: '', suffix: '', label: 'capacity per month for SiC FAB', staticText: '12,000' },
    { id: 'osat', value: 12000, prefix: '', suffix: '', label: 'capacity per month for OSAT', staticText: '12,000' },
    { id: 'timeline', isStatic: true, staticText: 'October 2029', label: 'Start of commercial operations' },
    { id: 'area', value: 150, prefix: '', suffix: ' Acre', label: 'project site area', staticText: '150 Acre' },
    { id: 'tech', isStatic: true, staticText: 'SiC MOSFET', label: 'superior technology' },
  ];

  // Card 3 (Electronics & Technology) Applications Data
  const card3Applications = [
    {
      id: 'ai',
      title: 'AI & Data Centers',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      ),
    },
    {
      id: 'auto',
      title: 'Automotive',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 10.8 2 11v5c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
    {
      id: 'ev',
      title: 'EV Charger',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
          <path d="M16 11l3-3m0 0l3 3m-3-3v10" />
          <path d="M7 11v3l3-1-3 4v-3l-3 1z" />
        </svg>
      ),
    },
    {
      id: 'solar',
      title: 'Solar',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
  ];

  // Card 4 (Infrastructure Platform) Metrics Data
  const card4Metrics = [
    { id: 'platform_inv', value: 4500, prefix: '₹', suffix: ' crore', label: 'Platform Investment', staticText: '₹4,500 crore' },
    { id: 'ind_inv', isStatic: true, staticText: '₹1-2 lakh crore', label: 'Industry Investment' },
    { id: 'jobs', isStatic: true, staticText: '2 lakh', label: 'direct & indirect jobs' },
    { id: 'gst', value: 20000, prefix: '₹', suffix: ' crore', label: 'GST collection in 10 yrs', staticText: '₹20,000 crore' },
    { id: 'cost_red', isStatic: true, staticText: '15-20%', label: 'reduction in operating costs' },
    { id: 'time_red', isStatic: true, staticText: '50-70%', label: 'reduction in setup time' },
  ];

  // Card 4 (Infrastructure Platform) Sectors Data
  const card4Sectors = [
    {
      id: 'energy',
      title: 'Energy transition',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8M12 14v8M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      id: 'agri',
      title: 'Food & agribusiness',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22s5-2 9-7 4-13 4-13-2 1-7 5-6 15-6 15z" />
          <path d="M15 2s1 2 4 4 3 9 3 9-3-1-6-4-1-9-1-9z" />
        </svg>
      ),
    },
    {
      id: 'chemicals',
      title: 'Specialty chemicals',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.31M14 2v7.31" />
          <path d="M8.5 2h7" />
          <path d="M14 9.31l6.19 10.31a2 2 0 0 1-1.72 3H5.53a2 2 0 0 1-1.72-3L10 9.31" />
          <circle cx="12" cy="16" r="1.5" />
        </svg>
      ),
    },
    {
      id: 'semi',
      title: 'Semiconductors & advanced manufacturing',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A8863D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="8" y="8" width="8" height="8" />
          <path d="M4 9h-2M4 15h-2M20 9h2M20 15h2M9 4V2M15 4V2M9 20v2M15 20v2" />
        </svg>
      ),
    },
  ];

  // 2-second Count-up & Bar Growth Animation (Runs ONLY ONCE per website load session)
  const [animProgress, setAnimProgress] = useState(0);
  const hasAnimatedRef = useRef(false);

  const [animProgressCard2, setAnimProgressCard2] = useState(0);
  const hasAnimatedCard2Ref = useRef(false);

  const [animProgressCard3, setAnimProgressCard3] = useState(0);
  const hasAnimatedCard3Ref = useRef(false);

  const [animProgressCard4, setAnimProgressCard4] = useState(0);
  const hasAnimatedCard4Ref = useRef(false);

  // Equal scroll window expansion curve for each card (Card 0 -> 1 -> 2 -> 3)
  const getCardExpansion = (idx) => {
    if (isMobile) return 0;
    const ranges = [
      { start: 0.60, openEnd: 0.63, holdEnd: 0.66, closeEnd: 0.69 },
      { start: 0.70, openEnd: 0.73, holdEnd: 0.76, closeEnd: 0.79 },
      { start: 0.80, openEnd: 0.83, holdEnd: 0.86, closeEnd: 0.89 },
      { start: 0.90, openEnd: 0.93, holdEnd: 0.96, closeEnd: 0.99 },
    ];
    const r = ranges[idx];
    if (!r || p < r.start || p > r.closeEnd) return 0;
    if (p >= r.openEnd && p <= r.holdEnd) return 1;
    if (p < r.openEnd) {
      const raw = (p - r.start) / (r.openEnd - r.start);
      return raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
    } else {
      const raw = (r.closeEnd - p) / (r.closeEnd - r.holdEnd);
      return raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
    }
  };

  const card0Exp = getCardExpansion(0);
  const card1Exp = getCardExpansion(1);
  const card2Exp = getCardExpansion(2);
  const card3Exp = getCardExpansion(3);

  // Smooth persistent opacity for "Our Scale & Impact: " throughout the whole expansion phase
  const getExpansionHeaderOpacity = () => {
    if (isMobile) return 0;
    if (p < 0.58 || p > 1.0) return 0;
    if (p >= 0.60 && p <= 0.99) return 1;
    if (p < 0.60) return Math.max(0, (p - 0.58) / 0.02);
    return Math.max(0, (1.0 - p) / 0.01);
  };

  const expansionHeaderOpacity = getExpansionHeaderOpacity();

  const sectorNames = [
    'FMCG & Oleo-Chemicals',
    'Renewable Energy',
    'Electronics & Technology',
    'Infrastructure Platform',
  ];

  const activeSectorIdx = (() => {
    if (p < 0.695) return 0;
    if (p < 0.795) return 1;
    if (p < 0.895) return 2;
    return 3;
  })();

  // Trigger 2-second animation once on first expansion of Card 1
  useEffect(() => {
    if (card0Exp > 0.25 && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      const startTime = performance.now();
      const duration = 2000; // Exact 2 seconds animation

      const animate = (now) => {
        const elapsed = now - startTime;
        const raw = Math.min(1, elapsed / duration);
        // easeOutCubic easing curve for smooth settle
        const ease = 1 - Math.pow(1 - raw, 3);
        setAnimProgress(ease);
        if (raw < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimProgress(1);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [card0Exp]);

  // Trigger 2-second animation once on first expansion of Card 2
  useEffect(() => {
    if (card1Exp > 0.25 && !hasAnimatedCard2Ref.current) {
      hasAnimatedCard2Ref.current = true;
      const startTime = performance.now();
      const duration = 2000; // Exact 2 seconds animation

      const animate = (now) => {
        const elapsed = now - startTime;
        const raw = Math.min(1, elapsed / duration);
        // easeOutCubic easing curve for smooth settle
        const ease = 1 - Math.pow(1 - raw, 3);
        setAnimProgressCard2(ease);
        if (raw < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimProgressCard2(1);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [card1Exp]);

  // Trigger 2-second animation once on first expansion of Card 3
  useEffect(() => {
    if (card2Exp > 0.25 && !hasAnimatedCard3Ref.current) {
      hasAnimatedCard3Ref.current = true;
      const startTime = performance.now();
      const duration = 2000; // Exact 2 seconds animation

      const animate = (now) => {
        const elapsed = now - startTime;
        const raw = Math.min(1, elapsed / duration);
        // easeOutCubic easing curve for smooth settle
        const ease = 1 - Math.pow(1 - raw, 3);
        setAnimProgressCard3(ease);
        if (raw < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimProgressCard3(1);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [card2Exp]);

  // Trigger 2-second animation once on first expansion of Card 4
  useEffect(() => {
    if (card3Exp > 0.25 && !hasAnimatedCard4Ref.current) {
      hasAnimatedCard4Ref.current = true;
      const startTime = performance.now();
      const duration = 2000; // Exact 2 seconds animation

      const animate = (now) => {
        const elapsed = now - startTime;
        const raw = Math.min(1, elapsed / duration);
        // easeOutCubic easing curve for smooth settle
        const ease = 1 - Math.pow(1 - raw, 3);
        setAnimProgressCard4(ease);
        if (raw < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimProgressCard4(1);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [card3Exp]);

  // Formatter helper for animated metric values
  const getAnimatedMetricText = (item, progress) => {
    if (item.isStatic) return item.staticText;
    if (progress >= 1) return item.staticText;
    if (item.isLakh) return '1 lakh+';
    if (item.isDecimal) {
      const cur = (item.value * progress).toFixed(1);
      return `${cur}%`;
    }
    const curVal = Math.round(item.value * progress);
    return `${item.prefix || ''}${curVal.toLocaleString('en-IN')}${item.suffix || ''}`;
  };

  // Fanned deck configuration (Aces card fan from reference image)
  const fanRotations = [-18, -6, 6, 18];
  const fanYOffsets = [14, 2, 2, 14];
  const fanClusterXOffsets = [-55, -18, 18, 55];
  const baseZIndexes = [10, 20, 25, 15];

  // Mathematical geometry calculations (Strictly bounded to 4-card combined grid area)
  const totalGridWidth = gridWidth || 1152;
  const gap = 28; // lg:gap-7 (exact 1.75rem = 28px)
  const colWidth = Math.max(180, (totalGridWidth - 3 * gap) / 4);
  const slotLefts = [
    0,
    colWidth + gap,
    2 * (colWidth + gap),
    3 * (colWidth + gap),
  ];
  const deckCenterX = (totalGridWidth - colWidth) / 2;

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: isMobile ? 'auto' : '750vh' }}
    >
      <div className={isMobile ? 'relative w-full py-10 px-4' : 'sticky top-0 h-screen w-full flex flex-col justify-center py-6 sm:py-8 px-4 sm:px-6 md:px-12 overflow-hidden'}>
        <div className="w-full max-w-7xl mx-auto relative">

          {/* Section Header: Replaces 'Our Journey' with 'Group Portfolio' and shows Constant 'Our Scale & Impact: ' with Dynamic Suffix */}
          <div className="relative text-center mb-6 sm:mb-8 md:mb-10 min-h-[60px] sm:min-h-[70px] flex flex-col items-center justify-center">
            {/* 1. Journey / Group Portfolio Headings (Fades out when cards shift up) */}
            <div
              className="w-full transition-all duration-300 ease-out"
              style={getHeaderFadeStyle()}
            >
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

            {/* 2. Expansion Phase Unified Header: Fixed Pinned Prefix + Smooth Transitioning Dynamic Suffix */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300"
              style={{
                opacity: isMobile ? 0 : expansionHeaderOpacity,
                transform: isMobile ? 'none' : `translate3d(0, ${-22 + (1 - expansionHeaderOpacity) * 12}px, 0)`,
                visibility: isMobile || expansionHeaderOpacity <= 0.001 ? 'hidden' : 'visible',
              }}
            >
              <h2 className="flex flex-wrap items-center justify-center text-center text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold font-['Google_Sans','Montserrat',sans-serif] tracking-tight">
                <span className="gold-gradient-text whitespace-nowrap">
                  Our Scale & Impact:&nbsp;
                </span>
                <span
                  key={activeSectorIdx}
                  className="gold-gradient-text whitespace-nowrap animate-sector-title inline-block"
                >
                  {sectorNames[activeSectorIdx]}
                </span>
              </h2>
            </div>
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
                  const startPercent = 5.2;
                  const totalSpan = 89.6;
                  const leftPercent = startPercent + idx * (totalSpan / (count - 1));
                  const isTop = idx % 2 === 0;

                  return (
                    <div
                      key={`journey-step-${idx}`}
                      className="absolute group flex flex-col items-center select-none"
                      style={{
                        left: `${leftPercent}%`,
                        top: isTop ? '38%' : '62%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="wave-timeline-dot w-8 h-8 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#A8863D] border-[3px] border-white shadow-lg group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(214,180,106,0.8)] transition-all duration-300 cursor-default z-10 relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div
                        style={{
                          top: isTop ? 'auto' : '100%',
                          bottom: isTop ? '100%' : 'auto',
                          marginTop: isTop ? 0 : '14px',
                          marginBottom: isTop ? '14px' : 0,
                          width: '140px',
                        }}
                        className="absolute left-1/2 -translate-x-1/2 text-center transition-all duration-300 group-hover:-translate-y-1"
                      >
                        <span className="block text-base lg:text-lg font-black tracking-tight text-[#8F6E27] font-['Google_Sans','Montserrat',sans-serif]">
                          {step.year}
                        </span>
                        <p className="text-[11px] lg:text-xs font-semibold text-slate-800 leading-snug mt-0.5 font-['Noto_Sans','Krub',sans-serif]">
                          {step.title}
                        </p>
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

            {/* 2. GROUP PORTFOLIO - FANNED DECK, 3D FLIP & SEQUENTIAL EQUAL-WINDOW EXPANSION */}
            <div
              className={`w-full transition-all duration-300 ${!isMobile ? 'absolute inset-0 flex items-center justify-center' : 'mt-8'}`}
              style={{
                opacity: isMobile ? 1 : portfolioOpacity,
                visibility: !isMobile && portfolioOpacity <= 0.001 ? 'hidden' : 'visible',
                pointerEvents: isMobile || portfolioOpacity > 0.5 ? 'auto' : 'none',
              }}
            >
              {isMobile ? (
                /* Mobile Cards (Vertical Grid, Tap to Flip) */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  {portfolioCards.map((card, idx) => (
                    <div
                      key={card.id}
                      onClick={() => setManualFlipped((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                      className="relative w-full min-h-[380px] sm:min-h-[410px] cursor-pointer"
                      style={{ perspective: '1200px' }}
                    >
                      <div
                        className="relative w-full h-full transition-transform duration-500 rounded-3xl"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: manualFlipped[idx] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                      >
                        {/* Mobile Front Face */}
                        <div
                          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                          className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white via-[#FCFAFA] to-[#F8F5EE] border border-[#D6B46A]/45 shadow-[0_12px_32px_rgba(214,180,106,0.18)] p-6 flex flex-col justify-between overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent opacity-80" />
                          <div className="flex items-center justify-between">
                            <span className="text-3xl font-black text-[#A8863D] font-['Google_Sans','Montserrat',sans-serif] tracking-tight">{card.id}</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#F4E7C5] shadow-[0_0_8px_rgba(214,180,106,0.6)]" />
                          </div>
                          <div className="my-auto py-4">
                            <h3 className="text-2xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text leading-snug whitespace-pre-line tracking-tight drop-shadow-[0_1px_2px_rgba(214,180,106,0.25)]">
                              {card.title}
                            </h3>
                            <div className="w-14 h-[3px] rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] to-[#F4E7C5] mt-4 shadow-sm" />
                          </div>
                          <p className="text-[11px] text-[#A8863D] font-bold uppercase tracking-wider">Tap to view details</p>
                        </div>

                        {/* Mobile Back Face */}
                        <div
                          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                          className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FCFAFA] to-[#F5EFE4] border-2 border-[#D6B46A]/50 shadow-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 flex-shrink-0">
                            <span className="text-2xl font-black text-[#A8863D]/80 font-['Google_Sans','Montserrat',sans-serif]">{card.id}</span>
                          </div>
                          <div className="flex-1 flex flex-col justify-start pt-3 pb-2">
                            <h4 className="text-[15px] sm:text-base font-extrabold text-slate-900 leading-snug font-['Google_Sans','Montserrat',sans-serif] mb-2.5 min-h-[44px] sm:min-h-[48px] flex items-start">
                              {card.backHeadline}
                            </h4>
                            {card.backBullets && card.backBullets.length > 0 && (
                              <div className="space-y-2">
                                {card.backBullets.map((bullet, bIdx) => (
                                  <div key={bIdx} className="flex items-center gap-2 p-2 rounded-xl bg-white/90 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[34px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8863D] flex-shrink-0" />
                                    <span className="text-xs font-semibold text-slate-800 leading-snug font-['Noto_Sans','Krub',sans-serif]">{bullet}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {card.logos && card.logos.length > 0 ? (
                            <div className="h-[74px] pt-2 border-t border-slate-200/60 flex flex-col justify-between flex-shrink-0">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                                {card.logos.length > 1 ? 'Key Operating Entities' : 'Key Operating Entity'}
                              </span>
                              <div className={`w-full h-9 flex items-center ${card.logos.length > 1 ? 'justify-around px-2' : 'justify-center'}`}>
                                {card.logos.map((logo, lIdx) => (
                                  <img
                                    key={lIdx}
                                    src={logo.src}
                                    alt={logo.name}
                                    className={`${card.id === '03'
                                        ? 'h-8 sm:h-9 max-w-[130px]'
                                        : 'h-6 sm:h-7 max-w-[95px]'
                                      } object-contain`}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="h-[74px] flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Desktop Cards (Absolute Positioning with Pixel-Smooth Undistorted Equal Expansion strictly bounded to 4-card area) */
                <div
                  ref={gridRef}
                  className="w-full max-w-6xl mx-auto relative h-[420px] sm:h-[430px] md:h-[440px]"
                  style={{
                    transform: `translate3d(0, ${gridShiftY}px, 0)`,
                  }}
                >
                  {portfolioCards.map((card, idx) => {
                    const sep = getCardSeparation(idx);
                    const flipAngle = getCardFlipAngle(idx);

                    // Fanned Deck initial position & separation interpolation
                    const fannedX = deckCenterX + fanClusterXOffsets[idx];
                    const baseLeft = fannedX * (1 - sep) + slotLefts[idx] * sep;
                    const baseY = fanYOffsets[idx] * (1 - sep);
                    const baseRot = fanRotations[idx] * (1 - sep);

                    // Expansion states
                    const thisExp = getCardExpansion(idx);
                    const otherExp = Math.max(
                      0,
                      ...[0, 1, 2, 3].filter((i) => i !== idx).map((i) => getCardExpansion(i))
                    );

                    let cardLeft = baseLeft;
                    let cardWidth = colWidth;
                    let cardOpacity = 1;
                    let cardZIndex = baseZIndexes[idx];
                    let cardY = baseY;
                    let cardRot = baseRot;
                    let innerContentOpacity = 1;
                    let topGoldLineOpacity = 1;

                    if (thisExp > 0) {
                      // Active expanding card (Strictly opens from its slot to cover 0 -> totalGridWidth):
                      // Card 0: slotLefts[0]=0 -> stays at 0, width expands right to totalGridWidth
                      // Card 1: slotLefts[1] -> left glides to 0, width expands left & right to totalGridWidth
                      // Card 2: slotLefts[2] -> left glides to 0, width expands left & right to totalGridWidth
                      // Card 3: slotLefts[3] -> left glides to 0, width expands left to totalGridWidth
                      cardLeft = slotLefts[idx] * (1 - thisExp);
                      cardWidth = colWidth + (totalGridWidth - colWidth) * thisExp;
                      cardOpacity = 1;
                      cardZIndex = 50;
                      cardY = 0;
                      cardRot = 0;
                      // Text content fades out so card is clean & blank during expansion
                      innerContentOpacity = Math.max(0, 1 - thisExp * 2.5);
                      // Top thick gold line fades out on expansion as requested by user
                      topGoldLineOpacity = Math.max(0, 1 - thisExp * 3);
                    } else if (otherExp > 0) {
                      // Sibling card while another card is expanding:
                      cardLeft = slotLefts[idx];
                      cardWidth = colWidth;
                      cardOpacity = Math.max(0, 1 - otherExp * 2.5);
                      cardZIndex = 10;
                      cardY = 0;
                      cardRot = 0;
                      innerContentOpacity = 1;
                      topGoldLineOpacity = 1;
                    } else {
                      // Normal state
                      cardLeft = baseLeft;
                      cardWidth = colWidth;
                      cardOpacity = 1;
                      cardZIndex = sep > 0.92 ? 10 : baseZIndexes[idx];
                      cardY = baseY;
                      cardRot = baseRot;
                      innerContentOpacity = 1;
                      topGoldLineOpacity = 1;
                    }

                    return (
                      <div
                        key={card.id}
                        onClick={(e) => {
                          if (navigateTo && (flipAngle > 90 || sep > 0.95)) {
                            navigateTo(card.link, e);
                          }
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: `${cardLeft}px`,
                          width: `${cardWidth}px`,
                          height: '100%',
                          transform: `translate3d(0, ${cardY}px, 0) rotate(${cardRot}deg)`,
                          opacity: cardOpacity,
                          zIndex: cardZIndex,
                          perspective: '1200px',
                          willChange: 'transform, width, left, opacity',
                          pointerEvents: cardOpacity <= 0.05 ? 'none' : 'auto',
                        }}
                        className="h-full select-none"
                      >
                        {/* 3D Rotating Inner Card Box (NO hover popups, solid & clean) */}
                        <div
                          className="relative w-full h-full rounded-3xl"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: `rotateY(${flipAngle}deg)`,
                            willChange: 'transform',
                          }}
                        >
                          {/* ================= FRONT FACE (Heading & Number Only) ================= */}
                          <div
                            style={{
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                            className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white via-[#FCFAFA] to-[#F8F5EE] border border-[#D6B46A]/45 shadow-[0_14px_36px_rgba(214,180,106,0.18)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
                          >
                            {/* Top ambient gold light shimmer */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent opacity-80" />

                            {/* Top Index */}
                            <div className="flex items-center justify-between">
                              <span className="text-3xl sm:text-4xl font-black text-[#A8863D] font-['Google_Sans','Montserrat',sans-serif] tracking-tight">
                                {card.id}
                              </span>
                              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#7a5b1e] via-[#D6B46A] to-[#F4E7C5] shadow-[0_0_8px_rgba(214,180,106,0.6)]" />
                            </div>

                            {/* Center Main Heading in Rich Golden Color */}
                            <div className="my-auto py-4">
                              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text leading-tight whitespace-pre-line tracking-tight drop-shadow-[0_1px_3px_rgba(214,180,106,0.25)]">
                                {card.title}
                              </h3>
                              <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] to-[#F4E7C5] mt-4 shadow-sm" />
                            </div>

                            {/* Minimal bottom spacing indicator */}
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#D6B46A]" />
                              <div className="w-6 h-[1.5px] rounded-full bg-[#D6B46A]/40" />
                            </div>
                          </div>

                          {/* ================= BACK FACE ================= */}
                          <div
                            style={{
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                            }}
                            className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FCFAFA] to-[#F5EFE4] border-2 border-[#D6B46A]/45 shadow-[0_16px_40px_rgba(214,180,106,0.20)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
                          >
                            {/* Top gold line (fades away on expansion as requested) */}
                            <div
                              style={{
                                opacity: topGoldLineOpacity,
                                transition: 'opacity 0.2s ease',
                              }}
                              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent"
                            />

                            {/* Top Index (Normal unexpanded state) */}
                            <div
                              style={{
                                opacity: innerContentOpacity,
                                transition: 'opacity 0.15s ease',
                              }}
                              className="flex items-center justify-between pb-2.5 border-b border-slate-200/60 flex-shrink-0"
                            >
                              <span className="text-2xl sm:text-3xl font-black text-[#A8863D]/80 font-['Google_Sans','Montserrat',sans-serif]">
                                {card.id}
                              </span>
                            </div>

                            {/* Main Content Area (Normal unexpanded state) */}
                            <div
                              style={{
                                opacity: innerContentOpacity,
                                transition: 'opacity 0.15s ease',
                              }}
                              className="flex-1 flex flex-col justify-start pt-3.5 pb-2"
                            >
                              <h4 className="text-base sm:text-[17px] md:text-[18px] font-extrabold text-slate-900 leading-snug font-['Google_Sans','Montserrat',sans-serif] tracking-tight mb-3 min-h-[50px] sm:min-h-[54px] flex items-start">
                                {card.backHeadline}
                              </h4>

                              {card.backBullets && card.backBullets.length > 0 && (
                                <div className="space-y-2.5">
                                  {card.backBullets.map((bullet, bIdx) => (
                                    <div
                                      key={bIdx}
                                      className="flex items-center gap-2.5 p-2 px-2.5 rounded-xl bg-white/90 border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] min-h-[38px]"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8863D] flex-shrink-0" />
                                      <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug font-['Noto_Sans','Krub',sans-serif]">
                                        {bullet}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Bottom Section (Logos for Cards with logos - Fixed height for exact horizontal alignment across cards) */}
                            {card.logos && card.logos.length > 0 ? (
                              <div
                                style={{
                                  opacity: innerContentOpacity,
                                  transition: 'opacity 0.15s ease',
                                }}
                                className="h-[88px] pt-2.5 border-t border-slate-200/60 flex flex-col justify-between flex-shrink-0"
                              >
                                <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 text-center block">
                                  {card.logos.length > 1 ? 'Key Operating Entities' : 'Key Operating Entity'}
                                </span>
                                <div className={`w-full h-11 flex items-center ${card.logos.length > 1 ? 'justify-around px-2' : 'justify-center'}`}>
                                  {card.logos.map((logo, lIdx) => (
                                    <img
                                      key={lIdx}
                                      src={logo.src}
                                      alt={logo.name}
                                      className={`${card.id === '03'
                                          ? 'h-10 sm:h-11 max-w-[140px]'
                                          : 'h-7 sm:h-8 max-w-[105px]'
                                        } object-contain transition-transform hover:scale-105`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="h-[88px] flex-shrink-0" />
                            )}

                            {/* Expanded View for Card 1 (9 Animated Metrics on Left + 2 Animated Bar Charts on Right) */}
                            {idx === 0 && thisExp > 0.05 && (
                              <div
                                style={{
                                  opacity: Math.max(0, (thisExp - 0.25) / 0.75),
                                  pointerEvents: thisExp > 0.7 ? 'auto' : 'none',
                                }}
                                className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 select-none overflow-hidden"
                              >
                                {/* Left Section: 9 Key Metrics (3x3 Grid with Animated Count-up Numbers) */}
                                <div className="w-full lg:w-[48%] flex flex-col justify-center h-full">
                                  <div className="grid grid-cols-3 gap-y-4 sm:gap-y-5 md:gap-y-6 gap-x-2.5 sm:gap-x-3.5 md:gap-x-4 w-full my-auto">
                                    {card1Metrics.map((metric, mIdx) => (
                                      <div key={mIdx} className="flex flex-col justify-center">
                                        <span className="text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] tracking-tight leading-tight">
                                          {getAnimatedMetricText(metric, animProgress)}
                                        </span>
                                        <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-slate-600 font-['Noto_Sans','Krub',sans-serif] mt-0.5 leading-snug">
                                          {metric.label}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Subtle Vertical Divider */}
                                <div className="hidden lg:block w-[1.5px] bg-gradient-to-b from-transparent via-[#D6B46A]/40 to-transparent h-4/5 self-center flex-shrink-0" />

                                {/* Right Section: 2 Financial Bar Charts (Revenue & Operating Profit) */}
                                <div className="w-full lg:w-[49%] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 items-center h-full">
                                  {/* Chart 1: Revenue (₹ Cr.) */}
                                  <div className="flex flex-col h-full justify-between py-1">
                                    <h5 className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] text-center mb-1">
                                      Revenue (₹ Cr.)
                                    </h5>
                                    <div className="relative h-36 sm:h-40 md:h-44 w-full flex flex-col justify-end">
                                      {/* Background horizontal grid lines */}
                                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-35">
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                      </div>

                                      {/* 5 Vertical Bar Columns */}
                                      <div className="grid grid-cols-5 gap-1 sm:gap-1.5 h-full items-end pb-0.5 relative z-10">
                                        {revenueChartData.map((bar, bIdx) => {
                                          const barHeightPct = Math.max(4, (bar.value / 22000) * 100 * animProgress);
                                          const curDisplayVal = animProgress >= 1
                                            ? bar.display
                                            : (bar.value * animProgress).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                          return (
                                            <div key={bIdx} className="flex flex-col items-center h-full justify-end">
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-slate-800 font-['Google_Sans','Montserrat',sans-serif] mb-0.5 whitespace-nowrap">
                                                {curDisplayVal}
                                              </span>
                                              <div
                                                style={{ height: `${barHeightPct}%` }}
                                                className="w-full rounded-t-sm bg-gradient-to-t from-[#B8923F] via-[#D6B46A] to-[#E5C97E] border-t border-x border-[#D6B46A]/60 shadow-xs"
                                              />
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[8.5px] text-slate-600 font-semibold font-['Noto_Sans','Krub',sans-serif] mt-1 text-center whitespace-nowrap block truncate w-full">
                                                {bar.label}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Chart 2: Operating Profit (₹ Cr.) */}
                                  <div className="flex flex-col h-full justify-between py-1">
                                    <h5 className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] text-center mb-1">
                                      Operating Profit (₹ Cr.)
                                    </h5>
                                    <div className="relative h-36 sm:h-40 md:h-44 w-full flex flex-col justify-end">
                                      {/* Background horizontal grid lines */}
                                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-35">
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                      </div>

                                      {/* 5 Vertical Bar Columns */}
                                      <div className="grid grid-cols-5 gap-1 sm:gap-1.5 h-full items-end pb-0.5 relative z-10">
                                        {profitChartData.map((bar, bIdx) => {
                                          const barHeightPct = Math.max(4, (bar.value / 820) * 100 * animProgress);
                                          const curDisplayVal = animProgress >= 1
                                            ? bar.display
                                            : (bar.value * animProgress).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                          return (
                                            <div key={bIdx} className="flex flex-col items-center h-full justify-end">
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-slate-800 font-['Google_Sans','Montserrat',sans-serif] mb-0.5 whitespace-nowrap">
                                                {curDisplayVal}
                                              </span>
                                              <div
                                                style={{ height: `${barHeightPct}%` }}
                                                className="w-full rounded-t-sm bg-gradient-to-t from-[#B8923F] via-[#D6B46A] to-[#E5C97E] border-t border-x border-[#D6B46A]/60 shadow-xs"
                                              />
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[8.5px] text-slate-600 font-semibold font-['Noto_Sans','Krub',sans-serif] mt-1 text-center whitespace-nowrap block truncate w-full">
                                                {bar.label}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Expanded View for Card 2 - Renewable Energy (Exact identical design to Card 1) */}
                            {idx === 1 && thisExp > 0.05 && (
                              <div
                                style={{
                                  opacity: Math.max(0, (thisExp - 0.25) / 0.75),
                                  pointerEvents: thisExp > 0.7 ? 'auto' : 'none',
                                }}
                                className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 select-none overflow-hidden"
                              >
                                {/* Left Section: Key Metrics (Exact same grid & typography as Card 1) */}
                                <div className="w-full lg:w-[48%] flex flex-col justify-center h-full">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 sm:gap-y-5 md:gap-y-6 gap-x-2.5 sm:gap-x-3.5 md:gap-x-4 w-full my-auto">
                                    {card2Metrics.map((metric, mIdx) => (
                                      <div key={mIdx} className="flex flex-col justify-center">
                                        <span className="text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] tracking-tight leading-tight">
                                          {getAnimatedMetricText(metric, animProgressCard2)}
                                        </span>
                                        <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-slate-600 font-['Noto_Sans','Krub',sans-serif] mt-0.5 leading-snug">
                                          {metric.label}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Subtle Vertical Divider */}
                                <div className="hidden lg:block w-[1.5px] bg-gradient-to-b from-transparent via-[#D6B46A]/40 to-transparent h-4/5 self-center flex-shrink-0" />

                                {/* Right Section: 2 Financial Bar Charts side-by-side (Exact same layout & style as Card 1) */}
                                <div className="w-full lg:w-[49%] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 items-center h-full">
                                  {/* Chart 1: Revenue (₹ Cr.) */}
                                  <div className="flex flex-col h-full justify-between py-1">
                                    <h5 className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] text-center mb-1">
                                      Revenue (₹ Cr.)
                                    </h5>
                                    <div className="relative h-36 sm:h-40 md:h-44 w-full flex flex-col justify-end">
                                      {/* Background horizontal grid lines */}
                                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-35">
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                      </div>

                                      {/* 4 Vertical Bar Columns */}
                                      <div className="grid grid-cols-4 gap-1 sm:gap-1.5 h-full items-end pb-0.5 relative z-10">
                                        {card2RevenueData.map((bar, bIdx) => {
                                          const barHeightPct = Math.max(4, (bar.value / 9500) * 100 * animProgressCard2);
                                          const curDisplayVal = animProgressCard2 >= 1
                                            ? bar.display
                                            : (bar.value * animProgressCard2).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                          return (
                                            <div key={bIdx} className="flex flex-col items-center h-full justify-end">
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-slate-800 font-['Google_Sans','Montserrat',sans-serif] mb-0.5 whitespace-nowrap">
                                                {curDisplayVal}
                                              </span>
                                              <div
                                                style={{ height: `${barHeightPct}%` }}
                                                className="w-full rounded-t-sm bg-gradient-to-t from-[#B8923F] via-[#D6B46A] to-[#E5C97E] border-t border-x border-[#D6B46A]/60 shadow-xs"
                                              />
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[8.5px] text-slate-600 font-semibold font-['Noto_Sans','Krub',sans-serif] mt-1 text-center whitespace-nowrap block truncate w-full">
                                                {bar.label}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Chart 2: Operating Profit (₹ Cr.) */}
                                  <div className="flex flex-col h-full justify-between py-1">
                                    <h5 className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] text-center mb-1">
                                      Operating Profit (₹ Cr.)
                                    </h5>
                                    <div className="relative h-36 sm:h-40 md:h-44 w-full flex flex-col justify-end">
                                      {/* Background horizontal grid lines */}
                                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-35">
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                        <div className="w-full border-b border-stone-300" />
                                      </div>

                                      {/* 4 Vertical Bar Columns */}
                                      <div className="grid grid-cols-4 gap-1 sm:gap-1.5 h-full items-end pb-0.5 relative z-10">
                                        {card2ProfitData.map((bar, bIdx) => {
                                          const barHeightPct = Math.max(4, (bar.value / 2800) * 100 * animProgressCard2);
                                          const curDisplayVal = animProgressCard2 >= 1
                                            ? bar.display
                                            : (bar.value * animProgressCard2).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                          return (
                                            <div key={bIdx} className="flex flex-col items-center h-full justify-end">
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-slate-800 font-['Google_Sans','Montserrat',sans-serif] mb-0.5 whitespace-nowrap">
                                                {curDisplayVal}
                                              </span>
                                              <div
                                                style={{ height: `${barHeightPct}%` }}
                                                className="w-full rounded-t-sm bg-gradient-to-t from-[#B8923F] via-[#D6B46A] to-[#E5C97E] border-t border-x border-[#D6B46A]/60 shadow-xs"
                                              />
                                              <span className="text-[7.5px] sm:text-[8px] md:text-[8.5px] text-slate-600 font-semibold font-['Noto_Sans','Krub',sans-serif] mt-1 text-center whitespace-nowrap block truncate w-full">
                                                {bar.label}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Expanded View for Card 3 - Electronics & Technology (Exact identical design to Card 1) */}
                            {idx === 2 && thisExp > 0.05 && (
                              <div
                                style={{
                                  opacity: Math.max(0, (thisExp - 0.25) / 0.75),
                                  pointerEvents: thisExp > 0.7 ? 'auto' : 'none',
                                }}
                                className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 select-none overflow-hidden"
                              >
                                {/* Left Section: Key Metrics (Exact same grid & typography as Card 1) */}
                                <div className="w-full lg:w-[48%] flex flex-col justify-center h-full">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 sm:gap-y-5 md:gap-y-6 gap-x-2.5 sm:gap-x-3.5 md:gap-x-4 w-full my-auto">
                                    {card3Metrics.map((metric, mIdx) => (
                                      <div key={mIdx} className="flex flex-col justify-center">
                                        <span className="text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] tracking-tight leading-tight">
                                          {getAnimatedMetricText(metric, animProgressCard3)}
                                        </span>
                                        <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-slate-600 font-['Noto_Sans','Krub',sans-serif] mt-0.5 leading-snug">
                                          {metric.label}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Subtle Vertical Divider */}
                                <div className="hidden lg:block w-[1.5px] bg-gradient-to-b from-transparent via-[#D6B46A]/40 to-transparent h-4/5 self-center flex-shrink-0" />

                                {/* Right Section: SiC Semiconductor Applications */}
                                <div className="w-full lg:w-[49%] flex flex-col justify-center h-full">
                                  <h5 className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] text-center mb-4 sm:mb-6">
                                    SiC Semiconductor Applications
                                  </h5>
                                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full my-auto px-2 sm:px-4">
                                    {card3Applications.map((app, aIdx) => (
                                      <div
                                        key={aIdx}
                                        style={{
                                          opacity: animProgressCard3 >= 0.1 ? 1 : animProgressCard3 * 10,
                                          transform: `translate3d(0, ${(1 - animProgressCard3) * 12}px, 0)`,
                                        }}
                                        className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#FFFDF9]/90 border border-[#D6B46A]/35 shadow-xs hover:border-[#D6B46A]/60 transition-all duration-300"
                                      >
                                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#7a5b1e]/15 via-[#D6B46A]/25 to-[#A8863D]/15 border border-[#D6B46A]/40 flex items-center justify-center flex-shrink-0 shadow-xs">
                                          {app.icon}
                                        </div>
                                        <span className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight">
                                          {app.title}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Expanded View for Card 4 - Infrastructure Platform (Exact identical design to Card 1) */}
                            {idx === 3 && thisExp > 0.05 && (
                              <div
                                style={{
                                  opacity: Math.max(0, (thisExp - 0.25) / 0.75),
                                  pointerEvents: thisExp > 0.7 ? 'auto' : 'none',
                                }}
                                className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 select-none overflow-hidden"
                              >
                                {/* Left Section: Key Metrics (Exact same grid & typography as Card 1) */}
                                <div className="w-full lg:w-[48%] flex flex-col justify-center h-full">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 sm:gap-y-5 md:gap-y-6 gap-x-2.5 sm:gap-x-3.5 md:gap-x-4 w-full my-auto">
                                    {card4Metrics.map((metric, mIdx) => (
                                      <div key={mIdx} className="flex flex-col justify-center">
                                        <span className="text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] tracking-tight leading-tight">
                                          {getAnimatedMetricText(metric, animProgressCard4)}
                                        </span>
                                        <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-slate-600 font-['Noto_Sans','Krub',sans-serif] mt-0.5 leading-snug">
                                          {metric.label}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Subtle Vertical Divider */}
                                <div className="hidden lg:block w-[1.5px] bg-gradient-to-b from-transparent via-[#D6B46A]/40 to-transparent h-4/5 self-center flex-shrink-0" />

                                {/* Right Section: AAG's Platform - Sectors to be Included */}
                                <div className="w-full lg:w-[49%] flex flex-col justify-center h-full">
                                  <h5 className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] text-center mb-4 sm:mb-6">
                                    AAG&apos;s Platform: Sectors to be Included
                                  </h5>
                                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full my-auto px-2 sm:px-4">
                                    {card4Sectors.map((sector, sIdx) => (
                                      <div
                                        key={sIdx}
                                        style={{
                                          opacity: animProgressCard4 >= 0.1 ? 1 : animProgressCard4 * 10,
                                          transform: `translate3d(0, ${(1 - animProgressCard4) * 12}px, 0)`,
                                        }}
                                        className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#FFFDF9]/90 border border-[#D6B46A]/35 shadow-xs hover:border-[#D6B46A]/60 transition-all duration-300"
                                      >
                                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#7a5b1e]/15 via-[#D6B46A]/25 to-[#A8863D]/15 border border-[#D6B46A]/40 flex items-center justify-center flex-shrink-0 shadow-xs">
                                          {sector.icon}
                                        </div>
                                        <span className="text-xs sm:text-[13px] md:text-sm font-bold text-slate-900 font-['Google_Sans','Montserrat',sans-serif] leading-tight">
                                          {sector.title}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function CompanyCard({ company, isMobile, navigateTo }) {
  const cardRef = useRef(null);

  return (
    <section
      id={company.id}
      className="scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 min-h-auto w-full flex items-center justify-center px-3 py-2 sm:px-6 sm:py-3 md:px-4 md:py-3"
      style={{ contain: 'layout style' }}
    >
      <div
        ref={cardRef}
        data-company-card-inner="true"
        className="bg-white/95 rounded-[24px] sm:rounded-3xl p-4 sm:p-7 md:p-5 lg:p-7 max-w-6xl w-full sm:w-[95%] border border-[#D6B46A]/30 shadow-xl"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {/* Gold accent top bar */}
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-[#7a5b1e] via-[#D6B46A] via-[#CFB377] to-[#8f6e27] mb-5 sm:mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 md:gap-4 mb-6 sm:mb-8 md:mb-4 border-b border-[#D6B46A]/20 pb-4 sm:pb-6 md:pb-3 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-4 flex-1">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 shadow-xl transform transition-all duration-300 hover:scale-105 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${company.logoColors.join(', ')})` }}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner transition-colors duration-500">
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
                    Explore Full Agastya Energy Industries and infrastructure Page <i className="fas fa-arrow-right text-[10px]"></i>
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

        <div className={isMobile ? 'rounded-none border-0 bg-transparent p-0 shadow-none mb-5' : 'relative bg-[#FCFAFA] rounded-[20px] p-4 sm:p-6 md:p-4 mb-6 sm:mb-8 md:mb-4 border-l-4 border-l-[#D6B46A] border border-[#D6B46A]/20 shadow-xs transition-all duration-300 hover:shadow-sm'}>
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
  const glowMidPathRef = useRef(null);
  const startDotRef = useRef(null);
  const endDotRef = useRef(null);
  const leadDotRef = useRef(null);
  const pathLengthRef = useRef(0);
  const pointsTableRef = useRef(null);

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
      };
    });

    const R = 24;
    const c0 = cardRects[0];
    const c1 = cardRects[1];
    const c2 = cardRects[2];
    const c3 = cardRects[3];

    const d = [
      `M ${c0.right} ${c0.top}`,
      `L ${c0.right} ${c0.bottom}`,
      `L ${c1.right} ${c1.top + R}`,
      `A ${R} ${R} 0 0 0 ${c1.right - R} ${c1.top}`,
      `L ${c1.left + R} ${c1.top}`,
      `A ${R} ${R} 0 0 0 ${c1.left} ${c1.top + R}`,
      `L ${c1.left} ${c1.bottom}`,
      `L ${c2.left} ${c2.top + R}`,
      `A ${R} ${R} 0 0 1 ${c2.left + R} ${c2.top}`,
      `L ${c2.right - R} ${c2.top}`,
      `A ${R} ${R} 0 0 1 ${c2.right} ${c2.top + R}`,
      `L ${c2.right} ${c2.bottom}`,
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
    const timer = setTimeout(() => {
      calculatePath();
      ScrollTrigger.refresh();
    }, 250);

    const container = containerRef.current;
    let ro;
    if (typeof ResizeObserver !== 'undefined' && container) {
      ro = new ResizeObserver(() => {
        calculatePath();
        ScrollTrigger.refresh();
      });
      ro.observe(container);
    }

    const handleResize = () => {
      calculatePath();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [calculatePath]);

  useEffect(() => {
    const wavePath = wavePathRef.current;
    const glowPath = glowPathRef.current;
    const glowMidPath = glowMidPathRef.current;
    if (!wavePath || !pathD) return;

    try {
      const len = wavePath.getTotalLength();
      if (len > 0) {
        pathLengthRef.current = len;
        wavePath.style.strokeDasharray = `${len}`;
        wavePath.style.strokeDashoffset = `${len}`;
        glowPath.style.strokeDasharray = `${len}`;
        glowPath.style.strokeDashoffset = `${len}`;
        if (glowMidPath) {
          glowMidPath.style.strokeDasharray = `${len}`;
          glowMidPath.style.strokeDashoffset = `${len}`;
        }

        const numSamples = 500;
        const points = [];
        const step = len / (numSamples - 1);
        for (let i = 0; i < numSamples; i++) {
          const pt = wavePath.getPointAtLength(i * step);
          points.push({ x: Math.round(pt.x * 10) / 10, y: Math.round(pt.y * 10) / 10 });
        }
        pointsTableRef.current = points;
      }
    } catch (e) { }
  }, [pathD]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef?.current;
    const waveThread = waveThreadRef.current;
    const wavePath = wavePathRef.current;
    const glowPath = glowPathRef.current;
    const glowMidPath = glowMidPathRef.current;
    const startDot = startDotRef.current;
    const endDot = endDotRef.current;
    const leadDot = leadDotRef.current;

    if (!container || !scrollContainer || !pathD) return;

    const ctx = gsap.context(() => {
      const renderProgress = (progress) => {
        const p = Math.max(0, Math.min(1, progress));
        const len = pathLengthRef.current || (wavePath ? wavePath.getTotalLength() : 0);

        if (!waveThread || !wavePath || !glowPath || len <= 0) return;

        if (p <= 0.002) {
          waveThread.style.opacity = '0';
          wavePath.style.strokeDashoffset = `${len}`;
          glowPath.style.strokeDashoffset = `${len}`;
          if (glowMidPath) glowMidPath.style.strokeDashoffset = `${len}`;
          if (startDot) startDot.style.opacity = '0';
          if (endDot) endDot.style.opacity = '0';
          if (leadDot) leadDot.style.opacity = '0';
        } else {
          waveThread.style.opacity = '1';
          const drawnLength = len * p;
          const offset = Math.max(0, len - drawnLength);

          wavePath.style.strokeDashoffset = `${offset}`;
          glowPath.style.strokeDashoffset = `${offset}`;
          if (glowMidPath) glowMidPath.style.strokeDashoffset = `${offset}`;

          if (startDot) startDot.style.opacity = p >= 0.008 ? '1' : '0';
          if (endDot) endDot.style.opacity = p >= 0.98 ? '1' : '0';

          if (leadDot) {
            const table = pointsTableRef.current;
            if (table && table.length > 0 && p > 0.003 && p < 0.997) {
              leadDot.style.opacity = '1';
              const idx = Math.min(table.length - 1, Math.max(0, Math.round(p * (table.length - 1))));
              const pt = table[idx];
              if (pt) {
                leadDot.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
              }
            } else {
              leadDot.style.opacity = '0';
            }
          }
        }
      };

      const anim = { p: 0 };

      gsap.to(anim, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          scroller: scrollContainer,
          start: 'top 72%',
          end: 'bottom 82%',
          scrub: 0.6,
          onUpdate: (self) => {
            renderProgress(self.progress);
          },
        },
      });

      ScrollTrigger.refresh();
    }, container);

    return () => {
      ctx.revert();
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
          style={{ filter: 'drop-shadow(0 0 6px rgba(214,180,106,0.45))' }}
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
          </defs>

          {/* Soft wide background glow */}
          {pathD && (
            <path
              ref={glowPathRef}
              d={pathD}
              stroke="#D6B46A"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.14"
            />
          )}

          {/* Mid golden glow */}
          {pathD && (
            <path
              ref={glowMidPathRef}
              d={pathD}
              stroke="#CFB377"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.32"
            />
          )}

          {/* Main Crisp Golden Wave Thread Coinciding ON Card Borders */}
          {pathD && (
            <path
              ref={wavePathRef}
              d={pathD}
              stroke="url(#waveThreadGoldCompanies)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Start node (Card 0 Top-Right corner) */}
          <g ref={startDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
            <circle cx={startCoords.x} cy={startCoords.y} r="7" fill="#D6B46A" opacity="0.3" />
            <circle cx={startCoords.x} cy={startCoords.y} r="5" fill="#D6B46A" />
            <circle cx={startCoords.x} cy={startCoords.y} r="2.8" fill="#FFFFFF" />
          </g>

          {/* End node (Card 3 bottom-left corner) */}
          <g ref={endDotRef} style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
            <circle cx={endCoords.x} cy={endCoords.y} r="7" fill="#D6B46A" opacity="0.3" />
            <circle cx={endCoords.x} cy={endCoords.y} r="5" fill="#D6B46A" />
            <circle cx={endCoords.x} cy={endCoords.y} r="2.8" fill="#FFFFFF" />
          </g>

          {/* Dynamic Leading Head */}
          <g ref={leadDotRef} style={{ opacity: 0 }}>
            <circle r="12" fill="#D6B46A" opacity="0.25" />
            <circle r="6.5" fill="#D6B46A" />
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

const footprintCountries = [
  {
    id: 'india',
    name: 'India',
    flagCode: 'in',
    enter: 0.14,
    exit: 0.30,
    offices: [
      {
        city: 'Mumbai',
        address: '217, Adani Inspire, BKC, Bandra(E), Mumbai - 400051',
      },
      {
        city: 'Delhi',
        address: 'Unit No.315, 2nd Floor, The DLF South Court, Plot No. A-1, Saket Place District Centre, New Delhi -110017',
      },
      {
        city: 'Noida',
        address: '7th Floor, BN Corporate Park, Plot No 18, Noida-135, Gautam Buddha Nagar, Noida, Uttar Pradesh - 201304',
      },
    ],
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flagCode: 'gb',
    enter: 0.30,
    exit: 0.40,
    offices: [
      {
        city: 'London',
        address: '167-169 Great Portland Street, 5th Floor, W1W 5PF, London, GB | United Kingdom',
      },
    ],
  },
  {
    id: 'singapore',
    name: 'Singapore',
    flagCode: 'sg',
    enter: 0.40,
    exit: 0.50,
    offices: [
      {
        city: 'Singapore',
        address: '65 Chulia Street, #42-07, OCBC Centre, Singapore - 049513',
      },
    ],
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    flagCode: 'ae',
    enter: 0.50,
    exit: 0.60,
    offices: [
      {
        city: 'Dubai',
        address: 'Office number 5, 45th floor Burj Al Salam Tower, Trade Centre First, Dubai, U.A.E.',
      },
    ],
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    flagCode: 'tz',
    enter: 0.60,
    exit: 0.68,
    offices: [],
  },
  {
    id: 'liberia',
    name: 'Liberia',
    flagCode: 'lr',
    enter: 0.68,
    exit: 0.76,
    offices: [],
  },
];

function WavingCountryFlag({ country }) {
  const turbRef = useRef(null);
  const flagWrapRef = useRef(null);
  const sheenRef = useRef(null);

  // GSAP continuous smooth wave turbulence animation
  useEffect(() => {
    const turb = turbRef.current;
    const sheen = sheenRef.current;
    if (!turb) return;

    // Smooth wave ripple tween
    const waveTween = gsap.to(turb, {
      attr: { baseFrequency: '0.018 0.038' },
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Light sheen sweep over the silk folds
    let sheenTween;
    if (sheen) {
      sheenTween = gsap.to(sheen, {
        x: '140%',
        duration: 3.8,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }

    return () => {
      waveTween.kill();
      sheenTween?.kill();
    };
  }, []);

  // GSAP smooth cross-fade when active country changes
  useEffect(() => {
    const flagEl = flagWrapRef.current;
    if (!flagEl) return;

    gsap.fromTo(
      flagEl,
      { opacity: 0, scale: 0.95, y: 12 },
      { opacity: 0.22, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }
    );
  }, [country.id]);

  const flagUrl = `https://flagcdn.com/w1280/${country.flagCode}.png`;
  const filterId = `waving-filter-${country.id}`;

  return (
    <div className="relative w-full max-w-2xl h-[280px] sm:h-[340px] md:h-[400px] flex items-center justify-center pointer-events-none select-none overflow-visible">
      {/* Background Soft Gold Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-[#D6B46A]/20 via-[#D6B46A]/5 to-transparent rounded-full blur-3xl scale-110 pointer-events-none" />

      {/* SVG Turbulence & Displacement Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.010 0.020"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="32"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Feathered & Merged Flag Canvas */}
      <div
        ref={flagWrapRef}
        className="relative w-full h-full flex items-center justify-center will-change-transform"
        style={{
          opacity: 0.22,
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 80%)',
        }}
      >
        <img
          src={flagUrl}
          alt={`${country.name} Flag`}
          className="w-full h-full object-cover rounded-3xl"
          style={{
            filter: `url(#${filterId})`,
            transform: 'perspective(900px) rotateY(-4deg) rotateX(2deg)',
          }}
        />

        {/* Dynamic Light Sheen Sweep Layer */}
        <div
          ref={sheenRef}
          className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-r from-transparent via-white/25 via-[#FFF2D4]/20 to-transparent -translate-x-full"
        />
      </div>
    </div>
  );
}

function ContactUsSection({ scrollContainerRef, isMobile, onSectionActiveChange }) {
  const trackRef = useRef(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Contact Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    description: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  // Pinned scroll progress tracker and synchronous navbar hide handler
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

      // Hide navbar instantly as soon as user reaches / approaches Contact Us section
      if (!isMobile && onSectionActiveChange) {
        const isNearOrInsideContact = trackTop <= 120 && trackBottom > 80;
        onSectionActiveChange(isNearOrInsideContact);
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
        if (Math.abs(diff) < 0.0003) return targetProgressRef.current;
        return prev + diff * 0.18;
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
      onSectionActiveChange?.(false);
    };
  }, [scrollContainerRef, reducedMotion, isMobile, onSectionActiveChange]);

  const p = currentProgress;

  // Active country for flag crossfade
  const activeCountry =
    footprintCountries.find((c) => p >= c.enter && p < c.exit) ||
    (p < 0.14 ? footprintCountries[0] : footprintCountries[footprintCountries.length - 1]);

  // Dual Header animation: Starts centered in viewport -> Docks to top -> Morphs from "Our Global Footprint" to "Contact Us"
  const getDualHeaderStyles = () => {
    if (isMobile) {
      const isContact = p >= 0.76;
      return {
        headerTransform: 'none',
        footprintTitleStyle: { opacity: isContact ? 0 : 1, transform: 'none', display: isContact ? 'none' : 'flex' },
        contactTitleStyle: { opacity: isContact ? 1 : 0, transform: 'none', display: isContact ? 'flex' : 'none' },
        dividerOpacity: 1,
      };
    }

    const centerStartY = 33; // in vh units
    const startP = 0.015;
    const endP = 0.13;
    const swapStart = 0.74;
    const swapEnd = 0.82;

    let currentY = centerStartY;
    let scale = 1.25;
    let dividerOpacity = 0;

    if (p <= startP) {
      currentY = centerStartY;
      scale = 1.25;
      dividerOpacity = 0;
    } else if (p > startP && p < endP) {
      const raw = (p - startP) / (endP - startP);
      const ease = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      currentY = centerStartY * (1 - ease);
      scale = 1 + 0.25 * (1 - ease);
      dividerOpacity = Math.max(0, (raw - 0.35) / 0.65);
    } else {
      currentY = 0;
      scale = 1.0;
      dividerOpacity = 1;
    }

    // Title swap calculations
    let footprintTitleOpacity = 1;
    let footprintTitleY = 0;
    let contactTitleOpacity = 0;
    let contactTitleY = 24;

    if (p < swapStart) {
      footprintTitleOpacity = 1;
      footprintTitleY = 0;
      contactTitleOpacity = 0;
      contactTitleY = 24;
    } else if (p >= swapStart && p < swapEnd) {
      const raw = (p - swapStart) / (swapEnd - swapStart);
      const ease = Math.sin((raw * Math.PI) / 2);
      footprintTitleOpacity = 1 - ease;
      footprintTitleY = -24 * ease;
      contactTitleOpacity = ease;
      contactTitleY = 24 * (1 - ease);
    } else {
      footprintTitleOpacity = 0;
      footprintTitleY = -24;
      contactTitleOpacity = 1;
      contactTitleY = 0;
    }

    return {
      headerTransform: `translate3d(0, ${currentY}vh, 0) scale(${scale})`,
      footprintTitleStyle: {
        opacity: footprintTitleOpacity,
        transform: `translate3d(0, ${footprintTitleY}px, 0)`,
        pointerEvents: footprintTitleOpacity > 0.5 ? 'auto' : 'none',
        visibility: footprintTitleOpacity <= 0.001 ? 'hidden' : 'visible',
      },
      contactTitleStyle: {
        opacity: contactTitleOpacity,
        transform: `translate3d(0, ${contactTitleY}px, 0)`,
        pointerEvents: contactTitleOpacity > 0.5 ? 'auto' : 'none',
        visibility: contactTitleOpacity <= 0.001 ? 'hidden' : 'visible',
      },
      dividerOpacity,
    };
  };

  const { headerTransform, footprintTitleStyle, contactTitleStyle, dividerOpacity } = getDualHeaderStyles();

  // Layer transition for Global Footprint vs Contact Us Body
  const getBodyLayerStyles = () => {
    if (isMobile) {
      const isContact = p >= 0.76;
      return {
        footprintLayerStyle: { opacity: isContact ? 0 : 1, display: isContact ? 'none' : 'block' },
        contactLayerStyle: { opacity: isContact ? 1 : 0, display: isContact ? 'block' : 'none' },
      };
    }

    const swapStart = 0.74;
    const swapEnd = 0.82;

    let footprintOpacity = 1;
    let footprintY = 0;
    let contactOpacity = 0;
    let contactY = 28;

    if (p < swapStart) {
      footprintOpacity = 1;
      footprintY = 0;
      contactOpacity = 0;
      contactY = 28;
    } else if (p >= swapStart && p < swapEnd) {
      const raw = (p - swapStart) / (swapEnd - swapStart);
      const ease = Math.sin((raw * Math.PI) / 2);
      footprintOpacity = 1 - ease;
      footprintY = -24 * ease;
      contactOpacity = ease;
      contactY = 28 * (1 - ease);
    } else {
      footprintOpacity = 0;
      footprintY = -24;
      contactOpacity = 1;
      contactY = 0;
    }

    return {
      footprintLayerStyle: {
        opacity: footprintOpacity,
        transform: `translate3d(0, ${footprintY}px, 0)`,
        pointerEvents: footprintOpacity > 0.5 ? 'auto' : 'none',
        visibility: footprintOpacity <= 0.001 ? 'hidden' : 'visible',
      },
      contactLayerStyle: {
        opacity: contactOpacity,
        transform: `translate3d(0, ${contactY}px, 0)`,
        pointerEvents: contactOpacity > 0.5 ? 'auto' : 'none',
        visibility: contactOpacity <= 0.001 ? 'hidden' : 'visible',
      },
    };
  };

  const { footprintLayerStyle, contactLayerStyle } = getBodyLayerStyles();

  // Helper for smooth country name opacity & translateY (reveals after heading reaches top)
  const getCountryStyle = (c, idx) => {
    if (isMobile) {
      const isActive = activeCountry.id === c.id;
      return {
        opacity: isActive ? 1 : 0,
        transform: 'none',
        display: isActive ? 'block' : 'none',
      };
    }

    const blend = 0.05;
    let opacity = 0;
    let translateY = 24;

    if (idx === 0) {
      // India enters once heading is near top (p = 0.14)
      const enterStart = 0.13;
      const enterEnd = 0.20;
      const exitStart = c.exit - blend;
      const exitEnd = c.exit;

      if (p < enterStart) {
        opacity = 0;
        translateY = 24;
      } else if (p >= enterStart && p < enterEnd) {
        const raw = (p - enterStart) / (enterEnd - enterStart);
        const ease = Math.sin((raw * Math.PI) / 2);
        opacity = ease;
        translateY = 24 * (1 - ease);
      } else if (p >= enterEnd && p <= exitStart) {
        opacity = 1;
        translateY = 0;
      } else if (p > exitStart && p < exitEnd) {
        const raw = (p - exitStart) / blend;
        const ease = Math.sin((raw * Math.PI) / 2);
        opacity = 1 - ease;
        translateY = -24 * ease;
      } else {
        opacity = 0;
        translateY = -24;
      }
    } else {
      const enterStart = c.enter - blend;
      const enterEnd = c.enter;
      const isLast = idx === footprintCountries.length - 1;
      const exitStart = c.exit - blend;
      const exitEnd = c.exit;

      if (p < enterStart) {
        opacity = 0;
        translateY = 24;
      } else if (p >= enterStart && p < enterEnd) {
        const raw = (p - enterStart) / blend;
        const ease = Math.sin((raw * Math.PI) / 2);
        opacity = ease;
        translateY = 24 * (1 - ease);
      } else if (isLast ? p >= enterEnd : p >= enterEnd && p <= exitStart) {
        opacity = 1;
        translateY = 0;
      } else if (!isLast && p > exitStart && p < exitEnd) {
        const raw = (p - exitStart) / blend;
        const ease = Math.sin((raw * Math.PI) / 2);
        opacity = 1 - ease;
        translateY = -24 * ease;
      } else {
        opacity = 0;
        translateY = -24;
      }
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      visibility: opacity <= 0.001 ? 'hidden' : 'visible',
    };
  };

  // Helper for smooth offices container reveal under India
  const getOfficesContainerStyle = () => {
    if (isMobile) {
      const show = activeCountry.id === 'india';
      return { opacity: show ? 1 : 0, display: show ? 'flex' : 'none' };
    }

    const enterStart = 0.18;
    const enterEnd = 0.24;
    const exitStart = 0.26;
    const exitEnd = 0.30;

    let opacity = 0;
    let translateY = 20;

    if (p < enterStart) {
      opacity = 0;
      translateY = 20;
    } else if (p >= enterStart && p < enterEnd) {
      const raw = (p - enterStart) / (enterEnd - enterStart);
      const ease = Math.sin((raw * Math.PI) / 2);
      opacity = ease;
      translateY = 20 * (1 - ease);
    } else if (p >= enterEnd && p <= exitStart) {
      opacity = 1;
      translateY = 0;
    } else if (p > exitStart && p < exitEnd) {
      const raw = (p - exitStart) / (exitEnd - exitStart);
      const ease = Math.sin((raw * Math.PI) / 2);
      opacity = 1 - ease;
      translateY = -20 * ease;
    } else {
      opacity = 0;
      translateY = -20;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      visibility: opacity <= 0.001 ? 'hidden' : 'visible',
    };
  };

  // Helper for cascading individual office slide-in
  const getOfficeItemStyle = (idx) => {
    if (isMobile) return { opacity: 1, transform: 'none' };

    const start = 0.185 + idx * 0.012;
    const end = start + 0.03;

    let opacity = 0;
    let translateX = -16;

    if (p < start) {
      opacity = 0;
      translateX = -16;
    } else if (p >= start && p < end) {
      const raw = (p - start) / (end - start);
      const ease = Math.sin((raw * Math.PI) / 2);
      opacity = ease;
      translateX = -16 * (1 - ease);
    } else {
      opacity = 1;
      translateX = 0;
    }

    return {
      opacity,
      transform: `translate3d(${translateX}px, 0, 0)`,
    };
  };

  // Right-side flag fade-in once heading is docked
  const rightSideFlagOpacity = isMobile
    ? 1
    : p < 0.13
      ? 0
      : p < 0.20
        ? Math.sin(((p - 0.13) / 0.07) * (Math.PI / 2))
        : p > 0.74
          ? Math.max(0, 1 - (p - 0.74) / 0.06)
          : 1;

  return (
    <div
      ref={trackRef}
      id="contact"
      className="relative w-full"
      style={{ height: isMobile ? 'auto' : '560vh' }}
    >
      <div className={isMobile ? 'relative w-full py-4 px-4' : 'sticky top-0 h-screen w-full flex flex-col justify-start pt-1 sm:pt-2 md:pt-3 pb-2 px-4 sm:px-6 md:px-12 overflow-hidden'}>
        <div className="w-full max-w-7xl mx-auto relative flex flex-col h-full">

          {/* Section Header: Dual Morphed Header (Our Global Footprint -> Contact Us) */}
          <div
            className="text-center mb-2 sm:mb-3.5 relative flex-shrink-0 will-change-transform"
            style={{ transform: headerTransform }}
          >
            <div className="relative h-10 sm:h-12 flex items-center justify-center">
              {/* Heading 1: Our Global Footprint */}
              <h2
                className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text tracking-tight drop-shadow-[0_4px_16px_rgba(214,180,106,0.25)] will-change-transform"
                style={footprintTitleStyle}
              >
                Our Global Footprint
              </h2>

              {/* Heading 2: Contact Us */}
              <h2
                className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text tracking-tight drop-shadow-[0_4px_16px_rgba(214,180,106,0.25)] will-change-transform"
                style={contactTitleStyle}
              >
                Contact Us
              </h2>
            </div>
            <div
              className="mt-1.5 mx-auto h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent transition-opacity duration-300"
              style={{ opacity: dividerOpacity }}
            />
          </div>

          {/* Body Container: Hosts Global Footprint OR Modern Contact Us Form */}
          <div className="relative w-full flex-1 flex items-start pt-1 sm:pt-2 md:pt-3 overflow-hidden">

            {/* 1. GLOBAL FOOTPRINT LAYER */}
            <div
              className="absolute inset-0 w-full h-full will-change-transform"
              style={footprintLayerStyle}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">

                {/* LEFT SIDE: Country Name & Offices Stack */}
                <div className="lg:col-span-6 flex flex-col items-start pt-1">
                  <div className="relative w-full min-h-[320px] sm:min-h-[360px] flex flex-col items-start">
                    {footprintCountries.map((country, idx) => (
                      <div
                        key={country.id}
                        className="absolute inset-x-0 top-0 will-change-transform flex flex-col items-start"
                        style={getCountryStyle(country, idx)}
                      >
                        {/* Country Heading */}
                        <h4 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Google_Sans','Montserrat',sans-serif] gold-gradient-text tracking-tight uppercase">
                          {country.name}
                        </h4>

                        {/* Offices list for this country if any */}
                        {country.offices && country.offices.length > 0 && (
                          <div
                            className="mt-3 sm:mt-4 flex flex-col space-y-2.5 sm:space-y-3 w-full max-w-xl will-change-transform"
                            style={country.id === 'india' ? getOfficesContainerStyle() : undefined}
                          >
                            <div className="flex items-center space-x-2 pb-1 border-b border-[#D6B46A]/25">
                              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#B3934B] font-bold">
                                {country.offices.length > 1 ? 'Our Offices' : 'Office Location'}
                              </span>
                            </div>

                            <div className="flex flex-col space-y-2.5 sm:space-y-3 pt-0.5 max-h-[340px] sm:max-h-[380px] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                              {country.offices.map((office, offIdx) => (
                                <div
                                  key={office.city}
                                  className="flex flex-col group will-change-transform"
                                  style={country.id === 'india' ? getOfficeItemStyle(offIdx) : undefined}
                                >
                                  <div className="flex items-center space-x-2.5">
                                    {/* Gold Indicator Bullet */}
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#D6B46A] shadow-[0_0_6px_rgba(214,180,106,0.7)] flex-shrink-0" />

                                    {/* City Name */}
                                    <span className="text-base sm:text-lg md:text-xl font-bold font-['Google_Sans','Montserrat',sans-serif] text-[#1A1814] tracking-wide">
                                      {office.city}
                                    </span>
                                  </div>

                                  {/* Full Address */}
                                  {office.address && (
                                    <p className="pl-4.5 sm:pl-5 text-xs sm:text-[13px] text-[#4A4335] font-normal leading-relaxed mt-0.5">
                                      {office.address}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE: GSAP-Animated Waving Flag (Merged with Low Opacity) */}
                <div
                  className="lg:col-span-6 relative flex items-center justify-center min-h-[280px] sm:min-h-[340px] transition-opacity duration-300"
                  style={{ opacity: rightSideFlagOpacity }}
                >
                  <WavingCountryFlag country={activeCountry} />
                </div>

              </div>
            </div>

            {/* 2. MODERN CONTACT US FORM LAYER (FULL-WIDTH UNDERLINE REFERENCE DESIGN) */}
            <div
              className="absolute inset-0 w-full h-full will-change-transform flex flex-col items-center justify-start pt-1 sm:pt-3 px-2 sm:px-6 md:px-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={contactLayerStyle}
            >
              <div className="w-full max-w-5xl mx-auto pb-4 pt-1">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 rounded-3xl bg-white/60 backdrop-blur-md border border-[#D6B46A]/25 p-8 shadow-sm animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 rounded-full bg-[#D6B46A]/20 border border-[#D6B46A] flex items-center justify-center text-[#B3934B]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold gold-gradient-text font-['Google_Sans','Montserrat',sans-serif]">Message Received!</h4>
                    <p className="text-sm sm:text-base text-[#554D3F] max-w-md">
                      Thank you for reaching out. Our team will review your inquiry and get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: '', description: '' });
                      }}
                      className="mt-2 text-xs uppercase tracking-[0.2em] text-[#B3934B] hover:text-[#8C7030] font-bold underline cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="w-full space-y-6 sm:space-y-8">
                    {/* Top Row: Full Name & E-mail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                      {/* Full Name */}
                      <div className="flex flex-col space-y-1 group">
                        <label className="text-sm sm:text-base md:text-lg font-medium font-['Google_Sans','Montserrat',sans-serif] text-[#1A1814] tracking-tight">
                          Full Name <span className="text-[#D6B46A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-transparent border-0 border-b-2 border-[#1A1814]/30 focus:border-[#D6B46A] py-2 text-sm sm:text-base text-[#1A1814] placeholder:text-[#9E9382]/50 focus:outline-none transition-colors duration-300 rounded-none"
                        />
                      </div>

                      {/* E-mail */}
                      <div className="flex flex-col space-y-1 group">
                        <label className="text-sm sm:text-base md:text-lg font-medium font-['Google_Sans','Montserrat',sans-serif] text-[#1A1814] tracking-tight">
                          E-mail <span className="text-[#D6B46A]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-transparent border-0 border-b-2 border-[#1A1814]/30 focus:border-[#D6B46A] py-2 text-sm sm:text-base text-[#1A1814] placeholder:text-[#9E9382]/50 focus:outline-none transition-colors duration-300 rounded-none"
                        />
                      </div>
                    </div>

                    {/* Middle Row: Ph: & Subject */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                      {/* Ph: */}
                      <div className="flex flex-col space-y-1 group">
                        <label className="text-sm sm:text-base md:text-lg font-medium font-['Google_Sans','Montserrat',sans-serif] text-[#1A1814] tracking-tight">
                          Ph:
                        </label>
                        <input
                          type="tel"
                          placeholder="XX 98 XX 43 XX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-transparent border-0 border-b-2 border-[#1A1814]/30 focus:border-[#D6B46A] py-2 text-sm sm:text-base text-[#1A1814] placeholder:text-[#9E9382]/50 focus:outline-none transition-colors duration-300 rounded-none"
                        />
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col space-y-1 group">
                        <label className="text-sm sm:text-base md:text-lg font-medium font-['Google_Sans','Montserrat',sans-serif] text-[#1A1814] tracking-tight">
                          Subject <span className="text-[#D6B46A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Inquiry / Requirement"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-transparent border-0 border-b-2 border-[#1A1814]/30 focus:border-[#D6B46A] py-2 text-sm sm:text-base text-[#1A1814] placeholder:text-[#9E9382]/50 focus:outline-none transition-colors duration-300 rounded-none"
                        />
                      </div>
                    </div>

                    {/* Bottom Row: Message / Description */}
                    <div className="flex flex-col space-y-1 group">
                      <label className="text-sm sm:text-base md:text-lg font-medium font-['Google_Sans','Montserrat',sans-serif] text-[#1A1814] tracking-tight">
                        Message <span className="text-[#D6B46A]">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Write your message here..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-transparent border-0 border-b-2 border-[#1A1814]/30 focus:border-[#D6B46A] py-2 text-sm sm:text-base text-[#1A1814] placeholder:text-[#9E9382]/50 focus:outline-none transition-colors duration-300 resize-none rounded-none"
                      />
                    </div>

                    {/* Bottom Action Row: Mail Us On (Left) & Send Message Button (Right) */}
                    <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      {/* Left: Mail Us On */}
                      <div className="flex flex-col items-start">
                        <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#8C8270] font-semibold">
                          Mail us on
                        </span>
                        <a
                          href="mailto:info@aag.global"
                          className="text-sm sm:text-base font-bold text-[#1A1814] hover:text-[#B3934B] transition-colors flex items-center space-x-1.5 group cursor-pointer"
                        >
                          <span>info@aag.global</span>
                          <svg className="w-3.5 h-3.5 text-[#D6B46A] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>

                      {/* Right: Send Message Button */}
                      <div className="flex justify-end w-full sm:w-auto">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#D6B46A] via-[#E2C785] to-[#B3934B] text-[#1A1814] font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-md shadow-[#D6B46A]/20 hover:shadow-lg hover:shadow-[#D6B46A]/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
                        >
                          {submitting ? (
                            <span>Sending...</span>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <svg className="w-3.5 h-3.5 text-[#1A1814]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function App() {
  const containerRef = useRef(null);
  const particleGroupRef = useRef(null);
  const contentRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const [journeyActive, setJourneyActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);
  const hideNavbar = journeyActive || contactActive;

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

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (!contactElem || !contentRef.current) return;

    const containerRect = contentRef.current.getBoundingClientRect();
    const contactRect = contactElem.getBoundingClientRect();
    const currentScroll = contentRef.current.scrollTop;

    const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 768;
    const totalScrollable = Math.max(0, contactElem.offsetHeight - contentRef.current.clientHeight);
    const offsetWithinContact = isMobileView ? 0 : totalScrollable * 0.83;

    const targetScroll = currentScroll + (contactRect.top - containerRect.top) + offsetWithinContact;

    contentRef.current.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: 'smooth',
    });
  };

  const navigateTo = (pageId, e = null) => {
    if (e) e.preventDefault();
    if (pageId === 'contact') {
      setMenuOpen(false);
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          scrollToContact();
        }, 150);
      } else {
        scrollToContact();
      }
      return;
    }
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
      fullName: 'Agastya Energy Industries and infrastructure',
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
              { id: 'contact', label: "Let's Connect" },
            ].map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.id === 'contact' ? '#contact' : `/${item.id}`}
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
                { id: 'contact', label: "Let's Connect" },
              ].map((item) => (
                <a
                  key={`mobile-${item.id}`}
                  href={item.id === 'contact' ? '#contact' : `/${item.id}`}
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
                      Building enduring enterprises, powering India
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
              onPortfolioActiveChange={setJourneyActive}
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

            {/* Pinned Contact Us Section (Exact header position as Our Journey + Navbar Auto-Hide) */}
            <ContactUsSection
              scrollContainerRef={contentRef}
              isMobile={isMobile}
              onSectionActiveChange={setContactActive}
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
                <a href="/agastya" onClick={(e) => navigateTo('agastya', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Agastya Energy Industries and infrastructure</a>
                <a href="/about" onClick={(e) => navigateTo('about', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Leadership & Structure</a>
                <a href="/investors" onClick={(e) => navigateTo('investors', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Investors & Banking</a>
                <a href="/media" onClick={(e) => navigateTo('media', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Media & Press</a>
                <a href="#contact" onClick={(e) => navigateTo('contact', e)} className="text-xs sm:text-sm text-stone-300 hover:text-[#D6B46A] transition-colors">Let's Connect</a>
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