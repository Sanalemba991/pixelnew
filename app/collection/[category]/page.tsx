import React from "react";
import { notFound } from "next/navigation";
import { getCategoryById, getSubcategoriesByCategoryId, categories } from "@/app/lib/data";
import Cat from "./Cat";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} | Pixel Store`,
    description: category.sub,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);

  if (!category) {
    notFound();
  }

  const subcategories = getSubcategoriesByCategoryId(category.id);
  const otherCategories = categories.filter((c) => c.id !== category.id);

  return (
    <Cat
      category={category}
      subcategories={subcategories}
      otherCategories={otherCategories}
    />
  );
}
