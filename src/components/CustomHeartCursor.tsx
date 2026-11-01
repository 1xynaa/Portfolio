/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export function CustomHeartCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const heartRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  // Check if current device supports fine pointer (mouse/trackpad)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    setEnabled(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setEnabled(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Track pointer movement
    const onMouseMove = (e: MouseEvent) => {
      setVisible(true);
      const x = e.clientX;
      const y = e.clientY;

      if (heartRef.current) {
        heartRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Check distance moved to spawn stardust trail particles
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 4) {
        const count = Math.min(3, Math.floor(dist / 6) + 1);
        for (let i = 0; i < count; i++) {
          const t = i / count;
          const px = lastPosRef.current.x + dx * t + (Math.random() - 0.5) * 4;
          const py = lastPosRef.current.y + dy * t + (Math.random() - 0.5) * 4;
          const isPink = Math.random() < 0.65;

          particlesRef.current.push({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 0.8 - dx * 0.08,
            vy: (Math.random() - 0.5) * 0.8 - dy * 0.08 + 0.15,
            size: 1.2 + Math.random() * 2.2,
            alpha: 0.85,
            life: 0,
            maxLife: 24 + Math.random() * 16,
            color: isPink ? '255, 133, 162' : '255, 235, 245',
          });
        }
        lastPosRef.current = { x, y };
      }

      // Detect interactive elements for hover scale
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])')
        );
        setIsHovering(interactive);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Soft spark ripple on click
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 1.2 + Math.random() * 2.2;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.0 + Math.random() * 1.8,
          alpha: 1.0,
          life: 0,
          maxLife: 20 + Math.random() * 12,
          color: '255, 163, 184',
        });
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setVisible(false);
      }
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Particle animation loop
    let lastTime = performance.now();
    const renderTrail = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.0);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += delta;
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.size = Math.max(0.4, p.size * (1 - 0.025 * delta));
        p.alpha = Math.max(0, 1.0 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        // Draw soft glowing stardust circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.8})`;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(renderTrail);
    };

    animFrameRef.current = requestAnimationFrame(renderTrail);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* 1. Trailing Stardust Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[99998]"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 300ms ease' }}
      />

      {/* 2. Floating Glowing Heart Cursor */}
      <div
        ref={heartRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        <div
          className={`flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out ${
            isClicking ? 'scale-[0.82]' : isHovering ? 'scale-[1.32]' : 'scale-100'
          }`}
        >
          {/* Heart Icon with soft pulse & dual pink bloom */}
          <div className="relative animate-[heartbeat_2.4s_ease-in-out_infinite]">
            {/* Ambient outer halo */}
            <div className="absolute inset-0 -m-1 rounded-full bg-[#FF85A2]/30 blur-[6px]" />

            {/* Glowing Pink Heart SVG */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              className="relative text-[#FF85A2]"
              style={{
                filter: 'drop-shadow(0 0 5px rgba(255, 133, 162, 0.9)) drop-shadow(0 0 11px rgba(255, 133, 162, 0.55))',
              }}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
              />
            </svg>

            {/* Precision central stardust pinpoint for pixel-perfect clicking */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#FFF,0_0_8px_#FF85A2]" />
          </div>
        </div>
      </div>
    </>
  );
}
