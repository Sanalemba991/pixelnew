"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TrustAndCreatorSection() {
  return (
    <section className="w-full bg-white py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Exact "Why Shop at Pixel Store?" Flush Transparent Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full py-2 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none"
        >
          {/* Title on the Left */}
          <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-neutral-950 whitespace-nowrap flex-shrink-0">
            Why Shop at Pixel Store?
          </h3>

          {/* 5 Features with Exact Icons & Hairline Vertical Dividers */}
          <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 flex-1 justify-around min-w-[720px] lg:min-w-0">
            {/* 1. Free Delivery */}
            <div className="flex items-center gap-2.5">
              <span className="text-[#a4682c] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </span>
              <div className="leading-tight">
                <h4 className="text-xs font-bold text-neutral-900 whitespace-nowrap">
                  Free Delivery
                </h4>
                <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                  Across India
                </p>
              </div>
            </div>

            <span className="h-6 w-[1px] bg-neutral-200" />

            {/* 2. Genuine Products */}
            <div className="flex items-center gap-2.5">
              <span className="text-[#a4682c] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div className="leading-tight">
                <h4 className="text-xs font-bold text-neutral-900 whitespace-nowrap">
                  Genuine Products
                </h4>
                <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                  100% Original &amp; Sealed
                </p>
              </div>
            </div>

            <span className="h-6 w-[1px] bg-neutral-200" />

            {/* 3. Official Warranty */}
            <div className="flex items-center gap-2.5">
              <span className="text-[#a4682c] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div className="leading-tight">
                <h4 className="text-xs font-bold text-neutral-900 whitespace-nowrap">
                  Official Warranty
                </h4>
                <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                  Brand-backed Support
                </p>
              </div>
            </div>

            <span className="h-6 w-[1px] bg-neutral-200" />

            {/* 4. Easy Returns */}
            <div className="flex items-center gap-2.5">
              <span className="text-[#a4682c] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
              </span>
              <div className="leading-tight">
                <h4 className="text-xs font-bold text-neutral-900 whitespace-nowrap">
                  Easy Returns
                </h4>
                <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                  Hassle-free &amp; Simple
                </p>
              </div>
            </div>

            <span className="h-6 w-[1px] bg-neutral-200" />

            {/* 5. Expert Support */}
            <div className="flex items-center gap-2.5">
              <span className="text-[#a4682c] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </span>
              <div className="leading-tight">
                <h4 className="text-xs font-bold text-neutral-900 whitespace-nowrap">
                  Expert Support
                </h4>
                <p className="text-[10px] text-neutral-500 whitespace-nowrap mt-0.5">
                  Pre &amp; Post Purchase
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exact "Gear for Creators" Banner Card with Warm Desk Scene & Table Studio Setup */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl sm:rounded-3xl border border-neutral-200/80 overflow-hidden shadow-xs min-h-[220px] sm:min-h-[240px] flex items-center bg-[#fdfbf7]"
        >
          {/* Full-width Photography Background Scene */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/saaa.jpeg"
              alt="Gear for Creators Desk Setup"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>

          {/* Foreground Interactive Content overlaid on top */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-[55%] sm:max-w-[45%] space-y-2.5 sm:space-y-3">
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-neutral-950 tracking-tight leading-tight">
              Gear for <span className="text-[#a4682c]">Creators</span>
            </h3>

            <p className="text-neutral-700 text-xs sm:text-[13px] leading-relaxed max-w-sm">
              Everything you need to shoot, create and share.
              <br />
              — cameras, lenses, lighting and more.
            </p>

            <div className="pt-1">
              <Link
                href="/creators"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#a4682c] hover:bg-[#8b5521] text-white font-semibold text-xs transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span>Explore Creator Gear</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
