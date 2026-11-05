export interface CategoryItem {
  id: string | number;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export const categoriesData: CategoryItem[] = [
  {
    id: "cameras",
    title: "Cameras",
    href: "/cameras",
    imageSrc:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Sony Mirrorless & Cinema Cameras",
  },
  {
    id: "iphone",
    title: "iPhone",
    href: "/iphone",
    imageSrc:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Apple iPhone Pro Titanium",
  },
  {
    id: "lenses",
    title: "Lenses",
    href: "/lenses",
    imageSrc:
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Professional Camera Prime & Zoom Lenses",
  },
  {
    id: "lighting",
    title: "Lighting",
    href: "/lighting",
    imageSrc:
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Studio LED Panel and Video Lighting",
  },
  {
    id: "tripods",
    title: "Tripods",
    href: "/tripods",
    imageSrc:
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Carbon Fiber Pro Tripods & Gimbals",
  },
  {
    id: "bags-cases",
    title: "Bags & Cases",
    href: "/bags-cases",
    imageSrc:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Waterproof Camera Backpacks & Hard Cases",
  },
];

