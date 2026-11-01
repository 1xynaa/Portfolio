/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '../utils/portfolioData.ts';
import { Download, Menu, X, ArrowDown } from 'lucide-react';

export interface StoryChapterMeta {
  index: number;
  id: string;
  label: string;
  title: string;
  category: string;
}

export const STORY_CHAPTERS: StoryChapterMeta[] = [
  { index: 0, id: 'who-am-i', label: '00 // WHO AM I', title: 'Who Am I?', category: 'DOSSIER' },
  { index: 1, id: 'where-it-began', label: '01 // WHERE IT BEGAN', title: 'Where It Began', category: 'KERALA' },
  { index: 2, id: 'a-place-called-home', label: '02 // A PLACE CALLED HOME', title: 'A Place Called Home', category: 'QATAR' },
  { index: 3, id: 'a-new-chapter', label: '03 // A NEW CHAPTER', title: 'A New Chapter', category: 'CHENNAI' },
  { index: 4, id: 'the-tech-plot-twist', label: '04 // THE TECH PLOT TWIST', title: 'The Tech Plot Twist', category: 'TURNING POINT' },
  { index: 5, id: 'things-ive-built', label: '05 // THINGS I’VE BUILT', title: "Things I've Built", category: 'SYSTEMS' },
  { index: 6, id: 'hackathons', label: '06 // HACKATHONS', title: 'Hackathons & Competitions', category: 'ARENAS' },
  { index: 7, id: 'what-i-know', label: '07 // WHAT I KNOW', title: 'What I Know', category: 'CAPABILITIES' },
  { index: 8, id: 'whats-next', label: '08 // WHAT’S NEXT?', title: "What's Next?", category: 'THE FUTURE' },
];

interface NavigationProps {
  chapterIndex: number;
  onSelectChapter: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  chapterIndex,
  onSelectChapter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentChapter = STORY_CHAPTERS[chapterIndex] ?? STORY_CHAPTERS[0];
  const progressPercent = ((chapterIndex + 1) / STORY_CHAPTERS.length) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030305]/90 backdrop-blur-md border-b border-white/10">
      {/* Scroll-Driven Story Progress Bar */}
      <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#FF85A2] via-[#C084FC] to-[#78E7FF] transition-all duration-300 ease-out shadow-[0_0_12px_#FF85A2]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Identity Mark */}
        <button
          type="button"
          onClick={() => onSelectChapter('who-am-i')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF85A2] cursor-pointer text-left"
          aria-label="Back to top - Anagha Mithra"
        >
          <div className="w-8 h-8 rounded border border-[#FF85A2]/40 bg-[#FF85A2]/10 flex items-center justify-center font-mono text-xs font-bold text-[#FFA3B8] group-hover:border-[#FF85A2] group-hover:bg-[#FF85A2]/20 transition-all shadow-[0_0_10px_rgba(255,133,162,0.2)]">
            AM
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-widest text-[#F1F3F9] uppercase group-hover:text-[#FFA3B8] transition-colors font-semibold">
              ANAGHA MITHRA
            </span>
            <span className="font-mono text-[10px] text-[#94A3B8] tracking-wider hidden sm:inline">
              ANAGHA MITHRA AINIPPULLY REMITH // CH 0{chapterIndex}
            </span>
          </div>
        </button>

        {/* Desktop Chapter Navigation Tabs with Smooth Scroll */}
        <nav className="hidden xl:flex items-center gap-1 font-mono text-[11px]" aria-label="Cinematic Story Navigation">
          {STORY_CHAPTERS.map((item) => {
            const isActive = chapterIndex === item.index;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectChapter(item.id)}
                className={`px-2.5 py-1 rounded transition-all relative tracking-wider cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10 font-bold border border-[#FF85A2]/50 shadow-[0_0_12px_rgba(255,133,162,0.25)]'
                    : 'text-[#94A3B8] hover:text-[#F1F3F9] hover:bg-white/[0.04]'
                }`}
                title={item.title}
              >
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF85A2] mr-1.5 animate-pulse" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Current Chapter HUD Indicator for Tablet & Mobile */}
        <div className="xl:hidden flex items-center gap-2 font-mono text-xs text-[#FFA3B8] bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full">
          <span className="text-white/40">CH 0{chapterIndex}/08:</span>
          <span className="font-bold text-white truncate max-w-[130px] sm:max-w-[180px]">
            {currentChapter.title}
          </span>
        </div>

        {/* Actions: Download Resume & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          {/* Functional Download Resume Button (Direct PDF Download) */}
          <a
            href="/Anagha_Mithra_Resume.pdf"
            download="Anagha_Mithra_Resume.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#FF85A2] bg-[#FF85A2] text-[#030305] hover:bg-[#FFA3B8] transition-all cursor-pointer font-bold shadow-[0_0_15px_rgba(255,133,162,0.35)]"
            title="Download Anagha_Mithra_Resume.pdf directly"
            aria-label="Download Resume PDF directly"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DOWNLOAD RESUME</span>
            <span className="sm:hidden">RESUME</span>
          </a>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded border border-white/10 text-[#94A3B8] hover:text-white cursor-pointer xl:hidden"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Chapters Menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Chapter Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#090b10]/95 backdrop-blur-xl px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
          {/* Direct Resume Download Link inside Mobile Drawer */}
          <div className="pb-3 border-b border-white/10">
            <a
              href="/Anagha_Mithra_Resume.pdf"
              download="Anagha_Mithra_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FF85A2] text-[#030305] font-mono text-xs font-bold shadow-md hover:bg-[#FFA3B8] transition-colors"
              title="Download Anagha_Mithra_Resume.pdf"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>

          <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest px-2 mb-1 pt-1">
            STORY CHAPTERS (SCROLL TO SECTION)
          </div>
          {STORY_CHAPTERS.map((item) => {
            const isActive = chapterIndex === item.index;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectChapter(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-mono text-xs transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#FF85A2]/20 text-[#FFA3B8] font-bold border border-[#FF85A2]/40'
                    : 'text-[#CBD5E1] hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/40">0{item.index + 1}</span>
                  <span>{item.title}</span>
                </div>
                <span className="text-[10px] text-white/40 uppercase">{item.category}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
