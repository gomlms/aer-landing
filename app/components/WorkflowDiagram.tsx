"use client";

import { useEffect, useId, useRef, useState, useCallback, useMemo } from "react";

interface WorkflowNode {
  id: string;
  label: string;
}

interface WorkflowConfig {
  nodes: WorkflowNode[];
}

const NODE_W = 130;
const NODE_H = 44;
const H_GAP = 36;
const V_GAP = 32;
const PAD_X = 20;
const PAD_Y = 16;
const R = 6;

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

  const vbW = vertical
    ? PAD_X * 2 + NODE_W
    : PAD_X * 2 + n * NODE_W + (n - 1) * H_GAP;
  const vbH = vertical
    ? PAD_Y * 2 + n * NODE_H + (n - 1) * V_GAP
    : PAD_Y * 2 + NODE_H;

  const edges = useMemo(() => {
    const result: string[] = [];
    for (let i = 0; i < n - 1; i++) {
      const a = positions[i];
      const b = positions[i + 1];
      if (vertical) {
        const y1 = a.y + NODE_H / 2;
        const y2 = b.y - NODE_H / 2;
        const my = (y1 + y2) / 2;
        result.push(`M ${a.x} ${y1} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${y2}`);
      } else {
        const x1 = a.x + NODE_W / 2;
        const x2 = b.x - NODE_W / 2;
        const mx = (x1 + x2) / 2;
        result.push(`M ${x1} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${x2} ${b.y}`);
      }
    }
    return result;
  }, [positions, n, vertical]);

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

  const runSequence = useCallback(() => {
    if (reducedMotion) {
      setActiveIndex(n - 1);
      return;
    }
    // Slow, deliberate activation -- 1.2s per node
    for (let i = 0; i < n; i++) {
      setTimeout(() => setActiveIndex(i), i * 1200);
    }
  }, [n, reducedMotion]);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(runSequence, 600);
      return () => clearTimeout(t);
    }
  }, [inView, runSequence]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="mx-auto block w-full"
        style={{
          maxWidth: vertical ? 180 : vbW,
          minWidth: vertical ? 150 : Math.min(vbW, 560),
        }}
        role="img"
        aria-label="Workflow automation pipeline"
      >
        <defs>
          <filter id={`g-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="b" />
            <feFlood floodColor="#d4874d" floodOpacity="0.12" result="c" />
            <feComposite in="c" in2="b" operator="in" result="s" />
            <feMerge>
              <feMergeNode in="s" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((path, i) => {
          const isLit = activeIndex > i;
          const isCurrent = activeIndex === i;
          return (
            <g key={`e${i}`}>
              {/* Base line */}
              <path
                d={path}
                fill="none"
                stroke="#1a1e2a"
                strokeWidth={1}
                opacity={inView ? 1 : 0}
                style={{ transition: `opacity 0.6s ease ${i * 60}ms` }}
              />
              {/* Lit line */}
              {(isLit || isCurrent) && (
                <path
                  d={path}
                  fill="none"
                  stroke="#d4874d"
                  strokeWidth={1}
                  strokeDasharray="4 6"
                  opacity={isLit ? 0.35 : 0.15}
                  style={{ transition: "opacity 0.8s ease" }}
                >
                  {!reducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="20"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>
              )}
              {/* Traveling dot -- slow */}
              {isCurrent && !reducedMotion && (
                <circle r={2.5} fill="#d4874d" opacity={0.8}>
                  <animateMotion
                    dur="1s"
                    fill="freeze"
                    repeatCount="1"
                    path={path}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Looping dot */}
        {activeIndex >= n - 1 && !reducedMotion && edges.length > 0 && (
          <>
            <path
              id={`lp-${uid}`}
              d={edges.join(" ")}
              fill="none"
              stroke="none"
            />
            <circle r={2.5} fill="#d4874d" opacity={0.5}>
              <animateMotion
                dur={`${n * 1.5}s`}
                repeatCount="indefinite"
                calcMode="linear"
              >
                <mpath href={`#lp-${uid}`} />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Nodes -- text only, no emojis, minimal */}
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
                  : `opacity 0.6s ease ${i * 60}ms`,
              }}
              filter={isActive ? `url(#g-${uid})` : undefined}
            >
              <rect
                x={nx}
                y={ny}
                width={NODE_W}
                height={NODE_H}
                rx={R}
                fill={isActive ? "#0f1218" : "#0c0e13"}
                stroke={isActive ? "rgba(212,135,77,0.5)" : "#181c28"}
                strokeWidth={0.75}
                style={{
                  transition: reducedMotion
                    ? "none"
                    : "stroke 0.6s ease, fill 0.6s ease",
                }}
              />

              {/* Step number -- top left, very subtle */}
              <text
                x={nx + 8}
                y={ny + 11}
                fill={isActive ? "rgba(212,135,77,0.4)" : "#1a1e2a"}
                fontSize={7}
                fontFamily="'JetBrains Mono', monospace"
                style={{
                  transition: reducedMotion ? "none" : "fill 0.6s ease",
                  pointerEvents: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Label -- centered */}
              <text
                x={pos.x}
                y={pos.y + 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? "#c0c5d4" : "#4a5068"}
                fontSize={10.5}
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontWeight={500}
                letterSpacing="0.02em"
                style={{
                  transition: reducedMotion ? "none" : "fill 0.6s ease",
                  pointerEvents: "none",
                }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
