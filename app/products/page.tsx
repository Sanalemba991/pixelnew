"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, PRODUCTS, Category, Product } from "@/app/data/catalog";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.categorySlug.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#faf8f6] text-neutral-900 pt-24 sm:pt-28 pb-20">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-2">
          <Link href="/" className="hover:text-[#f97316] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f97316]">Catalog</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] uppercase text-[#f97316] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#f97316]" />
              Curated Equipment
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950">
              Browse Categories & Gear
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
              Select any category to jump into its full showcase, or filter directly below to inspect individual products.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 bg-white border border-neutral-200/90 rounded-full px-4 py-2 self-start md:self-auto shadow-sm">
            <span>Showing <strong className="text-neutral-950">{filteredProducts.length}</strong> items</span>
          </div>
        </div>
      </div>

      {/* Categories Grid (Click goes to /category/[slug]) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#f97316] rounded-full" />
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-neutral-950">
              All Categories
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-medium">Click category to view dedicated page</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((cat: Category) => {
            const isFilterActive = selectedCategory === cat.slug;
            return (
              <div
                key={cat.slug}
                className="group relative bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#f97316]/40 transition-all duration-300 flex flex-col"
              >
                {/* Image & Overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {cat.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-neutral-900 rounded-full shadow-sm">
                      {cat.tag}
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90">
                    {cat.itemCount} Products
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-neutral-950 group-hover:text-[#f97316] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Actions: View category page OR filter list */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/category/${cat.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#f97316] hover:text-[#ea580c] transition-colors"
                    >
                      <span>Explore Category</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCategory(isFilterActive ? "all" : cat.slug)
                      }
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                        isFilterActive
                          ? "bg-[#f97316] text-white border-[#f97316]"
                          : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                      }`}
                      title="Filter products below"
                    >
                      {isFilterActive ? "Active" : "Filter below"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Filter and Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-5 sm:p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "bg-neutral-100/80 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/70"
                }`}
              >
                All Gear ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.slug
                      ? "bg-[#f97316] text-white shadow-sm"
                      : "bg-neutral-100/80 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/70"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1 sm:w-64">
                <svg
                  className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth="2" />
                  <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-full pl-9 pr-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-[#f97316] focus:bg-white transition-colors"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-neutral-50 border border-neutral-200 rounded-full px-3.5 py-1.5 text-xs font-bold text-neutral-700 focus:outline-none focus:border-[#f97316]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-neutral-300 p-12 text-center">
            <p className="text-neutral-500 font-medium text-sm">
              No products found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-[#f97316] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col"
              >
                {/* Product Card Click: go directly to /category/[categorySlug]/[productSlug] */}
                <Link
                  href={`/category/${product.categorySlug}/${product.slug}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 block"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-neutral-950/85 backdrop-blur-md text-white rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-red-500/90 text-white rounded-full">
                      Backorder
                    </span>
                  )}
                </Link>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category pill link */}
                    <Link
                      href={`/category/${product.categorySlug}`}
                      className="text-[11px] font-extrabold uppercase tracking-wider text-[#f97316] hover:underline"
                    >
                      {product.categoryName}
                    </Link>

                    {/* Product Title Link */}
                    <Link href={`/category/${product.categorySlug}/${product.slug}`} className="block mt-1">
                      <h3 className="text-base font-extrabold text-neutral-950 group-hover:text-[#f97316] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>
                    </Link>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400 block font-medium">Price</span>
                      <span className="text-base font-black text-neutral-950">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      href={`/category/${product.categorySlug}/${product.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-[#f97316] text-neutral-800 hover:text-white text-xs font-bold transition-all"
                    >
                      <span>View</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

