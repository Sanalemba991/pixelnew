"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IPhoneHeroBanner() {
  return (
    <section className="w-full bg-white py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm min-h-[260px] sm:min-h-[290px] flex items-center bg-[#f7f5f2]"
        >
          {/* Full-bleed section background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1600&auto=format&fit=crop"
              alt="iPhone 18 Pro Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right sm:object-[80%_center]"
            />
            {/* Smooth gradient blend from left light background into the image so typography is 100% readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f6] via-[#fbf9f6]/95 via-45% to-transparent sm:w-[65%]" />
            <div className="absolute inset-y-0 left-0 w-24 bg-[#fbf9f6]" />
          </div>

          {/* Foreground Interactive Content aligned on the Left */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-12 max-w-[65%] sm:max-w-[55%] lg:max-w-[50%] space-y-3 sm:space-y-4">
            {/* Tag */}
            <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] text-neutral-800 uppercase">
              THE NEXT GENERATION
            </p>

            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
                iPhone 18 Pro
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm font-medium mt-0.5">
                Built for what&apos;s next.
              </p>
            </div>

            {/* 4 Feature Badges (Chip, Camera, Display, Battery) in a single row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-1">
              {/* A19 Pro Chip */}
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#a4682c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] sm:text-[11px] font-bold text-neutral-900">A19 Pro</p>
                  <p className="text-[9px] text-neutral-500">Chip</p>
                </div>
              </div>

              {/* 48MP Pro Camera */}
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#a4682c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] sm:text-[11px] font-bold text-neutral-900">48MP</p>
                  <p className="text-[9px] text-neutral-500">Pro Camera</p>
                </div>
              </div>

              {/* ProMotion Display */}
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#a4682c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] sm:text-[11px] font-bold text-neutral-900">ProMotion</p>
                  <p className="text-[9px] text-neutral-500">Display</p>
                </div>
              </div>

              {/* All-Day Battery Life */}
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#a4682c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                  <line x1="22" y1="11" x2="22" y2="13" />
                  <line x1="6" y1="11" x2="6" y2="13" />
                  <line x1="10" y1="11" x2="10" y2="13" />
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] sm:text-[11px] font-bold text-neutral-900">All-Day</p>
                  <p className="text-[9px] text-neutral-500">Battery Life</p>
                </div>
              </div>
            </div>

            {/* Pre-Order Now -> Pill Button */}
            <div className="pt-2">
              <Link
                href="/products/iphone-18-pro"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a4682c] hover:bg-[#8b5521] text-white font-semibold text-xs transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span>Pre-Order Now</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
