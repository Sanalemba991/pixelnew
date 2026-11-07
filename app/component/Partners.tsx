'use client';
// components/PixelBanner.jsx  — works in Next.js App Router (and Pages Router)
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

/* ================= EDITABLE DATA ================= */
export const BANNER_DATA = {
  eyebrow: 'WHY PIXEL STORE',
  headline: ['More Than a Store,', 'A Creator’s Partner'],
  sub: 'Genuine products, expert support and a seamless shopping experience — all in one place.',
  cta: 'Shop with Confidence',

  circle: {
    cx: 1000, cy: 535, r: 380, from: 150, to: 395,
    // The main orange dots
    dots: [185, 213, 247, 293, 327, 355],
    // The "between" dots (now solid orange, placed halfway between main dots)
    midDots: [199, 230, 270, 310, 341]
  },

  cards: [
    { icon: 'shield', title: '100% Genuine Products', text: 'Original and sealed items', x: 597, y: 150, w: 225, h: 198 },
    { icon: 'badge', title: 'Official Warranty', text: 'Brand-authorized products', x: 876, y: 60, w: 248, h: 200 },
    { icon: 'truck', title: 'Fast & Secure Delivery', text: 'Safe, reliable and nationwide shipping', x: 1231, y: 150, w: 240, h: 198 },
    { icon: 'support', title: 'Expert Support', text: 'Get help from real product experts', x: 450, y: 388, w: 230, h: 195 },
    { icon: 'return', title: 'Hassle-Free Returns', text: 'Easy and transparent return process', x: 1327, y: 388, w: 240, h: 203 },
  ],

  images: {} as Record<string, { src: string; x: number; y: number; w: number; h: number }>,
};

const W = 1600, H = 790;

const ICONS: Record<string, string> = {
  shield: '<path d="M28 6l17 6v13c0 11-7 20-17 25C18 45 11 36 11 25V12z"/><path d="M20 28l6 6 11-12"/>',
  badge: '<circle cx="28" cy="22" r="14"/><path d="M28 14l2.5 5.5 6 .6-4.5 4 1.3 6-5.3-3.1-5.3 3.1 1.3-6-4.5-4 6-.6z"/><path d="M20 34l-4 16 12-6 12 6-4-16"/>',
  truck: '<path d="M8 16h26v22H8zM34 24h9l5 7v7H34z"/><circle cx="19" cy="40" r="4"/><circle cx="42" cy="40" r="4"/><path d="M2 22h8M4 28h6"/>',
  support: '<path d="M10 32V26a18 18 0 0136 0v6"/><rect x="6" y="28" width="9" height="15" rx="4"/><rect x="41" y="28" width="9" height="15" rx="4"/><path d="M45 43c0 5-6 7-14 7"/>',
  return: '<path d="M28 7l18 10v22L28 49 10 39V17z"/><path d="M10 17l18 10 18-10M28 27v22"/>',
};

const ART: Record<string, string> = {
  box: `<svg viewBox="0 0 435 345" width="100%" height="100%"><defs>
    <linearGradient id="bxF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf5"/><stop offset="1" stop-color="#efe3d8"/></linearGradient>
    <linearGradient id="bxR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9dccf"/><stop offset="1" stop-color="#d6c6b6"/></linearGradient>
    <linearGradient id="bxO" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#f26a1b"/><stop offset="1" stop-color="#ffb27a"/></linearGradient></defs>
    <polygon points="300,60 435,20 435,300 300,345" fill="url(#bxR)"/>
    <polygon points="300,60 435,20 360,0 245,0" fill="#f7efe7"/>
    <polygon points="0,60 300,60 300,345 0,345" fill="url(#bxF)"/>
    <polygon points="150,345 300,195 300,345" fill="url(#bxO)"/>
    <polygon points="136,60 186,60 186,128 161,112 136,128" fill="#f26a1b"/>
    <text x="150" y="232" text-anchor="middle" font-family="Inter,Arial" font-weight="800" font-style="italic" font-size="96" fill="#f26a1b">P</text>
    <text x="150" y="280" text-anchor="middle" font-family="Inter,Arial" font-weight="600" font-size="19" letter-spacing="4" fill="#222">PIXEL STORE</text></svg>`,
  camera: `<svg viewBox="0 0 230 165" width="100%" height="100%"><defs>
    <radialGradient id="cmL" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#3b4a63"/><stop offset=".45" stop-color="#10141c"/><stop offset="1" stop-color="#050507"/></radialGradient></defs>
    <rect x="92" y="4" width="62" height="30" rx="8" fill="#1a1a1c"/>
    <text x="123" y="24" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="11" fill="#cfcfcf">SONY</text>
    <rect x="6" y="28" width="218" height="100" rx="14" fill="#1d1d20"/>
    <rect x="172" y="34" width="50" height="88" rx="12" fill="#26262a"/>
    <text x="196" y="66" text-anchor="middle" font-family="Arial" font-size="15" fill="#ddd">α</text>
    <text x="196" y="82" text-anchor="middle" font-family="Arial" font-size="9" fill="#aaa">7N</text>
    <circle cx="92" cy="98" r="72" fill="#0c0c0e"/><circle cx="92" cy="98" r="64" fill="#2a2a2e"/>
    <circle cx="92" cy="98" r="55" fill="#09090b"/><circle cx="92" cy="98" r="46" fill="url(#cmL)"/>
    <circle cx="92" cy="98" r="26" fill="#05060a" stroke="#27324a" stroke-width="3"/>
    <ellipse cx="74" cy="80" rx="12" ry="7" fill="#fff" opacity=".22" transform="rotate(-35 74 80)"/></svg>`,
  phone: `<svg viewBox="0 0 130 235" width="100%" height="100%"><defs>
    <linearGradient id="phB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6d5c7"/><stop offset=".5" stop-color="#bfa795"/><stop offset="1" stop-color="#9d8575"/></linearGradient></defs>
    <rect x="4" y="2" width="122" height="231" rx="22" fill="url(#phB)" stroke="#8a7566" stroke-width="2"/>
    <rect x="14" y="12" width="66" height="68" rx="18" fill="#cdb8a8" stroke="#8a7566" stroke-width="1.5"/>
    <g fill="#111" stroke="#6b5a4e" stroke-width="3"><circle cx="34" cy="32" r="12"/><circle cx="60" cy="32" r="12"/><circle cx="47" cy="58" r="12"/></g>
    <g fill="#2b3550"><circle cx="34" cy="32" r="6"/><circle cx="60" cy="32" r="6"/><circle cx="47" cy="58" r="6"/></g>
    <path d="M64 135c-4-5-1-12 4-14-2 5 0 9-4 14zM62 140c5-4 12-4 16 0 3 4 2 12-3 16-3 2-6-1-9 0-3 1-6 3-9 0-4-4-4-12 5-16z" fill="#6f5d50" transform="translate(-2 6)"/></svg>`,
  lens: `<svg viewBox="0 0 118 145" width="100%" height="100%"><defs>
    <linearGradient id="lnB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b0b0c"/><stop offset=".4" stop-color="#3a3a3e"/><stop offset="1" stop-color="#0b0b0c"/></linearGradient></defs>
    <rect x="4" y="26" width="110" height="112" rx="12" fill="url(#lnB)"/>
    <rect x="4" y="58" width="110" height="5" fill="#8b1d1d"/><rect x="4" y="92" width="110" height="14" fill="#111" opacity=".6"/>
    <ellipse cx="59" cy="28" rx="55" ry="22" fill="#18181a"/><ellipse cx="59" cy="28" rx="44" ry="16" fill="#07080c"/>
    <ellipse cx="59" cy="30" rx="24" ry="8" fill="#233049"/></svg>`,
};

const cardPath = (w: number, h: number) => {
  const tabW = 86;
  const tabH = 46;
  const r = 28;
  const cx = w / 2;
  const tx1 = cx - tabW / 2;
  const tx2 = cx + tabW / 2;
  const f = 18;

  return `
    M ${r} ${tabH}
    L ${tx1 - f} ${tabH}
    C ${tx1 - f / 2} ${tabH}, ${tx1} ${tabH - f / 2}, ${tx1} ${tabH - f} 
    L ${tx1} ${r}
    A ${r} ${r} 0 0 1 ${tx1 + r} 0
    L ${tx2 - r} 0
    A ${r} ${r} 0 0 1 ${tx2} ${r}
    L ${tx2} ${tabH - f}
    C ${tx2} ${tabH - f / 2}, ${tx2 + f / 2} ${tabH}, ${tx2 + f} ${tabH}
    L ${w - r} ${tabH}
    A ${r} ${r} 0 0 1 ${w} ${tabH + r}
    L ${w} ${h - r}
    A ${r} ${r} 0 0 1 ${w - r} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${tabH + r}
    A ${r} ${r} 0 0 1 ${r} ${tabH}
    Z
  `;
};

const cardVariants: any = {
  hidden: (dir: string) => {
    if (dir === 'left') return { opacity: 0, x: -70 };
    if (dir === 'right') return { opacity: 0, x: 70 };
    return { opacity: 0, y: 40 };
  },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PixelBanner({ data = BANNER_DATA }: { data?: typeof BANNER_DATA }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(bannerRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const fit = () => {
      if (wrapRef.current) setScale(Math.min(1, wrapRef.current.clientWidth / W));
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const { circle: c } = data;
  const rad = (a: number) => (a * Math.PI) / 180;
  const pt = (a: number) => [c.cx + c.r * Math.cos(rad(a)), c.cy + c.r * Math.sin(rad(a))];
  const [x1, y1] = pt(c.from);
  const [x2, y2] = pt(c.to - 360);

  return (
    <div ref={wrapRef} className="pb-wrap" style={{ height: H * scale }}>
      <style>{CSS}</style>
      <div ref={bannerRef} className="pb-banner" style={{ transform: `scale(${scale})` }}>

        {/* Background arc and dots */}
        <svg className="pb-abs" style={{ left: 0, top: 0, zIndex: 0 }} width={W} height={H}>
          <defs>
            <linearGradient id="pbG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f6a35f" /><stop offset=".5" stopColor="#f26a1b" /><stop offset="1" stopColor="#f6a35f" />
            </linearGradient>
            <filter id="pbGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <mask id="cardMask">
            <rect width={W} height={H} fill="white" />
            {data.cards.map((k, i) => (
              <path key={i} d={cardPath(k.w, k.h)} transform={`translate(${k.x}, ${k.y})`} fill="black" />
            ))}
          </mask>

          <g mask="url(#cardMask)">
            <motion.path
              d={`M${x1},${y1} A${c.r},${c.r} 0 1 1 ${x2},${y2}`}
              fill="none"
              stroke="url(#pbG)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#pbGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
            />

            {/* Solid Orange dots */}
            {c.dots.map((a, i) => {
              const [x, y] = pt(a);
              return (
                <motion.circle
                  key={a}
                  cx={x}
                  cy={y}
                  r="7"
                  fill="#f26a1b"
                  filter="url(#pbGlow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.9 + i * 0.15, ease: 'backOut' }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
              );
            })}

            {/* Mid-Dots (Now Solid Orange) */}
            {(c.midDots || []).map((a, i) => {
              const [x, y] = pt(a);
              return (
                <motion.circle
                  key={`mid-${a}`}
                  cx={x}
                  cy={y}
                  r="7" /* Matched the radius to the main dots */
                  fill="#f26a1b" /* Changed to solid orange */
                  filter="url(#pbGlow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 + i * 0.15, ease: 'backOut' }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
              );
            })}
          </g>
        </svg>

        {/* eyebrow */}
        <motion.div
          className="pb-abs pb-eyebrow"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.i
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ transformOrigin: 'left center' }}
          />
          {data.eyebrow}
        </motion.div>

        {/* headline */}
        <motion.h1
          className="pb-abs pb-h1"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {data.headline[0]}<br /><b>{data.headline[1]}</b>
        </motion.h1>

        {/* sub */}
        <motion.div
          className="pb-abs pb-sub"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {data.sub}
        </motion.div>

        {/* cta */}
        <motion.div
          className="pb-abs pb-cta"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {data.cta}
          <span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </motion.div>

        {/* cards */}
        {data.cards.map((k, i) => {
          const dir = i % 2 === 0 ? 'left' : 'right';
          return (
            <motion.div
              key={k.title}
              className="pb-abs pb-card"
              style={{ left: k.x, top: k.y, width: k.w, height: k.h, zIndex: 10 }}
              custom={dir}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.6 + i * 0.15 }}
            >
              <svg className="pb-bg" viewBox={`0 0 ${k.w} ${k.h}`}>
                <path d={cardPath(k.w, k.h)} fill="rgba(255,255,255,.98)" stroke="rgba(255,255,255,1)" strokeWidth="1.5" />
              </svg>
              <svg className="pb-ic" viewBox="0 0 56 56" fill="none" stroke="#f26a1b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: ICONS[k.icon] }} />
              <h3>{k.title}</h3>
              <p>{k.text}</p>
            </motion.div>
          );
        })}

        {/* product images */}
        {Object.entries(data.images).map(([name, i]) => (
          <motion.div
            key={name}
            className="pb-abs"
            style={{ left: i.x, top: i.y, width: i.w, height: i.h, zIndex: name === 'box' ? 5 : 6 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            {i.src
              ? <img src={i.src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              : <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: ART[name] }} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const CSS = `
.pb-wrap{width:100%;max-width:1600px;margin:0 auto;overflow:hidden;font-family:Inter,Helvetica,Arial,sans-serif}
.pb-banner{position:relative;width:${W}px;height:${H}px;transform-origin:0 0;overflow:hidden;
  background:radial-gradient(900px 600px at 70% 55%,#fff 0%,#fdf3ea 55%,#f8e9dc 100%)}
.pb-abs{position:absolute}
.pb-eyebrow{left:72px;top:79px;display:flex;align-items:center;gap:18px;font-weight:800;font-size:15px;letter-spacing:3px;color:#141414}
.pb-eyebrow i{display:block;width:57px;height:2px;background:#f26a1b}
.pb-h1{margin:0;left:72px;top:140px;font-size:56px;line-height:62px;font-weight:800;font-style:italic;letter-spacing:-2px;color:#141414}
.pb-h1 b{color:#f26a1b}
.pb-sub{left:72px;top:285px;width:400px;font-size:21px;line-height:29px;font-weight:500;color:#7b7b7b}
.pb-cta{left:72px;top:400px;height:58px;padding:0 10px 0 29px;border-radius:30px;background:#111;color:#fff;display:flex;align-items:center;gap:22px;font-size:20px;font-weight:500}
.pb-cta span{width:46px;height:46px;border-radius:50%;background:#f26a1b;display:grid;place-items:center}
.pb-card{text-align:center;box-sizing:border-box;padding:66px 14px 0;filter:drop-shadow(0 14px 22px rgba(240,140,70,.15))}
.pb-card .pb-bg{position:absolute;left:0;top:0;width:100%;height:100%}
.pb-card .pb-ic{position:absolute;left:50%;top:12px;width:44px;height:44px;transform:translateX(-50%)}
.pb-card h3,.pb-card p{position:relative}
.pb-card h3{margin:0;font-size:22px;line-height:25px;font-weight:600;letter-spacing:-.6px;color:#141414}
.pb-card p{margin:8px 0 0;font-size:17px;line-height:22px;color:#7b7b7b}
`;