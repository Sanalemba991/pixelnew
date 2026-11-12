export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  currency: string;
  badge?: string;
  image: string;
  gallery?: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
}

export interface Category {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
  tag?: string;
  iconName?: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "cameras",
    name: "Cameras",
    subtitle: "Monochrome & Full-Frame Optical Bodies",
    description: "Engineered for pure tactile handling, unmatched dynamic range, and precision black-and-white tonal graduation.",
    image: "/prod-camera.jpg",
    itemCount: 4,
    tag: "Flagship Bodies",
    iconName: "camera",
  },
  {
    slug: "lenses",
    name: "Lenses & Optics",
    subtitle: "Prime Focal Glass & Anamorphic Lenses",
    description: "Crafted with hand-polished elements, zero chromatic aberration, and buttery smooth stepless aperture rings.",
    image: "/prod-lens.jpg",
    itemCount: 3,
    tag: "Cinema Glass",
    iconName: "lens",
  },
  {
    slug: "iphone-accessories",
    name: "iPhone & Accessories",
    subtitle: "MagSafe Packs, Grips & Modular Power",
    description: "Fast-discharge high-capacity external powerbanks, cages and wireless studio docks built with aerospace alloy shells.",
    image: "/prod-iphone.jpg",
    itemCount: 3,
    tag: "MagSafe & Power",
    iconName: "iphone",
  },
  {
    slug: "roast-blends",
    name: "Studio Roast Blends",
    subtitle: "Specialty Roasted Micro-Lots for Creators",
    description: "Small-batch specialty beans roasted exclusively to fuel long darkroom sessions and creative workflow.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    itemCount: 3,
    tag: "Creator Fuel",
    iconName: "coffee",
  },
];

export const PRODUCTS: Product[] = [
  // --- CAMERAS ---
  {
    id: "cam-mono-x",
    slug: "pixel-mono-x",
    name: "Pixel Mono-X Flagship",
    categorySlug: "cameras",
    categoryName: "Cameras",
    tagline: "48MP True Monochrome Full-Frame Sensor",
    description:
      "Stripped of color filter arrays, the Pixel Mono-X captures pure luminous photon data directly onto its customized sensor. Uncompromised micro-contrast, zero interpolation, and legendary shadow gradation.",
    price: 3890,
    originalPrice: 4200,
    discountBadge: "-8%",
    currency: "USD",
    badge: "NEW",
    image: "/prod-camera.jpg",
    gallery: [
      "/prod-camera.jpg",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
    ],
    specs: [
      { label: "Sensor", value: "48.2MP Monochromatic BSI CMOS" },
      { label: "Mount", value: "Pixel Studio M-Mount" },
      { label: "ISO Sensitivity", value: "64 - 102,400 Native" },
      { label: "Shutter", value: "Mechanical Leaf up to 1/4000s" },
      { label: "Chassis", value: "Milled Magnesium & Matte Ceramic" },
      { label: "Weight", value: "540g" },
    ],
    inStock: true,
  },
  {
    id: "cam-vision-street",
    slug: "vision-street-compact",
    name: "Vision Street Compact",
    categorySlug: "cameras",
    categoryName: "Cameras",
    tagline: "Fixed 35mm f/1.8 Street Documentary Camera",
    description:
      "Ultra-quiet leaf shutter and whisper-quiet zone focusing made for candid street and travel storytelling. Compact enough for everyday carry with a razor-sharp integrated optic.",
    price: 1950,
    originalPrice: 2200,
    discountBadge: "-11%",
    currency: "USD",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
      "/prod-camera.jpg",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    ],
    specs: [
      { label: "Sensor", value: "26MP APS-C High Dynamic Sensor" },
      { label: "Lens", value: "Integrated 35mm f/1.8 Aspherical" },
      { label: "Viewfinder", value: "Hybrid Optical & 3.68M-dot OLED" },
      { label: "Focusing", value: "Zone Distance Scale & Eye-AF" },
      { label: "Weight", value: "390g" },
    ],
    inStock: true,
  },
  {
    id: "cam-studio-r",
    slug: "pixel-studio-r",
    name: "Pixel Studio-R Medium Format",
    categorySlug: "cameras",
    categoryName: "Cameras",
    tagline: "100MP Medium Format Computational Body",
    description:
      "Unparalleled resolution for gallery exhibitions and luxury commercial campaigns. Featuring 16-bit color depth processing and 5-axis sensor-shift stabilization.",
    price: 5990,
    currency: "USD",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
      "/prod-camera.jpg",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    ],
    specs: [
      { label: "Sensor", value: "100MP 44x33mm Medium Format" },
      { label: "Dynamic Range", value: "15.4 Stops" },
      { label: "Stabilization", value: "5-axis In-Body IBIS (7.0 stops)" },
      { label: "Display", value: "3.2-inch Tilt Touchscreen" },
      { label: "Weight", value: "780g" },
    ],
    inStock: true,
  },
  {
    id: "cam-rangefinder",
    slug: "analog-m-digital",
    name: "Analog-M Digital Rangefinder",
    categorySlug: "cameras",
    categoryName: "Cameras",
    tagline: "True Mechanical Split-Image Rangefinder",
    description:
      "Pure photography stripped of menus and clutter. Coupled mechanical rangefinder focusing with a tactile analog dial cluster and instantaneous response.",
    price: 4450,
    currency: "USD",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop",
      "/prod-camera.jpg",
    ],
    specs: [
      { label: "Sensor", value: "36MP Full-Frame Monochromatic" },
      { label: "Focus", value: "Mechanical Split-Image Rangefinder" },
      { label: "Body", value: "Brass Top & Base Plate with Black Paint" },
      { label: "Battery Life", value: "750 frames per charge" },
    ],
    inStock: false,
  },

  // --- LENSES ---
  {
    id: "lens-50-f14",
    slug: "series-mono-50mm-f14",
    name: "Series Mono 50mm f/1.4",
    categorySlug: "lenses",
    categoryName: "Lenses & Optics",
    tagline: "The Reference Normal Prime for Cinematic Depth",
    description:
      "Formulated with rare earth glass elements to yield creamy bokeh and zero field curvature. Features an aperture ring with tactile click-stops that de-clicks for video with a flip of a toggle.",
    price: 1190,
    originalPrice: 1350,
    discountBadge: "-12%",
    currency: "USD",
    badge: "NEW",
    image: "/prod-lens.jpg",
    gallery: [
      "/prod-lens.jpg",
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800&auto=format&fit=crop",
    ],
    specs: [
      { label: "Focal Length", value: "50mm" },
      { label: "Max Aperture", value: "f/1.4 (min f/16)" },
      { label: "Aperture Blades", value: "11 Curved Blades" },
      { label: "Filter Thread", value: "52mm" },
      { label: "Mount", value: "M-Mount / E-Mount Available" },
    ],
    inStock: true,
  },
  {
    id: "lens-35-f2",
    slug: "artisan-35mm-f2-pancake",
    name: "Artisan 35mm f/2.0 Ultra-Slim",
    categorySlug: "lenses",
    categoryName: "Lenses & Optics",
    tagline: "Pocketable Pancake Prime for Street Creators",
    description:
      "Measuring only 22mm deep, this optic turns any camera into a low-profile street machine. Razor-sharp across all frame corners right from wide open.",
    price: 780,
    currency: "USD",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800&auto=format&fit=crop",
      "/prod-lens.jpg",
    ],
    specs: [
      { label: "Focal Length", value: "35mm" },
      { label: "Max Aperture", value: "f/2.0" },
      { label: "Thickness", value: "22mm ultra-slim" },
      { label: "Weight", value: "145g" },
    ],
    inStock: true,
  },
  {
    id: "lens-85-f12",
    slug: "portrait-85mm-f12-master",
    name: "Master Portrait 85mm f/1.2",
    categorySlug: "lenses",
    categoryName: "Lenses & Optics",
    tagline: "Dreamlike Subject Separation and Rendering",
    description:
      "A monumental portrait optic engineered for extreme low-light clarity and ultra-shallow depth of field. Hand-assembled in small batches.",
    price: 1850,
    currency: "USD",
    badge: "Master Serie",
    image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=800&auto=format&fit=crop",
      "/prod-lens.jpg",
    ],
    specs: [
      { label: "Focal Length", value: "85mm" },
      { label: "Max Aperture", value: "f/1.2" },
      { label: "Optic Groups", value: "11 Elements in 9 Groups" },
      { label: "Filter Size", value: "77mm" },
    ],
    inStock: true,
  },

  // --- IPHONE ACCESSORIES & POWER ---
  {
    id: "pwr-supacharger",
    slug: "supacharger-camera-powerbank",
    name: "SupaCharger Camera Wireless Bank",
    categorySlug: "iphone-accessories",
    categoryName: "iPhone & Accessories",
    tagline: "Camera-Stylized MagSafe 15,000mAh Battery Dock",
    description:
      "Crafted with genuine camera dial aesthetics and tactile mechanical click switches. Delivers 65W GaN fast charging via USB-C PD and 15W Qi2 magnetic wireless fast charging.",
    price: 189,
    originalPrice: 220,
    discountBadge: "-14%",
    currency: "USD",
    badge: "NEW",
    image: "/prod-iphone.jpg",
    gallery: [
      "/prod-iphone.jpg",
      "/prod-headphones.jpg",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    ],
    specs: [
      { label: "Capacity", value: "15,000mAh / 55.5Wh" },
      { label: "Max Output", value: "65W USB-C Power Delivery" },
      { label: "Wireless Output", value: "15W Qi2 / MagSafe Certified" },
      { label: "Enclosure", value: "CNC Milled Aluminum & Vegan Leather" },
      { label: "Weight", value: "295g" },
    ],
    inStock: true,
  },
  {
    id: "pwr-dock-duo",
    slug: "pixel-dock-duo-station",
    name: "Pixel Studio Dock Duo",
    categorySlug: "iphone-accessories",
    categoryName: "iPhone & Accessories",
    tagline: "Dual Battery Rapid Charger & Backup Hub",
    description:
      "Simultaneously recharge two camera battery packs or magnetic iPhone wireless docks in under 45 minutes with precision OLED percentage status gauges.",
    price: 145,
    currency: "USD",
    badge: "NEW",
    image: "/prod-headphones.jpg",
    gallery: ["/prod-headphones.jpg", "/prod-iphone.jpg"],
    specs: [
      { label: "Slots", value: "Dual Quick-Swap Modular Plates" },
      { label: "Input", value: "100W USB-C PD" },
      { label: "Screen", value: "High-contrast OLED Health Diagnostics" },
    ],
    inStock: true,
  },
  {
    id: "acc-strap-monochrome",
    slug: "artisan-woven-strap-noir",
    name: "Artisan Braided Quick-Strap Noir",
    categorySlug: "iphone-accessories",
    categoryName: "iPhone & Accessories",
    tagline: "High-Tensile Climbing Cord & Italian Leather Ends",
    description:
      "Engineered to support heavy camera rigs and iPhone pro rigs with ease and zero neck fatigue. Precision quick-release anchor connectors tested up to 80kg of load.",
    price: 85,
    originalPrice: 105,
    discountBadge: "-19%",
    currency: "USD",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      "/prod-iphone.jpg",
    ],
    specs: [
      { label: "Material", value: "Dyneema reinforced braided cord" },
      { label: "Length", value: "105cm fixed length" },
      { label: "Connectors", value: "Quick-Lock Anchor Pucks (x4 included)" },
    ],
    inStock: true,
  },

  // --- STUDIO ROAST BLENDS ---
  {
    id: "roast-precision-01",
    slug: "signature-blend-precision-01",
    name: "Precision 01 // Washed",
    categorySlug: "roast-blends",
    categoryName: "Studio Roast Blends",
    tagline: "Washed Process • Intensity 4/5 • Bergamot & Dark Cocoa",
    description:
      "Grown at 2,100 meters above sea level in Yirgacheffe, roasted to highlight crystal clarity, bright citric acidity, and a lingering cocoa finish.",
    price: 28,
    currency: "USD",
    badge: "Single Origin",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"],
    specs: [
      { label: "Origin", value: "Yirgacheffe, Ethiopia" },
      { label: "Process", value: "Washed Process" },
      { label: "Elevation", value: "2,100m" },
      { label: "Notes", value: "Bergamot, Blackcurrant, Dark Cocoa" },
      { label: "Net Weight", value: "250g / 8.8oz Whole Bean" },
    ],
    inStock: true,
  },
  {
    id: "roast-monolith-02",
    slug: "signature-blend-monolith-02",
    name: "Monolith 02 // Natural",
    categorySlug: "roast-blends",
    categoryName: "Studio Roast Blends",
    tagline: "Natural Process • Intensity 5/5 • Black Cherry & Molasses",
    description:
      "Deep, heavy, and visceral. Sun-dried in cherry for 28 days to create thick body, syrupy mouthfeel, and bold dark fruit sweetness.",
    price: 32,
    currency: "USD",
    badge: "Limited Lot",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop"],
    specs: [
      { label: "Origin", value: "Huila, Colombia" },
      { label: "Process", value: "Extended Anaerobic Natural" },
      { label: "Elevation", value: "1,850m" },
      { label: "Notes", value: "Black Cherry, Molasses, Pipe Tobacco" },
      { label: "Net Weight", value: "250g / 8.8oz Whole Bean" },
    ],
    inStock: true,
  },
  {
    id: "roast-aura-03",
    slug: "signature-blend-aura-noir-03",
    name: "Aura Noir 03 // Honey",
    categorySlug: "roast-blends",
    categoryName: "Studio Roast Blends",
    tagline: "Honey Process • Intensity 3/5 • Jasmine & White Peach",
    description:
      "An aromatic powerhouse with delicate floral top notes and candied sweetness. Roasted light-medium to preserve complex floral volatiles.",
    price: 30,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop"],
    specs: [
      { label: "Origin", value: "Tarrazu, Costa Rica" },
      { label: "Process", value: "Yellow Honey" },
      { label: "Elevation", value: "1,900m" },
      { label: "Notes", value: "Jasmine Blossom, White Peach, Honeycomb" },
      { label: "Net Weight", value: "250g / 8.8oz Whole Bean" },
    ],
    inStock: true,
  },
];

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const normalized = slug.toLowerCase();
  // Support aliases so URLs like /power-accessories, /iphone, etc work seamlessly
  return CATEGORIES.find(
    (cat) =>
      cat.slug.toLowerCase() === normalized ||
      (normalized === "power-accessories" && cat.slug === "iphone-accessories") ||
      (normalized === "iphone" && cat.slug === "iphone-accessories") ||
      (normalized === "accessories" && cat.slug === "iphone-accessories")
  );
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const targetCategory = getCategoryBySlug(categorySlug);
  if (!targetCategory) return [];
  return PRODUCTS.filter((p) => p.categorySlug.toLowerCase() === targetCategory.slug.toLowerCase());
}

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase();
  return PRODUCTS.find((p) => p.slug.toLowerCase() === normalized);
}
