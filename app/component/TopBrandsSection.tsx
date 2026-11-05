"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TopBrandsSection() {
  return (
    <section className="w-full bg-white py-4 sm:py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft rounded pill banner container matching the screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full py-2.5 sm:py-3 px-5 sm:px-8 rounded-full bg-[#fbf9f6] border border-neutral-200/80 shadow-xs"
        >
          <div className="flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto scrollbar-none">
            {/* Left: Shop by Brand */}
            <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-neutral-900 whitespace-nowrap">
                Shop by Brand
              </span>
              <span className="h-4 w-[1px] bg-neutral-300" />
            </div>

            {/* Middle: Brand Logos Row with Vertical Dividers */}
            <div className="flex items-center gap-5 sm:gap-7 lg:gap-8 flex-1 justify-around min-w-[620px] lg:min-w-0">
              {/* Apple */}
              <Link
                href="/brands/apple"
                aria-label="Apple"
                className="flex items-center gap-1.5 text-neutral-900 hover:text-neutral-600 transition-colors flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 170 170"
                  fill="currentColor"
                  className="h-4 sm:h-4.5 w-auto"
                >
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.42-9.79-11.46-21.2-15.11-34.22-3.65-13.02-5.48-24.96-5.48-35.83 0-14.34 3.42-26.3 10.26-35.87 6.84-9.57 15.68-14.48 26.52-14.73 4.89 0 10.35 1.34 16.39 4.02 6.04 2.68 9.94 4.08 11.71 4.2 2.01-.25 6.09-1.68 12.24-4.29 6.15-2.61 11.46-3.83 15.93-3.66 11.85.63 21.41 4.96 28.67 13 4.12 4.57 7.28 9.77 9.49 15.59-10.42 6.27-15.57 14.88-15.45 25.82.13 8.7 3.48 16.03 10.05 21.99 6.58 5.96 14.46 9.38 23.65 10.26-2.12 6.42-4.66 12.63-7.61 18.63zM119.22 33.15c0-7.39 2.67-14.41 8.01-21.06 5.34-6.65 12.02-10.87 20.04-12.66.78 7.61-1.63 14.78-7.23 21.51-5.6 6.73-12.53 10.9-20.82 12.21z" />
                </svg>
                <span className="text-xs sm:text-sm font-bold tracking-tight">Apple</span>
              </Link>

              <span className="h-4 w-[1px] bg-neutral-300" />

              {/* SONY */}
              <Link
                href="/brands/sony"
                aria-label="Sony"
                className="text-neutral-900 hover:text-neutral-600 transition-colors flex-shrink-0"
              >
                <span className="font-serif font-black tracking-[0.2em] text-xs sm:text-sm uppercase">
                  SONY
                </span>
              </Link>

              <span className="h-4 w-[1px] bg-neutral-300" />

              {/* Canon */}
              <Link
                href="/brands/canon"
                aria-label="Canon"
                className="text-neutral-900 hover:text-neutral-600 transition-colors flex-shrink-0"
              >
                <span className="font-serif italic font-bold tracking-tight text-xs sm:text-sm">
                  Canon
                </span>
              </Link>

              <span className="h-4 w-[1px] bg-neutral-300" />

              {/* Nikon */}
              <Link
                href="/brands/nikon"
                aria-label="Nikon"
                className="text-neutral-900 hover:text-neutral-600 transition-colors flex-shrink-0"
              >
                <span className="font-sans italic font-black tracking-tight text-xs sm:text-sm">
                  Nikon
                </span>
              </Link>

              <span className="h-4 w-[1px] bg-neutral-300" />

              {/* FUJIFILM */}
              <Link
                href="/brands/fujifilm"
                aria-label="Fujifilm"
                className="text-neutral-900 hover:text-neutral-600 transition-colors flex-shrink-0"
              >
                <span className="font-sans font-black tracking-[0.06em] text-[11px] sm:text-xs uppercase">
                  FUJ<span className="text-red-600">I</span>FILM
                </span>
              </Link>

              <span className="h-4 w-[1px] bg-neutral-300" />

              {/* DJI */}
              <Link
                href="/brands/dji"
                aria-label="DJI"
                className="text-neutral-900 hover:text-neutral-600 transition-colors flex-shrink-0"
              >
                <span className="font-sans font-black text-xs sm:text-sm tracking-wider uppercase">
                  <span className="inline-block border-[1.5px] border-neutral-900 px-1 py-0.2 rounded text-[10px] font-extrabold leading-none">
                    DJI
                  </span>
                </span>
              </Link>
            </div>

            {/* Right: View All Brands -> */}
            <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
              <span className="h-4 w-[1px] bg-neutral-300" />
              <Link
                href="/brands"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:text-neutral-500 transition-colors whitespace-nowrap group"
              >
                <span>View All Brands</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
