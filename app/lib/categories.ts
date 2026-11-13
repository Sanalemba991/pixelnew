import { Category } from "./types";

export const categories: Category[] = [
  {
    id: "cameras",
    name: "Cameras",
    sub: "DSLR • Mirrorless • Cinema",
    image: "/cat/camera.png",
    hasSubcategories: true,
    href: "/collection?category=cameras",
    badge: "10+ Products",
  },
  {
    id: "iphones",
    name: "iPhones",
    sub: "Latest • Pro • Pro Max",
    image: "/cat/iphone.png",
    hasSubcategories: true,
    href: "/collection?category=iphones",
    badge: "20+ Products",
  },
  {
    id: "lenses",
    name: "Lenses",
    sub: "Prime • Zoom • Specialty",
    image: "/cat/lens.png",
    hasSubcategories: true,
    href: "/collection?category=lenses",
    badge: "80+ Products",
  },
  {
    id: "accessories",
    name: "Accessories",
    sub: "Gimbals • Lights • Audio • Power",
    image: "/cat/lighting.png",
    hasSubcategories: true,
    href: "/collection?category=accessories",
    badge: "50+ Products",
  },
];

