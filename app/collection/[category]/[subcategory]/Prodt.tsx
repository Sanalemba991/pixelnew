"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Category, Subcategory, Product } from "@/app/lib/types";

interface ProdtProps {
    category: Category;
    currentSub: Subcategory;
    subcategories: Subcategory[];
    products: Product[];
}

export default function Prodt({
    category,
    currentSub,
    subcategories,
    products = [],
}: ProdtProps) {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [sort, setSort] = useState<string>("Featured");
    const [selectedBrand, setSelectedBrand] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [saved, setSaved] = useState<string[]>([]);
    const isList = view === "list";

    // ── Framer Motion Animation Variants ──
    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.05,
            },
        },
    };

    // Extract unique brands for filtering safely
    const brands = useMemo(() => {
        const unique = new Set<string>();
        (products || []).forEach((p) => {
            if (p?.brand) unique.add(p.brand.trim());
        });
        return ["All", ...Array.from(unique)];
    }, [products]);

    // Filter & Sort safely
    const processedProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        const filtered = (products || []).filter((product) => {
            if (!product) return false;

            const matchesBrand =
                selectedBrand === "All" ||
                (product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase());

            const nameMatch = product.name ? product.name.toLowerCase().includes(query) : false;
            const descMatch = product.description
                ? product.description.toLowerCase().includes(query)
                : false;
            const brandMatch = product.brand ? product.brand.toLowerCase().includes(query) : false;

            const matchesQuery = !query || nameMatch || descMatch || brandMatch;

            return matchesBrand && matchesQuery;
        });

        if (sort === "Name") {
            return [...filtered].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        }

        return filtered;
    }, [products, selectedBrand, searchQuery, sort]);

    // Bento card layout styling
    const getCardLayout = (index: number) => {
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
                <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500 flex-wrap">
                    <Link href="/" className="hover:text-black transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/collection" className="hover:text-black transition-colors">
                        Collection
                    </Link>
                    <span>/</span>
                    <Link href={`/collection/${category.id}`} className="hover:text-black transition-colors">
                        {category.name}
                    </Link>
                    <span>/</span>
                    <span className="text-neutral-950 font-bold">{currentSub.name}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ───────── HERO SECTION ───────── */}
                <header className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] overflow-hidden rounded-[32px] bg-neutral-950 text-white p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl mb-10">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
                    {currentSub.image && (
                        <img
                            src={currentSub.image}
                            alt={currentSub.name}
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
                                {category.name} / SUBCATEGORY
                            </span>
                        </div>

                        <h1 className="mt-4 sm:mt-5 text-[42px] sm:text-[56px] lg:text-[68px] font-black italic leading-[0.94] tracking-tight text-white">
                            {currentSub.name}
                        </h1>

                        {currentSub.description && (
                            <p className="mt-4 sm:mt-5 max-w-[460px] text-[15px] sm:text-[16px] font-normal leading-relaxed text-neutral-300">
                                {currentSub.description}
                            </p>
                        )}
                    </motion.div>
                </header>

                {/* ───────── SIBLING SUBCATEGORIES PILLS ───────── */}
                {subcategories.length > 1 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {subcategories.map((sub) => {
                                const active = sub.id === currentSub.id;
                                return (
                                    <Link
                                        key={sub.id}
                                        href={`/collection/${category.id}/${sub.id}`}
                                        className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight whitespace-nowrap transition-all ${
                                            active
                                                ? "bg-neutral-950 text-white shadow-sm"
                                                : "bg-white text-neutral-700 border border-neutral-200 hover:border-black hover:text-black"
                                        }`}
                                    >
                                        {sub.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ───────── TOOLBAR & CONTROLS ───────── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-neutral-200/80 mb-8">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950">
                            Available Products
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                            Explore specialized models and gear in {currentSub.name}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Brand Filter Buttons */}
                        {brands.length > 2 && (
                            <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs sm:max-w-md pb-1 scrollbar-none">
                                {brands.map((b) => (
                                    <button
                                        key={b}
                                        type="button"
                                        onClick={() => setSelectedBrand(b)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                                            selectedBrand === b
                                                ? "bg-neutral-950 text-white"
                                                : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400"
                                        }`}
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 w-36 sm:w-44 pl-8 pr-7 text-xs rounded-lg border border-neutral-200 bg-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition"
                            />
                            <svg
                                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear search"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Sort Select */}
                        <div className="relative">
                            <select
                                id="sort"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="h-9 cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white pl-3.5 pr-8 text-[13px] font-semibold text-neutral-800 shadow-sm outline-none transition focus:border-neutral-400"
                            >
                                <option>Featured</option>
                                <option>Name</option>
                            </select>
                            <svg
                                className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>

                        <span className="text-xs font-mono font-bold text-neutral-500 bg-neutral-100 border border-neutral-200 px-3 py-2 rounded-lg whitespace-nowrap">
                            {processedProducts.length} {processedProducts.length === 1 ? "Product" : "Products"}
                        </span>

                        <span className="h-4 w-px bg-neutral-200 hidden sm:inline-block" />

                        {/* View Switcher */}
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                aria-label="Grid view"
                                aria-pressed={!isList}
                                onClick={() => setView("grid")}
                                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                                    !isList
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
                                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                                    isList
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
                </div>

                {/* ───────── PRODUCT CARDS ───────── */}
                <AnimatePresence mode="wait">
                    {processedProducts.length > 0 ? (
                        <motion.section
                            key={`grid-${selectedBrand}-${sort}-${searchQuery}-${isList}`}
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className={`grid gap-4 ${
                                isList
                                    ? "grid-cols-1 auto-rows-auto"
                                    : "grid-cols-1 md:grid-cols-12 md:auto-rows-[270px]"
                            }`}
                        >
                            {processedProducts.map((p, index) => {
                                const layout = getCardLayout(index);
                                const tall = layout.big && !isList;
                                const cardVariant = index % 2 === 0 ? slideInLeft : slideInRight;
                                const isSaved = saved.includes(p.id);

                                return (
                                    <motion.article
                                        key={p.id}
                                        variants={cardVariant}
                                        className={`group relative overflow-hidden rounded-[26px] bg-gradient-to-br ${layout.bg} shadow-sm transition duration-300 hover:shadow-xl ${
                                            isList
                                                ? "flex h-[180px] w-full items-center justify-between"
                                                : layout.wrap
                                        } ${tall ? "min-h-[560px]" : "min-h-[270px]"}`}
                                    >
                                        {/* Background / Product Image */}
                                        <div
                                            className={`absolute inset-0 flex items-center justify-center p-6 ${
                                                isList ? "w-1/2 left-auto right-12" : ""
                                            }`}
                                        >
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Contrast gradient overlay */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-70 transition-opacity group-hover:opacity-85" />

                                        {/* Rendered Details Overlay */}
                                        <div
                                            className={`absolute left-0 z-10 p-6 sm:p-7 text-white max-w-[70%] ${
                                                tall
                                                    ? "bottom-0"
                                                    : "bottom-0 top-0 flex flex-col justify-end"
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-wider uppercase text-orange-400">
                                                    {p.brand}
                                                </span>
                                                {p.tag && (
                                                    <span className="text-[10px] font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full uppercase">
                                                        {p.tag}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-[20px] sm:text-[24px] font-black leading-tight tracking-tight text-white drop-shadow-sm group-hover:text-orange-400 transition-colors">
                                                {p.name}
                                            </h3>

                                            {p.description && (
                                                <p className="mt-1 text-[12px] sm:text-[13px] font-normal text-neutral-300 line-clamp-2 leading-relaxed">
                                                    {p.description}
                                                </p>
                                            )}


                                        </div>

                                        {/* Bookmark Button */}
                                        <button
                                            type="button"
                                            aria-label={isSaved ? `Remove bookmark for ${p.name}` : `Bookmark ${p.name}`}
                                            aria-pressed={isSaved}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSaved((s) =>
                                                    s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]
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
                                            href={`/collection/${category.id}/${currentSub.id}/${p.slug}`}
                                            aria-label={`View ${p.name}`}
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
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200"
                        >
                            <p className="text-neutral-700 font-bold mb-1">No products found</p>
                            <p className="text-neutral-500 text-xs mb-4">
                                No items match your current search or brand filter.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedBrand("All");
                                    setSearchQuery("");
                                }}
                                className="px-4 py-2 text-xs font-bold bg-neutral-900 text-white rounded-full hover:bg-black transition-colors"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ───────── Back to Category link ───────── */}
                <div className="mt-20 pt-10 border-t border-neutral-200 flex items-center justify-between">
                    <Link
                        href={`/collection/${category.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to {category.name}
                    </Link>
                </div>
            </div>
        </main>
    );
}
