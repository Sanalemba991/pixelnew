import React from "react";
import { notFound } from "next/navigation";
import {
  getCategoryById,
  getSubcategoriesByCategoryId,
  getProductsBySubcategoryId,
  subcategories,
} from "@/app/lib/data";
import Prodt from "./Prodt";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export function generateStaticParams() {
  return subcategories.map((sub) => ({
    category: sub.categoryId,
    subcategory: sub.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category: catId, subcategory: subId } = await params;
  const category = getCategoryById(catId);
  const subcategories = getSubcategoriesByCategoryId(catId);
  const subcategory = subcategories.find((s) => s.id === subId);

  if (!category || !subcategory) return { title: "Subcategory Not Found" };

  return {
    title: `${subcategory.name} - ${category.name} | Pixel Store`,
    description: subcategory.description,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { category: catId, subcategory: subId } = await params;
  const category = getCategoryById(catId);

  if (!category) {
    notFound();
  }

  const subcategories = getSubcategoriesByCategoryId(catId);
  const currentSub = subcategories.find((s) => s.id === subId);

  if (!currentSub) {
    notFound();
  }

  const products = getProductsBySubcategoryId(subId);

  return (
    <Prodt
      category={category}
      currentSub={currentSub}
      subcategories={subcategories}
      products={products}
    />
  );
}
