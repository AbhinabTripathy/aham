'use client';
import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Image from 'next/image';
import mallImg from './assets/images/mall.png';
import novelImg from './assets/images/Novel.png';
import audiobookImg from './assets/images/audiobook.png';
import shunyaImg from './assets/images/shunya.jpg';
import { useRouter } from 'next/navigation';

const banners = [
  {
    title: 'BHAIRAVA COLLECTION',
    button: 'Shop Now',
    img: mallImg,
    bg: '#3B5ED7',
  },
  {
    title: 'NOVEL COLLECTION',
    button: 'Shop Now',
    img: novelImg,
    bg: '#2D9CDB',
  },
  {
    title: 'AUDIOBOOK COLLECTION',
    button: 'Shop Now',
    img: audiobookImg,
    bg: '#6C63FF',
  },
  {
    title: 'SHUNYA SPECIALS',
    button: 'Shop Now',
    img: shunyaImg,
    bg: '#1B1F3B',
  },
];

const products = [
  { img: 'https://via.placeholder.com/120x120?text=Black+bracelet', name: 'Black\nbracelet' },
  { img: 'https://via.placeholder.com/120x120?text=LEGO+Rath', name: 'LEGO\nRath' },
  { img: 'https://via.placeholder.com/120x120?text=bracelet', name: 'bracelet' },
  { img: 'https://via.placeholder.com/120x120?text=Rudraksha', name: 'Rudraksha' },
  { img: 'https://via.placeholder.com/120x120?text=Wooden+Beads', name: 'Wooden Beads' },
  { img: 'https://via.placeholder.com/120x120?text=Gemstone+Bracelet', name: 'Gemstone Bracelet' },
  { img: 'https://via.placeholder.com/120x120?text=Silver+Bracelet', name: 'Silver Bracelet' },
  { img: 'https://via.placeholder.com/120x120?text=Gold+Bracelet', name: 'Gold Bracelet' },
];
const duplicatedProducts = [...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products];

const tshirts = Array.from({ length: 8 }).map(() => ({
  img: mallImg.src,
}));
const duplicatedTshirts = [...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts, ...tshirts];

export default function Mall() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Header selectedNav="mall" searchPlaceholder="Mall" />
      </div>
      
      {/* Main Content */}
      <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 'calc(100vh - 85px)' }}>
        <div style={{ height: 16 }} />
        
        {/* Banner Section */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            {banners.map((banner, idx) => (
              <div
                key={idx}
                style={{
                  display: idx === current ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: banner.bg,
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  padding: '16px 16px 16px 20px',
                  height: 80,
                  transition: 'all 0.5s',
                  color: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ flex: 1, minWidth: 100 }}>
                  <div style={{ 
                    fontSize: 14, 
                    fontWeight: 700, 
                    marginBottom: 6, 
                    letterSpacing: 0.5 
                  }}>
                    {banner.title}
                  </div>
                  <button
                    style={{
                      background: '#fff',
                      color: banner.bg,
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontWeight: 700,
                      fontSize: 10,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    {banner.button}
                  </button>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Image
                    src={banner.img}
                    alt={banner.title}
                    style={{ 
                      width: 'auto', 
                      height: 60, 
                      maxWidth: '100%', 
                      objectFit: 'contain', 
                      filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.15))' 
                    }}
                    width={80}
                    height={60}
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
            {/* Dots */}
            <div style={{ position: 'absolute', bottom: 8, left: 20, display: 'flex', gap: 4 }}>
              {banners.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: idx === current ? '#fff' : 'rgba(255,255,255,0.5)',
                    border: '1px solid #fff',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div style={{ width: '100%', marginTop: 20, padding: '0 16px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5, color: '#222' }}>
            Products
          </div>
          <div style={{ 
            display: 'flex', 
            gap: 12, 
            overflowX: 'auto', 
            scrollbarWidth: 'none',
            scrollBehavior: 'smooth',
            paddingBottom: 8
          }}>
            {duplicatedProducts.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  flexShrink: 0, 
                  cursor: 'pointer',
                  background: '#e0e0e0',
                  borderRadius: 12,
                  minWidth: 90,
                  maxWidth: 110,
                  width: 90,
                  height: 90,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                }}
                onClick={() => {
                  console.log('Product clicked, navigating to:', `/mall/${idx}`);
                  router.push(`/mall/${idx}`);
                }}
              >
                <img src={item.img} alt={item.name.replace(/\n/g, ' ')} style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: 6 }} />
                <div style={{ fontSize: 10, fontWeight: 400, color: '#222', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.1 }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* LEGO HANUMAN Banner Slider Section */}
        <LegoBannerSlider />

        {/* T-Shirts Section */}
        <div style={{ width: '100%', marginTop: 20, padding: '0 16px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5, color: '#222' }}>
            Tshirts
          </div>
          <div style={{ 
            display: 'flex', 
            gap: 12, 
            overflowX: 'auto', 
            scrollbarWidth: 'none',
            scrollBehavior: 'smooth',
            paddingBottom: 8
          }}>
            {duplicatedTshirts.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  flexShrink: 0, 
                  cursor: 'pointer',
                  background: '#e5e5e5',
                  borderRadius: 12,
                  minWidth: 90,
                  maxWidth: 110,
                  width: 90,
                  height: 90,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                }}
                onClick={() => {
                  console.log('T-shirt clicked, navigating to:', `/mall/${idx + duplicatedProducts.length}`);
                  router.push(`/mall/${idx + duplicatedProducts.length}`);
                }}
              >
                <img src={item.img} alt="Tshirt" style={{ width: 40, height: 40, objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function LegoBannerSlider() {
  const banners = [
    {
      title: 'LEGO HANUMAN',
      button: 'Shop Now',
      img: 'https://via.placeholder.com/100x120?text=LEGO+HANUMAN',
      bg: '#3B5ED7',
    },
    {
      title: 'LEGO GANESHA',
      button: 'Shop Now',
      img: 'https://via.placeholder.com/100x120?text=LEGO+GANESHA',
      bg: '#2D9CDB',
    },
    {
      title: 'LEGO SHIVA',
      button: 'Shop Now',
      img: 'https://via.placeholder.com/100x120?text=LEGO+SHIVA',
      bg: '#6C63FF',
    },
  ];
  const [current, setCurrent] = React.useState(0);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div style={{ width: '100%', margin: '20px 0 0 0', display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
      <div style={{ width: '100%', position: 'relative' }}>
        {banners.map((banner, idx) => (
          <div
            key={idx}
            style={{
              display: idx === current ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: banner.bg,
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              padding: '16px 20px',
              height: 120,
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              transition: 'all 0.5s',
            }}
          >
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img src={banner.img} alt={banner.title} style={{ width: 100, height: 120, objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.15))', background: 'transparent' }} />
            </div>
            <div style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: 0.5, textAlign: 'left' }}>
                {banner.title}
              </div>
              <button
                style={{
                  background: '#fff',
                  color: banner.bg,
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 16px',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {banner.button}
              </button>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 12, left: 20, display: 'flex', gap: 6 }}>
          {banners.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: idx === current ? '#fff' : 'rgba(255,255,255,0.5)',
                border: '1px solid #fff',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
