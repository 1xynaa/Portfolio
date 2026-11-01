/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { SkillsSection } from './SkillsSection.tsx';
import { EducationTimeline } from './EducationTimeline.tsx';
import { Network, Trophy, Compass, ArrowRight } from 'lucide-react';

interface Chapter07WhatIKnowProps {
  onContinue?: () => void;
}

export const Chapter07WhatIKnow: React.FC<Chapter07WhatIKnowProps> = ({ onContinue }) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'achievements'>('skills');

  return (
    <div
      id="what-i-know"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 07 — What I Know"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#FF85A2] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 07</span>
          <span className="text-white/20">//</span>
          <span className="text-[#FFA3B8] font-semibold">WHAT I KNOW</span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-black/60 border border-white/10 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-[#FF85A2] text-[#030305] shadow-[0_0_15px_rgba(255,133,162,0.4)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>SKILL CONSTELLATION</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-[#C084FC] text-[#030305] shadow-[0_0_15px_rgba(192,132,252,0.4)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>MILESTONES &amp; HONORS</span>
          </button>
        </div>
      </div>

      {/* Narrative Header */}
      <div className="pt-4 pb-4">
        <div className="readable-plate p-5 sm:p-7 rounded-2xl border border-white/15 max-w-3xl">
          <div className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#FFA3B8]">
            CAPABILITIES // ACADEMIC RIGOR
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            {activeTab === 'skills' ? 'TECHNICAL ARCHITECTURE & TOOLKIT' : 'EDUCATION & HONORS TIMELINE'}
          </h2>
          <div className="mt-2 inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1 font-mono text-xs text-[#FFA3B8]">
            ANAGHA MITHRA AINIPPULLY REMITH // KNOWLEDGE BASE
          </div>
        </div>
      </div>

      {/* Render Active View in open container */}
      <div className="relative flex-1 py-4">
        {activeTab === 'skills' ? (
          <div className="w-full">
            <SkillsSection />
          </div>
        ) : (
          <div className="w-full">
            <EducationTimeline />
          </div>
        )}
      </div>

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#FF85A2]" />
          <span>CYBERSECURITY &amp; FULL-STACK SPECIALIZATION</span>
        </div>

        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 text-[#FFA3B8] hover:text-white transition-colors cursor-pointer interactive-control font-bold"
          >
            <span>CONTINUE TO CHAPTER 08 // WHAT&apos;S NEXT</span>
            <ArrowRight className="w-4 h-4 text-[#FF85A2]" />
          </button>
        )}

        <div className="flex items-center gap-2 text-[#FFA3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
          <span className="tracking-widest">CHAPTER 07 / 08</span>
        </div>
      </div>
    </div>
  );
};
