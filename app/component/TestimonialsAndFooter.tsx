"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { customerReviews } from "../data/storeData";

export default function TestimonialsAndFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#fbf9f6] text-neutral-800 pt-12 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* What Our Customers Say */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              What Our Customers Say
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Trusted by creators, professionals and tech lovers across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {customerReviews.map((rev, i) => (
              <motion.div
                key={rev.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white border border-neutral-200/70 shadow-sm flex items-start gap-4"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  {/* 5 Stars */}
                  <div className="flex text-amber-500 text-sm tracking-widest leading-none">
                    ★★★★★
                  </div>
                  <p className="text-xs text-neutral-600 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <p className="text-xs font-bold text-neutral-900">
                    — {rev.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stay in the Loop Newsletter Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faebd7] flex items-center justify-center text-[#a4682c] text-xl flex-shrink-0">
              ✉️
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900">
                Stay in the Loop.
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Get the latest product launches, deals and creator tips — straight to your inbox.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto items-center gap-2 max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 min-w-[220px] px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#b47a3e]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#b47a3e] text-white font-semibold text-sm hover:bg-[#96632e] transition-all whitespace-nowrap shadow-sm"
            >
              {subscribed ? "Subscribed!" : "Subscribe →"}
            </button>
          </form>
        </div>

        {/* Main Footer Links & Copyright */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-8 border-t border-neutral-200 text-xs sm:text-sm">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded text-[#b47a3e] font-bold text-lg">
                📷
              </span>
              <span className="text-lg font-bold text-neutral-900">
                Pixel Store
              </span>
            </div>
            <p className="text-neutral-500 max-w-xs text-xs leading-relaxed">
              Your one-stop destination for cameras, iPhones and creator gear.
            </p>
            <div className="flex items-center gap-3 text-neutral-500">
              <Link href="#" className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:text-[#b47a3e] transition-colors">
                📸
              </Link>
              <Link href="#" className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:text-[#b47a3e] transition-colors">
                ▶️
              </Link>
              <Link href="#" className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:text-[#b47a3e] transition-colors">
                ✕
              </Link>
              <Link href="#" className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:text-[#b47a3e] transition-colors">
                f
              </Link>
            </div>
          </div>

          {/* Shop Col */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 uppercase text-xs tracking-wider">
              Shop
            </p>
            <ul className="space-y-2 text-neutral-500 text-xs">
              <li><Link href="/cameras" className="hover:text-neutral-900">Cameras</Link></li>
              <li><Link href="/iphone" className="hover:text-neutral-900">iPhone</Link></li>
              <li><Link href="/lenses" className="hover:text-neutral-900">Lenses</Link></li>
              <li><Link href="/accessories" className="hover:text-neutral-900">Accessories</Link></li>
              <li><Link href="/deals" className="hover:text-neutral-900">Deals</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 uppercase text-xs tracking-wider">
              Company
            </p>
            <ul className="space-y-2 text-neutral-500 text-xs">
              <li><Link href="/about" className="hover:text-neutral-900">About Us</Link></li>
              <li><Link href="/story" className="hover:text-neutral-900">Our Story</Link></li>
              <li><Link href="/careers" className="hover:text-neutral-900">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-neutral-900">Blog</Link></li>
              <li><Link href="/press" className="hover:text-neutral-900">Press</Link></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 uppercase text-xs tracking-wider">
              Support
            </p>
            <ul className="space-y-2 text-neutral-500 text-xs">
              <li><Link href="/help" className="hover:text-neutral-900">Help Center</Link></li>
              <li><Link href="/returns" className="hover:text-neutral-900">Returns & Refunds</Link></li>
              <li><Link href="/warranty" className="hover:text-neutral-900">Warranty</Link></li>
              <li><Link href="/track" className="hover:text-neutral-900">Track Your Order</Link></li>
              <li><Link href="/faq" className="hover:text-neutral-900">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-neutral-200 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Pixel Store. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-800">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-800">Terms & Conditions</Link>
            <Link href="/shipping" className="hover:text-neutral-800">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

