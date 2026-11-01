/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Terminal, Shield, Code, Check, X, Sparkles, Play, RefreshCw, ArrowRight, Zap, Bug } from 'lucide-react';

export const StoryChapter04: React.FC = () => {
  // Subject selection interactive state
  const [selectedSubject, setSelectedSubject] = useState<'math-cs' | 'bio' | 'arts' | 'commerce'>('math-cs');

  // Traffic light simulation state
  const [trafficSignal, setTrafficSignal] = useState<'RED' | 'YELLOW' | 'GREEN'>('GREEN');
  const [pedestrianWaiting, setPedestrianWaiting] = useState(false);
  const [trafficDensity, setTrafficDensity] = useState(85);

  const cycleTrafficLight = () => {
    if (trafficSignal === 'GREEN') setTrafficSignal('YELLOW');
    else if (trafficSignal === 'YELLOW') setTrafficSignal('RED');
    else setTrafficSignal('GREEN');
  };

  return (
    <section
      id="chapter-04"
      className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 border-t border-white/10"
      aria-label="Chapter 04: The Career Crisis"
    >
      {/* Chapter Marker */}
      <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#FF85A2]">
        <span className="w-2 h-0.5 bg-[#FF85A2]" />
        <span>CHAPTER 04 // THE CAREER CRISIS &amp; DISCOVERY</span>
      </div>

      {/* Opening Editorial Headline */}
      <div className="mb-14">
        <h2 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight">
          HOW DID I END UP IN TECH?
        </h2>
        <p className="mt-3 max-w-2xl font-mono text-xs sm:text-sm text-[#FFA3B8] tracking-wider">
          GRADE 8 BIOLOGY REJECTION // THE IF-ELSE REVELATION // ETHICAL HACKING
        </p>
      </div>

      <div className="grid items-stretch gap-10 lg:grid-cols-12">
        {/* Left Column: Personal Authentic Storyline */}
        <div className="space-y-6 rounded-2xl border border-white/10 bg-[#090b10]/90 p-6 sm:p-8 lg:col-span-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
            <span className="text-[#FFA3B8] font-bold">THE MOMENT OF RECKONING</span>
            <span className="rounded-full bg-[#FF85A2]/10 border border-[#FF85A2]/30 px-3 py-0.5 text-[#FFA3B8] font-bold">
              UNPLANNED &amp; CHAOTIC
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
            <p>
              My journey into technology wasn&apos;t some perfectly scripted childhood dream where I wrote compiler code at age six.
            </p>
            <p>
              In <span className="text-white font-semibold">Grade 8</span>, I started completely hating Biology. The diagrams, memorizing plant kingdoms, dissecting specimens—it was an immediate and resounding <em>no</em>.
            </p>
            <p>
              So naturally, I had to reconsider my life options:
            </p>

            {/* Interactive Subject Selection Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Biology */}
              <button
                type="button"
                onClick={() => setSelectedSubject('bio')}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedSubject === 'bio'
                    ? 'border-red-500/60 bg-red-500/10'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold line-through text-red-400">BIOLOGY?</span>
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-xs text-[#94A3B8]">Absolutely not. Not happening in this lifetime.</span>
              </button>

              {/* Arts */}
              <button
                type="button"
                onClick={() => setSelectedSubject('arts')}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedSubject === 'arts'
                    ? 'border-amber-500/60 bg-amber-500/10'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold line-through text-amber-400">ARTS &amp; HUMANITIES?</span>
                  <X className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-xs text-[#94A3B8]">History treaties and dates were definitely not my jam.</span>
              </button>

              {/* Commerce */}
              <button
                type="button"
                onClick={() => setSelectedSubject('commerce')}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedSubject === 'commerce'
                    ? 'border-slate-500/60 bg-slate-500/10'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold line-through text-slate-400">COMMERCE?</span>
                  <X className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-xs text-[#94A3B8]">Felt a little boring for my curious brain.</span>
              </button>

              {/* Math + CS: BOOM */}
              <button
                type="button"
                onClick={() => setSelectedSubject('math-cs')}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedSubject === 'math-cs'
                    ? 'border-[#FF85A2] bg-[#FF85A2]/15 shadow-lg shadow-[#FF85A2]/20 ring-1 ring-[#FF85A2]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF85A2]" />
                    MATH + COMPUTER SCIENCE
                  </span>
                  <span className="font-mono text-[10px] font-black bg-[#FF85A2] text-black px-1.5 py-0.5 rounded">
                    BOOM!
                  </span>
                </div>
                <span className="text-xs text-[#FFA3B8] font-medium">The moment everything clicked. That was the beginning.</span>
              </button>
            </div>

            <div className="pt-4 space-y-3">
              <h3 className="font-mono text-xs tracking-wider text-white uppercase font-bold">
                THE OBSESSION WITH UNDERNEATH
              </h3>
              <p>
                I&apos;ve always been fascinated by how technology works. Even when I look at something completely ordinary, I catch myself wondering how someone engineered it:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#94A3B8]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF85A2] font-mono font-bold">»</span>
                  <span><strong>See a traffic signal?</strong> I start wondering whether there&apos;s an IF-ELSE statement controlling the sensor cycles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#78E7FF] font-mono font-bold">»</span>
                  <span><strong>Use an application?</strong> I wonder what route handlers, database locks, and security boundaries are holding it together.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#A78BFA] font-mono font-bold">»</span>
                  <span><strong>Discover new tech?</strong> My instantaneous reflex is: <em>&ldquo;Wait, how on earth did they build that?&rdquo;</em></span>
                </li>
              </ul>
              <p className="border-l-2 border-[#A78BFA]/50 pl-4 py-1 text-sm text-[#CBD5E1] italic">
                I&apos;ve never been satisfied with simply using technology. I want to understand what happens underneath it.
              </p>
            </div>

            {/* The Cybersecurity Bridge */}
            <div className="rounded-xl border border-[#A78BFA]/30 bg-[#0c0d16] p-4 mt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#A78BFA] font-bold mb-1">
                <Shield className="w-4 h-4 text-[#A78BFA]" />
                <span>AND THEN CAME CYBERSECURITY</span>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                I was always fascinated by hacking, breaking things, and finding edge cases. Cybersecurity showed me that I could do all of that with ethics and purpose: defending real infrastructure, investigating breaches, and making systems resilient.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Interactive IF-ELSE Traffic Signal Widget */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Traffic Light Interactive Widget */}
          <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0c0d16] to-[#05060a] p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-[#FFA3B8] mb-4">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal className="w-4 h-4 text-[#FF85A2]" />
                THE TRAFFIC SIGNAL PARADOX
              </span>
              <span className="text-[10px] text-white/40">INTERACTIVE IF-ELSE</span>
            </div>

            {/* Traffic Signal Hardware Box + Live Code Simulator */}
            <div className="grid grid-cols-12 gap-4 items-center rounded-xl border border-white/10 bg-black/90 p-5">
              {/* Hardware Signal Light Box */}
              <div className="col-span-4 flex flex-col items-center justify-center bg-[#151720] py-4 px-3 rounded-2xl border-2 border-white/20 shadow-inner">
                {/* Red Light */}
                <button
                  type="button"
                  onClick={() => setTrafficSignal('RED')}
                  className={`w-11 h-11 rounded-full mb-3 transition-all cursor-pointer ${
                    trafficSignal === 'RED'
                      ? 'bg-red-500 shadow-[0_0_25px_#ef4444] scale-105'
                      : 'bg-red-950/40 border border-red-900/40'
                  }`}
                  aria-label="Set Red Light"
                />

                {/* Yellow Light */}
                <button
                  type="button"
                  onClick={() => setTrafficSignal('YELLOW')}
                  className={`w-11 h-11 rounded-full mb-3 transition-all cursor-pointer ${
                    trafficSignal === 'YELLOW'
                      ? 'bg-amber-400 shadow-[0_0_25px_#f59e0b] scale-105'
                      : 'bg-amber-950/40 border border-amber-900/40'
                  }`}
                  aria-label="Set Yellow Light"
                />

                {/* Green Light */}
                <button
                  type="button"
                  onClick={() => setTrafficSignal('GREEN')}
                  className={`w-11 h-11 rounded-full transition-all cursor-pointer ${
                    trafficSignal === 'GREEN'
                      ? 'bg-emerald-400 shadow-[0_0_25px_#10b981] scale-105'
                      : 'bg-emerald-950/40 border border-emerald-900/40'
                  }`}
                  aria-label="Set Green Light"
                />

                <button
                  type="button"
                  onClick={cycleTrafficLight}
                  className="mt-4 flex items-center gap-1 font-mono text-[10px] text-[#78E7FF] hover:underline"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>CYCLE</span>
                </button>
              </div>

              {/* Code Editor Window */}
              <div className="col-span-8 font-mono text-xs overflow-x-auto text-left">
                <div className="text-[#94A3B8] text-[10px] mb-2">// Anagha wondering at a red light:</div>
                <div className="space-y-1">
                  <div className={trafficSignal === 'GREEN' ? 'text-emerald-400 font-bold bg-emerald-950/40 px-1 rounded' : 'text-white/40'}>
                    <span className="text-purple-400">if</span> (density &gt; 80) &#123;
                    <div className="pl-3 text-[11px] text-[#CBD5E1]">signal = <span className="text-emerald-400">&apos;GREEN&apos;</span>;</div>
                    &#125;
                  </div>
                  <div className={trafficSignal === 'YELLOW' ? 'text-amber-400 font-bold bg-amber-950/40 px-1 rounded' : 'text-white/40'}>
                    <span className="text-purple-400">else if</span> (timer &lt; 5s) &#123;
                    <div className="pl-3 text-[11px] text-[#CBD5E1]">signal = <span className="text-amber-400">&apos;YELLOW&apos;</span>;</div>
                    &#125;
                  </div>
                  <div className={trafficSignal === 'RED' ? 'text-red-400 font-bold bg-red-950/40 px-1 rounded' : 'text-white/40'}>
                    <span className="text-purple-400">else</span> &#123;
                    <div className="pl-3 text-[11px] text-[#CBD5E1]">signal = <span className="text-red-400">&apos;RED&apos;</span>;</div>
                    &#125;
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-2 flex items-center justify-between text-[10px]">
                  <span className="text-white/60">ACTIVE STATE:</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    trafficSignal === 'RED' ? 'text-red-400 bg-red-950/40' :
                    trafficSignal === 'YELLOW' ? 'text-amber-400 bg-amber-950/40' :
                    'text-emerald-400 bg-emerald-950/40'
                  }`}>
                    {trafficSignal}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#94A3B8] leading-relaxed">
              Once you start seeing software logic in physical objects, you can never look at the world the same way again.
            </p>
          </div>

          {/* Transition Banner to Chapter 05: Projects */}
          <div className="rounded-xl border border-[#FF85A2]/30 bg-gradient-to-r from-[#120810] to-[#1c0c18] p-5 shadow-xl flex items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#FFA3B8] tracking-widest block uppercase">
                THE LOGICAL CONCLUSION
              </span>
              <span className="font-mono text-sm text-white font-bold">
                ENOUGH TALK. LET&apos;S BUILD.
              </span>
            </div>
            <a
              href="#projects"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded bg-[#FF85A2] text-[#030305] font-mono text-xs font-bold shadow-[0_0_15px_rgba(255,133,162,0.4)] hover:bg-[#FFA3B8] transition-all shrink-0"
              aria-label="Explore Projects in Chapter 05"
            >
              <span>SEE PROJECTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
