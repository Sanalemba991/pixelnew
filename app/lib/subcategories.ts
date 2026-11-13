import { Subcategory } from "./types";

export const subcategories: Subcategory[] = [
  // Cameras
  {
    id: "mirrorless-cameras",
    categoryId: "cameras",
    name: "Mirrorless Cameras",
    image: "/cat/camera.png",
    description: "Full-frame & APS-C mirrorless systems for creators.",
    productCount: 15,
  },
  {
    id: "cinema-cameras",
    categoryId: "cameras",
    name: "Cinema Cameras",
    image: "/cat/camera.png",
    description: "High dynamic range cinematic film production bodies.",
    productCount: 6,
  },

  // iPhones
  {
    id: "iphone-pro-max",
    categoryId: "iphones",
    name: "iPhone Pro & Pro Max",
    image: "/cat/iphone.png",
    description: "ProRes video, Apple Intelligence and Titanium design.",
    productCount: 12,
  },
  {
    id: "iphone-standard",
    categoryId: "iphones",
    name: "iPhone Standard & Plus",
    image: "/cat/iphone.png",
    description: "Everyday powerhouse with dynamic island and dual cameras.",
    productCount: 8,
  },

  // Lenses
  {
    id: "prime-lenses",
    categoryId: "lenses",
    name: "Prime Lenses",
    image: "/cat/lens.png",
    description: "Fast apertures, dreamy bokeh and razor-sharp optics.",
    productCount: 35,
  },
  {
    id: "zoom-lenses",
    categoryId: "lenses",
    name: "Zoom Lenses",
    image: "/cat/lens.png",
    description: "Versatile focal lengths for sports, wild & run-and-gun.",
    productCount: 45,
  },

  // Accessories
  {
    id: "gimbals",
    categoryId: "accessories",
    name: "Gimbals & Stabilizers",
    image: "/cat/gimbal.png",
    description: "Motorized 3-axis gimbals and rig stabilization systems.",
    productCount: 20,
  },
  {
    id: "lighting",
    categoryId: "accessories",
    name: "Studio & On-Camera Lighting",
    image: "/cat/lighting.png",
    description: "COB LED lights, softboxes and RGB creator panels.",
    productCount: 30,
  },
  {
    id: "magsafe-power",
    categoryId: "accessories",
    name: "MagSafe & Power",
    image: "/cat/lighting.png",
    description: "Fast chargers, batteries, docks and external rigs.",
    productCount: 15,
  },
];

