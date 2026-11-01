/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Calendar,
  Trophy,
  Star,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';

type TimelineCategory = 'ALL' | 'EDUCATION' | 'AWARDS' | 'LEADERSHIP';

interface UnifiedMilestone {
  id: string;
  category: 'education' | 'award' | 'hackathon' | 'leadership' | 'learning';
  title: string;
  organization: string;
  period?: string;
  location?: string;
  grade?: string;
  featured?: boolean;
}

export const EducationTimeline: React.FC = () => {
  const [filter, setFilter] = useState<TimelineCategory>('ALL');

  const allMilestones: UnifiedMilestone[] = useMemo(() => {
    return [
      {
        id: 'hacknova-3',
        category: 'hackathon',
        title: 'Participant — HackNova 3.0',
        organization: 'SRMIST',
        period: 'March 2026',
        location: 'Kattankulathur, Tamil Nadu',
      },
      {
        id: 'first-prize-ci25',
        category: 'award',
        title: "First Prize — Creative Ingenuity '25",
        organization: 'Department of Mechanical Engineering, SRMIST',
        period: 'November 2025',
        location: 'Kattankulathur, Tamil Nadu',
        featured: true,
      },
      {
        id: 'srmist-degree',
        category: 'education',
        title: 'B.Tech, Computer Science and Engineering (Cybersecurity)',
        organization: 'SRM Institute of Science and Technology (SRMIST)',
        period: '2025–present',
        location: 'Kattankulathur, Tamil Nadu',
        grade: 'First-year CGPA: 9.18/10',
        featured: true,
      },
      {
        id: 'irc-srmist',
        category: 'leadership',
        title: 'Deputy Head, Event Management',
        organization: 'International Relations Club, SRMIST',
        period: 'Active Student Leadership',
        location: 'SRMIST',
      },
      {
        id: 'astrophilia-club',
        category: 'leadership',
        title: 'Follow-up Member',
        organization: 'Astrophilia Club, SRMIST',
        period: 'Active Member',
        location: 'SRMIST',
      },
      {
        id: 'tryhackme-linux',
        category: 'learning',
        title: 'Linux Fundamentals Training',
        organization: 'TryHackMe',
        period: 'Completed',
        location: 'Cybersecurity Practical Track',
      },
      {
        id: 'mindcraft-cmuq',
        category: 'hackathon',
        title: 'MindCraft Algorithmic Competition',
        organization: 'Carnegie Mellon University Qatar',
        period: 'May 2023',
        location: 'Doha, Qatar',
      },
      {
        id: 'mes-school',
        category: 'education',
        title: 'Higher Secondary Education',
        organization: 'MES Indian School',
        period: 'Completed',
        location: 'Doha, Qatar',
      },
    ];
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'ALL') return allMilestones;
    if (filter === 'EDUCATION') return allMilestones.filter((m) => m.category === 'education');
    if (filter === 'AWARDS') return allMilestones.filter((m) => m.category === 'award' || m.category === 'hackathon');
    if (filter === 'LEADERSHIP') return allMilestones.filter((m) => m.category === 'leadership' || m.category === 'learning');
    return allMilestones;
  }, [allMilestones, filter]);

  const getCategoryIcon = (category: UnifiedMilestone['category'], featured?: boolean) => {
    if (featured && category === 'award') return <Star className="h-4 w-4 text-[#FFA3B8] fill-[#FFA3B8]" />;
    switch (category) {
      case 'education':
        return <GraduationCap className="h-4 w-4 text-[#FFA3B8]" />;
      case 'award':
        return <Trophy className="h-4 w-4 text-[#FFA3B8]" />;
      case 'hackathon':
        return <Award className="h-4 w-4 text-[#F472B6]" />;
      case 'leadership':
        return <Users className="h-4 w-4 text-[#E879F9]" />;
      case 'learning':
        return <ShieldCheck className="h-4 w-4 text-[#CBD5E1]" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-[#FFA3B8]" />;
    }
  };

  return (
    <div id="timeline" className="relative max-w-7xl mx-auto z-10">
      {/* Category Filter Tabs & Subtitle */}
      <div className="mb-8 readable-plate p-4 sm:p-5 rounded-2xl border border-white/15 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl font-mono text-xs sm:text-sm text-[#F5F5F5] leading-relaxed">
          Academic progression in Computer Science & Cybersecurity alongside engineering honors and student leadership.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {(['ALL', 'EDUCATION', 'AWARDS', 'LEADERSHIP'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer interactive-control font-bold ${
                filter === tab
                  ? 'border-[#FF85A2] bg-[#FF85A2] text-[#030305] shadow-md'
                  : 'border-white/15 bg-white/[0.04] text-[#CBD5E1] hover:border-white/30 hover:text-white'
              }`}
            >
              {tab === 'ALL'
                ? 'ALL MILESTONES'
                : tab === 'EDUCATION'
                ? 'EDUCATION'
                : tab === 'AWARDS'
                ? 'AWARDS & HACKATHONS'
                : 'LEADERSHIP & TRAINING'}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Cohesive Timeline */}
      <div className="relative border-l-2 border-[#FF85A2]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-7">
        {filtered.map((item) => {
          const isFeatured = item.featured;
          return (
            <div
              key={item.id}
              className={`relative rounded-2xl border readable-card p-5 sm:p-6 transition-all ${
                isFeatured
                  ? 'border-[#FF85A2]/60 shadow-xl shadow-[#FF85A2]/10'
                  : 'border-white/20'
              }`}
            >
              {/* Timeline Spine Node */}
              <div
                className={`absolute -left-[33px] sm:-left-[49px] top-6 flex h-7 w-7 items-center justify-center rounded-full border ${
                  isFeatured
                    ? 'border-[#FF85A2] bg-[#030305] shadow-sm shadow-[#FF85A2]/50 text-[#FFA3B8]'
                    : 'border-white/30 bg-[#090b10] text-white'
                }`}
              >
                {getCategoryIcon(item.category, isFeatured)}
              </div>

              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-2.5">
                <div className="flex items-center gap-2">
                  {isFeatured && item.category === 'award' ? (
                    <span className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FF85A2] text-[#030305] font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      FIRST PRIZE WINNER
                    </span>
                  ) : isFeatured && item.category === 'education' ? (
                    <span className="px-3 py-0.5 rounded-full border border-[#FF85A2]/50 bg-[#FF85A2]/20 text-[#FFA3B8] font-bold text-xs">
                      CORE DEGREE
                    </span>
                  ) : (
                    <span className="px-3 py-0.5 rounded-full border border-white/20 bg-white/[0.06] text-[#CBD5E1] uppercase text-xs font-bold">
                      {item.category}
                    </span>
                  )}
                  <span className="text-white/30">/</span>
                  <span className="text-[#B8B8B8] text-xs font-mono">{item.organization}</span>
                </div>

                {item.period && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-[#FFA3B8] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#FF85A2]" />
                    {item.period}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className={`font-mono text-lg sm:text-xl font-bold mb-2 ${
                  isFeatured ? 'text-[#FFA3B8]' : 'text-white'
                }`}
              >
                {item.title}
              </h3>

              {/* Grade / Badge */}
              {item.grade && (
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#FF85A2]/15 border border-[#FF85A2]/40 font-mono text-xs text-[#FFA3B8] font-bold">
                  {item.grade}
                </div>
              )}

              {/* Location Tag */}
              {item.location && (
                <div className="mt-2.5 flex items-center gap-1.5 font-mono text-xs text-[#B8B8B8]">
                  <MapPin className="w-3.5 h-3.5 text-[#FFA3B8]" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
