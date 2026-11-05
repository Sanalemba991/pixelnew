export interface BrandItem {
  id: string;
  name: string;
  href: string;
  logoType?: "apple" | "sony" | "canon" | "fujifilm" | "nikon" | "sigma" | "dji";
}

export const topBrandsData: BrandItem[] = [
  { id: "apple", name: "Apple", href: "/brands/apple", logoType: "apple" },
  { id: "sony", name: "SONY", href: "/brands/sony", logoType: "sony" },
  { id: "canon", name: "Canon", href: "/brands/canon", logoType: "canon" },
  { id: "fujifilm", name: "FUJIFILM", href: "/brands/fujifilm", logoType: "fujifilm" },
  { id: "nikon", name: "Nikon", href: "/brands/nikon", logoType: "nikon" },
  { id: "sigma", name: "SIGMA", href: "/brands/sigma", logoType: "sigma" },
  { id: "dji", name: "DJI", href: "/brands/dji", logoType: "dji" },
];

