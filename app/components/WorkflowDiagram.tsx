"use client";

import { useEffect, useId, useRef, useState, useCallback, useMemo } from "react";

interface WorkflowNode {
  id: string;
  label: string;
  icon?: string;
}

interface WorkflowConfig {
  nodes: WorkflowNode[];
}

const NODE_W = 140;
const NODE_H = 72;
const H_GAP = 48;
const V_GAP = 40;
const PAD_X = 32;
const PAD_Y = 24;
const BORDER_R = 12;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return matches;
}

export default function WorkflowDiagram({ nodes }: WorkflowConfig) {
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const vertical = isMobile;
  const n = nodes.length;

  const positions = useMemo(() => {
    return nodes.map((_, i) => {
      if (vertical) {
        return {
          x: PAD_X + NODE_W / 2,
          y: PAD_Y + i * (NODE_H + V_GAP) + NODE_H / 2,
        };
      }
      return {
        x: PAD_X + i * (NODE_W + H_GAP) + NODE_W / 2,
        y: PAD_Y + NODE_H / 2,
      };
    });
  }, [nodes, vertical]);

  const vbWidth = vertical
    ? PAD_X * 2 + NODE_W
    : PAD_X * 2 + n * NODE_W + (n - 1) * H_GAP;
  const vbHeight = vertical
    ? PAD_Y * 2 + n * NODE_H + (n - 1) * V_GAP
    : PAD_Y * 2 + NODE_H;

  // Edge connection points + paths
  const edges = useMemo(() => {
    const result: string[] = [];
    for (let i = 0; i < n - 1; i++) {
      const from = positions[i];
      const to = positions[i + 1];
      if (vertical) {
        const y1 = from.y + NODE_H / 2;
        const y2 = to.y - NODE_H / 2;
        const my = (y1 + y2) / 2;
        result.push(
          `M ${from.x} ${y1} C ${from.x} ${my}, ${to.x} ${my}, ${to.x} ${y2}`
        );
      } else {
        const x1 = from.x + NODE_W / 2;
        const x2 = to.x - NODE_W / 2;
        const mx = (x1 + x2) / 2;
        result.push(
          `M ${x1} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${x2} ${to.y}`
        );
      }
    }
    return result;
  }, [positions, n, vertical]);

  // Observe
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animation
  const runSequence = useCallback(() => {
    if (reducedMotion) {
      setActiveIndex(n - 1);
      return;
    }
    for (let i = 0; i < n; i++) {
      setTimeout(() => setActiveIndex(i), i * 500);
    }
  }, [n, reducedMotion]);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(runSequence, 300);
      return () => clearTimeout(t);
    }
  }, [inView, runSequence]);

  return (
    <div className="w-full overflow-x-auto py-2">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className="mx-auto block w-full"
        style={{
          maxWidth: vertical ? 200 : vbWidth,
          minWidth: vertical ? 160 : Math.min(vbWidth, 600),
        }}
        role="img"
        aria-label="Workflow automation pipeline"
      >
        <defs>
          {/* Accent glow for active nodes */}
          <filter
            id={`glow-${uid}`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feFlood
              floodColor="#d4874d"
              floodOpacity="0.15"
              result="color"
            />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated dash pattern for active edges */}
          <linearGradient
            id={`edge-grad-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#d4874d" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#d4874d" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4874d" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Edges */}
        {edges.map((path, i) => {
          const isActive = activeIndex > i;
          const isCurrent = activeIndex === i;
          return (
            <g key={i}>
              {/* Base edge */}
              <path
                d={path}
                fill="none"
                stroke="#1f2330"
                strokeWidth={2}
                opacity={inView ? 1 : 0}
                style={{
                  transition: `opacity 0.4s ease ${i * 80 + 100}ms`,
                }}
              />

              {/* Active highlight with animated dash */}
              {(isActive || isCurrent) && (
                <path
                  d={path}
                  fill="none"
                  stroke={`url(#edge-grad-${uid})`}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  opacity={isActive ? 0.8 : 0.4}
                  style={{
                    transition: "opacity 0.4s ease",
                  }}
                >
                  {!reducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="20"
                      to="0"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>
              )}

              {/* Pulse dot traveling along active edge */}
              {isCurrent && !reducedMotion && (
                <circle r={3.5} fill="#d4874d" opacity={0.9}>
                  <animateMotion
                    dur="0.5s"
                    fill="freeze"
                    repeatCount="1"
                    path={path}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Continuous looping dot after all active */}
        {activeIndex >= n - 1 && !reducedMotion && edges.length > 0 && (
          <>
            <path
              id={`loop-${uid}`}
              d={edges.join(" ")}
              fill="none"
              stroke="none"
            />
            <circle r={3.5} fill="#d4874d" opacity={0.7}>
              <animateMotion
                dur={`${n * 0.8}s`}
                repeatCount="indefinite"
                calcMode="linear"
              >
                <mpath href={`#loop-${uid}`} />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = positions[i];
          const isActive = activeIndex >= i;
          const nx = pos.x - NODE_W / 2;
          const ny = pos.y - NODE_H / 2;

          return (
            <g
              key={node.id}
              style={{
                opacity: inView ? 1 : 0,
                transition: reducedMotion
                  ? "none"
                  : `opacity 0.5s ease ${i * 80}ms`,
              }}
              filter={isActive ? `url(#glow-${uid})` : undefined}
            >
              {/* Node background with inner gradient */}
              <rect
                x={nx}
                y={ny}
                width={NODE_W}
                height={NODE_H}
                rx={BORDER_R}
                fill={isActive ? "#111420" : "#0e1014"}
                stroke={isActive ? "#d4874d" : "#1f2330"}
                strokeWidth={isActive ? 1.5 : 1}
                style={{
                  transition: reducedMotion
                    ? "none"
                    : "stroke 0.3s ease, fill 0.3s ease, stroke-width 0.3s ease",
                }}
              />

              {/* Subtle top highlight line on active nodes */}
              {isActive && (
                <rect
                  x={nx + BORDER_R}
                  y={ny}
                  width={NODE_W - BORDER_R * 2}
                  height={1}
                  fill="#d4874d"
                  opacity={0.3}
                  rx={0.5}
                />
              )}

              {/* Icon */}
              {node.icon && (
                <text
                  x={pos.x}
                  y={ny + 24}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={20}
                  style={{ pointerEvents: "none" }}
                >
                  {node.icon}
                </text>
              )}

              {/* Label */}
              <text
                x={pos.x}
                y={ny + (node.icon ? 52 : 38)}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? "#e2e4ec" : "#6b7290"}
                fontSize={11.5}
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontWeight={500}
                letterSpacing="0.01em"
                style={{
                  transition: reducedMotion ? "none" : "fill 0.3s ease",
                  pointerEvents: "none",
                }}
              >
                {node.label}
              </text>

              {/* Small step number */}
              <text
                x={nx + 10}
                y={ny + 12}
                fill={isActive ? "#d4874d" : "#2a2f40"}
                fontSize={8}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={400}
                style={{
                  transition: reducedMotion ? "none" : "fill 0.3s ease",
                  pointerEvents: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
