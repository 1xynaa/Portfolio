/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Sparkles, X, Check, Code, Cpu, Compass, ArrowRight, Zap, Lightbulb } from 'lucide-react';

interface ChapterChoosingCSProps {
  onContinue?: () => void;
}

export const ChapterChoosingCS: React.FC<ChapterChoosingCSProps> = ({ onContinue }) => {
  const [selectedSubject, setSelectedSubject] = useState<'math-cs' | 'bio' | 'arts' | 'commerce'>('math-cs');

  const handleNext = () => {
    if (onContinue) onContinue();
    else document.getElementById('cybersecurity')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="choosing-cs"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center min-h-[90vh]"
      aria-label="Chapter 04: Choosing Computer Science"
    >
      {/* Chapter Marker */}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#FF85A2]">
        <span className="w-2.5 h-0.5 bg-[#FF85A2]" />
        <span>CHAPTER 04 // THE CAREER DILEMMA</span>
      </div>

      {/* Opening Editorial Headline */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
          HOW DID I END UP IN TECH?
        </h2>
        <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-[#FFA3B8] tracking-wider">
          GRADE 8 BIOLOGY REJECTION // THE PROCESS OF ELIMINATION // MATH + CS
        </p>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Left Column: Authentic Storyline & Subject Matrix */}
        <div className="space-y-5 rounded-2xl border border-white/10 bg-[#090b10]/90 p-5 sm:p-7 lg:col-span-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs">
            <span className="text-[#FFA3B8] font-bold">THE MOMENT OF RECKONING</span>
            <span className="rounded-full bg-[#FF85A2]/10 border border-[#FF85A2]/30 px-3 py-0.5 text-[#FFA3B8] font-bold text-[10px]">
              UNPLANNED &amp; CHAOTIC
            </span>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
            <p>
              My path into engineering wasn&apos;t some neatly scripted childhood prophecy where I was writing kernels in preschool.
            </p>
            <p>
              In <span className="text-white font-semibold">Grade 8</span>, I hit a massive wall: I started completely hating Biology. Memorizing botanical classifications, plant cell kingdoms, and specimen dissection was an absolute and resounding <em>no</em>.
            </p>
            <p className="text-white/80 font-medium">
              So began the ruthless process of elimination:
            </p>

            {/* Interactive Subject Selection Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* Biology */}
              <button
                type="button"
                onClick={() => setSelectedSubject('bio')}
                className={`p-3 rounded-xl border text-left transition-all relative interactive-control cursor-pointer ${
                  selectedSubject === 'bio'
                    ? 'border-red-500/80 bg-red-500/15 ring-1 ring-red-500/50'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold line-through text-red-400">BIOLOGY?</span>
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                </div>
                <span className="text-[11px] text-[#94A3B8] leading-tight block">
                  Dissecting specimens? Absolutely not happening in this lifetime.
                </span>
              </button>

              {/* Arts */}
              <button
                type="button"
                onClick={() => setSelectedSubject('arts')}
                className={`p-3 rounded-xl border text-left transition-all relative interactive-control cursor-pointer ${
                  selectedSubject === 'arts'
                    ? 'border-amber-500/80 bg-amber-500/15 ring-1 ring-amber-500/50'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold line-through text-amber-400">ARTS &amp; HUMANITIES?</span>
                  <X className="w-4 h-4 text-amber-500 shrink-0" />
                </div>
                <span className="text-[11px] text-[#94A3B8] leading-tight block">
                  Treaties, dates, and historical archives—definitely not my jam.
                </span>
              </button>

              {/* Commerce */}
              <button
                type="button"
                onClick={() => setSelectedSubject('commerce')}
                className={`p-3 rounded-xl border text-left transition-all relative interactive-control cursor-pointer ${
                  selectedSubject === 'commerce'
                    ? 'border-slate-500/80 bg-slate-500/15 ring-1 ring-slate-500/50'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold line-through text-slate-400">COMMERCE?</span>
                  <X className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
                <span className="text-[11px] text-[#94A3B8] leading-tight block">
                  Balance sheets and accounts—too safe, lacked the thrill of creating.
                </span>
              </button>

              {/* Math + CS: BOOM */}
              <button
                type="button"
                onClick={() => setSelectedSubject('math-cs')}
                className={`p-3 rounded-xl border text-left transition-all relative interactive-control cursor-pointer ${
                  selectedSubject === 'math-cs'
                    ? 'border-[#FF85A2] bg-[#FF85A2]/20 shadow-lg shadow-[#FF85A2]/25 ring-1 ring-[#FF85A2]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF85A2]" />
                    MATH + CS
                  </span>
                  <span className="font-mono text-[9px] font-black bg-[#FF85A2] text-black px-1.5 py-0.5 rounded shadow">
                    BOOM!
                  </span>
                </div>
                <span className="text-[11px] text-[#FFA3B8] font-medium leading-tight block">
                  The exact instant everything made sense. Pure logic in motion.
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Code Logic Tree / Interactive Simulation */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e101a] via-[#090b14] to-[#040508] p-5 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[360px]">
            <div className="flex items-center justify-between font-mono text-xs text-[#FFA3B8] border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 font-bold">
                <Code className="w-4 h-4 text-[#FF85A2]" />
                LOGICAL ELIMINATION TREE
              </span>
              <span className="text-[10px] text-white/40">GRADE 8 RUNTIME</span>
            </div>

            {/* Simulated Code Compiler Output */}
            <div className="my-auto rounded-xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-left overflow-x-auto space-y-2">
              <div className="text-white/40 text-[11px]">// Evaluating life direction:</div>
              <div className="space-y-1 text-[11px]">
                <p className="text-purple-400">
                  const <span className="text-white">passions</span> = &#91;
                  <span className="text-yellow-300">&apos;problem-solving&apos;</span>,{' '}
                  <span className="text-yellow-300">&apos;logic&apos;</span>&#93;;
                </p>
                <p className="text-white/70">
                  <span className="text-purple-400">function</span> <span className="text-cyan-400">selectCareerPath</span>() &#123;
                </p>
                <div className="pl-3 space-y-1">
                  <p className="text-white/40 line-through">
                    if (lovesBiology) return &apos;Medicine&apos;; <span className="text-red-400">// REJECTED</span>
                  </p>
                  <p className="text-white/40 line-through">
                    if (lovesMemorization) return &apos;Arts&apos;; <span className="text-amber-400">// REJECTED</span>
                  </p>
                  <p className="text-white/40 line-through">
                    if (prefersFinance) return &apos;Commerce&apos;; <span className="text-slate-400">// REJECTED</span>
                  </p>
                  <div className="p-2 rounded bg-[#FF85A2]/15 border border-[#FF85A2]/40 text-[#FFA3B8] font-bold mt-2">
                    return &#123; <span className="text-white">track</span>: <span className="text-emerald-400">&apos;Computer Science&apos;</span>, <span className="text-white">passion</span>: <span className="text-emerald-400">&apos;UNSTOPPABLE&apos;</span> &#125;;
                  </div>
                </div>
                <p className="text-white/70">&#125;</p>
              </div>
            </div>

            {/* Bottom Insight Pill */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-[#CBD5E1] flex items-center gap-3">
              <Lightbulb className="w-4 h-4 text-[#FF85A2] shrink-0" />
              <span>
                Writing lines of code that instruct machines to think was the first time school felt like magic.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
