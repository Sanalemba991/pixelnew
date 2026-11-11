"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category as CategoryType } from "@/app/data/catalog";

interface CategoryProps {
    categories: CategoryType[];
}

export default function Category({ categories }: CategoryProps) {
    const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

    const toggleWishlist = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlist((prev) => ({ ...prev, [slug]: !prev[slug] }));
    };

    return (
        <div className="min-h-screen bg-white text-neutral-900 pt-24 sm:pt-28 pb-24 font-sans antialiased">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Title */}
                <div className="mb-8 sm:mb-10">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 uppercase">
                        Product Categories
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-normal">
                        Explore curated creator equipment, lenses, and hardware
                    </p>
                </div>

                {/* Categories Grid — 4 Columns Clean Minimal Adidas-style display */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-8 sm:gap-y-10">
                    {categories.map((cat) => {
                        const isFav = !!wishlist[cat.slug];
                        return (
                            <div key={cat.slug} className="group flex flex-col">
                                {/* Image Stage: Aspect-square, light grey background #eceef0, with top-right heart icon */}
                                <div className="relative aspect-square w-full bg-[#eceef0] overflow-hidden block">
                                    <Link
                                        href={`/category/${cat.slug}`}
                                        className="relative w-full h-full block"
                                    >
                                        <div className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center">
                                            <Image
                                                src={cat.image}
                                                alt={cat.name}
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-out"
                                                unoptimized
                                            />
                                        </div>
                                    </Link>

                                    {/* Top-right minimalist outline Heart Wishlist Icon */}
                                    <button
                                        type="button"
                                        onClick={(e) => toggleWishlist(e, cat.slug)}
                                        aria-label="Add to wishlist"
                                        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1 text-neutral-800 hover:text-black transition-colors"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 sm:w-5 sm:h-5 transition-transform active:scale-125"
                                            fill={isFav ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeWidth={1.4}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Details underneath matching Adidas layout: Price/Count, Name, Category/Tag, New */}
                                <div className="mt-2.5 sm:mt-3 text-left">
                                    {/* Price / Item count bold line */}
                                    <div className="text-[12px] sm:text-[13px] font-bold text-neutral-900 tracking-tight">
                                        {cat.itemCount} Items
                                    </div>

                                    {/* Product/Category Name */}
                                    <Link
                                        href={`/category/${cat.slug}`}
                                        className="mt-0.5 block hover:underline"
                                    >
                                        <h3 className="text-[11px] sm:text-xs text-neutral-800 font-normal leading-snug truncate">
                                            {cat.name}
                                        </h3>
                                    </Link>

                                    {/* Subtitle / Department tag */}
                                    <div className="mt-0.5 text-[10px] sm:text-[11px] text-neutral-400 font-light truncate">
                                        {cat.tag || cat.subtitle}
                                    </div>

                                    {/* "New" label underneath */}
                                    <div className="mt-0.5 text-[10px] sm:text-[11px] text-neutral-400 font-light">
                                        New
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}