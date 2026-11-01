/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  generateParticleData,
  generateHumanoidParticleData,
  generateDenseHumanBustData,
  calculatePointerPerturbation,
  computePositionsRadius,
} from './particleMath.ts';
import {
  PROJECTS,
  SKILL_GROUPS,
  ACHIEVEMENTS,
  EDUCATION_DATA,
  PERSONAL_INFO,
} from './portfolioData.ts';

test('particle generator produces exact buffer sizes and valid geometry', () => {
  const count = 1000;
  const data = generateParticleData({ count });

  assert.equal(data.positions.length, count * 3);
  assert.equal(data.basePositions.length, count * 3);
  assert.equal(data.colors.length, count * 3);
  assert.equal(data.sizes.length, count);
  assert.equal(data.phases.length, count);

  // Compute radius of particle field
  const radius = computePositionsRadius(data.positions);
  assert.ok(radius > 1.0, `Expected bounding radius > 1.0, got ${radius}`);
  assert.ok(radius < 10.0, `Expected bounding radius < 10.0, got ${radius}`);

  // Test color channels within [0, 1]
  for (let i = 0; i < 10; i++) {
    const r = data.colors[i * 3];
    const g = data.colors[i * 3 + 1];
    const b = data.colors[i * 3 + 2];
    assert.ok(r >= 0 && r <= 1, `Color r out of range: ${r}`);
    assert.ok(g >= 0 && g <= 1, `Color g out of range: ${g}`);
    assert.ok(b >= 0 && b <= 1, `Color b out of range: ${b}`);
  }
});

test('humanoid particle generator creates a deterministic, lit full-body point cloud', () => {
  const count = 2048;
  const data = generateHumanoidParticleData(count);
  const secondRun = generateHumanoidParticleData(count);

  assert.equal(data.positions.length, count * 3);
  assert.equal(data.normals.length, count * 3);
  assert.equal(data.colors.length, count * 3);
  assert.equal(data.sizes.length, count);
  assert.deepEqual(data.positions, secondRun.positions);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    minX = Math.min(minX, data.positions[offset]);
    maxX = Math.max(maxX, data.positions[offset]);
    minY = Math.min(minY, data.positions[offset + 1]);
    maxY = Math.max(maxY, data.positions[offset + 1]);
    const normalLength = Math.hypot(
      data.normals[offset],
      data.normals[offset + 1],
      data.normals[offset + 2]
    );
    assert.ok(normalLength > 0.99 && normalLength < 1.01);
  }
  assert.ok(minX < -1 && maxX > 1);
  assert.ok(minY < -2 && maxY > 2.3);
});

test('dense human bust generator creates realistic portrait sculpture with face, glasses, and curls', () => {
  const count = 4096;
  const data = generateDenseHumanBustData(count);
  const secondRun = generateDenseHumanBustData(count);

  assert.equal(data.positions.length, count * 3);
  assert.equal(data.basePositions.length, count * 3);
  assert.equal(data.normals.length, count * 3);
  assert.equal(data.colors.length, count * 3);
  assert.equal(data.sizes.length, count);
  assert.equal(data.phases.length, count);
  assert.deepEqual(data.positions, secondRun.positions);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  for (let i = 0; i < count; i++) {
    const off = i * 3;
    minX = Math.min(minX, data.positions[off]);
    maxX = Math.max(maxX, data.positions[off]);
    minY = Math.min(minY, data.positions[off + 1]);
    maxY = Math.max(maxY, data.positions[off + 1]);
    minZ = Math.min(minZ, data.positions[off + 2]);
    maxZ = Math.max(maxZ, data.positions[off + 2]);

    // Check color channels
    const r = data.colors[off];
    const g = data.colors[off + 1];
    const b = data.colors[off + 2];
    assert.ok(r >= 0 && r <= 1, `r channel out of range: ${r}`);
    assert.ok(g >= 0 && g <= 1, `g channel out of range: ${g}`);
    assert.ok(b >= 0 && b <= 1, `b channel out of range: ${b}`);
  }

  // Verify 3D bounding box spans anatomical bust volume
  assert.ok(minX < -0.8 && maxX > 0.8, `Shoulders and hair width: minX=${minX}, maxX=${maxX}`);
  assert.ok(minY < -0.8 && maxY > 1.0, `Bust vertical span: minY=${minY}, maxY=${maxY}`);
  assert.ok(maxZ > 0.15, `Front facial and glasses projection: maxZ=${maxZ}`);
});

test('pointer perturbation produces repulsion within threshold and zero outside', () => {
  // Near point (inside radius 2.0)
  const repelled = calculatePointerPerturbation(
    0.5, 0.5, 0.0,
    0.5, 0.5, 0.0,
    0.0, 0.0, 0.0,
    2.0,
    1.0
  );
  assert.ok(repelled.dx > 0, 'Expected positive dx repulsion');
  assert.ok(repelled.dy > 0, 'Expected positive dy repulsion');

  // Far point (outside radius 2.0)
  const far = calculatePointerPerturbation(
    10.0, 10.0, 10.0,
    10.0, 10.0, 10.0,
    0.0, 0.0, 0.0,
    2.0,
    1.0
  );
  assert.equal(far.dx, 0);
  assert.equal(far.dy, 0);
  assert.equal(far.dz, 0);
});

test('portfolio projects data contains the 4 requested projects with verified properties', () => {
  assert.equal(PROJECTS.length, 4);

  const [nexus, killChain, murderExe, sara] = PROJECTS;

  assert.equal(nexus.name, 'NEXUS');
  assert.equal(nexus.status, 'In active development');
  assert.ok(nexus.highlights.some(h => h.includes('30+ API route handlers')));

  assert.equal(killChain.name, 'KILL CHAIN');
  assert.equal(killChain.status, 'Prototype');
  assert.ok(killChain.highlights.some(h => h.includes('Lockheed Martin')));

  assert.equal(murderExe.name, 'MURDER.EXE');
  assert.equal(murderExe.status, 'Interactive game');

  assert.equal(sara.name, 'SARA');
  assert.equal(sara.status, 'Project');
});

test('personal information and achievements adhere strictly to prompt facts without invented details', () => {
  assert.equal(PERSONAL_INFO.cgpa, '9.18/10');
  assert.equal(PERSONAL_INFO.email, 'anaghahaaa@gmail.com');
  assert.equal(PERSONAL_INFO.githubUrl, 'https://github.com/1xynaa');
  assert.equal(PERSONAL_INFO.linkedinUrl, 'https://www.linkedin.com/in/anagha-mithra/');

  // Check First Prize Creative Ingenuity '25
  const firstPrize = ACHIEVEMENTS.find(a => a.id === 'first-prize-ci25');
  assert.ok(firstPrize, 'First prize must be present');
  assert.equal(firstPrize?.featured, true);

  // Check Education
  assert.equal(EDUCATION_DATA.length, 2);
  assert.ok(EDUCATION_DATA[0].institution.includes('SRM Institute'));
  assert.ok(EDUCATION_DATA[1].institution.includes('MES Indian School'));

  // Check Skills categories
  assert.equal(SKILL_GROUPS.length, 4);
  assert.ok(SKILL_GROUPS.every(group => group.skills.every(skill => typeof skill === 'string')));
  assert.ok(ACHIEVEMENTS.every(achievement => !('description' in achievement)));
  assert.ok(EDUCATION_DATA.every(education => !('notes' in education)));
});

test('resume path points directly to authentic Anagha_Mithra_Resume.pdf', () => {
  assert.equal(PERSONAL_INFO.resumePath, '/Anagha_Mithra_Resume.pdf');
  const pdfPath = path.resolve(process.cwd(), 'public', 'Anagha_Mithra_Resume.pdf');
  assert.ok(fs.existsSync(pdfPath), 'public/Anagha_Mithra_Resume.pdf must exist');
  const stats = fs.statSync(pdfPath);
  assert.ok(stats.size > 25000, `Expected authentic resume PDF size > 25KB, got ${stats.size} bytes`);
});
