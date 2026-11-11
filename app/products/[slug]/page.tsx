import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getCategoryBySlug, PRODUCTS } from "@/app/data/catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf8f6] text-neutral-900 pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-8">
          <Link href="/" className="hover:text-[#f97316] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#f97316] transition-colors">
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-[#f97316] transition-colors"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-[#f97316] truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 lg:p-10 shadow-sm mb-14">
          {/* Gallery / Image column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-inner">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                unoptimized
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-md text-neutral-900 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
              {product.inStock ? (
                <span className="absolute top-4 right-4 px-3 py-1 text-[11px] font-bold bg-emerald-500/90 text-white rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="absolute top-4 right-4 px-3 py-1 text-[11px] font-bold bg-red-500/90 text-white rounded-full">
                  Backorder
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} shot ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details / Buy column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href={`/category/${product.categorySlug}`}
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#f97316] mb-2 hover:underline"
              >
                <span>{product.categoryName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                <span className="text-neutral-400">View Category</span>
              </Link>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-sm sm:text-base font-semibold text-[#f97316]">
                {product.tagline}
              </p>

              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-neutral-950">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-neutral-400 tracking-wider">
                  {product.currency} • Taxes included
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                {product.description}
              </p>

              {/* Specifications list */}
              <div className="mt-6 pt-5 border-t border-neutral-100">
                <h2 className="text-xs font-extrabold tracking-wider uppercase text-neutral-400 mb-3">
                  Technical Specifications
                </h2>
                <dl className="grid grid-cols-1 gap-2 text-xs">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-neutral-50"
                    >
                      <dt className="font-semibold text-neutral-500">{spec.label}</dt>
                      <dd className="font-extrabold text-neutral-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-neutral-100 space-y-3">
              <a
                href={`https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20purchasing%20the%20${encodeURIComponent(
                  product.name
                )}%20(${encodeURIComponent(product.slug)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-extrabold shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Order via WhatsApp Direct</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center py-3 px-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors"
              >
                Inquire & Studio Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Related Category Gear */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">
                  Same Collection
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                  More in {product.categoryName}
                </h3>
              </div>
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-xs font-extrabold text-[#f97316] hover:underline"
              >
                View all {category?.name ?? "in category"} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-extrabold text-neutral-950 group-hover:text-[#f97316] transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{rel.tagline}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-black text-neutral-950">
                        ${rel.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#f97316]">Inspect →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

