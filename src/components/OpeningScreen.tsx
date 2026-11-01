/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  return (
    <div
      onClick={onEnter}
      className="fixed inset-0 z-40 flex flex-col justify-between items-center px-6 py-10 cursor-pointer select-none bg-transparent transition-opacity duration-700"
      aria-label="Opening Screen: Click anywhere or press Enter to explore Anagha Mithra's portfolio"
    >
      {/* Top Identity Coordinates */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between font-mono text-[11px] text-[#94A3B8] tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF85A2] animate-ping" />
          <span className="text-white font-semibold">AM // 2026</span>
          <span className="text-white/20">/</span>
          <span className="hidden sm:inline">DIGITAL ENVIRONMENT</span>
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <Compass className="w-3.5 h-3.5 text-[#FF85A2] animate-spin-slow" />
          <span>CYBERSECURITY &amp; SYSTEMS ARCHITECTURE</span>
        </div>
      </div>

      {/* Center Cinematic Typography & Call to Action */}
      <div className="my-auto flex flex-col items-center text-center max-w-2xl px-4 pointer-events-none">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF85A2]/30 bg-black/50 px-4 py-1 font-mono text-xs font-semibold tracking-widest text-[#FFA3B8] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FF85A2]" />
          <span>PORTFOLIO // IMMERSIVE JOURNEY</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-[0_0_35px_rgba(255,133,162,0.35)]">
          HELLO, THIS IS ANAGHA
        </h1>

        <p className="mt-4 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#CBD5E1]">
          ANAGHA MITHRA AINIPPULLY REMITH
        </p>

        {/* Clear, Stylish ENTER / EXPLORE Interaction Button */}
        <div className="mt-8 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEnter();
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#FF85A2]/60 bg-[#FF85A2]/15 backdrop-blur-md text-[#FFA3B8] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(255,133,162,0.35)] hover:bg-[#FF85A2] hover:text-[#030305] hover:shadow-[0_0_45px_rgba(255,133,162,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Enter portfolio and begin Chapter 00"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF85A2] group-hover:bg-[#030305] animate-pulse" />
            <span>ENTER / EXPLORE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <p className="mt-4 font-mono text-[11px] text-[#94A3B8] tracking-widest">
          CLICK ANYWHERE OR SCROLL TO ENTER
        </p>
      </div>

      {/* Bottom Subtle Status Prompt */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#94A3B8]/70 border-t border-white/5 pt-4">
        <span>SRMIST KATTANKULATHUR // CHENNAI</span>
        <span className="hidden sm:inline">HIGH-DEFINITION 3D PARTICLE PORTRAIT</span>
        <span>INITIALIZING CHAPTER 00</span>
      </div>
    </div>
  );
};
