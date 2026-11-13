export interface Subcategory {
  id: string;
  categoryId: string; // Link back to parent category
  name: string;
  image: string;
  description?: string;
  productCount?: number;
}

export interface Category {
  id: string;
  name: string;
  sub: string;
  image: string;
  hasSubcategories: boolean;
  href?: string;
  badge?: string;
}

export interface CategoryWithSub extends Category {
  subcategories?: Subcategory[];
}

export interface SpecRow {
  category?: string;
  label: string;
  value: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ModelRow {
  model: string;
  storage?: string;
  color?: string;
  price?: string;
  inStock?: boolean;
}

export interface FeatureHighlight {
  title: string;
  subtitle: string;
  image?: string;
}

export interface IconItem {
  label: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategoryId?: string;
  image: string;
  heroBanner?: string;
  featureCards?: FeatureHighlight[];
  productImage?: string;
  overheadImage?: string;
  boxContents?: IconItem[];
  compatibleAccessories?: IconItem[];
  price?: string;
  originalPrice?: string;
  description: string;
  tag?: string; // "New", "Bestseller", etc.
  rating?: number;
  reviewsCount?: string;
  features?: string[];
  specs?: SpecRow[];
  taglineSpecs?: string[];
  faqs?: FAQ[];
  models?: ModelRow[];
  gallery?: string[];
}

