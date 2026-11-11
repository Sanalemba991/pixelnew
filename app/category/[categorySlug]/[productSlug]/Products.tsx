"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/app/data/catalog";

interface ProductsProps {
    product: Product;
    category?: Category;
    relatedProducts: Product[];
}

export default function Products({ product, category, relatedProducts }: ProductsProps) {
    const [selectedImage, setSelectedImage] = useState<string>(product.image);

    return (
        <div className="min-h-screen bg-white text-neutral-800 pt-24 sm:pt-28 pb-20 font-sans antialiased">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Right "< Back" navigation matching reference */}
                <div className="flex justify-end mb-6">
                    <Link
                        href={`/category/${product.categorySlug}`}
                        className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                        ← Back
                    </Link>
                </div>

                {/* Main Product Layout: Balanced Medium 2 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Stage + Thumbnails (Medium 6.5 / 12 width) */}
                    <div className="md:col-span-7 flex flex-col gap-3.5">

                        {/* Main Stage — Clean square medium studio backdrop */}
                        <div className="relative aspect-square w-full bg-[#f4f5f7] overflow-hidden flex items-center justify-center rounded-sm">
                            <Image
                                src={selectedImage}
                                alt={product.name}
                                fill
                                priority
                                className="object-contain p-8 sm:p-12 transition-all duration-300"
                                unoptimized
                            />
                        </div>

                        {/* Thumbnails Row: Small compact thumbnails underneath */}
                        {product.gallery && product.gallery.length > 0 && (
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                {product.gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f4f5f7] overflow-hidden rounded-sm transition-all shrink-0 ${selectedImage === img
                                            ? "opacity-100 ring-1 ring-neutral-400"
                                            : "opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} angle ${idx + 1}`}
                                            fill
                                            className="object-contain p-1.5"
                                            unoptimized
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Title, Price, Description, Specs & Clean Minimalist Add to Cart */}
                    <div className="md:col-span-5 flex flex-col justify-between pt-2">
                        <div>
                            {/* Product Title */}
                            <h1 className="text-base sm:text-lg lg:text-xl font-normal tracking-wide text-neutral-900 leading-snug">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="mt-2 text-sm sm:text-base text-neutral-600 font-normal">
                                ${product.price.toFixed(2)}
                            </div>

                            {/* Description & Technical paragraphs */}
                            <div className="mt-6 space-y-3.5 text-xs sm:text-[13px] leading-relaxed text-neutral-500 font-light max-w-lg">
                                <p>{product.description}</p>
                                {product.tagline && (
                                    <p className="text-neutral-400">{product.tagline}</p>
                                )}
                            </div>

                            {/* Minimal Meta / Attributes (Brand, Specs) */}
                            <div className="mt-6 space-y-1.5 text-xs sm:text-[13px] text-neutral-600 font-light">
                                <div className="flex gap-2">
                                    <span className="text-neutral-900 font-medium">Brand:</span>
                                    <span className="text-neutral-500">{product.categoryName}</span>
                                </div>
                                {product.specs?.slice(0, 3).map((spec, i) => (
                                    <div key={i} className="flex gap-2">
                                        <span className="text-neutral-900 font-medium">{spec.label}:</span>
                                        <span className="text-neutral-500">{spec.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Add to Cart Minimal Outlined Box Button */}
                            <div className="mt-7">
                                <a
                                    href={`https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20purchasing%20the%20${encodeURIComponent(
                                        product.name
                                    )}%20(${encodeURIComponent(product.slug)})`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-7 py-2.5 border border-neutral-900 text-xs sm:text-[13px] tracking-wide text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-200"
                                >
                                    Enquiry Us
                                </a>
                            </div>
                        </div>

                        {/* Bottom-right Previous / Next Minimal Navigation */}
                        <div className="mt-12 pt-6 flex items-center justify-end gap-2.5 text-xs text-neutral-400">
                            <span className="cursor-pointer hover:text-neutral-800 transition-colors">Previous</span>
                            <span>/</span>
                            <span className="cursor-pointer hover:text-neutral-800 transition-colors">Next</span>
                        </div>
                    </div>
                </div>
                <div className="mt-16 sm:mt-20 pt-8 border-t border-neutral-100">

                    {/* "You might like these..." headline */}
                    <div className="mb-6">
                        <h3 className="text-xs sm:text-sm font-light text-neutral-600 tracking-wide">
                            You might like these...
                        </h3>
                    </div>

                    {/* Related 4-Column Minimal Grid */}
                    {relatedProducts && relatedProducts.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
                            {relatedProducts.map((rel) => (
                                <div key={rel.id} className="group flex flex-col">
                                    {/* Square Stage with light grey background */}
                                    <Link
                                        href={`/category/${rel.categorySlug}/${rel.slug}`}
                                        className="relative aspect-square w-full bg-[#f4f5f7] overflow-hidden block transition-opacity group-hover:opacity-90 rounded-sm"
                                    >
                                        <Image
                                            src={rel.image}
                                            alt={rel.name}
                                            fill
                                            className="object-contain p-5 group-hover:scale-105 transition-transform duration-500 ease-out"
                                            unoptimized
                                        />
                                    </Link>

                                    {/* Title and Price under image */}
                                    <div className="mt-3 text-left">
                                        <Link
                                            href={`/category/${rel.categorySlug}/${rel.slug}`}
                                            className="block group-hover:text-neutral-600 transition-colors"
                                        >
                                            <h4 className="text-xs font-normal text-neutral-800 leading-snug truncate">
                                                {rel.name}
                                            </h4>
                                        </Link>
                                        <div className="mt-1 text-xs text-neutral-400 font-light">
                                            ${rel.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

