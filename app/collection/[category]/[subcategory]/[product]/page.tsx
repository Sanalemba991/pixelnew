import React from "react";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getCategoryById,
  getSubcategoriesByCategoryId,
  getProductsBySubcategoryId,
  products,
} from "@/app/lib/data";
import ProductClient from "./ProductClient";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
    product: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.categoryId,
    subcategory: product.subcategoryId || "",
    product: product.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { product: slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Pixel Store`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { category: catId, subcategory: subId, product: slug } = await params;

  const product = getProductBySlug(slug);
  const category = getCategoryById(catId);
  const subcategories = getSubcategoriesByCategoryId(catId);
  const subcategory = subcategories.find((s) => s.id === subId);

  if (!product) {
    notFound();
  }

  // Related products in the same subcategory
  const relatedProducts = getProductsBySubcategoryId(
    product.subcategoryId || subId
  ).filter((p) => p.slug !== product.slug);

  return (
    <ProductClient
      product={product}
      category={category}
      subcategory={subcategory}
      relatedProducts={relatedProducts}
      catId={catId}
      subId={subId}
    />
  );
}
