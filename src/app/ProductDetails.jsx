'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from './context/CartContext';
import { Snackbar, Alert } from '@mui/material';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

// Updated product images with correct public paths
const productImages = [
  '/assets/preview-main.png',
  '/assets/preview-2.jpeg',
  '/assets/preview-3.jpeg',
  '/assets/preview-4.jpeg',
  '/assets/preview-5.jpeg'
];

export default function ProductDetails({ productId }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [windowWidth, setWindowWidth] = useState(768);
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const sliderRef = useRef(null);
  const router = useRouter();
  const { addToCart } = useCart();

  // Sample product data - replace with actual data fetching
  const productData = {
    id: productId,
    name: 'Bhairaba Black Edition',
    price: 799,
    mrp: 900,
    images: productImages,
    brand: 'Aham Original',
    rating: 4,
    reviews: 4,
    details: {
      sleeve: 'Half Sleeve',
      fabric: 'Cotton Blend',
      pattern: 'Solid'
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      nextImage();
    } else {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isMobile = windowWidth <= 768;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setOpenToast(true);
      return;
    }

    const item = {
      id: productId,
      name: productData.name,
      price: productData.price,
      size: selectedSize,
      image: productImages[0], // Use first image as thumbnail
      quantity: 1
    };
    
    addToCart(item);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setOpenToast(true);
      return;
    }

    const item = {
      id: productId,
      name: productData.name,
      price: productData.price,
      size: selectedSize,
      image: productImages[0],
      quantity: 1
    };
    
    addToCart(item);
    router.push('/cart');
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#000000',
      width: '100%',
      margin: 0,
      padding: 0,
      position: 'relative'
    }}>
      {/* Back Button */}
      <div 
        onClick={handleBack}
        style={{ 
          cursor: 'pointer', 
          fontSize: '24px',
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: '#fff',
          zIndex: 10
        }}
      >
        ←
      </div>

      {/* Image Section */}
      <div 
        ref={sliderRef}
        style={{ 
          width: '100%',
          aspectRatio: '1',
          backgroundColor: '#000000',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          touchAction: 'pan-y pinch-zoom'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.3s ease-out'
        }}>
          {productImages.map((img, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: currentImage === index ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                transform: `translateX(${(index - currentImage) * 100}%)`
              }}
            >
              <Image
                src={img}
                alt={`Product Image ${index + 1}`}
                fill
                style={{ 
                  objectFit: 'contain',
                  padding: '40px',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
                priority={index === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 2
        }}>
          {productImages.map((_, index) => (
            <div
              key={index}
              onClick={() => handleImageChange(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index === currentImage ? '#fff' : 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.8)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '100%',
        padding: '24px',
        position: 'relative',
        zIndex: 3
      }}>
        <div style={{
          maxWidth: isMobile ? '100%' : '600px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
          }}>
            <h1 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: '600',
              color: '#000000'
            }}>
              Bhairaba Black Edition
            </h1>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
              <span style={{ 
                fontSize: '24px', 
                fontWeight: '600',
                color: '#000000'
              }}>₹799</span>
              <span style={{ 
                fontSize: '16px', 
                color: '#000000',
                textDecoration: 'line-through',
                opacity: 0.7
              }}>
                MRP ₹900
              </span>
            </div>
          </div>

          <div style={{ 
            color: '#0066cc',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            Aham Original
          </div>

          {/* Size Selection */}
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  width: '48px',
                  height: '48px',
                  border: `1px solid ${selectedSize === size ? '#000' : '#ccc'}`,
                  backgroundColor: selectedSize === size ? '#000' : '#fff',
                  color: selectedSize === size ? '#fff' : '#000',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Rating */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{ color: star <= 4 ? '#000' : '#ccc' }}>★</span>
              ))}
            </div>
            <span style={{ color: '#666' }}>4 reviews</span>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            marginBottom: '24px'
          }}>
            <button 
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #000',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#000',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              ADD TO CART
            </button>
            <button 
              onClick={handleBuyNow}
              style={{
                width: '100%',
                padding: '14px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#007FFF',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              BUY NOW
            </button>
          </div>

          {/* Product Details */}
          <div>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Product Details
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              color: '#666'
            }}>
              <div>Sleeve</div>
              <div>Half Sleeve</div>
              <div>Fabric</div>
              <div>Cotton Blend</div>
              <div>Pattern</div>
              <div>Solid</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity="warning" 
          sx={{ width: '100%', bgcolor: '#fff3e0', color: '#000' }}
        >
          Please select a size before adding to cart
        </Alert>
      </Snackbar>
    </div>
  );
} 