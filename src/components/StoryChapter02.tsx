/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Heart, ArrowRight, Sun, Waves, Wind } from 'lucide-react';

interface StoryChapter02Props {
  onContinue?: () => void;
}

export const StoryChapter02: React.FC<StoryChapter02Props> = ({ onContinue }) => {
  const [atmosphere, setAtmosphere] = useState<'peace' | 'dusk' | 'horizon'>('dusk');

  const handleNext = () => {
    if (onContinue) onContinue();
    else document.getElementById('chennai')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="qatar"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center min-h-[90vh]"
      aria-label="Chapter 02: The Qatar Chapter"
    >
      {/* Chapter Marker */}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#A78BFA]">
        <span className="w-2.5 h-0.5 bg-[#A78BFA]" />
        <span>CHAPTER 02 // THE QATAR CHAPTER</span>
      </div>

      {/* Opening Editorial Headline */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
          A PLACE I&apos;LL ALWAYS CALL HOME.
        </h2>
        <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-[#A78BFA] tracking-wider">
          MES INDIAN SCHOOL // CALM CORNICHE SKYLINES // THE CALL OF NEW HORIZONS
        </p>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Left Column: Minimal Animated Vector Map (Thrissur -> Doha) */}
        <div className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-[#0a0d16] to-[#04060a] p-5 sm:p-7 lg:col-span-6 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[380px]">
          {/* Animated Atmospheric Background Glow */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
              atmosphere === 'peace'
                ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.15),transparent_70%)]'
                : atmosphere === 'dusk'
                ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(255,133,162,0.18),transparent_70%)]'
                : 'bg-[radial-gradient(ellipse_at_top_right,rgba(120,231,255,0.15),transparent_70%)]'
            }`}
          />

          {/* Map Top Bar */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#A78BFA]">
            <span className="flex items-center gap-1.5 font-bold">
              <Wind className="w-4 h-4 text-[#A78BFA]" />
              ARABIAN SEA VECTOR
            </span>
            <span className="text-[10px] text-white/40">TRANS-OCEANIC ROUTE</span>
          </div>

          {/* Minimalist Vector Route SVG Animation */}
          <div className="relative z-10 my-3 h-56 w-full">
            <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
              <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
              <line x1="0" y1="180" x2="400" y2="180" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />

              <path d="M 100 140 Q 180 130 260 145" stroke="rgba(120,231,255,0.08)" strokeWidth="1" />
              <path d="M 80 180 Q 190 170 300 185" stroke="rgba(120,231,255,0.08)" strokeWidth="1" />

              {/* Dynamic Flight Arc */}
              <path
                d="M 330 190 C 270 160, 180 80, 80 50"
                stroke="rgba(255, 133, 162, 0.25)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 330 190 C 270 160, 180 80, 80 50"
                stroke="#FF85A2"
                strokeWidth="2.5"
                strokeDasharray="300"
                strokeDashoffset="0"
                className="animate-[dash_6s_ease-in-out_infinite]"
              />

              {/* Doha Pin */}
              <circle cx="80" cy="50" r="16" fill="rgba(167, 139, 250, 0.15)" className="animate-ping" />
              <circle cx="80" cy="50" r="6" fill="#A78BFA" />
              <circle cx="80" cy="50" r="2.5" fill="#030305" />
              <text x="80" y="32" fill="#F1F3F9" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                DOHA, QATAR
              </text>
              <text x="80" y="78" fill="#A78BFA" fontSize="9" fontFamily="monospace" textAnchor="middle">
                25.2854° N, 51.5310° E
              </text>

              {/* Thrissur Pin */}
              <circle cx="330" cy="190" r="14" fill="rgba(255, 133, 162, 0.15)" />
              <circle cx="330" cy="190" r="5" fill="#FF85A2" />
              <text x="330" y="215" fill="#FFA3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                THRISSUR (ORIGIN)
              </text>
            </svg>
          </div>

          {/* Environment Switcher */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
            <span className="font-mono text-[11px] text-[#94A3B8]">ATMOSPHERE:</span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setAtmosphere('peace')}
                className={`px-2.5 py-1 rounded transition-all interactive-control cursor-pointer ${
                  atmosphere === 'peace'
                    ? 'bg-[#A78BFA] text-[#030305] font-bold shadow-[0_0_12px_rgba(167,139,250,0.5)]'
                    : 'text-[#94A3B8] hover:text-white bg-white/5'
                }`}
              >
                PEACE
              </button>
              <button
                type="button"
                onClick={() => setAtmosphere('dusk')}
                className={`px-2.5 py-1 rounded transition-all interactive-control cursor-pointer ${
                  atmosphere === 'dusk'
                    ? 'bg-[#FF85A2] text-[#030305] font-bold shadow-[0_0_12px_rgba(255,133,162,0.5)]'
                    : 'text-[#94A3B8] hover:text-white bg-white/5'
                }`}
              >
                CORNICHE DUSK
              </button>
              <button
                type="button"
                onClick={() => setAtmosphere('horizon')}
                className={`px-2.5 py-1 rounded transition-all interactive-control cursor-pointer ${
                  atmosphere === 'horizon'
                    ? 'bg-[#78E7FF] text-[#030305] font-bold shadow-[0_0_12px_rgba(120,231,255,0.5)]'
                    : 'text-[#94A3B8] hover:text-white bg-white/5'
                }`}
              >
                HORIZON
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Personal Story Beats */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#090b10]/90 p-5 sm:p-7 lg:col-span-6 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
            <p>
              I spent most of my childhood in Qatar. I grew up there, studied at{' '}
              <span className="text-white font-semibold">MES Indian School</span>, and explored the country throughout my life.
            </p>
            <p>
              I genuinely love Qatar. It is peaceful, familiar, and a place I will always have a soft spot for. But eventually, I felt like I had explored almost everything it had to offer me.
            </p>

            {/* The Pivotal Quote */}
            <div className="rounded-xl border border-[#FF85A2]/40 bg-[#FF85A2]/[0.06] p-4 my-3 relative shadow-lg">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FFA3B8] mb-1.5 font-semibold">
                <Heart className="w-4 h-4 text-[#FF85A2]" />
                <span>THE PIVOTAL TURNING POINT</span>
              </div>
              <p className="font-display text-sm sm:text-base text-white font-medium italic leading-relaxed">
                &ldquo;I didn&apos;t leave because I wanted somewhere else. I left because I wanted to discover somewhere new.&rdquo;
              </p>
            </div>

            {/* 4 Desires Vector Badges */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <span className="text-[#FFA3B8] font-bold block mb-0.5">NEW PLACES</span>
                <span className="text-[10px] text-[#94A3B8]">Unfamiliar horizons</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <span className="text-[#78E7FF] font-bold block mb-0.5">NEW PEOPLE</span>
                <span className="text-[10px] text-[#94A3B8]">Builders &amp; technologists</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <span className="text-[#A78BFA] font-bold block mb-0.5">NEW EXPERIENCES</span>
                <span className="text-[10px] text-[#94A3B8]">Campus life energy</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <span className="text-[#34D399] font-bold block mb-0.5">EXPLORE INDIA</span>
                <span className="text-[10px] text-[#94A3B8]">Technological roots</span>
              </div>
            </div>
          </div>

          {/* Smooth Continuation */}
          <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-xs">
            <span className="text-[#94A3B8]">NEXT // THE ALGORITHM SPEAKS</span>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 text-[#78E7FF] hover:text-white transition-colors cursor-pointer"
            >
              <span>THE CHENNAI PLOT TWIST</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
