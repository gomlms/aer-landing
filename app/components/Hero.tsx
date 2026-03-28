"use client";

import { useEffect, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  DotGrid — interactive canvas background                            */
/* ------------------------------------------------------------------ */

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const dotsRef = useRef<{ x: number; y: number; brightness: number; size: number }[]>([]);
  const prefersReducedMotion = useRef(false);
  const isTouchDevice = useRef(false);

  const SPACING = 40;
  const BASE_RADIUS = 1.2;
  const HOVER_RADIUS = 2.8;
  const INFLUENCE_RANGE = 140;
  const BASE_COLOR = { r: 31, g: 35, b: 48 }; // aer-700
  const ACCENT_COLOR = { r: 212, g: 135, b: 77 }; // accent-500
  const LERP_SPEED = 0.08;

  const buildGrid = useCallback((width: number, height: number) => {
    const dots: typeof dotsRef.current = [];
    const cols = Math.ceil(width / SPACING) + 1;
    const rows = Math.ceil(height / SPACING) + 1;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * SPACING,
          y: row * SPACING,
          brightness: 0,
          size: BASE_RADIUS,
        });
      }
    }
    return dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsRef.current = buildGrid(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchDevice.current) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const noInteraction = prefersReducedMotion.current || isTouchDevice.current;

      for (const dot of dotsRef.current) {
        let targetBrightness = 0;
        let targetSize = BASE_RADIUS;

        if (!noInteraction) {
          const dx = dot.x - mx;
          const dy = dot.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INFLUENCE_RANGE) {
            const t = 1 - dist / INFLUENCE_RANGE;
            targetBrightness = t * t; // easeIn for softer falloff
            targetSize = BASE_RADIUS + (HOVER_RADIUS - BASE_RADIUS) * targetBrightness;
          }
        }

        dot.brightness += (targetBrightness - dot.brightness) * LERP_SPEED;
        dot.size += (targetSize - dot.size) * LERP_SPEED;

        const b = dot.brightness;
        const r = Math.round(BASE_COLOR.r + (ACCENT_COLOR.r - BASE_COLOR.r) * b);
        const g = Math.round(BASE_COLOR.g + (ACCENT_COLOR.g - BASE_COLOR.g) * b);
        const bl = Math.round(BASE_COLOR.b + (ACCENT_COLOR.b - BASE_COLOR.b) * b);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${bl})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [buildGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden bg-aer-950 pt-28 pb-20 lg:pt-40 lg:pb-24">
      {/* Video background -- full section, low opacity for atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Video on desktop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden h-full w-full object-cover opacity-25 lg:block"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Static image fallback on mobile */}
        <img
          src="/hero-bg.png"
          alt=""
          className="h-full w-full object-cover opacity-20 lg:hidden"
        />
        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-aer-950 via-aer-950/70 to-aer-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-aer-950 via-transparent to-aer-950/60" />
      </div>

      {/* Interactive dot grid on top of video */}
      <DotGrid />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section label */}
        <p className="hero-enter hero-enter-1 font-mono text-sm text-accent-500">
          0.1
        </p>

        {/* Headline */}
        <h1 className="hero-enter hero-enter-2 mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-aer-50 sm:text-5xl lg:text-6xl">
          We automate the work your team{" "}
          <span className="text-accent-400">shouldn&apos;t be doing</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-enter hero-enter-3 mt-6 max-w-2xl text-lg leading-relaxed text-aer-300">
          AI systems that eliminate repetitive work, streamline operations, and
          give your team time back.
        </p>

        {/* CTAs */}
        <div className="hero-enter hero-enter-4 mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onBook}
            className="rounded-full bg-accent-500 px-8 py-3 font-medium text-aer-950 transition-opacity hover:opacity-90"
          >
            Book a Strategy Call
          </button>
          <a
            href="#how"
            className="rounded-full border border-aer-600 px-8 py-3 font-medium text-aer-200 transition-colors hover:border-accent-500"
          >
            See How It Works
          </a>
        </div>

        {/* Metrics bar */}
        <div className="hero-enter hero-enter-5 mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs tracking-wide text-aer-400">
          <span>50+ workflows automated</span>
          <span className="text-accent-500" aria-hidden="true">
            ·
          </span>
          <span>&lt;2 week delivery</span>
          <span className="text-accent-500" aria-hidden="true">
            ·
          </span>
          <span>trusted across industries</span>
        </div>
      </div>
    </section>
  );
}
