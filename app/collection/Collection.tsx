"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Inter } from "next/font/google";
import { categories } from "@/app/lib/categories";
import { subcategories } from "@/app/lib/subcategories";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
});

interface CategoryCard {
    id: string;
    name: string;
    sub: string;
    image: string;
    href: string;
}

interface CollectionItem {
    id: string;
    name: string;
    subtitle: string;
    category: string;
    image: string;
    href: string;
}

// Dynamically mapped from categories library
const CATEGORY_CARDS: CategoryCard[] = categories.map((c) => ({
    id: c.id,
    name: c.name,
    sub: c.sub,
    image: c.image,
    href: `/collection/${c.id}`,
}));

// Dynamically mapped collection items from subcategories and categories
const ALL_COLLECTIONS: CollectionItem[] = subcategories.map((s) => ({
    id: s.id,
    name: s.name,
    subtitle: s.productCount ? `${s.productCount}+ Products` : "Explore Collection",
    category: s.categoryId,
    image: s.image,
    href: `/collection/${s.categoryId}/${s.id}`,
}));

const FILTER_TABS = [
    { id: "all", label: "All Collection" },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
];

const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -70 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

const slideInRight: Variants = {
    hidden: { opacity: 0, x: 70 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export default function Collection() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    const filteredCollections = ALL_COLLECTIONS.filter((item) => {
        const matchesTab =
            activeTab === "all" || item.category === activeTab || item.id === activeTab;
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div
            className={`${inter.className} min-h-screen overflow-x-clip bg-[#fafafa] text-neutral-900 antialiased selection:bg-[#ff6a00]/20 selection:text-[#ff6a00]`}
        >
            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden bg-black text-white pt-16 pb-36 lg:pt-20 lg:pb-44">
                {/* Ambient Gradient Glows */}
                <div className="pointer-events-none absolute -top-40 right-1/4 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-amber-600/25 via-[#ff6a00]/15 to-transparent blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-gradient-to-t from-[#ff6a00]/10 to-transparent blur-2xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left Content — slides in from LEFT */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={slideInLeft}
                            className="lg:col-span-7 z-10"
                        >
                            <span className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-mono font-extrabold tracking-[0.25em] text-[#ff6a00] uppercase mb-4 before:h-[2px] before:w-10 before:bg-[#ff6a00] before:rounded-full before:content-['']">
                                ALL COLLECTION
                            </span>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] text-white leading-[1.08] mb-5">
                                Discover Our <br />
                                <span className="text-white">Product </span>
                                <span className="bg-gradient-to-r from-[#ff6a00] via-[#ff7d1a] to-[#ff9440] bg-clip-text text-transparent">
                                    Collection
                                </span>
                            </h1>

                            <p className="max-w-xl text-sm sm:text-base text-neutral-400 font-normal leading-relaxed mb-8">
                                A curated line-up of cameras, iPhones, lenses and pro-level gear for creators at every level.
                            </p>

                            {/* Search Bar with Keyboard Shortcut */}
                            <div className="relative max-w-md">
                                <div className="group relative flex items-center w-full rounded-full bg-white/[0.07] border border-white/15 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 focus-within:border-[#ff6a00] focus-within:bg-white/[0.1] focus-within:ring-2 focus-within:ring-[#ff6a00]/30">
                                    <svg
                                        className="w-4 h-4 text-neutral-400 mr-3 flex-shrink-0 group-focus-within:text-[#ff6a00] transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for accessories, gear..."
                                        className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none"
                                    />
                                    <div className="flex items-center gap-1 pl-2">
                                        <kbd className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono font-semibold text-neutral-400 bg-white/10 border border-white/10 rounded">
                                            ⌘K
                                        </kbd>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Camera Close-up Feature — slides in from RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, x: 80, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-5 relative flex justify-center lg:justify-end"
                        >
                            <div className="relative w-full max-w-[460px] aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                                    alt="Sony Alpha Camera Close-up"
                                    className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                                />

                                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-white text-lg font-serif">
                                        α
                                    </div>
                                    <div className="text-xs text-white/80 font-mono">
                                        <span className="text-[#ff6a00] font-bold">SONY</span> 35mm F/1.4 GM
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Seamless Smooth Bottom Fade from Dark Hero into the Light Stage */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#fafafa]/50 to-[#fafafa]" />
            </section>

            {/* 2. TOP CATEGORY CARDS CAROUSEL — stagger from LEFT */}
            <section className="relative -mt-24 sm:-mt-28 z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={staggerContainer}
                    className="relative"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {CATEGORY_CARDS.map((cat, idx) => {
                            const isSelected = activeCategoryIndex === idx;
                            return (
                                <motion.div
                                    key={cat.id}
                                    variants={slideInLeft}
                                    className={`group relative overflow-hidden rounded-[26px] bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] ${isSelected ? "ring-[2px] ring-[#ff6a00]" : "border border-neutral-200/80"
                                        }`}
                                >
                                    <Link
                                        href={cat.href}
                                        className="block cursor-pointer"
                                        onClick={() => {
                                            setActiveCategoryIndex(idx);
                                            setActiveTab(cat.id);
                                        }}
                                    >
                                        {/* Image: No border radius on left, right, up; rounded on bottom */}
                                        <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-b-[20px] bg-neutral-900">
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Card Bottom Footer */}
                                        <div className="p-4 flex items-center justify-between text-neutral-900 bg-white">
                                            <div className="min-w-0 pr-2">
                                                <h3
                                                    className={`font-extrabold text-[17px] sm:text-[18px] tracking-tight leading-tight transition-colors ${isSelected ? "text-[#ff6a00]" : "text-neutral-900 group-hover:text-[#ff6a00]"
                                                        }`}
                                                >
                                                    {cat.name}
                                                </h3>
                                                <p className="text-[12px] sm:text-[13px] text-neutral-500 font-medium tracking-normal mt-0.5 truncate">
                                                    {cat.sub}
                                                </p>
                                            </div>

                                            <div className="h-9 w-9 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-md transition-all duration-200 group-hover:bg-[#ff6a00] flex-shrink-0 ml-2">
                                                <svg className="w-4 h-4 stroke-[2.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setActiveCategoryIndex((prev) => (prev + 1) % CATEGORY_CARDS.length)}
                        aria-label="Next categories"
                        className="hidden xl:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-800 shadow-lg border border-neutral-200 hover:bg-[#ff6a00] hover:text-white transition-all duration-200 z-30"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </motion.div>
            </section>

            {/* 3. DUAL FEATURED BANNERS — LEFT banner from LEFT, RIGHT banner from RIGHT */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6"
                >
                    {/* SONY ALPHA SERIES — from LEFT */}
                    <motion.div
                        variants={slideInLeft}
                        className="lg:col-span-7 relative overflow-hidden rounded-[26px] bg-[#0c0c0d] border border-neutral-800/80 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] shadow-xl group"
                    >
                        {/* Camera Stage Cutout Background */}
                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3/5 overflow-hidden">
                            <img
                                src="/banner-sony-stage.jpg"
                                alt="Sony Alpha Series Camera"
                                className="h-full w-full object-cover object-right transform group-hover:scale-105 transition-transform duration-700 opacity-95"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0d] via-[#0c0c0d]/75 to-transparent" />
                        </div>

                        <div className="relative z-10 max-w-xs sm:max-w-sm">
                            <span className="text-[10px] font-black font-mono tracking-[0.25em] text-[#ff6a00] uppercase block mb-1.5">
                                SONY
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-1.5">
                                Alpha Series
                            </h2>
                            <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed">
                                For Creators who see the bigger picture.
                            </p>
                        </div>

                        <div className="relative z-10 pt-4">
                            <Link
                                href="/collection/cameras"
                                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 sm:px-5 py-2 text-xs font-bold tracking-tight hover:bg-[#ff6a00] hover:text-white transition-colors duration-200 shadow-sm group/btn"
                            >
                                <span>Explore Cameras</span>
                                <svg
                                    className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>

                    {/* IPHONE 16 PRO — from RIGHT */}
                    <motion.div
                        variants={slideInRight}
                        className="lg:col-span-5 relative overflow-hidden rounded-[26px] bg-[#f0f0f2] border border-neutral-200/90 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] shadow-sm group"
                    >
                        {/* iPhone Stage Cutout Background */}
                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
                            <img
                                src="/banner-iphone-stage.jpg"
                                alt="iPhone 16 Pro Desert Titanium"
                                className="h-full w-full object-cover object-right transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#f0f0f2] via-[#f0f0f2]/50 to-transparent" />
                        </div>

                        <div className="relative z-10 max-w-xs">
                            <div className="w-5 h-5 mb-2 text-neutral-800">
                                <svg viewBox="0 0 170 170" fill="currentColor" className="w-4 h-4">
                                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.43-5.74-8.87-10.15-18.91-13.23-30.12-3.08-11.21-4.63-22.14-4.63-32.8 0-14.65 3.82-26.69 11.45-36.13 7.63-9.44 17.06-14.28 28.29-14.52 4.9 0 10.18 1.25 15.84 3.75 5.66 2.5 9.4 3.79 11.23 3.88 1.52 0 5.48-1.39 11.87-4.17 6.39-2.78 12-4 16.83-3.66 12.82.98 22.84 5.86 30.06 14.65-11.43 6.94-17.03 16.48-16.8 28.61.23 9.77 4.02 18.04 11.37 24.81 7.35 6.77 16.03 10.74 26.04 11.9-2.42 7.07-5.5 14.28-9.25 21.63zM119.22 33.15c0-7.39 2.66-14.24 7.98-20.55 5.32-6.31 11.83-10.42 19.53-12.33.24 1.14.36 2.14.36 3.01 0 7.39-2.8 14.42-8.4 21.1-5.6 6.68-12.19 10.61-19.78 11.78-.23-1.02-.35-2.02-.35-3.01z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight mb-1.5">
                                iPhone 16 Pro
                            </h2>
                            <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed">
                                A powerhouse in creative power.
                            </p>
                        </div>

                        <div className="relative z-10 pt-4">
                            <Link
                                href="/collection/iphones"
                                className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 px-4 sm:px-5 py-2 text-xs font-bold tracking-tight border border-neutral-300 hover:bg-black hover:text-white hover:border-black transition-colors duration-200 shadow-sm group/btn"
                            >
                                <span>Explore iPhones</span>
                                <svg
                                    className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* 4. ALL COLLECTION SHOWCASE & CATEGORY ROW */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
                {/* Header + Filter Tabs — header from LEFT, tabs from RIGHT */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-neutral-200/80 pb-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={slideInLeft}
                    >
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.25em] text-[#ff6a00] uppercase mb-2">
                            <span className="w-6 h-[2px] bg-[#ff6a00] rounded-full inline-block" />
                            EXPLORE
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                            All Collection
                        </h2>
                    </motion.div>

                    {/* Filter Pills */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={slideInRight}
                        className="flex items-center flex-wrap gap-2"
                    >
                        {FILTER_TABS.map((tab) => {
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all duration-200 ${active
                                        ? "bg-black text-white shadow-md"
                                        : "bg-transparent text-neutral-600 hover:text-black hover:bg-neutral-100"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* 5-Column Collection Row — each card animates independently (reliable on filter) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-end">
                    {filteredCollections.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.6,
                                delay: (idx % 5) * 0.07,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <Link
                                href={item.href}
                                className="group flex flex-col items-center text-center transition-all duration-300"
                            >
                                <div className="relative w-full h-36 sm:h-40 flex items-end justify-center mb-4 px-2">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.14)] group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <h3 className="font-bold text-base text-neutral-900 group-hover:text-[#ff6a00] transition-colors leading-snug">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-neutral-500 font-medium mt-0.5 mb-2.5">
                                    {item.subtitle}
                                </p>

                                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#ff6a00] group-hover:translate-x-0.5 transition-transform">
                                    <span>Explore</span>
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty state */}
                {filteredCollections.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-12 w-12 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-3">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-neutral-800">No collections found</p>
                        <p className="text-xs text-neutral-500 mt-1">Try a different filter or search term.</p>
                    </div>
                )}
            </section>

            {/* 5. SHOP BY BRAND — heading from RIGHT, grid from LEFT */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
                <div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={slideInRight}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.25em] text-[#ff6a00] uppercase">
                            <span className="w-6 h-[2px] bg-[#ff6a00] rounded-full inline-block" />
                            SHOP BY BRAND
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className="relative flex items-center"
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 w-full">
                            {/* SONY */}
                            <motion.div
                                variants={slideInLeft}
                                className="h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center px-4 hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer"
                            >
                                <span className="font-black tracking-[0.25em] text-lg text-neutral-900 font-serif">
                                    SONY
                                </span>
                            </motion.div>

                            {/* Canon */}
                            <motion.div
                                variants={slideInLeft}
                                className="h-16 rounded-2xl bg-white  shadow-sm flex items-center justify-center px-4 hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer"
                            >
                                <span className="font-black text-xl text-[#cc0000] tracking-tight font-serif italic">
                                    Canon
                                </span>
                            </motion.div>

                            {/* Apple */}
                            <motion.div
                                variants={slideInLeft}
                                className="h-16 rounded-2xl bg-white  shadow-sm flex items-center justify-center px-4 hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer"
                            >
                                <svg viewBox="0 0 170 170" fill="currentColor" className="w-6 h-6 text-neutral-900">
                                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.43-5.74-8.87-10.15-18.91-13.23-30.12-3.08-11.21-4.63-22.14-4.63-32.8 0-14.65 3.82-26.69 11.45-36.13 7.63-9.44 17.06-14.28 28.29-14.52 4.9 0 10.18 1.25 15.84 3.75 5.66 2.5 9.4 3.79 11.23 3.88 1.52 0 5.48-1.39 11.87-4.17 6.39-2.78 12-4 16.83-3.66 12.82.98 22.84 5.86 30.06 14.65-11.43 6.94-17.03 16.48-16.8 28.61.23 9.77 4.02 18.04 11.37 24.81 7.35 6.77 16.03 10.74 26.04 11.9-2.42 7.07-5.5 14.28-9.25 21.63zM119.22 33.15c0-7.39 2.66-14.24 7.98-20.55 5.32-6.31 11.83-10.42 19.53-12.33.24 1.14.36 2.14.36 3.01 0 7.39-2.8 14.42-8.4 21.1-5.6 6.68-12.19 10.61-19.78 11.78-.23-1.02-.35-2.02-.35-3.01z" />
                                </svg>
                            </motion.div>

                            {/* Nikon */}
                            <motion.div
                                variants={slideInLeft}
                                className="h-16 rounded-2xl bg-[#ffd700] shadow-sm flex items-center justify-center px-4 hover:shadow-md transition-all cursor-pointer"
                            >
                                <span className="font-black italic text-lg tracking-wider text-black font-sans">
                                    Nikon
                                </span>
                            </motion.div>

                            {/* FUJIFILM */}
                            <motion.div
                                variants={slideInLeft}
                                className="h-16 rounded-2xl bg-white  shadow-sm flex items-center justify-center px-4 hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer"
                            >
                                <span className="font-black tracking-widest text-sm text-neutral-900 font-sans">
                                    FUJIFILM
                                </span>
                            </motion.div>

                            {/* SIGMA */}
                            <motion.div
                                variants={slideInLeft}
                                className="h-16 rounded-2xl bg-white  shadow-sm flex items-center justify-center px-4 hover:border-neutral-400 hover:shadow-md transition-all cursor-pointer"
                            >
                                <span className="font-extrabold tracking-widest text-sm text-neutral-900 font-sans">
                                    SIGMA
                                </span>
                            </motion.div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* 6. BOTTOM CREATOR BANNER — from RIGHT */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={slideInRight}
                    className="relative overflow-hidden rounded-3xl bg-neutral-950 text-white min-h-[200px] sm:min-h-[240px] flex items-center shadow-2xl border border-white/10"
                >
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
                            alt="Gear for Every Creative Journey"
                            className="h-full w-full object-cover object-center opacity-65"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
                    </div>

                    <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.25em] text-[#ff6a00] uppercase mb-2">
                            <span className="w-5 h-[2px] bg-[#ff6a00] rounded-full inline-block" />
                            OUR COMMITMENT
                        </div>

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight mb-2">
                            Gear for Every <br />
                            <span className="bg-gradient-to-r from-[#ff6a00] via-[#ff7d1a] to-[#ff9440] bg-clip-text text-transparent italic font-serif">
                                Creative Journey.
                            </span>
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mb-5">
                            Exclusive cameras, real creator authentic gear, and all brand warranty — all in one place.
                        </p>

                        <Link
                            href="/collection"
                            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold tracking-tight hover:bg-[#ff6a00] hover:text-white transition-all duration-200 shadow-lg group/btn"
                        >
                            <span>Explore Collection</span>
                            <svg
                                className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}