import { categories } from "./categories";
import { subcategories } from "./subcategories";
import { products } from "./products";
import { Category, CategoryWithSub, Subcategory, Product } from "./types";

// Combine categories with their respective subcategories
export const categoriesWithSub: CategoryWithSub[] = categories.map((cat) => ({
  ...cat,
  subcategories: subcategories.filter((sub) => sub.categoryId === cat.id),
}));

// Helpers to query data
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

export function getSubcategoriesByCategoryId(categoryId: string): Subcategory[] {
  return subcategories.filter(
    (s) => s.categoryId.toLowerCase() === categoryId.toLowerCase()
  );
}

export function getProductsByCategoryId(categoryId: string): Product[] {
  return products.filter(
    (p) => p.categoryId.toLowerCase() === categoryId.toLowerCase()
  );
}

export function getProductsBySubcategoryId(subcategoryId: string): Product[] {
  return products.filter(
    (p) => p.subcategoryId?.toLowerCase() === subcategoryId.toLowerCase()
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export { categories, subcategories, products };

