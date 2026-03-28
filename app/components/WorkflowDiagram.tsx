"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

interface WorkflowNode {
  id: string;
  label: string;
  icon?: string;
}

interface WorkflowConfig {
  nodes: WorkflowNode[];
}

// Layout constants
const NODE_W = 120;
const NODE_H = 64;
const ICON_SIZE = 22;
const H_GAP = 56;
const V_GAP = 48;
const PAD = 24;
const DOT_R = 4;
const EDGE_STROKE = 1.5;
const BORDER_R = 8;

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

/**
 * Build the edge path between two node centers (horizontal or vertical layout).
 * Uses a smooth cubic bezier curve for a premium feel.
 */
function edgePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  vertical: boolean
): string {
  if (vertical) {
    const cy = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
  }
  const cx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

export default function WorkflowDiagram({ nodes }: WorkflowConfig) {
  const uid = useId().replace(/:/g, "");
  const filterId = `glow-${uid}`;
  const fullPathId = `path-${uid}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [looping, setLooping] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const vertical = isMobile;

  const n = nodes.length;

  // Compute layout positions
  const positions = useMemo(() => {
    return nodes.map((_, i) => {
      if (vertical) {
        const x = PAD + NODE_W / 2;
        const y = PAD + i * (NODE_H + V_GAP) + NODE_H / 2;
        return { x, y };
      }
      const x = PAD + i * (NODE_W + H_GAP) + NODE_W / 2;
      const y = PAD + NODE_H / 2;
      return { x, y };
    });
  }, [nodes, vertical]);

  // viewBox dimensions
  const vbWidth = vertical
    ? PAD * 2 + NODE_W
    : PAD * 2 + n * NODE_W + (n - 1) * H_GAP;
  const vbHeight = vertical
    ? PAD * 2 + n * NODE_H + (n - 1) * V_GAP
    : PAD * 2 + NODE_H;

  // Edge data: path string + connection points
  const edges = useMemo(() => {
    const result: { path: string; id: string }[] = [];
    for (let i = 0; i < n - 1; i++) {
      const from = positions[i];
      const to = positions[i + 1];
      const x1 = vertical ? from.x : from.x + NODE_W / 2;
      const y1 = vertical ? from.y + NODE_H / 2 : from.y;
      const x2 = vertical ? to.x : to.x - NODE_W / 2;
      const y2 = vertical ? to.y - NODE_H / 2 : to.y;
      result.push({
        path: edgePath(x1, y1, x2, y2, vertical),
        id: `edge-${i}`,
      });
    }
    return result;
  }, [positions, n, vertical]);

  // IntersectionObserver
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animation sequence
  const runSequence = useCallback(() => {
    if (reducedMotion) {
      setActiveIndex(n - 1);
      setLooping(true);
      return;
    }

    // Staggered node activation with dot travel time
    const nodeDelay = 600; // ms between each node activation
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        setActiveIndex(i);
        if (i === n - 1) {
          // Start looping after last node activates
          setTimeout(() => setLooping(true), 400);
        }
      }, i * nodeDelay);
    }
  }, [n, reducedMotion]);

  useEffect(() => {
    if (inView) {
      // Small delay before starting sequence for fade-in to land
      const t = setTimeout(runSequence, 200);
      return () => clearTimeout(t);
    }
  }, [inView, runSequence]);

  // Determine animation duration for dots
  const dotDuration = reducedMotion ? "0s" : "0.5s";
  const loopDotDuration = reducedMotion ? "0s" : `${n * 0.6}s`;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className="mx-auto block w-full"
        style={{
          maxWidth: vertical ? 180 : vbWidth,
          minWidth: vertical ? 140 : Math.min(vbWidth, 500),
        }}
        role="img"
        aria-label="Workflow automation pipeline diagram"
      >
        <defs>
          {/* Subtle glow filter for active nodes */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feFlood floodColor="#d4874d" floodOpacity="0.25" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => (
          <g key={edge.id}>
            {/* Background edge */}
            <path
              d={edge.path}
              fill="none"
              stroke="#1f2330"
              strokeWidth={EDGE_STROKE}
              opacity={inView ? 1 : 0}
              style={{
                transition: `opacity 0.4s ease ${i * 100 + 200}ms`,
              }}
            />

            {/* Active edge highlight */}
            {activeIndex > i && (
              <path
                d={edge.path}
                fill="none"
                stroke="#d4874d"
                strokeWidth={EDGE_STROKE}
                opacity={0.4}
                style={{
                  transition: "opacity 0.4s ease",
                }}
              />
            )}

            {/* Animated dot during sequence (one-shot) */}
            {!looping && activeIndex === i && !reducedMotion && (
              <circle r={DOT_R} fill="#d4874d">
                <animateMotion
                  dur={dotDuration}
                  fill="freeze"
                  repeatCount="1"
                  path={edge.path}
                />
              </circle>
            )}

          </g>
        ))}

        {/* Looping single dot along full path */}
        {looping && !reducedMotion && (
          <circle r={DOT_R} fill="#d4874d" opacity={0.9}>
            <animateMotion
              dur={loopDotDuration}
              repeatCount="indefinite"
              calcMode="linear"
            >
              <mpath href={`#${fullPathId}`} />
            </animateMotion>
          </circle>
        )}

        {/* Full concatenated path for looping dot */}
        {looping && (
          <path
            id={fullPathId}
            d={edges.map((e) => e.path).join(" ")}
            fill="none"
            stroke="none"
          />
        )}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = positions[i];
          const isActive = activeIndex >= i;
          const nodeX = pos.x - NODE_W / 2;
          const nodeY = pos.y - NODE_H / 2;

          return (
            <g
              key={node.id}
              style={{
                opacity: inView ? 1 : 0,
                transition: reducedMotion
                  ? "none"
                  : `opacity 0.5s ease ${i * 100}ms`,
              }}
              filter={isActive ? `url(#${filterId})` : undefined}
            >
              {/* Node background */}
              <rect
                x={nodeX}
                y={nodeY}
                width={NODE_W}
                height={NODE_H}
                rx={BORDER_R}
                fill="#0e1014"
                stroke={isActive ? "#d4874d" : "#1f2330"}
                strokeWidth={1}
                style={{
                  transition: reducedMotion ? "none" : "stroke 0.3s ease",
                }}
              />

              {/* Icon */}
              {node.icon && (
                <text
                  x={pos.x}
                  y={nodeY + 22}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={ICON_SIZE}
                  style={{ pointerEvents: "none" }}
                >
                  {node.icon}
                </text>
              )}

              {/* Label */}
              <text
                x={pos.x}
                y={nodeY + (node.icon ? 48 : 36)}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? "#e2e4ec" : "#6b7290"}
                fontSize={11}
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontWeight={500}
                style={{
                  transition: reducedMotion ? "none" : "fill 0.3s ease",
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
