/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Wind, Heart, ArrowRight, Compass, Sun, Waves } from 'lucide-react';

interface Chapter02APlaceCalledHomeProps {
  onContinue?: () => void;
}

export const Chapter02APlaceCalledHome: React.FC<Chapter02APlaceCalledHomeProps> = ({ onContinue }) => {
  const [atmosphere, setAtmosphere] = useState<'dusk' | 'peace' | 'horizon'>('dusk');

  return (
    <div
      id="a-place-called-home"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 02 — A Place Called Home"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 02</span>
          <span className="text-white/20">//</span>
          <span className="text-[#C084FC] font-semibold">A PLACE CALLED HOME</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#94A3B8]">DOHA COORDINATES:</span>
          <span className="px-2.5 py-0.5 rounded border border-[#A78BFA]/40 bg-[#A78BFA]/10 text-[#C084FC] font-semibold shadow-[0_0_12px_rgba(167,139,250,0.2)]">
            DOHA, QATAR · 25.2854° N, 51.5310° E
          </span>
        </div>
      </div>

      {/* Main Open Environment with Vector Flight Path */}
      <div className="my-auto grid items-center gap-10 lg:grid-cols-12 py-6">
        {/* Left Column: Vector Flight Arc & Atmosphere Selector */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4 p-6 rounded-3xl readable-plate border border-white/15 shadow-2xl">
          <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-[#C084FC]">
            <span className="flex items-center gap-1.5 font-bold">
              <Wind className="w-4 h-4 text-[#C084FC]" />
              TRANS-OCEANIC VECTOR
            </span>
            <span className="text-[#B8B8B8]">THRISSUR &rarr; DOHA</span>
          </div>

          {/* Minimalist Vector Route Canvas */}
          <div className="relative h-64 w-full rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm p-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 380 220" fill="none">
              {/* Latitude Grid lines */}
              <line x1="0" y1="50" x2="380" y2="50" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="380" y2="110" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="0" y1="170" x2="380" y2="170" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

              {/* Dynamic Flight Arc */}
              <path
                d="M 310 170 C 250 140, 160 70, 70 50"
                stroke="rgba(192, 132, 252, 0.35)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 310 170 C 250 140, 160 70, 70 50"
                stroke="#C084FC"
                strokeWidth="2.5"
                strokeDasharray="320"
                strokeDashoffset="0"
                className="animate-[dash_6s_ease-in-out_infinite]"
              />

              {/* Doha Pin */}
              <circle cx="70" cy="50" r="16" fill="rgba(192, 132, 252, 0.25)" className="animate-ping" />
              <circle cx="70" cy="50" r="6" fill="#C084FC" />
              <circle cx="70" cy="50" r="2.5" fill="#030305" />
              <text x="70" y="32" fill="#FFFFFF" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                DOHA, QATAR
              </text>
              <text x="70" y="78" fill="#E9D5FF" fontSize="10" fontFamily="monospace" textAnchor="middle">
                MES INDIAN SCHOOL
              </text>

              {/* Thrissur Pin */}
              <circle cx="310" cy="170" r="12" fill="rgba(255, 133, 162, 0.2)" />
              <circle cx="310" cy="170" r="5" fill="#FF85A2" />
              <text x="310" y="195" fill="#FFA3B8" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                THRISSUR (ORIGIN)
              </text>
            </svg>
          </div>

          {/* Interactive Atmosphere Mood Switcher */}
          <div className="flex items-center justify-between font-mono text-xs pt-1">
            <span className="text-[#B8B8B8] font-semibold">ATMOSPHERE:</span>
            <div className="flex items-center gap-1.5">
              {(['dusk', 'peace', 'horizon'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAtmosphere(mode)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all interactive-control cursor-pointer ${
                    atmosphere === mode
                      ? 'bg-[#C084FC] text-[#030305] shadow-[0_0_15px_rgba(192,132,252,0.5)]'
                      : 'text-[#D1D5DB] hover:text-white bg-white/10'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Authentic Quote */}
        <div className="lg:col-span-7 space-y-5 p-6 sm:p-8 rounded-3xl readable-plate border border-white/15 shadow-2xl">
          <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#C084FC]">
            SCHOOL YEARS // MES INDIAN SCHOOL
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FFFFFF] leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            A PLACE I&apos;LL ALWAYS CALL HOME.
          </h2>

          <div className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-mono text-xs text-[#C084FC]">
            ANAGHA MITHRA AINIPPULLY REMITH // DOHA
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal max-w-xl">
            <p>
              I spent practically my entire schooling at <span className="text-white font-semibold underline decoration-[#C084FC]/60 underline-offset-4">MES Indian School</span> in Doha. Qatar gave me peace, safety, lifelong friends, and a calm rhythm of life that I will always hold close.
            </p>
            <p>
              Yet by the time high school concluded, curiosity demanded a wider canvas.
            </p>
          </div>

          {/* Authentic Turning Point Quote */}
          <div className="border-l-3 border-[#C084FC] pl-4 py-2.5 text-base sm:text-lg text-[#F5F5F5] font-sans italic bg-[#C084FC]/15 rounded-r-xl leading-relaxed">
            &ldquo;I didn&apos;t leave because I wanted somewhere else. I left because I wanted to discover somewhere new.&rdquo;
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#C084FC] hover:text-white transition-colors cursor-pointer interactive-control"
            >
              <span>THE CHENNAI PLOT TWIST</span>
              <ArrowRight className="w-4 h-4 text-[#C084FC]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#A78BFA]" />
          <span>CHAPTER CONTEXT: MES INDIAN SCHOOL GRADUATION</span>
        </div>

        <div className="flex items-center gap-2 text-[#C084FC]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
          <span className="tracking-widest">CHAPTER 02 / 08</span>
        </div>
      </div>
    </div>
  );
};
