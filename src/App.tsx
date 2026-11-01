/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Navigation, STORY_CHAPTERS } from './components/Navigation.tsx';
import { OpeningScreen } from './components/OpeningScreen.tsx';
import { Chapter00WhoAmI } from './components/Chapter00WhoAmI.tsx';
import { Chapter01WhereItBegan } from './components/Chapter01WhereItBegan.tsx';
import { Chapter02APlaceCalledHome } from './components/Chapter02APlaceCalledHome.tsx';
import { Chapter03ANewChapter } from './components/Chapter03ANewChapter.tsx';
import { Chapter04TheTechPlotTwist } from './components/Chapter04TheTechPlotTwist.tsx';
import { Chapter05ThingsIveBuilt } from './components/Chapter05ThingsIveBuilt.tsx';
import { Chapter06Hackathons } from './components/Chapter06Hackathons.tsx';
import { Chapter07WhatIKnow } from './components/Chapter07WhatIKnow.tsx';
import { Chapter08WhatsNext } from './components/Chapter08WhatsNext.tsx';
import { CustomHeartCursor } from './components/CustomHeartCursor.tsx';
import { ChevronLeft, ChevronRight, MousePointerClick, ArrowDown } from 'lucide-react';

const ParticleScene = dynamic(
  () => import('./components/ParticleScene.tsx').then((module) => module.ParticleScene),
  { ssr: false }
);

const CHAPTER_IDS = [
  'who-am-i',
  'where-it-began',
  'a-place-called-home',
  'a-new-chapter',
  'the-tech-plot-twist',
  'things-ive-built',
  'hackathons',
  'what-i-know',
  'whats-next',
];

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [continuousProgress, setContinuousProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isNavigatingRef = useRef(false);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Enter the portfolio experience from Opening Screen
  const handleEnter = useCallback(() => {
    setHasEntered(true);
    // Smooth transition into Chapter 00
    setTimeout(() => {
      const el = document.getElementById(CHAPTER_IDS[0]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, []);

  // Scroll to a specific chapter by ID
  const handleScrollToChapter = useCallback((id: string) => {
    const targetIdx = CHAPTER_IDS.indexOf(id);
    if (targetIdx !== -1) {
      setActiveChapterIndex(targetIdx);
      setContinuousProgress(targetIdx);
    }
    const el = document.getElementById(id);
    if (el) {
      isNavigatingRef.current = true;
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 750);
    }
  }, []);

  // Advance to next chapter
  const handleNextChapter = useCallback(() => {
    const nextIdx = Math.min(CHAPTER_IDS.length - 1, activeChapterIndex + 1);
    handleScrollToChapter(CHAPTER_IDS[nextIdx]);
  }, [activeChapterIndex, handleScrollToChapter]);

  // Return to previous chapter
  const handlePrevChapter = useCallback(() => {
    const prevIdx = Math.max(0, activeChapterIndex - 1);
    handleScrollToChapter(CHAPTER_IDS[prevIdx]);
  }, [activeChapterIndex, handleScrollToChapter]);

  // Continuous Natural Scrolling Tracker: ties scene transformation directly to scroll progress
  useEffect(() => {
    if (!hasEntered) return;

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;

      if (docHeight <= 0) return;

      const elements = CHAPTER_IDS.map((id) => document.getElementById(id));
      const centerY = windowHeight * 0.45;

      let computedFraction = 0;
      let found = false;

      // Calculate continuous progress by tracking position relative to viewport center
      for (let i = 0; i < elements.length - 1; i++) {
        const el = elements[i];
        const nextEl = elements[i + 1];
        if (!el || !nextEl) continue;

        const rect = el.getBoundingClientRect();
        const nextRect = nextEl.getBoundingClientRect();

        if (rect.top <= centerY && nextRect.top > centerY) {
          const span = nextRect.top - rect.top;
          const offset = centerY - rect.top;
          computedFraction = i + Math.max(0, Math.min(1, offset / (span || 1)));
          found = true;
          break;
        }
      }

      if (!found) {
        const lastEl = elements[elements.length - 1];
        if (lastEl && lastEl.getBoundingClientRect().top <= centerY) {
          computedFraction = elements.length - 1;
        } else {
          computedFraction = (scrollY / docHeight) * (elements.length - 1);
        }
      }

      setContinuousProgress(computedFraction);
      setActiveChapterIndex(Math.max(0, Math.min(elements.length - 1, Math.round(computedFraction))));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  // Click on opening screen triggers entry; within chapters, navigation is driven by scroll, HUD, and buttons to prevent accidental advancement
  const handleGlobalClick = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasEntered) {
        handleEnter();
      }
    },
    [hasEntered, handleEnter]
  );

  // Keyboard navigation: ArrowRight / Space / Enter -> Next; ArrowLeft / Backspace -> Prev
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (!hasEntered) {
        if (['Enter', ' ', 'ArrowDown', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          handleEnter();
        }
        return;
      }

      if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        handleNextChapter();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        handlePrevChapter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered, handleEnter, handleNextChapter, handlePrevChapter]);

  // Ambient Environment Color Gradient continuously interpolated by scroll progress
  const getAmbientGradient = () => {
    if (!hasEntered) {
      return 'radial-gradient(circle at 50% 50%, rgba(255, 133, 162, 0.08), transparent 70%)';
    }

    const p = Math.max(0, Math.min(8, continuousProgress));
    if (p < 1) {
      // Ch 00: Who Am I? (Cyan & Rose)
      return 'radial-gradient(circle at 75% 45%, rgba(120, 231, 255, 0.14), rgba(255, 133, 162, 0.08), transparent 65%)';
    } else if (p < 2) {
      // Ch 01: Where It Began (Kerala - Emerald & Rose)
      return 'radial-gradient(circle at 60% 40%, rgba(16, 185, 129, 0.12), rgba(255, 133, 162, 0.08), transparent 70%)';
    } else if (p < 3) {
      // Ch 02: A Place Called Home (Qatar - Lavender & Amber)
      return 'radial-gradient(circle at 40% 30%, rgba(167, 139, 250, 0.15), rgba(245, 158, 11, 0.08), transparent 70%)';
    } else if (p < 4) {
      // Ch 03: A New Chapter (Chennai - Cyan & Lavender)
      return 'radial-gradient(circle at 70% 35%, rgba(120, 231, 255, 0.15), rgba(167, 139, 250, 0.08), transparent 70%)';
    } else if (p < 5) {
      // Ch 04: The Tech Plot Twist (Rose & Emerald)
      return 'radial-gradient(circle at 50% 50%, rgba(255, 133, 162, 0.16), rgba(16, 185, 129, 0.10), transparent 70%)';
    } else if (p < 6) {
      // Ch 05: Things I've Built (Rose & Cyan Systems)
      return 'radial-gradient(circle at 30% 40%, rgba(255, 133, 162, 0.15), rgba(120, 231, 255, 0.10), transparent 70%)';
    } else if (p < 7) {
      // Ch 06: Hackathons & Competitions (Amber Gold & Sapphire)
      return 'radial-gradient(circle at 65% 40%, rgba(245, 158, 11, 0.16), rgba(56, 189, 248, 0.10), transparent 70%)';
    } else if (p < 8) {
      // Ch 07: What I Know (Lavender Constellation)
      return 'radial-gradient(circle at 60% 30%, rgba(192, 132, 252, 0.18), rgba(255, 133, 162, 0.08), transparent 70%)';
    } else {
      // Ch 08: What's Next? (Rose & Cosmic Horizon)
      return 'radial-gradient(circle at 50% 50%, rgba(255, 133, 162, 0.20), rgba(120, 231, 255, 0.12), transparent 70%)';
    }
  };

  // Helper to calculate smooth scroll-linked emergence and depth
  const getSectionStyle = (index: number) => {
    if (reducedMotion) return {};
    const dist = Math.abs(continuousProgress - index);
    const opacity = Math.max(0.18, Math.min(1, 1 - Math.max(0, dist - 0.25) * 1.15));
    const translateY = (continuousProgress - index) * -22;
    const scale = Math.max(0.97, Math.min(1, 1 - dist * 0.025));

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    };
  };

  return (
    <div
      onClick={handleGlobalClick}
      className="relative min-h-screen bg-[#030305] text-[#F1F3F9] selection:bg-[#FF85A2]/30 selection:text-[#FFA3B8]"
    >
      {/* Tasteful glowing pink heart cursor with stardust wake */}
      <CustomHeartCursor />

      {/* Morphing Atmospheric Ambient Backdrop */}
      <div
        className="pointer-events-none fixed inset-0 transition-all duration-700 ease-out z-0"
        style={{ backgroundImage: getAmbientGradient() }}
      />

      {/* Fixed 3D WebGL Particle Sculpture & Cosmic Stardust (smooth continuous pose interpolation) */}
      <ParticleScene
        reducedMotion={reducedMotion}
        showHero={hasEntered && continuousProgress < 0.65}
        chapterIndex={activeChapterIndex}
        continuousProgress={continuousProgress}
        isOpening={!hasEntered}
      />

      {/* Minimal Opening Screen: Pixelated Portrait Focus, "HELLO, THIS IS ANAGHA", ENTER / EXPLORE */}
      {!hasEntered && (
        <OpeningScreen onEnter={handleEnter} />
      )}

      {/* Persistent Navigation Bar (revealed once entered) */}
      {hasEntered && (
        <Navigation
          chapterIndex={activeChapterIndex}
          onSelectChapter={handleScrollToChapter}
        />
      )}

      {/* Main Cinematic Chapter Experience with Smooth Continuous Scroll Emergence */}
      {hasEntered && (
        <main className="relative z-10 flex flex-col">
          {/* Chapter 00: Who Am I? */}
          <section
            id="who-am-i"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 00: Who Am I?"
            style={getSectionStyle(0)}
          >
            <Chapter00WhoAmI
              onContinue={() => handleScrollToChapter('where-it-began')}
            />
          </section>

          {/* Chapter 01: Where It Began */}
          <section
            id="where-it-began"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 01: Where It Began"
            style={getSectionStyle(1)}
          >
            <Chapter01WhereItBegan
              onContinue={() => handleScrollToChapter('a-place-called-home')}
            />
          </section>

          {/* Chapter 02: A Place Called Home */}
          <section
            id="a-place-called-home"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 02: A Place Called Home"
            style={getSectionStyle(2)}
          >
            <Chapter02APlaceCalledHome
              onContinue={() => handleScrollToChapter('a-new-chapter')}
            />
          </section>

          {/* Chapter 03: A New Chapter */}
          <section
            id="a-new-chapter"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 03: A New Chapter"
            style={getSectionStyle(3)}
          >
            <Chapter03ANewChapter
              onContinue={() => handleScrollToChapter('the-tech-plot-twist')}
            />
          </section>

          {/* Chapter 04: The Tech Plot Twist */}
          <section
            id="the-tech-plot-twist"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 04: The Tech Plot Twist"
            style={getSectionStyle(4)}
          >
            <Chapter04TheTechPlotTwist
              onContinue={() => handleScrollToChapter('things-ive-built')}
            />
          </section>

          {/* Chapter 05: Things I've Built */}
          <section
            id="things-ive-built"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 05: Things I've Built"
            style={getSectionStyle(5)}
          >
            <Chapter05ThingsIveBuilt
              onContinue={() => handleScrollToChapter('hackathons')}
            />
          </section>

          {/* Chapter 06: Hackathons & Competitions */}
          <section
            id="hackathons"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 06: Hackathons & Competitions"
            style={getSectionStyle(6)}
          >
            <Chapter06Hackathons
              onContinue={() => handleScrollToChapter('what-i-know')}
            />
          </section>

          {/* Chapter 07: What I Know */}
          <section
            id="what-i-know"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 07: What I Know"
            style={getSectionStyle(7)}
          >
            <Chapter07WhatIKnow
              onContinue={() => handleScrollToChapter('whats-next')}
            />
          </section>

          {/* Chapter 08: What's Next? */}
          <section
            id="whats-next"
            className="min-h-screen flex items-center justify-center relative scroll-mt-14"
            aria-label="Chapter 08: What's Next?"
            style={getSectionStyle(8)}
          >
            <Chapter08WhatsNext
              onReplay={() => handleScrollToChapter('who-am-i')}
            />
          </section>
        </main>
      )}

      {/* Floating Bottom Cinematic Navigation Cue & Chapter Step HUD */}
      {hasEntered && (
        <aside
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-[#090b10]/85 px-4 py-2 font-mono text-xs text-[#CBD5E1] shadow-2xl backdrop-blur-md"
          aria-label="Cinematic Navigation HUD"
        >
          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevChapter();
            }}
            disabled={activeChapterIndex === 0}
            className={`p-1 rounded-full transition-colors cursor-pointer interactive-control ${
              activeChapterIndex === 0
                ? 'opacity-30 cursor-not-allowed text-white/30'
                : 'text-white hover:bg-white/10 hover:text-[#FFA3B8]'
            }`}
            aria-label="Previous Chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Visual Cue: Scroll or Navigate to Explore */}
          <div className="flex items-center gap-2 text-[11px]">
            <MousePointerClick className="w-3.5 h-3.5 text-[#FF85A2] animate-pulse" />
            <span className="hidden sm:inline text-white/60">SCROLL OR NAVIGATE TO EXPLORE</span>
            <span className="sm:hidden text-white/60">SCROLL TO EXPLORE</span>
            <span className="text-[#FF85A2] font-bold">
              [ 0{activeChapterIndex} / 08 ]
            </span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextChapter();
            }}
            disabled={activeChapterIndex === CHAPTER_IDS.length - 1}
            className={`p-1 rounded-full transition-colors cursor-pointer interactive-control ${
              activeChapterIndex === CHAPTER_IDS.length - 1
                ? 'opacity-30 cursor-not-allowed text-white/30'
                : 'text-white hover:bg-white/10 hover:text-[#FFA3B8]'
            }`}
            aria-label="Next Chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </aside>
      )}
    </div>
  );
}
