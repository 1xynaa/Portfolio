/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HACKATHONS_DATA, HackathonItem } from '../utils/portfolioData.ts';
import { Trophy, Award, Sparkles, ExternalLink, Shield, Cpu, Flame, X, ChevronLeft, ChevronRight, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface Chapter06HackathonsProps {
  onContinue?: () => void;
}

export const Chapter06Hackathons: React.FC<Chapter06HackathonsProps> = ({ onContinue }) => {
  const [activeCert, setActiveCert] = useState<HackathonItem | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'semifinal' | 'round2' | 'top10'>('all');

  // Close lightbox modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredHackathons = HACKATHONS_DATA.filter((item) => {
    if (selectedFilter === 'semifinal') return item.recognition === 'Semifinalist';
    if (selectedFilter === 'round2') return item.recognition === 'Round 2 Qualifier';
    if (selectedFilter === 'top10') return item.recognition === 'Top 10 Finalist';
    return true;
  });

  const handlePrevCert = () => {
    if (!activeCert) return;
    const currentIndex = HACKATHONS_DATA.findIndex((h) => h.id === activeCert.id);
    const prevIndex = (currentIndex - 1 + HACKATHONS_DATA.length) % HACKATHONS_DATA.length;
    setActiveCert(HACKATHONS_DATA[prevIndex]);
  };

  const handleNextCert = () => {
    if (!activeCert) return;
    const currentIndex = HACKATHONS_DATA.findIndex((h) => h.id === activeCert.id);
    const nextIndex = (currentIndex + 1) % HACKATHONS_DATA.length;
    setActiveCert(HACKATHONS_DATA[nextIndex]);
  };

  return (
    <div
      id="hackathons"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 06 — Hackathons & Competitions"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 06</span>
          <span className="text-white/20">//</span>
          <span className="text-[#FBBF24] font-semibold">HACKATHONS &amp; COMPETITIONS</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/10 font-mono text-xs">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-white text-black shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            ALL ARENAS ({HACKATHONS_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('semifinal')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              selectedFilter === 'semifinal'
                ? 'bg-[#F59E0B] text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            SEMIFINALS
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('round2')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              selectedFilter === 'round2'
                ? 'bg-[#C084FC] text-black shadow-[0_0_12px_rgba(192,132,252,0.4)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            ROUND 2
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('top10')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
              selectedFilter === 'top10'
                ? 'bg-[#38BDF8] text-black shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            TOP 10
          </button>
        </div>
      </div>

      {/* Narrative Section Header */}
      <div className="pt-4 pb-4">
        <div className="readable-plate p-5 sm:p-7 rounded-2xl border border-white/15 max-w-3xl">
          <div className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#FBBF24]">
            THE ARENA // TIME-CRITICAL ENGINEERING
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            PRESSURE FORGES SYSTEMS.
          </h2>
          <div className="mt-2 inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1 font-mono text-xs text-[#FFA3B8]">
            ANAGHA MITHRA AINIPPULLY REMITH // SRMIST HACKATHON RECORD
          </div>
          <p className="mt-3 text-sm sm:text-base text-[#F5F5F5] font-normal leading-relaxed">
            From 28-hour cybersecurity attack simulations to AI game engines and enterprise intelligence platforms, hackathons are where I test software architecture under relentless sprint conditions.
          </p>
        </div>
      </div>

      {/* Interactive Competition Grid with Visual Identity & Real Certificate Lightboxes */}
      <div className="my-auto grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 py-4">
        {filteredHackathons.map((item) => {
          return (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-2xl readable-card p-5 sm:p-6 transition-all duration-300 hover:scale-[1.02] shadow-xl"
              style={{
                borderColor: `${item.borderGlow}`,
                boxShadow: `0 0 25px ${item.borderGlow.replace('0.35', '0.12')}`,
              }}
            >
              <div>
                {/* Event Badge & Date */}
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2.5 mb-3 font-mono text-xs">
                  <span
                    className="font-black px-2.5 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: `${item.borderGlow.replace('0.35', '0.25')}`,
                      color: item.accentColor,
                      border: `1px solid ${item.accentColor}`,
                    }}
                  >
                    {item.badge}
                  </span>
                  <span className="text-[#B8B8B8] font-mono">{item.date}</span>
                </div>

                {/* Event Name */}
                <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#FFA3B8] transition-colors leading-snug tracking-wide">
                  {item.name}
                </h3>

                <div className="text-xs font-mono text-[#B8B8B8] mt-1 mb-2">
                  {item.organizer}
                </div>

                {/* Project Built Tag (if applicable) */}
                {item.projectBuilt && (
                  <div className="my-2.5 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/[0.06] px-3 py-1 font-mono text-xs text-white">
                    <Cpu className="w-3.5 h-3.5 text-[#FF85A2]" />
                    <span className="text-[#FF85A2] font-bold">BUILT: {item.projectBuilt}</span>
                    {item.team && <span className="text-white/60">({item.team})</span>}
                  </div>
                )}

                <p className="text-sm text-[#F5F5F5] font-normal leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Focus Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.focus.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-[#CBD5E1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certificate Preview Thumbnail & Lightbox Trigger */}
              <div className="border-t border-white/15 pt-3.5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCert(item)}
                  className="flex items-center gap-2.5 group/btn cursor-pointer interactive-control text-left"
                  title="Click to inspect verified certificate"
                  aria-label={`Inspect ${item.name} certificate`}
                >
                  <div className="relative w-12 h-8 rounded border border-white/25 overflow-hidden bg-black/80 shrink-0 group-hover/btn:border-[#FF85A2] transition-colors shadow">
                    <Image
                      src={item.certificateImg}
                      alt={`${item.name} Certificate preview`}
                      fill
                      sizes="48px"
                      className="object-cover opacity-85 group-hover/btn:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover/btn:bg-transparent">
                      <Eye className="w-3 h-3 text-white drop-shadow" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white font-bold group-hover/btn:text-[#FFA3B8] transition-colors flex items-center gap-1">
                      <span>INSPECT CERTIFICATE</span>
                      <ExternalLink className="w-3 h-3 text-[#FFA3B8]" />
                    </span>
                    <span className="font-mono text-[10px] text-[#B8B8B8]">Verified Evidence</span>
                  </div>
                </button>

                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accentColor }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Certificate Inspection Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate for ${activeCert.name}`}
          onClick={() => setActiveCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#07090e] p-5 sm:p-7 shadow-[0_0_80px_rgba(0,0,0,0.9)] cursor-default flex flex-col justify-between"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#FFA3B8] font-bold">
                  <Award className="w-4 h-4 text-[#FF85A2]" />
                  <span>VERIFIED CERTIFICATE OF EVIDENCE</span>
                </div>
                <h3 className="font-mono text-lg sm:text-2xl font-bold text-white mt-1">
                  {activeCert.name}
                </h3>
                <div className="font-mono text-xs text-[#94A3B8] mt-0.5">
                  Issued to: <span className="text-white font-semibold">Anagha Mithra</span> · {activeCert.organizer}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="p-2 rounded-full border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer interactive-control"
                aria-label="Close certificate inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Certificate Image Canvas */}
            <div className="my-4 relative w-full h-[50vh] sm:h-[60vh] rounded-xl border border-white/15 bg-black/80 overflow-hidden flex items-center justify-center p-2">
              <div className="relative w-full h-full">
                <Image
                  src={activeCert.certificateImg}
                  alt={activeCert.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevCert}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white hover:border-[#FF85A2] hover:text-[#FFA3B8] transition-all cursor-pointer interactive-control"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextCert}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white hover:border-[#FF85A2] hover:text-[#FFA3B8] transition-all cursor-pointer interactive-control"
                  aria-label="Next Certificate"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>AUTHENTIC CERTIFICATE VERIFIED</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="px-4 py-1.5 rounded-full bg-[#FF85A2] text-[#030305] font-bold hover:bg-[#FFA3B8] transition-colors cursor-pointer interactive-control"
              >
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>SRMIST &middot; NFSU &middot; CINTEL &middot; ALEXA SRM HACKATHONS</span>
        </div>

        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 text-[#FFA3B8] hover:text-white transition-colors cursor-pointer interactive-control font-bold"
          >
            <span>CONTINUE TO CHAPTER 07 // WHAT I KNOW</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
          </button>
        )}

        <div className="flex items-center gap-2 text-[#FFA3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
          <span className="tracking-widest">CHAPTER 06 / 08</span>
        </div>
      </div>
    </div>
  );
};
