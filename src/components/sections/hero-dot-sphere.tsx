'use client';

import { useEffect, useRef } from 'react';

const CHARS = '░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯';

/**
 * Rotating ASCII-character sphere behind the hero copy (design/home.jpg). Each point on a unit
 * sphere is rotated on two axes per frame and projected to 2D; a monospace block/line-drawing
 * character is picked per point by depth, then points are painter's-algorithm sorted (back to
 * front) so nearer characters draw over farther ones and fade in as they rotate toward the
 * viewer.
 */
export function HeroDotSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const foreground =
        getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim() ||
        '#080503';
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = 0.525 * Math.min(rect.width, rect.height);

      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const points: { x: number; y: number; z: number; char: string }[] = [];

      for (let theta = 0; theta < 2 * Math.PI; theta += 0.15) {
        for (let phi = 0; phi < Math.PI; phi += 0.15) {
          const x0 = Math.sin(phi) * Math.cos(theta + 0.5 * angle);
          const y0 = Math.sin(phi) * Math.sin(theta + 0.5 * angle);
          const z0 = Math.cos(phi);

          const u = 0.3 * angle;
          const x1 = x0 * Math.cos(u) - z0 * Math.sin(u);
          const z1 = x0 * Math.sin(u) + z0 * Math.cos(u);

          const v = 0.2 * angle;
          const y1 = y0 * Math.cos(v) - z1 * Math.sin(v);
          const z2 = y0 * Math.sin(v) + z1 * Math.cos(v);

          const charIndex = Math.floor(((z2 + 1) / 2) * (CHARS.length - 1));

          points.push({
            x: centerX + x1 * radius,
            y: centerY + y1 * radius,
            z: z2,
            char: CHARS[charIndex] ?? '░',
          });
        }
      }

      points.sort((a, b) => a.z - b.z);
      for (const point of points) {
        ctx.globalAlpha = 0.2 + (point.z + 1) * 0.4;
        ctx.fillStyle = foreground;
        ctx.fillText(point.char, point.x, point.y);
      }
      ctx.globalAlpha = 1;

      angle += 0.02;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: 'block' }} />;
}
