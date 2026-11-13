"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Category, Subcategory } from "@/app/lib/types";

interface CatProps {
    category: Category;
    subcategories: Subcategory[];
    otherCategories: Category[];
}

export default function Cat({
    category,
    subcategories,
    otherCategories,
}: CatProps) {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [saved, setSaved] = useState<string[]>([]);
    const isList = view === "list";

    // ── Framer Motion Animation Variants ──
    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    // Helper for bento-like grid spans matching the product card design style
    const getCardLayout = (index: number) => {
        // 0 -> large left card (col-span-5, row-span-2)
        // 1 -> right top card (col-span-7)
        // 2 -> right bottom card (col-span-7)
        // remainder -> 6 cols each
        if (index === 0) {
            return {
                wrap: "md:col-span-5 md:row-span-2",
                big: true,
                bg: "from-[#1f1e21] via-[#161517] to-[#0d0c0e]",
            };
        }
        if (index === 1) {
            return {
                wrap: "md:col-span-7",
                big: false,
                bg: "from-[#38373a] via-[#525052] to-[#737073]",
            };
        }
        if (index === 2) {
            return {
                wrap: "md:col-span-7",
                big: false,
                bg: "from-[#4a494d] via-[#6f6d70] to-[#918e91]",
            };
        }
        const colorVariants = [
            "from-[#2d2c30] via-[#434145] to-[#5e5c60]",
            "from-[#3d3c40] via-[#565458] to-[#78757a]",
            "from-[#222124] via-[#353438] to-[#4d4b50]",
        ];
        return {
            wrap: "md:col-span-6",
            big: false,
            bg: colorVariants[(index - 3) % colorVariants.length],
        };
    };

    return (
        <main className="bg-white font-sans text-neutral-900 antialiased selection:bg-orange-500 pt-28 pb-20 selection:text-white">
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                    <Link href="/" className="hover:text-black transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/collection" className="hover:text-black transition-colors">
                        Collection
                    </Link>
                    <span>/</span>
                    <span className="text-neutral-950 font-bold">{category.name}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ───────── HERO SECTION ───────── */}
                <header className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] overflow-hidden rounded-[32px] bg-neutral-950 text-white p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl mb-10">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
                    {category.image && (
                        <img
                            src={category.image}
                            alt={category.name}
                            className="pointer-events-none absolute -right-4 bottom-0 h-full w-[45%] select-none object-contain object-right opacity-30 sm:opacity-60"
                        />
                    )}

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideInLeft}
                        className="relative z-10 max-w-[560px]"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="h-[2px] w-8 rounded-full bg-orange-500" />
                            <span className="text-[12px] sm:text-[13px] font-mono font-bold tracking-[0.25em] text-orange-500 uppercase">
                                CATEGORY EXPLORER
                            </span>
                        </div>

                        <h1 className="mt-4 sm:mt-5 text-[42px] sm:text-[56px] lg:text-[68px] font-black italic leading-[0.94] tracking-tight text-white">
                            {category.name}
                        </h1>

                        <p className="mt-4 sm:mt-5 max-w-[460px] text-[15px] sm:text-[16px] font-normal leading-relaxed text-neutral-300">
                            {category.sub}
                        </p>
                    </motion.div>
                </header>

                {/* ───────── TOOLBAR ───────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={slideInRight}
                    className="flex items-center justify-between py-4 border-b border-neutral-200/80 mb-8"
                >
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950">
                            Select Subcategory
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                            Explore specialized product categories under {category.name}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-neutral-500 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full">
                            {subcategories.length} Subcategories
                        </span>

                        <span className="h-4 w-px bg-neutral-200" />

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                aria-label="Grid view"
                                aria-pressed={!isList}
                                onClick={() => setView("grid")}
                                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${!isList
                                    ? "border-orange-300 bg-orange-50 text-orange-500 shadow-xs"
                                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                                    }`}
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                aria-label="List view"
                                aria-pressed={isList}
                                onClick={() => setView("list")}
                                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${isList
                                    ? "border-orange-300 bg-orange-50 text-orange-500 shadow-xs"
                                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                                    }`}
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                >
                                    <path d="M8 6h13M8 12h13M8 18h13" />
                                    <circle cx="3.5" cy="6" r="1" fill="currentColor" />
                                    <circle cx="3.5" cy="12" r="1" fill="currentColor" />
                                    <circle cx="3.5" cy="18" r="1" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* ───────── SUBCATEGORY CARDS (Styled like Products) ───────── */}
                {subcategories.length > 0 ? (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className={`grid gap-4 ${isList
                            ? "grid-cols-1 auto-rows-auto"
                            : "grid-cols-1 md:grid-cols-12 md:auto-rows-[270px]"
                            }`}
                    >
                        {subcategories.map((sub, index) => {
                            const layout = getCardLayout(index);
                            const tall = layout.big && !isList;
                            const cardVariant = index % 2 === 0 ? slideInLeft : slideInRight;
                            const isSaved = saved.includes(sub.id);

                            return (
                                <motion.article
                                    key={sub.id}
                                    variants={cardVariant}
                                    className={`group relative overflow-hidden rounded-[26px] bg-gradient-to-br ${layout.bg} shadow-sm transition duration-300 hover:shadow-xl ${isList
                                        ? "flex h-[180px] w-full items-center justify-between"
                                        : layout.wrap
                                        } ${tall ? "min-h-[560px]" : "min-h-[270px]"}`}
                                >
                                    {/* Background / Product Image from design */}
                                    <div
                                        className={`absolute inset-0 flex items-center justify-center p-6 ${isList ? "w-1/2 left-auto right-12" : ""
                                            }`}
                                    >
                                        <img
                                            src={sub.image}
                                            alt={sub.name}
                                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Dynamic contrast gradient overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-70 transition-opacity group-hover:opacity-85" />

                                    {/* Rendered Details Overlay */}
                                    <div
                                        className={`absolute left-0 z-10 p-6 sm:p-7 text-white max-w-[70%] ${tall
                                            ? "bottom-0"
                                            : "bottom-0 top-0 flex flex-col justify-end"
                                            }`}
                                    >
                                        <p className="text-[11px] sm:text-[12px] font-mono font-bold tracking-wider uppercase text-orange-400">
                                            {sub.productCount ? `${sub.productCount}+ Products` : category.name}
                                        </p>
                                        <h3 className="mt-1 text-[22px] sm:text-[26px] font-black leading-tight tracking-tight text-white drop-shadow-sm group-hover:text-orange-400 transition-colors">
                                            {sub.name}
                                        </h3>
                                        {sub.description && (
                                            <p className="mt-1.5 text-[12px] sm:text-[13px] font-normal text-neutral-300 line-clamp-2 leading-relaxed">
                                                {sub.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Bookmark Button */}
                                    <button
                                        type="button"
                                        aria-label={isSaved ? `Remove bookmark for ${sub.name}` : `Bookmark ${sub.name}`}
                                        aria-pressed={isSaved}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSaved((s) =>
                                                s.includes(sub.id) ? s.filter((x) => x !== sub.id) : [...s, sub.id]
                                            );
                                        }}
                                        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-black/30 text-white backdrop-blur-md transition hover:bg-black/60"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill={isSaved ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
                                        </svg>
                                    </button>

                                    {/* Arrow Link on Bottom-Right */}
                                    <Link
                                        href={`/collection/${category.id}/${sub.id}`}
                                        aria-label={`View ${sub.name}`}
                                        className="absolute bottom-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white active:scale-95"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </motion.section>
                ) : (
                    <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
                        <p className="text-neutral-500 text-sm">No subcategories found for this category.</p>
                    </div>
                )}

                {/* ───────── Other Categories Switcher ───────── */}
                <div className="mt-20 pt-10 border-t border-neutral-200">
                    <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase mb-4">
                        Other Categories
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {otherCategories.map((c) => (
                            <Link
                                key={c.id}
                                href={`/collection/${c.id}`}
                                className="px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs font-bold text-neutral-700 hover:text-black hover:border-black transition-all"
                            >
                                {c.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
