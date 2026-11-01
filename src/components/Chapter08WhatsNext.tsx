/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, CheckCircle2, RotateCcw } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData.ts';

interface Chapter08WhatsNextProps {
  onReplay?: () => void;
}

export const Chapter08WhatsNext: React.FC<Chapter08WhatsNextProps> = ({ onReplay }) => {
  const [copyStatus, setCopyStatus] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopyStatus('Email address copied to clipboard.');
      setTimeout(() => setCopyStatus(''), 3000);
    } catch {
      setCopyStatus('Copy unavailable. Select the email to copy.');
    }
  };

  return (
    <div
      id="whats-next"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 08 — What's Next?"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#FF85A2] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 08</span>
          <span className="text-white/20">//</span>
          <span className="text-[#FFA3B8] font-semibold">WHAT&apos;S NEXT?</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#94A3B8]">HORIZON:</span>
          <span className="px-2.5 py-0.5 rounded border border-[#FF85A2]/40 bg-[#FF85A2]/10 text-[#FFA3B8] font-semibold shadow-[0_0_12px_rgba(255,133,162,0.2)]">
            AVAILABLE FOR ENGINEERING ROLES &amp; RESEARCH
          </span>
        </div>
      </div>

      {/* Main Open Narrative & Connect Interface */}
      <div className="my-auto py-6">
        <div className="readable-plate max-w-4xl p-6 sm:p-8 rounded-3xl border border-white/20 space-y-7 shadow-2xl">
          <div>
            <div className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#FFA3B8]">
              THE STORY CONTINUES // FUTURE CHAPTERS
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] mt-1">
              THE STORY IS STILL UNFOLDING.
            </h2>

            <div className="mt-2.5 inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1 font-mono text-xs text-[#FFA3B8]">
              ANAGHA MITHRA AINIPPULLY REMITH // CHENNAI
            </div>

            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal">
              From Kerala to Qatar to Chennai, I&apos;ve always been driven by curiosity about what lies beyond what&apos;s familiar. I&apos;m still exploring, still breaking, and still building. And honestly, I don&apos;t think I&apos;m anywhere near done.
            </p>
          </div>

          {/* Minimalist Floating Contact & Collaboration Console */}
          <div className="grid gap-6 lg:grid-cols-12 items-center">
            {/* Email & Location Group */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/20 readable-card p-4 sm:p-5">
                <Mail className="h-5 w-5 shrink-0 text-[#FF85A2]" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm sm:text-base text-white hover:text-[#FFA3B8] transition-colors break-all interactive-control font-medium"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ml-auto rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-mono text-xs text-white hover:border-[#FF85A2] hover:text-[#FFA3B8] transition-all cursor-pointer interactive-control font-bold"
                >
                  {copyStatus ? 'COPIED!' : 'COPY EMAIL'}
                </button>
              </div>

              {copyStatus && (
                <p className="font-mono text-xs text-[#FFA3B8] flex items-center gap-1.5 font-semibold" aria-live="polite">
                  <CheckCircle2 className="h-4 w-4 text-[#FF85A2]" />
                  <span>{copyStatus}</span>
                </p>
              )}

              <div className="flex items-center gap-2 font-mono text-xs text-[#B8B8B8]">
                <MapPin className="h-4 w-4 text-[#FF85A2]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Social Profiles Grid */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile"
                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-white/20 readable-card hover:border-[#FF85A2] transition-all group interactive-control"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-5 h-5 text-[#FF85A2]" />
                  <span className="font-mono text-xs sm:text-sm font-bold text-white group-hover:text-[#FFA3B8] transition-colors">LINKEDIN</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#B8B8B8] group-hover:text-white" />
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-white/20 readable-card hover:border-[#FF85A2] transition-all group interactive-control"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-5 h-5 text-[#FF85A2]" />
                  <span className="font-mono text-xs sm:text-sm font-bold text-white group-hover:text-[#FFA3B8] transition-colors">GITHUB</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#B8B8B8] group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Action Buttons: Download Resume & Replay Journey */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/Anagha_Mithra_Resume.pdf"
              download="Anagha_Mithra_Resume.pdf"
              className="group flex h-12 items-center gap-2.5 rounded-full bg-[#FF85A2] px-7 text-[#030305] font-mono text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_25px_rgba(255,133,162,0.45)] transition-all duration-200 hover:bg-[#FFA3B8] hover:shadow-[0_0_35px_rgba(255,133,162,0.7)] hover:scale-105 active:scale-95 cursor-pointer interactive-control"
            >
              <Download className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            {onReplay && (
              <button
                type="button"
                onClick={onReplay}
                className="group flex h-12 items-center gap-2 rounded-full border border-white/25 bg-black/60 px-6 font-mono text-xs sm:text-sm font-medium tracking-wider text-white backdrop-blur-md transition-all duration-200 hover:border-[#FF85A2] hover:text-[#FFA3B8] hover:scale-105 active:scale-95 cursor-pointer interactive-control"
              >
                <RotateCcw className="h-4 w-4 text-[#FF85A2] transition-transform duration-300 group-hover:-rotate-90" />
                <span>REPLAY STORY FROM BEGINNING</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <span>ANAGHA MITHRA AINIPPULLY REMITH // 2026</span>
        <div className="flex items-center gap-2 text-[#FFA3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
          <span className="tracking-widest">CHAPTER 08 / 08 // COMPLETE</span>
        </div>
      </div>
    </div>
  );
};
