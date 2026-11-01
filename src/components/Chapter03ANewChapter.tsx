/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, School, Compass, CheckCircle2, RotateCcw, X, ExternalLink, Globe, Sparkles } from 'lucide-react';

interface Chapter03ANewChapterProps {
  onContinue?: () => void;
}

export const Chapter03ANewChapter: React.FC<Chapter03ANewChapterProps> = ({ onContinue }) => {
  const fullQuery = 'Best tech universities in South India?';
  const [typedText, setTypedText] = useState('');
  const [stage, setStage] = useState<'typing' | 'suggesting' | 'searching' | 'result'>('typing');
  const [selectedUni, setSelectedUni] = useState<'srm' | 'vit'>('srm');
  const [replayKey, setReplayKey] = useState(0);

  const suggestions = [
    { text: 'Best tech universities in South India?', match: true, tag: 'Top Match' },
    { text: 'Best tech universities in South India for cybersecurity', match: false, tag: 'Curriculum' },
    { text: 'SRMIST Kattankulathur CSE ranking & campus culture', match: false, tag: 'Trending' },
    { text: 'Top engineering colleges in Chennai with CTF teams', match: false, tag: 'Hacker Labs' },
  ];

  // Animated Google Search Typing & Result Reveal Sequence
  useEffect(() => {
    let index = 0;
    setTypedText('');
    setStage('typing');

    const typeInterval = setInterval(() => {
      index++;
      if (index <= fullQuery.length) {
        setTypedText(fullQuery.slice(0, index));
        if (index > 10) {
          setStage('suggesting');
        }
      } else {
        clearInterval(typeInterval);
        // Pause on suggestions, then simulate Google search submission
        const submitTimer = setTimeout(() => {
          setStage('searching');
          const resultTimer = setTimeout(() => {
            setStage('result');
            setSelectedUni('srm');
          }, 650);
          return () => clearTimeout(resultTimer);
        }, 1100);
        return () => clearTimeout(submitTimer);
      }
    }, 42);

    return () => clearInterval(typeInterval);
  }, [replayKey]);

  const handleSelectSuggestion = (text: string) => {
    setTypedText(text);
    setStage('searching');
    setTimeout(() => {
      setStage('result');
      setSelectedUni('srm');
    }, 500);
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div
      id="a-new-chapter"
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col justify-between min-h-[92vh] select-none"
      aria-label="Chapter 03 — A New Chapter"
    >
      {/* Top Floating Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#78E7FF] animate-ping" />
          <span className="font-bold text-white tracking-widest">CHAPTER 03</span>
          <span className="text-white/20">//</span>
          <span className="text-[#78E7FF] font-semibold">A NEW CHAPTER</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#94A3B8]">FLIGHT VECTOR:</span>
          <span className="px-2.5 py-0.5 rounded border border-[#78E7FF]/40 bg-[#78E7FF]/10 text-[#78E7FF] font-semibold shadow-[0_0_12px_rgba(120,231,255,0.2)]">
            DOHA &rarr; CHENNAI (3,100 KM)
          </span>
        </div>
      </div>

      {/* Main Open Editorial & Search Engine Environment */}
      <div className="my-auto grid items-center gap-10 lg:grid-cols-12 py-6">
        {/* Left Column: Narrative & Interactive Search */}
        <div className="lg:col-span-7 space-y-5 p-6 sm:p-8 rounded-3xl readable-plate border border-white/15 shadow-2xl">
          <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#78E7FF]">
            THE ALGORITHM SPEAKS // ADMISSION PIVOT
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FFFFFF] leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            SO, I ASKED GOOGLE.
          </h2>

          <div className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-mono text-xs text-[#78E7FF]">
            ANAGHA MITHRA AINIPPULLY REMITH // SRMIST KATTANKULATHUR
          </div>

          {/* Authentic Animated Google Search Interface */}
          <div className="max-w-xl rounded-2xl border border-white/20 bg-[#0e121a]/95 backdrop-blur-xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-3">
            {/* Terminal Context & Replay Button */}
            <div className="flex items-center justify-between text-xs font-mono text-[#B8B8B8] border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#78E7FF] animate-pulse" />
                <span className="text-[#E2E8F0] font-semibold">doha-terminal:~$ google-query</span>
              </div>
              <button
                type="button"
                onClick={handleReplay}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-[#CBD5E1] hover:text-[#78E7FF] hover:border-[#78E7FF]/50 transition-all cursor-pointer text-[11px] font-mono"
                title="Replay Google search animation"
              >
                <RotateCcw className="w-3 h-3" />
                <span>REPLAY SEARCH</span>
              </button>
            </div>

            {/* Google Search Bar Box */}
            <div className="relative rounded-2xl border border-white/20 bg-[#161b26] p-3 shadow-inner transition-all focus-within:border-[#4285F4]">
              {/* Sweeping Google Multi-color Progress Line when searching */}
              {stage === 'searching' && (
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-2xl">
                  <div className="h-full w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] animate-pulse" />
                </div>
              )}

              <div className="flex items-center gap-3">
                {/* Official Google G Logo SVG */}
                <div className="shrink-0 flex items-center justify-center">
                  <svg className="w-5 h-5 drop-shadow" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                </div>

                {/* Animated Query Text & Blinking Cursor */}
                <div className="flex-1 font-sans text-sm sm:text-base text-white tracking-wide overflow-hidden flex items-center">
                  <span className="font-medium text-[#F5F5F5]">{typedText}</span>
                  {stage !== 'result' && (
                    <span className="inline-block w-0.5 h-5 bg-[#4285F4] ml-1 animate-pulse" />
                  )}
                </div>

                {/* Google Mic & Lens Icons */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Google Voice Mic SVG */}
                  <svg className="w-4 h-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path fill="#34A853" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    <path fill="#FBBC05" d="M19 11h-2c0 2.76-2.24 5-5 5v2c3.87 0 7-3.13 7-7z"/>
                    <path fill="#EA4335" d="M12 16c-2.76 0-5-2.24-5-5H5c0 3.87 3.13 7 7 7v-2z"/>
                  </svg>

                  {/* Google Lens Camera SVG */}
                  <svg className="w-4 h-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="#4285F4" strokeWidth="2" />
                    <path d="M4 8V6a2 2 0 012-2h2" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 4h2a2 2 0 012 2v2" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" />
                    <path d="M20 16v2a2 2 0 01-2 2h-2" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 20H6a2 2 0 01-2-2v-2" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
                  </svg>

                  {/* Search Magnifier Action Icon */}
                  <div className="w-7 h-7 rounded-full bg-[#4285F4]/20 border border-[#4285F4]/40 flex items-center justify-center text-[#78E7FF]">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Google Autocomplete Suggestions Dropdown (appears during typing & suggesting) */}
            {stage === 'suggesting' && (
              <div className="rounded-xl border border-white/15 bg-[#141824] p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1 font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider flex items-center justify-between">
                  <span>GOOGLE SEARCH SUGGESTIONS</span>
                  <span className="text-[#4285F4]">AUTOCOMPLETE</span>
                </div>
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item.text)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-sans transition-all cursor-pointer ${
                      item.match
                        ? 'bg-[#4285F4]/20 text-white font-semibold border border-[#4285F4]/40'
                        : 'text-[#CBD5E1] hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Search className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                      <span className="truncate">{item.text}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#94A3B8] shrink-0 ml-2">
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Google Search Result Preview Card (revealed when search completes) */}
            {stage === 'result' && (
              <div className="rounded-xl border border-[#4285F4]/40 bg-[#141824] p-4 space-y-2.5 animate-in fade-in slide-in-from-top-3 duration-300 shadow-xl">
                {/* Result Telemetry Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] border-b border-white/10 pb-2">
                  <span>About 4,820,000 results (0.28 seconds)</span>
                  <span className="text-[#34A853] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    MATCH CONFIRMED
                  </span>
                </div>

                {/* Google Result Header: Source URL & Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                  <div className="w-4 h-4 rounded-full bg-[#4285F4] flex items-center justify-center text-white text-[9px] font-bold">
                    S
                  </div>
                  <div className="truncate font-sans">
                    <span className="text-white font-semibold">SRM Institute of Science and Technology</span>
                    <span className="text-[#94A3B8] text-[11px] ml-1.5 truncate">https://www.srmist.edu.in &rsaquo; kattankulathur</span>
                  </div>
                </div>

                {/* Google Blue Link Heading */}
                <h4 className="text-base sm:text-lg font-sans font-bold text-[#8AB4F8] hover:underline cursor-pointer leading-snug">
                  SRMIST Kattankulathur — B.Tech Computer Science &amp; Cybersecurity
                </h4>

                {/* Snippet */}
                <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed font-sans font-normal">
                  Premier destination for cybersecurity engineering, digital forensics research, and hands-on developer ecosystems. 250+ acre innovation campus in Chennai tech corridor with active CTF and club culture.
                </p>

                {/* Sitelinks Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Cybersecurity Labs', 'Hacker Communities', 'SRMIST KTR Campus', 'Curriculum Rigor'].map((pill) => (
                    <span
                      key={pill}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-white/15 bg-white/[0.04] text-[#78E7FF]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-normal max-w-xl">
            <p>
              With no family ties to colleges in India, I sat down at my laptop in Doha and searched. Out of hundreds of possibilities, <span className="text-white font-semibold underline decoration-[#78E7FF]/60 underline-offset-4">SRMIST Kattankulathur</span> stood out with its massive engineering ecosystem, cybersecurity labs, and collaborative hacker culture.
            </p>
            <p>
              I packed my life into two suitcases and flew solo into Chennai, stepping onto campus ready to build.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-[#78E7FF] hover:text-white transition-colors cursor-pointer interactive-control"
            >
              <span>DISCOVER THE TECH PLOT TWIST</span>
              <ArrowRight className="w-4 h-4 text-[#78E7FF]" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive University Selection & Flight Corridor */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          <div className="space-y-3">
            {/* SRMIST Selection Button */}
            <button
              type="button"
              onClick={() => setSelectedUni('srm')}
              className={`w-full text-left rounded-2xl border p-5 transition-all interactive-control cursor-pointer readable-card ${
                selectedUni === 'srm'
                  ? 'border-[#78E7FF] bg-[#78E7FF]/20 shadow-[0_0_25px_rgba(120,231,255,0.3)] ring-1 ring-[#78E7FF]'
                  : 'border-white/15 bg-black/60 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <School className="w-4 h-4 text-[#78E7FF]" />
                  SRMIST KATTANKULATHUR
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#78E7FF] text-[#030305]">
                  CHOSEN PATH
                </span>
              </div>
              <p className="text-sm text-[#F5F5F5] leading-relaxed">
                B.Tech in Computer Science &amp; Engineering (Cybersecurity). Vibrant CTF circles, digital forensics labs, and Chennai&apos;s technological corridor.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-[#78E7FF] font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enrolled 2025–Present · CGPA 9.18</span>
              </div>
            </button>

            {/* VIT Selection Button */}
            <button
              type="button"
              onClick={() => setSelectedUni('vit')}
              className={`w-full text-left rounded-2xl border p-5 transition-all interactive-control cursor-pointer readable-card ${
                selectedUni === 'vit'
                  ? 'border-[#C084FC] bg-[#C084FC]/20 shadow-[0_0_25px_rgba(192,132,252,0.3)] ring-1 ring-[#C084FC]'
                  : 'border-white/15 bg-black/60 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <School className="w-4 h-4 text-[#C084FC]" />
                  VIT VELLORE
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/15 text-white/80">
                  ADMITTED
                </span>
              </div>
              <p className="text-sm text-[#B8B8B8] leading-relaxed">
                Accepted offer, but SRMIST felt better for my cybersecurity journey.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Environmental Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#78E7FF]" />
          <span>CAMPUS: KATTANKULATHUR, TAMIL NADU</span>
        </div>

        <div className="flex items-center gap-2 text-[#78E7FF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#78E7FF] animate-pulse" />
          <span className="tracking-widest">CHAPTER 03 / 08</span>
        </div>
      </div>
    </div>
  );
};
