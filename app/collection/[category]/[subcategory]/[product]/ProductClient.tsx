"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Product, Category, Subcategory } from "@/app/lib/types";

interface ProductClientProps {
  product: Product;
  category?: Category;
  subcategory?: Subcategory;
  relatedProducts: Product[];
  catId: string;
  subId: string;
}

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// SVG icons map corresponding to category names
function getCategoryIcon(catName: string) {
  const normalized = catName.toLowerCase();
  if (normalized.includes("camera") || normalized.includes("model") || normalized.includes("body")) {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  if (normalized.includes("image") || normalized.includes("sensor") || normalized.includes("optic")) {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
      </svg>
    );
  }
  if (normalized.includes("video") || normalized.includes("recording")) {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 10l5-3v10l-5-3v-4z" />
      </svg>
    );
  }
  if (normalized.includes("autofocus") || normalized.includes("focus") || normalized.includes("af")) {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3" />
      </svg>
    );
  }
  if (normalized.includes("display") || normalized.includes("screen") || normalized.includes("monitor")) {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 15h20" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

export default function ProductClient({
  product,
  category,
  subcategory,
  relatedProducts,
  catId,
  subId,
}: ProductClientProps) {
  // Extract categories dynamically from product.specs
  const specCategories = useMemo(() => {
    const rawCategories: string[] = [];
    (product.specs || []).forEach((spec) => {
      const cat = spec.category || "General";
      if (!rawCategories.includes(cat)) {
        rawCategories.push(cat);
      }
    });

    if (rawCategories.length === 0) {
      rawCategories.push("Specifications");
    }

    return rawCategories.map((name) => ({
      id: name,
      label: name,
      icon: getCategoryIcon(name),
    }));
  }, [product.specs]);

  // Specs active tab defaults to first available category
  const [activeSpecTab, setActiveSpecTab] = useState<string>(
    specCategories[0]?.id || "General"
  );

  // FAQ Accordion active index
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Active specs filtered for current selected category
  const displayedSpecs = useMemo(() => {
    const matched = (product.specs || []).filter((s) => {
      const cat = s.category || "General";
      return cat.toLowerCase() === activeSpecTab.toLowerCase();
    });
    return matched.length > 0 ? matched : (product.specs || []);
  }, [product.specs, activeSpecTab]);

  // All properties fetched strictly from product object
  const heroBanner = product.heroBanner || product.image;
  const specDisplayImg = product.image;
  const galleryItems = product.gallery || [];
  const boxContents = product.boxContents || [];
  const compatibleAccessories = product.compatibleAccessories || [];
  const faqs = product.faqs || [];
  const taglineSpecs = product.taglineSpecs || [];

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-neutral-900 font-sans antialiased selection:bg-[#ff6a00] selection:text-white">
      {/* ── SECTION 1: HERO SPOTLIGHT (Dynamic Product Data) ── */}
      <section className="relative overflow-hidden w-full aspect-[1920/1080] min-h-[500px] flex items-center border-b border-neutral-300">
        {/* Banner Background Image from product.heroBanner */}
        {heroBanner && (
          <div className="absolute inset-0 z-0">
            <img
              src={heroBanner}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Dynamic Overlay Content Layer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 sm:pt-14 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[340px] sm:min-h-[400px] -translate-y-10 sm:-translate-y-14 lg:-translate-y-16">
            {/* Left: Product Header Information & Actions */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              {/* Brand Pill */}
              {product.brand && (
                <motion.div variants={fadeUp} className="mb-4">
                  <span className="inline-block bg-neutral-900/10 backdrop-blur-md text-neutral-800 text-xs font-mono font-bold tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-neutral-900/15">
                    {product.brand.toUpperCase()}
                  </span>
                </motion.div>
              )}

              {/* Title with Orange Accent Model */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-neutral-950 tracking-tight leading-[1.05] mb-4"
              >
                {product.brand}{" "}
                <span className="text-[#ff6a00]">
                  {product.name.replace(product.brand, "").trim() || product.name}
                </span>
              </motion.h1>

              {/* Description */}
              {product.description && (
                <motion.p
                  variants={fadeUp}
                  className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-lg mb-8"
                >
                  {product.description}
                </motion.p>
              )}

              {/* Action Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-8">
                {product.specs && product.specs.length > 0 && (
                  <a
                    href="#specs"
                    className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105"
                  >
                    <span>Explore Features</span>
                    <span className="text-sm">→</span>
                  </a>
                )}

                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hi Pixel Store! I would like to inquire about the ${product.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white/80 hover:bg-white text-neutral-900 font-semibold text-sm px-6 py-3.5 rounded-full border border-neutral-300 shadow-sm transition-all hover:scale-105"
                >
                  <span className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center text-[10px]">
                    ▶
                  </span>
                  <span>Inquire Now</span>
                </a>
              </motion.div>

              {/* Tech Spec Tagline Pills fetched strictly from product.taglineSpecs */}
              {taglineSpecs.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-3 text-[11px] sm:text-xs font-mono font-semibold text-neutral-600 uppercase tracking-wider flex-wrap"
                >
                  {taglineSpecs.map((tag, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-neutral-400">|</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Right: Transparent breathing area allowing background banner hero to display */}
            <div className="hidden lg:block lg:col-span-6 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TECHNICAL SPECIFICATIONS (Exact match to reference design) ── */}
      {product.specs && product.specs.length > 0 && (
        <section id="specs" className="pt-14 pb-16 bg-white overflow-hidden select-none border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header: Exact reference styling with orange dash */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideInLeft}
              className="flex items-center gap-3.5 mb-10"
            >
              <span className="w-7 h-[4px] bg-[#ff6a00] rounded-sm inline-block" />
              <h2 className="text-2xl sm:text-[28px] font-black text-neutral-950 tracking-tight">
                Technical Specifications
              </h2>
            </motion.div>

            {/* 3-Column Layout: [Tabs Pill Menu] [Top-Down Camera on Radar] [Spec Table + Alpha Watermark] */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Column 1: Left Categories with Rounded Pill Button (Active is solid black rounded pill) */}
              {specCategories.length > 1 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={slideInLeft}
                  className="lg:col-span-3 flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0"
                >
                  {specCategories.map((cat) => {
                    const isActive = activeSpecTab.toLowerCase() === cat.id.toLowerCase();
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveSpecTab(cat.id)}
                        className={`group flex items-center gap-4 px-5 py-3 rounded-2xl text-[13px] font-semibold transition-all text-left whitespace-nowrap cursor-pointer ${isActive
                          ? "bg-neutral-950 text-white shadow-sm"
                          : "bg-transparent text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/60"
                          }`}
                      >
                        <span
                          className={`flex-shrink-0 transition-colors ${isActive ? "text-white" : "text-neutral-600 group-hover:text-neutral-950"
                            }`}
                        >
                          {cat.icon}
                        </span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* Column 2: Center Top-Down View Camera with Concentric Light Rings */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className={`${specCategories.length > 1 ? "lg:col-span-4" : "lg:col-span-6"
                  } flex items-center justify-center relative min-h-[380px] sm:min-h-[440px] py-4`}
              >
                {/* Concentric ripple rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[220px] h-[220px] rounded-full border border-neutral-200/80" />
                  <div className="w-[330px] h-[330px] rounded-full border border-neutral-200/60 absolute" />
                  <div className="w-[440px] h-[440px] rounded-full border border-neutral-200/40 absolute" />
                  <div className="w-[540px] h-[540px] rounded-full border border-neutral-200/20 absolute" />
                </div>

                {/* Top-down Camera View */}
                <div className="relative z-10 w-full max-w-[420px] sm:max-w-[460px] flex items-center justify-center">
                  <img
                    src={specDisplayImg}
                    alt={`${product.name} Top View`}
                    className="w-full max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Column 3: Spec Key-Value Table with Right α Watermark */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={slideInRight}
                className={`${specCategories.length > 1 ? "lg:col-span-5" : "lg:col-span-6"
                  } relative overflow-hidden`}
              >
                {/* Faded Alpha Watermark strictly as shown in the screenshot */}
                <div
                  aria-hidden="true"
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-[300px] font-serif italic font-extrabold text-neutral-900/[0.05] pointer-events-none select-none leading-none z-0 tracking-tighter"
                >
                  α
                </div>

                {/* Table Rows with dividers */}
                <div className="relative z-10 divide-y divide-neutral-200/80 text-[13px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSpecTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="divide-y divide-neutral-200/80"
                    >
                      {displayedSpecs.map((item, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-12 py-3 gap-3 items-center"
                        >
                          <span className="col-span-5 font-bold text-neutral-950">
                            {item.label}
                          </span>
                          <span className="col-span-7 text-neutral-600 font-medium text-left">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 3: GALLERY (Dynamically from product.gallery) ── */}
      {galleryItems.length > 0 && (
        <section className="pt-2 pb-14 sm:pb-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideInLeft}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[3px] bg-[#ff6a00] rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                  Gallery
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
            >
              {galleryItems.map((imgSrc, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="relative h-28 sm:h-36 rounded-2xl overflow-hidden cursor-pointer border border-neutral-200/90 bg-neutral-950 shadow-xs hover:border-neutral-400 transition-all group"
                >
                  <img
                    src={imgSrc}
                    alt={`${product.name} Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── SECTION 4: BOX, ACCESSORIES, FAQS (Dynamic from product data) ── */}
      {(boxContents.length > 0 || compatibleAccessories.length > 0 || faqs.length > 0) && (
        <section className="py-14 sm:py-16 bg-[#fafbfc] border-b border-neutral-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Box 1: What's in the Box? */}
              {boxContents.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={slideInLeft}
                  className={`${compatibleAccessories.length > 0 && faqs.length > 0
                    ? "lg:col-span-5"
                    : "lg:col-span-6"
                    } flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-5 h-[3px] bg-[#ff6a00] rounded-full" />
                    <h3 className="text-[17px] font-black tracking-tight text-neutral-950">
                      What&apos;s in the Box?
                    </h3>
                  </div>
                  <div className="bg-white border border-neutral-200/90 rounded-[24px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between gap-1 sm:gap-2">
                    {boxContents.map((box, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center text-center">
                        <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center mb-2">
                          <img
                            src={box.image}
                            alt={box.label}
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)] hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[11px] sm:text-[12px] font-medium text-neutral-700 leading-tight">
                          {box.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Box 2: Compatible Accessories */}
              {compatibleAccessories.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className={`${boxContents.length > 0 && faqs.length > 0
                    ? "lg:col-span-4"
                    : "lg:col-span-6"
                    } flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-5 h-[3px] bg-[#ff6a00] rounded-full" />
                    <h3 className="text-[17px] font-black tracking-tight text-neutral-950">
                      Compatible Accessories
                    </h3>
                  </div>
                  <div className="bg-white border border-neutral-200/90 rounded-[24px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between gap-1 sm:gap-2">
                    {compatibleAccessories.map((acc, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center text-center">
                        <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center mb-2">
                          <img
                            src={acc.image}
                            alt={acc.label}
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)] hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[11px] sm:text-[12px] font-medium text-neutral-700 leading-tight">
                          {acc.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Box 3: Frequently Asked Questions */}
              {faqs.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={slideInRight}
                  className={`${boxContents.length > 0 && compatibleAccessories.length > 0
                    ? "lg:col-span-3"
                    : "lg:col-span-12"
                    } flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-[3px] bg-[#ff6a00] rounded-full" />
                      <h3 className="text-[17px] font-black tracking-tight text-neutral-950">
                        Frequently Asked Questions
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {faqs.map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div
                          key={index}
                          className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white shadow-xs transition-all"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-[12px] sm:text-[13px] text-neutral-900 hover:text-[#ff6a00] transition-colors cursor-pointer gap-2"
                          >
                            <span className="line-clamp-1">{faq.question}</span>
                            <span className="text-base font-mono text-neutral-400 shrink-0">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-3 pt-2 text-[11px] sm:text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}