"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { whiteCategories } from "../data/storeData";

export default function CategoriesSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-10 border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and "View All Categories ->" */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950">
              Shop by Category
            </h2>
            <p className="text-neutral-500 text-xs sm:text-[13px] mt-0.5">
              Find the right gear for your photography, content creation and everyday needs.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors group"
          >
            <span>View All Categories</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {whiteCategories.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className="group relative flex flex-col justify-between h-full rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 p-3 pb-3.5 transition-all duration-300 hover:shadow-md"
                >
                  {/* Category Cutout / Isolated Product on Clean White Stage */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-white flex items-center justify-center">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {/* Bottom soft white vignette / fade to seamlessly blend image into card background */}
                    <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom Text + Right Circle Arrow Button */}
                  <div className="relative z-10 flex items-end justify-between gap-1 pt-1">
                    <div className="min-w-0 pr-1">
                      <h3 className="text-xs sm:text-[13px] font-bold text-neutral-900 tracking-tight leading-snug group-hover:text-black">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-neutral-500 mt-0.5 truncate leading-tight font-normal">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Small circular arrow button */}
                    <span className="w-5 h-5 flex-shrink-0 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 text-[10px] group-hover:border-neutral-400 group-hover:text-black transition-all">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
