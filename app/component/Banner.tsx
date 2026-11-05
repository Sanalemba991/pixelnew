"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BannerSlide {
    tag: string;
    line1: string;
    line2Prefix: string;
    line2Highlight: string;
    description: string;
    shopHref: string;
    exploreHref: string;
    imageSrc: string;
    imageAlt: string;
}

const bannerSlides: BannerSlide[] = [
    {
        tag: "THE CREATOR'S STORE",
        line1: "Cameras & iPhones",
        line2Prefix: "Built for ",
        line2Highlight: "Creators",
        description:
            "Premium gear for photography, videography and everyday content creation.",
        shopHref: "/shop",
        exploreHref: "/collections",
        imageSrc: "/hero.png",
        imageAlt: "Cameras & iPhones Built for Creators",
    },
    {
        tag: "PRO PERFORMANCE",
        line1: "Cinematic Precision",
        line2Prefix: "Made for ",
        line2Highlight: "Visionaries",
        description:
            "Full-frame high sensitivity, ultra-fast autofocus, and 4K 120fps recording capabilities.",
        shopHref: "/cameras",
        exploreHref: "/cameras/sony",
        imageSrc:
            "/hero pixel.png",
        imageAlt: "Cinema DSLR camera equipment",
    },
    {
        tag: "THE STUDIO IN YOUR HAND",
        line1: "Titanium Power",
        line2Prefix: "Engineered for ",
        line2Highlight: "Storytellers",
        description:
            "Unrivaled 48MP computational photography, ProRes Log video, and USB-C workflow.",
        shopHref: "/iphone",
        exploreHref: "/accessories",
        imageSrc:
            "/hero pixel (1).png",
        imageAlt: "Titanium iPhone Pro Studio setup",
    },
];

const categoryPills = [
    {
        title: "Photography",
        subtitle: "Cameras • Lenses • More",
        href: "/cameras",
        icon: (
            <svg className="w-4 h-4 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
        ),
    },
    {
        title: "Videography",
        subtitle: "Gimbals • Audio • Lighting",
        href: "/videography",
        icon: (
            <svg className="w-4 h-4 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
        ),
    },
    {
        title: "Mobility",
        subtitle: "iPhones • Cases • More",
        href: "/iphone",
        icon: (
            <svg className="w-4 h-4 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        ),
    },
    {
        title: "Accessories",
        subtitle: "Bags • Tripods • Power",
        href: "/accessories",
        icon: (
            <svg className="w-4 h-4 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
            </svg>
        ),
    },
];

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const activeSlide = bannerSlides[currentSlide];

    return (
        <section className="relative w-full h-screen min-h-[640px] max-h-[920px] bg-[#fbf9f5] border-b border-neutral-100 overflow-hidden select-none flex flex-col justify-between">
            {/* Full-bleed Hero Image spanning 100% of the screen seamlessly from very top */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSlide.imageSrc}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={activeSlide.imageSrc}
                            alt={activeSlide.imageAlt}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Banner Content (Headline, Subtitle, Buttons) with top padding for navbar */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 flex-1 flex flex-col justify-center">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-md sm:max-w-lg lg:max-w-xl pb-6 sm:pb-8"
                >

                    <div className="flex items-center gap-3 mb-3 sm:mb-3.5">
                        <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.25em] text-[#111111] uppercase font-mono">
                            {activeSlide.tag}
                        </span>
                        <span className="w-12 sm:w-14 h-[2px] bg-[#f97316] rounded-full inline-block" />
                    </div>


                    <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-neutral-950 tracking-[-0.035em] leading-[1.06] mb-4 sm:mb-5">
                        <span className="block not-italic text-neutral-950">
                            {activeSlide.line1}
                        </span>
                        <span className="block mt-1 italic font-black">
                            <span className="inline-block text-neutral-950 mr-2.5">
                                Bu<span className="inline-block pr-1 bg-gradient-to-b from-[#111111] from-15% via-[#8a7566] via-45% to-[#ddcfc3] to-90% bg-clip-text text-transparent">il</span>t for
                            </span>
                            <span className="relative inline-block text-[#f97316]">
                                {activeSlide.line2Highlight}

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
                        {activeSlide.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Shop Now Pill Button */}
                        <Link
                            href={activeSlide.shopHref}
                            className="inline-flex items-center gap-1.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#18181b] hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-neutral-900/10 active:scale-95"
                        >
                            <span>Shop Now</span>
                            <span className="text-sm leading-none">→</span>
                        </Link>

                        {/* Explore Collection Pill Button with Play/Video icon */}
                        <Link
                            href={activeSlide.exploreHref}
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
                            <span>Explore Collection</span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Floating 4-Column Feature/Category Bar & Pagination Dots */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.07)] px-4 sm:px-6 py-3 sm:py-3.5">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                        {categoryPills.map((cat, idx) => (
                            <Link
                                key={cat.title}
                                href={cat.href}
                                className={`flex items-center gap-3 group py-1.5 sm:py-1 px-2 sm:px-4 transition-transform hover:-translate-y-0.5 ${idx % 2 !== 0 && idx < 2 ? "pl-3" : ""
                                    }`}
                            >
                                <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-amber-50 group-hover:text-amber-600 flex items-center justify-center shrink-0 transition-colors">
                                    {cat.icon}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900 group-hover:text-[#f97316] transition-colors truncate">
                                        {cat.title}
                                    </h4>
                                    <p className="text-[10px] sm:text-[11px] text-neutral-400 font-normal truncate">
                                        {cat.subtitle}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Carousel Pagination Dots */}
                <div className="flex items-center justify-center gap-1.5 pt-5 pb-2">
                    {bannerSlides.map((_, idx) => {
                        const isActive = idx === currentSlide;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentSlide(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${isActive
                                    ? "w-6 bg-[#f97316]"
                                    : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                                    }`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
