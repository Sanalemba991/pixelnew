"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category, Product } from "@/app/data/catalog";

interface CategoryProProps {
  category: Category;
  products: Product[];
  categories: Category[];
}

export default function CategoryPro({ category, products, categories }: CategoryProProps) {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-24 sm:pt-28 pb-24 font-sans antialiased">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Department Switcher Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/70 pb-4 mb-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
            <Link
              href="/category"
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-950 transition-colors shrink-0"
            >
              ALL
            </Link>
            {categories.map((cat) => {
              const isCurrent = cat.slug === category.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-colors shrink-0 ${
                    isCurrent
                      ? "text-neutral-950 border-b-2 border-neutral-950 pb-1 -mb-1"
                      : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          <div className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-neutral-400 self-start sm:self-auto">
            {products.length} {products.length === 1 ? "Product" : "Products"}
          </div>
        </div>

        {/* Category Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 uppercase">
            {category.name}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-normal">
            {category.subtitle}
          </p>
        </div>

        {/* Products Grid — 4 Columns Clean Adidas-style minimal display */}
        {products.length === 0 ? (
          <div className="py-20 text-center border-t border-neutral-100">
            <p className="text-neutral-400 text-sm tracking-wider uppercase">
              No products available in this department.
            </p>
            <Link
              href="/category"
              className="mt-6 inline-block text-xs font-bold tracking-widest uppercase text-neutral-900 underline underline-offset-4"
            >
              Return to All Departments
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-8 sm:gap-y-10">
            {products.map((product: Product) => {
              const isFav = !!wishlist[product.id];
              return (
                <div key={product.id} className="group flex flex-col">
                  {/* Square Stage with light grey #eceef0 background & top-right heart icon */}
                  <div className="relative aspect-square w-full bg-[#eceef0] overflow-hidden block">
                    <Link
                      href={`/category/${category.slug}/${product.slug}`}
                      className="relative w-full h-full block"
                    >
                      <div className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-out"
                          unoptimized
                        />
                      </div>
                    </Link>

                    {/* Top-right minimalist outline Heart Wishlist Icon */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(e, product.id)}
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

                  {/* Details underneath matching Adidas layout: Price, Name, Category/Sub, New */}
                  <div className="mt-2.5 sm:mt-3 text-left">
                    {/* Price: Bold at top */}
                    <div className="flex items-baseline gap-2 text-[12px] sm:text-[13px] font-bold text-neutral-900 tracking-tight">
                      <span>${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      {product.originalPrice && (
                        <span className="text-[11px] font-normal text-neutral-400 line-through">
                          ${product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <Link
                      href={`/category/${category.slug}/${product.slug}`}
                      className="mt-0.5 block hover:underline"
                    >
                      <h3 className="text-[11px] sm:text-xs text-neutral-800 font-normal leading-snug truncate">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Category / Collection */}
                    <div className="mt-0.5 text-[10px] sm:text-[11px] text-neutral-400 font-light truncate">
                      {product.categoryName}
                    </div>

                    {/* "New" or tag badge */}
                    <div className="mt-0.5 text-[10px] sm:text-[11px] text-neutral-400 font-light">
                      {product.badge || "New"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
