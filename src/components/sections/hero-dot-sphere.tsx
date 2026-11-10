'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative dotted cluster behind the hero copy (design/home.jpg). Rendered on a canvas so the
 * dots stay crisp at any size — a repeating CSS radial-gradient background produces visible
 * moiré/noise at this dot density. Static (one draw per resize), so it costs nothing on the main
 * thread after layout settles and has no interaction with prefers-reduced-motion.
 */
export function HeroDotSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const spacing = 13;
      const radius = Math.min(width, height) / 2;
      const centerX = width / 2;
      const centerY = height / 2;
      const dotColor =
        getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim() ||
        '#161616';

      for (let y = 0; y <= height; y += spacing) {
        for (let x = 0; x <= width; x += spacing) {
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const normalized = distance / radius;
          if (normalized > 1) continue;

          // Denser/darker near the center, fading out toward the edge.
          const falloff = Math.pow(1 - normalized, 1.6);
          const opacity = falloff * 0.3;
          if (opacity < 0.012) continue;

          // Thin out the grid near the edge so the cluster reads as a soft circle, not a hard disc.
          const jitterKeep = normalized < 0.7 || (x + y) % (spacing * 2) === 0;
          if (!jitterKeep) continue;

          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    draw();

    const observer = new ResizeObserver(() => draw());
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
