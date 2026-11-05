"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PromoCard, promoCardsData } from "../data/promoCardsData";

interface PromoCardsSectionProps {
  cards?: PromoCard[];
}

export default function PromoCardsSection({
  cards = promoCardsData,
}: PromoCardsSectionProps) {
  return (
    <section className="w-full bg-[#070707] py-8 sm:py-12 border-t border-white/5 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((card, index) => {
            // First card swoops from Left, second card swoops from Right (on both scroll down & up)
            const enterFromLeft = index === 0;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: enterFromLeft ? -100 : 100, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative rounded-2xl overflow-hidden bg-[#0e0e0e] border border-white/10 hover:border-white/25 transition-all duration-300 min-h-[280px] sm:min-h-[300px] flex items-center group shadow-xl"
              >
                {/* Product Background Image right-aligned */}
                <div className="absolute inset-0 z-0 flex justify-end">
                  <div className="relative w-[55%] sm:w-[60%] h-full">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/95 via-45% to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-transparent" />
                </div>

                {/* Text & Button Content (Left Column) */}
                <div className="relative z-10 p-6 sm:p-8 max-w-[62%] sm:max-w-[55%] space-y-4">
                  <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#d6b080] uppercase">
                    {card.tag}
                  </p>

                  <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
                    {card.titleLine1} <br />
                    <span className="text-white">{card.titleLine2}</span>
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {card.descLine1} <br />
                    {card.descLine2}
                  </p>

                  <div className="pt-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      <Link
                        href={card.buttonHref}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-neutral-700 hover:border-neutral-400 bg-black/40 hover:bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium transition-all group-hover:border-neutral-500"
                      >
                        <span>{card.buttonText}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </motion.div>
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
