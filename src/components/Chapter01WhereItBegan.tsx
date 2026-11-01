/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { Compass, MapPin, Waves, ArrowRight } from 'lucide-react';

interface Chapter01WhereItBeganProps {
  onContinue?: () => void;
}

export const Chapter01WhereItBegan: React.FC<Chapter01WhereItBeganProps> = ({ onContinue }) => {
  return (
    <div
      id="where-it-began"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 01 — Where It Began"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#FF85A2] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 01</span>
          <span className="text-white/20">//</span>
          <span className="text-[#FFA3B8] font-semibold">WHERE IT BEGAN</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#94A3B8]">GEOSPATIAL ORIGIN:</span>
          <span className="px-2.5 py-0.5 rounded border border-[#FF85A2]/40 bg-[#FF85A2]/10 text-[#FFA3B8] font-semibold shadow-[0_0_12px_rgba(255,133,162,0.2)]">
            THRISSUR, KERALA · 10.5276° N, 76.2144° E
          </span>
        </div>
      </div>

      {/* Main Open Editorial & Geospatial Visual Environment */}
      <div className="my-auto grid items-center gap-8 lg:grid-cols-12 py-6">
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-7 space-y-5 p-6 sm:p-8 rounded-3xl readable-plate shadow-2xl border border-white/15">
          <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#78E7FF]">
            GENESIS // CULTURAL ROOTS
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FFFFFF] leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            EVERY STORY STARTS SOMEWHERE.
          </h2>

          <div className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-mono text-xs text-[#FFA3B8]">
            ANAGHA MITHRA AINIPPULLY REMITH // THRISSUR
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal max-w-xl">
            <p>
              I was born in <span className="text-white font-semibold underline decoration-[#FF85A2]/60 underline-offset-4">Thrissur, Kerala</span>—India&apos;s cultural capital, surrounded by lush monsoon rain, ancient temple architecture, and vibrant community traditions.
            </p>
            <p>
              When I was in Grade 1, our family took flight across the Arabian Sea to the Gulf peninsula of Qatar, setting off a journey that would forever redefine my perspective on what was possible.
            </p>
          </div>

          {/* Minimalist Quote Bar */}
          <div className="border-l-3 border-[#FF85A2] pl-4 py-2 text-sm sm:text-base text-[#F5F5F5] italic font-mono bg-gradient-to-r from-[#FF85A2]/15 to-transparent rounded-r-lg">
            &ldquo;Roots ground you, but they also give you the courage to look across oceans.&rdquo;
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#FFA3B8] hover:text-white transition-colors cursor-pointer interactive-control"
            >
              <span>TRACE FLIGHT PATH TO QATAR</span>
              <ArrowRight className="w-4 h-4 text-[#FF85A2]" />
            </button>
          </div>
        </div>

        {/* Right Geospatial Radar Visual Node */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-6 sm:p-8 rounded-3xl readable-plate border border-white/15 shadow-2xl">
          <div className="relative flex items-center justify-center w-52 h-52 sm:w-64 sm:h-64">
            {/* Pulsing Concentric Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-[#FF85A2]/20 animate-ping opacity-40" />
            <div className="absolute inset-6 rounded-full border border-[#FF85A2]/30" />
            <div className="absolute inset-12 rounded-full border border-dashed border-[#78E7FF]/40 animate-spin-slow" />
            <div className="absolute inset-20 rounded-full border border-white/25" />

            {/* Glowing Core Pin */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF85A2] to-[#FFA3B8] flex items-center justify-center text-[#030305] shadow-[0_0_35px_rgba(255,133,162,0.7)]">
              <MapPin className="w-7 h-7 fill-current" />
            </div>
          </div>

          <div className="mt-4 text-center font-mono">
            <div className="text-white text-base sm:text-lg font-bold tracking-wider">
              THRISSUR, KERALA
            </div>
            <div className="text-[#B8B8B8] text-xs sm:text-sm mt-1">
              POINT OF ORIGIN · 10.5276° N, 76.2144° E
            </div>
            <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#78E7FF]">
              <Waves className="w-4 h-4" />
              <span>ARABIAN SEA CORRIDOR TO DOHA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#FF85A2]" />
          <span>CHRONOLOGY: GRADE 1 MILESTONE</span>
        </div>

        <div className="flex items-center gap-2 text-[#FFA3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
          <span className="tracking-widest">CHAPTER 01 / 08</span>
        </div>
      </div>
    </div>
  );
};
