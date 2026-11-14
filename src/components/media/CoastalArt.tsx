'use client';

import { memo, useId, useMemo, type ReactNode } from 'react';
import type { ArtMood, ArtScene } from '@/types';

/**
 * Procedurally composed coastal scenes in the monsoon-dusk palette.
 * Placeholders only — replace with authentic Gokarna photography by
 * setting `src` on the ImageAsset in config. Pure SVG, no network.
 */

interface Palette {
  sky: [string, string, string];
  sun: string;
  glow: string;
  sunX: number;
  sunYR: number;
  sunR: number;
  far: string;
  mid: string;
  near: string;
  sea: [string, string];
  glint: string;
  sand: string;
  sandShade: string;
  foam: string;
  foliage: string;
  haze: string;
  hull: string;
  roof: string;
  stars: boolean;
}

const PALETTES: Record<ArtMood, Palette> = {
  haze: {
    sky: ['#9C9A8E', '#CFC5B1', '#E8D9BF'], sun: '#FFF4E0', glow: '#F3D5A8', sunX: 1150, sunYR: 0.7, sunR: 44,
    far: '#8E9183', mid: '#5B6A5C', near: '#263329', sea: ['#8C9286', '#22302B'], glint: '#FFF1DC',
    sand: '#D9C7A6', sandShade: '#B9A17C', foam: '#F4EADA', foliage: '#1E2A22', haze: '#E3D2B6',
    hull: '#EFE9DE', roof: '#B8531F', stars: false,
  },
  golden: {
    sky: ['#6F5E4A', '#D29E6C', '#F2C894'], sun: '#FFF0D2', glow: '#F0A35E', sunX: 1240, sunYR: 0.66, sunR: 52,
    far: '#8E7E63', mid: '#4E5545', near: '#1F2620', sea: ['#8F7D62', '#141A17'], glint: '#FFD9A3',
    sand: '#E2C496', sandShade: '#B99467', foam: '#F7E5C8', foliage: '#18201A', haze: '#EDC28E',
    hull: '#EFE6D6', roof: '#B8531F', stars: false,
  },
  ember: {
    sky: ['#24211E', '#9E5236', '#EFA06A'], sun: '#FFE1B0', glow: '#E8814A', sunX: 800, sunYR: 0.9, sunR: 64,
    far: '#6B4536', mid: '#3A2B25', near: '#1A1614', sea: ['#9E5C40', '#141312'], glint: '#FFC487',
    sand: '#B48663', sandShade: '#8A6147', foam: '#F2CFAE', foliage: '#141110', haze: '#DF8F5A',
    hull: '#241E1B', roof: '#352621', stars: false,
  },
  dusk: {
    sky: ['#121413', '#2E3631', '#977561'], sun: '#F3D2AE', glow: '#C98A5E', sunX: 420, sunYR: 1.0, sunR: 40,
    far: '#434B45', mid: '#28302C', near: '#111513', sea: ['#555A52', '#0B0F0E'], glint: '#E9C39C',
    sand: '#7C6D5D', sandShade: '#5C4F42', foam: '#C7BDAC', foliage: '#0D110F', haze: '#8A7062',
    hull: '#1A1F1D', roof: '#29241F', stars: true,
  },
  night: {
    sky: ['#0B0C0C', '#15181A', '#2C2A27'], sun: '#EFE4CF', glow: '#8E826C', sunX: 1180, sunYR: 0.35, sunR: 24,
    far: '#202422', mid: '#161918', near: '#0A0C0B', sea: ['#272824', '#070808'], glint: '#D9CDB4',
    sand: '#57503F', sandShade: '#3F392E', foam: '#B6AC98', foliage: '#080A09', haze: '#38352F',
    hull: '#161917', roof: '#24201C', stars: true,
  },
  monsoon: {
    sky: ['#4E534A', '#878A7F', '#B7B4A4'], sun: '#E9E4D6', glow: '#CFC8B4', sunX: 1050, sunYR: 0.55, sunR: 40,
    far: '#7B8075', mid: '#4F574D', near: '#262D27', sea: ['#7E8278', '#1E2522'], glint: '#E8E2D2',
    sand: '#BDB29A', sandShade: '#9A8F77', foam: '#E8E2D2', foliage: '#1D241F', haze: '#B9B5A5',
    hull: '#E9E4D6', roof: '#B8531F', stars: false,
  },
};

const W = 1600;
const H = 1000;

function rng(seed: number) {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(r: () => number) {
  const oct = [0, 1, 2, 3].map((i) => ({ f: (0.0035 + r() * 0.003) * Math.pow(2.15, i), p: r() * Math.PI * 2, a: 1 / Math.pow(2, i) }));
  return (x: number) => oct.reduce((s, o) => s + o.a * Math.sin(x * o.f + o.p), 0) / 1.875;
}

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
type Shape = 'rise' | 'fall' | 'hill' | 'shelf-left' | 'shelf-right';

function envelope(shape: Shape, t: number) {
  switch (shape) {
    case 'rise':
      return smooth(clamp(t * 1.3));
    case 'fall':
      return smooth(clamp((1 - t) * 1.3));
    case 'hill':
      return Math.pow(Math.sin(Math.PI * t), 0.85);
    case 'shelf-left':
      return smooth(clamp((1 - t) * 5));
    case 'shelf-right':
      return smooth(clamp(t * 5));
  }
}

interface RidgeOpts {
  x0: number;
  x1: number;
  base: number;
  height: number;
  shape: Shape;
  seed: number;
  rough?: number;
  canopy?: number;
}

function ridge({ x0, x1, base, height, shape, seed, rough = 0.25, canopy = 0 }: RidgeOpts) {
  const r = rng(seed);
  const n = makeNoise(r);
  const phase = r() * 10;
  const yAt = (x: number) => {
    const e = envelope(shape, clamp((x - x0) / (x1 - x0)));
    const bumps = canopy * (0.55 + 0.45 * Math.sin(x * 0.11 + phase)) * Math.abs(Math.sin(x * 0.047 + phase * 2));
    return base - height * e * (1 + rough * n(x)) - bumps * Math.min(1, e * 3);
  };
  let d = `M${x0},${base}`;
  for (let x = x0; x <= x1 + 0.01; x += 12) d += `L${x.toFixed(1)},${yAt(x).toFixed(1)}`;
  return { d: `${d}L${x1},${base}Z`, yAt };
}

function mix(a: string, b: string, t: number) {
  const h = (s: string) => {
    const v = parseInt(s.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  };
  const pa = h(a);
  const pb = h(b);
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(',')})`;
}

interface Ctx {
  p: Palette;
  id: string;
  seed: number;
}
type Layer = 'far' | 'mid' | 'near';

function Ridge({ c, o, layer, reflect }: { c: Ctx; o: Omit<RidgeOpts, 'seed'> & { seed?: number }; layer: Layer; reflect?: boolean }) {
  const { d } = ridge({ ...o, seed: (o.seed ?? 0) + c.seed * 13 });
  const fill = `url(#${c.id}-${layer})`;
  return (
    <>
      {reflect && <path d={d} fill={fill} opacity={0.16} transform={`translate(0 ${2 * o.base}) scale(1 -1)`} />}
      <path d={d} fill={fill} />
    </>
  );
}

function Sea({ c, top }: { c: Ctx; top: number }) {
  return (
    <>
      <rect x={0} y={top} width={W} height={H - top} fill={`url(#${c.id}-sea)`} />
      <rect x={0} y={top - 40} width={W} height={90} fill={`url(#${c.id}-haze)`} />
    </>
  );
}

function Glitter({ c, horizon }: { c: Ctx; horizon: number }) {
  const r = rng(c.seed + 1);
  const bars: ReactNode[] = [];
  const span = (H - horizon) * 0.85;
  for (let i = 0; i < 30; i++) {
    const t = i / 30;
    const w = 14 + t * 220 * (0.4 + r() * 0.8);
    bars.push(
      <rect
        key={i}
        x={c.p.sunX + (r() - 0.5) * (30 + t * 160) - w / 2}
        y={horizon + 4 + Math.pow(t, 1.6) * span}
        width={w}
        height={1.5 + t * 4}
        rx={2}
        fill={c.p.glint}
        opacity={(0.55 - t * 0.4) * (0.5 + r() * 0.5)}
      />,
    );
  }
  return <g style={{ mixBlendMode: 'screen' }}>{bars}</g>;
}

function WaveLines({ c, top, density = 1 }: { c: Ctx; top: number; density?: number }) {
  const r = rng(c.seed + 77);
  const rows: ReactNode[] = [];
  const count = Math.round(14 * density);
  for (let k = 1; k <= count; k++) {
    const t = k / count;
    const y = top + Math.pow(t, 1.7) * (H - top);
    let d = '';
    let x = r() * 60;
    while (x < W) {
      const len = 20 + t * 140 * (0.4 + r());
      d += `M${x.toFixed(0)},${y.toFixed(1)}q${(len / 2).toFixed(0)},${(-2 - t * 3).toFixed(1)} ${len.toFixed(0)},0`;
      x += len + 30 + r() * (120 + t * 200);
    }
    rows.push(<path key={k} d={d} stroke={c.p.glint} strokeWidth={0.8 + t * 2.2} strokeLinecap="round" fill="none" opacity={0.08 + t * 0.12} />);
  }
  return <g>{rows}</g>;
}

function Stars({ c, horizon }: { c: Ctx; horizon: number }) {
  if (!c.p.stars) return null;
  const r = rng(c.seed + 3);
  return (
    <g fill="#EFE9DE">
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={r() * W} cy={r() * horizon * 0.7} r={0.6 + r() * 1.3} opacity={0.2 + r() * 0.55} />
      ))}
    </g>
  );
}

function Crescent({ c, cx, y, halfW, depth, thick = 16 }: { c: Ctx; cx: number; y: number; halfW: number; depth: number; thick?: number }) {
  const x0 = cx - halfW;
  const x1 = cx + halfW;
  const inner = `M${x0},${y + thick}Q${cx},${y - depth * 2 + thick * 1.6} ${x1},${y + thick}`;
  return (
    <>
      <path d={`M${x0},${y}Q${cx},${y - depth * 2} ${x1},${y}L${x1},${y + thick}Q${cx},${y - depth * 2 + thick * 1.6} ${x0},${y + thick}Z`} fill={`url(#${c.id}-sand)`} />
      <path d={inner} stroke={c.p.foam} strokeWidth={3} fill="none" opacity={0.8} />
    </>
  );
}

function Palm({ x, y, s = 1, color, flip = false }: { x: number; y: number; s?: number; color: string; flip?: boolean }) {
  const dir = flip ? -1 : 1;
  const tx = 18 * dir;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={color}>
      <path d={`M0,0Q${tx * 0.2},-55 ${tx},-110`} strokeWidth={6} fill="none" strokeLinecap="round" />
      <g transform={`translate(${tx} -110)`} stroke="none">
        {[-150, -120, -80, -40, -10, 25].map((a) => (
          <path key={a} transform={`rotate(${a * dir})`} d="M0,0C14,-10 38,-10 58,4C40,-1 20,1 0,4Z" />
        ))}
      </g>
    </g>
  );
}

function Boat({ c, x, y, s = 1, dir = 1 }: { c: Ctx; x: number; y: number; s?: number; dir?: 1 | -1 }) {
  const { p } = c;
  const dark = p.hull.startsWith('#2') || p.hull.startsWith('#1');
  return (
    <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
      <path d="M-84,2 L-420,-10" stroke={p.foam} strokeWidth={3} opacity={0.3} strokeLinecap="round" />
      <path d="M-84,4 L-440,30" stroke={p.foam} strokeWidth={4} opacity={0.25} strokeLinecap="round" />
      <path d="M-80,2 L70,2 Q88,6 94,20 L-82,20Z" fill={p.hull} opacity={0.14} />
      <rect x={-54} y={-56} width={98} height={6} rx={2} fill={p.roof} />
      {[-48, -6, 36].map((px) => (
        <rect key={px} x={px} y={-52} width={3} height={32} fill={p.roof} />
      ))}
      {[-38, -24, -10, 6, 20].map((px, i) => (
        <circle key={px} cx={px} cy={-30 - (i % 2) * 2} r={4.2} fill={mix(p.near, '#000000', 0.25)} opacity={0.85} />
      ))}
      <path d="M-80,0 L70,0 Q90,-4 98,-24 L-86,-24 Q-88,-10 -80,0Z" fill={p.hull} />
      <rect x={-86} y={-16} width={180} height={4} fill={dark ? p.roof : '#2C2621'} />
      {dark && <circle cx={-50} cy={-60} r={5} fill="#FFD9A0" />}
    </g>
  );
}

function CruiseBoat({ c, x, y, s = 1 }: { c: Ctx; x: number; y: number; s?: number }) {
  const { p } = c;
  const dark = p.hull.startsWith('#2') || p.hull.startsWith('#1');
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-150,4 L-560,-8" stroke={p.foam} strokeWidth={3} opacity={0.3} strokeLinecap="round" />
      <path d="M-150,6 L-600,44" stroke={p.foam} strokeWidth={5} opacity={0.24} strokeLinecap="round" />
      <path d="M-146,2 L130,2 Q154,8 160,30 L-150,30Z" fill={p.hull} opacity={0.14} />
      <rect x={-96} y={-104} width={170} height={7} rx={3} fill={p.roof} />
      {[-90, -30, 30, 68].map((px) => (
        <rect key={px} x={px} y={-98} width={3} height={30} fill={p.roof} />
      ))}
      <rect x={-120} y={-68} width={220} height={36} rx={5} fill={p.hull} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={-108 + i * 25} y={-60} width={16} height={14} rx={3} fill={dark ? '#F3C58F' : '#2C2621'} opacity={dark ? 0.9 : 0.7} />
      ))}
      <path d="M-146,0 L126,0 Q156,-6 166,-36 L-154,-36 Q-156,-14 -146,0Z" fill={p.hull} />
      <rect x={-154} y={-22} width={316} height={5} fill={dark ? p.roof : '#2C2621'} />
    </g>
  );
}

function Dolphin({ x, y, s = 1, color, flip = false }: { x: number; y: number; s?: number; color: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M0,0 C18,-46 84,-62 122,-14 C110,-26 92,-34 70,-34 L62,-58 L50,-36 C32,-32 16,-18 10,2Z" fill={color} />
    </g>
  );
}

function Rock({ x, y, w, h, color, foam }: { x: number; y: number; w: number; h: number; color: string; foam: string }) {
  return (
    <g>
      <path d={`M${x - w / 2},${y} Q${x - w / 2.4},${y - h} ${x},${y - h} Q${x + w / 2.2},${y - h * 0.9} ${x + w / 2},${y}Z`} fill={color} />
      <ellipse cx={x} cy={y + 2} rx={w * 0.62} ry={5} fill={foam} opacity={0.4} />
    </g>
  );
}

function renderScene(scene: ArtScene, c: Ctx): { horizon: number; body: ReactNode } {
  const { p } = c;
  const crest = mix(p.near, '#000000', 0.15);
  switch (scene) {
    case 'hero': {
      const hz = 430;
      const near = ridge({ x0: 1240, x1: 1660, base: 770, height: 540, shape: 'rise', seed: 3 + c.seed * 13, rough: 0.22, canopy: 14 });
      return {
        horizon: hz,
        body: (
          <>
            <Ridge c={c} layer="far" o={{ x0: 780, x1: 1660, base: hz + 6, height: 95, shape: 'rise', rough: 0.3, canopy: 4, seed: 1 }} />
            <Sea c={c} top={hz} />
            <Glitter c={c} horizon={hz} />
            <WaveLines c={c} top={hz} />
            <Ridge c={c} layer="mid" reflect o={{ x0: 1020, x1: 1660, base: 548, height: 250, shape: 'rise', rough: 0.25, canopy: 8, seed: 2 }} />
            <path d={near.d} fill={`url(#${c.id}-near)`} />
            {[1380, 1430, 1500, 1560].map((x, i) => (
              <Palm key={x} x={x} y={near.yAt(x) + 6} s={0.5 + i * 0.08} color={crest} flip={i % 2 === 0} />
            ))}
            <Boat c={c} x={560} y={660} s={1.15} dir={-1} />
          </>
        ),
      };
    }
    case 'cove':
    case 'swim': {
      const wl = scene === 'swim' ? 560 : 640;
      const left = ridge({ x0: -40, x1: 560, base: wl + 60, height: 470, shape: 'fall', seed: 7 + c.seed * 13, rough: 0.2, canopy: 12 });
      return {
        horizon: wl,
        body: (
          <>
            <Ridge c={c} layer="far" o={{ x0: -40, x1: 1640, base: wl + 10, height: 330, shape: 'hill', rough: 0.35, canopy: 6, seed: 4 }} />
            <Sea c={c} top={wl - 12} />
            <Crescent c={c} cx={800} y={wl} halfW={scene === 'swim' ? 540 : 470} depth={scene === 'swim' ? 40 : 46} />
            {[660, 735, 905, 980].map((x, i) => (
              <Palm key={x} x={x} y={wl - 36 - (i === 1 || i === 2 ? 6 : 0)} s={0.42 + (i % 2) * 0.08} color={p.foliage} flip={i > 1} />
            ))}
            <path d={left.d} fill={`url(#${c.id}-near)`} />
            <Ridge c={c} layer="near" reflect o={{ x0: 1040, x1: 1640, base: wl + 50, height: 420, shape: 'rise', rough: 0.2, canopy: 12, seed: 8 }} />
            <WaveLines c={c} top={wl + 40} density={0.8} />
            {scene === 'swim' ? (
              <>
                <Rock x={300} y={880} w={150} h={70} color={crest} foam={p.foam} />
                <Rock x={1320} y={930} w={210} h={90} color={crest} foam={p.foam} />
              </>
            ) : (
              <Boat c={c} x={1180} y={860} s={0.7} dir={-1} />
            )}
          </>
        ),
      };
    }
    case 'twin-cove': {
      const wl = 640;
      const point = ridge({ x0: 740, x1: 900, base: wl + 30, height: 90, shape: 'hill', seed: 21 + c.seed * 13, rough: 0.4, canopy: 6 });
      return {
        horizon: wl,
        body: (
          <>
            <Ridge c={c} layer="far" o={{ x0: -40, x1: 1640, base: wl + 10, height: 320, shape: 'hill', rough: 0.4, canopy: 6, seed: 11 }} />
            <Sea c={c} top={wl - 12} />
            <Crescent c={c} cx={520} y={wl} halfW={300} depth={44} />
            <Crescent c={c} cx={1110} y={wl + 4} halfW={260} depth={38} />
            <path d={point.d} fill={`url(#${c.id}-mid)`} />
            <Palm x={800} y={point.yAt(800) + 8} s={0.5} color={p.foliage} />
            {[400, 470, 600, 1040, 1180].map((x, i) => (
              <Palm key={x} x={x} y={wl - 52 + (i % 2) * 6} s={0.36 + (i % 3) * 0.05} color={p.foliage} flip={i % 2 === 1} />
            ))}
            <Ridge c={c} layer="near" reflect o={{ x0: -40, x1: 320, base: wl + 70, height: 400, shape: 'fall', rough: 0.2, canopy: 12, seed: 12 }} />
            <Ridge c={c} layer="near" reflect o={{ x0: 1320, x1: 1640, base: wl + 60, height: 380, shape: 'rise', rough: 0.2, canopy: 12, seed: 13 }} />
            <WaveLines c={c} top={wl + 40} density={0.8} />
          </>
        ),
      };
    }
    case 'cliffs': {
      const hz = 470;
      const cliff = ridge({ x0: -40, x1: 980, base: 820, height: 700, shape: 'fall', seed: 31 + c.seed * 13, rough: 0.28, canopy: 10 });
      return {
        horizon: hz,
        body: (
          <>
            <Ridge c={c} layer="far" o={{ x0: 1220, x1: 1660, base: hz + 6, height: 60, shape: 'rise', rough: 0.3, canopy: 3, seed: 30 }} />
            <Sea c={c} top={hz} />
            <Glitter c={c} horizon={hz} />
            <WaveLines c={c} top={hz} />
            <path d={cliff.d} fill={`url(#${c.id}-near)`} opacity={0.16} transform="translate(0 1640) scale(1 -1)" />
            <path d={cliff.d} fill={`url(#${c.id}-near)`} />
            {[180, 260, 420].map((x, i) => (
              <Palm key={x} x={x} y={cliff.yAt(x) + 8} s={0.55 + i * 0.06} color={crest} flip={i === 1} />
            ))}
            <Rock x={820} y={836} w={120} h={60} color={crest} foam={p.foam} />
            <Rock x={940} y={850} w={80} h={36} color={crest} foam={p.foam} />
            <Boat c={c} x={1240} y={640} s={0.75} dir={-1} />
          </>
        ),
      };
    }
    case 'estuary': {
      const hz = 400;
      return {
        horizon: hz,
        body: (
          <>
            <Ridge c={c} layer="far" o={{ x0: -40, x1: 1640, base: hz + 8, height: 120, shape: 'hill', rough: 0.5, canopy: 3, seed: 40 }} />
            <Sea c={c} top={hz} />
            <Glitter c={c} horizon={hz} />
            <Ridge c={c} layer="far" reflect o={{ x0: -40, x1: 980, base: 470, height: 50, shape: 'shelf-left', rough: 0.35, canopy: 10, seed: 41 }} />
            <Ridge c={c} layer="mid" reflect o={{ x0: 640, x1: 1640, base: 540, height: 70, shape: 'shelf-right', rough: 0.35, canopy: 10, seed: 42 }} />
            <Ridge c={c} layer="near" reflect o={{ x0: -40, x1: 640, base: 680, height: 110, shape: 'shelf-left', rough: 0.35, canopy: 10, seed: 43 }} />
            <Ridge c={c} layer="near" reflect o={{ x0: 1180, x1: 1640, base: 820, height: 150, shape: 'shelf-right', rough: 0.35, canopy: 10, seed: 44 }} />
            <WaveLines c={c} top={hz + 20} density={0.6} />
            <g transform="translate(900 740)">
              <path d="M-70,0 Q0,14 70,0 L60,-10 L-60,-10Z" fill={crest} />
              <path d="M-6,-10 L-2,-46" stroke={crest} strokeWidth={3} />
              <circle cx={-2} cy={-50} r={6} fill={crest} />
            </g>
          </>
        ),
      };
    }
    case 'open-sea':
    case 'dolphins':
    case 'cruise': {
      const hz = scene === 'open-sea' ? 560 : scene === 'dolphins' ? 470 : 520;
      const dc = mix(p.near, p.sea[1], 0.35);
      return {
        horizon: hz,
        body: (
          <>
            <Ridge c={c} layer="far" o={{ x0: -40, x1: 480, base: hz + 6, height: 75, shape: 'shelf-left', rough: 0.4, canopy: 3, seed: 50 }} />
            <Sea c={c} top={hz} />
            <Glitter c={c} horizon={hz} />
            <WaveLines c={c} top={hz} />
            {scene === 'cruise' && (
              <>
                <Ridge c={c} layer="mid" reflect o={{ x0: 1080, x1: 1660, base: 600, height: 200, shape: 'rise', rough: 0.25, canopy: 8, seed: 81 }} />
                <CruiseBoat c={c} x={720} y={760} s={1.3} />
              </>
            )}
            {scene === 'open-sea' && <Boat c={c} x={980} y={770} s={1.05} dir={-1} />}
            {scene === 'dolphins' && (
              <>
                <Dolphin x={480} y={760} s={1.45} color={dc} />
                <Dolphin x={780} y={700} s={1.05} color={dc} />
                <Dolphin x={1060} y={740} s={0.8} color={dc} flip />
              </>
            )}
          </>
        ),
      };
    }
    case 'town': {
      const wl = 620;
      const r = rng(c.seed + 70);
      const houses: ReactNode[] = [];
      for (let x = 60; x < 1560; x += 26 + r() * 30) {
        if (x > 830 && x < 970) continue;
        const h = 18 + r() * 38;
        houses.push(<rect key={x} x={x} y={wl - 10 - h} width={22 + r() * 30} height={h + 10} fill={mix(p.mid, p.haze, 0.25 + r() * 0.2)} />);
      }
      return {
        horizon: wl,
        body: (
          <>
            <Ridge c={c} layer="far" o={{ x0: -40, x1: 1640, base: wl, height: 190, shape: 'hill', rough: 0.45, canopy: 6, seed: 71 }} />
            <g fill={mix(p.mid, p.haze, 0.15)}>
              {Array.from({ length: 7 }, (_, i) => {
                const w = 110 - i * 13;
                return <rect key={i} x={900 - w / 2} y={wl - 30 - (i + 1) * 22} width={w} height={23} rx={2} />;
              })}
              <rect x={884} y={wl - 30} width={32} height={30} />
            </g>
            {houses}
            {[200, 330, 520, 700, 1080, 1260, 1420].map((x, i) => (
              <Palm key={x} x={x} y={wl - 6} s={0.55 + (i % 3) * 0.08} color={p.foliage} flip={i % 2 === 0} />
            ))}
            <rect x={0} y={wl - 8} width={W} height={50} fill={`url(#${c.id}-sand)`} />
            <Sea c={c} top={wl + 40} />
            <WaveLines c={c} top={wl + 50} />
          </>
        ),
      };
    }
  }
}

interface CoastalArtProps {
  scene: ArtScene;
  mood: ArtMood;
  seed?: number;
  className?: string;
  title: string;
}

function CoastalArtBase({ scene, mood, seed = 1, className, title }: CoastalArtProps) {
  const id = `ca${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const p = PALETTES[mood];
  const { horizon, body } = useMemo(() => renderScene(scene, { p, id, seed }), [scene, p, id, seed]);
  const cy = horizon * p.sunYR;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset={(horizon / H) * 0.55} stopColor={p.sky[1]} />
          <stop offset={horizon / H} stopColor={p.sky[2]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={p.glow} stopOpacity="0.8" />
          <stop offset="0.25" stopColor={p.glow} stopOpacity="0.3" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sea[0]} />
          <stop offset="1" stopColor={p.sea[1]} />
        </linearGradient>
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.haze} stopOpacity="0" />
          <stop offset="0.45" stopColor={p.haze} stopOpacity="0.5" />
          <stop offset="1" stopColor={p.haze} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-sand`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sandShade} />
          <stop offset="1" stopColor={p.sand} />
        </linearGradient>
        {(['far', 'mid', 'near'] as const).map((layer) => (
          <linearGradient key={layer} id={`${id}-${layer}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p[layer]} />
            <stop offset="1" stopColor={mix(p[layer], p.haze, layer === 'near' ? 0.1 : 0.32)} />
          </linearGradient>
        ))}
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <Stars c={{ p, id, seed }} horizon={horizon} />
      <circle cx={p.sunX} cy={cy} r={p.sunR * 7} fill={`url(#${id}-glow)`} />
      <circle cx={p.sunX} cy={cy} r={p.sunR} fill={p.sun} />
      {body}
    </svg>
  );
}

export const CoastalArt = memo(CoastalArtBase);
