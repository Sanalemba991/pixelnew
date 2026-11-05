"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutStorySection() {
  return (
    <section className="w-full bg-white py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left: Pixel Store Retail Experience Center Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm border border-neutral-200/60"
          >
            <Image
              src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1000&auto=format&fit=crop"
              alt="Pixel Store Retail and Experience Center"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            {/* Ambient inner soft highlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
              <span className="text-sm">📷</span>
              <span className="text-xs font-bold tracking-tight">Pixel Store</span>
            </div>
          </motion.div>

          {/* Right: Exact About Text, 3 Custom SVG Icons, and "Learn More ->" Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-3 sm:space-y-4"
          >
            {/* Eyebrow Tag */}
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-neutral-800 uppercase">
              ABOUT PIXEL STORE
            </p>

            {/* Headline */}
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight text-neutral-950 leading-snug">
                Your Trusted Destination for{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#a4682c]">
                  Cameras, iPhones &amp; Creator Gear.
                </span>
              </h3>
            </div>

            {/* Subtext description */}
            <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed max-w-xl">
              Pixel Store is an online store for photography, videography and Apple lovers. We bring you genuine products, trusted brands and expert support — all in one place.
            </p>

            {/* Metrics Row + "Learn More ->" Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-5 sm:gap-7">
                {/* 1. 10,000+ Happy Customers (Custom Two-User Outline Icon) */}
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full border border-neutral-200/90 bg-[#fdfbf9] flex items-center justify-center text-[#a4682c] flex-shrink-0">
                    <svg
                      className="w-4.5 h-4.5 text-[#a4682c]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                      10,000+
                    </h4>
                    <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                      Happy Customers
                    </p>
                  </div>
                </div>

                {/* 2. 500+ Products (Isometric Cardboard Box Outline Icon) */}
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full border border-neutral-200/90 bg-[#fdfbf9] flex items-center justify-center text-[#a4682c] flex-shrink-0">
                    <svg
                      className="w-4.5 h-4.5 text-[#a4682c]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                      <path d="m3.3 7 8.7 5 8.7-5" />
                      <path d="M12 12v10" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                      500+
                    </h4>
                    <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                      Products
                    </p>
                  </div>
                </div>

                {/* 3. 100% Genuine & Original (Wavy Starburst Seal with Checkmark Icon) */}
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full border border-neutral-200/90 bg-[#fdfbf9] flex items-center justify-center text-[#a4682c] flex-shrink-0">
                    <svg
                      className="w-4.5 h-4.5 text-[#a4682c]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                      100%
                    </h4>
                    <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                      Genuine &amp; Original
                    </p>
                  </div>
                </div>
              </div>

              {/* Learn More -> Pill Button */}
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#a4682c] hover:bg-[#8b5521] text-white font-semibold text-xs transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span>Learn More</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
