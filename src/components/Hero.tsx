/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { ArrowDown, Download, FileText, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData.ts';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollToNextSection = () => {
    document.getElementById('kerala')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="intro"
      className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-10 min-h-[90vh] select-none"
    >
      {/* Top Meta Bar & Cyan Accent */}
      <div className="flex flex-col gap-2.5">
        <div className="w-14 h-1 bg-[#78E7FF] rounded-full shadow-[0_0_12px_#78E7FF]" />

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-[11px] tracking-wider text-[#94A3B8]">
          <span className="font-semibold text-white">SRMIST</span>
          <span className="text-white/20">/</span>
          <span>SRMIST KATTANKULATHUR</span>
          <span className="text-white/20">/</span>
          <span className="text-slate-400">STATUS:</span>
          <span className="px-2.5 py-0.5 rounded border border-[#78E7FF]/50 bg-[#78E7FF]/10 text-[#78E7FF] font-semibold shadow-[0_0_10px_rgba(120,231,255,0.25)]">
            CGPA 9.18 // ACTIVE DEV
          </span>
          <span className="text-white/20">/</span>
          <span className="hidden sm:inline">B.TECH CSE 2ND YR</span>
        </div>
      </div>

      {/* Hero Focal Content */}
      <div className="my-auto max-w-xl py-6">
        {/* Monospace Tag */}
        <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#78E7FF]">
          <span className="w-2 h-0.5 bg-[#78E7FF]" />
          <span>CHAPTER 00 // ENGINEERING DOSSIER</span>
        </div>

        {/* Giant Stacked Name: ANAGHA in White, MITHRA in Lavender */}
        <div className="mb-4">
          <div className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight text-white leading-[0.92]">
            ANAGHA
          </div>
          <div className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight text-[#A78BFA] leading-[0.92] drop-shadow-[0_0_35px_rgba(167,139,250,0.4)]">
            MITHRA
          </div>
        </div>

        {/* Specialization Cyan Border Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded border border-[#78E7FF]/40 bg-black/60 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-[#78E7FF] backdrop-blur-md">
          <span>SECURITY ENGINEERING // FULL-STACK DEVELOPMENT</span>
        </div>

        {/* Intro Storyline */}
        <p className="mb-6 max-w-md text-sm leading-relaxed text-[#CBD5E1] sm:text-base sm:leading-7 drop-shadow-sm">
          Building resilient software, investigating protocol vulnerabilities, and uncovering what happens beneath the interface.
        </p>

        {/* Action Buttons: Download Resume & Scroll Explorer */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Direct Download Resume Button */}
          <a
            href="/Anagha_Mithra_Resume.pdf"
            download="Anagha_Mithra_Resume.pdf"
            className="group flex h-12 items-center gap-2.5 rounded bg-[#FF85A2] px-6 text-[#030305] font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,133,162,0.45)] transition-all duration-200 hover:bg-[#FFA3B8] hover:shadow-[0_0_30px_rgba(255,133,162,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Download Anagha Mithra's Resume as PDF directly"
          >
            <Download className="h-4 w-4 font-bold transition-transform duration-200 group-hover:scale-110" />
            <span>DOWNLOAD RESUME</span>
          </a>

          {/* Scroll to Explore button */}
          <button
            type="button"
            onClick={scrollToNextSection}
            className="group flex h-12 items-center gap-2 rounded border border-white/20 bg-black/60 px-5 font-mono text-xs font-medium tracking-wider text-[#F1F3F9] backdrop-blur-md transition-all duration-200 hover:border-[#78E7FF]/60 hover:bg-black/80 hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Scroll to explore my story"
          >
            <span>EXPLORE STORY</span>
            <ArrowDown className="h-4 w-4 text-[#78E7FF] transition-transform duration-200 group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Bottom Coordinates & Story Guidance */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex flex-col gap-0.5 text-[11px]">
          <span className="text-white/40">SYSTEM IDENT:</span>
          <span className="text-[#F1F3F9]">AM-2026 // KATTANKULATHUR, TN</span>
        </div>

        <button
          type="button"
          onClick={scrollToNextSection}
          className="flex items-center gap-2 text-[11px] tracking-widest text-[#FFA3B8] hover:text-white transition-colors group cursor-pointer"
          aria-label="Scroll down to begin story"
        >
          <span>SCROLL DOWN TO EXPERIENCE THE STORY</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#FF85A2]" />
        </button>

        <div className="hidden md:flex flex-col items-end gap-0.5 text-[11px]">
          <span className="text-white/40">DOMAIN FOCUS:</span>
          <span className="text-[#F1F3F9]">DEFENSIVE ARCH &amp; FORENSICS</span>
        </div>
      </div>
    </div>
  );
};
