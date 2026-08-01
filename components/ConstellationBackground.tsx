"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  twinkle: number;
};

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const mouse = { x: -10_000, y: -10_000, active: false };
    let particles: Particle[] = [];
    let frame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const particleCount = () => {
      const areaBased = Math.round((width * height) / 18_000);
      const max = coarsePointer ? 48 : 92;
      const min = coarsePointer ? 26 : 44;
      return Math.max(min, Math.min(max, areaBased));
    };

    const makeParticles = () => {
      particles = Array.from({ length: particleCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (coarsePointer ? 0.08 : 0.14),
        vy: (Math.random() - 0.5) * (coarsePointer ? 0.08 : 0.14),
        radius: Math.random() * 1.25 + 0.55,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const pointerLeave = () => {
      mouse.active = false;
      mouse.x = -10_000;
      mouse.y = -10_000;
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === "light";
      const particleRgb = isLight ? "23, 96, 128" : "154, 238, 255";
      const lineRgb = isLight ? "25, 125, 158" : "86, 224, 211";
      const connectionDistance = coarsePointer ? 96 : 126;
      const cursorRadius = coarsePointer ? 0 : 180;

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.twinkle += 0.014;

          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
          if (particle.y < -8) particle.y = height + 8;
          if (particle.y > height + 8) particle.y = -8;

          if (mouse.active) {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.hypot(dx, dy);
            if (distance < cursorRadius && distance > 1) {
              const pull = (1 - distance / cursorRadius) * 0.012;
              particle.vx += (dx / distance) * pull;
              particle.vy += (dy / distance) * pull;
            }
          }

          particle.vx *= 0.992;
          particle.vy *= 0.992;
          const speed = Math.hypot(particle.vx, particle.vy);
          if (speed > 0.52) {
            particle.vx = (particle.vx / speed) * 0.52;
            particle.vy = (particle.vy / speed) * 0.52;
          }
        }

        const glow = 0.36 + (Math.sin(particle.twinkle + time * 0.00045) + 1) * 0.18;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particleRgb}, ${glow})`;
        context.shadowColor = `rgba(${particleRgb}, .55)`;
        context.shadowBlur = 8;
        context.fill();
      }

      context.shadowBlur = 0;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > connectionDistance) continue;

          const cursorDistance = mouse.active
            ? Math.min(Math.hypot(a.x - mouse.x, a.y - mouse.y), Math.hypot(b.x - mouse.x, b.y - mouse.y))
            : Number.POSITIVE_INFINITY;
          const cursorBoost = cursorDistance < cursorRadius ? 1.7 : 0.58;
          const alpha = (1 - distance / connectionDistance) * 0.2 * cursorBoost;
          if (alpha < 0.018) continue;

          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(${lineRgb}, ${Math.min(alpha, 0.34)})`;
          context.lineWidth = cursorDistance < cursorRadius ? 0.85 : 0.48;
          context.stroke();
        }
      }

      if (mouse.active && !coarsePointer) {
        const nearby = particles
          .map((particle) => ({ particle, distance: Math.hypot(particle.x - mouse.x, particle.y - mouse.y) }))
          .filter(({ distance }) => distance < cursorRadius)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 9);

        for (const { particle, distance } of nearby) {
          context.beginPath();
          context.moveTo(mouse.x, mouse.y);
          context.lineTo(particle.x, particle.y);
          context.strokeStyle = `rgba(${lineRgb}, ${(1 - distance / cursorRadius) * 0.34})`;
          context.lineWidth = 0.85;
          context.stroke();
        }

        const gradient = context.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 86);
        gradient.addColorStop(0, `rgba(${lineRgb}, .13)`);
        gradient.addColorStop(1, `rgba(${lineRgb}, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(mouse.x, mouse.y, 86, 0, Math.PI * 2);
        context.fill();
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", pointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", pointerLeave);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      document.documentElement.removeEventListener("pointerleave", pointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-background" aria-hidden="true" />;
}
