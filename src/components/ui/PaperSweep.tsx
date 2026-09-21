"use client";

import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

/**
 * Full-screen canvas that paints an ink sheet sweeping down the screen (or,
 * with `horizontal`, across it from left to right) with a torn strip of cream
 * paper as its leading edge. Fully controlled by
 * `progress` (0 = nothing, 1 = fully covered) so it can be tweened forwards
 * (open) and backwards (close). Original implementation: fractal value noise
 * for the ragged edge, the paper texture image for the strip.
 */
export type PaperSweepHandle = { setProgress: (p: number) => void };

/**
 * The paper texture is decoded once, up front, and shared by every open of the
 * menu. Loading it lazily made the strip pop from flat cream to textured
 * mid-sweep, and re-scaling it every frame was the costliest part of drawing.
 */
let textureImg: HTMLImageElement | null = null;
let textureLoad: Promise<void> | null = null;
export function preloadPaperTexture() {
  if (textureImg || textureLoad) return textureLoad;
  const img = new Image();
  img.decoding = "async";
  img.src = "/images/paper-texture.jpg";
  textureLoad = img
    .decode()
    .then(() => {
      textureImg = img;
    })
    .catch(() => {
      textureLoad = null;
    });
  return textureLoad;
}

/** Adds a smooth curve through the points (quadratic through segment midpoints). */
function curveThrough(
  ctx: CanvasRenderingContext2D,
  xs: number[],
  ys: number[],
  dy: number,
) {
  const n = xs.length;
  ctx.lineTo(xs[0], ys[0] + dy);
  for (let i = 1; i < n - 1; i++) {
    ctx.quadraticCurveTo(
      xs[i],
      ys[i] + dy,
      (xs[i] + xs[i + 1]) / 2,
      (ys[i] + ys[i + 1]) / 2 + dy,
    );
  }
  ctx.lineTo(xs[n - 1], ys[n - 1] + dy);
}

const INK = "#1d1d1b";

function makeNoise(seed: number) {
  const table = new Float32Array(512);
  let s = seed;
  for (let i = 0; i < table.length; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    table[i] = (s / 4294967296) * 2 - 1;
  }
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const value = (x: number) => {
    const i = Math.floor(x);
    const f = x - i;
    const a = table[((i % 512) + 512) % 512];
    const b = table[(((i + 1) % 512) + 512) % 512];
    return a + (b - a) * smooth(f);
  };
  return (x: number) =>
    value(x) * 0.55 + value(x * 2.3 + 17) * 0.28 + value(x * 5.1 + 41) * 0.17;
}

const PaperSweep = forwardRef<PaperSweepHandle, { horizontal?: boolean }>(
  function PaperSweep({ horizontal = false }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const horizontalRef = useRef(horizontal);
    const state = useRef({ p: 0, w: 0, h: 0, dpr: 1 });
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    // The texture pre-scaled to the sweep's frame, so each frame is a plain blit.
    const tex = useRef<HTMLCanvasElement | null>(null);

    const buildTexture = () => {
      const s = state.current;
      if (!textureImg || !s.w) return;
      const fw = horizontalRef.current ? s.h : s.w;
      const fh = horizontalRef.current ? s.w : s.h;
      const c = document.createElement("canvas");
      c.width = Math.round(fw * s.dpr);
      c.height = Math.round(fh * s.dpr);
      c.getContext("2d")?.drawImage(textureImg, 0, 0, c.width, c.height);
      tex.current = c;
    };
    const noises = useRef({
      edge: makeNoise(7),
      strip: makeNoise(91),
      fine: makeNoise(313),
    });

    const draw = () => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;
      const { p, w: sw, h: sh, dpr } = state.current;
      const horizontal = horizontalRef.current;

      // Work in a frame where the sweep always runs "down". Horizontal mode
      // transposes that frame, so "down" becomes "right" on screen.
      const w = horizontal ? sh : sw;
      const h = horizontal ? sw : sh;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (horizontal) ctx.setTransform(0, dpr, dpr, 0, 0, 0);
      else ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (p <= 0) return;
      if (p >= 1) {
        ctx.fillStyle = INK;
        ctx.fillRect(0, 0, w, h);
        return;
      }

      const band = sh * 0.085;
      const base = p * (h + 3 * band) - 1.5 * band;
      const swell = 0.15 + 0.85 * Math.pow(Math.sin(Math.PI * p), 0.8);
      const step = 6;
      const n = noises.current;

      const xs: number[] = [];
      const inkY: number[] = [];
      const stripY: number[] = [];
      for (let x = 0; x <= w + step; x += step) {
        const u = x / (w * 0.42);
        const arc =
          Math.sin(Math.PI * Math.min(1, x / w)) *
          Math.sin(Math.PI * p) *
          band *
          0.35;
        // Slow travelling wave: two sine bands whose phase advances with progress.
        const wave =
          (Math.sin((x / w) * Math.PI * 2.4 + p * 7) * 0.7 +
            Math.sin((x / w) * Math.PI * 5.3 - p * 11) * 0.3) *
          band *
          1.3 *
          swell;
        const y =
          base +
          n.edge(u) * band * 0.5 * swell +
          arc +
          wave +
          n.fine(x / 26) * band * 0.06;
        xs.push(x);
        inkY.push(y);
        stripY.push(
          y +
            band * (0.62 + 0.38 * n.strip(u * 1.7 + 5)) +
            n.fine(x / 14 + 9) * band * 0.05,
        );
      }

      const xsRev = [...xs].reverse();
      const inkRev = [...inkY].reverse();
      const stripRev = [...stripY].reverse();

      // torn paper strip
      ctx.beginPath();
      ctx.moveTo(0, inkY[0] - band * 0.4);
      curveThrough(ctx, xs, inkY, -band * 0.15);
      curveThrough(ctx, xsRev, stripRev, 0);
      ctx.closePath();
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = band * 0.25;
      ctx.shadowOffsetX = horizontal ? band * 0.08 : 0;
      ctx.shadowOffsetY = horizontal ? 0 : band * 0.08;
      ctx.fillStyle = "#e4e0d8";
      ctx.fill();
      ctx.restore();
      const t = tex.current;
      if (t) {
        // Only the rows the strip actually covers need the texture.
        const y0 = Math.max(0, Math.floor(Math.min(...inkY) - band));
        const y1 = Math.min(h, Math.ceil(Math.max(...stripY) + band));
        if (y1 > y0) {
          ctx.save();
          ctx.clip();
          ctx.globalAlpha = 0.9;
          ctx.drawImage(t, 0, y0 * dpr, t.width, (y1 - y0) * dpr, 0, y0, w, y1 - y0);
          ctx.restore();
        }
      }

      // ink sheet above the strip
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(w, -2);
      curveThrough(ctx, xsRev, inkRev, 0);
      ctx.closePath();
      ctx.fillStyle = INK;
      ctx.fill();
    };

    // Layout effect: the canvas must be sized before the first paint, otherwise
    // the opening frames draw into a 300x150 default canvas and then jump.
    useLayoutEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      ctxRef.current = canvas.getContext("2d");
      const resize = () => {
        const s = state.current;
        s.w = window.innerWidth;
        s.h = window.innerHeight;
        s.dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(s.w * s.dpr);
        canvas.height = Math.round(s.h * s.dpr);
        buildTexture();
        draw();
      };
      resize();
      window.addEventListener("resize", resize);

      let alive = true;
      preloadPaperTexture()?.then(() => {
        if (!alive) return;
        buildTexture();
        draw();
      });

      return () => {
        alive = false;
        window.removeEventListener("resize", resize);
      };
    }, []);

    useLayoutEffect(() => {
      horizontalRef.current = horizontal;
      buildTexture();
      draw();
    }, [horizontal]);

    useImperativeHandle(ref, () => ({
      setProgress(p: number) {
        state.current.p = p;
        draw();
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 h-full w-full"
        aria-hidden="true"
      />
    );
  },
);

export default PaperSweep;
