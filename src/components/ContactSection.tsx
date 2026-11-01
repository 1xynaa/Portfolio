/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, CheckCircle2, Sparkles, RotateCcw } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/portfolioData.ts';

// -----------------------------------------------------------------
// Subtle Animated Particle Canvas for Closing Section
// -----------------------------------------------------------------
function ClosingParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1.2 + Math.random() * 1.5,
      color: Math.random() > 0.4 ? 'rgba(255, 133, 162, 0.75)' : 'rgba(232, 121, 249, 0.65)',
    }));

    let mouseX = -999;
    let mouseY = -999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -999;
      mouseY = -999;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          p.x -= (dx / dist) * 1.5;
          p.y -= (dy / dist) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 70) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 133, 162, ${0.12 * (1 - dist2 / 70)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden="true"
    />
  );
}

interface ContactSectionProps {
  onReplay?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onReplay }) => {
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
      id="contact"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center min-h-[90vh]"
      aria-label="Chapter 08: What's Next?"
    >
      {/* Chapter Marker */}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#FF85A2]">
        <span className="w-2.5 h-0.5 bg-[#FF85A2]" />
        <span>FINAL CHAPTER // WHAT&apos;S NEXT?</span>
      </div>

      <div className="mb-6">
        <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#FFFFFF] leading-tight">
          THE STORY IS STILL UNFOLDING.
        </h2>
        <div className="mt-3 max-w-3xl rounded-xl border border-[#FF85A2]/30 bg-[#FF85A2]/[0.05] p-4">
          <p className="font-display text-xs sm:text-sm text-white font-medium italic leading-relaxed">
            &ldquo;From Kerala to Qatar to Chennai, I&apos;ve always been curious about what lies beyond what&apos;s familiar. I&apos;m still exploring, still learning, and still building. And honestly, I don&apos;t think I&apos;m anywhere near done.&rdquo;
          </p>
        </div>
      </div>

      {/* Main Closing Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#FF85A2]/30 bg-[#07070b] p-5 sm:p-7 shadow-2xl mb-6">
        <ClosingParticleField />

        <div className="relative z-10 grid gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FFA3B8] mb-2.5 font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#FF85A2]" />
              <span>AN INVITATION TO CONNECT &amp; COLLABORATE</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/15 bg-black/75 backdrop-blur-md p-3.5 sm:p-4">
              <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-[#FF85A2]" />
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex min-h-10 items-center break-all font-mono text-xs sm:text-sm text-[#F1F3F9] hover:text-[#FFA3B8] transition-colors interactive-control"
              >
                {PERSONAL_INFO.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="min-h-9 rounded border border-white/20 bg-white/[0.04] px-3 font-mono text-xs text-[#CBD5E1] hover:border-[#FF85A2]/60 hover:text-[#FFA3B8] transition-all cursor-pointer interactive-control"
              >
                {copyStatus ? 'COPIED!' : 'COPY EMAIL'}
              </button>
            </div>

            {copyStatus && (
              <p className="mt-2 font-mono text-xs text-[#FFA3B8] flex items-center gap-1.5" aria-live="polite">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#FF85A2]" />
                <span>{copyStatus}</span>
              </p>
            )}

            <div className="mt-3 flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
              <MapPin aria-hidden="true" className="h-4 w-4 text-[#FF85A2]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Anagha Mithra's LinkedIn profile"
              className="group flex min-h-20 items-center justify-between rounded-xl border border-white/15 bg-black/70 backdrop-blur-md p-4 hover:border-[#FF85A2]/60 transition-all shadow-lg interactive-control"
            >
              <span className="flex items-center gap-2.5">
                <Linkedin aria-hidden="true" className="h-4 w-4 text-[#FF85A2]" />
                <span className="font-mono text-xs text-[#FFFFFF] group-hover:text-[#FFA3B8] transition-colors font-semibold">LINKEDIN</span>
              </span>
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-white" />
            </a>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Anagha Mithra's GitHub profile"
              className="group flex min-h-20 items-center justify-between rounded-xl border border-white/15 bg-black/70 backdrop-blur-md p-4 hover:border-[#FF85A2]/60 transition-all shadow-lg interactive-control"
            >
              <span className="flex items-center gap-2.5">
                <Github aria-hidden="true" className="h-4 w-4 text-[#FF85A2]" />
                <span className="font-mono text-xs text-[#FFFFFF] group-hover:text-[#FFA3B8] transition-colors font-semibold">GITHUB</span>
              </span>
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Resume Download & Replay Call-To-Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <a
          href={PERSONAL_INFO.resumePath}
          download="Anagha_Mithra_Resume.pdf"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#FF85A2] bg-[#FF85A2]/15 px-5 font-mono text-xs font-bold text-[#FFA3B8] shadow-lg shadow-[#FF85A2]/10 transition-all hover:bg-[#FF85A2] hover:text-[#030305] interactive-control"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          <span>DOWNLOAD RESUME (PDF)</span>
        </a>

        {onReplay && (
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 font-mono text-xs font-bold text-white transition-all hover:border-[#FF85A2] hover:text-[#FFA3B8] interactive-control cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 text-[#FF85A2]" />
            <span>REPLAY STORY FROM BEGINNING</span>
          </button>
        )}
      </div>
    </div>
  );
};
