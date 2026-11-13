"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { products as allProducts } from "@/app/lib/products";
import type { Product } from "@/app/lib/types";

const ITEMS_PER_PAGE = 7;

export default function Products() {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [sort, setSort] = useState("Newest");
    const [saved, setSaved] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const isList = view === "list";

    // ── Sorting Logic ──
    const sortedProducts = useMemo(() => {
        const list = [...allProducts];
        if (sort === "Name") {
            return list.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sort === "Brand") {
            return list.sort((a, b) => a.brand.localeCompare(b.brand));
        }
        if (sort === "Rating") {
            return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        }
        // "Newest" or default order
        return list;
    }, [sort]);

    // ── Pagination Calculation ──
    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
    const safeCurrentPage = Math.min(currentPage, totalPages);

    const currentProducts = useMemo(() => {
        const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
        return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [sortedProducts, safeCurrentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Smoothly scroll to the toolbar/product section
            if (typeof window !== "undefined") {
                const element = document.getElementById("products-content");
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        }
    };

    // ── Bento Grid Layout Rules (matching design) ──
    const getCardLayout = (index: number) => {
        if (index === 0) {
            return {
                wrap: "md:col-span-5 md:row-span-2",
                big: true,
                bg: "from-[#222124] via-[#1a191c] to-[#121113]",
            };
        }
        if (index === 1) {
            return {
                wrap: "md:col-span-7",
                big: false,
                bg: "from-[#4d4c4f] via-[#757375] to-[#a3a1a3]",
            };
        }
        if (index === 2) {
            return {
                wrap: "md:col-span-7",
                big: false,
                bg: "from-[#626164] via-[#949294] to-[#c2bfc2]",
            };
        }
        const colorPalette = [
            "from-[#7d7c80] via-[#a8a6a8] to-[#ceccce]",
            "from-[#6a696c] via-[#8c898c] to-[#b3b0b3]",
            "from-[#525154] via-[#727073] to-[#999799]",
            "from-[#3f3e42] via-[#5b595e] to-[#7d7b80]",
        ];
        return {
            wrap: "md:col-span-6",
            big: false,
            bg: colorPalette[(index - 3) % colorPalette.length],
        };
    };

    // Helper to extract product subcategory / type label
    const getProductType = (p: Product) => {
        const cameraTypeSpec = p.specs?.find((s) => s.label === "Camera Type" || s.label === "Lens Type" || s.label === "Mount Type");
        if (cameraTypeSpec) return cameraTypeSpec.value;
        if (p.categoryId === "cameras") return "Mirrorless Camera";
        if (p.categoryId === "iphones") return "Smartphone";
        if (p.categoryId === "lenses") return "Camera Lens";
        if (p.categoryId === "accessories") return "Pro Accessory";
        return p.subcategoryId?.replace(/-/g, " ") || "Gear";
    };

    // Helper to get the canonical URL to the product slug page
    const getProductHref = (p: Product) => {
        const cat = p.categoryId || "cameras";
        const sub = p.subcategoryId || "mirrorless-cameras";
        return `/collection/${cat}/${sub}/${p.slug}`;
    };

    // ── Framer Motion Animation Variants ──
    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        },
    };

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        },
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
            },
        },
    };

    return (
        <main className="bg-white font-sans text-neutral-900 antialiased selection:bg-orange-500 mt-12 selection:text-white">
            {/* ───────── HERO FULL-BLEED BANNER HEADER (Whole header is background image with original height) ───────── */}
            <header className="relative w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] overflow-hidden flex items-center border-b border-neutral-100">
                {/* Background image covering entire header */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/cat/products.png"
                        alt="Products Banner Background"
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideInLeft}
                        className="max-w-[560px]"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="h-[2px] w-8 rounded-full bg-orange-500" />
                            <span className="text-[13px] sm:text-[14px] font-semibold text-neutral-900 tracking-[0.2em] uppercase">
                                Products
                            </span>
                        </div>

                        <h1 className="mt-4 sm:mt-5 text-[52px] sm:text-[64px] lg:text-[76px] font-black italic leading-[0.94] tracking-tight text-neutral-950">
                            Our Product
                            <span className="block font-black text-orange-500">Lineup</span>
                        </h1>

                        <p className="mt-5 sm:mt-6 max-w-[420px] text-[15px] sm:text-[16px] font-normal leading-relaxed text-neutral-600">
                            A curated range of cameras, iPhones, lenses and professional gear
                            for creators.
                        </p>
                    </motion.div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-3">
                <div id="products-content" className="pt-2" />

                {/* ───────── TOOLBAR (Animates from Right) ───────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={slideInRight}
                    className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-5 border-b border-neutral-100"
                >
                    <div className="flex items-center gap-3">
                        <h2 className="text-[17px] font-bold tracking-tight text-neutral-950">
                            {sortedProducts.length} Products
                        </h2>
                        <span className="text-xs font-medium text-neutral-400">
                            Page {safeCurrentPage} of {totalPages}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block h-4 w-px bg-neutral-200" />
                        <label htmlFor="sort" className="text-[13px] text-neutral-500 font-medium">
                            Sort by:
                        </label>

                        <div className="relative">
                            <select
                                id="sort"
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="h-9 cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white pl-3.5 pr-8 text-[13px] font-semibold text-neutral-800 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400"
                            >
                                <option>Newest</option>
                                <option>Name</option>
                                <option>Brand</option>
                                <option>Rating</option>
                            </select>
                            <svg
                                className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-1.5 ml-1">
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

                {/* ───────── PRODUCT GRID / LIST (Animated Cards) ───────── */}
                <AnimatePresence mode="wait">
                    <motion.section
                        key={`page-${safeCurrentPage}-${sort}-${isList}`}
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className={`mt-6 grid gap-4 ${isList
                            ? "grid-cols-1 auto-rows-auto"
                            : "grid-cols-1 md:grid-cols-12 md:auto-rows-[260px]"
                            }`}
                    >
                        {currentProducts.map((p, index) => {
                            const isSaved = saved.includes(p.id);
                            const layout = getCardLayout(index);
                            const tall = layout.big && !isList;
                            const cardVariant = index % 2 === 0 ? slideInLeft : slideInRight;
                            const productType = getProductType(p);
                            const productHref = getProductHref(p);
                            const displayImage = p.productImage || p.image;

                            return (
                                <motion.article
                                    key={p.id}
                                    variants={cardVariant}
                                    className={`group relative overflow-hidden rounded-[26px] bg-gradient-to-br ${layout.bg} shadow-sm transition duration-300 hover:shadow-xl ${isList
                                        ? "flex h-[180px] w-full items-center justify-between"
                                        : layout.wrap
                                        } ${tall ? "min-h-[520px]" : "min-h-[260px]"}`}
                                >
                                    {/* Clickable Card Overlay */}
                                    <Link
                                        href={productHref}
                                        className="absolute inset-0 z-0"
                                        aria-label={`View ${p.name}`}
                                    />

                                    {/* Product Visual - Full bleed backdrop cover */}
                                    <div
                                        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 ${isList ? "w-1/2 left-auto right-0" : ""
                                            }`}
                                    >
                                        <img
                                            src={displayImage}
                                            alt={p.name}
                                            className="h-full w-full object-cover object-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Contrast gradient */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 opacity-60 transition-opacity group-hover:opacity-80" />

                                    {/* Product Info */}
                                    <div
                                        className={`pointer-events-none absolute left-0 z-10 p-5 sm:p-6 text-white max-w-[75%] ${tall
                                            ? "bottom-0"
                                            : "bottom-0 top-0 flex flex-col justify-end"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[12px] font-semibold tracking-wide uppercase text-orange-400">
                                                {p.brand}
                                            </span>
                                            {p.tag && (
                                                <span className="text-[10px] font-semibold bg-white/15 text-white/90 px-2 py-0.5 rounded-full backdrop-blur-xs">
                                                    {p.tag}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-[20px] sm:text-[23px] font-bold leading-tight tracking-tight text-white drop-shadow-sm group-hover:text-orange-300 transition-colors">
                                            {p.name}
                                        </h3>

                                        <p className="mt-1 text-[13px] font-medium text-neutral-300">
                                            {productType}
                                        </p>
                                    </div>

                                    {/* Interactive Bookmark Button on Top-Right */}
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
                                        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-black/30 text-white backdrop-blur-md transition hover:bg-black/60 cursor-pointer"
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

                                    {/* Interactive Arrow Link on Bottom-Right */}
                                    <Link
                                        href={productHref}
                                        aria-label={`View ${p.brand} ${p.name}`}
                                        className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white active:scale-95"
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
                </AnimatePresence>

                {/* ───────── PAGINATION (Clean Modern Next/Prev & Numbers) ───────── */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between border-t border-neutral-100 pt-8"
                    >
                        <p className="text-xs font-semibold text-neutral-500">
                            Showing{" "}
                            <span className="text-neutral-950 font-bold">
                                {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}
                            </span>{" "}
                            to{" "}
                            <span className="text-neutral-950 font-bold">
                                {Math.min(safeCurrentPage * ITEMS_PER_PAGE, sortedProducts.length)}
                            </span>{" "}
                            of{" "}
                            <span className="text-neutral-950 font-bold">
                                {sortedProducts.length}
                            </span>{" "}
                            products
                        </p>

                        <div className="flex items-center gap-2">
                            {/* Previous Button */}
                            <button
                                type="button"
                                onClick={() => handlePageChange(safeCurrentPage - 1)}
                                disabled={safeCurrentPage === 1}
                                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-bold text-neutral-800 shadow-xs transition hover:bg-neutral-50 hover:text-orange-500 disabled:pointer-events-none disabled:opacity-40"
                            >
                                <svg
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Previous
                            </button>

                            {/* Page Number Buttons */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                                    const isActive = pageNum === safeCurrentPage;
                                    return (
                                        <button
                                            key={pageNum}
                                            type="button"
                                            onClick={() => handlePageChange(pageNum)}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold transition ${isActive
                                                ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                                                : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-orange-500"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Next Button */}
                            <button
                                type="button"
                                onClick={() => handlePageChange(safeCurrentPage + 1)}
                                disabled={safeCurrentPage === totalPages}
                                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-bold text-neutral-800 shadow-xs transition hover:bg-neutral-50 hover:text-orange-500 disabled:pointer-events-none disabled:opacity-40"
                            >
                                Next
                                <svg
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
