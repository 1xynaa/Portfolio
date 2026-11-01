/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { ArrowDownRight, Sparkles, CheckCircle2, Terminal, Shield, Cpu, Activity, ArrowRight } from 'lucide-react';
import { PROJECTS, Project } from '../utils/portfolioData.ts';

interface ProjectExplorerProps {
  onContinue?: () => void;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ onContinue }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find((project) => project.id === selectedProjectId) ?? PROJECTS[0];
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'architecture' | 'telemetry'>('architecture');

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'In active development':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF85A2]/40 bg-[#FF85A2]/10 px-2 py-0.5 font-mono text-[9px] text-[#FFA3B8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
            IN ACTIVE DEV
          </span>
        );
      case 'Prototype':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F472B6]/40 bg-[#F472B6]/10 px-2 py-0.5 font-mono text-[9px] text-[#F472B6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F472B6]" />
            PROTOTYPE
          </span>
        );
      case 'Interactive game':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E879F9]/40 bg-[#E879F9]/10 px-2 py-0.5 font-mono text-[9px] text-[#E879F9]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E879F9]" />
            GAME
          </span>
        );
      case 'Project':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-[#CBD5E1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" />
            COMPLETED
          </span>
        );
    }
  };

  const handleNext = () => {
    if (onContinue) onContinue();
    else document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="projects"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center min-h-[90vh]"
      aria-label="Chapter 06: Things I've Built"
    >
      {/* Chapter Marker */}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#FF85A2]">
        <span className="w-2.5 h-0.5 bg-[#FF85A2]" />
        <span>CHAPTER 06 // THINGS I&apos;VE BUILT</span>
      </div>

      {/* Opening Editorial Headline */}
      <div className="mb-6">
        <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
          ENOUGH TALK. LET&apos;S BUILD.
        </h2>
        <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-[#78E7FF] tracking-wider">
          APPLICATION ARCHITECTURE // DEFENSIVE SECURITY PROTOCOLS // FORENSIC INVESTIGATIONS
        </p>
      </div>

      {/* Interactive Code Particle Project System */}
      <div className="grid items-start gap-6 lg:grid-cols-12">
        {/* Project Selector Matrix */}
        <div
          className="flex flex-col gap-2.5 lg:col-span-4"
          role="group"
          aria-label="Choose a project to inspect"
        >
          {PROJECTS.map((project) => {
            const selected = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProjectId(project.id)}
                aria-pressed={selected}
                className={`group rounded-xl border p-3 text-left transition-all cursor-pointer interactive-control relative overflow-hidden ${
                  selected
                    ? 'border-[#FF85A2] bg-[#FF85A2]/[0.10] shadow-lg shadow-[#FF85A2]/15 ring-1 ring-[#FF85A2]'
                    : 'border-white/10 bg-[#090b10]/80 hover:border-white/25 hover:bg-[#0c0e15]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-wider">
                  <span className={selected ? 'text-[#FFA3B8] font-bold' : 'text-[#94A3B8]'}>
                    {project.code}
                  </span>
                  {getStatusBadge(project.status)}
                </div>
                <div className="mt-1 font-mono text-base font-bold text-[#FFFFFF] group-hover:text-[#FFA3B8] transition-colors">
                  {project.name}
                </div>
                <div className="mt-0.5 text-xs leading-snug text-[#94A3B8] line-clamp-2">
                  {project.shortDesc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Project Dynamic Blueprint Canvas */}
        <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e101a] via-[#090b14] to-[#040508] p-5 sm:p-7 shadow-2xl backdrop-blur-md lg:col-span-8 flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#FF85A2]">{activeProject.code}</span>
                <span className="text-white/20">/</span>
                <span className="text-white font-semibold">{activeProject.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTelemetryTab('architecture')}
                  className={`px-2.5 py-1 rounded text-[11px] transition-all interactive-control cursor-pointer ${
                    activeTelemetryTab === 'architecture'
                      ? 'bg-white/10 text-white font-semibold border border-white/20'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  ARCHITECTURE
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTelemetryTab('telemetry')}
                  className={`px-2.5 py-1 rounded text-[11px] transition-all interactive-control cursor-pointer ${
                    activeTelemetryTab === 'telemetry'
                      ? 'bg-[#78E7FF]/20 text-[#78E7FF] font-semibold border border-[#78E7FF]/40'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  LIVE LOGS
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
              {activeProject.description}
            </p>

            {/* Architecture / Telemetry Tabs */}
            <div className="mt-4 rounded-xl border border-white/10 bg-black/80 p-3.5 font-mono text-xs text-left">
              {activeTelemetryTab === 'architecture' ? (
                <div className="space-y-1.5 text-[11px]">
                  <div className="text-[#FFA3B8] font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>VERIFIED SYSTEM ARCHITECTURE:</span>
                  </div>
                  <ul className="space-y-1 pl-1 text-[#CBD5E1]">
                    {activeProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF85A2] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="text-cyan-400 flex items-center justify-between pb-1 border-b border-white/10">
                    <span>// RUNTIME SYSTEM CONSOLE</span>
                    <span className="text-emerald-400 animate-pulse">STATUS: ACTIVE</span>
                  </div>
                  <p className="text-white/40">&gt; Initializing security sandbox runtime...</p>
                  <p className="text-white/80">&gt; Binding module hooks: {activeProject.tech.slice(0, 3).join(', ')}</p>
                  <p className="text-emerald-400">&gt; Security verification: 0 vulnerabilities detected in perimeter audit.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack Chips & Action Links */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
              {activeProject.tech.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-[#CBD5E1]"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-[#FFA3B8] hover:text-white hover:border-[#FF85A2] transition-colors cursor-pointer font-bold"
              >
                <span>NEXT CHAPTER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
