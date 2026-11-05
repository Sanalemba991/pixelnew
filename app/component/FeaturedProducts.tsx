"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { whiteFeaturedProducts } from "../data/storeData";

const filterTabs = ["All", "Cameras", "iPhone", "Lenses", "Accessories"] as const;
type FilterTab = (typeof filterTabs)[number];

export default function FeaturedProducts() {
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>("All");
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts =
    selectedFilter === "All"
      ? whiteFeaturedProducts
      : whiteFeaturedProducts.filter((p) => p.category === selectedFilter);

  return (
    <section className="w-full bg-white py-12 lg:py-16 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Featured Products
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Handpicked bestsellers for creators, professionals and everyday users.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1.5 sm:gap-2 flex-wrap"
          >
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#b47a3e] text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => {
            const isLiked = !!likedIds[product.id];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/80 hover:border-[#b47a3e]/40 p-4 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Top Badge & Heart Wishlist */}
                <div className="flex items-center justify-between z-10">
                  {product.tag ? (
                    <span className="px-3 py-0.5 text-[11px] font-bold rounded-full bg-[#fceddd] text-[#a4682c]">
                      {product.tag}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    onClick={(e) => toggleLike(product.id, e)}
                    aria-label="Wishlist"
                    className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={isLiked ? "#dc2626" : "none"}
                      stroke={isLiked ? "#dc2626" : "currentColor"}
                      strokeWidth="1.8"
                      className="w-5 h-5 transition-transform active:scale-125"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                </div>

                {/* Product Image Stage */}
                <div className="relative w-full aspect-square my-3 rounded-xl overflow-hidden flex items-center justify-center p-3 bg-[#fdfcfb]">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Product Metadata */}
                <div className="space-y-3 pt-1">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#b47a3e] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="flex items-end justify-between pt-1">
                    <div>
                      <p className="text-lg font-extrabold text-neutral-900 tracking-tight">
                        {product.price}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-1">
                        <span className="text-amber-500 leading-none">★</span>
                        <span className="font-semibold text-neutral-900">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-neutral-400">
                          ({product.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Cart Button */}
                    <button
                      type="button"
                      aria-label="Add to cart"
                      className="p-2.5 rounded-xl bg-[#fdf7f0] border border-[#fae2c8] hover:bg-[#b47a3e] text-[#b47a3e] hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="8" cy="21" r="1" strokeWidth="2" />
                        <circle cx="19" cy="21" r="1" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
