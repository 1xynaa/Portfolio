/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Terminal, Shield, RefreshCw, Activity, Bug, Radio, Wifi, Lock } from 'lucide-react';

interface ChapterCybersecurityProps {
  onContinue?: () => void;
}

export const ChapterCybersecurity: React.FC<ChapterCybersecurityProps> = ({ onContinue }) => {
  // Traffic light simulation state
  const [trafficSignal, setTrafficSignal] = useState<'RED' | 'YELLOW' | 'GREEN'>('GREEN');
  const [trafficDensity, setTrafficDensity] = useState(85);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'traffic' | 'packets'>('traffic');

  const cycleTrafficLight = () => {
    if (trafficSignal === 'GREEN') setTrafficSignal('YELLOW');
    else if (trafficSignal === 'YELLOW') setTrafficSignal('RED');
    else setTrafficSignal('GREEN');
  };

  const handleNext = () => {
    if (onContinue) onContinue();
    else document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="cybersecurity"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center min-h-[90vh]"
      aria-label="Chapter 05: Discovering Cybersecurity"
    >
      {/* Chapter Marker */}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#78E7FF]">
        <span className="w-2.5 h-0.5 bg-[#78E7FF]" />
        <span>CHAPTER 05 // THE UNDERNEATH &amp; CYBERSECURITY</span>
      </div>

      {/* Opening Editorial Headline */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
          WHAT HAPPENS UNDERNEATH?
        </h2>
        <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-[#78E7FF] tracking-wider">
          THE TRAFFIC SIGNAL PARADOX // HARDWARE LOGIC // ETHICAL HACKING &amp; DEFENSE
        </p>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Left Column: Personal Authentic Storyline */}
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#090b10]/90 p-5 sm:p-7 lg:col-span-6 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs mb-4">
              <span className="text-[#78E7FF] font-bold">THE INQUISITIVE REFLEX</span>
              <span className="rounded-full bg-[#78E7FF]/10 border border-[#78E7FF]/30 px-3 py-0.5 text-[#78E7FF] font-bold text-[10px]">
                REVERSE ENGINEERING MINDSET
              </span>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
              <p>
                I&apos;ve always been obsessed with how things operate behind the glass. When I look at everyday technology, I instinctively analyze how someone built it:
              </p>

              <ul className="space-y-2 text-xs text-[#94A3B8] pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF85A2] font-mono font-bold">»</span>
                  <span><strong>See a traffic light?</strong> I immediately wonder whether there&apos;s an IF-ELSE loop or an embedded inductive loop sensor deciding when it switches.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#78E7FF] font-mono font-bold">»</span>
                  <span><strong>Use a web app?</strong> I trace the HTTP headers, token stores, and database locks safeguarding the perimeter.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#A78BFA] font-mono font-bold">»</span>
                  <span><strong>Encounter a new technology?</strong> My immediate question is: <em>&ldquo;How does it fail, and how could someone break into it?&rdquo;</em></span>
                </li>
              </ul>
            </div>
          </div>

          {/* The Cybersecurity Callout Box */}
          <div className="rounded-xl border border-[#A78BFA]/30 bg-gradient-to-r from-[#120f24] to-[#0c0d16] p-4 mt-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#A78BFA] font-bold mb-1.5">
              <Shield className="w-4 h-4 text-[#A78BFA] shrink-0" />
              <span>THE PURPOSE BEHIND THE CURIOSITY</span>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Curiosity without discipline is just chaos. Cybersecurity taught me how to take that instinct to poke, dissect, and stress-test systems, and turn it into real-world defense: protecting data, finding vulnerabilities before malicious actors do, and designing fault-tolerant architectures.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Hardware Light Box + Live Telemetry */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0c0d16] to-[#05060a] p-5 sm:p-6 shadow-2xl lg:col-span-6 flex flex-col justify-between min-h-[380px]">
          {/* Header Switcher */}
          <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-3 mb-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTelemetryTab('traffic')}
                className={`px-2.5 py-1 rounded transition-colors interactive-control cursor-pointer ${
                  activeTelemetryTab === 'traffic'
                    ? 'bg-[#FF85A2]/20 text-[#FFA3B8] font-bold border border-[#FF85A2]/40'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                TRAFFIC LOGIC
              </button>
              <button
                type="button"
                onClick={() => setActiveTelemetryTab('packets')}
                className={`px-2.5 py-1 rounded transition-colors interactive-control cursor-pointer ${
                  activeTelemetryTab === 'packets'
                    ? 'bg-[#78E7FF]/20 text-[#78E7FF] font-bold border border-[#78E7FF]/40'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                PACKET TELEMETRY
              </button>
            </div>
            <span className="text-[10px] text-white/40 font-mono">LIVE SIMULATOR</span>
          </div>

          {activeTelemetryTab === 'traffic' ? (
            /* Traffic Signal Hardware Box + Live Code Simulator */
            <div className="grid grid-cols-12 gap-4 items-center rounded-xl border border-white/10 bg-black/90 p-4">
              {/* Hardware Signal Light Box */}
              <div className="col-span-4 flex flex-col items-center justify-center bg-[#151720] py-3 px-2 rounded-2xl border-2 border-white/20 shadow-inner">
                {/* Red Light */}
                <button
                  type="button"
                  onClick={() => setTrafficSignal('RED')}
                  className={`w-10 h-10 rounded-full mb-2.5 transition-all interactive-control cursor-pointer ${
                    trafficSignal === 'RED'
                      ? 'bg-red-500 shadow-[0_0_20px_#ef4444] scale-105'
                      : 'bg-red-950/40 border border-red-900/40 hover:border-red-600/50'
                  }`}
                  aria-label="Set Red Light"
                />

                {/* Yellow Light */}
                <button
                  type="button"
                  onClick={() => setTrafficSignal('YELLOW')}
                  className={`w-10 h-10 rounded-full mb-2.5 transition-all interactive-control cursor-pointer ${
                    trafficSignal === 'YELLOW'
                      ? 'bg-amber-400 shadow-[0_0_20px_#f59e0b] scale-105'
                      : 'bg-amber-950/40 border border-amber-900/40 hover:border-amber-600/50'
                  }`}
                  aria-label="Set Yellow Light"
                />

                {/* Green Light */}
                <button
                  type="button"
                  onClick={() => setTrafficSignal('GREEN')}
                  className={`w-10 h-10 rounded-full transition-all interactive-control cursor-pointer ${
                    trafficSignal === 'GREEN'
                      ? 'bg-emerald-400 shadow-[0_0_20px_#10b981] scale-105'
                      : 'bg-emerald-950/40 border border-emerald-900/40 hover:border-emerald-600/50'
                  }`}
                  aria-label="Set Green Light"
                />

                <button
                  type="button"
                  onClick={cycleTrafficLight}
                  className="mt-3 flex items-center gap-1 font-mono text-[10px] text-[#78E7FF] hover:underline interactive-control cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>CYCLE</span>
                </button>
              </div>

              {/* Code Editor Window */}
              <div className="col-span-8 font-mono text-xs overflow-x-auto text-left">
                <div className="text-[#94A3B8] text-[10px] mb-1.5">// Anagha staring at an intersection:</div>
                <div className="space-y-1 text-[11px]">
                  <div className={trafficSignal === 'GREEN' ? 'text-emerald-400 font-bold bg-emerald-950/40 px-1 rounded' : 'text-white/40'}>
                    <span className="text-purple-400">if</span> (density &gt; 80) &#123;
                    <div className="pl-3 text-[10px] text-[#CBD5E1]">signal = <span className="text-emerald-400">&apos;GREEN&apos;</span>;</div>
                    &#125;
                  </div>
                  <div className={trafficSignal === 'YELLOW' ? 'text-amber-400 font-bold bg-amber-950/40 px-1 rounded' : 'text-white/40'}>
                    <span className="text-purple-400">else if</span> (timer &lt; 5s) &#123;
                    <div className="pl-3 text-[10px] text-[#CBD5E1]">signal = <span className="text-amber-400">&apos;YELLOW&apos;</span>;</div>
                    &#125;
                  </div>
                  <div className={trafficSignal === 'RED' ? 'text-red-400 font-bold bg-red-950/40 px-1 rounded' : 'text-white/40'}>
                    <span className="text-purple-400">else</span> &#123;
                    <div className="pl-3 text-[10px] text-[#CBD5E1]">signal = <span className="text-red-400">&apos;RED&apos;</span>;</div>
                    &#125;
                  </div>
                </div>

                <div className="mt-3 border-t border-white/10 pt-2 flex items-center justify-between text-[10px]">
                  <span className="text-white/50">STATE:</span>
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
          ) : (
            /* Packet & Threat Telemetry Feed */
            <div className="rounded-xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-left space-y-2">
              <div className="text-[10px] text-cyan-400 border-b border-white/10 pb-1 flex items-center justify-between">
                <span>[TSHARK CAPTURE STREAM // ETH0]</span>
                <span className="text-emerald-400 animate-pulse">LIVE AUDIT</span>
              </div>
              <div className="space-y-1 text-[10px] text-slate-300">
                <p><span className="text-purple-400">192.168.1.105</span>:49152 &rarr; <span className="text-cyan-400">10.0.0.1</span>:443 [SYN, ACK] Seq=0 Win=64240</p>
                <p><span className="text-amber-400">ALERT:</span> TLS 1.3 handshake initiated - Cipher: TLS_AES_256_GCM_SHA384</p>
                <p><span className="text-slate-500">PAYLOAD:</span> Application Data [384 bytes, Entropy: 7.98 - High Randomness]</p>
                <p className="text-emerald-400 font-semibold">[VERIFIED SAFE] Fail-closed authentication enforced.</p>
              </div>
            </div>
          )}

          <p className="mt-3 text-[11px] text-[#94A3B8] leading-tight">
            Once you see software logic underlying the physical world, every device becomes a puzzle waiting to be decoded.
          </p>
        </div>
      </div>
    </div>
  );
};
