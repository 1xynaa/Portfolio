/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { Compass, MapPin, Waves, ArrowRight } from 'lucide-react';

interface StoryChapter01Props {
  onContinue?: () => void;
}

export const StoryChapter01: React.FC<StoryChapter01Props> = ({ onContinue }) => {
  const handleNext = () => {
    if (onContinue) onContinue();
    else document.getElementById('qatar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="kerala"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center min-h-[90vh]"
      aria-label="Chapter 01: Roots in Kerala"
    >
      {/* Chapter Marker */}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#FF85A2]">
        <span className="w-2.5 h-0.5 bg-[#FF85A2]" />
        <span>CHAPTER 01 // ORIGIN &amp; ROOTS</span>
      </div>

      {/* Opening Editorial Headline */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
          EVERY STORY STARTS SOMEWHERE.
        </h2>
        <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-[#78E7FF] tracking-wider">
          MEET ANAGHA MITHRA AINIPPULLY REMITH // THRISSUR, KERALA
        </p>
      </div>

      {/* Cinematic Two-Column Layout */}
      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Left Column: Short, Punchy Storytelling Beats */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#090b10]/90 p-5 sm:p-7 lg:col-span-6 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[#FF85A2]/10 blur-3xl" />

          {/* Coordinate Tag */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#FFA3B8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF85A2] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF85A2]" />
              </span>
              <span className="font-semibold text-white">THRISSUR, KERALA</span>
              <span className="text-white/20">/</span>
              <span className="text-[#94A3B8]">10.5276° N, 76.2144° E</span>
            </div>
            <span className="rounded-full bg-[#FF85A2]/10 border border-[#FF85A2]/30 px-3 py-0.5 text-[#FFA3B8] font-bold text-[10px]">
              BIRTHPLACE
            </span>
          </div>

          {/* Dynamic Narrative Blocks */}
          <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
            <p className="text-base sm:text-lg font-display font-medium text-white leading-snug">
              My name is <span className="text-[#FFA3B8]">Anagha Mithra Ainippully Remith</span>.
            </p>
            <p>
              I was born in <span className="text-white font-semibold">Thrissur, Kerala</span>—surrounded by tropical greenery, temple drums, and monsoon rain.
            </p>
            <p>
              When I was in Grade 1, my childhood took flight across the Arabian Sea to <span className="text-[#A78BFA] font-medium">Qatar</span>.
            </p>
            <div className="rounded-xl border border-[#FF85A2]/30 bg-[#FF85A2]/[0.05] p-3.5 text-xs sm:text-sm text-[#F1F3F9] font-mono leading-relaxed border-l-2 border-l-[#FF85A2]">
              &ldquo;Qatar became home. I spent practically my entire school life at MES Indian School. I love how peaceful it is, and it will always have a special place in my heart.&rdquo;
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between font-mono text-xs text-[#94A3B8] border-t border-white/10">
            <span>TRANSITION READY</span>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 text-[#FFA3B8] hover:text-white transition-colors cursor-pointer"
            >
              <span>TRACE THE ROUTE TO QATAR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Kinetic Map Compass & Visual Journey Node */}
        <div className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e101a] via-[#080910] to-[#040508] p-5 sm:p-7 lg:col-span-6 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[360px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,133,162,0.12),transparent_70%)]" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#FFA3B8]">
            <span className="flex items-center gap-1.5 font-bold">
              <Compass className="w-4 h-4 text-[#FF85A2] animate-spin-slow" />
              GEOSPATIAL ANCHOR 01
            </span>
            <span className="text-[10px] text-white/40">SOUTH INDIA</span>
          </div>

          {/* Central Interactive Radar Node */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-4">
            <div className="relative flex items-center justify-center w-36 h-36">
              <div className="absolute inset-0 rounded-full border border-[#FF85A2]/20 animate-ping opacity-30" />
              <div className="absolute inset-4 rounded-full border border-[#FF85A2]/30" />
              <div className="absolute inset-8 rounded-full border border-dashed border-[#FF85A2]/40" />

              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF85A2] to-[#FFA3B8] flex items-center justify-center text-[#030305] shadow-[0_0_30px_rgba(255,133,162,0.6)]">
                <MapPin className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div className="mt-4 font-mono">
              <span className="text-white text-base font-bold tracking-wider block">
                THRISSUR, KERALA
              </span>
              <span className="text-[#94A3B8] text-xs">
                GENESIS · THE CULTURAL CAPITAL
              </span>
            </div>
          </div>

          {/* Bottom Trajectory Prompt */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#78E7FF]">
              <Waves className="w-3.5 h-3.5" />
              ARABIAN SEA CORRIDOR
            </span>
            <span className="text-white/60">GRADE 1 → DOHA, QATAR</span>
          </div>
        </div>
      </div>
    </div>
  );
};
