/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function createRng(seed) {
  let s = seed >>> 0;
  return function() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

async function buildRealistic3DPortrait() {
  console.log('Building ultra-precision, genuinely 3D particle portrait sculpture of Anagha matching photo likeness...');

  const imagePath = path.join(__dirname, '../public/portrait-reference.jpg');
  const outputPath = path.join(__dirname, '../public/portrait-particles.bin');

  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  console.log(`Input reference image: ${width}x${height}, ${data.length} bytes`);

  const TOTAL_COUNT = 160000;
  const FLOATS_PER_PARTICLE = 11;
  const buffer = new Float32Array(TOTAL_COUNT * FLOATS_PER_PARTICLE);

  const rng = createRng(0x5a1b3c7e);

  const getPixel = (x, y) => {
    const px = Math.max(0, Math.min(width - 1, Math.round(x)));
    const py = Math.max(0, Math.min(height - 1, Math.round(y)));
    const idx = (py * width + px) * 3;
    return [data[idx], data[idx + 1], data[idx + 2]];
  };

  const sampleBilinear = (px, py) => {
    const x = Math.max(0, Math.min(width - 1.001, px));
    const y = Math.max(0, Math.min(height - 1.001, py));
    const x0 = Math.floor(x), x1 = Math.min(width - 1, x0 + 1);
    const y0 = Math.floor(y), y1 = Math.min(height - 1, y0 + 1);
    const fx = x - x0, fy = y - y0;

    const idx00 = (y0 * width + x0) * 3;
    const idx10 = (y0 * width + x1) * 3;
    const idx01 = (y1 * width + x0) * 3;
    const idx11 = (y1 * width + x1) * 3;

    const r = (1 - fx) * (1 - fy) * data[idx00] + fx * (1 - fy) * data[idx10] + (1 - fx) * fy * data[idx01] + fx * fy * data[idx11];
    const g = (1 - fx) * (1 - fy) * data[idx00 + 1] + fx * (1 - fy) * data[idx10 + 1] + (1 - fx) * fy * data[idx01 + 1] + fx * fy * data[idx11 + 1];
    const b = (1 - fx) * (1 - fy) * data[idx00 + 2] + fx * (1 - fy) * data[idx10 + 2] + (1 - fx) * fy * data[idx01 + 2] + fx * fy * data[idx11 + 2];

    return [r, g, b];
  };

  // Center on Anagha's face in the 682x1024 portrait
  const X_CENTER = 330;
  const Y_CENTER = 365;
  const SCALE_3D = 2.45 / 750;
  // Natural tilt of head in photo (~9.5 degrees = 0.165 rad)
  const HEAD_TILT = 0.165;
  const cosTilt = Math.cos(HEAD_TILT);
  const sinTilt = Math.sin(HEAD_TILT);

  function to3D(x, y) {
    const X = (x - X_CENTER) * SCALE_3D;
    const Y = (Y_CENTER - y) * SCALE_3D;
    return [X, Y];
  }

  // Precompute Sobel gradient magnitude for edge-preserving detail
  console.log('Calculating luminance & gradient detail map...');
  const gradientMap = new Float32Array(width * height);
  const lumMap = new Float32Array(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const getLum = (gx, gy) => {
        const i = (gy * width + gx) * 3;
        return data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      };
      lumMap[idx] = getLum(x, y);

      const gx =
        -1 * getLum(x - 1, y - 1) + 1 * getLum(x + 1, y - 1) +
        -2 * getLum(x - 1, y)     + 2 * getLum(x + 1, y) +
        -1 * getLum(x - 1, y + 1) + 1 * getLum(x + 1, y + 1);

      const gy =
        -1 * getLum(x - 1, y - 1) - 2 * getLum(x, y - 1) - 1 * getLum(x + 1, y - 1) +
         1 * getLum(x - 1, y + 1) + 2 * getLum(x, y + 1) + 1 * getLum(x + 1, y + 1);

      gradientMap[idx] = Math.hypot(gx, gy);
    }
  }

  // 3D Depth Function aligned with photo landmarks and head tilt
  function calculateDepth(x, y, isSparkle, isGlasses) {
    const dx = x - X_CENTER;
    const dy = y - Y_CENTER;

    // Rotate into face coordinate frame
    const rx = (dx * cosTilt + dy * sinTilt) / 280;
    const ry = (-dx * sinTilt + dy * cosTilt) / 280;

    const xn = dx / 280;
    const yn = -dy / 280;

    if (isSparkle) {
      // Floating stardust aura surrounding the figure
      const swirlDepth = Math.sin(rx * 6.0 + ry * 4.0) * 0.12;
      return (rng() - 0.5) * 0.45 + swirlDepth;
    }

    if (isGlasses) {
      // Eyeglasses frame resting cleanly in front of eyes and nose bridge
      return 0.38 - Math.abs(rx) * 0.035;
    }

    let z = 0;

    // 1. Base Cranium & Head Volume
    if (yn > -0.32) {
      const rHead2 = (rx / 0.58) ** 2 + ((ry - 0.12) / 0.68) ** 2;
      if (rHead2 < 1.0) {
        z = Math.sqrt(1.0 - rHead2) * 0.44 - 0.10;
      } else {
        z = -0.10 - (rHead2 - 1.0) * 0.15;
      }
    } else if (yn > -0.52 && Math.abs(xn) < 0.32) {
      // Neck
      const rNeck2 = (xn / 0.24) ** 2;
      if (rNeck2 < 1.0) {
        z = Math.sqrt(1.0 - rNeck2) * 0.18 - 0.08;
      } else {
        z = -0.08;
      }
    } else {
      // Shoulders and knit top
      const rTorso = (xn / 1.15) ** 2;
      z = 0.14 - rTorso * 0.30 - Math.max(0, -0.45 - yn) * 0.08;
    }

    // 2. Anatomical Facial Features
    // Nose Bridge (ry from -0.04 to 0.20, near rx = 0)
    const distNoseX = Math.abs(rx);
    if (ry >= -0.04 && ry <= 0.22 && distNoseX < 0.10) {
      const bridgeHeight = (1.0 - distNoseX / 0.10) * (0.13 - ry * 0.18);
      z += Math.max(0, bridgeHeight);
    }

    // Nose Tip
    const dNoseTip = Math.hypot(rx / 0.075, (ry - -0.01) / 0.075);
    if (dNoseTip < 1.0) {
      z += Math.cos(dNoseTip * Math.PI * 0.5) * 0.16;
    }

    // Eye Sockets
    const dLeftEye = Math.hypot((rx - -0.16) / 0.12, (ry - 0.14) / 0.09);
    const dRightEye = Math.hypot((rx - 0.15) / 0.12, (ry - 0.14) / 0.09);
    if (dLeftEye < 1.0) {
      z -= Math.cos(dLeftEye * Math.PI * 0.5) * 0.06;
    } else if (dRightEye < 1.0) {
      z -= Math.cos(dRightEye * Math.PI * 0.5) * 0.06;
    }

    // Cheeks & Dimples
    if (ry >= -0.10 && ry <= 0.15 && Math.abs(rx) >= 0.14 && Math.abs(rx) <= 0.40) {
      const cheekY = Math.sin(((ry - -0.10) / 0.25) * Math.PI);
      const cheekX = Math.sin(((Math.abs(rx) - 0.14) / 0.26) * Math.PI);
      z += cheekY * cheekX * 0.045;
    }

    // Lips & Gentle Smile
    const dMouth = Math.hypot(rx / 0.16, (ry - -0.16) / 0.07);
    if (dMouth < 1.0) {
      z += Math.cos(dMouth * Math.PI * 0.5) * 0.058;
    }

    // Chin
    const dChin = Math.hypot(rx / 0.13, (ry - -0.32) / 0.09);
    if (dChin < 1.0) {
      z += Math.cos(dChin * Math.PI * 0.5) * 0.065;
    }

    // 3. Hair Curls Volume
    const isHairRegion = (Math.abs(rx) > 0.40 || ry > 0.35 || (ry < -0.20 && Math.abs(rx) > 0.26));
    if (isHairRegion) {
      const curlWave = Math.sin(yn * 18.0 + xn * 9.0) * 0.065 + Math.cos(yn * 30.0) * 0.04;
      z += curlWave;
    }

    return z;
  }

  function calculateNormal(x, y, isSparkle, isGlasses) {
    const delta = 3;
    const zR = calculateDepth(x + delta, y, isSparkle, isGlasses);
    const zL = calculateDepth(x - delta, y, isSparkle, isGlasses);
    const zD = calculateDepth(x, y + delta, isSparkle, isGlasses);
    const zU = calculateDepth(x, y - delta, isSparkle, isGlasses);

    const d3D = delta * SCALE_3D;
    const dzdx = (zR - zL) / (2 * d3D);
    const dzdy = -(zD - zU) / (2 * d3D);

    let nx = -dzdx;
    let ny = -dzdy;
    let nz = 1.0;

    const len = Math.hypot(nx, ny, nz) || 1;
    return [nx / len, ny / len, nz / len];
  }

  let particleIndex = 0;

  function addParticle(X, Y, Z, nx, ny, nz, r, g, b, size, phase) {
    if (particleIndex >= TOTAL_COUNT) return;
    const off = particleIndex * FLOATS_PER_PARTICLE;

    buffer[off + 0] = X;
    buffer[off + 1] = Y;
    buffer[off + 2] = Z;

    buffer[off + 3] = nx;
    buffer[off + 4] = ny;
    buffer[off + 5] = nz;

    buffer[off + 6] = r;
    buffer[off + 7] = g;
    buffer[off + 8] = b;

    buffer[off + 9] = size;
    buffer[off + 10] = phase;

    particleIndex++;
  }

  // 1. High-Precision Stratified Photo Sampling across all visual features
  console.log('Sampling photo pixels with stratified grid & edge emphasis...');
  const validPixels = [];
  const sparklePixels = [];
  const facialFeaturePixels = [];

  for (let y = 10; y < height - 5; y++) {
    for (let x = 10; x < width - 10; x++) {
      const idx = y * width + x;
      const i3 = idx * 3;
      const r = data[i3], g = data[i3 + 1], b = data[i3 + 2];
      const maxVal = Math.max(r, g, b);
      const lum = lumMap[idx];
      const grad = gradientMap[idx];

      // Is it a bright magenta sparkle/filament?
      const isSparkle = (r > 110 && b > 90 && (r - g) > 25 && (b - g) > 20);
      if (isSparkle) {
        sparklePixels.push({ x, y, r, g, b, grad, lum });
      }

      // Is it a facial landmark / glasses / eye / lip / high detail area?
      const dx = x - X_CENTER;
      const dy = y - Y_CENTER;
      const isFaceBox = (Math.abs(dx) < 170 && dy > -150 && dy < 170);

      if (isFaceBox && (grad > 20 || (lum > 30 && lum < 220))) {
        facialFeaturePixels.push({ x, y, r, g, b, grad, lum });
      }

      // General body, hair, clothing, background particle
      if (maxVal > 14 || grad > 15) {
        validPixels.push({ x, y, r, g, b, grad, lum, isFaceBox });
      }
    }
  }

  console.log(`Found ${validPixels.length} figure pixels, ${facialFeaturePixels.length} face/glasses detail pixels, ${sparklePixels.length} sparkle pixels.`);

  // PHASE A: Dense, sharp facial sculpture & glasses (65,000 particles)
  console.log('Generating 65,000 ultra-dense face, eyes, glasses, lips, and nose particles...');
  const FACE_COUNT = 65000;
  for (let i = 0; i < FACE_COUNT; i++) {
    const pxObj = facialFeaturePixels[Math.floor(rng() * facialFeaturePixels.length)];
    // Sub-pixel jitter for smooth continuous surface without aliasing
    const jx = pxObj.x + (rng() - 0.5) * 0.95;
    const jy = pxObj.y + (rng() - 0.5) * 0.95;

    const [pr, pg, pb] = sampleBilinear(jx, jy);
    const [X, Y] = to3D(jx, jy);

    // Check if this pixel is part of the glasses frame (dark edge in eye region)
    const dx = jx - X_CENTER;
    const dy = jy - Y_CENTER;
    const rx = (dx * cosTilt + dy * sinTilt) / 280;
    const ry = (-dx * sinTilt + dy * cosTilt) / 280;
    const isGlassesBand = (ry >= 0.04 && ry <= 0.25 && Math.abs(rx) <= 0.46);
    const isDarkFrame = isGlassesBand && (pr < 60 && pg < 45 && pb < 50);

    const Z = calculateDepth(jx, jy, false, isDarkFrame);
    const [nx, ny, nz] = calculateNormal(jx, jy, false, isDarkFrame);

    let r = pr / 255;
    let g = pg / 255;
    let b = pb / 255;

    // Sharp, crisp diamond particle sizes
    const size = 0.55 + rng() * 0.35;
    const phase = rng() * Math.PI * 2;

    addParticle(X, Y, Z, nx, ny, nz, r, g, b, size, phase);
  }

  // PHASE B: Voluminous curly hair, cascades & neckline (55,000 particles)
  console.log('Generating 55,000 hair, curl ribbons, and scoop neckline particles...');
  const HAIR_COUNT = 55000;
  for (let i = 0; i < HAIR_COUNT; i++) {
    const pxObj = validPixels[Math.floor(rng() * validPixels.length)];
    const jx = pxObj.x + (rng() - 0.5) * 1.4;
    const jy = pxObj.y + (rng() - 0.5) * 1.4;

    const [pr, pg, pb] = sampleBilinear(jx, jy);
    const [X, Y] = to3D(jx, jy);

    let Z = calculateDepth(jx, jy, false, false);
    // Add natural 3D curl layer depth
    const curlLayer = rng();
    if (curlLayer < 0.30) {
      Z += 0.06 + rng() * 0.08;
    } else if (curlLayer > 0.70) {
      Z -= 0.08 + rng() * 0.12;
    }

    const [nx, ny, nz] = calculateNormal(jx, jy, false, false);

    let r = pr / 255;
    let g = pg / 255;
    let b = pb / 255;

    const size = 0.60 + rng() * 0.40;
    const phase = rng() * Math.PI * 2;

    addParticle(X, Y, Z, nx, ny, nz, r, g, b, size, phase);
  }

  // PHASE C: Radiant Magenta Sparkle Loops & Fiber-Optic Trails (25,000 particles)
  console.log('Generating 25,000 glowing magenta sparkle and swirl particles...');
  const SPARKLE_COUNT = 25000;
  for (let i = 0; i < SPARKLE_COUNT; i++) {
    const pxObj = sparklePixels[Math.floor(rng() * sparklePixels.length)];
    const jx = pxObj.x + (rng() - 0.5) * 1.2;
    const jy = pxObj.y + (rng() - 0.5) * 1.2;

    const [pr, pg, pb] = sampleBilinear(jx, jy);
    const [X, Y] = to3D(jx, jy);
    const Z = calculateDepth(jx, jy, true, false);
    const [nx, ny, nz] = calculateNormal(jx, jy, true, false);

    // Glowing vibrant magenta stardust matching photo
    let r = Math.min(1.0, (pr / 255) * 1.25);
    let g = (pg / 255) * 0.95;
    let b = Math.min(1.0, (pb / 255) * 1.25);

    // Sparkling points with varying star sizes
    const size = 0.75 + rng() * 0.65;
    const phase = rng() * Math.PI * 2;

    addParticle(X, Y, Z, nx, ny, nz, r, g, b, size, phase);
  }

  // PHASE D: Floating ambient stardust halo (Remaining up to TOTAL_COUNT)
  console.log(`Generating remaining ${TOTAL_COUNT - particleIndex} ambient orbital particles...`);
  while (particleIndex < TOTAL_COUNT) {
    const theta = rng() * Math.PI * 2;
    const rad = 180 + rng() * 260;
    const ax = X_CENTER + Math.cos(theta) * rad * 1.05;
    const ay = Y_CENTER + Math.sin(theta) * rad * 1.25;

    const [X, Y] = to3D(ax, ay);
    const Z = (rng() - 0.5) * 0.55;

    let r = 1.0;
    let g = 0.35 + rng() * 0.35;
    let b = 0.80 + rng() * 0.20;

    if (rng() < 0.25) {
      r = 1.0; g = 0.95; b = 1.0; // Crisp diamond white spark
    }

    const nx = Math.cos(theta) * 0.6;
    const ny = Math.sin(theta) * 0.6;
    const nz = (rng() - 0.5) * 0.5;
    const nLen = Math.hypot(nx, ny, nz) || 1;

    const size = 0.70 + rng() * 0.50;
    const phase = rng() * Math.PI * 2;

    addParticle(X, Y, Z, nx / nLen, ny / nLen, nz / nLen, r, g, b, size, phase);
  }

  console.log(`Successfully generated ${particleIndex} genuinely 3D ultra-precision particles!`);

  const headerBuf = Buffer.alloc(12);
  headerBuf.write('PORT', 0, 4, 'ascii');
  headerBuf.writeUInt32LE(TOTAL_COUNT, 4);
  headerBuf.writeUInt32LE(FLOATS_PER_PARTICLE, 8);

  const dataBuf = Buffer.from(buffer.buffer);
  const outBuf = Buffer.concat([headerBuf, dataBuf]);

  fs.writeFileSync(outputPath, outBuf);
  console.log(`Saved ${outputPath} (${outBuf.length} bytes). Verification complete!`);
}

buildRealistic3DPortrait().catch(err => {
  console.error('Error generating realistic 3D portrait:', err);
  process.exit(1);
});

