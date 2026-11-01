/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useMemo, useState } from 'react';
import { Search, Sparkles, Network, Grid, CheckCircle2 } from 'lucide-react';
import { SKILL_GROUPS } from '../utils/portfolioData.ts';

interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  code: string;
  x: number;
  y: number;
  color: string;
  role: string;
}

interface ConstellationLink {
  source: string;
  target: string;
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  // Programming (Blush Pink #FF85A2)
  { id: 'python', name: 'Python', category: 'Programming', code: '01', x: 230, y: 85, color: '#FF85A2', role: 'Security scripting, log processing, data analysis algorithms.' },
  { id: 'c', name: 'C', category: 'Programming', code: '01', x: 140, y: 120, color: '#FF85A2', role: 'Low-level systems programming, memory architecture foundations.' },
  { id: 'cpp', name: 'C++', category: 'Programming', code: '01', x: 195, y: 155, color: '#FF85A2', role: 'Object-oriented systems, high-performance algorithms.' },
  { id: 'java', name: 'Java', category: 'Programming', code: '01', x: 120, y: 185, color: '#FF85A2', role: 'Enterprise OOP principles, cross-platform CS foundations.' },
  { id: 'ts-js', name: 'JavaScript / TypeScript', category: 'Programming', code: '01', x: 300, y: 140, color: '#FF85A2', role: 'Full-stack development, type-safe API route architecture.' },
  { id: 'sql', name: 'SQL', category: 'Programming', code: '01', x: 280, y: 215, color: '#FF85A2', role: 'Relational data query design, indexing, and transactional integrity.' },

  // Web & Backend (Pastel Rose #F472B6)
  { id: 'react', name: 'React', category: 'Web & Backend', code: '02', x: 530, y: 95, color: '#F472B6', role: 'Component-driven reactive interfaces, state architecture.' },
  { id: 'nextjs', name: 'Next.js', category: 'Web & Backend', code: '02', x: 610, y: 70, color: '#F472B6', role: 'App router, 30+ API routes, server actions, fail-closed security.' },
  { id: 'nodejs', name: 'Node.js', category: 'Web & Backend', code: '02', x: 470, y: 150, color: '#F472B6', role: 'Asynchronous backend services, runtime tooling, and micro-APIs.' },
  { id: 'rest-apis', name: 'REST APIs', category: 'Web & Backend', code: '02', x: 550, y: 165, color: '#F472B6', role: 'Standardized HTTP endpoints, authorization headers, validation.' },
  { id: 'html', name: 'HTML', category: 'Web & Backend', code: '02', x: 685, y: 110, color: '#F472B6', role: 'Semantic structure, accessible markup, document hierarchy.' },
  { id: 'css', name: 'CSS', category: 'Web & Backend', code: '02', x: 730, y: 160, color: '#F472B6', role: 'Custom styling systems, dark-mode tokens, fluid layouts.' },
  { id: 'supabase', name: 'Supabase', category: 'Web & Backend', code: '02', x: 620, y: 210, color: '#F472B6', role: 'BaaS authentication, real-time channels, managed PostgreSQL.' },
  { id: 'postgres', name: 'PostgreSQL', category: 'Web & Backend', code: '02', x: 520, y: 235, color: '#F472B6', role: 'Relational database engine, role access policies, indexing.' },
  { id: 'mysql', name: 'MySQL', category: 'Web & Backend', code: '02', x: 710, y: 230, color: '#F472B6', role: 'Relational schema modeling and structured storage workflows.' },

  // Cybersecurity (Soft Lavender #C084FC)
  { id: 'linux', name: 'Linux fundamentals', category: 'Cybersecurity', code: '03', x: 230, y: 285, color: '#C084FC', role: 'Shell scripting, process management, permissions, Kali Linux.' },
  { id: 'nmap', name: 'Nmap', category: 'Cybersecurity', code: '03', x: 130, y: 295, color: '#C084FC', role: 'Network port discovery, service enumeration, reconnaissance mapping.' },
  { id: 'tshark', name: 'tshark', category: 'Cybersecurity', code: '03', x: 140, y: 360, color: '#C084FC', role: 'Command-line packet capture dissection, protocol anomaly isolation.' },
  { id: 'network-analysis', name: 'Network analysis', category: 'Cybersecurity', code: '03', x: 250, y: 350, color: '#C084FC', role: 'Traffic flow auditing, TCP stream reassembly, anomalous egress.' },
  { id: 'log-investigation', name: 'Log investigation', category: 'Cybersecurity', code: '03', x: 200, y: 420, color: '#C084FC', role: 'Auth event correlation, timestamp reconstruction, forensics.' },
  { id: 'ioc-investigation', name: 'IOC investigation', category: 'Cybersecurity', code: '03', x: 310, y: 410, color: '#C084FC', role: 'Indicators of compromise extraction, IP/hash beacon verification.' },
  { id: 'mitre', name: 'MITRE ATT&CK concepts', category: 'Cybersecurity', code: '03', x: 340, y: 340, color: '#C084FC', role: 'Mapping adversary tactics, techniques, and kill-chain phases.' },

  // Tools & CS Foundations (Silvery Rose #E2E8F0)
  { id: 'git', name: 'Git', category: 'Tools & CS Foundations', code: '04', x: 470, y: 310, color: '#E2E8F0', role: 'Distributed version control, branch isolation, commit verification.' },
  { id: 'github', name: 'GitHub', category: 'Tools & CS Foundations', code: '04', x: 550, y: 320, color: '#E2E8F0', role: 'Collaborative code hosting, issue tracking, CI workflows.' },
  { id: 'vscode', name: 'VS Code', category: 'Tools & CS Foundations', code: '04', x: 640, y: 310, color: '#E2E8F0', role: 'Primary development environment with tailored terminal tooling.' },
  { id: 'intellij', name: 'IntelliJ IDEA', category: 'Tools & CS Foundations', code: '04', x: 720, y: 330, color: '#E2E8F0', role: 'Enterprise Java development and robust debugger workflows.' },
  { id: 'oop', name: 'Object-oriented programming', category: 'Tools & CS Foundations', code: '04', x: 500, y: 395, color: '#E2E8F0', role: 'Encapsulation, inheritance, polymorphism, clean architectural boundaries.' },
  { id: 'dsa', name: 'Data structures and algorithms', category: 'Tools & CS Foundations', code: '04', x: 630, y: 400, color: '#E2E8F0', role: 'Graph traversal, search, computational complexity, memory efficiency.' },
];

const CONSTELLATION_LINKS: ConstellationLink[] = [
  { source: 'ts-js', target: 'react' },
  { source: 'ts-js', target: 'nextjs' },
  { source: 'ts-js', target: 'nodejs' },
  { source: 'sql', target: 'postgres' },
  { source: 'sql', target: 'mysql' },
  { source: 'sql', target: 'supabase' },
  { source: 'react', target: 'nextjs' },
  { source: 'react', target: 'html' },
  { source: 'html', target: 'css' },
  { source: 'nodejs', target: 'rest-apis' },
  { source: 'nextjs', target: 'rest-apis' },
  { source: 'nextjs', target: 'supabase' },
  { source: 'supabase', target: 'postgres' },
  { source: 'c', target: 'cpp' },
  { source: 'cpp', target: 'oop' },
  { source: 'java', target: 'oop' },
  { source: 'python', target: 'dsa' },
  { source: 'python', target: 'log-investigation' },
  { source: 'linux', target: 'nmap' },
  { source: 'linux', target: 'tshark' },
  { source: 'linux', target: 'network-analysis' },
  { source: 'nmap', target: 'network-analysis' },
  { source: 'tshark', target: 'network-analysis' },
  { source: 'network-analysis', target: 'log-investigation' },
  { source: 'log-investigation', target: 'ioc-investigation' },
  { source: 'network-analysis', target: 'mitre' },
  { source: 'ioc-investigation', target: 'mitre' },
  { source: 'git', target: 'github' },
  { source: 'git', target: 'vscode' },
  { source: 'intellij', target: 'java' },
  { source: 'oop', target: 'dsa' },
  { source: 'c', target: 'linux' },
];

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNodeId, setActiveNodeId] = useState<string>('nextjs');
  const [viewMode, setViewMode] = useState<'constellation' | 'grid'>('constellation');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const activeNode = useMemo(
    () => CONSTELLATION_NODES.find((node) => node.id === activeNodeId) ?? CONSTELLATION_NODES[0],
    [activeNodeId]
  );

  const filteredNodes = useMemo(() => {
    return CONSTELLATION_NODES.filter((node) => {
      const matchesCategory = selectedCategory === 'ALL' || node.category === selectedCategory;
      const matchesQuery =
        normalizedQuery === '' ||
        node.name.toLowerCase().includes(normalizedQuery) ||
        node.role.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [normalizedQuery, selectedCategory]);

  const activeNodeSet = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const connectedNodeIds = useMemo(() => {
    const ids = new Set<string>([activeNode.id]);
    CONSTELLATION_LINKS.forEach((link) => {
      if (link.source === activeNode.id) ids.add(link.target);
      if (link.target === activeNode.id) ids.add(link.source);
    });
    return ids;
  }, [activeNode]);

  return (
    <div id="skills" className="relative z-10 mx-auto max-w-7xl">
      {/* Interactive Controls Bar: View Mode Toggle & Search Box */}
      <div className="mb-6 readable-plate p-4 sm:p-5 rounded-2xl border border-white/15 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl font-mono text-xs sm:text-sm text-[#F5F5F5] leading-relaxed">
          Interactive constellation mapping programming languages, full-stack architectures, cybersecurity tooling, and systems foundations.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex rounded-full border border-white/20 bg-black/60 font-mono text-xs overflow-hidden p-1">
            <button
              type="button"
              onClick={() => setViewMode('constellation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer interactive-control ${
                viewMode === 'constellation'
                  ? 'bg-[#FF85A2] text-[#030305] font-bold shadow-md'
                  : 'text-[#B8B8B8] hover:text-white'
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>CONSTELLATION</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer interactive-control ${
                viewMode === 'grid'
                  ? 'bg-[#FF85A2] text-[#030305] font-bold shadow-md'
                  : 'text-[#B8B8B8] hover:text-white'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>GRID</span>
            </button>
          </div>

          {/* Search Box */}
          <label className="relative w-full font-mono text-xs sm:w-64">
            <span className="sr-only">Search skills</span>
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#FFA3B8]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search skills, tooling..."
              className="w-full rounded-xl border border-white/20 bg-black/60 py-2 pl-9 pr-3 text-[#F5F5F5] placeholder:text-[#94A3B8] focus-visible:border-[#FF85A2] text-xs font-mono"
            />
          </label>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="mb-6 flex flex-wrap gap-2 font-mono text-xs" aria-label="Filter skills by domain">
        <button
          type="button"
          onClick={() => setSelectedCategory('ALL')}
          aria-pressed={selectedCategory === 'ALL'}
          className={`min-h-9 rounded-full border px-4 py-1.5 transition-all cursor-pointer ${
            selectedCategory === 'ALL'
              ? 'border-[#FF85A2] bg-[#FF85A2] text-[#030305] font-bold shadow-md'
              : 'border-white/15 bg-white/[0.04] text-[#CBD5E1] hover:border-white/30 hover:text-white'
          }`}
        >
          ALL DOMAINS ({CONSTELLATION_NODES.length})
        </button>
        {SKILL_GROUPS.map((group) => (
          <button
            key={group.category}
            type="button"
            onClick={() => setSelectedCategory(group.category)}
            aria-pressed={selectedCategory === group.category}
            className={`min-h-9 rounded-full border px-4 py-1.5 transition-all cursor-pointer ${
              selectedCategory === group.category
                ? 'border-[#FF85A2] bg-[#FF85A2] text-[#030305] font-bold shadow-md'
                : 'border-white/15 bg-white/[0.04] text-[#CBD5E1] hover:border-white/30 hover:text-white'
            }`}
          >
            {group.category}
          </button>
        ))}
      </div>

      {viewMode === 'constellation' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* Interactive Constellation SVG Canvas */}
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#06080d] p-3 sm:p-5 lg:col-span-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[10px] text-[#94A3B8]">
              <div className="flex items-center gap-2 text-[#FFA3B8]">
                <Sparkles className="h-3 w-3 text-[#FF85A2]" />
                <span>HOVER OR CLICK ANY SKILL NODE TO REVEAL CONNECTIONS</span>
              </div>
              <span className="hidden sm:inline">NODES: {filteredNodes.length} ACTIVE</span>
            </div>

            <svg
              viewBox="0 0 860 480"
              className="w-full h-72 sm:h-96 md:h-[460px]"
              role="img"
              aria-label="Interactive skills constellation diagram"
            >
              <defs>
                <pattern id="constellation-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.75" fill="#FF85A2" fillOpacity="0.12" />
                </pattern>
                <filter id="rose-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <rect width="860" height="480" fill="url(#constellation-grid)" />

              {/* Subtle Domain Quadrant Labels */}
              <g opacity="0.38" fontFamily="ui-monospace, monospace" fontSize="10" fill="#94A3B8">
                <text x="70" y="45">AREA 01 // PROGRAMMING</text>
                <text x="630" y="45">AREA 02 // WEB & BACKEND</text>
                <text x="70" y="465">AREA 03 // CYBERSECURITY</text>
                <text x="610" y="465">AREA 04 // CS & TOOLS</text>
              </g>

              {/* Constellation Connection Filaments */}
              {CONSTELLATION_LINKS.map((link) => {
                const source = CONSTELLATION_NODES.find((n) => n.id === link.source);
                const target = CONSTELLATION_NODES.find((n) => n.id === link.target);
                if (!source || !target) return null;

                const isConnectedToActive =
                  (link.source === activeNode.id || link.target === activeNode.id) &&
                  activeNodeSet.has(link.source) &&
                  activeNodeSet.has(link.target);

                const isBothActive = activeNodeSet.has(link.source) && activeNodeSet.has(link.target);

                return (
                  <line
                    key={`${link.source}-${link.target}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isConnectedToActive ? '#FF85A2' : isBothActive ? '#C084FC' : '#2A2E3B'}
                    strokeWidth={isConnectedToActive ? 2.2 : 1}
                    strokeOpacity={isConnectedToActive ? 0.95 : isBothActive ? 0.35 : 0.08}
                    strokeDasharray={isConnectedToActive ? undefined : '3 4'}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Constellation Nodes */}
              {CONSTELLATION_NODES.map((node) => {
                const isSelected = activeNode.id === node.id;
                const isConnected = connectedNodeIds.has(node.id);
                const isVisible = activeNodeSet.has(node.id);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setActiveNodeId(node.id)}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    className="cursor-pointer transition-all duration-200"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select skill ${node.name}`}
                  >
                    {/* Pulsing halo around active or connected node */}
                    {(isSelected || isConnected) && (
                      <circle
                        r={isSelected ? 18 : 12}
                        fill="none"
                        stroke={isSelected ? '#FF85A2' : node.color}
                        strokeOpacity={isSelected ? 0.85 : 0.35}
                        strokeWidth={1.5}
                        className={isSelected ? 'animate-pulse' : undefined}
                      />
                    )}

                    {/* Main Node Point */}
                    <circle
                      r={isSelected ? 7 : isConnected ? 5.5 : 4}
                      fill={isVisible ? (isSelected ? '#FFA3B8' : node.color) : '#2A2E39'}
                      fillOpacity={isVisible ? 1 : 0.25}
                      filter={isSelected ? 'url(#rose-glow)' : undefined}
                    />

                    {/* Skill Monospace Label */}
                    <text
                      y={isSelected ? -14 : 16}
                      textAnchor="middle"
                      fill={isSelected ? '#FFA3B8' : isVisible ? '#F1F3F9' : '#475569'}
                      fontFamily="ui-monospace, monospace"
                      fontSize={isSelected ? '11' : '9.5'}
                      fontWeight={isSelected ? '700' : '500'}
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Skill Inspector Card */}
          <div className="rounded-2xl border border-white/20 readable-card p-6 lg:col-span-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 font-mono text-xs">
              <span className="text-[#FFA3B8] font-bold">NODE INSPECTOR</span>
              <span className="text-[#B8B8B8]">AREA {activeNode.code}</span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-mono text-[#B8B8B8]">{activeNode.category}</span>
              <h3 className="mt-1 font-mono text-2xl font-bold uppercase text-white">
                {activeNode.name}
              </h3>
            </div>

            <div className="mt-4 border-l-2 border-[#FF85A2] pl-3 py-1">
              <h4 className="font-mono text-xs tracking-wider text-[#FFA3B8] uppercase font-bold">
                ENGINEERING APPLICATION
              </h4>
              <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#F5F5F5] font-normal">
                {activeNode.role}
              </p>
            </div>

            <div className="mt-6 border-t border-white/15 pt-4 font-mono text-xs">
              <div className="text-xs text-[#B8B8B8] uppercase tracking-wider mb-2 font-bold">
                CONNECTED ARCHITECTURE PATHWAYS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(connectedNodeIds)
                  .filter((id) => id !== activeNode.id)
                  .map((id) => {
                    const node = CONSTELLATION_NODES.find((n) => n.id === id);
                    if (!node) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveNodeId(id)}
                        className="rounded border border-white/20 bg-white/[0.06] px-2.5 py-1 text-xs text-[#F5F5F5] hover:border-[#FF85A2] hover:text-[#FFA3B8] transition-colors cursor-pointer"
                      >
                        {node.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-white/15 bg-black/60 p-3.5 font-mono text-xs text-[#CBD5E1] leading-relaxed">
              <span className="text-[#FFA3B8] font-bold">AUTHENTIC PROFICIENCY:</span> Verified directly through SRMIST coursework, practical cybersecurity tooling, and full-stack project implementations.
            </div>
          </div>
        </div>
      ) : (
        /* Alternative Categorical Grid View */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2" aria-live="polite">
          {SKILL_GROUPS.map((group) => {
            if (selectedCategory !== 'ALL' && selectedCategory !== group.category) return null;
            const matchingSkills = group.skills.filter((s) =>
              s.toLowerCase().includes(normalizedQuery)
            );
            if (matchingSkills.length === 0) return null;

            return (
              <article key={group.category} className="rounded-2xl border border-white/15 readable-card p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between border-b border-white/15 pb-3">
                  <h3 className="font-mono text-lg font-bold text-white">
                    {group.category}
                  </h3>
                  <span className="font-mono text-xs text-[#FFA3B8] font-bold">AREA {group.code}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {matchingSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded border border-white/20 bg-white/[0.05] px-3.5 py-1.5 font-mono text-sm text-[#F5F5F5] transition-colors hover:border-[#FF85A2] hover:text-[#FFA3B8]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
