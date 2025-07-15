'use client';
import ProductDetails from '@/app/ProductDetails';

export default function ProductPage({ params }) {
  console.log('ProductPage rendered with params:', params);
  console.log('ProductId:', params.productId);
  
  if (!params.productId) {
    return <div>Error: No product ID found</div>;
  }
  
  return <ProductDetails productId={params.productId} />;
} 