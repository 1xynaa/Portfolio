/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, Plane, ArrowRight, School, Compass } from 'lucide-react';

interface StoryChapter03Props {
  onContinue?: () => void;
}

export const StoryChapter03: React.FC<StoryChapter03Props> = ({ onContinue }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Best tech universities in South India?';
  const [typingComplete, setTypingComplete] = useState(false);
  const [selectedUni, setSelectedUni] = useState<'srm' | 'vit'>('srm');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        setTypingComplete(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (onContinue) onContinue();
    else document.getElementById('choosing-cs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="chennai"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center min-h-[90vh]"
      aria-label="Chapter 03: The Chennai Plot Twist"
    >
      {/* Chapter Marker */}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#78E7FF]">
        <span className="w-2.5 h-0.5 bg-[#78E7FF]" />
        <span>CHAPTER 03 // THE CHENNAI PLOT TWIST</span>
      </div>

      {/* Opening Editorial Headline */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
          SO, I ASKED GOOGLE.
        </h2>
        <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-[#78E7FF] tracking-wider">
          THE ALGORITHM DELIVERS // DOHA TO CHENNAI // SRMIST KATTANKULATHUR
        </p>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Cyber Search & Decision Narrative */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#090b10]/90 p-5 sm:p-7 lg:col-span-7 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div>
            {/* Animated Search Engine Terminal */}
            <div className="rounded-xl border border-[#78E7FF]/30 bg-black/80 p-3.5 shadow-xl mb-4">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-[#94A3B8] border-b border-white/10 pb-1.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 text-white/50">anagha@doha-terminal:~$ search-south-india</span>
              </div>

              <div className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-[#0e111a] px-3 py-2 font-mono text-xs text-white">
                <Search className="w-4 h-4 text-[#78E7FF] shrink-0" />
                <div className="flex-1 font-medium tracking-wide">
                  <span>{typedText}</span>
                  <span className="inline-block w-1.5 h-4 bg-[#78E7FF] align-middle ml-0.5 animate-pulse" />
                </div>
                <span className="text-[10px] text-[#78E7FF] bg-[#78E7FF]/10 px-2 py-0.5 rounded border border-[#78E7FF]/30 hidden sm:inline">
                  ENTER
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[#CBD5E1] mb-3">
              One evening in Doha, with no predetermined ties to any college in India, I did what anyone in my generation does: I opened a browser and searched.
            </p>

            {/* University Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* SRMIST Card */}
              <button
                type="button"
                onClick={() => setSelectedUni('srm')}
                className={`text-left rounded-xl border p-3.5 transition-all relative interactive-control cursor-pointer ${
                  selectedUni === 'srm'
                    ? 'border-[#78E7FF] bg-[#78E7FF]/10 shadow-lg shadow-[#78E7FF]/20 ring-1 ring-[#78E7FF]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                    <School className="w-4 h-4 text-[#78E7FF]" />
                    SRMIST KTR
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#78E7FF] text-[#030305]">
                    SELECTED
                  </span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Immense student tech ecosystem, hands-on cybersecurity laboratories, and direct access to Chennai&apos;s tech corridor.
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[10px] font-mono text-[#78E7FF]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kattankulathur Campus · 2025–Present</span>
                </div>
              </button>

              {/* VIT Card */}
              <button
                type="button"
                onClick={() => setSelectedUni('vit')}
                className={`text-left rounded-xl border p-3.5 transition-all relative interactive-control cursor-pointer ${
                  selectedUni === 'vit'
                    ? 'border-[#A78BFA] bg-[#A78BFA]/10 shadow-lg shadow-[#A78BFA]/15'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                    <School className="w-4 h-4 text-[#A78BFA]" />
                    VIT VELLORE
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-[#CBD5E1]">
                    OFFER
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Accepted offer, but SRMIST felt better for my cybersecurity journey.
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[10px] font-mono text-[#94A3B8]">
                  <span>Vellore Campus · Accepted</span>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-xs">
            <span className="text-[#94A3B8]">NEXT // CAREER TURNING POINT</span>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 text-[#FF85A2] hover:text-white transition-colors cursor-pointer"
            >
              <span>CHOOSING COMPUTER SCIENCE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Animated Flight Route Map Card */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-5">
          <div className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-[#0a0d16] to-[#04060a] p-5 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[360px]">
            <div className="flex items-center justify-between font-mono text-xs text-[#78E7FF] mb-3">
              <span className="flex items-center gap-1.5 font-bold">
                <Plane className="w-4 h-4 text-[#78E7FF]" />
                FLIGHT PATH // 3,100 KM
              </span>
              <span className="text-[10px] text-white/40">DOHA &rarr; CHENNAI</span>
            </div>

            {/* Flight Path Schematic SVG */}
            <div className="relative rounded-xl border border-white/10 bg-[#05070c] p-3 flex flex-col justify-between h-56 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 220" fill="none">
                <path
                  d="M 50 60 Q 200 30 310 160"
                  stroke="rgba(120, 231, 255, 0.25)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 50 60 Q 200 30 310 160"
                  stroke="#78E7FF"
                  strokeWidth="2.5"
                  strokeDasharray="360"
                  strokeDashoffset="0"
                />

                {/* Doha Origin */}
                <circle cx="50" cy="60" r="12" fill="rgba(167, 139, 250, 0.2)" />
                <circle cx="50" cy="60" r="5" fill="#A78BFA" />
                <text x="50" y="42" fill="#F1F3F9" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  DOHA
                </text>

                {/* Chennai Destination */}
                <circle cx="310" cy="160" r="16" fill="rgba(120, 231, 255, 0.25)" className="animate-ping" />
                <circle cx="310" cy="160" r="6" fill="#78E7FF" />
                <circle cx="310" cy="160" r="2.5" fill="#030305" />
                <text x="310" y="142" fill="#78E7FF" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  CHENNAI (SRMIST)
                </text>
                <text x="310" y="188" fill="#94A3B8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  12.8231° N, 80.0442° E
                </text>
              </svg>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-[#CBD5E1] mt-2">
              <span className="font-mono text-[#78E7FF] font-bold block mb-1">A NEW CHAPTER</span>
              <span>Packing up life in the Gulf and flying solo to Chennai marked the start of genuine independence.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
