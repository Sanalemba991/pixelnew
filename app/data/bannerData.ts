export interface SlideData {
  id: string | number;
  tag: string;
  titlePrimary: string;
  titleHighlight: string;
  description: string;
  shopHref: string;
  exploreHref: string;
  imageSrc: string;
  imageAlt: string;
}

export const defaultBannerSlides: SlideData[] = [
  {
    id: 1,
    tag: "THE CREATOR'S STORE",
    titlePrimary: "Cameras & iPhones for",
    titleHighlight: "Creators",
    description:
      "Premium gear for photography, content creation and everyday moments.",
    shopHref: "/shop",
    exploreHref: "/products",
    // Premium Sony Alpha camera + phone setup on dark moody background (Unsplash high quality)
    imageSrc:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1920&auto=format&fit=crop",
    imageAlt: "Professional camera with lens setup",
  },
  {
    id: 2,
    tag: "PRO PERFORMANCE",
    titlePrimary: "Cinematic Quality in",
    titleHighlight: "Every Shot",
    description:
      "Engineered with ultra-fast autofocus, high dynamic range, and 4K ProRes capabilities.",
    shopHref: "/cameras",
    exploreHref: "/cameras/sony",
    imageSrc:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1920&auto=format&fit=crop",
    imageAlt: "Sony DSLR cinematic camera equipment",
  },
  {
    id: 3,
    tag: "NEXT-GEN CREATION",
    titlePrimary: "The Ultimate Studio in",
    titleHighlight: "Your Pocket",
    description:
      "Experience titanium strength, incredible zoom, and next-level mobile filmmaking.",
    shopHref: "/iphone",
    exploreHref: "/accessories",
    imageSrc:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1920&auto=format&fit=crop",
    imageAlt: "iPhone Pro titanium dark camera design",
  },
];

