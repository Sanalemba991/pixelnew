import React from "react";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory, CATEGORIES } from "@/app/data/catalog";
import CategoryPro from "./CategoryPro";

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <CategoryPro
      category={category}
      products={products}
      categories={CATEGORIES}
    />
  );
}
