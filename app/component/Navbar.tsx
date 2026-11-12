"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/app/data/catalog";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter products based on search input
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(query);
      const matchTagline = product.tagline?.toLowerCase().includes(query);
      const matchCategory = product.categoryName?.toLowerCase().includes(query);
      const matchDescription = product.description?.toLowerCase().includes(query);
      return matchName || matchTagline || matchCategory || matchDescription;
    }).slice(0, 6);
  }, [searchQuery]);

  // Handle outside click to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search dropdown on route change
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/category/${product.categorySlug}/${product.slug}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 select-none transition-all duration-300 pointer-events-none">
      {/* Floating Pill Container Navbar */}
      <nav
        className={`max-w-7xl mx-auto rounded-full border transition-all duration-300 pointer-events-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 ${scrolled
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

        {/* Center: Nav links with soft peach pill on active link */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs sm:text-[13px] font-bold">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1 transition-all ${active
                  ? "px-3.5 py-1.5 rounded-full bg-[#ffe4d1] text-neutral-950 font-extrabold shadow-sm"
                  : "text-neutral-700 hover:text-neutral-950"
                  }`}
              >
                <span>{link.name}</span>
                {link.name === "Contact" && !active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] translate-y-[-3px]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Search Input Bar with Real-time Product Results Dropdown */}
        <div ref={searchContainerRef} className="relative hidden md:block flex-1 max-w-[280px] lg:max-w-[340px]">
          <div className="flex items-center w-full bg-neutral-50/90 hover:bg-neutral-100/90 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#f97316]/30 border border-neutral-200/80 rounded-full px-3.5 py-1.5 text-xs text-neutral-700 gap-2 transition-all">
            <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => {
                if (searchQuery.trim().length > 0) {
                  setIsSearchOpen(true);
                }
              }}
              placeholder="Search cameras, lenses, gear..."
              className="w-full bg-transparent border-none outline-none text-[12px] text-neutral-900 placeholder:text-neutral-400 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="text-neutral-400 hover:text-neutral-600 p-0.5"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex justify-between items-center border-b border-neutral-100 mb-1">
                <span>Products ({searchResults.length})</span>
                <span className="text-[10px] lowercase font-normal text-neutral-400">matching &ldquo;{searchQuery}&rdquo;</span>
              </div>

              {searchResults.length > 0 ? (
                <div className="max-h-[340px] overflow-y-auto space-y-1">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSelectProduct(product)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors text-left group"
                    >
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-[#f97316] transition-colors">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate">
                          {product.tagline || product.categoryName}
                        </p>
                        <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 font-semibold">
                          {product.categoryName}
                        </span>
                      </div>
                    </button>
                  ))}
                  <div className="pt-1.5 mt-1 border-t border-neutral-100">
                    <Link
                      href={`/products?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="block text-center text-[11px] font-bold text-[#f97316] hover:text-orange-700 py-1 transition-colors"
                    >
                      View all results &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-6 px-4 text-center">
                  <p className="text-xs text-neutral-600 font-semibold">No products found</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Try searching for camera, lens, iPhone, or power</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions (Clean outline buttons matching navbar style) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="hidden sm:inline-block h-4 w-[1px] bg-neutral-200" />

          {/* Email button */}
          <a
            href="mailto:support@pixelstore.in"
            aria-label="Email Us"
            title="Email: support@pixelstore.in"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-700 hover:text-[#f97316] hover:bg-neutral-100/80 transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </a>

          {/* WhatsApp button (Circular outline style matching your reference image) */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="WhatsApp: +91 98765 43210"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#059669] hover:text-[#047857] hover:bg-emerald-50/80 transition-colors"
          >
            <svg
              className="w-[18px] h-[18px] sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* WhatsApp speech bubble with tail */}
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              {/* WhatsApp phone handset receiver */}
              <path d="M16 13.5c-.25-.13-.85-.42-1-.48-.15-.06-.26-.09-.37.09-.11.17-.42.54-.52.65-.1.11-.2.13-.37.04-.17-.09-.72-.26-1.37-.84-.51-.45-.85-1.01-.95-1.18-.1-.17-.01-.26.08-.34.08-.08.17-.2.26-.3.09-.1.11-.17.17-.28.06-.11.03-.21-.01-.3-.04-.09-.37-.9-.51-1.23-.13-.33-.27-.28-.37-.29h-.32c-.11 0-.29.04-.44.21-.15.17-.58.57-.58 1.39s.6 1.61.68 1.72c.09.11 1.17 1.78 2.83 2.5.4.17.7.27.94.35.4.13.76.11 1.05.07.32-.05.99-.4 1.13-.79.14-.39.14-.72.1-.79-.04-.07-.15-.11-.33-.2z" fill="currentColor" stroke="none" />
            </svg>
          </a>

          {/* Contact / Phone Number button */}
          <a
            href="tel:18001237493"
            aria-label="Call Us"
            title="Call: 1800-123-7493"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80 transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </a>

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
        <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200 p-4 space-y-3 shadow-xl pointer-events-auto">
          {/* Mobile Search Bar */}
          <div className="relative">
            <div className="flex items-center w-full bg-neutral-100/90 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-700 gap-2">
              <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder="Search products..."
                className="w-full bg-transparent border-none outline-none text-xs text-neutral-900 placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-neutral-400 p-0.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-2 bg-neutral-50 rounded-xl border border-neutral-200 p-2 max-h-[260px] overflow-y-auto space-y-1">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSelectProduct(product);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg bg-white border border-neutral-100 hover:border-orange-200 text-left"
                    >
                      <div className="relative w-9 h-9 rounded-md overflow-hidden bg-neutral-100 shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">{product.name}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{product.categoryName}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 text-center py-3">No products found</p>
                )}
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${active
                  ? "bg-[#ffe4d1] text-[#f97316]"
                  : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Quick Contact Links in Mobile Drawer */}
          <div className="pt-3 mt-2 border-t border-neutral-200/80 flex items-center justify-around">
            <a
              href="mailto:support@pixelstore.in"
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-[#f97316] py-1 px-2.5 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>Email</span>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-emerald-600 py-1 px-2.5 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:18001237493"
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-blue-600 py-1 px-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <span>Call</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
