export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  rating: number;
  reviewsCount: string;
  tag?: string; // "New", "Bestseller", etc.
  category: "Cameras" | "iPhone" | "Accessories";
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

export const featuredProducts: Product[] = [
  {
    id: "iphone-18-pro",
    name: "iPhone 18 Pro",
    subtitle: "256GB - Desert Titanium",
    price: "₹1,49,900",
    rating: 4.8,
    reviewsCount: "1.2K",
    tag: "New",
    category: "iPhone",
    imageSrc:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop",
    imageAlt: "iPhone Desert Titanium",
    href: "/products/iphone-18-pro",
  },
  {
    id: "sony-a7-iv",
    name: "Sony α7 IV",
    subtitle: "Full-Frame Mirrorless",
    price: "₹2,39,990",
    rating: 4.9,
    reviewsCount: "856",
    tag: "Bestseller",
    category: "Cameras",
    imageSrc:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Sony a7 IV Mirrorless Camera",
    href: "/products/sony-a7-iv",
  },
  {
    id: "canon-eos-r6-mark-ii",
    name: "Canon EOS R6 Mark II",
    subtitle: "Mirrorless Camera",
    price: "₹2,54,995",
    rating: 4.8,
    reviewsCount: "642",
    category: "Cameras",
    imageSrc:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Canon EOS R6 Mark II Mirrorless Camera",
    href: "/products/canon-eos-r6-mark-ii",
  },
  {
    id: "fujifilm-x-t5",
    name: "Fujifilm X-T5",
    subtitle: "APS-C Mirrorless",
    price: "₹1,67,999",
    rating: 4.7,
    reviewsCount: "391",
    category: "Cameras",
    imageSrc:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Fujifilm X-T5 Camera",
    href: "/products/fujifilm-x-t5",
  },
];

