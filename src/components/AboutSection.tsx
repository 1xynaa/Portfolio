/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { Sparkles, Shield, Code, Cpu, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData.ts';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12 border-b border-white/10 pb-6">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-[#FFA3B8]">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[#FF85A2]" />
          <span>SECTION C // ABOUT & PERSPECTIVE</span>
        </div>
        <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-[#FFFFFF] sm:text-5xl">
          BEYOND THE INTERFACE.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#94A3B8] sm:text-base">
          A cybersecurity-focused computer science student building practical software systems and investigating what happens beneath the interface.
        </p>
      </div>

      <div className="grid items-stretch gap-8 lg:grid-cols-12">
        {/* Core Narrative */}
        <div className="space-y-6 rounded-xl border border-white/10 bg-[#090b10]/90 p-6 sm:p-8 lg:col-span-7 shadow-xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
            <span className="text-[#FFA3B8] font-semibold">{PERSONAL_INFO.currentYear} / SRMIST</span>
            <span className="rounded-full bg-[#FF85A2]/10 border border-[#FF85A2]/30 px-3 py-0.5 text-[#FFA3B8] font-bold">
              FIRST-YEAR CGPA: {PERSONAL_INFO.cgpa}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#CBD5E1] sm:text-base sm:leading-7">
            I am a second-year undergraduate pursuing a B.Tech in Computer Science and Engineering (Cybersecurity)
            at SRM Institute of Science and Technology in Kattankulathur, Tamil Nadu. My first-year CGPA was{' '}
            <span className="font-mono text-[#FFA3B8] font-bold">{PERSONAL_INFO.cgpa}</span>.
          </p>

          <p className="text-sm leading-relaxed text-[#94A3B8] sm:text-base sm:leading-7">
            My work focuses on bridging application engineering with defensive security. I design full-stack
            systems with Next.js, TypeScript, and PostgreSQL while maintaining strict fail-closed access controls
            and boundary protections. In parallel, I explore AI-assisted investigations—using machine intelligence
            grounded in authenticated system logs, packet captures, and forensic artifacts to reconstruct attack
            activity and surface indicators of compromise.
          </p>

          <div className="border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
            <span className="text-[#F1F3F9] font-medium">LOCATION:</span> {PERSONAL_INFO.location}
          </div>
        </div>

        {/* 3 Core Focus Cards */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-xl border border-white/10 bg-[#090b10]/90 p-5 shadow-lg">
            <div className="flex items-center gap-2.5 text-[#FFA3B8] font-mono text-xs font-semibold mb-2">
              <Shield className="h-4 w-4 text-[#FF85A2]" />
              <span>01 // SECURITY ENGINEERING</span>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Fail-closed server configurations, privileged access controls, network packet analysis with tshark and Nmap, and defensive system architecture.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#090b10]/90 p-5 shadow-lg">
            <div className="flex items-center gap-2.5 text-[#F472B6] font-mono text-xs font-semibold mb-2">
              <Code className="h-4 w-4 text-[#F472B6]" />
              <span>02 // FULL-STACK DEVELOPMENT</span>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Scalable web architectures with Next.js App Router, 30+ typed API endpoints, PostgreSQL data access with Supabase, and responsive user experiences.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#090b10]/90 p-5 shadow-lg">
            <div className="flex items-center gap-2.5 text-[#E879F9] font-mono text-xs font-semibold mb-2">
              <Cpu className="h-4 w-4 text-[#E879F9]" />
              <span>03 // AI INVESTIGATIONS & FORENSICS</span>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Investigating digital evidence, MITRE ATT&CK timeline mapping, and AI-assisted inquiry workflows grounded in verified operational telemetry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
