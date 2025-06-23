'use client';
import ProductDetails from '../../ProductDetails';

export default function ProductPage({ params }) {
  return <ProductDetails productId={params.productId} />;
} 