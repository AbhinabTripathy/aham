'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from './context/CartContext';
import Footer from './Footer';
import { Snackbar, Alert, Box, Typography, Button } from '@mui/material';

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
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh' }}>
        {/* Back Button */}
        <Box 
          onClick={handleBack}
          sx={{ 
            cursor: 'pointer', 
            fontSize: '24px',
            position: 'absolute',
            top: '16px',
            left: '16px',
            color: '#fff',
            zIndex: 10,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '50%'
          }}
        >
          ←
        </Box>

        {/* Image Section */}
        <Box 
          ref={sliderRef}
          sx={{ 
            width: '100%',
            height: '400px',
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
          <Box sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            position: 'relative',
            transition: 'transform 0.3s ease-out'
          }}>
            {productImages.map((img, index) => (
              <Box
                key={index}
                sx={{
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
              </Box>
            ))}
          </Box>

          {/* Dots */}
          <Box sx={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2
          }}>
            {productImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleImageChange(index)}
                sx={{
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
          </Box>
        </Box>

        {/* Product Info Section */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '100%',
          padding: '20px',
          position: 'relative',
          zIndex: 3
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
          }}>
            <Typography variant="h5" sx={{ 
              fontSize: '1.3rem', 
              fontWeight: '600',
              color: '#000000'
            }}>
              Bhairaba Black Edition
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
              <Typography sx={{ 
                fontSize: '1.5rem', 
                fontWeight: '600',
                color: '#000000'
              }}>₹799</Typography>
              <Typography sx={{ 
                fontSize: '1rem', 
                color: '#000000',
                textDecoration: 'line-through',
                opacity: 0.7
              }}>
                MRP ₹900
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ 
            color: '#0066cc',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            Aham Original
          </Typography>

          {/* Size Selection */}
          <Box sx={{ 
            display: 'flex', 
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            {sizes.map(size => (
              <Button
                key={size}
                onClick={() => setSelectedSize(size)}
                variant={selectedSize === size ? 'contained' : 'outlined'}
                sx={{
                  width: '48px',
                  height: '48px',
                  minWidth: '48px',
                  border: `1px solid ${selectedSize === size ? '#000' : '#ccc'}`,
                  backgroundColor: selectedSize === size ? '#000' : '#fff',
                  color: selectedSize === size ? '#fff' : '#000',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  '&:hover': {
                    backgroundColor: selectedSize === size ? '#333' : '#f5f5f5',
                    borderColor: '#000'
                  }
                }}
              >
                {size}
              </Button>
            ))}
          </Box>

          {/* Rating */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Typography key={star} sx={{ color: star <= 4 ? '#000' : '#ccc', fontSize: '1.2rem' }}>★</Typography>
              ))}
            </Box>
            <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>4 reviews</Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            marginBottom: '20px'
          }}>
            <Button 
              onClick={handleAddToCart}
              variant="outlined"
              sx={{
                width: '100%',
                padding: '12px',
                border: '1px solid #000',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#000',
                fontSize: '1rem',
                fontWeight: '500',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#000'
                }
              }}
            >
              ADD TO CART
            </Button>
            <Button 
              onClick={handleBuyNow}
              variant="contained"
              sx={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#007FFF',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '500',
                '&:hover': {
                  backgroundColor: '#0066cc'
                }
              }}
            >
              BUY NOW
            </Button>
          </Box>

          {/* Product Details */}
          <Box>
            <Typography variant="h6" sx={{ 
              fontSize: '1.2rem', 
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Product Details
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              color: '#666'
            }}>
              <Typography sx={{ fontSize: '0.9rem' }}>Sleeve</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>Half Sleeve</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>Fabric</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>Cotton Blend</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>Pattern</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>Solid</Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

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
    </Box>
  );
} 