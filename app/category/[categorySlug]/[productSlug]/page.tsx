import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, getCategoryBySlug, PRODUCTS } from "@/app/data/catalog";
import Products from "./Products";

interface CategoryProductPageProps {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    categorySlug: product.categorySlug,
    productSlug: product.slug,
  }));
}

export default async function CategoryProductDetailPage({ params }: CategoryProductPageProps) {
  const { categorySlug, productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(categorySlug) || getCategoryBySlug(product.categorySlug);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
  ).slice(0, 4);

  return (
    <Products
      product={product}
      category={category}
      relatedProducts={relatedProducts}
    />
  );
}
