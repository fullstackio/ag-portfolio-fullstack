'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { HeroDotSphere } from './hero-dot-sphere';

const GRID_ROWS = [12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
const GRID_COLS = [
  8.33, 16.66, 24.99, 33.32, 41.65, 49.98, 58.31, 66.64, 74.97, 83.3, 91.63, 99.96,
];

const ROTATING_WORDS = ['scale', 'inspire', 'perform', 'grow'];
const ROTATE_INTERVAL_MS = 2500;

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((index) => (index + 1) % ROTATING_WORDS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const word = ROTATING_WORDS[wordIndex] ?? 'scale';

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
        aria-hidden="true"
      >
        <div className="hero-glow hero-glow-1 top-[-10%] right-[5%] h-[500px] w-[500px] lg:h-[650px] lg:w-[650px]" />
        <div className="hero-glow hero-glow-2 top-[20%] right-[25%] h-[450px] w-[450px] lg:h-[600px] lg:w-[600px]" />
        <div className="hero-glow hero-glow-3 bottom-[-15%] left-[10%] h-[400px] w-[400px] lg:h-[550px] lg:w-[550px]" />
      </div>

      <div className="pointer-events-none absolute top-1/2 right-0 h-[600px] w-[600px] -translate-y-1/2 opacity-40 lg:h-[800px] lg:w-[800px]">
        <HeroDotSphere />
      </div>

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-30"
        aria-hidden="true"
      >
        {GRID_ROWS.map((top) => (
          <div
            key={top}
            className="bg-foreground/10 absolute right-0 left-0 h-px"
            style={{ top: `${top}%` }}
          />
        ))}
        {GRID_COLS.map((left) => (
          <div
            key={left}
            className="bg-foreground/10 absolute top-0 bottom-0 w-px"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 lg:px-12 lg:py-40">
        <div className="mb-8 flex items-center gap-6">
          <span
            className="border-foreground/10 bg-surface font-heading flex size-16 items-center justify-center rounded-full border text-lg"
            aria-hidden="true"
          >
            AG
          </span>
          <span className="text-muted-foreground inline-flex items-center gap-3 font-mono text-sm">
            <span className="bg-foreground/30 h-px w-8" aria-hidden="true" />
            Open to New Projects
          </span>
        </div>

        <div className="mb-12">
          <h1 className="font-heading text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] tracking-tight">
            <span className="block">Turning ideas into</span>
            <span className="block">
              experiences that{' '}
              <span className="relative inline-block">
                <span className="inline-flex" key={word}>
                  {word.split('').map((char, index) => (
                    <span
                      key={`${word}-${index}`}
                      className="animate-char-in inline-block"
                      style={{ animationDelay: `${50 * index}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span
                  className="bg-foreground/10 absolute right-0 -bottom-2 left-0 h-3"
                  aria-hidden="true"
                />
              </span>
            </span>
          </h1>
        </div>

        <div className="grid items-end gap-12 lg:grid-cols-2 lg:gap-24">
          <p className="text-muted-foreground font-body max-w-xl text-lg leading-relaxed lg:text-xl">
            I&apos;m a full-stack developer specializing in building exceptional digital
            experiences. With a focus on modern web technologies, AI, and scalable architecture, I
            craft high-performance solutions that help businesses and startups thrive.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className="bg-foreground text-background hover:bg-foreground/90 group font-body inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-medium transition-all"
            >
              Get in touch
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="#projects"
              className="border-foreground/20 hover:bg-foreground/5 font-body inline-flex h-14 items-center justify-center rounded-full border px-8 text-base font-medium transition-all"
            >
              My work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
