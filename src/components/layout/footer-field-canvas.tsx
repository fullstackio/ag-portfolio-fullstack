'use client';

import { useEffect, useRef } from 'react';

const CHARS = '·∘○◯◌●◉';

/**
 * Subtle animated glyph field behind the footer, matching the reference site: a grid of
 * monospace characters whose glyph and opacity drift via layered sine waves.
 */
export function FooterFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

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
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = Math.floor(rect.width / 20);
      const rows = Math.floor(rect.height / 20);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = (col + 0.5) * (rect.width / cols);
          const y = (row + 0.5) * (rect.height / rows);
          const value =
            (Math.sin(0.2 * col + 2 * time) * Math.cos(0.15 * row + time) +
              Math.sin((col + row) * 0.1 + 1.5 * time) +
              Math.cos(0.1 * col - 0.1 * row + 0.8 * time)) /
              3 +
            1;
          const normalized = value / 2;
          const charIndex = Math.floor(normalized * (CHARS.length - 1));
          const opacity = 0.15 + 0.5 * normalized;
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.fillText(CHARS[charIndex] ?? CHARS[0]!, x, y);
        }
      }

      time += 0.03;
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
