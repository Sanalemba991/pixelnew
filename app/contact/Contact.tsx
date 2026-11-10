"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, MotionConfig, AnimatePresence, animate, useInView, type Variants } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
});

interface ContactChannel {
    title: string;
    description: string;
    actionText: string;
    actionHref: string;
    details: string;
    badge: string;
    icon: string;
    highlight?: boolean;
}

const contactChannels: ContactChannel[] = [
    {
        title: "Creator Support Line",
        description: "Speak directly with verified equipment specialists regarding cameras, optics, and setup compatibility.",
        actionText: "Call Toll-Free",
        actionHref: "tel:18001237493",
        details: "1800-123-7493 (Mon–Sat, 10am–8pm)",
        badge: "Live Phone Assistance",
        icon: "phone",
    },
    {
        title: "Instant WhatsApp Desk",
        description: "Quickest way to request stock availability, trade-in questions, or real-time camera gear advice.",
        actionText: "Start WhatsApp Chat",
        actionHref: "https://wa.me/919876543210",
        details: "+91 98765 43210 (Avg reply: ~5 mins)",
        badge: "Fastest Response",
        icon: "chat",
        highlight: true,
    },
    {
        title: "Official Email Desk",
        description: "For corporate studio quotes, tax invoices, shipping inquiries, and order tracking support.",
        actionText: "Send an Email",
        actionHref: "mailto:support@pixelstore.in",
        details: "support@pixelstore.in",
        badge: "Guaranteed 2-Hour SLA",
        icon: "mail",
    },
    {
        title: "Flagship Experience Studio",
        description: "Hands-on studio zone with full-frame Sony bodies, lenses, and iPhone cinematic rigs ready to test.",
        actionText: "Get Map Directions",
        actionHref: "https://maps.google.com",
        details: "Indiranagar, Bengaluru, KA 560038",
        badge: "Walk-in & Demo",
        icon: "pin",
    },
];

const perks = [
    {
        title: "100% Authorized Indian Stock",
        desc: "All cameras, optics, and mobile studio equipment come factory sealed with full Indian GST invoices and authentic brand warranties.",
        icon: "shield",
    },
    {
        title: "Same-Day Dispatch & Transit Cover",
        desc: "Orders verified prior to 2:00 PM are air-couriered with full transit insurance, real-time OTP tracking, and express door delivery.",
        icon: "bolt",
    },
    {
        title: "Hands-on Flagship Testing Hub",
        desc: "Visit our dedicated Bangalore studio to mount lenses, test optical balances, and configure rigs with on-site technician guidance.",
        icon: "cam",
    },
    {
        title: "B2B & Studio Procurement",
        desc: "Specialized enterprise quoting, volume tiered discounts, and priority dispatch for production studios and corporate creators.",
        icon: "badge",
    },
];

const faqs = [
    {
        q: "Are products backed by official manufacturer warranties?",
        a: "Yes. Every single camera, lens, microphone, and iPhone sold at Pixel Store is 100% brand-authorized, factory sealed, and accompanied by an official GST invoice eligible for brand warranties throughout India.",
    },
    {
        q: "How fast do you dispatch and deliver creator orders?",
        a: "Orders placed before 2:00 PM are dispatched the same day. Metro deliveries arrive within 24 to 48 hours via insured air courier, complete with real-time SMS tracking updates.",
    },
    {
        q: "Can your team help me choose the right camera and lens setup?",
        a: "Yes! Our support consultants are experienced videographers and photographers. Connect with us on WhatsApp or phone to receive unbiased recommendations matched to your production scope.",
    },
    {
        q: "Do you offer corporate or bulk studio purchasing?",
        a: "We regularly supply production houses, creative agencies, and freelance crews. Select 'Corporate / Studio Purchase' in our contact form for priority bulk quotation and B2B GST invoicing.",
    },
    {
        q: "Can I inspect and pick up my order in person?",
        a: "Absolutely. Select 'Studio Pick-up' or notify our desk after placing your order. You can test your gear at our Bengaluru Flagship Studio before checking out.",
    },
    {
        q: "What is your replacement or return policy if gear arrives defective?",
        a: "All shipments are completely insured. If any device arrives damaged or non-functional, we offer an immediate priority exchange within 48 hours of delivery alongside official manufacturer authorization.",
    },
];

/* ---------- New data ---------- */
const stats = [
    { to: 25000, suffix: "+", decimals: 0, label: "Creators equipped across India" },
    { to: 1200, suffix: "+", decimals: 0, label: "Cameras & lenses in stock" },
    { to: 4.9, suffix: "/5", decimals: 1, label: "Average support rating" },
    { to: 98, suffix: "%", decimals: 0, label: "Orders dispatched same day" },
];

const brands = ["Sony", "Canon", "Nikon", "Fujifilm", "Apple", "DJI", "Sigma", "Tamron", "Rode", "Godox", "Manfrotto", "SanDisk"];

const steps = [
    { t: "Tell us your setup", d: "Share your camera, budget, and what you shoot through the form or WhatsApp." },
    { t: "Get a specialist reply", d: "A working videographer sends matched options with exact pricing and stock status." },
    { t: "Confirm and pay", d: "Pay by UPI, card, EMI, or bank transfer. Business buyers get a GST invoice." },
    { t: "Receive insured delivery", d: "Orders confirmed before 2 PM ship the same day. Track every step with OTP delivery." },
];

const reviews = [
    { n: "Aarav Nair", r: "Wedding filmmaker, Kochi", q: "Asked about a lens pairing on WhatsApp and had a clear, honest answer in minutes. The body arrived sealed and insured next day." },
    { n: "Meera Iyer", r: "YouTube creator, Bengaluru", q: "I tested three mics at the Indiranagar studio before buying. Nobody pushed me toward the expensive one." },
    { n: "Rohit Sharma", r: "Producer, Mumbai", q: "Bulk quote and GST invoice for our studio came the same afternoon. Dispatch to our Andheri office took two days." },
    { n: "Sana Khan", r: "Photographer, Hyderabad", q: "My lens arrived with a fault. The exchange was approved within a day and no one argued." },
];

const hours = [
    { d: "Monday – Saturday", h: "10:00 AM – 8:00 PM" },
    { d: "Sunday", h: "By appointment" },
    { d: "Public holidays", h: "WhatsApp and email only" },
];

const responseTimes = [
    { c: "WhatsApp", t: "About 5 minutes", w: 95 },
    { c: "Phone", t: "Answered live", w: 100 },
    { c: "Email", t: "Within 2 hours", w: 70 },
    { c: "Inquiry form", t: "Within 4 hours", w: 55 },
];

export default function Contact() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(0);
    const [formHighlight, setFormHighlight] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Camera & Optical Equipment",
        message: "",
    });

    /* ---------- New state: animated stats + live open status ---------- */
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, amount: 0.4 });
    const [statProgress, setStatProgress] = useState(0);
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        if (!statsInView) return;
        const controls = animate(0, 1, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setStatProgress });
        return () => controls.stop();
    }, [statsInView]);

    useEffect(() => {
        const check = () => {
            const parts = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Kolkata",
                weekday: "short",
                hour: "numeric",
                hour12: false,
            }).formatToParts(new Date());
            const day = parts.find((p) => p.type === "weekday")?.value;
            const hr = Number(parts.find((p) => p.type === "hour")?.value);
            setIsOpen(day !== "Sun" && hr >= 10 && hr < 20);
        };
        check();
        const id = setInterval(check, 60000);
        return () => clearInterval(id);
    }, []);

    /**
     * Slow, eased scroll to a section (easeInOutCubic) with reduced-motion fallback.
     */
    const smoothScrollTo = (targetId: string, duration = 1200) => {
        const target = document.getElementById(targetId);
        if (!target) return;

        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            target.scrollIntoView({ behavior: "auto", block: "start" });
            setFormHighlight(true);
            setTimeout(() => setFormHighlight(false), 1600);
            return;
        }

        const headerOffset = 32;
        const startY = window.pageYOffset;
        const targetY = target.getBoundingClientRect().top + startY - headerOffset;
        const distance = targetY - startY;

        const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(0, startY + distance * easeInOutCubic(progress));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setFormHighlight(true);
                setTimeout(() => setFormHighlight(false), 1600);
            }
        };

        requestAnimationFrame(step);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setFormSubmitted(true);
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    inquiryType: "Camera & Optical Equipment",
                    message: "",
                });
                setFormSubmitted(false);
            }, 6000);
        }, 800);
    };

    const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
    const h2 = "font-black tracking-[-0.035em] leading-[1.08]";

    const icons: Record<string, React.ReactNode> = {
        phone: (
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        ),
        chat: (
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        ),
        mail: (
            <>
                <rect width="20" height="16" x="2" y="4" rx="3" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </>
        ),
        pin: (
            <>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
            </>
        ),
        shield: (
            <>
                <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                <path d="M8.5 12l2.5 2.5 4.5-5" />
            </>
        ),
        bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
        cam: (
            <>
                <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
            </>
        ),
        badge: (
            <>
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </>
        ),
        check: <path d="M20 6 9 17l-5-5" />,
    };

    const ic = (n: string, c = "") => (
        <svg
            viewBox="0 0 24 24"
            className={`fill-none stroke-[#f97316] stroke-[1.9] [stroke-linecap:round] [stroke-linejoin:round] ${c}`}
        >
            {icons[n]}
        </svg>
    );

    /** Section heading helper (plain render function, not a component). */
    const sectionHead = (kicker: string, title: string, accent: string, sub?: string) => (
        <div className="mb-10 text-center sm:text-left">
            <div className="flex items-center gap-2.5 mb-2.5 justify-center sm:justify-start">
                <span className="w-7 h-[2.5px] bg-[#f97316] rounded-full inline-block" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#111111] uppercase font-mono">{kicker}</span>
            </div>
            <h2 className={`${h2} text-3xl sm:text-4xl lg:text-[42px] text-neutral-950`}>
                {title} <span className="italic text-[#f97316]">{accent}</span>
            </h2>
            {sub && <p className="text-neutral-500 text-xs sm:text-sm max-w-lg mt-2">{sub}</p>}
        </div>
    );

    const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
    const up: Variants = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
    };
    const stagger = (s = 0.1): Variants => ({
        hidden: {},
        show: { transition: { staggerChildren: s } },
    });
    const pop: Variants = {
        hidden: { opacity: 0, scale: 0.94, y: 16 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120, damping: 18, duration: 0.8 },
        },
    };
    const view = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.15 } };

    return (
        <MotionConfig reducedMotion="user">
            <main className={`${inter.className} overflow-x-hidden bg-[#fbf9f5] leading-relaxed text-[#111]`}>
                {/* ================= FULL-BLEED HERO BANNER ================= */}
                <section className="relative w-full h-[90vh] min-h-[640px] max-h-[880px] bg-[#fbf9f5] border-b border-neutral-200/80 overflow-hidden select-none flex flex-col justify-between">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero pixel.png"
                            alt="Pixel Store Contact & Creator Studio Support"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f5]/90 via-[#fbf9f5]/70 to-transparent sm:w-3/4 lg:w-3/5" />
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 flex-1 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.75, ease }}
                            className="max-w-md sm:max-w-lg lg:max-w-xl pb-6 sm:pb-8"
                        >
                            <div className="flex items-center gap-3 mb-3.5">
                                <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.25em] text-[#111111] uppercase font-mono">
                                    CONTACT PIXEL STORE
                                </span>
                                <span className="w-12 sm:w-14 h-[2px] bg-[#f97316] rounded-full inline-block" />
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-neutral-950 tracking-[-0.035em] leading-[1.06] mb-4 sm:mb-5">
                                <span className="block not-italic text-neutral-950">Let&apos;s Build Your</span>
                                <span className="block mt-1 italic font-black">
                                    <span className="inline-block text-neutral-950 mr-2.5">Creative</span>
                                    <span className="relative inline-block text-[#f97316]">
                                        Vision
                                        <svg
                                            className="absolute -bottom-2 left-0 w-[105%] h-3 text-[#f97316]"
                                            viewBox="0 0 180 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            preserveAspectRatio="none"
                                        >
                                            <path d="M2 9C50 2 125 1.5 178 8.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </span>
                            </h1>

                            <p className="text-neutral-600 text-sm sm:text-base max-w-sm sm:max-w-md leading-relaxed font-normal mb-6 sm:mb-8">
                                Whether you are upgrading your cinema rig, ordering authentic iPhones, or requesting bulk studio equipment, our team of creator specialists is here to guide you.
                            </p>

                            <div className="flex flex-wrap items-center gap-3.5 mb-6">
                                <motion.button
                                    onClick={() => smoothScrollTo("contact-form", 1200)}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    whileTap={{ scale: 0.96 }}
                                    transition={{ duration: 0.35, ease }}
                                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#18181b] hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-neutral-900/15 cursor-pointer"
                                >
                                    <span>Send an Inquiry</span>
                                    <motion.span
                                        className="text-sm leading-none inline-block text-[#f97316]"
                                        animate={{ y: [0, 4, 0] }}
                                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
                                    >
                                        ↓
                                    </motion.span>
                                </motion.button>

                                <a
                                    href="https://wa.me/919876543210"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 hover:bg-white text-neutral-900 font-semibold text-xs sm:text-sm border border-neutral-300 shadow-sm backdrop-blur-sm transition-all"
                                >
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Live WhatsApp Desk</span>
                                </a>
                            </div>

                            <div className="flex items-center gap-6 pt-3 text-[11px] sm:text-xs text-neutral-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                    <span className="text-[#f97316] font-bold">✓</span> ~5m Average WhatsApp SLA
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="text-[#f97316] font-bold">✓</span> Direct Verified Engineers
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative z-10 border-t border-neutral-200/80 bg-white/60 backdrop-blur-md py-3.5 px-4 sm:px-8">
                        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-600">
                            <span className="font-semibold text-neutral-900 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isOpen === false ? "bg-neutral-400" : "bg-[#f97316]"}`} />
                                {isOpen === false
                                    ? "Store Status: Closed now. WhatsApp and email replies resume at 10:00 AM IST"
                                    : "Store Status: Open & Dispatching Daily (10:00 AM – 8:00 PM IST)"}
                            </span>
                            <span className="hidden sm:inline text-neutral-500">
                                📍 Flagship Experience Hub: Indiranagar, Bengaluru
                            </span>
                        </div>
                    </div>
                </section>

                {/* ================= NEW: BRAND MARQUEE ================= */}
                <section className="py-10 border-b border-neutral-200/70 bg-white overflow-hidden" aria-label="Brands we stock">
                    <p className="text-center text-xs text-neutral-500 mb-6 font-medium">
                        Authorized stock from the brands creators trust
                    </p>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
                        <motion.div
                            className="flex w-max gap-12 sm:gap-16"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
                        >
                            {[...brands, ...brands].map((b, i) => (
                                <span
                                    key={`${b}-${i}`}
                                    className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-300 hover:text-[#f97316] transition-colors"
                                >
                                    {b}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ================= 4 DIRECT SUPPORT CHANNELS ================= */}
                <section className="py-16 sm:py-20 border-b border-neutral-200/70">
                    <div className={wrap}>
                        {sectionHead(
                            "REACH OUR TEAM",
                            "Dedicated Support",
                            "Channels",
                            "Connect via your preferred platform for personalized equipment assistance and order guidance."
                        )}

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
                            variants={stagger(0.12)}
                            {...view}
                        >
                            {contactChannels.map((c) => (
                                <motion.div
                                    key={c.title}
                                    variants={pop}
                                    whileHover={{ y: -6, transition: { duration: 0.4, ease } }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`rounded-[22px] bg-white border p-6 transition-all flex flex-col justify-between group relative ${c.highlight
                                        ? "border-[#f97316]/60 shadow-[0_10px_30px_rgba(249,115,22,0.1)] ring-1 ring-[#f97316]/20"
                                        : "border-neutral-200/80 shadow-[0_4px_22px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(249,115,22,0.12)] hover:border-[#f97316]/40"
                                        }`}
                                >
                                    {c.highlight && (
                                        <div className="absolute -top-2.5 right-6 bg-[#f97316] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-xs">
                                            Recommended
                                        </div>
                                    )}
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-5">
                                            <motion.div
                                                whileHover={{ rotate: -6, scale: 1.1 }}
                                                transition={{ duration: 0.4, ease }}
                                                className="p-3.5 rounded-2xl bg-[#fff7f4] border border-[#fbe9dc]"
                                            >
                                                {ic(c.icon, "w-6 h-6")}
                                            </motion.div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#f97316] bg-[#fff5ee] px-2.5 py-1 rounded-full border border-[#fcd8c0]">
                                                {c.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-neutral-950 mb-1.5 group-hover:text-[#f97316] transition-colors">
                                            {c.title}
                                        </h3>
                                        <p className="text-xs text-neutral-500 mb-5 leading-relaxed font-normal">{c.description}</p>
                                    </div>

                                    <div className="pt-4 border-t border-neutral-100 space-y-3">
                                        <div className="text-xs font-semibold text-neutral-700 truncate font-mono">{c.details}</div>
                                        <a
                                            href={c.actionHref}
                                            target={c.actionHref.startsWith("http") ? "_blank" : undefined}
                                            rel={c.actionHref.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="w-full inline-flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-[#f97316] transition-colors pt-1"
                                        >
                                            <span>{c.actionText}</span>
                                            <motion.span className="text-sm" whileHover={{ x: 4 }} transition={{ duration: 0.3, ease }}>
                                                →
                                            </motion.span>
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ================= NEW: ANIMATED STATS BAND ================= */}
                <section className="bg-neutral-950 text-white py-14 sm:py-16 relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[240px] rounded-full bg-[#f97316]/15 blur-3xl"
                    />
                    <div ref={statsRef} className={`${wrap} relative grid grid-cols-2 lg:grid-cols-4 gap-8`}>
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                variants={up}
                                {...view}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="text-center lg:text-left"
                            >
                                <div className="text-4xl sm:text-5xl font-black tracking-[-0.04em] text-[#f97316]">
                                    {(s.to * statProgress).toLocaleString("en-IN", {
                                        minimumFractionDigits: s.decimals,
                                        maximumFractionDigits: s.decimals,
                                    })}
                                    {s.suffix}
                                </div>
                                <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-[200px] mx-auto lg:mx-0">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ================= WHY PIXEL STORE / VALUE PILLARS ================= */}
                <section className="py-14 sm:py-16 bg-[#faf8f5] border-b border-neutral-200/70">
                    <div className={wrap}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {perks.map((p, idx) => (
                                <motion.div
                                    key={p.title}
                                    variants={up}
                                    {...view}
                                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                                    className="flex flex-col gap-2.5 p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-[#f97316]/40 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#fff7f4] border border-[#fbe9dc] flex items-center justify-center shrink-0">
                                        {ic(p.icon, "w-5 h-5")}
                                    </div>
                                    <h4 className="text-sm font-bold text-neutral-900">{p.title}</h4>
                                    <p className="text-xs text-neutral-500 leading-relaxed font-normal">{p.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= NEW: HOW IT WORKS ================= */}
                <section className="py-16 sm:py-20 bg-white border-b border-neutral-200/70">
                    <div className={wrap}>
                        {sectionHead("HOW IT WORKS", "From first message to", "doorstep", "Four steps, no chatbot queues.")}
                        <motion.ol className="relative grid grid-cols-1 md:grid-cols-4 gap-6" variants={stagger(0.15)} {...view}>
                            <motion.span
                                aria-hidden="true"
                                className="hidden md:block absolute top-6 left-[6%] right-[6%] h-[2px] bg-[#f97316]/50 origin-left"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, ease }}
                            />
                            {steps.map((s, i) => (
                                <motion.li key={s.t} variants={up} className="relative flex md:flex-col gap-4 md:gap-3">
                                    <span className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-white border-2 border-[#f97316] text-[#f97316] font-black flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-bold text-neutral-900">{s.t}</h3>
                                        <p className="text-xs text-neutral-500 leading-relaxed mt-1">{s.d}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ol>
                    </div>
                </section>

                {/* ================= INQUIRY FORM & EXPERIENCE STUDIO SECTION ================= */}
                <section id="contact-form" className="py-16 sm:py-24 scroll-mt-6">
                    <div className={wrap}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                            {/* Form Column */}
                            <motion.div
                                variants={up}
                                {...view}
                                animate={{
                                    boxShadow: formHighlight
                                        ? "0 0 0 3px rgba(249,115,22,0.35), 0 22px 50px rgba(249,115,22,0.18)"
                                        : "0 12px 40px rgba(0,0,0,0.04)",
                                }}
                                transition={{ duration: 0.9, ease }}
                                className="lg:col-span-7 bg-white rounded-[28px] border border-neutral-200/90 p-7 sm:p-10 relative overflow-hidden"
                            >
                                <div className="flex items-center gap-2.5 mb-2.5">
                                    <span className="w-6 h-[2px] bg-[#f97316] rounded-full inline-block" />
                                    <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#111111] uppercase font-mono">
                                        SEND AN INQUIRY
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-950 tracking-[-0.03em] mb-2.5 leading-tight">
                                    How Can We Assist You?
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500 mb-8 max-w-lg">
                                    Provide details regarding your production setup or gear needs. Our senior technical specialists will contact you with precise pricing, specs, and recommendations.
                                </p>

                                <AnimatePresence mode="wait" initial={false}>
                                    {formSubmitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.94, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.94, y: -10 }}
                                            transition={{ duration: 0.55, ease }}
                                            className="rounded-2xl bg-[#fff7f4] border border-[#f97316]/30 p-10 text-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -30 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.15 }}
                                                className="w-16 h-16 mx-auto rounded-full bg-[#f97316] text-white flex items-center justify-center mb-4 shadow-lg shadow-[#f97316]/25"
                                            >
                                                {ic("check", "w-8 h-8 stroke-white !stroke-[3]")}
                                            </motion.div>
                                            <h3 className="text-2xl font-black text-neutral-950 mb-2">Inquiry Dispatched Successfully!</h3>
                                            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed mb-6">
                                                Thank you for contacting Pixel Store. A senior equipment specialist has received your request and will reach out promptly via phone or email.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => setFormSubmitted(false)}
                                                className="text-xs font-bold text-[#f97316] hover:underline cursor-pointer"
                                            >
                                                ← Send another message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.5, ease }}
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-neutral-900 mb-2">Full Name *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="Karan Mehta"
                                                        className="w-full px-4 py-3 rounded-xl bg-[#faf8f6] border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#f97316] focus:bg-white focus:ring-2 focus:ring-[#f97316]/15 transition-all duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-neutral-900 mb-2">Email Address *</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="karan@creator.com"
                                                        className="w-full px-4 py-3 rounded-xl bg-[#faf8f6] border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#f97316] focus:bg-white focus:ring-2 focus:ring-[#f97316]/15 transition-all duration-300"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-neutral-900 mb-2">
                                                        Contact Number (Phone/WhatsApp) *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="+91 98765 43210"
                                                        className="w-full px-4 py-3 rounded-xl bg-[#faf8f6] border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#f97316] focus:bg-white focus:ring-2 focus:ring-[#f97316]/15 transition-all duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-neutral-900 mb-2">Inquiry Category</label>
                                                    <select
                                                        value={formData.inquiryType}
                                                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl bg-[#faf8f6] border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:border-[#f97316] focus:bg-white focus:ring-2 focus:ring-[#f97316]/15 transition-all duration-300"
                                                    >
                                                        <option>Camera & Optical Equipment</option>
                                                        <option>iPhone Pro Studio Setup</option>
                                                        <option>Audio, Lighting & Rigs</option>
                                                        <option>Order Tracking & Dispatch</option>
                                                        <option>Warranty & Technical Service</option>
                                                        <option>Corporate / Studio Purchase</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-neutral-900 mb-2">Message or Gear Details *</label>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="Provide details about the camera body, lenses, accessories, or your current order question..."
                                                    className="w-full px-4 py-3.5 rounded-xl bg-[#faf8f6] border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#f97316] focus:bg-white focus:ring-2 focus:ring-[#f97316]/15 transition-all duration-300 resize-none"
                                                />
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    whileHover={{ y: -2, scale: 1.02 }}
                                                    whileTap={{ scale: 0.96 }}
                                                    transition={{ duration: 0.35, ease }}
                                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#18181b] hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
                                                >
                                                    <span>{isSubmitting ? "Dispatching..." : "Submit Inquiry"}</span>
                                                    <span className="text-sm">→</span>
                                                </motion.button>

                                                <span className="text-[11px] text-neutral-500">🔒 Verified confidential. No marketing spam.</span>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Experience Studio & Commitments Column */}
                            <motion.div variants={stagger(0.14)} {...view} className="lg:col-span-5 space-y-6">
                                <motion.div
                                    variants={up}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.4, ease }}
                                    className="rounded-[28px] bg-neutral-950 text-white p-7 sm:p-9 shadow-xl relative overflow-hidden border border-neutral-800"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="w-5 h-[2px] bg-[#f97316] rounded-full inline-block" />
                                            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#f97316] font-mono">
                                                FLAGSHIP HUB
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2.5 tracking-tight">Pixel Experience Studio</h3>
                                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                                            Test cinema cameras, evaluate prime lenses, preview iPhone recording rigs, and collect online orders in person.
                                        </p>

                                        <div className="space-y-3.5 pt-3 border-t border-neutral-800/80 text-xs sm:text-[13px] text-neutral-300">
                                            <div className="flex items-start gap-3">
                                                <span className="text-[#f97316] text-base shrink-0">📍</span>
                                                <span>Level 3, Creator Hub, 100ft Road, Indiranagar, Bengaluru, KA 560038</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#f97316] text-base shrink-0">⏰</span>
                                                <span>Mon – Sat: 10:00 AM – 8:00 PM IST (Sundays by appt)</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#f97316] text-base shrink-0">🛡️</span>
                                                <span>Direct authorized warranty validation & pick-up</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#f97316] text-base shrink-0">⚡</span>
                                                <span>Studio trial bay with calibrated LED lighting</span>
                                            </div>
                                        </div>

                                        <div className="mt-7 pt-5 border-t border-neutral-800/80 flex flex-wrap items-center gap-3">
                                            <motion.a
                                                href="https://maps.google.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -2, scale: 1.03 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.35, ease }}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-100 transition-all"
                                            >
                                                <span>Open in Google Maps</span>
                                                <span>↗</span>
                                            </motion.a>

                                            <a
                                                href="tel:18001237493"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white font-semibold text-xs border border-neutral-800 transition-all"
                                            >
                                                <span>Call Studio Desk</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-radial from-[#f97316]/30 via-transparent to-transparent blur-2xl"
                                    />
                                </motion.div>

                                <motion.div variants={up} className="rounded-[24px] bg-[#fffaf5] border border-[#fbe9dc] p-6 shadow-xs">
                                    <h4 className="text-sm font-black text-neutral-950 mb-3 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                                        Pixel Store Customer Commitments
                                    </h4>
                                    <ul className="space-y-2.5 text-xs text-neutral-600">
                                        {[
                                            "Real filmmakers & equipment technicians answer every inquiry",
                                            "No automated chatbot queues — direct human communication",
                                            "Comprehensive warranty guidance & repair coordination",
                                            "GST input credit invoicing with registered business PAN/GSTIN",
                                        ].map((item, i) => (
                                            <motion.li
                                                key={item}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                                                className="flex items-center gap-2.5"
                                            >
                                                <span className="text-[#f97316] font-bold">✓</span>
                                                <span>{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ================= NEW: TESTIMONIALS ================= */}
                <section className="py-16 sm:py-20 bg-white border-t border-neutral-200/60">
                    <div className={wrap}>
                        {sectionHead("CUSTOMER STORIES", "Creators who", "shop with us")}
                        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" variants={stagger(0.12)} {...view}>
                            {reviews.map((r) => (
                                <motion.figure
                                    key={r.n}
                                    variants={up}
                                    whileHover={{ y: -4, transition: { duration: 0.35, ease } }}
                                    className="rounded-2xl bg-[#faf8f6] border border-neutral-200/80 p-6 hover:border-[#f97316]/40 transition-colors"
                                >
                                    <div className="flex gap-0.5 text-[#f97316] text-sm mb-3" aria-label="5 out of 5 stars">
                                        ★★★★★
                                    </div>
                                    <blockquote className="text-sm text-neutral-700 leading-relaxed">“{r.q}”</blockquote>
                                    <figcaption className="mt-4 flex items-center gap-3">
                                        <span className="w-9 h-9 rounded-full bg-[#f97316] text-white text-xs font-bold flex items-center justify-center">
                                            {r.n.split(" ").map((w) => w[0]).join("")}
                                        </span>
                                        <span>
                                            <span className="block text-xs font-bold text-neutral-900">{r.n}</span>
                                            <span className="block text-[11px] text-neutral-500">{r.r}</span>
                                        </span>
                                    </figcaption>
                                </motion.figure>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ================= NEW: LIVE STORE HOURS + RESPONSE TIMES ================= */}
                <section className="py-16 sm:py-20 bg-[#faf8f5] border-t border-neutral-200/60">
                    <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                        <motion.div variants={up} {...view} className="rounded-[24px] bg-white border border-neutral-200/80 p-7">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-black text-neutral-950">Studio hours</h3>
                                {isOpen !== null && (
                                    <span
                                        className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full border ${isOpen
                                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                            : "text-neutral-600 bg-neutral-100 border-neutral-200"
                                            }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"}`} />
                                        {isOpen ? "Open now" : "Closed now"}
                                    </span>
                                )}
                            </div>
                            <dl className="divide-y divide-neutral-100">
                                {hours.map((x) => (
                                    <div key={x.d} className="flex justify-between py-3 text-sm">
                                        <dt className="text-neutral-600">{x.d}</dt>
                                        <dd className="font-semibold text-neutral-900">{x.h}</dd>
                                    </div>
                                ))}
                            </dl>
                            <p className="text-[11px] text-neutral-500 mt-4">All times in IST. Status updates every minute.</p>
                        </motion.div>

                        <motion.div variants={up} {...view} className="rounded-[24px] bg-white border border-neutral-200/80 p-7">
                            <h3 className="text-lg font-black text-neutral-950 mb-5">Typical response time</h3>
                            <div className="space-y-4">
                                {responseTimes.map((r, i) => (
                                    <div key={r.c}>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="font-bold text-neutral-900">{r.c}</span>
                                            <span className="text-neutral-500">{r.t}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full bg-[#f97316]"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${r.w}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.1, ease, delay: i * 0.12 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ================= FAQ SECTION ================= */}
                <section className="py-16 sm:py-20 border-t border-neutral-200/60 bg-white">
                    <div className={wrap}>
                        {sectionHead(
                            "ANSWERS & HELP",
                            "Frequently Asked",
                            "Questions",
                            "Clear answers to common questions about buying and servicing gear at Pixel Store."
                        )}

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start"
                            variants={stagger(0.1)}
                            {...view}
                        >
                            {faqs.map((faq, idx) => {
                                const open = activeFaq === idx;
                                return (
                                    <motion.div
                                        key={faq.q}
                                        variants={up}
                                        onClick={() => setActiveFaq(open ? null : idx)}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.99 }}
                                        transition={{ duration: 0.35, ease }}
                                        className={`rounded-2xl bg-[#faf8f6] border p-5 sm:p-6 shadow-xs cursor-pointer select-none transition-all duration-300 ${open
                                            ? "border-[#f97316]/60 shadow-[0_10px_30px_rgba(249,115,22,0.1)] bg-[#fffaf7]"
                                            : "border-neutral-200/80 hover:border-[#f97316]/40"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">{faq.q}</h3>
                                            <motion.span
                                                animate={{
                                                    rotate: open ? 135 : 0,
                                                    backgroundColor: open ? "#f97316" : "rgba(229,229,229,0.7)",
                                                    color: open ? "#ffffff" : "#404040",
                                                }}
                                                transition={{ duration: 0.35, ease }}
                                                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                                            >
                                                +
                                            </motion.span>
                                        </div>
                                        <AnimatePresence initial={false}>
                                            {open && (
                                                <motion.div
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.45, ease }}
                                                    className="overflow-hidden"
                                                >
                                                    <motion.p
                                                        initial={{ y: -6, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -6, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease, delay: 0.05 }}
                                                        className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-3 pt-3 border-t border-neutral-200/60"
                                                    >
                                                        {faq.a}
                                                    </motion.p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* ================= NEW: FINAL CTA BANNER ================= */}
                <section className="py-16 sm:py-20 bg-[#fbf9f5] border-t border-neutral-200/60">
                    <div className={wrap}>
                        <motion.div
                            variants={up}
                            {...view}
                            className="relative overflow-hidden rounded-[32px] bg-neutral-950 px-6 py-12 sm:px-14 sm:py-16 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8"
                        >
                            <motion.div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#f97316]/30 blur-3xl"
                                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="relative max-w-xl">
                                <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.035em] text-white leading-tight">
                                    Not sure what to buy? <span className="italic text-[#f97316]">Ask a filmmaker.</span>
                                </h2>
                                <p className="mt-3 text-sm text-neutral-400">
                                    Tell us what you shoot and your budget. We reply with options that fit, not the priciest ones.
                                </p>
                            </div>
                            <div className="relative flex flex-wrap justify-center gap-3">
                                <motion.a
                                    href="https://wa.me/919876543210"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -2, scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="px-7 py-3.5 rounded-full bg-[#f97316] text-white font-bold text-sm"
                                >
                                    Chat on WhatsApp
                                </motion.a>
                                <motion.a
                                    href="tel:18001237493"
                                    whileHover={{ y: -2, scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm"
                                >
                                    Call 1800-123-7493
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </MotionConfig>
    );
}