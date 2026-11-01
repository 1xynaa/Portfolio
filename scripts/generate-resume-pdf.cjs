/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Generates a clean, professional, ATS-friendly light-theme single-page PDF resume
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateResume() {
  const doc = await PDFDocument.create();
  
  // Standard US Letter: 612 x 792 pt
  const page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Palette: Clean Light Theme with subtle Rose / Lavender accents
  const colors = {
    bg: rgb(1, 1, 1),
    textDark: rgb(0.08, 0.10, 0.15),      // #141A26
    textMuted: rgb(0.35, 0.38, 0.45),     // #596173
    accentRose: rgb(0.88, 0.22, 0.45),    // #E13873 (Rose Pink)
    accentLavender: rgb(0.52, 0.28, 0.78),// #8547C7 (Lavender)
    borderLight: rgb(0.88, 0.90, 0.94),   // #E1E6F0
    bullet: rgb(0.88, 0.22, 0.45)
  };

  // Draw background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: colors.bg
  });

  // Top Accent Bar (Gradient-like thin double rule: Rose & Lavender)
  page.drawRectangle({
    x: 0,
    y: height - 5,
    width: width * 0.55,
    height: 5,
    color: colors.accentRose
  });
  page.drawRectangle({
    x: width * 0.55,
    y: height - 5,
    width: width * 0.45,
    height: 5,
    color: colors.accentLavender
  });

  let y = height - 36;
  const marginX = 40;
  const contentWidth = width - marginX * 2;

  // -------------------------------------------------------------
  // HEADER
  // -------------------------------------------------------------
  const nameText = 'ANAGHA MITHRA AINIPPULLY REMITH';
  page.drawText(nameText, {
    x: marginX,
    y,
    size: 17,
    font: fontBold,
    color: colors.textDark
  });

  y -= 14;
  page.drawText('Computer Science & Engineering (Cybersecurity) | Security Engineering & Full-Stack Development', {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: colors.accentRose
  });

  y -= 13;
  const contactText = 'Email: anaghahaaa@gmail.com  |  LinkedIn: linkedin.com/in/anagha-mithra  |  GitHub: github.com/1xynaa  |  SRMIST Kattankulathur, TN';
  page.drawText(contactText, {
    x: marginX,
    y,
    size: 8.5,
    font: fontRegular,
    color: colors.textMuted
  });

  y -= 10;
  // Header divider
  page.drawLine({
    start: { x: marginX, y },
    end: { x: marginX + contentWidth, y },
    thickness: 0.75,
    color: colors.borderLight
  });

  y -= 14;

  // Helper for section headings
  function drawSectionHeading(title) {
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y,
      size: 9.5,
      font: fontBold,
      color: colors.accentLavender
    });

    const titleWidth = fontBold.widthOfTextAtSize(title.toUpperCase(), 9.5);
    page.drawLine({
      start: { x: marginX + titleWidth + 8, y: y + 3 },
      end: { x: marginX + contentWidth, y: y + 3 },
      thickness: 0.5,
      color: colors.borderLight
    });

    y -= 12;
  }

  // -------------------------------------------------------------
  // EDUCATION
  // -------------------------------------------------------------
  drawSectionHeading('Education');

  // Degree 1
  page.drawText('SRM Institute of Science and Technology', {
    x: marginX,
    y,
    size: 9,
    font: fontBold,
    color: colors.textDark
  });
  const srmLoc = 'Kattankulathur, Tamil Nadu | 2025 - Present';
  page.drawText(srmLoc, {
    x: marginX + contentWidth - fontRegular.widthOfTextAtSize(srmLoc, 8),
    y,
    size: 8,
    font: fontRegular,
    color: colors.textMuted
  });
  y -= 10;

  page.drawText('B.Tech in Computer Science and Engineering (Cybersecurity)', {
    x: marginX,
    y,
    size: 8.5,
    font: fontItalic,
    color: colors.textDark
  });
  const cgpaText = 'CGPA: 9.18 / 10.0 (First Year)';
  page.drawText(cgpaText, {
    x: marginX + contentWidth - fontBold.widthOfTextAtSize(cgpaText, 8.5),
    y,
    size: 8.5,
    font: fontBold,
    color: colors.accentRose
  });
  y -= 12;

  // School 2
  page.drawText('MES Indian School', {
    x: marginX,
    y,
    size: 9,
    font: fontBold,
    color: colors.textDark
  });
  const mesLoc = 'Doha, Qatar';
  page.drawText(mesLoc, {
    x: marginX + contentWidth - fontRegular.widthOfTextAtSize(mesLoc, 8),
    y,
    size: 8,
    font: fontRegular,
    color: colors.textMuted
  });
  y -= 10;

  page.drawText('Senior Secondary Education (Central Board of Secondary Education - CBSE)', {
    x: marginX,
    y,
    size: 8.5,
    font: fontItalic,
    color: colors.textDark
  });
  y -= 16;

  // -------------------------------------------------------------
  // TECHNICAL SKILLS
  // -------------------------------------------------------------
  drawSectionHeading('Technical Skills');

  const skills = [
    { label: 'Languages:', val: 'Python, C, C++, Java, JavaScript (ES6+), TypeScript, SQL' },
    { label: 'Security & Forensics:', val: 'Linux (CLI/Kali), Nmap, tshark (packet analysis), Log Forensics, IOC Extraction, MITRE ATT&CK' },
    { label: 'Web & Systems:', val: 'Next.js (App Router), React, Node.js, REST APIs, Supabase, PostgreSQL, MySQL, HTML5, CSS3' },
    { label: 'Developer Tools:', val: 'Git, GitHub, VS Code, IntelliJ IDEA, Object-Oriented Programming (OOP), Data Structures & Algorithms' }
  ];

  skills.forEach(s => {
    page.drawText(s.label, {
      x: marginX,
      y,
      size: 8.5,
      font: fontBold,
      color: colors.textDark
    });
    const labelW = fontBold.widthOfTextAtSize(s.label, 8.5);
    page.drawText(s.val, {
      x: marginX + labelW + 4,
      y,
      size: 8.5,
      font: fontRegular,
      color: colors.textDark
    });
    y -= 11.5;
  });

  y -= 4;

  // -------------------------------------------------------------
  // TECHNICAL PROJECTS
  // -------------------------------------------------------------
  drawSectionHeading('Technical Projects');

  const projects = [
    {
      name: 'NEXUS — Enterprise Collaboration & Intelligence Workspace',
      tech: 'Next.js, React, TypeScript, Supabase, PostgreSQL',
      points: [
        'Engineered a multi-tier role-based workspace with task execution, order management, and operational analytics dashboards.',
        'Designed and implemented 30+ authenticated API route handlers with fail-closed security boundaries and PostgreSQL row policies.'
      ]
    },
    {
      name: 'KILL CHAIN — Agentic Cyberattack Reconstruction Platform',
      tech: 'Node.js, OpenAI API, Nmap, tshark, Kali Linux',
      points: [
        'Built an AI-assisted security operations prototype examining network packet captures and auth logs to rebuild forensic attack timelines.',
        'Structured automated IOC correlation and mapped adversary behavior directly to the MITRE ATT&CK and Lockheed Martin frameworks.'
      ]
    },
    {
      name: 'MURDER.EXE — Interactive Cyber Forensics Mystery Game',
      tech: 'Web Application Development, Authentication, Digital Evidence Analysis',
      points: [
        'Created an interactive cybersecurity puzzle simulator exploring packet anomalies, credential recovery, and memory forensic artifacts.'
      ]
    },
    {
      name: 'SARA — Stock Analysis and Recommendation AI',
      tech: 'HTML5, CSS3, JavaScript, Git',
      points: [
        'Developed a stock analytics front-end platform providing responsive market data visualization and trend analysis workflows.'
      ]
    }
  ];

  projects.forEach((proj, idx) => {
    page.drawText(proj.name, {
      x: marginX,
      y,
      size: 8.8,
      font: fontBold,
      color: colors.textDark
    });

    const techText = `[ ${proj.tech} ]`;
    const techW = fontRegular.widthOfTextAtSize(techText, 7.8);
    page.drawText(techText, {
      x: marginX + contentWidth - techW,
      y,
      size: 7.8,
      font: fontRegular,
      color: colors.accentRose
    });

    y -= 10;

    proj.points.forEach(pt => {
      // Bullet dot
      page.drawCircle({
        x: marginX + 4,
        y: y + 2.5,
        size: 1.5,
        color: colors.bullet
      });

      page.drawText(pt, {
        x: marginX + 11,
        y,
        size: 8.2,
        font: fontRegular,
        color: colors.textDark
      });
      y -= 10;
    });

    y -= 3;
  });

  // -------------------------------------------------------------
  // ACHIEVEMENTS & COMPETITIONS
  // -------------------------------------------------------------
  drawSectionHeading('Achievements & Competitions');

  const honors = [
    {
      title: "First Prize — Creative Ingenuity '25",
      org: 'Department of Mechanical Engineering, SRMIST',
      date: 'Nov 2025'
    },
    {
      title: 'Top 10 Finalist & Participant — HackNova 3.0',
      org: 'SRMIST Cybersecurity Hackathon',
      date: 'March 2026'
    },
    {
      title: 'MindCraft Computing Challenge Participant',
      org: 'Carnegie Mellon University Qatar',
      date: 'May 2023'
    },
    {
      title: 'National Level Finalist — Indian Robotics Community',
      org: 'IRC National Robotics Competition',
      date: 'Nov 2022'
    }
  ];

  honors.forEach(h => {
    page.drawCircle({
      x: marginX + 4,
      y: y + 2.5,
      size: 1.5,
      color: colors.bullet
    });

    page.drawText(h.title, {
      x: marginX + 11,
      y,
      size: 8.2,
      font: fontBold,
      color: colors.textDark
    });

    const titleW = fontBold.widthOfTextAtSize(h.title, 8.2);
    page.drawText(` — ${h.org}`, {
      x: marginX + 11 + titleW,
      y,
      size: 8.2,
      font: fontRegular,
      color: colors.textMuted
    });

    const dateW = fontRegular.widthOfTextAtSize(h.date, 8);
    page.drawText(h.date, {
      x: marginX + contentWidth - dateW,
      y,
      size: 8,
      font: fontRegular,
      color: colors.textMuted
    });

    y -= 10.5;
  });

  y -= 4;

  // -------------------------------------------------------------
  // LEADERSHIP & EXTRACURRICULARS
  // -------------------------------------------------------------
  drawSectionHeading('Leadership & Extracurriculars');

  const extracurriculars = [
    'Deputy Head, Event Management — International Relations Club, SRMIST (Coordinating technical symposia & cultural exchange).',
    'Active Member — Astrophilia Club, SRMIST (Space Science, Observational Astronomy, and STEM Outreach).',
    'Independent Cybersecurity Training — TryHackMe Linux Fundamentals (CLI proficiency, privilege escalation, log analysis).'
  ];

  extracurriculars.forEach(item => {
    page.drawCircle({
      x: marginX + 4,
      y: y + 2.5,
      size: 1.5,
      color: colors.bullet
    });

    page.drawText(item, {
      x: marginX + 11,
      y,
      size: 8.2,
      font: fontRegular,
      color: colors.textDark
    });

    y -= 10.5;
  });

  // Footer bar
  page.drawLine({
    start: { x: marginX, y: 22 },
    end: { x: marginX + contentWidth, y: 22 },
    thickness: 0.5,
    color: colors.borderLight
  });

  const footerText = 'Anagha Mithra Ainippully Remith  •  Portfolio & Security Engineering  •  Single-Page ATS Standard';
  const footerW = fontRegular.widthOfTextAtSize(footerText, 7.5);
  page.drawText(footerText, {
    x: (width - footerW) / 2,
    y: 12,
    size: 7.5,
    font: fontRegular,
    color: colors.textMuted
  });

  const pdfBytes = await doc.save();
  
  const publicDir = path.join(__dirname, '..', 'public');
  fs.writeFileSync(path.join(publicDir, 'Anagha_Mithra_Resume.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBytes);

  console.log('Successfully generated Anagha_Mithra_Resume.pdf and resume.pdf! Total size: ' + pdfBytes.length + ' bytes.');
}

generateResume().catch(err => {
  console.error('Failed to generate resume:', err);
  process.exit(1);
});
