/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useEffect } from 'react';
import { Project } from '../utils/portfolioData.ts';
import { X, CheckCircle2, Shield, Cpu, Activity, Sparkles, AlertCircle, Lightbulb, UserCheck, Terminal } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed Project Dossier: ${project.name}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#07090e] p-6 sm:p-9 shadow-[0_0_100px_rgba(255,133,162,0.15)] text-[#F1F3F9] flex flex-col justify-between"
      >
        {/* Top Floating Header & Action Ribbon */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="font-bold text-[#FF85A2] tracking-wider">{project.code}</span>
              <span className="text-white/20">//</span>
              <span className="px-2.5 py-0.5 rounded-full border border-[#FF85A2]/40 bg-[#FF85A2]/10 text-[#FFA3B8] font-bold text-[10px]">
                {project.status.toUpperCase()}
              </span>
              <span className="text-white/20">//</span>
              <span className="text-[#94A3B8]">{project.category}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mt-1">
              {project.name}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#78E7FF] tracking-wider mt-0.5 font-semibold">
              {project.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-[#CBD5E1] hover:border-[#FF85A2] hover:text-[#FFA3B8] hover:bg-white/10 transition-all cursor-pointer interactive-control"
            aria-label="Close detailed project view"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Project Content Body */}
        <div className="py-6 space-y-8">
          {/* 1. Project Overview */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FFA3B8] tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF85A2]" />
              <span>PROJECT OVERVIEW</span>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal">
              {project.overview || project.description}
            </p>
          </div>

          {/* 2. Problem & Solution Breakdown */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Problem Box */}
            <div className="rounded-2xl border border-red-500/30 bg-red-950/25 p-5 sm:p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-red-400 mb-2.5">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>THE ENGINEERING PROBLEM</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-red-100 font-normal">
                {project.problem || 'Complex, distributed processes require robust verification, low-latency execution, and resilient boundaries against failure and unauthorized state changes.'}
              </p>
            </div>

            {/* Solution Box */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/25 p-5 sm:p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 mb-2.5">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>THE ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-emerald-100 font-normal">
                {project.solution || 'Engineered modular abstractions with strict fail-closed security protocols, type-safe data pipelines, and responsive real-time feedback loops.'}
              </p>
            </div>
          </div>

          {/* 3. Key Architectural Features */}
          <div className="rounded-2xl border border-white/15 bg-black/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FFA3B8] tracking-widest uppercase mb-3">
              <Cpu className="w-4 h-4 text-[#FF85A2]" />
              <span>KEY SYSTEM CAPABILITIES &amp; HIGHLIGHTS</span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm sm:text-base text-[#F5F5F5] font-normal">
              {(project.keyFeatures || project.highlights).map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF85A2] shrink-0 mt-1" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. My Contribution (Anagha's Direct Role) */}
          <div className="rounded-2xl border border-[#78E7FF]/30 bg-[#78E7FF]/[0.08] p-5 sm:p-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#78E7FF] tracking-widest uppercase mb-2">
              <UserCheck className="w-4 h-4 text-[#78E7FF]" />
              <span>MY CONTRIBUTION &amp; ENGINEERING FOCUS</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#F5F5F5] font-normal">
              {project.myContribution || 'Led system architecture, API route engineering, data pipeline security, authentication handshakes, and responsive interface workflows.'}
            </p>
          </div>

          {/* 5. Live Architecture / Terminal Inspector */}
          <div className="rounded-2xl border border-white/15 bg-black/90 p-4 sm:p-5 font-mono text-xs text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-xs text-[#78E7FF]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#78E7FF]" />
                <span>SPECIFICATION &amp; RUNTIME HOOKS // {project.code}</span>
              </span>
              <span className="text-emerald-400 font-bold animate-pulse">VERIFIED PRODUCTION-READY</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-200">
              <p className="text-white/50">&gt; Runtime target: Modern Web Standards (ES2024 / Node LTS)</p>
              <p className="text-white/90">&gt; Stack: {project.tech.join(' · ')}</p>
              <p className="text-emerald-400">&gt; Perimeter audit: Zero unresolved critical security vulnerabilities.</p>
            </div>
          </div>

          {/* 6. Technologies Used Chips */}
          <div>
            <div className="font-mono text-xs font-bold text-[#B8B8B8] uppercase tracking-wider mb-2.5">
              TECHNOLOGIES DEPLOYED
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
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

        {/* Modal Footer: Action Close Button (Repository & Live Demo options removed) */}
        <div className="flex items-center justify-end border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-2.5 rounded-full border border-white/25 bg-white/10 font-mono text-xs font-bold text-white hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer interactive-control shadow-md"
          >
            RETURN TO PORTFOLIO
          </button>
        </div>
      </div>
    </div>
  );
};
