import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG coordinate space: viewBox "0 0 1000 1000"
export interface Dot {
  id: string;
  svgX: number;
  svgY: number;
}

interface Props {
  dots: Dot[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  mapUrl: string;
  /** Scale applied when no city is selected. Use >1 on mobile to zoom in. */
  baseScale?: number;
}

const ZOOM_SCALE = 2.6;

const SVG_STYLE = `
  #features path {
    fill: #1c1c1c;
    stroke: rgba(255,255,255,0.07);
    stroke-width: 1;
    cursor: pointer;
    transition: fill 0.22s ease;
  }
  #features path.hovered       { fill: rgba(248,98,19,0.18); }
  #features path.sel-region    { fill: rgba(248,98,19,0.28); }
`;

/** Returns the region path id that geometrically contains (x, y).
 *  Falls back to the nearest region centroid when the point is on a border or coast. */
function detectRegion(
  paths: NodeListOf<SVGPathElement>,
  svg: SVGSVGElement,
  x: number,
  y: number,
): string | null {
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;

  // 1. Exact hit
  for (const path of paths) {
    if ((path as SVGGeometryElement).isPointInFill(pt)) return path.id;
  }

  // 2. Fallback: nearest region by bounding-box centroid
  let minDist = Infinity;
  let closest: string | null = null;
  for (const path of paths) {
    const { x: bx, y: by, width: bw, height: bh } = path.getBBox();
    const cx = bx + bw / 2;
    const cy = by + bh / 2;
    const d  = (cx - x) ** 2 + (cy - y) ** 2;
    if (d < minDist) { minDist = d; closest = path.id; }
  }
  return closest;
}

export default function CountryMap({ dots, selected, onSelect, mapUrl, baseScale = 1 }: Props) {
  const mapRef       = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement | null>(null);
  /** dot.id → SVG path id, computed once after the SVG loads */
  const regionMapRef = useRef<Record<string, string>>({});

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [loaded, setLoaded]               = useState(false);

  const selectedDot    = dots.find(d => d.id === selected) ?? null;
  const containerRef   = useRef<HTMLDivElement>(null);

  // ── Load & inject SVG ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    fetch(mapUrl)
      .then(r => r.text())
      .then(raw => {
        if (cancelled || !mapRef.current) return;

        mapRef.current.innerHTML = raw.replace(
          '</svg>',
          `<style>${SVG_STYLE}</style></svg>`,
        );

        const svg = mapRef.current.querySelector('svg');
        if (!svg) return;

        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.style.width  = '100%';
        svg.style.height = '100%';

        svgRef.current = svg as SVGSVGElement;

        const paths = svg.querySelectorAll<SVGPathElement>('#features path[id]');

        // ── Auto-detect region for every dot via real SVG geometry ──
        const map: Record<string, string> = {};
        for (const dot of dots) {
          const id = detectRegion(paths, svg, dot.svgX, dot.svgY);
          if (id) map[dot.id] = id;
        }
        regionMapRef.current = map;

        // ── Hover listeners ──
        paths.forEach(path => {
          path.addEventListener('mouseenter', () => {
            path.classList.add('hovered');
            setHoveredRegion(path.getAttribute('name'));
          });
          path.addEventListener('mouseleave', () => {
            path.classList.remove('hovered');
            setHoveredRegion(null);
          });
          path.addEventListener('click', () => onSelect(null));
        });

        setLoaded(true);
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Highlight the region that owns the selected dot ────
  useEffect(() => {
    if (!svgRef.current) return;

    svgRef.current.querySelectorAll('.sel-region').forEach(el =>
      el.classList.remove('sel-region'),
    );

    if (selected) {
      const regionId = regionMapRef.current[selected];
      if (regionId) {
        svgRef.current.querySelector(`#${regionId}`)?.classList.add('sel-region');
      }
    }
  }, [selected, loaded]);

  // Compute x/y translation to visually centre the selected dot.
  // originX/Y stays at 0.5 so the pivot never snaps — all motion is in animate.
  let animX = 0;
  let animY = 0;
  if (selectedDot && containerRef.current) {
    const { width: W, height: H } = containerRef.current.getBoundingClientRect();
    const rendered  = Math.min(W, H); // SVG uses xMidYMid meet on a 1000×1000 viewBox
    const dotCssX   = (W - rendered) / 2 + (selectedDot.svgX / 1000) * rendered;
    const dotCssY   = (H - rendered) / 2 + (selectedDot.svgY / 1000) * rendered;
    animX = -ZOOM_SCALE * (dotCssX - W / 2);
    animY = -ZOOM_SCALE * (dotCssY - H / 2);
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">

      {/* Zoom wrapper — x/y pan to the city, scale zooms in; all three spring together */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: selected ? ZOOM_SCALE : baseScale, x: animX, y: animY }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ type: 'spring', stiffness: 90, damping: 22 }}
        onClick={() => onSelect(null)}
      >
        {/* Country SVG */}
        <div ref={mapRef} className="w-full h-full" />

        {/* City dots overlay — same viewBox as the SVG */}
        {loaded && (
          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {dots.map((dot, i) => {
              const isSel   = dot.id === selected;
              const offset  = `${(i * 0.18) % 1.6}s`;
              const offset2 = `${((i * 0.18) + 0.55) % 1.6}s`;
              return (
                <g key={dot.id}>
                  {/* Ripple rings — always visible, staggered per dot */}
                  <circle cx={dot.svgX} cy={dot.svgY} r="4" fill="none" stroke="#F86213" strokeWidth="1">
                    <animate attributeName="r"       values={isSel ? '8;22' : '4;16'} dur="2s" begin={offset}  repeatCount="indefinite" />
                    <animate attributeName="opacity" values={isSel ? '0.7;0' : '0.55;0'} dur="2s" begin={offset}  repeatCount="indefinite" />
                  </circle>
                  <circle cx={dot.svgX} cy={dot.svgY} r="4" fill="none" stroke="#F86213" strokeWidth="0.7">
                    <animate attributeName="r"       values={isSel ? '8;22' : '4;16'} dur="2s" begin={offset2} repeatCount="indefinite" />
                    <animate attributeName="opacity" values={isSel ? '0.4;0' : '0.35;0'} dur="2s" begin={offset2} repeatCount="indefinite" />
                  </circle>
                  <circle
                    cx={dot.svgX} cy={dot.svgY}
                    r={isSel ? 7 : 4}
                    fill={isSel ? '#F86213' : 'rgba(248,98,19,0.55)'}
                    stroke={isSel ? '#ffffff' : 'rgba(248,98,19,0.8)'}
                    strokeWidth={isSel ? 1.5 : 0.8}
                  />
                </g>
              );
            })}
          </svg>
        )}
      </motion.div>

      {/* Region name tooltip — fixed, not zoomed */}
      <AnimatePresence>
        {hoveredRegion && !selected && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-20
                       rounded-full border border-white/10 bg-brand-dark/90 px-4 py-1.5
                       text-xs font-medium text-white/70 backdrop-blur-md whitespace-nowrap"
          >
            {hoveredRegion}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
