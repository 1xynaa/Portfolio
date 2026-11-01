export interface Project {
  id: string;
  code: string;
  name: string;
  title: string;
  tech: string[];
  status: 'In active development' | 'Prototype' | 'Interactive game' | 'Project';
  category: string;
  shortDesc: string;
  description: string;
  overview?: string;
  problem?: string;
  solution?: string;
  keyFeatures?: string[];
  myContribution?: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'nexus',
    code: 'PROJECT 01',
    name: 'NEXUS',
    title: 'Enterprise Collaboration & Intelligence Workspace',
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    status: 'In active development',
    category: 'Application engineering',
    shortDesc: 'A role-based workspace for collaboration, tasks, orders, dashboards, and analytics.',
    description:
      'A role-based manager and employee workspace with task and order modules, dashboards, analytics, and collaborative investigation workflows.',
    overview:
      'An enterprise-grade role-based manager and employee workspace platform built with Next.js, TypeScript, Supabase, and PostgreSQL. Features real-time task management, customer order tracking, operational dashboards, and analytics.',
    problem:
      'Modern engineering and operational teams struggle with fragmented tooling where communication, order tracking, privileged task execution, and team analytics are scattered across disconnected apps, creating coordination drag and security blindspots.',
    solution:
      'NEXUS consolidates workflows into a unified, secure workspace with role-based access control (RBAC), end-to-end type safety, automated order ingestion, and fail-closed security boundaries safeguarding sensitive enterprise data.',
    keyFeatures: [
      'Role-based access control (RBAC) separating administrative and employee privileges',
      '30+ Next.js API route handlers with input validation and rate limiting',
      'Real-time task and order tracking dashboards with PostgreSQL indexing',
      'Fail-closed server configuration preventing privilege escalation',
      'AI-assisted analytics and investigation workflows grounded in workspace data',
    ],
    myContribution:
      'Architected the full-stack system layout, implemented the Supabase authentication & PostgreSQL database schemas, built 30+ Next.js API route handlers with fail-closed security policies, designed the role-based dashboard UI, and integrated automated workflow validations.',
    highlights: [
      '30+ API route handlers built out.',
      'Supabase authentication and PostgreSQL data access.',
      'Authenticated-access protections and fail-closed privileged server configuration.',
      'AI-assisted investigation workflows grounded in workspace data are in development/design.',
    ],
    githubUrl: 'https://github.com/1xynaa/nexus',
    liveUrl: 'https://github.com/1xynaa/nexus#readme',
  },
  {
    id: 'kill-chain',
    code: 'PROJECT 02',
    name: 'KILL CHAIN',
    title: 'Agentic Cyberattack Reconstruction Platform',
    tech: ['Node.js', 'Python', 'OpenAI API', 'Nmap', 'tshark', 'Kali Linux', 'MITRE ATT&CK'],
    status: 'Prototype',
    category: 'Security investigations',
    shortDesc: 'A prototype workflow for examining packet captures and security logs.',
    description:
      'An AI-assisted security operations workflow that examines packet captures and security logs, reconstructs attack activity, and surfaces indicators of compromise.',
    overview:
      'An autonomous security operations platform engineered during Forensic Frontiers 2026. KILL CHAIN analyzes raw network packet captures (PCAP) and system audit logs, reconstructs multi-stage attack timelines, and maps adversary tactics to the Lockheed Martin Cyber Kill Chain and MITRE ATT&CK framework.',
    problem:
      'Security analysts face alert fatigue and hours of manual correlation during active security incidents, struggling to digest massive PCAP packet dumps and fragmented auth logs under time pressure.',
    solution:
      'KILL CHAIN deploys specialized agentic pipelines that parse packet streams via tshark/Nmap, correlate authentication anomalies, extract indicators of compromise (IOCs), and automatically reconstruct the step-by-step kill chain with actionable remediation guidance.',
    keyFeatures: [
      'Automated attack timeline reconstruction from raw PCAP files and auth logs',
      'Dynamic correlation engine mapping lateral movement to MITRE ATT&CK tactics',
      'Protocol anomaly isolation and suspicious outbound beacon detection',
      'Automated executive & technical incident report synthesis',
      'Agentic reasoning engine evaluating IOC confidence scores',
    ],
    myContribution:
      'Spearheaded the packet parsing pipeline using tshark, designed the attack timeline correlation logic, integrated the MITRE ATT&CK classification engine, and developed the agentic investigation prompts and report synthesizer.',
    highlights: [
      'Attack timeline reconstruction.',
      'Security log and network artifact investigation.',
      'Mapping observed behavior to the Lockheed Martin Cyber Kill Chain and MITRE ATT&CK.',
    ],
    githubUrl: 'https://github.com/1xynaa/kill-chain',
    liveUrl: 'https://github.com/1xynaa/kill-chain#demo',
  },
  {
    id: 'murder-exe',
    code: 'PROJECT 03',
    name: 'MURDER.EXE',
    title: 'Interactive Cyber Forensics Mystery Game',
    tech: ['JavaScript', 'HTML5 Canvas', 'Web Audio API', 'Node.js', 'Digital Evidence Analysis'],
    status: 'Interactive game',
    category: 'Digital forensics',
    shortDesc: 'A fictional cybercrime investigation told through digital evidence and puzzles.',
    description:
      'A detective-style interactive game in which players investigate a fictional cybercrime through system logs, access records, CCTV clues, and evidence puzzles.',
    overview:
      'A retro-futuristic cyber forensics detective game developed for AI GAME JAM 2026 (Round 2 Qualifier). Players take on the persona of a digital forensics examiner reconstructing a high-profile cybercrime by analyzing encrypted files, access logs, CCTV timestamps, and corrupted memory dumps.',
    problem:
      'Traditional cybersecurity education and digital forensics tools are often dry and intimidating for newcomers, lacking interactive, story-driven learning environments that convey the excitement of actual investigative problem-solving.',
    solution:
      'MURDER.EXE combines atmospheric game design, interactive terminal gameplay, and realistic evidence puzzles, teaching actual digital forensics techniques through a gripping murder mystery storyline.',
    keyFeatures: [
      'Authentic terminal-based log investigation and evidence puzzle solving',
      'Session authentication and cryptographic puzzle mechanics',
      'Timed investigation rounds with branching narrative outcomes',
      'Interactive digital evidence lockers with CCTV timeline synchronization',
      'Atmospheric sound design, retro CRT aesthetic, and cyber forensics lore',
    ],
    myContribution:
      'Conceived the game forensic investigation mechanics, developed the interactive terminal log viewer, implemented the evidence verification algorithms, and designed the retro cyberpunk UI and authentication system.',
    highlights: [
      'Authentication.',
      'Game progress tracking.',
      'Timed gameplay.',
      'Evidence discovery and interactive investigation challenges.',
    ],
    githubUrl: 'https://github.com/1xynaa/murder-exe',
    liveUrl: 'https://github.com/1xynaa/murder-exe#gameplay',
  },
  {
    id: 'sara',
    code: 'PROJECT 04',
    name: 'SARA',
    title: 'Stock Analysis and Recommendation AI',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Financial Market APIs', 'Git', 'Chart.js'],
    status: 'Project',
    category: 'Web applications',
    shortDesc: 'A finance-focused stock analysis and recommendation web application.',
    description:
      'A finance-focused stock analysis and recommendation web application, including frontend development, user interface design, and workflow documentation.',
    overview:
      'An intuitive financial analysis web platform designed to simplify equity market research for individual investors. SARA provides visual trend analysis, key metric comparisons, and algorithmic recommendation models based on technical indicators.',
    problem:
      'Retail investors are often overwhelmed by cluttered financial terminals and dense balance sheets with no clear synthesis of underlying market signals.',
    solution:
      'SARA synthesizes financial metrics and price momentum into clear, actionable visual summaries with automated indicator calculations and responsive charts.',
    keyFeatures: [
      'Real-time equity quote tracking and interactive candlestick charting',
      'Automated technical indicator calculations (RSI, Moving Averages, MACD)',
      'Clean, accessible financial metric dashboards with comparative analytics',
      'Curated stock watchlists and risk-weighted recommendation signals',
      'Responsive, lightweight interface optimized for desktop and mobile',
    ],
    myContribution:
      'Developed the responsive frontend user interface, integrated market data feed endpoints, implemented the technical indicator visualization charts, and authored complete workflow documentation.',
    highlights: [
      'Frontend development.',
      'User interface design.',
      'Workflow documentation.',
    ],
    githubUrl: 'https://github.com/1xynaa/sara',
    liveUrl: 'https://github.com/1xynaa/sara#overview',
  },
];

export interface SkillGroup {
  category: string;
  code: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming',
    code: '01',
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript / TypeScript', 'SQL'],
  },
  {
    category: 'Web & Backend',
    code: '02',
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'REST APIs',
      'HTML',
      'CSS',
      'Supabase',
      'PostgreSQL',
      'MySQL',
    ],
  },
  {
    category: 'Cybersecurity',
    code: '03',
    skills: [
      'Linux fundamentals',
      'Nmap',
      'tshark',
      'Network analysis',
      'Log investigation',
      'IOC investigation',
      'MITRE ATT&CK concepts',
    ],
  },
  {
    category: 'Tools & CS Foundations',
    code: '04',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'IntelliJ IDEA',
      'Object-oriented programming',
      'Data structures and algorithms',
    ],
  },
];

export interface HackathonItem {
  id: string;
  name: string;
  badge: string;
  recognition: 'Semifinalist' | 'Round 2 Qualifier' | 'Top 10 Finalist' | 'Participant';
  date: string;
  location: string;
  organizer: string;
  projectBuilt?: string;
  projectSummary?: string;
  team?: string;
  focus: string[];
  certificateImg: string;
  accentColor: string;
  borderGlow: string;
  description: string;
}

export const HACKATHONS_DATA: HackathonItem[] = [
  {
    id: 'industry-games-2026',
    name: 'The Industry Games – Industry Connect Hackathon 2026',
    badge: 'SEMIFINALIST',
    recognition: 'Semifinalist',
    date: '9–10 October 2026',
    location: 'SRMIST Kattankulathur',
    organizer: 'Directorate of Career Centre & ACM SIGGRAPH SRMIST',
    projectBuilt: 'NEXUS',
    projectSummary: 'AI-powered business intelligence & role-based enterprise workspace platform.',
    team: 'With Nimi Akhilesh',
    focus: ['Artificial Intelligence', 'Business Intelligence', 'Full-Stack Development'],
    certificateImg: '/certificates/industry-games-2026.png',
    accentColor: '#F59E0B',
    borderGlow: 'rgba(245, 158, 11, 0.35)',
    description:
      'Advanced to the Semifinals alongside Nimi Akhilesh after designing and deploying NEXUS, an intelligent business workspace combining automated analytics, order management, and multi-tenant security.',
  },
  {
    id: 'forensic-frontiers-2026',
    name: 'Forensic Frontiers 2026',
    badge: '28-HOUR DEFENSE SPRINT',
    recognition: 'Participant',
    date: '17–18 September 2026',
    location: 'SRMIST Kattankulathur',
    organizer: 'Dept of Networking & Communications in assoc. with NFSU Dharwad',
    projectBuilt: 'KILL CHAIN',
    projectSummary: 'Agentic Cyberattack Reconstruction Platform mapping packet telemetry to MITRE ATT&CK.',
    team: 'Team APEX',
    focus: ['AI Agents', 'Digital Forensics', 'Network Investigation', 'Attack Reconstruction'],
    certificateImg: '/certificates/forensic-frontiers-2026.png',
    accentColor: '#78E7FF',
    borderGlow: 'rgba(120, 231, 255, 0.35)',
    description:
      'Competed in a rigorous 28-hour cybersecurity & forensics hackathon building KILL CHAIN, an AI agent system that digests live PCAPs, flags indicators of compromise, and reconstructs multi-stage lateral movement.',
  },
  {
    id: 'ai-game-jam-2026',
    name: 'AI GAME JAM 2026',
    badge: 'ROUND 2 QUALIFIER',
    recognition: 'Round 2 Qualifier',
    date: '18–20 August 2026',
    location: 'SRMIST Kattankulathur',
    organizer: 'CINTEL Student Association, Dept of Computational Intelligence, SRMIST',
    projectBuilt: 'MURDER.EXE',
    projectSummary: 'Interactive cyber forensics detective mystery game combining forensic evidence & logs.',
    team: 'Team CLOUD FOUR',
    focus: ['Cybersecurity', 'Evidence Analysis', 'Game Development', 'Log Forensics'],
    certificateImg: '/certificates/ai-game-jam-2026.png',
    accentColor: '#C084FC',
    borderGlow: 'rgba(192, 132, 252, 0.35)',
    description:
      'Qualified for Round 2 with Team CLOUD FOUR by crafting MURDER.EXE, an investigative game where players unearth CCTV clues, decipher database logs, and trace network breaches to solve a digital murder mystery.',
  },
  {
    id: 'pitchquest-2026',
    name: 'PitchQuest Ideathon 2026',
    badge: 'TOP 10 TEAMS',
    recognition: 'Top 10 Finalist',
    date: '13 October 2026',
    location: 'SRMIST Kattankulathur',
    organizer: 'Alexa Developers SRM',
    focus: ['Product Innovation', 'Problem Solving', 'Strategic Ideation', 'Creative Pitching'],
    certificateImg: '/certificates/pitchquest-ideathon-2026.png',
    accentColor: '#38BDF8',
    borderGlow: 'rgba(56, 189, 248, 0.35)',
    description:
      'Recognized and awarded Certificate of Appreciation for qualifying among the Top 10 teams in PitchQuest, demonstrating innovation, user empathy, and a strong problem-solving spirit.',
  },
  {
    id: 'hacknova-3-2026',
    name: 'HackNova 3.0',
    badge: '12-HOUR HACKATHON',
    recognition: 'Participant',
    date: '17–18 March 2026',
    location: 'SRMIST Kattankulathur',
    organizer: 'NSCC SRM, Dept of Networking & Communications',
    focus: ['Rapid Prototyping', 'Full-Stack Architecture', 'Collaborative Coding'],
    certificateImg: '/certificates/hacknova-3-2026.png',
    accentColor: '#4ADE80',
    borderGlow: 'rgba(74, 222, 128, 0.35)',
    description:
      'Participated in a 12-hour high-speed development hackathon hosted by NSCC SRM, collaborating on full-stack application modules under tight sprint conditions.',
  },
];

export interface AchievementItem {
  id: string;
  date?: string;
  title: string;
  organization: string;
  type: 'award' | 'hackathon' | 'leadership' | 'learning';
  featured?: boolean;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'first-prize-ci25',
    date: 'November 2025',
    title: "First Prize — Creative Ingenuity '25",
    organization: 'Department of Mechanical Engineering, SRMIST',
    type: 'award',
    featured: true,
  },
  {
    id: 'industry-games-semifinal',
    date: 'October 2026',
    title: 'Semifinalist — Industry Connect Hackathon (The Industry Games)',
    organization: 'Directorate of Career Centre & ACM SIGGRAPH SRMIST',
    type: 'hackathon',
    featured: true,
  },
  {
    id: 'pitchquest-top10',
    date: 'October 2026',
    title: 'Top 10 Teams Recognition — PitchQuest Ideathon',
    organization: 'Alexa Developers SRM',
    type: 'award',
    featured: true,
  },
  {
    id: 'ai-game-jam-round2',
    date: 'August 2026',
    title: 'Round 2 Qualifier — AI GAME JAM 2026',
    organization: 'CINTEL Student Association, SRMIST',
    type: 'hackathon',
    featured: true,
  },
  {
    id: 'forensic-frontiers',
    date: 'September 2026',
    title: 'Participant — Forensic Frontiers 2026 (28-Hour Hackathon)',
    organization: 'Dept of Networking & Communications, SRMIST & NFSU',
    type: 'hackathon',
    featured: true,
  },
  {
    id: 'hacknova-3',
    date: 'March 2026',
    title: 'Participant — HackNova 3.0',
    organization: 'SRMIST',
    type: 'hackathon',
  },
  {
    id: 'mindcraft-cmuq',
    date: 'May 2023',
    title: 'MindCraft',
    organization: 'Carnegie Mellon University Qatar',
    type: 'hackathon',
  },
  {
    id: 'irc-srmist',
    title: 'Deputy Head, Event Management',
    organization: 'International Relations Club, SRMIST',
    type: 'leadership',
  },
  {
    id: 'astrophilia-club',
    title: 'Follow-up Member',
    organization: 'Astrophilia Club, SRMIST',
    type: 'leadership',
  },
  {
    id: 'tryhackme-linux',
    date: 'Completed',
    title: 'Linux Fundamentals',
    organization: 'TryHackMe',
    type: 'learning',
  },
];

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  grade?: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'SRM Institute of Science and Technology (SRMIST)',
    degree: 'B.Tech, Computer Science and Engineering (Cybersecurity)',
    period: '2025–present',
    location: 'Kattankulathur, Tamil Nadu',
    grade: 'First-year CGPA: 9.18/10',
  },
  {
    institution: 'MES Indian School',
    degree: 'Higher Secondary Education',
    period: 'Completed',
    location: 'Doha, Qatar',
  },
];

export const PERSONAL_INFO = {
  name: 'Anagha Mithra Ainippully Remith',
  shortName: 'Anagha Mithra',
  initials: 'AM',
  headline: 'Computer Science & Cybersecurity | Security Engineering & Full-Stack Development',
  shortHeadline: 'SECURITY ENGINEERING / FULL-STACK DEVELOPMENT',
  tagline: 'Building software, exploring security, and investigating what happens beneath the interface.',
  institutionBadge: 'CS & CYBERSECURITY · SRMIST',
  location: 'SRMIST · Chennai region, Tamil Nadu',
  email: 'anaghahaaa@gmail.com',
  githubUrl: 'https://github.com/1xynaa',
  linkedinUrl: 'https://www.linkedin.com/in/anagha-mithra/',
  cgpa: '9.18/10',
  currentYear: 'Second-year B.Tech',
  resumePath: '/Anagha_Mithra_Resume.pdf',
};
