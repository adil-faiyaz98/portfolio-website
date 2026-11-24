import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getAllProductSlugs } from "@/data/products";
import { ProductPageClient } from "./ProductPageClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found | SDA Intelligence",
    };
  }
  
  return {
    title: `${product.name} | SDA Intelligence AI Agents`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} - ${product.tagline}`,
      description: product.fullDescription,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }
  
  return <ProductPageClient product={product} />;
}
