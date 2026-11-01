/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ParticlePoint {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  colorR: number;
  colorG: number;
  colorB: number;
  size: number;
  phase: number;
  speed: number;
}

export interface ParticleConfig {
  count: number;
  p: number; // torus knot p parameter
  q: number; // torus knot q parameter
  radius: number;
  tubeRadius: number;
  noiseScale: number;
}

type Vector3Tuple = readonly [number, number, number];

interface SurfaceSample {
  position: [number, number, number];
  normal: [number, number, number];
}

interface BodyPart {
  weight: number;
  sample: (random: () => number) => SurfaceSample;
}

function normalize(vector: [number, number, number]): [number, number, number] {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
  return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function ellipsoidSurface(center: Vector3Tuple, radii: Vector3Tuple): BodyPart {
  return {
    weight: 1,
    sample: (random) => {
      const vertical = random() * 2 - 1;
      const angle = random() * Math.PI * 2;
      const radial = Math.sqrt(1 - vertical * vertical);
      const unit = [radial * Math.cos(angle), vertical, radial * Math.sin(angle)] as const;
      return {
        position: [
          center[0] + unit[0] * radii[0],
          center[1] + unit[1] * radii[1],
          center[2] + unit[2] * radii[2],
        ],
        normal: normalize([unit[0] / radii[0], unit[1] / radii[1], unit[2] / radii[2]]),
      };
    },
  };
}

function capsuleSurface(
  start: Vector3Tuple,
  end: Vector3Tuple,
  startRadius: number,
  endRadius: number,
  weight: number
): BodyPart {
  const direction = normalize([end[0] - start[0], end[1] - start[1], end[2] - start[2]]);
  const reference: [number, number, number] =
    Math.abs(direction[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const tangent = normalize([
    direction[1] * reference[2] - direction[2] * reference[1],
    direction[2] * reference[0] - direction[0] * reference[2],
    direction[0] * reference[1] - direction[1] * reference[0],
  ]);
  const bitangent = normalize([
    direction[1] * tangent[2] - direction[2] * tangent[1],
    direction[2] * tangent[0] - direction[0] * tangent[2],
    direction[0] * tangent[1] - direction[1] * tangent[0],
  ]);

  return {
    weight,
    sample: (random) => {
      const along = random();
      const angle = random() * Math.PI * 2;
      const radius = startRadius + (endRadius - startRadius) * along;
      const normal = normalize([
        tangent[0] * Math.cos(angle) + bitangent[0] * Math.sin(angle),
        tangent[1] * Math.cos(angle) + bitangent[1] * Math.sin(angle),
        tangent[2] * Math.cos(angle) + bitangent[2] * Math.sin(angle),
      ]);
      return {
        position: [
          start[0] + (end[0] - start[0]) * along + normal[0] * radius,
          start[1] + (end[1] - start[1]) * along + normal[1] * radius,
          start[2] + (end[2] - start[2]) * along + normal[2] * radius,
        ],
        normal,
      };
    },
  };
}

export function generateHumanoidParticleData(count: number): {
  positions: Float32Array;
  basePositions: Float32Array;
  normals: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
} {
  let seed = 0x4d595df4;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x100000000;
  };
  const parts: BodyPart[] = [];
  const addEllipsoid = (
    center: Vector3Tuple,
    radii: Vector3Tuple,
    weight: number
  ) => {
    const part = ellipsoidSurface(center, radii);
    parts.push({ ...part, weight });
  };
  const addCapsule = (
    start: Vector3Tuple,
    end: Vector3Tuple,
    startRadius: number,
    endRadius: number,
    weight: number
  ) => parts.push(capsuleSurface(start, end, startRadius, endRadius, weight));

  addEllipsoid([0, 1.98, 0.01], [0.35, 0.46, 0.3], 7);
  addEllipsoid([0, 1.78, 0.07], [0.25, 0.2, 0.23], 1.2);
  addEllipsoid([0, 2.03, 0.3], [0.045, 0.15, 0.065], 0.35);
  addEllipsoid([0, 1.96, 0.36], [0.075, 0.07, 0.075], 0.25);
  addEllipsoid([-0.34, 1.98, 0], [0.065, 0.12, 0.085], 0.3);
  addEllipsoid([0.34, 1.98, 0], [0.065, 0.12, 0.085], 0.3);
  addEllipsoid([0, 1.47, 0], [0.13, 0.19, 0.13], 1);
  addEllipsoid([0, 1.05, 0], [0.54, 0.47, 0.31], 10);
  addEllipsoid([0, 0.62, 0], [0.39, 0.37, 0.25], 5);
  addEllipsoid([0, 0.18, 0], [0.43, 0.3, 0.27], 6);

  for (const side of [-1, 1]) {
    const shoulder: Vector3Tuple = [side * 0.53, 1.27, 0];
    const elbow: Vector3Tuple = [side * 0.81, 0.63, 0.015];
    const wrist: Vector3Tuple = [side * 0.96, -0.08, 0.035];
    addEllipsoid(shoulder, [0.24, 0.27, 0.24], 1.8);
    addCapsule(shoulder, elbow, 0.2, 0.15, 4);
    addEllipsoid(elbow, [0.16, 0.17, 0.16], 0.7);
    addCapsule(elbow, wrist, 0.15, 0.095, 3);
    addEllipsoid([side * 0.98, -0.29, 0.045], [0.13, 0.18, 0.09], 0.9);
    addCapsule(
      [side * 1.075, -0.28, 0.045],
      [side * 1.19, -0.4, 0.065],
      0.055,
      0.025,
      0.3
    );

    for (let finger = 0; finger < 4; finger += 1) {
      const spread = (finger - 1.5) * 0.052;
      addCapsule(
        [side * (0.99 + spread), -0.41, 0.055],
        [side * (1.005 + spread * 1.12), -0.58 + Math.abs(finger - 1.5) * 0.035, 0.065],
        0.035,
        0.018,
        0.25
      );
    }

    const hip: Vector3Tuple = [side * 0.22, 0.12, 0];
    const knee: Vector3Tuple = [side * 0.27, -0.87, 0.005];
    const ankle: Vector3Tuple = [side * 0.31, -1.78, 0.025];
    addCapsule(hip, knee, 0.25, 0.17, 5);
    addEllipsoid(knee, [0.17, 0.18, 0.18], 0.9);
    addCapsule(knee, ankle, 0.17, 0.105, 3.4);
    addEllipsoid([side * 0.31, -1.91, 0.12], [0.145, 0.17, 0.3], 1);
  }

  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const totalWeight = parts.reduce((sum, part) => sum + part.weight, 0);

  for (let index = 0; index < count; index += 1) {
    let selection = random() * totalWeight;
    let selectedPart = parts[0];
    for (const part of parts) {
      selection -= part.weight;
      if (selection <= 0) {
        selectedPart = part;
        break;
      }
    }

    const sample = selectedPart.sample(random);
    const offset = index * 3;
    for (let axis = 0; axis < 3; axis += 1) {
      const position = sample.position[axis] + (random() - 0.5) * 0.008;
      positions[offset + axis] = position;
      basePositions[offset + axis] = position;
      normals[offset + axis] = sample.normal[axis];
    }

    const tone = random();
    const color =
      tone < 0.52
        ? [0.96, 0.97, 1.0]
        : tone < 0.74
          ? [0.88, 0.84, 0.96]
          : tone < 0.90
            ? [1.0, 0.74, 0.84]
            : [1.0, 0.88, 0.94];
    colors[offset] = color[0];
    colors[offset + 1] = color[1];
    colors[offset + 2] = color[2];
    sizes[index] = 0.7 + random() * 0.8;
    phases[index] = random() * Math.PI * 2;
  }

  return { positions, basePositions, normals, colors, sizes, phases };
}

/**
 * Generates an ultra-dense, volumetric human bust sculpture
 * with sculpted head, facial contours (eye sockets, nose bridge,
 * cheekbones, jaw, lips), neck, collarbones, trapezius, chest, and shoulders.
 */
/**
 * Evaluates the 3D surface, anatomical facial contours, voluminous curly hair,
 * glasses, necklace, and shoulders representing Anagha's portrait sculpture.
 */
function evaluateAnatomicalBustSurface(y: number, theta: number): {
  px: number;
  py: number;
  pz: number;
  nx: number;
  ny: number;
  nz: number;
  ao: number;
  region: 'face' | 'hair' | 'glasses' | 'neck' | 'necklace' | 'shoulders';
} {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const absSin = Math.abs(sinT);

  let rx = 0.36;
  let rz = 0.38;
  let cz = 0.0;
  let ao = 1.0;
  let rDelta = 0.0;
  let region: 'face' | 'hair' | 'glasses' | 'neck' | 'necklace' | 'shoulders' = 'hair';

  if (y > 0.62) {
    // 1. Cranium & Forehead with Middle-Parted Bangs (0.62 to 1.25)
    const t = (y - 0.62) / 0.63;
    const dome = Math.sqrt(Math.max(0.001, 1 - Math.pow(t, 2.1)));
    rx = (0.36 + 0.08 * (1 - t)) * dome;
    rz = (0.42 + 0.08 * (1 - t)) * dome;
    cz = -0.06 * (1 - t);

    // Voluminous crown and curls on sides and back
    if (cosT < 0.4 || absSin > 0.35) {
      region = 'hair';
      // Curl wave harmonics
      const curlWave = Math.sin(y * 14.0 + sinT * 4.0) * 0.035 + Math.cos(theta * 6.0) * 0.025;
      rDelta += curlWave;
    } else {
      region = 'face';
      // Middle-parted bangs sweeping laterally across forehead
      const bangPart = Math.abs(sinT);
      if (bangPart > 0.08 && bangPart < 0.55 && y < 0.85) {
        const bangCurve = Math.sin(((0.85 - y) / 0.23) * Math.PI) * Math.sin(((bangPart - 0.08) / 0.47) * Math.PI);
        rDelta += bangCurve * 0.045;
        region = 'hair';
      }
    }
  } else if (y > 0.16) {
    // 2. Face, Eyes, Glasses, Nose, Lips, Chin & Cascading Curls (0.16 to 0.62)
    const t = (y - 0.16) / 0.46;
    rx = 0.20 + 0.24 * Math.pow(t, 0.72);
    rz = 0.22 + 0.24 * Math.pow(t, 0.85);
    cz = -0.05 * t;

    // Side and back volume: voluminous wavy hair cascading down
    if (absSin > 0.52 || cosT < 0.15) {
      region = 'hair';
      // Voluminous cascading wavy curls
      const sideSign = sinT > 0 ? 1 : -1;
      const curlWave = Math.sin(y * 12.0 + sideSign * 1.5) * 0.048 + Math.cos(y * 18.0 + theta * 3.0) * 0.028;
      rx += 0.10 + 0.06 * (1 - t); // Hair adds substantial lateral volume
      rz += 0.08 + 0.05 * (1 - t);
      rDelta += curlWave;
    } else {
      region = 'face';
      // Frontal facial sculpting:
      // A. Eyes & Glasses Wireframes (y: 0.44 to 0.58)
      if (y >= 0.44 && y <= 0.58 && absSin >= 0.16 && absSin <= 0.52) {
        const eyeY = Math.sin(((y - 0.44) / 0.14) * Math.PI);
        const eyeX = Math.sin(((absSin - 0.16) / 0.36) * Math.PI);
        // Recessed eye sockets
        rDelta -= eyeY * eyeX * 0.038;
        ao -= 0.3 * eyeY * eyeX;

        // Rounded-rectangular glasses frames floating in front
        const isRimX = Math.abs(absSin - 0.16) < 0.04 || Math.abs(absSin - 0.52) < 0.04;
        const isRimY = Math.abs(y - 0.44) < 0.03 || Math.abs(y - 0.58) < 0.03;
        if (isRimX || isRimY) {
          rDelta += 0.055; // Glasses project forward
          region = 'glasses';
          ao = 1.0;
        }
      }

      // Glasses bridge (y: 0.49 to 0.54, absSin < 0.14)
      if (y >= 0.49 && y <= 0.54 && absSin < 0.14) {
        rDelta += 0.058;
        region = 'glasses';
      }

      // B. Nose Bridge & Tip (y: 0.32 to 0.52, centered at theta = 0)
      if (y >= 0.32 && y <= 0.52 && cosT > 0.82) {
        const ny = (y - 0.32) / 0.20;
        const noseProfile = Math.sin(ny * Math.PI);
        const noseAngle = (cosT - 0.82) / 0.18;
        const noseHeight = noseProfile * noseAngle * 0.125;
        rDelta += noseHeight;
        ao += 0.2 * noseAngle;
      }

      // C. Brow ridge (y: 0.56 to 0.62)
      if (y >= 0.56 && y <= 0.62 && cosT > 0.5) {
        const by = Math.sin(((y - 0.56) / 0.06) * Math.PI);
        rDelta += by * cosT * 0.026;
      }

      // D. Cheekbones (y: 0.38 to 0.48, absSin: 0.35 to 0.65)
      if (y >= 0.38 && y <= 0.48 && absSin >= 0.35 && absSin <= 0.65) {
        const cy = Math.sin(((y - 0.38) / 0.10) * Math.PI);
        const cx = Math.sin(((absSin - 0.35) / 0.30) * Math.PI);
        rDelta += cy * cx * 0.036;
      }

      // E. Soft Smiling Lips with Cupid's Bow (y: 0.24 to 0.32, absSin < 0.32)
      if (y >= 0.24 && y <= 0.32 && absSin < 0.32) {
        const my = (y - 0.24) / 0.08;
        const mx = 1 - absSin / 0.32;
        const lipPout = Math.sin(my * Math.PI) * mx * 0.038;
        const fissure = 1 - Math.abs(my - 0.5) / 0.16;
        rDelta += lipPout;
        if (fissure > 0) ao -= fissure * 0.22;
      }

      // F. Chin (y: 0.16 to 0.24, absSin < 0.30)
      if (y >= 0.16 && y <= 0.24 && absSin < 0.30) {
        const chy = Math.sin(((y - 0.16) / 0.08) * Math.PI);
        const chx = 1 - absSin / 0.30;
        rDelta += chy * chx * 0.046;
      }
    }
  } else if (y > -0.18) {
    // 3. Anatomical Neck & Beaded Necklace (-0.18 to 0.16)
    const t = (y - -0.18) / 0.34;
    rx = 0.22 - 0.04 * t;
    rz = 0.24 - 0.03 * t;
    cz = -0.04 * t - 0.02 * (1 - t);
    region = 'neck';

    // Hair still cascading down behind and around neck
    if (absSin > 0.65 || cosT < -0.1) {
      region = 'hair';
      rx += 0.14;
      rz += 0.12;
      rDelta += Math.sin(y * 10.0 + theta * 3.0) * 0.035;
    }

    // Beaded necklace loop around base of neck (y: -0.09 to -0.04, in front cosT > 0.3)
    if (y >= -0.09 && y <= -0.04 && cosT > 0.3) {
      const ny = Math.sin(((-0.04 - y) / 0.05) * Math.PI);
      rDelta += ny * 0.032;
      region = 'necklace';
    }
  } else if (y > -0.55) {
    // 4. Clavicles, Scooped Neckline & Sloping Shoulders (-0.55 to -0.18)
    const t = (-0.18 - y) / 0.37;
    const shoulderWidth = 0.24 + 0.98 * Math.pow(t, 0.65);
    rx = shoulderWidth;
    rz = 0.26 + 0.18 * t;
    cz = -0.02 * (1 - t);
    region = 'shoulders';

    // Exposed chest in scooped neckline (cosT > 0.6, y > -0.38)
    if (cosT > 0.6 && y > -0.38) {
      region = 'neck';
    }

    // Hair cascading across the front of the shoulders
    if ((sinT < -0.45 && sinT > -0.85) || (sinT > 0.40 && sinT < 0.80)) {
      if (cosT > 0.2 && y > -0.52) {
        region = 'hair';
        rDelta += Math.sin(y * 12.0) * 0.042;
      }
    }
  } else {
    // 5. Torso, Ribbed Top & Deltoids (-1.15 to -0.55)
    const t = (-0.55 - y) / 0.60;
    const taper = 1.0 - 0.28 * Math.pow(t, 1.3);
    rx = 1.22 * taper;
    rz = (0.42 - 0.06 * t) * taper;
    cz = -0.01;
    region = 'shoulders';

    // Ribbed knit fabric texture
    const ribbed = Math.sin(theta * 32.0) * 0.008;
    rDelta += ribbed;

    // Hair tips cascading on chest/arm
    if (absSin > 0.55 && y > -0.85 && cosT > 0.2) {
      region = 'hair';
      rDelta += Math.sin(y * 14.0) * 0.035;
    }
  }

  const denom = Math.hypot(rx * sinT, rz * cosT) || 1;
  const rad = Math.sqrt(Math.pow(rx * sinT, 2) + Math.pow(rz * cosT, 2)) + rDelta;
  const px = (rx / denom) * sinT * rad;
  const pz = cz + (rz / denom) * cosT * rad;

  // Approximate normal
  let nx = sinT;
  let ny = (y > 0.6 ? 0.3 : y < -0.3 ? -0.2 : 0.0);
  let nz = cosT;
  const nLen = Math.hypot(nx, ny, nz) || 1;

  return { px, py: y, pz, nx: nx / nLen, ny: ny / nLen, nz: nz / nLen, ao: Math.max(0.35, Math.min(1.0, ao)), region };
}

export function generateDenseHumanBustData(count: number): {
  positions: Float32Array;
  basePositions: Float32Array;
  normals: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
} {
  let seed = 0x8a3c9e17;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x100000000;
  };

  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  const NUM_RINGS = 360;
  const ringPerimeters = new Float32Array(NUM_RINGS);
  let totalPerimeter = 0;

  for (let r = 0; r < NUM_RINGS; r++) {
    const vr = r / (NUM_RINGS - 1);
    const yr = 1.25 - vr * 2.40;
    let perim = 0;
    let prevX = 0;
    let prevZ = 0;
    for (let s = 0; s <= 20; s++) {
      const th = (s / 20) * Math.PI * 2 - Math.PI;
      const pt = evaluateAnatomicalBustSurface(yr, th);
      if (s > 0) perim += Math.hypot(pt.px - prevX, pt.pz - prevZ);
      prevX = pt.px;
      prevZ = pt.pz;
    }
    ringPerimeters[r] = perim;
    totalPerimeter += perim;
  }

  const dy = 0.005;
  const dt = 0.01;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const targetArea = random() * totalPerimeter;
    let accum = 0;
    let chosenRing = 0;
    for (let r = 0; r < NUM_RINGS; r++) {
      accum += ringPerimeters[r];
      if (accum >= targetArea) {
        chosenRing = r;
        break;
      }
    }

    const ringFrac = (chosenRing + (random() - 0.5) * 0.95) / (NUM_RINGS - 1);
    const y = 1.25 - Math.max(0, Math.min(1, ringFrac)) * 2.40;
    const theta = (random() * 2 - 1) * Math.PI;

    const pt = evaluateAnatomicalBustSurface(y, theta);

    const pY1 = evaluateAnatomicalBustSurface(y + dy, theta);
    const pY0 = evaluateAnatomicalBustSurface(y - dy, theta);
    const pT1 = evaluateAnatomicalBustSurface(y, theta + dt);
    const pT0 = evaluateAnatomicalBustSurface(y, theta - dt);

    const tyX = (pY1.px - pY0.px) / (2 * dy);
    const tyY = (pY1.py - pY0.py) / (2 * dy);
    const tyZ = (pY1.pz - pY0.pz) / (2 * dy);

    const ttX = (pT1.px - pT0.px) / (2 * dt);
    const ttY = (pT1.py - pT0.py) / (2 * dt);
    const ttZ = (pT1.pz - pT0.pz) / (2 * dt);

    let nx = ttY * tyZ - ttZ * tyY;
    let ny = ttZ * tyX - ttX * tyZ;
    let nz = ttX * tyY - ttY * tyX;
    const nLen = Math.hypot(nx, ny, nz) || 1;
    nx /= nLen;
    ny /= nLen;
    nz /= nLen;

    const jitter = (random() - 0.5) * 0.006;
    const px = pt.px + nx * jitter;
    const py = pt.py + ny * jitter;
    const pz = pt.pz + nz * jitter;

    positions[i3] = px;
    positions[i3 + 1] = py;
    positions[i3 + 2] = pz;

    basePositions[i3] = px;
    basePositions[i3 + 1] = py;
    basePositions[i3 + 2] = pz;

    normals[i3] = nx;
    normals[i3 + 1] = ny;
    normals[i3 + 2] = nz;

    // Palette: white, blush-pink (#FF85A2), and lavender (#D8B4FE)
    const roll = random();
    let r = 0.96;
    let g = 0.98;
    let b = 1.0;

    if (pt.region === 'glasses') {
      // Dark, realistic, thin and understated frames
      r = 0.22 + roll * 0.08;
      g = 0.14 + roll * 0.06;
      b = 0.20 + roll * 0.08;
    } else if (pt.region === 'necklace') {
      // Shimmering pearl and blush pink
      r = 1.0;
      g = roll < 0.5 ? 0.95 : 0.65;
      b = roll < 0.5 ? 1.0 : 0.82;
    } else if (pt.region === 'hair') {
      // Hair: deep plum/amethyst base with radiant blush & lavender rim sparkle
      if (roll < 0.45) {
        // Blush pink rim (#FF85A2)
        r = 1.0;
        g = 0.55 + random() * 0.15;
        b = 0.72 + random() * 0.15;
      } else if (roll < 0.75) {
        // Lavender (#D8B4FE)
        r = 0.85 + random() * 0.12;
        g = 0.72 + random() * 0.15;
        b = 1.0;
      } else {
        // Crystalline white sparkle
        r = 0.96;
        g = 0.98;
        b = 1.0;
      }
    } else {
      // Face, neck & shoulders: soft warm rose & crystalline white
      if (roll < 0.55) {
        r = 0.98;
        g = 0.98;
        b = 1.0;
      } else if (roll < 0.85) {
        r = 1.0;
        g = 0.70;
        b = 0.82;
      } else {
        r = 0.88;
        g = 0.80;
        b = 0.98;
      }
    }

    const aoShade = Math.max(0.40, Math.min(1.0, pt.ao));
    colors[i3] = r * aoShade;
    colors[i3 + 1] = g * aoShade;
    colors[i3 + 2] = b * aoShade;

    sizes[i] = pt.region === 'glasses' ? 0.75 + random() * 0.4 : 0.55 + random() * 0.45;
    phases[i] = random() * Math.PI * 2;
  }

  return { positions, basePositions, normals, colors, sizes, phases };
}

export function generateFloatingAmbientData(count: number): {
  positions: Float32Array;
  basePositions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  speeds: Float32Array;
} {
  let seed = 0x51f38e2d;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x100000000;
  };

  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Distribute in a large 3D volume around the bust
    const radius = 2.5 + random() * 11.0;
    const theta = random() * Math.PI * 2;
    const y = (random() - 0.45) * 14.0;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius * 0.85 - 1.5;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    basePositions[i3] = x;
    basePositions[i3 + 1] = y;
    basePositions[i3 + 2] = z;

    // Palette: delicate white and soft glowing rose sparks
    const isPink = random() < 0.35;
    if (isPink) {
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.65;
      colors[i3 + 2] = 0.82;
    } else {
      colors[i3] = 0.85;
      colors[i3 + 1] = 0.88;
      colors[i3 + 2] = 0.98;
    }

    sizes[i] = 0.9 + random() * 1.5;
    phases[i] = random() * Math.PI * 2;
    speeds[i] = 0.4 + random() * 0.8;
  }

  return { positions, basePositions, colors, sizes, phases, speeds };
}

export const DEFAULT_PARTICLE_CONFIG: ParticleConfig = {
  count: 14000,
  p: 3,
  q: 7,
  radius: 2.8,
  tubeRadius: 1.15,
  noiseScale: 0.22,
};

/**
 * Generates an intricate twisted orbital cyber-manifold (trefoil/torus knot harmonic manifold)
 * representing interconnected security systems, network intelligence, and signal pathways.
 */
export function generateParticleData(config: Partial<ParticleConfig> = {}): {
  positions: Float32Array;
  basePositions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
} {
  const mergedConfig = { ...DEFAULT_PARTICLE_CONFIG, ...config };
  const { count, p, q, radius, tubeRadius, noiseScale } = mergedConfig;

  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  // Palette:
  // White: (0.95, 0.96, 1.0)
  // Cool Grey: (0.55, 0.60, 0.70)
  // Electric Ice Blue (#78E7FF): (0.47, 0.90, 1.0)
  // Ultraviolet (#A18AFF): (0.63, 0.54, 1.0)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Distribute along a twisted orbital torus curve
    const t = (i / count) * Math.PI * 2 * p;
    const r = radius * (0.85 + 0.3 * Math.sin(q * t / p));

    // Parametric torus knot center curve
    const cx = r * Math.cos(t);
    const cy = r * Math.sin(t);
    const cz = -radius * 0.7 * Math.sin((q * t) / p);

    // Cross-sectional tube dispersion with pseudo-random Gaussian-like distribution
    const angle = (i * 1.6180339887) % (Math.PI * 2);
    const tubeR = tubeRadius * (0.15 + 0.85 * Math.sqrt((i % 1000) / 1000));
    const noiseX = (Math.sin(i * 13.37) * 2 - 1) * noiseScale;
    const noiseY = (Math.cos(i * 17.73) * 2 - 1) * noiseScale;
    const noiseZ = (Math.sin(i * 29.11) * 2 - 1) * noiseScale;

    // Normal & binormal approximation
    const nx = Math.cos(angle) * tubeR + noiseX;
    const ny = Math.sin(angle) * (tubeR * 0.6) + noiseY;
    const nz = Math.sin(angle * 2) * (tubeR * 0.5) + noiseZ;

    const x = cx + nx;
    const y = cy + ny;
    const z = cz + nz;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    basePositions[i3] = x;
    basePositions[i3 + 1] = y;
    basePositions[i3 + 2] = z;

    // Color distribution:
    // 55% cool white / silver
    // 25% subtle muted slate grey
    // 12% electric ice blue (#78E7FF)
    // 8% ultraviolet (#A18AFF)
    const colorRoll = (i * 7 + 13) % 100;
    if (colorRoll < 55) {
      colors[i3] = 0.92;
      colors[i3 + 1] = 0.95;
      colors[i3 + 2] = 0.99;
      sizes[i] = 1.0 + ((i % 5) * 0.2);
    } else if (colorRoll < 80) {
      colors[i3] = 0.45;
      colors[i3 + 1] = 0.52;
      colors[i3 + 2] = 0.64;
      sizes[i] = 0.8 + ((i % 3) * 0.15);
    } else if (colorRoll < 92) {
      // Ice Blue #78E7FF -> [0.47, 0.90, 1.0]
      colors[i3] = 0.47;
      colors[i3 + 1] = 0.90;
      colors[i3 + 2] = 1.0;
      sizes[i] = 1.4 + ((i % 4) * 0.3);
    } else {
      // Violet #A18AFF -> [0.63, 0.54, 1.0]
      colors[i3] = 0.63;
      colors[i3 + 1] = 0.54;
      colors[i3 + 2] = 1.0;
      sizes[i] = 1.5 + ((i % 4) * 0.35);
    }

    phases[i] = (i * 0.05) % (Math.PI * 2);
  }

  return { positions, basePositions, colors, sizes, phases };
}

/**
 * Calculates pointer perturbation on a particle with smooth spring return.
 */
export function calculatePointerPerturbation(
  px: number,
  py: number,
  pz: number,
  baseX: number,
  baseY: number,
  baseZ: number,
  pointerX: number,
  pointerY: number,
  pointerZ: number,
  radius: number = 1.8,
  force: number = 0.9
): { dx: number; dy: number; dz: number } {
  const diffX = px - pointerX;
  const diffY = py - pointerY;
  const diffZ = pz - pointerZ;
  const distSq = diffX * diffX + diffY * diffY + diffZ * diffZ;
  const radSq = radius * radius;

  if (distSq < radSq && distSq > 0.0001) {
    const dist = Math.sqrt(distSq);
    const factor = (1.0 - dist / radius) * force;
    return {
      dx: (diffX / dist) * factor,
      dy: (diffY / dist) * factor,
      dz: (diffZ / dist) * factor,
    };
  }

  return { dx: 0, dy: 0, dz: 0 };
}

/**
 * Calculates bounding sphere radius of a positions array.
 */
export function computePositionsRadius(positions: Float32Array): number {
  let maxSq = 0;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    const sq = x * x + y * y + z * z;
    if (sq > maxSq) maxSq = sq;
  }
  return Math.sqrt(maxSq);
}
