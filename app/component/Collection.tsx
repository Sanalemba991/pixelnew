"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";

const U = (id: string, w = 1000) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Item = {
    index: string;
    title: string;
    sub: string;
    cta: string;
    img: string;
    icon: "camera" | "phone" | "headphones" | "grid";
};

const ITEMS: Item[] = [
    { index: "01", title: "Camera Collection", sub: "For photographers, filmmakers & creators.", cta: "Explore Cameras", img: "/prod-camera.jpg", icon: "camera" },
    { index: "02", title: "iPhone Collection", sub: "Latest iPhones, cases & more.", cta: "Explore iPhones", img: "/prod-iphone.jpg", icon: "phone" },
    { index: "03", title: "Accessories Collection", sub: "Headphones, audio & gear.", cta: "Explore Accessories", img: "/prod-headphones.jpg", icon: "headphones" },
    { index: "04", title: "Lenses Collection", sub: "Prime, zoom & cinema lenses.", cta: "Explore Lenses", img: "/prod-lens.jpg", icon: "grid" },
];

const AVATARS = [
    U("photo-1507003211169-0a1dd7228f2d", 120),
    U("photo-1494790108377-be9c29b29330", 120),
    U("photo-1500648767791-00dcc994a43e", 120),
];

const N = ITEMS.length;
const ORANGE = "#ff6a00";

/* Stage = size of the reference screenshot. Every number is a pixel read off it. */
const SHIFT = 80; /* how far the slider moves right, away from the text */
const SLIDE_W = 1124;
const STAGE_W = SLIDE_W + SHIFT;
const STAGE_H = 516;

type Quad = [number, number, number, number, number, number, number, number];

/* [TLx,TLy, TRx,TRy, BRx,BRy, BLx,BLy]
   Exact perspective matching the reference image:
   - Card 01 (front active): wide, leans left, rests on left base.
   - Upcoming cards (02, 03, 04) are upright/tall with their bottoms resting
     flush along the glowing pedestal ring (BL around 448 -> 426 -> 404,
     BR around 432 -> 412 -> 392). */
const QUADS: Quad[] = [
    [198, 214, 640, 70, 612, 464, 148, 456], // 01 front
    [584, 130, 814, 114, 798, 434, 574, 450], // 02 iPhone
    [774, 160, 970, 146, 956, 418, 758, 432], // 03 Accessories
    [930, 194, 1098, 184, 1086, 402, 918, 414], // 04 Lenses
];

const FLAT = [
    { w: 560, h: 340, rad: 30, dim: 0, pad: 48, it: 50, ifs: 16, tmt: 14, tfs: 42, tlh: 44 },
    { w: 230, h: 322, rad: 24, dim: 0.1, pad: 80, it: 30, ifs: 14, tmt: 8, tfs: 21, tlh: 25 },
    { w: 200, h: 274, rad: 22, dim: 0.18, pad: 68, it: 26, ifs: 13, tmt: 8, tfs: 19, tlh: 23 },
    { w: 170, h: 222, rad: 20, dim: 0.28, pad: 60, it: 22, ifs: 12, tmt: 8, tfs: 17, tlh: 20 },
];

const Z = [20, 15, 10, 5];

const vec = (q: Quad, f: (typeof FLAT)[number], o: number, dim = f.dim) => [
    ...q, f.w, f.h, o, dim, f.rad, f.pad, f.it, f.ifs, f.tmt, f.tfs, f.tlh,
];

const xf = (q: Quad, dx: number, dy: number, s = 1): Quad => {
    const cx = (q[0] + q[2] + q[4] + q[6]) / 4;
    const cy = (q[1] + q[3] + q[5] + q[7]) / 4;
    return q.map((v, i) => (i % 2 === 0 ? cx + (v - cx) * s + dx : cy + (v - cy) * s + dy)) as Quad;
};

const HIDDEN_LEFT = vec(xf(QUADS[0], -360, 30), FLAT[0], 0, 0.3);
const HIDDEN_RIGHT = vec(xf(QUADS[3], 110, 14, 0.82), FLAT[3], 0, 0.6);

const slotVec = (p: number): number[] =>
    p < 0 ? HIDDEN_LEFT : p >= N ? HIDDEN_RIGHT : vec(QUADS[p], FLAT[p], 1);
const zFor = (p: number) => (p < 0 ? 25 : p >= N ? 2 : Z[p]);

function toMatrix(v: number[]) {
    const [x0, y0, x1, y1, x2, y2, x3, y3, w, h] = v;
    const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
    const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    const den = dx1 * dy2 - dx2 * dy1;
    let g = 0, hh = 0;
    if (Math.abs(dx3) > 1e-9 || Math.abs(dy3) > 1e-9) {
        g = (dx3 * dy2 - dx2 * dy3) / den;
        hh = (dx1 * dy3 - dx3 * dy1) / den;
    }
    const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0;
    const d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
    return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${hh / h},0,0,1,0,${c},${f},0,1)`;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const Icon = ({ name, size = 22 }: { name: Item["icon"]; size?: number }) => {
    const p = {
        width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
        strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    };
    if (name === "camera")
        return (
            <svg {...p}>
                <path d="M4 8h3l1.6-2.2h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                <circle cx="12" cy="13" r="3.6" />
            </svg>
        );
    if (name === "phone")
        return (
            <svg {...p}>
                <rect x="7" y="2.5" width="10" height="19" rx="2.4" />
                <path d="M11 18.5h2" />
            </svg>
        );
    if (name === "headphones")
        return (
            <svg {...p}>
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                <rect x="3" y="14" width="4" height="6.5" rx="1.6" />
                <rect x="17" y="14" width="4" height="6.5" rx="1.6" />
            </svg>
        );
    return (
        <svg {...p}>
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </svg>
    );
};

const Arrow = ({ dir = "right", size = 12 }: { dir?: "left" | "right"; size?: number }) => (
    <svg
        width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: dir === "left" ? "scaleX(-1)" : undefined }}
    >
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const Laurel = () => {
    const leaves: { x: number; y: number; r: number }[] = [];
    [-1, 1].forEach((side) => {
        for (let i = 0; i < 6; i++) {
            const phi = ((22 + i * 20) * Math.PI) / 180;
            leaves.push({
                x: 20 + side * 14.5 * Math.sin(phi),
                y: 20 + 14.5 * Math.cos(phi),
                r: (Math.atan2(-Math.sin(phi), side * Math.cos(phi)) * 180) / Math.PI,
            });
        }
    });
    return (
        <svg width="40" height="40" viewBox="0 0 40 40">
            {leaves.map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="3.6" ry="1.7" fill="#d9731c" transform={`rotate(${l.r} ${l.x} ${l.y})`} />
            ))}
            <path d="M13.5 20.5l4.6 4.6 8.6-9.6" fill="none" stroke="#17120d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

/* rail icon centres, read from the reference */
const RAIL_DX = -120; /* moves the rail left (the slider group is already offset by SHIFT) */
const RAIL_DY = 36; /* shifts the rail and line downwards to clear the subtitle text */
const RAIL: [number, number][] = [
    [136 + RAIL_DX, 240 + RAIL_DY],
    [110 + RAIL_DX, 301 + RAIL_DY],
    [98 + RAIL_DX, 366 + RAIL_DY],
    [108 + RAIL_DX, 430 + RAIL_DY],
];

export default function Page() {
    const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

    const [pos, setPos] = useState<number[]>(ITEMS.map((_, i) => i));
    const posRef = useRef<number[]>(ITEMS.map((_, i) => i));
    const [scale, setScale] = useState(1);
    const [ready, setReady] = useState(false);

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cur = useRef<number[][]>(ITEMS.map((_, i) => slotVec(i).slice()));
    const raf = useRef(0);
    const busy = useRef(false);
    const lastActive = useRef(0);

    const commit = (p: number[]) => {
        posRef.current = p;
        setPos(p);
    };

    const apply = useCallback((i: number) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const v = cur.current[i];
        const s = el.style;
        s.width = `${v[8]}px`;
        s.height = `${v[9]}px`;
        s.opacity = String(Math.max(0, Math.min(1, v[10])));
        s.borderRadius = `${v[12]}px`;
        s.transform = toMatrix(v);
        const w = v[8], h = v[9], r = Math.min(v[12], w / 4, h / 4), t = Math.max(0, Math.min(1, (w - FLAT[1].w) / (FLAT[0].w - FLAT[1].w))), b = h * 0.035 * t; /* bend only the front card; fades in/out as a card moves to/from the front */
        s.setProperty(
            "--clip",
            `path('M 0 ${b + r} Q 0 ${b} ${r} ${b} Q ${w / 2} ${-b} ${w - r} ${b} Q ${w} ${b} ${w} ${b + r} L ${w} ${h - r} Q ${w} ${h} ${w - r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h - r} Z')`
        );
        /* glowing bottom rim that follows the same bent bottom edge */
        const k = 2 + 2 * t, y0 = h;
        s.setProperty(
            "--rim",
            `path('M 0 ${y0 - r} Q 0 ${y0} ${r} ${y0} L ${w - r} ${y0} Q ${w} ${y0} ${w} ${y0 - r} L ${w} ${y0 - r - k} Q ${w} ${y0 - k} ${w - r} ${y0 - k} L ${r} ${y0 - k} Q 0 ${y0 - k} 0 ${y0 - r - k} Z')`
        );
        s.setProperty("--dim", String(v[11] * 0.6));
        s.setProperty("--pad", String(v[13]));
        s.setProperty("--it", String(v[14]));
        s.setProperty("--ifs", String(v[15]));
        s.setProperty("--tmt", String(v[16]));
        s.setProperty("--tfs", String(v[17]));
        s.setProperty("--tlh", String(v[18]));
    }, []);

    const animate = useCallback(
        (targets: number[][], ms: number, done?: () => void) => {
            cancelAnimationFrame(raf.current);
            const from = cur.current.map((v) => v.slice());
            const t0 = performance.now();
            const tick = (now: number) => {
                const t = Math.min(1, (now - t0) / ms);
                const e = easeOut(t);
                cur.current = from.map((f, i) => f.map((x, k) => x + (targets[i][k] - x) * e));
                cur.current.forEach((_, i) => apply(i));
                if (t < 1) raf.current = requestAnimationFrame(tick);
                else done?.();
            };
            raf.current = requestAnimationFrame(tick);
        },
        [apply]
    );

    useEffect(() => {
        cur.current.forEach((_, i) => apply(i));
        setReady(true);

        const onResize = () => {
            const c = document.getElementById("exp-stage-container");
            const w = c ? c.clientWidth : Math.min(window.innerWidth - 32, STAGE_W);
            setScale(Math.min(1, w / STAGE_W));
        };
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(raf.current);
        };
    }, [apply]);

    const run = (forward: boolean) => {
        if (busy.current) return;
        busy.current = true;
        const first = posRef.current.map((p) => (forward ? p - 1 : p + 1));
        commit(first);
        animate(first.map(slotVec), 560, () => {
            const from = forward ? -1 : N;
            const to = forward ? N : -1;
            const idx = first.indexOf(from);
            const second = first.map((p) => (p === from ? to : p));
            if (idx >= 0) {
                cur.current[idx] = slotVec(to).slice();
                apply(idx);
            }
            commit(second);
            const third = second.map((p) => (p === to ? (forward ? N - 1 : 0) : p));
            requestAnimationFrame(() => {
                commit(third);
                animate(third.map(slotVec), 520, () => {
                    busy.current = false;
                });
            });
        });
    };

    const goTo = (i: number) => {
        if (busy.current) return;
        if (i === posRef.current.indexOf(0)) return;
        busy.current = true;
        const target = ITEMS.map((_, j) => (j - i + N) % N);
        commit(target);
        animate(target.map(slotVec), 700, () => {
            busy.current = false;
        });
    };

    const nextRef = useRef(() => { });
    const prevRef = useRef(() => { });
    nextRef.current = () => run(true);
    prevRef.current = () => run(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextRef.current();
            if (e.key === "ArrowLeft") prevRef.current();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const activeIdx = pos.indexOf(0);
    if (activeIdx >= 0) lastActive.current = activeIdx;
    const shown = lastActive.current;

    return (
        <section className="relative w-full bg-gradient-to-b from-[#fbf4f1] via-[#fcfaf8] to-white pt-4 sm:pt-6 lg:pt-8 pb-14 sm:pb-20 lg:pb-24 border-b border-neutral-100 overflow-hidden select-none">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap');
        .exp-root{font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:#14100c}
        .exp-card{position:absolute;cursor:pointer;will-change:transform,opacity;
          filter:drop-shadow(0 4px 14px rgba(20,8,0,.18)) drop-shadow(0 0 6px rgba(255,106,0,.15));
          transition:filter .65s ease}
        .exp-card.active{filter:drop-shadow(0 8px 24px rgba(20,8,0,.22)) drop-shadow(0 0 10px rgba(255,106,0,.25))}
        .exp-clip{position:absolute;inset:0;overflow:hidden;border-radius:inherit;background:#14100c;clip-path:var(--clip)}
        .exp-card .bg{position:absolute;inset:0;background-size:cover;transition:transform .9s ${ease},background-position .65s ${ease}}
        .exp-card.active .bg{transform:scale(1.05)}
        .exp-btn{display:inline-flex;align-items:center;gap:13px;background:#fff;color:#1b1510;border:0;border-radius:999px;
          height:50px;padding:0 8px 0 22px;font-family:inherit;font-weight:750;font-size:15px;cursor:pointer;
          box-shadow:0 8px 24px rgba(0,0,0,.45);white-space:nowrap;letter-spacing:-0.01em}
        .exp-btn i{width:36px;height:36px;border-radius:50%;background:${ORANGE};color:#fff;display:grid;place-items:center}
        .exp-nav{width:36px;height:36px;border-radius:50%;border:0;display:grid;place-items:center;cursor:pointer;transition:transform .2s}
        .exp-nav:hover{transform:scale(1.1)}
        .exp-rail{position:absolute;width:50px;height:50px;border-radius:50%;border:0;display:grid;place-items:center;cursor:pointer;
          box-shadow:0 8px 24px rgba(0,0,0,.08);transition:all .45s ${ease}}
        .exp-rail:hover{transform:scale(1.08)}
        .exp-rail.active{background:#ff6a00 !important;color:#fff !important;
          box-shadow:0 4px 12px rgba(255,106,0,.28) !important}
        @media (prefers-reduced-motion:reduce){.exp-card .bg{transition-duration:.01s!important}}
      `}</style>

            <div className="exp-root max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                <div
                    id="exp-stage-container"
                    className="relative flex justify-center items-center w-full"
                    style={{ height: STAGE_H * scale, maxWidth: STAGE_W * 1.1 }}
                >
                    <div style={{ width: STAGE_W * scale, height: STAGE_H * scale, position: "relative" }}>
                        <div
                            style={{
                                width: STAGE_W,
                                height: STAGE_H,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                transform: `scale(${scale})`,
                                transformOrigin: "top left",
                            }}
                        >
                            {/* soft disc behind cards */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: 800 - 330 + SHIFT,
                                    top: 240 - 330,
                                    width: 660,
                                    height: 660,
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle,rgba(255,255,255,.95) 0%,rgba(255,255,255,.55) 62%,rgba(255,255,255,0) 100%)",
                                    boxShadow: "0 0 90px rgba(255,190,140,.22)",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Header */}
                            <div style={{ position: "absolute", left: 16, top: 10, display: "flex", alignItems: "center", gap: 10, height: 18 }}>
                                <span style={{ width: 32, height: 2, background: ORANGE, borderRadius: 2 }} />
                                <span style={{ fontSize: 11, letterSpacing: "0.22em", fontWeight: 700, color: "#241c15" }}>
                                    EXPLORE COLLECTIONS
                                </span>
                            </div>
                            <h1
                                style={{
                                    position: "absolute",
                                    left: 14,
                                    top: 36,
                                    margin: 0,
                                    fontSize: 51,
                                    lineHeight: "44px",
                                    fontWeight: 800,
                                    fontStyle: "italic",
                                    letterSpacing: "-0.04em",
                                    whiteSpace: "nowrap",
                                    color: "#14100c",
                                }}
                            >
                                Explore by
                                <br />
                                <span
                                    style={{
                                        background: "linear-gradient(90deg,#ff8a1f,#ff5a00)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        paddingRight: 8,
                                    }}
                                >
                                    Experience
                                </span>
                            </h1>
                            <p
                                style={{
                                    position: "absolute",
                                    left: 16,
                                    top: 138,
                                    margin: 0,
                                    fontSize: 14.5,
                                    lineHeight: "21px",
                                    color: "#5f5750",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Curated gear zones for creators,
                                <br />
                                professionals and everyday tech lovers.
                            </p>

                            {/* Slider group: shifted right to open a gap from the text */}
                            <div style={{ position: "absolute", left: SHIFT, top: 0, width: SLIDE_W, height: STAGE_H }}>
                                {/* Trusted pill */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 757,
                                        top: 22,
                                        width: 331,
                                        height: 58,
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0 10px 0 12px",
                                        background: "rgba(255,255,255,.55)",
                                        borderRadius: 999,
                                        boxShadow: "0 10px 30px rgba(60,40,20,.08)",
                                        border: "1px solid rgba(255,255,255,.9)",
                                        backdropFilter: "blur(6px)",
                                        zIndex: 40,
                                    }}
                                >
                                    <Laurel />
                                    <div style={{ lineHeight: 1.25, marginLeft: 8 }}>
                                        <div style={{ fontSize: 12.5, color: "#6d645c" }}>Trusted by</div>
                                        <div style={{ fontSize: 14.5, fontWeight: 700, color: "#ff6a00" }}>
                                            10,000+ <span style={{ color: "#5d544c", fontWeight: 600 }}>Creators</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto", alignItems: "center" }}>
                                        {AVATARS.map((a, i) => (
                                            <img
                                                key={i}
                                                src={a}
                                                alt=""
                                                style={{
                                                    width: 34,
                                                    height: 34,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    border: "2px solid #fff",
                                                    marginLeft: i ? -10 : 0,
                                                }}
                                            />
                                        ))}
                                        <div
                                            style={{
                                                width: 34,
                                                height: 34,
                                                borderRadius: "50%",
                                                background: ORANGE,
                                                color: "#fff",
                                                display: "grid",
                                                placeItems: "center",
                                                marginLeft: -6,
                                                fontSize: 20,
                                                fontWeight: 500,
                                                lineHeight: 1,
                                                border: "2px solid #fff",
                                                boxShadow: "0 4px 10px rgba(255,106,0,.45)",
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>

                                {/* Left icon rail */}
                                <svg
                                    style={{
                                        position: "absolute",
                                        left: RAIL_DX - 60,
                                        top: 150 + RAIL_DY,
                                        width: 260,
                                        height: 380,
                                        pointerEvents: "none",
                                        zIndex: 25,
                                        overflow: "visible",
                                    }}
                                    viewBox="0 0 260 380"
                                    fill="none"
                                >
                                    {(() => {
                                        // Center & radius of circular arc conforming around the button orbit (more curved, R=265)
                                        const cx = 360;
                                        const cy = 215;
                                        const R = 265;

                                        // Start/end points extending a little longer past the top and bottom dots
                                        const pStart = { x: 172.6, y: 27.6 };
                                        const pEnd = { x: 124.9, y: 337.4 };
                                        const arcPath = `M ${pStart.x} ${pStart.y} A ${R} ${R} 0 0 0 ${pEnd.x} ${pEnd.y}`;

                                        // Dots on the circle arc corresponding to each button with wider clean gap (no connector lines)
                                        const dots = [
                                            { dotX: 141.5, dotY: 65.0 },
                                            { dotX: 106.4, dotY: 138.0 },
                                            { dotX: 95.0, dotY: 215.0 },
                                            { dotX: 105.8, dotY: 290.0 },
                                        ];

                                        return (
                                            <>
                                                {/* True circular arc curve */}
                                                <path
                                                    d={arcPath}
                                                    stroke="#ff8214"
                                                    strokeWidth="1.4"
                                                    strokeOpacity="0.8"
                                                    strokeLinecap="round"
                                                />
                                                {/* Orange dots on the circular curve */}
                                                {dots.map((d, i) => (
                                                    <circle
                                                        key={i}
                                                        cx={d.dotX}
                                                        cy={d.dotY}
                                                        r="3.2"
                                                        fill="#ff6a00"
                                                    />
                                                ))}
                                            </>
                                        );
                                    })()}
                                </svg>

                                {ITEMS.map((it, i) => {
                                    const on = i === shown;
                                    const [cx, cy] = RAIL[i];
                                    return (
                                        <button
                                            key={it.icon}
                                            aria-label={it.title}
                                            className={`exp-rail${on ? " active" : ""}`}
                                            onClick={() => goTo(i)}
                                            style={{
                                                left: cx - 25,
                                                top: cy - 25,
                                                zIndex: 30,
                                                background: on ? "#ff6a00" : "#ffffff",
                                                color: on ? "#ffffff" : "#1b1510",
                                                boxShadow: on
                                                    ? "0 4px 12px rgba(255,106,0,.28)"
                                                    : "0 4px 14px rgba(60,40,20,.08)",
                                            }}
                                        >
                                            <Icon name={it.icon} />
                                        </button>
                                    );
                                })}

                                {/* Pedestal: wide white disc, glowing orange rim that rises to the right */}


                                {/* Cards */}
                                {ITEMS.map((it, i) => {
                                    const p = pos[i];
                                    const isActive = p === 0;
                                    const [first, ...rest] = it.title.split(" ");
                                    const reveal = (delay: number) => ({
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? "none" : "translateY(8px)",
                                        transition: `opacity .45s ease ${isActive ? delay : 0}s,transform .5s ${ease} ${isActive ? delay : 0}s`,
                                    });
                                    return (
                                        <div
                                            key={it.index}
                                            ref={(el) => {
                                                cardRefs.current[i] = el;
                                            }}
                                            className={`exp-card${isActive ? " active" : ""}`}
                                            onClick={() => (isActive ? undefined : goTo(i))}
                                            style={{
                                                left: 0,
                                                top: 0,
                                                transformOrigin: "0 0",
                                                zIndex: zFor(p),
                                                visibility: ready ? "visible" : "hidden",
                                            }}
                                        >
                                            <div className="exp-clip">
                                                <div
                                                    className="bg"
                                                    style={{
                                                        backgroundImage: `url(${it.img})`,
                                                        backgroundPosition: isActive ? "right center" : "center",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: isActive
                                                            ? "linear-gradient(90deg,rgba(14,10,6,.92) 0%,rgba(14,10,6,.62) 33%,rgba(14,10,6,.08) 62%,transparent 100%),linear-gradient(0deg,rgba(14,10,6,.6),transparent 45%)"
                                                            : "linear-gradient(180deg,rgba(14,10,6,.85) 0%,rgba(14,10,6,.08) 42%,rgba(14,10,6,.7) 100%)",
                                                        transition: "background .5s",
                                                    }}
                                                />
                                                <div style={{ position: "absolute", inset: 0, background: "#0b0805", opacity: "var(--dim)" }} />

                                                {/* seam shadow: the card in front visibly overlaps this one */}
                                                {!isActive && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            inset: 0,
                                                            pointerEvents: "none",
                                                            background: "linear-gradient(90deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.2) 18%,transparent 40%)",
                                                        }}
                                                    />
                                                )}

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: "radial-gradient(110% 70% at 100% 0%,rgba(255,130,20,.42),transparent 60%)",
                                                        mixBlendMode: "screen",
                                                    }}
                                                />

                                                {/* glowing bottom edge: same strip on every card so the bottoms read as one connected line */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        height: isActive ? 80 : 44,
                                                        background: isActive
                                                            ? "linear-gradient(0deg,rgba(255,125,20,.8) 0%,rgba(255,120,20,.3) 45%,transparent 100%)"
                                                            : "linear-gradient(0deg,rgba(255,125,20,.45) 0%,rgba(255,120,20,.12) 50%,transparent 100%)",
                                                        boxShadow: isActive
                                                            ? "inset 0 -10px 22px -6px rgba(255,140,40,.65)"
                                                            : "inset 0 -6px 14px -6px rgba(255,140,40,.4)",
                                                        borderRadius: "inherit",
                                                        pointerEvents: "none",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        pointerEvents: "none",
                                                        clipPath: "var(--rim)",
                                                        background: isActive ? "rgba(255,178,90,1)" : "rgba(255,170,80,.7)",
                                                    }}
                                                />
                                                {/* glowing right rim: the lit edge between this card and the one behind it */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        width: 26,
                                                        pointerEvents: "none",
                                                        background: "linear-gradient(270deg,rgba(255,150,50,.75) 0%,rgba(255,120,20,.25) 40%,transparent 100%)",
                                                        borderRight: "3px solid rgba(255,185,100,1)",
                                                        borderRadius: "inherit",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: "calc(var(--pad) * 1px)",
                                                        top: "calc(var(--it) * 1px)",
                                                        right: 8,
                                                        color: "#fff",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 8,
                                                            height: 18,
                                                            fontSize: "calc(var(--ifs) * 1px)",
                                                            fontWeight: 600,
                                                            letterSpacing: "0.04em",
                                                            color: "rgba(255,255,255,.9)",
                                                        }}
                                                    >
                                                        {it.index}
                                                        <span style={{ width: 15, height: 2, background: ORANGE, borderRadius: 1, display: "inline-block" }} />
                                                    </div>
                                                    <h3
                                                        style={{
                                                            margin: 0,
                                                            marginTop: "calc(var(--tmt) * 1px)",
                                                            fontWeight: 800,
                                                            letterSpacing: "-0.03em",
                                                            fontSize: "calc(var(--tfs) * 1px)",
                                                            lineHeight: "calc(var(--tlh) * 1px)",
                                                            textShadow: "0 2px 8px rgba(0,0,0,.5)",
                                                        }}
                                                    >
                                                        {first}
                                                        <br />
                                                        {rest.join(" ")}
                                                    </h3>
                                                    <p
                                                        style={{
                                                            margin: "10px 0 0",
                                                            maxWidth: 240,
                                                            fontSize: 18,
                                                            lineHeight: "25px",
                                                            fontWeight: 450,
                                                            color: "rgba(255,255,255,.9)",
                                                            textShadow: "0 1px 4px rgba(0,0,0,.5)",
                                                            ...reveal(0.3),
                                                        }}
                                                    >
                                                        {it.sub}
                                                    </p>

                                                    <div
                                                        style={{
                                                            marginTop: 18,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            pointerEvents: isActive ? "auto" : "none",
                                                            ...reveal(0.35),
                                                        }}
                                                    >
                                                        <button className="exp-btn">
                                                            {it.cta}
                                                            <i>
                                                                <Arrow size={16} />
                                                            </i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}