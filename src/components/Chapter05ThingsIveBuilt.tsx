/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '../utils/portfolioData.ts';
import { ProjectDetailModal } from './ProjectDetailModal.tsx';
import { ArrowRight, ExternalLink, CheckCircle2, Cpu, Terminal, Activity, Shield, Sparkles, Eye } from 'lucide-react';

interface Chapter05ThingsIveBuiltProps {
  onContinue?: () => void;
}

export const Chapter05ThingsIveBuilt: React.FC<Chapter05ThingsIveBuiltProps> = ({ onContinue }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) ?? PROJECTS[0];
  const [inspectMode, setInspectMode] = useState<'architecture' | 'telemetry'>('architecture');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'In active development':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF85A2]/40 bg-[#FF85A2]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#FFA3B8] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
            ACTIVE DEV
          </span>
        );
      case 'Prototype':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#78E7FF]/40 bg-[#78E7FF]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#78E7FF] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78E7FF]" />
            PROTOTYPE
          </span>
        );
      case 'Interactive game':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C084FC]/40 bg-[#C084FC]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#C084FC] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C084FC]" />
            GAME
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-[#CBD5E1] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" />
            PRODUCTION
          </span>
        );
    }
  };

  return (
    <div
      id="things-ive-built"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 05 — Things I've Built"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#FF85A2] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 05</span>
          <span className="text-white/20">//</span>
          <span className="text-[#FFA3B8] font-semibold">THINGS I&apos;VE BUILT</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#94A3B8]">ENGINEERING LABORATORY:</span>
          <span className="px-2.5 py-0.5 rounded border border-[#FF85A2]/40 bg-[#FF85A2]/10 text-[#FFA3B8] font-semibold shadow-[0_0_12px_rgba(255,133,162,0.2)]">
            4 FLAGSHIP SYSTEMS · CLICK TO OPEN FULL DOSSIER
          </span>
        </div>
      </div>

      {/* Main Open Product Exploration Workbench */}
      <div className="my-auto grid items-start gap-8 lg:grid-cols-12 py-6">
        {/* Left Column: Project Selector Dock */}
        <div className="lg:col-span-4 space-y-3">
          <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#78E7FF] mb-1">
            PRODUCT WORKBENCH // SYSTEMS
          </div>

          <div className="space-y-3">
            {PROJECTS.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    setSelectedProjectId(project.id);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer interactive-control group readable-card ${
                    isSelected
                      ? 'border-[#FF85A2] bg-[#FF85A2]/20 shadow-[0_0_25px_rgba(255,133,162,0.35)] ring-2 ring-[#FF85A2]'
                      : 'border-white/15 bg-black/60 hover:border-white/30 hover:bg-black/80'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                    <span className={isSelected ? 'text-[#FFA3B8] font-bold' : 'text-[#B8B8B8]'}>
                      {project.code}
                    </span>
                    {getStatusBadge(project.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#FFA3B8] transition-colors tracking-wide">
                      {project.name}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProjectId(project.id);
                        setIsDetailModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-md border border-white/20 bg-white/10 text-white hover:text-[#030305] hover:bg-[#FF85A2] transition-colors font-bold"
                      title="Open full detailed project view"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>DETAILS</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F5F5] line-clamp-2 mt-2 font-normal leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Inspectable System Architecture Workbench */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6 p-6 sm:p-8 rounded-3xl readable-plate border border-white/15 shadow-2xl">
          {/* Workbench Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="font-mono text-xs sm:text-sm text-[#FFA3B8] font-bold">
                ANAGHA MITHRA AINIPPULLY REMITH // SYSTEM WORKBENCH
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
                {activeProject.name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Detailed Project Dossier Button */}
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#FF85A2] bg-[#FF85A2]/25 font-mono text-xs sm:text-sm font-bold text-white hover:bg-[#FF85A2] hover:text-[#030305] shadow-[0_0_20px_rgba(255,133,162,0.4)] transition-all cursor-pointer interactive-control"
              >
                <span>OPEN FULL DOSSIER</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* Mode Switcher: Architecture vs Telemetry */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-black/70 border border-white/15 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setInspectMode('architecture')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
                    inspectMode === 'architecture'
                      ? 'bg-white text-black shadow-md'
                      : 'text-[#B8B8B8] hover:text-white'
                  }`}
                >
                  ARCHITECTURE
                </button>
                <button
                  type="button"
                  onClick={() => setInspectMode('telemetry')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all interactive-control cursor-pointer ${
                    inspectMode === 'telemetry'
                      ? 'bg-[#78E7FF] text-[#030305] shadow-[0_0_12px_rgba(120,231,255,0.4)]'
                      : 'text-[#B8B8B8] hover:text-white'
                  }`}
                >
                  LIVE TELEMETRY
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal">
            {activeProject.description}
          </p>

          {/* Dynamic Inspector Panel */}
          {inspectMode === 'architecture' ? (
            <div className="rounded-2xl border border-white/15 bg-black/70 backdrop-blur-md p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#FFA3B8] font-bold">
                <Cpu className="w-4 h-4 text-[#FF85A2]" />
                <span>SYSTEM HIGHLIGHTS &amp; DESIGN PATTERNS:</span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#F5F5F5] pl-1 font-normal">
                {activeProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF85A2] shrink-0 mt-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-black/80 p-4 font-mono text-xs text-left space-y-2">
              <div className="flex items-center justify-between text-[11px] text-cyan-400 border-b border-white/10 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  RUNTIME CONSOLE // {activeProject.code}
                </span>
                <span className="text-emerald-400 animate-pulse font-bold">0 VULNERABILITIES</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <p className="text-white/40">&gt; Authenticating session token [HS256 Verified]</p>
                <p className="text-white/80">&gt; Active components: {activeProject.tech.join(', ')}</p>
                <p className="text-emerald-400">&gt; Security verification: Fail-closed boundary intact.</p>
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="flex flex-wrap gap-2">
              {activeProject.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1 font-mono text-xs text-[#F5F5F5]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Environmental Metadata + Continue Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#FF85A2]" />
          <span>PORTFOLIO PRODUCTS: NEXUS, KILL CHAIN, MURDER.EXE, SARA</span>
        </div>

        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 text-[#FFA3B8] hover:text-white transition-colors cursor-pointer interactive-control font-bold"
          >
            <span>HACKATHONS &amp; COMPETITIONS</span>
            <ArrowRight className="w-4 h-4 text-[#FF85A2]" />
          </button>
        )}

        <div className="flex items-center gap-2 text-[#FFA3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
          <span className="tracking-widest">CHAPTER 05 / 08</span>
        </div>
      </div>

      {/* Detailed Full-Screen Project Overlay Modal */}
      <ProjectDetailModal
        project={activeProject}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};
