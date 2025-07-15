'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Avatar, TextField, InputAdornment, IconButton, Paper, Grow, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import storyOfIndia from './assets/images/Story of India Retold .png';
import panchatantra from './assets/images/Panchatantra.png';
import shunya from './assets/images/shunya.jpg';
import paika from './assets/images/Paika.png';
import Link from 'next/link';
import axios from 'axios';

const bannerSlides = [
  {
    img: '/night-horror-story.jpg',
    title: 'NIGHT HORROR STORY',
    author: 'BY OLIVIA WILSON',
    color: '#f00',
  },
  {
    img: '/stories-of-india.png',
    title: 'STORIES OF INDIA RETOLD',
    author: 'BY ANITA NAIR',
    color: '#0066d6',
  },
  {
    img: '/panchatantra.png',
    title: 'PANCHATANTRA',
    author: 'BY VISHNU SHARMA',
    color: '#43a047',
  },
];

const newReleases = [
  { img: '/anime1.png', title: 'Title 1', author: 'Author 1', bg: '#7bc47f' },
  { img: '/anime2.png', title: 'Title 2', author: 'Author 2', bg: '#b3e0ff' },
  { img: '/anime2.png', title: 'Title 3', author: 'Author 3', bg: '#b3e0ff' },
  { img: '/anime1.png', title: 'Title 4', author: 'Author 4', bg: '#7bc47f' },
  { img: '/anime1.png', title: 'Title 5', author: 'Author 5', bg: '#7bc47f' },
  { img: '/anime2.png', title: 'Title 6', author: 'Author 6', bg: '#b3e0ff' },
  { img: '/anime1.png', title: 'Title 7', author: 'Author 7', bg: '#7bc47f' },
  { img: '/anime2.png', title: 'Title 8', author: 'Author 8', bg: '#b3e0ff' },
  { img: '/anime1.png', title: 'Title 9', author: 'Author 9', bg: '#7bc47f' },
  { img: '/anime2.png', title: 'Title 10', author: 'Author 10', bg: '#b3e0ff' },
  { img: '/anime1.png', title: 'Title 11', author: 'Author 11', bg: '#7bc47f' },
  { img: '/anime2.png', title: 'Title 12', author: 'Author 12', bg: '#b3e0ff' },
];

const mallItems = [
  { img: '/rudra-shirt.png', title: 'Rudra', edition: 'Black Edition', bg: '#0066d6' },
  { img: '/jaga-shirt.png', title: 'Jaga', edition: 'Black Edition', bg: '#d3d3d3' },
  { img: '/jaga-shirt.png', title: 'Jaga', edition: 'Black Edition', bg: '#0066d6' },
  { img: '/rudra-shirt.png', title: 'Rudra', edition: 'White Edition', bg: '#fff' },
  { img: '/jaga-shirt.png', title: 'Jaga', edition: 'White Edition', bg: '#f5f5f5' },
  { img: '/rudra-shirt.png', title: 'Rudra', edition: 'Blue Edition', bg: '#2196f3' },
  { img: '/jaga-shirt.png', title: 'Jaga', edition: 'Red Edition', bg: '#e57373' },
  { img: '/rudra-shirt.png', title: 'Rudra', edition: 'Green Edition', bg: '#4caf50' },
];

const mostListenAudio = [
  { img: '/satyayug.png', title: 'Satyayug 1', author: 'Author 1', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 1', author: 'Author 2', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 2', author: 'Author 3', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 2', author: 'Author 4', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 3', author: 'Author 5', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 3', author: 'Author 6', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 4', author: 'Author 7', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 4', author: 'Author 8', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 5', author: 'Author 9', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 5', author: 'Author 10', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 6', author: 'Author 11', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 6', author: 'Author 12', bg: '#b3e0ff' },
];

const mostReadNovel = [
  { id: 1, img: paika, title: 'Paika Revolution' },
  { id: 2, img: paika, title: 'Paika Revolution' },
  { id: 3, img: paika, title: 'Paika Revolution' },
  { id: 4, img: paika, title: 'Paika Revolution' },
  { id: 5, img: paika, title: 'Paika Revolution' },
  { id: 6, img: paika, title: 'Paika Revolution' },
  { id: 7, img: paika, title: 'Paika Revolution' },
  { id: 8, img: paika, title: 'Paika Revolution' },
  { id: 9, img: paika, title: 'Paika Revolution' },
  { id: 10, img: paika, title: 'Paika Revolution' },
  { id: 11, img: paika, title: 'Paika Revolution' },
  { id: 12, img: paika, title: 'Paika Revolution' },
  { id: 13, img: paika, title: 'Paika Revolution' },
  { id: 14, img: paika, title: 'Paika Revolution' },
];

function getImageUrl(path) {
  if (!path) return '/fallback.png';
  if (path.startsWith('/uploads')) {
    return `https://api.ahamcore.com${path}`;
  }
  return path;
}

export default function Home() {
  const [contentData, setContentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('https://api.ahamcore.com/api/user/published-content');
        console.log('Fetched data:', res.data);
        setContentData(res.data.data || {});
      } catch (err) {
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Trending: mix of audiobooks and graphicNovels
  const trending = [
    ...(Array.isArray(contentData?.audiobooks) ? contentData.audiobooks : []),
    ...(Array.isArray(contentData?.graphicNovels) ? contentData.graphicNovels : [])
  ];

  // Most listen audio: audiobooks only
  const mostListenAudio = Array.isArray(contentData?.audiobooks)
    ? contentData.audiobooks
    : [];

  // Most read novel: graphicNovels
  const mostReadNovel = Array.isArray(contentData?.graphicNovels)
    ? contentData.graphicNovels
    : [];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: '#fff' }}>
        <Header />
      </Box>
      <Box sx={{ height: 16 }} />
      {/* Main Content Container */}
      <Box sx={{ 
        maxWidth: 480, 
        mx: 'auto', 
        bgcolor: '#fff',
        minHeight: 'calc(100vh - 111px)',
        boxShadow: { xs: 'none', sm: '0 0 20px rgba(0,0,0,0.1)' },
        position: 'relative',
        pb: 0
      }}>
        {/* Trending */}
        <Box sx={{ p: 2, pt: 0 }}>
        <Fade in={true} timeout={600}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Trending</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            px: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {trending.length === 0 ? (
            <Typography sx={{ p: 2 }}>No trending content found.</Typography>
          ) : trending.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item._id || idx}>
              <Box
                sx={{
                  minWidth: 120,
                  maxWidth: 160,
                  height: 150,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff' }}>
                  <CardMedia component="img" image={getImageUrl(item.iconPath || item.icon || item.novelIcon)} alt={item.title || 'Trending'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Card>
                <Box sx={{ position: 'absolute', bottom: -10, left: -8, fontWeight: 900, fontSize: 22, color: '#111', lineHeight: 1, zIndex: 2, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
                  {idx + 1}
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* Banner Slider */}
        <Box sx={{ mt: 2 }} />
        <Fade in={true} timeout={500}>
          <Box sx={{ mb: 2, position: 'relative' }}>
            <Slider {...sliderSettings} className="banner-slider">
              {bannerSlides.map((slide, idx) => (
                <Paper key={idx} elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', position: 'relative', minHeight: 80 }}>
                  <Box sx={{ position: 'relative', height: 80, bgcolor: '#000' }}>
                    <img src={slide.img} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      p: 1,
                      pb: 2.5
                    }}>
                      <Typography variant="h4" sx={{ 
                        color: slide.color, 
                        fontWeight: 700, 
                        letterSpacing: 1, 
                        fontFamily: 'monospace', 
                        textShadow: '2px 2px 8px #000',
                        fontSize: '0.9rem'
                      }}>
                        {slide.title}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#fff', 
                        alignSelf: 'flex-end', 
                        textShadow: '1px 1px 6px #000',
                        fontSize: '0.6rem'
                      }}>{slide.author}</Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Slider>
            <style jsx global>{`
              .banner-slider .slick-dots {
                position: absolute !important;
                bottom: 12px !important;
                left: 0;
                right: 0;
                margin: 0 auto;
                width: 100%;
                display: flex !important;
                justify-content: center;
                z-index: 2;
              }
              .banner-slider .slick-dots li button:before {
                color: #fff !important;
                opacity: 0.9;
                font-size: 10px;
              }
              .banner-slider .slick-dots li.slick-active button:before {
                color: #1976d2 !important;
                opacity: 1;
              }
            `}</style>
          </Box>
        </Fade>
        {/* New Release */}
        <Box sx={{ mt: 2.5 }} />
        <Fade in={true} timeout={700}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>New Release</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            px: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {newReleases.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: 120,
                  maxWidth: 160,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: item.bg,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Box sx={{ flex: 1, p: 1, zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: 14 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: 11 }}>{item.author}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: 60, position: 'relative', zIndex: 1 }}>
                  <img src={item.img} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* Mall */}
        <Box sx={{ mt: 2.5 }} />
        <Fade in={true} timeout={800}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Mall</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            px: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {mallItems.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: 120,
                  maxWidth: 160,
                  height: 80,
                  bgcolor: item.bg,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  px: 1,
                  flexShrink: 0,
                }}
              >
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 0.5, fontSize: 14 }}>{item.title}</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 400, fontSize: 11 }}>{item.edition}</Typography>
                </Box>
                <Box sx={{ height: 50, width: 45, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 1 }}>
                  <img src={item.img} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'contain', background: 'none', border: 'none' }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* Most listen audio */}
        <Box sx={{ mt: 2.5 }} />
        <Fade in={true} timeout={900}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Most listen audio</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            px: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {mostListenAudio.length === 0 ? (
            <Typography sx={{ p: 2 }}>No audio books found.</Typography>
          ) : mostListenAudio.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item._id || idx}>
              <Box
                sx={{
                  minWidth: 120,
                  maxWidth: 160,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#ffe082',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Box sx={{ flex: 1, p: 1, zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: 14 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: 11 }}>{item.role}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: 60, position: 'relative', zIndex: 1 }}>
                  <img src={getImageUrl(item.iconPath || item.icon || item.novelIcon)} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* Most read novel */}
        <Box sx={{ mt: 2.5 }} />
        <Fade in={true} timeout={1000}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Most read novel</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            px: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {mostReadNovel.length === 0 ? (
            <Typography sx={{ p: 2 }}>No graphic novels found.</Typography>
          ) : mostReadNovel.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item._id || idx}>
              <Box
                sx={{
                  minWidth: 100,
                  maxWidth: 140,
                  height: 150,
                  flexShrink: 0,
                  textDecoration: 'none',
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative' }}>
                  <CardMedia component="img" image={getImageUrl(item.iconPath || item.novelIcon)} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Card>
              </Box>
            </Grow>
          ))}
        </Box>
        <Footer />
      </Box>
      </Box>
    </Box>
  );
} 