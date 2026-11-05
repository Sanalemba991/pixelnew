"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 select-none transition-all duration-300 pointer-events-none">
      {/* Floating Pill Container Navbar */}
      <nav
        className={`max-w-7xl mx-auto rounded-full border transition-all duration-300 pointer-events-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.08)] py-2"
            : "bg-white/90 backdrop-blur-md border-neutral-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* Left: Orange Camera Icon + Pixel Store Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Orange outline camera matching screenshot */}
            <span className="text-[#f97316]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[#f97316]"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
            </span>
            <span className="text-base sm:text-lg font-black tracking-tight text-neutral-950 flex items-center gap-0.5">
              Pixel Store<span className="text-[10px] font-bold text-neutral-500 translate-y-[-4px]">®</span>
            </span>
          </Link>

          <span className="hidden md:inline-block h-4 w-[1px] bg-neutral-200 ml-1" />
        </div>

        {/* Center: Nav links with soft peach pill on active "Home" */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs sm:text-[13px] font-bold">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full bg-[#ffe4d1] text-neutral-900 font-extrabold transition-all"
          >
            Home
          </Link>
          <div className="flex items-center gap-1 text-neutral-800 hover:text-neutral-950 cursor-pointer transition-colors">
            <span>Cameras</span>
            <svg className="w-3 h-3 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-neutral-800 hover:text-neutral-950 cursor-pointer transition-colors">
            <span>iPhone</span>
            <svg className="w-3 h-3 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-neutral-800 hover:text-neutral-950 cursor-pointer transition-colors">
            <span>Accessories</span>
            <svg className="w-3 h-3 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <Link
            href="/deals"
            className="flex items-center gap-1 text-neutral-800 hover:text-neutral-950 transition-colors"
          >
            <span>Deals</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] translate-y-[-3px]" />
          </Link>
        </div>

        {/* Search Input Bar Pill */}
        <div className="hidden md:flex items-center flex-1 max-w-[280px] lg:max-w-[320px] bg-neutral-50/80 hover:bg-neutral-100/80 border border-neutral-200/70 rounded-full px-3.5 py-1.5 text-xs text-neutral-400 gap-2 transition-colors">
          <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="truncate text-neutral-400 text-[11px] sm:text-xs font-normal">
            Search for cameras, iPhones, accessories...
          </span>
        </div>

        {/* Right: Actions (Profile, Heart, Cart with Orange count badge) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <span className="hidden sm:inline-block h-4 w-[1px] bg-neutral-200" />

          {/* Profile User Icon */}
          <button
            type="button"
            aria-label="Account"
            className="p-1.5 text-neutral-800 hover:text-neutral-950 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7 0 3.75 3.75 0 0 1 7 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>

          {/* Heart / Wishlist Icon */}
          <button
            type="button"
            aria-label="Wishlist"
            className="p-1.5 text-neutral-800 hover:text-neutral-950 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>

          {/* Shopping Cart Icon with Orange Badge */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative p-1.5 text-neutral-800 hover:text-neutral-950 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f97316] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-neutral-700 hover:text-neutral-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200 p-4 space-y-2 shadow-xl pointer-events-auto">
          <Link href="/" className="block py-2 text-sm font-semibold text-[#f97316]">
            Home
          </Link>
          <Link href="/cameras" className="block py-2 text-sm font-medium text-neutral-700">
            Cameras
          </Link>
          <Link href="/iphone" className="block py-2 text-sm font-medium text-neutral-700">
            iPhone
          </Link>
          <Link href="/accessories" className="block py-2 text-sm font-medium text-neutral-700">
            Accessories
          </Link>
          <Link href="/deals" className="block py-2 text-sm font-medium text-neutral-700">
            Deals
          </Link>
        </div>
      )}
    </header>
  );
}
