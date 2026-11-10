"use client";
// Save as: app/about/page.jsx   (Next.js App Router + Tailwind CSS)
// Install: npm i framer-motion

import { motion, MotionConfig, type Variants } from "framer-motion";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], style: ["normal", "italic"] });

export default function About() {
    // ---------- icons ----------
    const icon: Record<string, React.ReactNode> = {
        cam: <><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>,
        shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
        bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
        users: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20c0-4 3-6 6-6s6 2 6 6M15 14c3 0 6 1.5 6 5" /></>,
        box: <><path d="M12 3l8 4v10l-8 4-8-4V7z" /><path d="M4 7l8 4 8-4M12 11v10" /></>,
        star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
        pin: <><path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
        gem: <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M10 3l2 6 2-6M7 9l5 12 5-12" /></>,
        team: <><circle cx="9" cy="8" r="3" /><circle cx="15" cy="8" r="3" /><path d="M4 19c0-3 2.5-5 5-5h6c2.5 0 5 2 5 5" /><circle cx="12" cy="7" r="3" /></>,
        trust: <><path d="M19 14l-4 4-3-3" /><path d="M18 10l-1.5-1.5a2.12 2.12 0 0 0-3 0L12 10l-1.5-1.5a2.12 2.12 0 0 0-3 0L6 10l3 3 3-3 3 3 4-4z" /><path d="M7 11L4 8l3-3 3 3" /><path d="M17 13l3-3-3-3-3 3" /></>,
        growth: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" /><path d="M15 9v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" /></>,
        flag: <path d="M6 21V4M6 5h12l-3 4 3 4H6" />,
        target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
        phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
        check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
    };
    const ic = (n: string, c = "") => (
        <svg viewBox="0 0 24 24" className={`fill-none stroke-[#f97316] stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] ${c}`}>
            {icon[n]}
        </svg>
    );

    // ---------- shared classes ----------
    const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
    const eyebrow = "inline-flex items-center gap-3 text-[11px] sm:text-[12px] font-extrabold tracking-[0.25em] text-[#111111] uppercase font-mono before:h-[2px] before:w-12 before:sm:w-14 before:bg-[#f97316] before:rounded-full before:content-['']";
    const h2 = "font-black tracking-[-0.03em] leading-[1.08]";
    const body = "text-sm sm:text-base leading-relaxed text-neutral-600";

    // ---------- data ----------
    const values = [
        ["gem", "Authenticity", "Only genuine & brand-authorized products."],
        ["team", "Creator First", "Curated for photographers, filmmakers and tech creators."],
        ["trust", "Trust", "Transparent pricing, reliable service and support."],
        ["growth", "Growth", "Empowering India’s creator community."],
    ];
    const steps = [
        ["flag", "2024", "The Beginning", "Pixel Store was founded with a creator-first vision.", "lg:left-[96px] lg:top-[90px] lg:w-[156px]"],
        ["box", "2025", "Growing Stronger", "Expanded our product range and brand partnerships.", "lg:left-[276px] lg:top-[38px] lg:w-[156px]"],
        ["users", "2026", "A Trusted Choice", "10,000+ happy customers across India.", "lg:left-[480px] lg:top-[66px] lg:w-[156px]"],
        ["target", "Next", "Bigger Goals", "Expand our reach, bring more global brands and build for creators at scale.", "lg:left-[686px] lg:top-[6px] lg:w-[146px]"],
    ];

    // ---------- motion presets ----------
    const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
    const up: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
    const left: Variants = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } };
    const right: Variants = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } };
    const stagger = (s = 0.12): Variants => ({ hidden: {}, show: { transition: { staggerChildren: s } } });
    const pop: Variants = { hidden: { opacity: 0, scale: 0.85, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 16 } } };
    const view = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.3 } };
    const fan = (r0: number, r1: number): Variants => ({ hidden: { opacity: 0, rotate: r0, y: 30 }, show: { opacity: 1, rotate: r1, y: 0, transition: { duration: 0.8, ease } } });

    return (
        <MotionConfig reducedMotion="user">
            <main className={`${inter.className} overflow-x-hidden bg-[#fbf9f5] leading-relaxed text-[#111]`}>
                {/* ================= FULL-BLEED HERO BANNER ================= */}
                <section className="relative w-full h-screen min-h-[640px] max-h-[920px] bg-[#fbf9f5] border-b border-neutral-100 overflow-hidden select-none flex flex-col justify-between">
                    {/* Full-bleed Hero Background Image spanning 100% of the screen seamlessly */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/Sony Camera and iPhone Product Display.png"
                            alt="About Pixel Store - Built for Creators"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Banner Content (Headline, Subtitle, Buttons, Badges) with top padding for navbar */}
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 flex-1 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease }}
                            className="max-w-md sm:max-w-lg lg:max-w-xl pb-6 sm:pb-8"
                        >
                            <div className="flex items-center gap-3 mb-3 sm:mb-3.5">
                                <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.25em] text-[#111111] uppercase font-mono">
                                    ABOUT PIXEL STORE
                                </span>
                                <span className="w-12 sm:w-14 h-[2px] bg-[#f97316] rounded-full inline-block" />
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-neutral-950 tracking-[-0.035em] leading-[1.06] mb-4 sm:mb-5">
                                <span className="block not-italic text-neutral-950">
                                    More Than a Store,
                                </span>
                                <span className="block mt-1 italic font-black">
                                    <span className="inline-block text-neutral-950 mr-2.5">
                                        A Home for
                                    </span>
                                    <span className="relative inline-block text-[#f97316]">
                                        Creators
                                        <svg
                                            className="absolute -bottom-2 left-0 w-[105%] h-3 text-[#f97316]"
                                            viewBox="0 0 180 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M2 9C50 2 125 1.5 178 8.5"
                                                stroke="currentColor"
                                                strokeWidth="4.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </span>
                                </span>
                            </h1>

                            <p className="text-neutral-500 text-sm sm:text-base max-w-sm sm:max-w-md leading-snug font-normal mb-6 sm:mb-7">
                                Pixel Store is a specialized e-commerce destination for cameras, iPhones and professional creator gear, built to empower photographers, videographers and tech enthusiasts across India.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {/* Shop Now Pill Button */}
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-1.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#18181b] hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-neutral-900/10 active:scale-95"
                                >
                                    <span>Explore Gear</span>
                                    <span className="text-sm leading-none">→</span>
                                </Link>

                                {/* Explore Collection Pill Button with Play icon */}
                                <Link
                                    href="/collections"
                                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-95"
                                >
                                    <svg
                                        className="w-3.5 h-3.5 text-neutral-900"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                                    </svg>
                                    <span>Our Story</span>
                                </Link>
                            </div>

                            {/* Trust badges */}

                        </motion.div>
                    </div>
                </section>

                {/* ================= STORY ================= */}
                <section className="py-14 sm:py-20">
                    <div className={`${wrap} grid items-center gap-10 md:gap-16 md:grid-cols-2`}>
                        <motion.div className="relative h-[320px] sm:h-[360px]" variants={stagger(0.15)} {...view} aria-hidden="true">
                            {/* Card 1 (Top Left) */}
                            <motion.div
                                variants={fan(-12, -4)}
                                whileHover={{ rotate: -1, scale: 1.03 }}
                                className="absolute left-0 top-0 h-[64%] w-[68%] overflow-hidden rounded-[24px] border-4 border-white shadow-xl bg-neutral-900"
                            >
                                <Image
                                    src="/prod-camera.jpg"
                                    alt="Professional Camera Gear"
                                    fill
                                    sizes="(max-width: 768px) 68vw, 34vw"
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Card 2 (Bottom Left) */}
                            <motion.div
                                variants={fan(-8, -2)}
                                whileHover={{ scale: 1.05 }}
                                className="absolute bottom-0 left-[2%] h-[42%] w-[48%] overflow-hidden rounded-[24px] border-4 border-white shadow-xl bg-neutral-900 z-10"
                            >
                                <Image
                                    src="/prod-lens.jpg"
                                    alt="Creator Cinema Lens"
                                    fill
                                    sizes="(max-width: 768px) 48vw, 24vw"
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Card 3 (Bottom Right Foreground) */}
                            <motion.div
                                variants={fan(10, 3)}
                                whileHover={{ rotate: 0, scale: 1.03 }}
                                className="absolute bottom-[6%] right-0 h-[58%] w-[62%] overflow-hidden rounded-[24px] border-4 border-white shadow-2xl bg-neutral-900 z-20"
                            >
                                <Image
                                    src="/prod-iphone.jpg"
                                    alt="iPhone Studio Setup"
                                    fill
                                    sizes="(max-width: 768px) 62vw, 31vw"
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                        </motion.div>
                        <motion.div variants={stagger(0.12)} {...view}>
                            <motion.span variants={up} className={eyebrow}>Our Story</motion.span>
                            <motion.h2 variants={up} className={`${h2} mb-5 mt-4 text-2xl sm:text-4xl lg:text-[42px] text-neutral-950`}>
                                Built by Creators, <span className="italic text-[#f97316]">for Creators.</span>
                            </motion.h2>
                            <motion.p variants={up} className={`${body} text-base sm:text-lg leading-relaxed`}>
                                Pixel Store was founded with a simple idea — to make professional and genuine creator gear easily accessible at the best value. Backed by Lovosis Technology LLC, we bring global brands, reliable service and a creator-first shopping experience to India.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* ================= VALUES ================= */}
                <section className="py-12 sm:py-16">
                    <div className={wrap}>
                        {/* Section Header */}
                        <motion.div variants={stagger(0.1)} {...view} className="mb-8">
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <span className="w-7 h-[2.5px] bg-[#f97316] rounded-full inline-block" />
                                <span className="text-[11px] font-bold tracking-[0.18em] text-[#111111] uppercase font-sans">
                                    OUR VALUES
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black italic tracking-[-0.025em] leading-[1.08] text-neutral-950">
                                What <span className="text-[#f97316]">Drives Us</span>
                            </h2>
                        </motion.div>

                        {/* 4 Light Cream Rounded Cards */}
                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4" variants={stagger(0.12)} {...view}>
                            {values.map(([n, t, d]) => (
                                <motion.div
                                    key={t}
                                    variants={pop}
                                    whileHover={{ transition: { duration: 0.2 } }}
                                    className="rounded-[18px] bg-[#fffaf5] p-4 sm:p-5 shadow-[0_3px_14px_rgba(0,0,0,0.02)] flex flex-col justify-start"
                                >
                                    {/* Icon */}
                                    <div className="mb-2.5">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-none stroke-[#f97316] stroke-[1.9] [stroke-linecap:round] [stroke-linejoin:round]">
                                            {icon[n]}
                                        </svg>
                                    </div>
                                    {/* Title */}
                                    <h3 className="mb-1 text-base sm:text-[16.5px] font-extrabold text-neutral-950 tracking-tight">
                                        {t}
                                    </h3>
                                    {/* Description */}
                                    <p className="text-xs sm:text-[12.5px] leading-relaxed text-neutral-500 font-normal">
                                        {d}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ================= JOURNEY ================= */}
                <section className="py-14 sm:py-20">
                    <div className="mx-auto grid max-w-7xl items-center px-4 sm:px-6 lg:px-8 lg:grid-cols-[280px_1fr]">
                        <motion.div variants={left} {...view}>
                            <span className={eyebrow}>Our Journey</span>
                            <h2 className={`${h2} mb-4 mt-3 text-2xl sm:text-4xl lg:text-[42px] text-neutral-950`}>
                                Our Journey<br /><span className="italic text-[#f97316]">So Far</span>
                            </h2>
                            <p className="max-w-[260px] text-sm sm:text-base leading-relaxed text-neutral-600">
                                From a simple idea to a trusted destination for creators, here’s how Pixel Store has grown.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={stagger(0.22)} {...view}
                            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:relative lg:mt-0 lg:block lg:h-[260px] lg:w-[880px] lg:justify-self-end"
                        >
                            {/* curved line (desktop) */}
                            <svg viewBox="0 0 880 260" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
                                <motion.path
                                    d="M57 215 C75 180 88 160 112 154 L240 140 C262 138 268 118 285 112 L420 138 C445 160 465 170 490 164 L625 128 C655 120 668 92 690 84 L825 66 L868 50"
                                    className="fill-none stroke-[#f97316] stroke-[3] [stroke-linecap:round] [stroke-linejoin:round] [vector-effect:non-scaling-stroke]"
                                    variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.8, ease: "easeInOut" } } }}
                                />
                                <motion.circle cx="57" cy="215" r="5" className="fill-[#f97316] stroke-none" variants={{ hidden: { scale: 0 }, show: { scale: 1 } }} />
                                <motion.polygon points="878,44 865,60 859,45" className="fill-[#f97316] stroke-none" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.6 } } }} />
                            </svg>

                            {steps.map(([n, yr, t, d, pos], i) => (
                                <motion.div
                                    key={yr} variants={pop}
                                    className={`rounded-2xl bg-white border border-neutral-200/70 px-4 pb-5 pt-4 lg:absolute ${pos} ${i === 3 ? "shadow-[0_12px_34px_rgba(249,115,22,.22)] border-[#f97316]/30" : "shadow-[0_10px_28px_rgba(0,0,0,.06)]"
                                        }`}
                                >
                                    {i === 3 ? (
                                        <motion.span
                                            className="mb-2.5 grid h-11 w-11 place-items-center rounded-full bg-[#fff7f4] shadow-[0_0_0_2px_rgba(249,115,22,.35),0_0_18px_rgba(249,115,22,.35)]"
                                            animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            {ic(n, "h-7 w-7")}
                                        </motion.span>
                                    ) : (
                                        ic(n, "mb-2 h-7 w-7")
                                    )}
                                    <span className="block text-lg font-black leading-tight text-[#f97316]">{yr}</span>
                                    <b className="mb-1 block text-[15px] font-bold leading-tight text-neutral-900">{t}</b>
                                    <p className="text-xs leading-snug text-neutral-500">{d}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ================= WHY PIXEL STORE (NEW) ================= */}
                <section className="py-12 sm:py-16">
                    <div className={wrap}>
                        <motion.div variants={stagger(0.1)} {...view} className="mb-8 max-w-2xl sm:mb-10">
                            <motion.span variants={up} className={eyebrow}>Why Pixel Store</motion.span>
                            <motion.h2 variants={up} className={`${h2} mb-4 mt-4 text-2xl sm:text-4xl lg:text-[42px] text-neutral-950`}>
                                Gear You Can Trust, <span className="italic text-[#f97316]">Service You Can Count On.</span>
                            </motion.h2>
                            <motion.p variants={up} className={body}>
                                Buying creator gear is a big decision. Here is what we promise every time you shop with us.
                            </motion.p>
                        </motion.div>

                        <motion.div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4" variants={stagger(0.1)} {...view}>
                            {/* Big tile: Genuine */}
                            <motion.div
                                variants={pop}
                                className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[26px] border border-neutral-200/70 bg-white p-7 shadow-[0_14px_36px_rgba(0,0,0,.06)] sm:col-span-2 sm:p-9 lg:row-span-2"
                            >
                                <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border-[34px] border-[#f97316]/10" />
                                <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full border-[18px] border-[#f97316]/15" />
                                <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-[#fff7f4] shadow-[0_0_0_2px_rgba(249,115,22,.25)]">
                                    {ic("shield", "h-8 w-8")}
                                </span>
                                <div className="relative mt-10">
                                    <h3 className="mb-3 max-w-sm text-3xl font-black leading-[1.08] tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                                        100% genuine, <span className="italic text-[#f97316]">always.</span>
                                    </h3>
                                    <p className="max-w-sm text-sm leading-relaxed text-neutral-600 sm:text-base">
                                        Every camera, lens and iPhone is original and sourced through brand-authorized channels. No grey-market stock, no surprises.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Stat tile */}
                            <motion.div
                                variants={pop}
                                className="flex flex-col justify-between rounded-[26px] bg-[#fff1e6] p-6 sm:p-7"
                            >
                                {ic("users", "h-7 w-7")}
                                <div className="mt-8">
                                    <span className="block text-4xl font-black leading-none tracking-[-0.04em] text-[#f97316] sm:text-5xl">10,000+</span>
                                    <p className="mt-2 text-sm font-semibold leading-snug text-neutral-800">Happy customers across India</p>
                                </div>
                            </motion.div>

                            {/* Curated tile */}
                            <motion.div
                                variants={pop}
                                className="flex flex-col justify-between rounded-[26px] border border-neutral-200/70 bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,.05)] sm:p-7"
                            >
                                {ic("star", "h-7 w-7")}
                                <div className="mt-8">
                                    <h3 className="mb-1.5 text-lg font-extrabold tracking-tight text-neutral-950">Curated for creators</h3>
                                    <p className="text-sm leading-relaxed text-neutral-500">A focused range for photographers, filmmakers and tech creators.</p>
                                </div>
                            </motion.div>

                            {/* Service tile (wide) */}
                            <motion.div
                                variants={pop}
                                className="flex items-center gap-5 rounded-[26px] border border-neutral-200/70 bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,.05)] sm:col-span-2 sm:p-7"
                            >
                                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#fff7f4]">
                                    {ic("bolt", "h-7 w-7")}
                                </span>
                                <div>
                                    <h3 className="mb-1 text-lg font-extrabold tracking-tight text-neutral-950">Reliable service, before and after you buy</h3>
                                    <p className="text-sm leading-relaxed text-neutral-500">Transparent pricing and helpful support at every step.</p>
                                </div>
                            </motion.div>

                            {/* CTA banner */}

                        </motion.div>
                    </div>
                </section>

                {/* ================= MISSION ================= */}
                <section className="pb-16 sm:pb-24">
                    <div className={wrap}>
                        <motion.div variants={stagger(0.12)} {...view} className="relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-[28px] bg-neutral-950 px-8 sm:px-14 py-10 sm:py-12 text-white shadow-xl">
                            <motion.span variants={up} className="inline-flex items-center gap-3 text-[11px] sm:text-[12px] font-extrabold tracking-[0.25em] text-[#f97316] uppercase font-mono before:h-[2px] before:w-10 before:bg-[#f97316] before:rounded-full before:content-['']">Our Mission</motion.span>
                            <motion.h2 variants={up} className={`${h2} relative mb-3 mt-3.5 max-w-lg text-2xl sm:text-4xl lg:text-[40px] text-white`}>
                                Empower Every Creator with the <span className="italic text-[#f97316]">Right Gear.</span>
                            </motion.h2>
                            <motion.p variants={up} className="relative max-w-md text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
                                To be India’s most trusted and creator-focused destination for cameras, smartphones and professional gear.
                            </motion.p>
                            <motion.div
                                aria-hidden="true"
                                className="absolute -right-[60px] top-1/2 -mt-[210px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#000_0_14%,#27150a_15%_22%,#f97316_23%_24%,#150c06_25%_40%,#3b2210_41%_42%,#111_43%_60%,transparent_61%)] opacity-40 md:opacity-90 pointer-events-none"
                                animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </section>
            </main>
        </MotionConfig>
    );
}