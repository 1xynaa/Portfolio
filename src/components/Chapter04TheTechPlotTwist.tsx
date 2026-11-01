/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Sparkles, X, Code, Shield, RefreshCw, ArrowRight, Compass, Terminal, Activity } from 'lucide-react';

interface Chapter04TheTechPlotTwistProps {
  onContinue?: () => void;
}

export const Chapter04TheTechPlotTwist: React.FC<Chapter04TheTechPlotTwistProps> = ({ onContinue }) => {
  const [selectedSubject, setSelectedSubject] = useState<'math-cs' | 'bio' | 'arts' | 'commerce'>('math-cs');
  const [trafficSignal, setTrafficSignal] = useState<'RED' | 'YELLOW' | 'GREEN'>('GREEN');
  const [activeTab, setActiveTab] = useState<'dilemma' | 'underneath'>('dilemma');

  const cycleTrafficLight = () => {
    if (trafficSignal === 'GREEN') setTrafficSignal('YELLOW');
    else if (trafficSignal === 'YELLOW') setTrafficSignal('RED');
    else setTrafficSignal('GREEN');
  };

  return (
    <div
      id="the-tech-plot-twist"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 04 — The Tech Plot Twist"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#FF85A2] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 04</span>
          <span className="text-white/20">//</span>
          <span className="text-[#FFA3B8] font-semibold">THE TECH PLOT TWIST</span>
        </div>

        {/* View Switcher: Grade 8 Dilemma vs Hardware Logic Underneath */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('dilemma')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              activeTab === 'dilemma'
                ? 'bg-[#FF85A2] text-[#030305] shadow-[0_0_12px_rgba(255,133,162,0.4)]'
                : 'text-[#94A3B8] hover:text-white bg-white/5'
            }`}
          >
            GRADE 8 ELIMINATION
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('underneath')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              activeTab === 'underneath'
                ? 'bg-[#78E7FF] text-[#030305] shadow-[0_0_12px_rgba(120,231,255,0.4)]'
                : 'text-[#94A3B8] hover:text-white bg-white/5'
            }`}
          >
            TRAFFIC LIGHT &amp; CYBER
          </button>
        </div>
      </div>

      {/* Main Open Editorial & Interactive Logic Environment */}
      <div className="my-auto grid items-center gap-10 lg:grid-cols-12 py-6">
        {/* Left Column: Narrative & Subject Selection */}
        <div className="lg:col-span-7 space-y-5 p-6 sm:p-8 rounded-3xl readable-plate border border-white/15 shadow-2xl">
          <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFA3B8]">
            TURNING POINT // REVERSE ENGINEERING REFLEX
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FFFFFF] leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            HOW DID I END UP IN TECH?
          </h2>

          <div className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-mono text-xs text-[#FFA3B8]">
            ANAGHA MITHRA AINIPPULLY REMITH // THE PROCESS OF ELIMINATION
          </div>

          {activeTab === 'dilemma' ? (
            <div className="space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal max-w-xl">
                My path into engineering was not a neat preschool prophecy. In <span className="text-white font-semibold underline decoration-[#FF85A2]/60 underline-offset-4">Grade 8</span>, I realized I completely despised Biology. Memorizing botanical diagrams was an absolute no.
              </p>
              <p className="text-sm sm:text-base text-[#D1D5DB] font-mono font-medium">
                So began the ruthless process of elimination:
              </p>

              {/* 4 Subject Chips */}
              <div className="grid grid-cols-2 gap-3.5 max-w-xl">
                <button
                  type="button"
                  onClick={() => setSelectedSubject('bio')}
                  className={`p-4 rounded-2xl border text-left transition-all interactive-control cursor-pointer readable-card ${
                    selectedSubject === 'bio'
                      ? 'border-red-500 bg-red-950/40 text-red-100 ring-1 ring-red-500'
                      : 'border-white/15 bg-black/60 text-[#D1D5DB] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs sm:text-sm font-bold">
                    <span className="line-through text-red-400">BIOLOGY?</span>
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/80 block mt-1.5">Dissecting specimens? Never.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSubject('arts')}
                  className={`p-4 rounded-2xl border text-left transition-all interactive-control cursor-pointer readable-card ${
                    selectedSubject === 'arts'
                      ? 'border-amber-500 bg-amber-950/40 text-amber-100 ring-1 ring-amber-500'
                      : 'border-white/15 bg-black/60 text-[#D1D5DB] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs sm:text-sm font-bold">
                    <span className="line-through text-amber-400">ARTS?</span>
                    <X className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/80 block mt-1.5">Memorizing dates? Not my jam.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSubject('commerce')}
                  className={`p-4 rounded-2xl border text-left transition-all interactive-control cursor-pointer readable-card ${
                    selectedSubject === 'commerce'
                      ? 'border-slate-400 bg-slate-900/60 text-slate-100 ring-1 ring-slate-400'
                      : 'border-white/15 bg-black/60 text-[#D1D5DB] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs sm:text-sm font-bold">
                    <span className="line-through text-slate-300">COMMERCE?</span>
                    <X className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/80 block mt-1.5">Lacked the thrill of creating.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSubject('math-cs')}
                  className={`p-4 rounded-2xl border text-left transition-all interactive-control cursor-pointer readable-card ${
                    selectedSubject === 'math-cs'
                      ? 'border-[#FF85A2] bg-[#FF85A2]/25 text-white ring-2 ring-[#FF85A2] shadow-[0_0_25px_rgba(255,133,162,0.4)]'
                      : 'border-white/15 bg-black/60 text-[#D1D5DB] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs sm:text-sm font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#FF85A2]" />
                      MATH + CS
                    </span>
                    <span className="bg-[#FF85A2] text-black px-2 py-0.5 rounded text-xs font-black">
                      CHOSEN!
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-[#FFA3B8] block mt-1.5 font-medium">The moment logic clicked. Pure magic.</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal max-w-xl">
                I can never look at technology without wondering how someone built it. When I stop at an intersection, I don&apos;t just see a light—I trace the embedded IF-ELSE statement, loop sensors, and fail-safes.
              </p>
              <div className="border-l-3 border-[#78E7FF] pl-4 py-2.5 text-base sm:text-lg text-[#F5F5F5] italic font-sans bg-[#78E7FF]/15 rounded-r-xl max-w-xl leading-relaxed">
                &ldquo;Cybersecurity took that instinctive desire to break and probe systems, and transformed it into defensive engineering.&rdquo;
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#FFA3B8] hover:text-white transition-colors cursor-pointer interactive-control"
            >
              <span>INSPECT THE SYSTEMS I&apos;VE BUILT</span>
              <ArrowRight className="w-4 h-4 text-[#FF85A2]" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Hardware / Logic Simulator */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          <div className="rounded-3xl border border-white/15 readable-plate p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-2.5">
              <span className="text-[#FFA3B8] font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#FF85A2]" />
                TRAFFIC LOGIC // REVERSE ENGINEERING
              </span>
              <span className="text-xs text-emerald-400 font-bold animate-pulse">ACTIVE SIM</span>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Traffic Light Hardware Widget */}
              <div className="col-span-4 flex flex-col items-center justify-center bg-[#10121a] py-3.5 px-2 rounded-xl border border-white/15">
                <button
                  type="button"
                  onClick={() => setTrafficSignal('RED')}
                  className={`w-9 h-9 rounded-full mb-2 transition-all interactive-control cursor-pointer ${
                    trafficSignal === 'RED'
                      ? 'bg-red-500 shadow-[0_0_20px_#ef4444] scale-110'
                      : 'bg-red-950/40 border border-red-900/40'
                  }`}
                  aria-label="Set Red Light"
                />
                <button
                  type="button"
                  onClick={() => setTrafficSignal('YELLOW')}
                  className={`w-9 h-9 rounded-full mb-2 transition-all interactive-control cursor-pointer ${
                    trafficSignal === 'YELLOW'
                      ? 'bg-amber-400 shadow-[0_0_20px_#f59e0b] scale-110'
                      : 'bg-amber-950/40 border border-amber-900/40'
                  }`}
                  aria-label="Set Yellow Light"
                />
                <button
                  type="button"
                  onClick={() => setTrafficSignal('GREEN')}
                  className={`w-9 h-9 rounded-full transition-all interactive-control cursor-pointer ${
                    trafficSignal === 'GREEN'
                      ? 'bg-emerald-400 shadow-[0_0_20px_#10b981] scale-110'
                      : 'bg-emerald-950/40 border border-emerald-900/40'
                  }`}
                  aria-label="Set Green Light"
                />

                <button
                  type="button"
                  onClick={cycleTrafficLight}
                  className="mt-3 flex items-center gap-1 font-mono text-[10px] text-[#78E7FF] hover:underline cursor-pointer interactive-control"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>CYCLE</span>
                </button>
              </div>

              {/* Live Code State Inspection */}
              <div className="col-span-8 font-mono text-[11px] text-left space-y-1 text-slate-300">
                <div className="text-white/40 text-[10px] mb-1">// Embedded IF-ELSE Logic:</div>
                <div className={trafficSignal === 'GREEN' ? 'text-emerald-400 font-bold bg-emerald-950/40 px-1 rounded' : 'text-white/40'}>
                  if (density &gt; 80) &#123;
                  <div className="pl-3 text-[10px]">state = &apos;GREEN&apos;;</div>
                  &#125;
                </div>
                <div className={trafficSignal === 'YELLOW' ? 'text-amber-400 font-bold bg-amber-950/40 px-1 rounded' : 'text-white/40'}>
                  else if (timer &lt; 5s) &#123;
                  <div className="pl-3 text-[10px]">state = &apos;YELLOW&apos;;</div>
                  &#125;
                </div>
                <div className={trafficSignal === 'RED' ? 'text-red-400 font-bold bg-red-950/40 px-1 rounded' : 'text-white/40'}>
                  else &#123;
                  <div className="pl-3 text-[10px]">state = &apos;RED&apos;;</div>
                  &#125;
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#94A3B8]">CURRENT HARDWARE STATE:</span>
              <span className="text-[#FF85A2] font-bold">{trafficSignal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#FF85A2]" />
          <span>CYBER DEFENSE MINDSET</span>
        </div>

        <div className="flex items-center gap-2 text-[#FFA3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
          <span className="tracking-widest">CHAPTER 04 / 08</span>
        </div>
      </div>
    </div>
  );
};
