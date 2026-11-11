"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ─────────────────────────── Feature badges ─────────────────────────── */

interface FeatureBadge {
    icon: React.ReactNode;
    label: string;
}

const iconProps = {
    className: "w-7 h-7 sm:w-8 sm:h-8 text-[#f97316]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
};

const featureBadges: FeatureBadge[] = [
    {
        label: "100% Genuine Gear",
        icon: (
            <svg {...iconProps}>
                <circle cx="12" cy="8.5" r="5.5" />
                <path d="M12 6.2l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 8.3l2-.3.9-1.8Z" />
                <path d="m8.8 13.3-1.3 7.2 4.5-2.7 4.5 2.7-1.3-7.2" />
            </svg>
        ),
    },
    {
        label: "Brand Warranty",
        icon: (
            <svg {...iconProps}>
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
    },
    {
        label: "Express Shipping",
        icon: (
            <svg {...iconProps}>
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx="17" cy="18" r="2" />
                <circle cx="7" cy="18" r="2" />
                <path d="M5 8h5" />
                <path d="M5 11.5h3" />
            </svg>
        ),
    },
    {
        label: "Creator Support",
        icon: (
            <svg {...iconProps}>
                <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
                <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
            </svg>
        ),
    },
];

/* ─────────────────────────── Slanted card system ─────────────────────────── */

const SKEW_DEG = 12;
const SKEW = `skewX(-${SKEW_DEG}deg)`;
const UNSKEW = `skewX(${SKEW_DEG}deg)`;

/** All values are % of the stage. */
interface Box {
    left: number;
    top: number;
    width: number;
    height: number;
}

/**
 * Subtly congested card positioning:
 * Gaps between cards tightened just a tiny bit (~1%) for a snug, cohesive look.
 */
const BOXES: Record<"left" | "center" | "right", Box> = {
    left: { left: 8.5, top: 14, width: 25.5, height: 72 },
    center: { left: 34.5, top: 4, width: 28.5, height: 92 },
    right: { left: 63.5, top: 21.5, width: 24.5, height: 59 },
};

/** Where each card flies in from. */
type Entry = "left" | "right" | "bottom";

const ENTRY_OFFSET: Record<Entry, { x: number; y: number; scale: number }> = {
    left: { x: -220, y: 0, scale: 1 },
    right: { x: 220, y: 0, scale: 1 },
    bottom: { x: 0, y: 70, scale: 0.9 },
};

interface SlantCardProps {
    box: Box;
    alt: string;
    /** Shared image (continuous across all cards) */
    sharedSrc: string;
    /** Optional per-card override (not continuous) */
    overrideSrc?: string;
    highlight?: boolean;
    zIndex: number;
    /** Direction the card slides in from */
    from?: Entry;
    delay?: number;
}

function SlantCard({
    box,
    alt,
    sharedSrc,
    overrideSrc,
    highlight = false,
    zIndex,
    from = "left",
    delay = 0,
}: SlantCardProps) {
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const off = ENTRY_OFFSET[from];

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: off.x,
                y: off.y,
                scale: off.scale,
                skewX: -SKEW_DEG,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                skewX: -SKEW_DEG,
            }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
            className="absolute overflow-hidden rounded-[14px] sm:rounded-[22px] cursor-pointer"
            style={{
                left: `${box.left}%`,
                top: `${box.top}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
                zIndex,
                boxShadow: highlight
                    ? "0 30px 60px rgba(0,0,0,0.30)"
                    : "0 18px 40px rgba(0,0,0,0.18)",
            }}
        >
            {/* Counter-skew so the picture stays upright inside the slanted frame */}
            <div className="absolute inset-0" style={{ transform: UNSKEW }}>
                {overrideSrc ? (
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute"
                        style={{ inset: "-12% -22%" }}
                    >
                        <Image
                            src={overrideSrc}
                            alt={alt}
                            fill
                            sizes="320px"
                            className="object-cover object-center"
                            draggable={false}
                        />
                    </motion.div>
                ) : (
                    /*
                     * One stage-sized image, offset so each card shows its own
                     * slice. Gaps between cards hide a sliver of the photo, which
                     * is what makes the three cards read as one connected picture.
                     */
                    <motion.div
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute"
                        style={{
                            width: `${10000 / box.width}%`,
                            height: `${10000 / box.height}%`,
                            left: `${(-box.left / box.width) * 100}%`,
                            top: `${(-box.top / box.height) * 100}%`,
                            originX: cx / 100,
                            originY: cy / 100,
                        }}
                    >
                        <Image
                            src={sharedSrc}
                            alt={alt}
                            fill
                            sizes="(max-width: 1024px) 90vw, 580px"
                            className="object-cover object-center"
                            draggable={false}
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

/** A skewed decorative frame. `sides` lets us draw open brackets instead of full outlines. */
function Frame({
    box,
    radius = 20,
    color = "#f97316",
    sides = "all",
    opacity = 1,
}: {
    box: Box;
    radius?: number;
    color?: string;
    sides?: "all" | "top-right" | "bottom-left";
    opacity?: number;
}) {
    const line = `1.5px solid ${color}`;
    const border: React.CSSProperties =
        sides === "all"
            ? { border: line }
            : sides === "top-right"
                ? { borderTop: line, borderRight: line }
                : { borderBottom: line, borderLeft: line };

    return (
        <div
            className="absolute pointer-events-none"
            style={{
                left: `${box.left}%`,
                top: `${box.top}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
                transform: SKEW,
                borderRadius: radius,
                opacity,
                ...border,
            }}
        />
    );
}

/* ─────────────────────────── Component ─────────────────────────── */

interface WhyProps {
    /** One image that flows across all three cards (recommended) */
    image?: string;
    /** Optional individual images — if set, that card stops sharing the main image */
    card1Image?: string;
    card2Image?: string;
    card3Image?: string;
}

export default function Why({
    image = "/saaa.jpeg",
    card1Image = "/card-camera-clean.jpg",
    card2Image = "/card-iphone-clean.jpg",
    card3Image = "/card-headphones-clean.jpg",
}: WhyProps) {
    return (
        <section className="relative w-full bg-gradient-to-b from-[#fbf4f1] via-[#fcfaf8] to-white py-14 sm:py-20 lg:py-24 border-b border-neutral-100 overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

                    {/* ───────── Left column (slides in from left) ───────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-6 space-y-6 sm:space-y-7 z-10 lg:pt-12 -ml-2 sm:-ml-4 lg:-ml-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-10 sm:w-14 h-[2px] bg-[#f97316] inline-block" />
                            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.3em] text-[#1e1e1e] uppercase">
                                ABOUT PIXEL STORE
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-[-0.035em] text-neutral-950 leading-[1.08]">
                            <span className="block">Your Premier Tech &</span>
                            <span className="block mt-1">
                                <span className="text-[#f97316] italic">Creator Destination.</span>
                            </span>
                        </h2>

                        <p className="text-neutral-600 text-sm sm:text-[15px] max-w-lg leading-relaxed">
                            At Pixel Store, we bring the latest flagship iPhones, professional mirrorless cameras, cinema gear, and premium accessories straight to your setup. With certified genuine authenticity, official warranties, and creator-first guidance, we empower filmmakers, photographers, and visionaries to produce their finest work.
                        </p>

                        {/* Pixel Highlights List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-lg">
                            <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                                <div className="text-xs">
                                    <span className="font-bold text-neutral-900 block">Authorized Retailer</span>
                                    <span className="text-neutral-500">Official brand warranties with guaranteed support.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                                <div className="text-xs">
                                    <span className="font-bold text-neutral-900 block">Pro Creator Gear</span>
                                    <span className="text-neutral-500">Sony, Apple, DJI, and top optics tested for pros.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                                <div className="text-xs">
                                    <span className="font-bold text-neutral-900 block">Express Delivery</span>
                                    <span className="text-neutral-500">Insured, tracked, and safely packaged direct to you.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#f97316] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                                <div className="text-xs">
                                    <span className="font-bold text-neutral-900 block">Hassle-Free Care</span>
                                    <span className="text-neutral-500">Easy returns and dedicated post-purchase service.</span>
                                </div>
                            </div>
                        </div>

                        {/* Pixel Store Stats */}


                        {/* Feature Badges Bar */}

                    </motion.div>

                    {/* ───────── Right column (cards animate in individually) ───────── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="lg:col-span-6 flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-[580px] aspect-[1.38/1]">

                            {/* Warm glow */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-br from-orange-200/55 via-amber-100/25 to-transparent blur-3xl" />
                            </div>

                            {/* Peach fill, quarter fade-out toward the bottom (far left) */}
                            <div
                                className="absolute pointer-events-none"
                                style={{
                                    left: "1.5%",
                                    top: "26%",
                                    width: "22%",
                                    height: "62%",
                                    transform: SKEW,
                                    borderRadius: 22,
                                    background:
                                        "linear-gradient(180deg, #f9a96e 0%, #fdcba0 18%, #fde3cc 28%, rgba(253,227,204,0.12) 38%, transparent 50%)",
                                    opacity: 0.95,
                                }}
                            />

                            {/* Outline peeking above the left card, bleeding into the centre card (faded) */}
                            <Frame box={{ left: 14.5, top: 2, width: 26, height: 52 }} radius={22} opacity={0.65} />

                            {/* Bracket linking the centre card to the top-right (faded) */}
                            <Frame
                                box={{ left: 65, top: 9, width: 27, height: 20 }}
                                radius={16}
                                sides="top-right"
                                opacity={0.55}
                            />

                            {/* Bracket under the left and centre cards (faded) */}
                            <Frame
                                box={{ left: 10.5, top: 90, width: 40, height: 9 }}
                                radius={14}
                                sides="bottom-left"
                                opacity={0.5}
                            />

                            {/* Cards — left flies in from the left, right from the right,
                                centre pops forward from the bottom */}
                            <SlantCard
                                box={BOXES.left}
                                alt="Product 1"
                                sharedSrc={image}
                                overrideSrc={card1Image}
                                zIndex={10}
                                from="left"
                                delay={0}
                            />
                            <SlantCard
                                box={BOXES.right}
                                alt="Product 3"
                                sharedSrc={image}
                                overrideSrc={card3Image}
                                zIndex={10}
                                from="right"
                                delay={0.12}
                            />
                            <SlantCard
                                box={BOXES.center}
                                alt="Product 2"
                                sharedSrc={image}
                                overrideSrc={card2Image}
                                highlight
                                zIndex={20}
                                from="bottom"
                                delay={0.24}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}