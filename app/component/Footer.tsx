"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
    const [email, setEmail] = useState("");

    const orange = "#F26A1B";

    const columns = [
        {
            title: "Shop",
            links: ["Cameras", "Lenses", "iPhones", "Accessories", "All Products"],
        },
        {
            title: "Support",
            links: ["Track Order", "Returns & Refunds", "Warranty", "Help Center", "Contact Us"],
        },
        {
            title: "Company",
            links: ["About Us", "Why Pixel Store", "Blog", "Careers", "Partner With Us"],
        },
    ];

    const socials = [
        {
            name: "Instagram",
            icon: (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
            ),
        },
        {
            name: "YouTube",
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
                </svg>
            ),
        },
        {
            name: "X",
            icon: (
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M4 4l16 16M20 4L4 20" />
                </svg>
            ),
        },
        {
            name: "Facebook",
            icon: (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.2 15.8 2 14.700 2 12.200 2 10.500 3.500 10.500 6.300v2.200H8v3.500h2.500V22H14v-10h2.700l.4-3.500H14Z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            icon: (
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                    <path d="M4.500 8.500h3.300V20H4.500V8.500ZM6.150 3.300a1.900 1.900 0 1 1 0 3.800 1.900 1.900 0 0 1 0-3.800ZM10 8.500h3.100v1.600h.1c.4-.8 1.500-1.900 3.200-1.900 3.400 0 4 2.200 4 5.100V20h-3.300v-5.800c0-1.400 0-3.100-1.900-3.100s-2.200 1.500-2.200 3V20H10V8.500Z" />
                </svg>
            ),
        },
    ];

    const features = [
        {
            title: "Fast & Safe",
            sub: "Delivery",
            icon: (
                <svg viewBox="0 0 48 48" width="42" height="42" fill="none" stroke={orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h24v22H4zM28 18h9l7 8v8H28z" />
                    <circle cx="14" cy="36" r="4" fill="#fff" />
                    <circle cx="36" cy="36" r="4" fill="#fff" />
                    <path d="M1 18h8M3 24h6" />
                </svg>
            ),
        },
        {
            title: "100%",
            sub: "Original Products",
            icon: (
                <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10l16-6Z" />
                    <path d="M16 24l6 6 11-12" />
                </svg>
            ),
        },
        {
            title: "Warranty",
            sub: "Assured",
            icon: (
                <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10l16-6Z" />
                    <path d="M16 24l6 6 11-12" />
                </svg>
            ),
        },
        {
            title: "Dedicated",
            sub: "Support",
            icon: (
                <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke={orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 28v-6a16 16 0 0 1 32 0v6" />
                    <rect x="5" y="24" width="7" height="12" rx="3" />
                    <rect x="36" y="24" width="7" height="12" rx="3" />
                    <path d="M40 36c0 5-5 7-12 7" />
                    <circle cx="26" cy="43" r="2" fill={orange} />
                </svg>
            ),
        },
    ];

    const policies = ["Privacy Policy", "Terms & Conditions", "Shipping Policy"];

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: connect to your newsletter API
        console.log("Subscribed:", email);
        setEmail("");
    };

    return (
        <footer className="relative w-full overflow-hidden bg-white font-sans text-[#111]">
            {/* Top-left orange wave */}
            <svg className="pointer-events-none absolute left-0 top-0 h-28 w-28" viewBox="0 0 120 120" fill="none">
                <path d="M0 0h105C80 12 60 30 45 52 30 74 15 90 0 98V0Z" fill={orange} />
                <path d="M0 0h85C65 10 45 28 30 48 20 62 10 74 0 82V0Z" fill="#FFA766" opacity="0.6" />
            </svg>

            {/* Bottom-right orange wave */}
            <svg className="pointer-events-none absolute bottom-0 right-0 h-28 w-52" viewBox="0 0 200 110" fill="none">
                <path d="M200 20C170 30 140 60 110 85 90 100 60 108 40 110H200V20Z" fill="#FFE9DA" opacity="0.8" />
                <path d="M200 55C185 62 170 78 150 95 140 102 130 107 120 110H200V55Z" fill={orange} />
            </svg>

            <div className="relative mx-auto max-w-[1200px] px-6 pt-12 md:px-10">
                {/* Main grid */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_0.9fr_1.4fr]">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <svg viewBox="0 0 64 56" width="52" height="46" fill={orange}>
                                <path d="M14 4h30c11 0 18 5 18 14 0 10-8 17-20 17H32l-4 10H6l8-41Z" />
                                <path d="M22 12h20c5 0 8 2 8 6s-4 8-10 8H27l-3 8" fill="#fff" opacity="0.95" />
                                <path d="M0 40l10-3-2 9H0Z" />
                            </svg>
                            <div className="leading-none">
                                <div className="text-[26px] font-semibold tracking-wide">PIXEL STORE</div>
                                <div className="mt-1.5 text-[11px] text-[#333]">By Lovosis Technology LLC</div>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-[240px] text-[14.5px] leading-6 text-[#444]">
                            Your trusted destination for cameras, smartphones and creator gear.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href="#"
                                    aria-label={s.name}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition hover:text-[#F26A1B]"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-[17px] font-semibold">{col.title}</h4>
                            <span className="mt-2 block h-[2px] w-7 rounded-full" style={{ background: orange }} />
                            <ul className="mt-5 space-y-3">
                                {col.links.map((l) => (
                                    <li key={l}>
                                        <Link href="#" className="text-[14.5px] text-[#222] transition hover:text-[#F26A1B]">
                                            {l}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-[17px] font-semibold">Stay in the Loop</h4>
                        <span className="mt-2 block h-[2px] w-7 rounded-full" style={{ background: orange }} />
                        <p className="mt-4 max-w-[300px] text-[13.5px] leading-5 text-[#666]">
                            Get the latest product updates, offers and creator deals in your inbox.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-5 flex h-[42px] max-w-[310px] items-center rounded-full bg-white py-1 pl-4 pr-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                aria-label="Email address"
                                className="min-w-0 flex-1 bg-transparent text-[14px] text-[#111] outline-none placeholder:text-[#555]"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="flex h-[34px] w-[38px] items-center justify-center rounded-full text-white transition hover:opacity-90"
                                style={{ background: orange }}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-[#EEE] py-5 text-[13px] text-[#333] md:flex-row">
                    <p>© 2026 Pixel Store. All rights reserved.</p>
                    <div className="relative z-10 flex items-center gap-4">
                        {policies.map((p, i) => (
                            <span key={p} className="flex items-center gap-4">
                                {i !== 0 && <span className="text-[#777]">|</span>}
                                <Link href="#" className="transition hover:text-[#F26A1B]">
                                    {p}
                                </Link>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}