'use client';
import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Image from 'next/image';
import mallImg from './assets/images/mall.png';
import novelImg from './assets/images/Novel.png';
import audiobookImg from './assets/images/audiobook.png';
import shunyaImg from './assets/images/shunya.jpg';

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
const duplicatedProducts = [...products, ...products];

const tshirts = Array.from({ length: 8 }).map(() => ({
  img: mallImg.src,
}));
const duplicatedTshirts = [...tshirts, ...tshirts];

export default function Mall() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <Header selectedNav="mall" searchPlaceholder="Mall" />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <div style={{ width: '99%', position: 'relative' }}>
          {banners.map((banner, idx) => (
            <div
              key={idx}
              style={{
                display: idx === current ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: banner.bg,
                borderRadius: 20,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                padding: '32px 32px 32px 40px',
                minHeight: 220,
                transition: 'all 0.5s',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>
                  {banner.title}
                </div>
                <button
                  style={{
                    background: '#fff',
                    color: banner.bg,
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 24px',
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    marginTop: 8,
                  }}
                >
                  {banner.button}
                </button>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  src={banner.img}
                  alt={banner.title}
                  style={{ width: 'auto', height: 160, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.15))' }}
                  width={180}
                  height={160}
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
          {/* Dots */}
          <div style={{ position: 'absolute', bottom: 18, left: 40, display: 'flex', gap: 8 }}>
            {banners.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: idx === current ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: '2px solid #fff',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Products Section */}
      <div style={{ width: '100%', marginTop: 40, padding: '0 2vw' }}>
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, letterSpacing: 0.5, color: '#222', fontFamily: 'inherit' }}>
          Products
        </div>
        <div className="animated-grid-container">
          <div className="product-grid" style={{ animation: 'slide 60s linear infinite' }}>
            {duplicatedProducts.map((item, idx) => (
              <div key={idx} className="product-card">
                <img src={item.img} alt={item.name.replace(/<br\/>/g, ' ')} style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 16 }} />
                <div style={{ fontSize: 20, fontWeight: 500, color: '#222', textAlign: 'center', whiteSpace: 'pre-line' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* LEGO HANUMAN Banner Slider Section */}
      <LegoBannerSlider />
      {/* T-Shirts Section */}
      <div style={{ width: '100%', marginTop: 48, padding: '0 2vw' }}>
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, letterSpacing: 0.5, color: '#222', fontFamily: 'inherit' }}>
          Tshirts
        </div>
        <div className="animated-grid-container">
          <div className="product-grid" style={{ animation: 'slide 40s linear infinite' }}>
            {duplicatedTshirts.map((item, idx) => (
              <div key={idx} className="product-card tshirt-card">
                <img src={item.img} alt="Tshirt" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 16 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animated-grid-container {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .animated-grid-container:hover .product-grid {
          animation-play-state: paused;
        }
        .product-grid {
          display: flex;
          gap: 2vw;
          width: max-content;
        }
        .product-card {
          background: #e0e0e0;
          border-radius: 16px;
          min-width: 110px;
          max-width: 150px;
          width: 100%;
          height: 140px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 12px 10px 8px 12px;
          box-sizing: border-box;
          margin-bottom: 8px;
          opacity: 0;
          animation: fadeIn 0.7s ease forwards;
        }
        .product-card img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 10px;
          align-self: center;
        }
        .product-card div {
          font-size: 16px;
          font-weight: 400;
          color: #222;
          text-align: left;
          white-space: pre-line;
          line-height: 1.1;
        }
        .tshirt-card {
          background: #e5e5e5;
        }
        @media (max-width: 1100px) {
          .product-grid {
            gap: 16px;
          }
          .product-card {
            min-width: 90px;
            max-width: 120px;
            height: 110px;
            padding: 8px 6px 6px 8px;
          }
          .product-card img {
            width: 60px;
            height: 60px;
          }
          .product-card div {
            font-size: 13px;
          }
        }
        @media (max-width: 800px) {
          .animated-grid-container {
            padding-bottom: 8px;
          }
          .product-grid {
            gap: 12px;
          }
          .product-card {
            min-width: 90px;
            max-width: 110px;
            width: 90px;
            height: 90px;
            padding: 4px 2px 4px 4px;
            margin-bottom: 0;
          }
          .product-card img {
            width: 40px;
            height: 40px;
          }
          .product-card div {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}

function LegoBannerSlider() {
  const banners = [
    {
      title: 'LEGO HANUMAN',
      button: 'Shop Now',
      img: 'https://via.placeholder.com/180x220?text=LEGO+HANUMAN',
      bg: '#3B5ED7',
    },
    {
      title: 'LEGO GANESHA',
      button: 'Shop Now',
      img: 'https://via.placeholder.com/180x220?text=LEGO+GANESHA',
      bg: '#2D9CDB',
    },
    {
      title: 'LEGO SHIVA',
      button: 'Shop Now',
      img: 'https://via.placeholder.com/180x220?text=LEGO+SHIVA',
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
    <div style={{ width: '100%', margin: '48px 0 0 0', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '99%', position: 'relative' }}>
        {banners.map((banner, idx) => (
          <div
            key={idx}
            style={{
              display: idx === current ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: banner.bg,
              borderRadius: 20,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              padding: '32px 32px 32px 40px',
              minHeight: 220,
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              transition: 'all 0.5s',
            }}
          >
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img src={banner.img} alt={banner.title} style={{ width: 180, height: 220, objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.15))', background: 'transparent' }} />
            </div>
            <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, letterSpacing: 1, textAlign: 'left' }}>
                {banner.title}
              </div>
              <button
                style={{
                  background: '#fff',
                  color: banner.bg,
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  marginTop: 8,
                }}
              >
                {banner.button}
              </button>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 18, left: 40, display: 'flex', gap: 8 }}>
          {banners.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: idx === current ? '#fff' : 'rgba(255,255,255,0.5)',
                border: '2px solid #fff',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 700px) {
          div[style*='display: flex'][style*='background'] {
            flex-direction: column;
            padding: 24px 12px 24px 12px !important;
            min-height: 180px !important;
          }
          div[style*='display: flex'][style*='background'] > div:last-child {
            justify-content: center !important;
            margin-top: 18px;
          }
          div[style*='display: flex'][style*='background'] > div:first-child {
            align-items: center;
            text-align: center;
          }
          div[style*='display: flex'][style*='background'] > div > button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
