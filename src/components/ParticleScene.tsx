'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { generateDenseHumanBustData, generateFloatingAmbientData } from '../utils/particleMath.ts';

interface ParticleSceneProps {
  reducedMotion?: boolean;
  showHero?: boolean;
  chapterIndex?: number;
  continuousProgress?: number;
  isOpening?: boolean;
}

// -------------------------------------------------------------
// Shaders for the High-Definition 3D Particle Portrait Sculpture
// -------------------------------------------------------------
const bustVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uPointer;
  uniform float uPointerRadius;
  uniform float uPointerStrength;
  uniform float uBackdropFade;

  attribute vec3 aBasePosition;
  attribute vec3 aNormal;
  attribute float aSize;
  attribute float aPhase;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDisturbed;

  void main() {
    vec3 normal = normalize(aNormal);
    
    // Subtle anatomical breathing and micro-shimmer
    float breathe = sin(uTime * 1.15 + aPhase) * 0.008;
    vec3 pos = aBasePosition + normal * breathe;

    // Distance to pointer in local 3D bust space
    vec3 diff = pos - uPointer;
    float dist3D = length(vec3(diff.xy, diff.z * 1.15));
    
    // Continuous smoothstep influence
    float influence = smoothstep(uPointerRadius, 0.0, dist3D) * uPointerStrength;
    vDisturbed = influence;

    if (influence > 0.001) {
      // Primary scatter outward from pointer
      vec3 away = normalize(diff + vec3(0.0, 0.0, 0.22));
      
      // 3D rotational curl vortex around cursor
      vec3 swirl = vec3(-diff.y, diff.x, sin(diff.x * 4.5 + uTime * 2.8) * 0.45);
      if (length(swirl) > 0.001) {
        swirl = normalize(swirl);
      }
      
      float pulse = 1.0 + 0.22 * sin(uTime * 3.6 + aPhase);
      float scatterDist = influence * 1.35 * pulse;
      float swirlDist = influence * 0.85;
      
      pos += away * scatterDist + swirl * swirlDist;
    }

    vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    
    // Ultra-crisp diamond micro-particles with perspective scaling
    float sizeMultiplier = 1.0 + influence * 0.35;
    gl_PointSize = clamp(aSize * 1.55 * sizeMultiplier * uPixelRatio * (5.5 / -viewPosition.z), 1.2, 5.2);

    // Directional key light with subtle rim reflection
    vec3 keyDir = normalize(vec3(-0.25, 0.70, 0.75));
    vec3 rimDir = normalize(vec3(0.75, 0.25, -0.60));
    
    float keyLight = max(dot(normal, keyDir), 0.0);
    float rimLight = pow(clamp(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 1.8);
    
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    
    // Preserves authentic photographic likeness
    vec3 litColor = color * (0.92 + keyLight * 0.22);
    
    // Delicate pink rim shimmer on hair silhouette
    vec3 pinkRim = vec3(1.0, 0.40, 0.80) * (rimLight * 0.35 * smoothstep(0.18, 0.75, lum));
    litColor += pinkRim;
    
    // Excitation glow on hover interaction
    vec3 roseExcitation = vec3(1.0, 0.50, 0.88);
    vColor = mix(litColor, roseExcitation, influence * 0.75);
    
    // Depth fade + story backdrop fade
    float baseAlpha = smoothstep(-18.0, -1.0, viewPosition.z) * 0.95;
    vAlpha = baseAlpha * mix(1.0, 0.18, uBackdropFade);
  }
`;

const bustFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDisturbed;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Crisp, anti-aliased circular particle with solid core (no blurry pixelation)
    float circle = smoothstep(0.5, 0.35, dist);
    float alpha = circle * vAlpha;
    
    // Brilliant crystalline diamond glint
    float core = exp(-dist * dist * 18.0);
    float lum = dot(vColor, vec3(0.299, 0.587, 0.114));
    vec3 col = mix(vColor, vec3(1.0, 0.96, 1.0), core * clamp(lum * 0.35, 0.0, 0.25));
    
    gl_FragColor = vec4(col, alpha);
  }
`;

// -------------------------------------------------------------
// Shaders for Ambient Environmental Floating Particles
// -------------------------------------------------------------
const ambientVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uPointer;
  uniform float uPointerStrength;

  attribute vec3 aBasePosition;
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // 3D floating drifting waves
    vec3 pos = aBasePosition;
    pos.x += sin(uTime * 0.35 * aSpeed + aPhase) * 0.8;
    pos.y += cos(uTime * 0.42 * aSpeed + aPhase) * 0.8;
    pos.z += sin(uTime * 0.28 * aSpeed + aPhase * 2.0) * 0.6;

    // Cursor attraction: environmental particles follow and swirl around cursor in flowing trails
    vec3 diff = uPointer - pos;
    float dist = length(diff);
    float attractRadius = 5.5;
    
    if (dist < attractRadius && dist > 0.1) {
      float force = (1.0 - dist / attractRadius) * uPointerStrength * 0.85;
      vec3 dir = diff / dist;
      vec3 swirl = vec3(-dir.y, dir.x, sin(uTime * 3.0 + aPhase) * 0.35);
      pos += (dir * 0.95 + swirl * 0.75) * force;
    }

    vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    
    gl_PointSize = clamp(aSize * 2.0 * uPixelRatio * (7.5 / -viewPosition.z), 1.0, 12.0);
    
    // Twinkling alpha with gentle ambient ceiling so text remains effortless to read
    float twinkle = 0.5 + 0.5 * sin(uTime * 1.5 * aSpeed + aPhase);
    vColor = color;
    vAlpha = smoothstep(-25.0, -2.0, viewPosition.z) * 0.30 * twinkle;
  }
`;

const ambientFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float glow = 1.0 - smoothstep(0.05, 0.5, dist);
    gl_FragColor = vec4(vColor, pow(glow, 1.6) * vAlpha);
  }
`;

// -------------------------------------------------------------
// Integrated 3D Scene Components
// -------------------------------------------------------------
interface SceneFieldProps {
  bustCount: number;
  ambientCount: number;
  reducedMotion: boolean;
  isHero: boolean;
  chapterIndex?: number;
  continuousProgress?: number;
  isOpening?: boolean;
}

function SceneField({ bustCount, ambientCount, reducedMotion, isHero, chapterIndex, continuousProgress, isOpening }: SceneFieldProps) {
  const bustGroup = useRef<THREE.Group>(null);
  const bustGeometryRef = useRef<THREE.BufferGeometry>(null);
  const pointerNdc = useRef(new THREE.Vector2(9999, 9999));
  const pointerActive = useRef(false);
  const lastActiveTime = useRef(0);
  const elapsed = useRef(0);
  
  const pointerWorld = useMemo(() => new THREE.Vector3(), []);
  const currentPointerBust = useMemo(() => new THREE.Vector3(9999, 9999, 0), []);
  const targetPointerBust = useMemo(() => new THREE.Vector3(9999, 9999, 0), []);
  const currentPointerWorld = useMemo(() => new THREE.Vector3(9999, 9999, 0), []);
  const targetPointerWorld = useMemo(() => new THREE.Vector3(9999, 9999, 0), []);
  const targetCamera = useMemo(() => new THREE.Vector3(0, 0, 4.65), []);
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

  const interactionPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );
  
  const { camera, raycaster, invalidate, size } = useThree();

  // 1. Initial Bust Data (procedural fallback rendered immediately)
  const bustData = useMemo(() => generateDenseHumanBustData(bustCount), [bustCount]);
  const bustGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(bustData.positions, 3));
    geom.setAttribute('aBasePosition', new THREE.BufferAttribute(bustData.basePositions, 3));
    geom.setAttribute('aNormal', new THREE.BufferAttribute(bustData.normals, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(bustData.colors, 3));
    geom.setAttribute('aSize', new THREE.BufferAttribute(bustData.sizes, 1));
    geom.setAttribute('aPhase', new THREE.BufferAttribute(bustData.phases, 1));
    geom.computeBoundingSphere();
    return geom;
  }, [bustData]);

  // Load High-Precision 3D Precomputed Reference Model
  useEffect(() => {
    let active = true;
    fetch('/portrait-particles.bin')
      .then(async (res) => {
        if (!res.ok) return;
        const buffer = await res.arrayBuffer();
        if (!active) return;
        const view = new DataView(buffer);
        const count = view.getUint32(4, true);
        const stride = view.getUint32(8, true);
        const floats = new Float32Array(buffer, 12, count * stride);

        const positions = new Float32Array(count * 3);
        const basePositions = new Float32Array(count * 3);
        const normals = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const phases = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          const i11 = i * stride;
          const i3 = i * 3;
          positions[i3] = floats[i11];
          positions[i3 + 1] = floats[i11 + 1];
          positions[i3 + 2] = floats[i11 + 2];

          basePositions[i3] = floats[i11];
          basePositions[i3 + 1] = floats[i11 + 1];
          basePositions[i3 + 2] = floats[i11 + 2];

          normals[i3] = floats[i11 + 3];
          normals[i3 + 1] = floats[i11 + 4];
          normals[i3 + 2] = floats[i11 + 5];

          colors[i3] = floats[i11 + 6];
          colors[i3 + 1] = floats[i11 + 7];
          colors[i3 + 2] = floats[i11 + 8];

          sizes[i] = floats[i11 + 9];
          phases[i] = floats[i11 + 10];
        }

        const targetGeom = bustGeometryRef.current;
        if (targetGeom) {
          targetGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          targetGeom.setAttribute('aBasePosition', new THREE.BufferAttribute(basePositions, 3));
          targetGeom.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3));
          targetGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          targetGeom.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
          targetGeom.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
          targetGeom.setDrawRange(0, Math.min(count, bustCount));
          targetGeom.computeBoundingSphere();
          targetGeom.attributes.position.needsUpdate = true;
          invalidate();
        }
      })
      .catch((err) => {
        console.warn('Using procedural portrait generator:', err);
      });

    return () => {
      active = false;
    };
  }, [bustCount, invalidate]);

  // 2. Ambient Floating Stardust Data
  const ambientData = useMemo(() => generateFloatingAmbientData(ambientCount), [ambientCount]);
  const ambientGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(ambientData.positions, 3));
    geom.setAttribute('aBasePosition', new THREE.BufferAttribute(ambientData.basePositions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(ambientData.colors, 3));
    geom.setAttribute('aSize', new THREE.BufferAttribute(ambientData.sizes, 1));
    geom.setAttribute('aPhase', new THREE.BufferAttribute(ambientData.phases, 1));
    geom.setAttribute('aSpeed', new THREE.BufferAttribute(ambientData.speeds, 1));
    geom.computeBoundingSphere();
    return geom;
  }, [ambientData]);

  // Uniforms
  const bustUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2.0) },
      uPointer: { value: new THREE.Vector3(9999, 9999, 0) },
      uPointerRadius: { value: 2.4 },
      uPointerStrength: { value: 0 },
      uBackdropFade: { value: 0 },
    }),
    []
  );

  const ambientUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2.0) },
      uPointer: { value: new THREE.Vector3(9999, 9999, 0) },
      uPointerStrength: { value: 0 },
    }),
    []
  );

  // Global Pointer & Touch Tracking
  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(clientY / window.innerHeight) * 2 + 1;
      pointerNdc.current.set(ndcX, ndcY);
      pointerActive.current = true;
      lastActiveTime.current = performance.now();
      invalidate();
    };

    const handlePointerMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        pointerActive.current = false;
        pointerNdc.current.set(9999, 9999);
        invalidate();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [invalidate]);

  const isMobile = size.width < 640;
  const isTablet = size.width < 1024;
  
  const baseScale = isMobile ? 0.95 : isTablet ? 1.05 : 1.18;

  useFrame((_, delta) => {
    const frameDelta = Math.min(delta, 0.05);
    if (!reducedMotion) elapsed.current += frameDelta;
    
    bustUniforms.uTime.value = elapsed.current;
    ambientUniforms.uTime.value = elapsed.current;

    // Continuous Cinematic Camera & Pose Interpolation
    let chPos: [number, number, number];
    let chScale: number;
    let chFade: number;
    let chCameraZ: number;

    if (isOpening) {
      chPos = isMobile ? [0.0, -0.06, 0.0] : [0.0, -0.05, 0.0];
      chScale = baseScale * 1.15;
      chFade = 0.0;
      chCameraZ = 4.40;
    } else {
      const CHAPTER_POSES = [
        // 0: Who Am I? (Desktop: pushed far right to leave entire left 60% open for text)
        { pos: [0.82, -0.12, 0.0] as [number, number, number], posMobile: [0.0, 0.05, -1.5] as [number, number, number], scaleMult: 0.95, fade: 0.0, cameraZ: 4.65 },
        // 1: Where It Began (Kerala)
        { pos: [0.85, -0.08, -0.70] as [number, number, number], posMobile: [0.0, 0.08, -1.6] as [number, number, number], scaleMult: 0.85, fade: 0.45, cameraZ: 4.80 },
        // 2: A Place Called Home (Qatar)
        { pos: [-0.85, -0.08, -0.85] as [number, number, number], posMobile: [0.0, -0.08, -1.6] as [number, number, number], scaleMult: 0.82, fade: 0.50, cameraZ: 4.85 },
        // 3: A New Chapter (Chennai)
        { pos: [0.85, -0.10, -0.90] as [number, number, number], posMobile: [0.0, 0.10, -1.6] as [number, number, number], scaleMult: 0.80, fade: 0.50, cameraZ: 4.85 },
        // 4: The Tech Plot Twist
        { pos: [-0.85, -0.06, -1.05] as [number, number, number], posMobile: [0.0, -0.10, -1.6] as [number, number, number], scaleMult: 0.75, fade: 0.55, cameraZ: 4.95 },
        // 5: Things I've Built (Workbench takes wide view, bust pushed back)
        { pos: [-0.85, -0.10, -1.35] as [number, number, number], posMobile: [0.0, -0.15, -1.7] as [number, number, number], scaleMult: 0.68, fade: 0.68, cameraZ: 5.20 },
        // 6: Hackathons & Competitions (Wide 3-col card grid, bust recessed)
        { pos: [0.85, -0.08, -1.35] as [number, number, number], posMobile: [0.0, 0.12, -1.7] as [number, number, number], scaleMult: 0.68, fade: 0.68, cameraZ: 5.20 },
        // 7: What I Know (Constellation & timeline, bust recessed)
        { pos: [0.85, -0.08, -1.35] as [number, number, number], posMobile: [0.0, 0.12, -1.7] as [number, number, number], scaleMult: 0.68, fade: 0.68, cameraZ: 5.20 },
        // 8: What's Next? (Re-centers gracefully for conclusion)
        { pos: [0.0, -0.08, -0.6] as [number, number, number], posMobile: [0.0, 0.0, -0.8] as [number, number, number], scaleMult: 0.95, fade: 0.35, cameraZ: 4.75 },
      ];

      const progressVal = continuousProgress !== undefined ? continuousProgress : (chapterIndex ?? (isHero ? 0 : 1));
      const clampedProgress = Math.max(0, Math.min(CHAPTER_POSES.length - 1, progressVal));
      const idx = Math.floor(clampedProgress);
      const nextIdx = Math.min(CHAPTER_POSES.length - 1, idx + 1);
      const blend = clampedProgress - idx;
      const ease = blend * blend * (3 - 2 * blend);

      const poseA = CHAPTER_POSES[idx];
      const poseB = CHAPTER_POSES[nextIdx];

      const pA = isMobile ? poseA.posMobile : poseA.pos;
      const pB = isMobile ? poseB.posMobile : poseB.pos;

      chPos = [
        pA[0] + (pB[0] - pA[0]) * ease,
        pA[1] + (pB[1] - pA[1]) * ease,
        pA[2] + (pB[2] - pA[2]) * ease,
      ];
      chScale = baseScale * (poseA.scaleMult + (poseB.scaleMult - poseA.scaleMult) * ease);
      chFade = poseA.fade + (poseB.fade - poseA.fade) * ease;
      chCameraZ = poseA.cameraZ + (poseB.cameraZ - poseA.cameraZ) * ease;
    }

    bustUniforms.uBackdropFade.value += (chFade - bustUniforms.uBackdropFade.value) * (1 - Math.exp(-frameDelta * 3.5));

    const now = performance.now();
    const isRecentlyActive = pointerActive.current && now - lastActiveTime.current < 2500;

    if (isRecentlyActive && Math.abs(pointerNdc.current.x) < 2) {
      raycaster.setFromCamera(pointerNdc.current, camera);
      if (raycaster.ray.intersectPlane(interactionPlane, pointerWorld)) {
        targetPointerWorld.copy(pointerWorld);
        targetPointerBust.copy(pointerWorld);
        if (bustGroup.current) {
          bustGroup.current.updateMatrixWorld();
          bustGroup.current.worldToLocal(targetPointerBust);
        }
      }
      
      const portraitCenterX = isMobile ? 0.0 : chPos[0];
      const portraitCenterY = chPos[1];
      const distToBust = Math.hypot(pointerNdc.current.x - portraitCenterX, pointerNdc.current.y - portraitCenterY);
      const zoomFactor = Math.max(0.0, Math.min(1.0, 1.0 - distToBust / 1.3));
      const targetZ = chCameraZ - zoomFactor * 0.55;

      targetCamera.set(pointerNdc.current.x * 0.28, pointerNdc.current.y * 0.18, targetZ);

      targetRotation.current.set(
        -pointerNdc.current.y * 0.24 + Math.sin(elapsed.current * 0.16) * 0.02,
        pointerNdc.current.x * 0.36 + Math.sin(elapsed.current * 0.12) * 0.03,
        0
      );
      targetPosition.current.set(
        chPos[0] + pointerNdc.current.x * 0.10,
        chPos[1] + pointerNdc.current.y * 0.06,
        chPos[2]
      );
    } else {
      targetPointerBust.set(9999, 9999, 0);
      targetPointerWorld.set(9999, 9999, 0);
      targetCamera.set(0, 0, chCameraZ);
      targetRotation.current.set(
        Math.sin(elapsed.current * 0.16) * 0.02,
        Math.sin(elapsed.current * 0.12) * 0.03,
        0
      );
      targetPosition.current.set(...chPos);
    }

    const pointerEase = 1 - Math.exp(-frameDelta * 10);
    currentPointerBust.lerp(targetPointerBust, pointerEase);
    bustUniforms.uPointer.value.copy(currentPointerBust);

    currentPointerWorld.lerp(targetPointerWorld, pointerEase);
    ambientUniforms.uPointer.value.copy(currentPointerWorld);

    const desiredStrength = isRecentlyActive ? 1.0 : 0.0;
    const strengthStep = (desiredStrength - bustUniforms.uPointerStrength.value) * (1 - Math.exp(-frameDelta * 8));
    bustUniforms.uPointerStrength.value += strengthStep;
    ambientUniforms.uPointerStrength.value += strengthStep;

    if (reducedMotion) {
      camera.position.set(0, 0, chCameraZ);
      if (bustGroup.current) {
        bustGroup.current.position.set(...chPos);
        bustGroup.current.rotation.set(0, 0, 0);
      }
      if (bustUniforms.uPointerStrength.value > 0.01) invalidate();
    } else {
      camera.position.lerp(targetCamera, 1 - Math.exp(-frameDelta * 3.6));
      if (bustGroup.current) {
        const followSpeed = 1 - Math.exp(-frameDelta * 4.2);
        bustGroup.current.rotation.x += (targetRotation.current.x - bustGroup.current.rotation.x) * followSpeed;
        bustGroup.current.rotation.y += (targetRotation.current.y - bustGroup.current.rotation.y) * followSpeed;
        bustGroup.current.position.lerp(targetPosition.current, followSpeed);
        bustGroup.current.scale.lerp(new THREE.Vector3(chScale, chScale, chScale), followSpeed);
      }
    }
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* 1. Ambient Floating Stardust Field */}
      <points geometry={ambientGeometry}>
        <shaderMaterial
          vertexShader={ambientVertexShader}
          fragmentShader={ambientFragmentShader}
          uniforms={ambientUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* 2. Genuinely 3D Anatomical Particle Portrait Sculpture of Anagha */}
      <group ref={bustGroup} position={[0.28, -0.04, 0]} scale={baseScale}>
        <points ref={() => {}} geometry={bustGeometry}>
          <primitive object={bustGeometry} ref={bustGeometryRef} attach="geometry" />
          <shaderMaterial
            vertexShader={bustVertexShader}
            fragmentShader={bustFragmentShader}
            uniforms={bustUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors
          />
        </points>
      </group>
    </>
  );
}

export function ParticleScene({
  reducedMotion = false,
  showHero = true,
  chapterIndex = 0,
  continuousProgress,
  isOpening = false,
}: ParticleSceneProps) {
  const [counts, setCounts] = React.useState({ bust: 160000, ambient: 4200 });

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCounts({ bust: 60000, ambient: 1800 });
      } else if (width < 1024) {
        setCounts({ bust: 100000, ambient: 2800 });
      } else {
        setCounts({ bust: 160000, ambient: 4200 });
      }
    };
    updateCount();
    window.addEventListener('resize', updateCount, { passive: true });
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-[#030305]"
      role="img"
      aria-label="A genuine, high-definition 3D particle portrait sculpture of Anagha Mithra with glasses, voluminous wavy hair, middle-parted bangs, necklace, and shoulders, formed from over 160,000 crystalline particles that dynamically tilt, zoom, scatter, and swirl in real 3D perspective."
    >
      {/* Ghost Backdrop Typography matching reference screenshot */}
      <div
        aria-hidden="true"
        className={`hero-backdrop-type transition-opacity duration-700 ${showHero || isOpening ? 'opacity-100' : 'opacity-0'}`}
      >
        {isOpening ? 'HELLO, THIS IS ANAGHA' : 'ANAGHA MITHRA'}
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        camera={{ position: [0, 0, 4.65], fov: 42 }}
        dpr={[1, 2]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        fallback={
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#94A3B8]">
            3D WebGL particle visualization is unavailable in this browser.
          </div>
        }
      >
        <SceneField
          bustCount={counts.bust}
          ambientCount={counts.ambient}
          reducedMotion={reducedMotion}
          isHero={showHero}
          chapterIndex={chapterIndex}
          continuousProgress={continuousProgress}
          isOpening={isOpening}
        />
      </Canvas>

      {/* Subtle Cinematic Vignette with Soft Rose Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,rgba(3,3,5,0.72)_100%)]"
      />
    </div>
  );
}


