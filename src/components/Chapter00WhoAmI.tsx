/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { ArrowDown, Download, Shield, Terminal, Cpu, ArrowRight } from 'lucide-react';

interface Chapter00WhoAmIProps {
  onContinue?: () => void;
}

export const Chapter00WhoAmI: React.FC<Chapter00WhoAmIProps> = ({ onContinue }) => {
  return (
    <div
      id="who-am-i"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 00 — Who Am I?"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#78E7FF] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 00</span>
          <span className="text-white/20">//</span>
          <span className="text-[#78E7FF] font-semibold">WHO AM I?</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <span className="text-white/40 hidden sm:inline">STATUS:</span>
          <span className="px-2.5 py-0.5 rounded border border-[#78E7FF]/40 bg-[#78E7FF]/10 text-[#78E7FF] font-semibold shadow-[0_0_12px_rgba(120,231,255,0.2)]">
            B.TECH CSE (2ND YEAR) · CGPA 9.18
          </span>
          <span className="text-white/20">/</span>
          <span className="text-slate-400">SRMIST KTR</span>
        </div>
      </div>

      {/* Main Open Editorial Typography Area */}
      <div className="my-auto max-w-2xl p-6 sm:p-9 rounded-3xl readable-plate shadow-2xl border border-white/15">
        <div className="mb-2 font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFA3B8]">
          ANAGHA MITHRA AINIPPULLY REMITH
        </div>

        {/* Cinematic Title Display */}
        <div className="mb-4">
          <div className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#FFFFFF] leading-[0.95]">
            ANAGHA
          </div>
          <div className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#C084FC] leading-[0.95] drop-shadow-[0_0_40px_rgba(192,132,252,0.45)]">
            MITHRA
          </div>
        </div>

        {/* Specialization HUD Capsule */}
        <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-[#78E7FF]/40 bg-black/60 px-4 py-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#78E7FF] backdrop-blur-md shadow-[0_0_15px_rgba(120,231,255,0.15)]">
          <Shield className="w-4 h-4 text-[#78E7FF]" />
          <span>SECURITY ENGINEERING</span>
          <span className="text-white/40">·</span>
          <span>FULL-STACK DEVELOPMENT</span>
        </div>

        {/* Core Narrative Statement */}
        <p className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal">
          Building resilient web architectures, auditing protocol boundaries, and uncovering what happens underneath the interface.
        </p>

        {/* Action Group: Direct Resume PDF Download + Chapter Navigation */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/Anagha_Mithra_Resume.pdf"
            download="Anagha_Mithra_Resume.pdf"
            className="group flex h-12 items-center gap-2.5 rounded-full bg-[#FF85A2] px-7 text-[#030305] font-mono text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_25px_rgba(255,133,162,0.45)] transition-all duration-200 hover:bg-[#FFA3B8] hover:shadow-[0_0_35px_rgba(255,133,162,0.7)] hover:scale-105 active:scale-95 cursor-pointer interactive-control"
            aria-label="Download Anagha Mithra's Resume directly"
          >
            <Download className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span>DOWNLOAD RESUME (PDF)</span>
          </a>

          <button
            type="button"
            onClick={onContinue}
            className="group flex h-12 items-center gap-2.5 rounded-full border border-white/25 bg-black/60 px-6 font-mono text-xs sm:text-sm font-medium tracking-wider text-[#F5F5F5] backdrop-blur-md transition-all duration-200 hover:border-[#78E7FF]/70 hover:bg-black/80 hover:text-white hover:scale-105 active:scale-95 cursor-pointer interactive-control"
            aria-label="Advance to Chapter 01"
          >
            <span>START THE JOURNEY</span>
            <ArrowRight className="h-4 w-4 text-[#78E7FF] transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <span className="text-white/40">LOCATION:</span>
          <span className="text-[#F1F3F9]">KATTANKULATHUR, TAMIL NADU</span>
          <span className="text-white/20">/</span>
          <span className="text-[#78E7FF]">12.8231° N, 80.0442° E</span>
        </div>

        <div className="flex items-center gap-2 text-[#FFA3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
          <span className="tracking-widest">CHAPTER 00 / 08</span>
        </div>
      </div>
    </div>
  );
};
