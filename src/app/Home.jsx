'use client';
import React from 'react';
import Header from './Header';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Avatar, TextField, InputAdornment, IconButton, Paper, Grow, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import storyOfIndia from './assets/images/Story of India Retold .png';
import panchatantra from './assets/images/Panchatantra.png';
import shunya from './assets/images/shunya.jpg';

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

const trending = [
  { img: storyOfIndia },
  { img: panchatantra },
  { img: shunya },
  { img: storyOfIndia },
  { img: panchatantra },
  { img: shunya },
  { img: storyOfIndia },
  { img: panchatantra },
  { img: shunya },
];

const newReleases = [
  { img: '/anime1.png', title: 'Title', author: 'Author', bg: '#7bc47f' },
  { img: '/anime2.png', title: 'Title', author: 'Author', bg: '#b3e0ff' },
  { img: '/anime2.png', title: 'Title', author: 'Author', bg: '#b3e0ff' },
  { img: '/anime1.png', title: 'Title', author: 'Author', bg: '#7bc47f' },
  { img: '/anime1.png', title: 'Title', author: 'Author', bg: '#7bc47f' },
  { img: '/anime2.png', title: 'Title', author: 'Author', bg: '#b3e0ff' },
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
  { img: '/jaga-shirt.png', title: 'Jaga', edition: 'Yellow Edition', bg: '#fff176' },
];

const mostListenAudio = [
  { img: '/satyayug.png', title: 'Satyayug', author: 'Author', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000', author: 'Author', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug', author: 'Author', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000', author: 'Author', bg: '#b3e0ff' },
];

export default function Home() {
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
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ height: 28 }} />
      {/* Banner Slider */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Fade in={true} timeout={500}>
          <Box sx={{ mb: 3, position: 'relative' }}>
            <Slider {...sliderSettings} className="banner-slider">
              {bannerSlides.map((slide, idx) => (
                <Paper key={idx} elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', position: 'relative', minHeight: 220 }}>
                  <Box sx={{ position: 'relative', height: 220, bgcolor: '#000' }}>
                    <img src={slide.img} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                      <Typography variant="h4" sx={{ color: slide.color, fontWeight: 700, letterSpacing: 1, fontFamily: 'monospace', textShadow: '2px 2px 8px #000' }}>
                        {slide.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#fff', alignSelf: 'flex-end', textShadow: '1px 1px 6px #000' }}>{slide.author}</Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Slider>
            <style jsx global>{`
              .banner-slider .slick-dots {
                position: absolute !important;
                bottom: 18px !important;
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
                font-size: 12px;
              }
              .banner-slider .slick-dots li.slick-active button:before {
                color: #1976d2 !important;
                opacity: 1;
              }
            `}</style>
          </Box>
        </Fade>
        {/* Trending */}
        <Box sx={{ mt: 5 }} />
        <Fade in={true} timeout={600}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Trending</Typography></Fade>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'grid' },
            gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(150px, 1fr))' },
            gap: 2,
            overflowX: { xs: 'auto', sm: 'unset' },
            mb: 2,
            pb: { xs: 1, sm: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {trending.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: { xs: 110, sm: 150 },
                  width: { xs: 110, sm: 150 },
                  height: { xs: 140, sm: 190 },
                  mr: { xs: 2, sm: 0 },
                  position: 'relative',
                  flex: { xs: '0 0 auto', sm: 'unset' },
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff' }}>
                  <CardMedia component="img" image={item.img?.src ? item.img.src : item.img} alt={item.title || 'Trending'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', bottom: 8, left: 8, right: 8, px: 1, py: 0.5}}>
                    {/* <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.2 }}>{item.title}</Typography> */}
                  </Box>
                </Card>
                <Box sx={{ position: 'absolute', bottom: -10, left: -8, fontWeight: 900, fontSize: { xs: 20, sm: 32 }, color: '#111', lineHeight: 1, zIndex: 2, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', width: { xs: 20, sm: 28 }, height: { xs: 20, sm: 28 }, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
                  {idx + 1}
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* New Release */}
        <Box sx={{ mt: 5 }} />
        <Fade in={true} timeout={700}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>New Release</Typography></Fade>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'grid' },
            gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(180px, 1fr))' },
            gap: 2,
            overflowX: { xs: 'auto', sm: 'unset' },
            mb: 2,
            pb: { xs: 1, sm: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {newReleases.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: { xs: 180, sm: 'unset' },
                  width: { xs: 180, sm: '100%' },
                  height: { xs: 70, sm: 100 },
                  mr: { xs: 2, sm: 0 },
                  flex: { xs: '0 0 auto', sm: 'unset' },
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: item.bg,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                }}
              >
                <Box sx={{ flex: 1, p: 1, zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: { xs: 11, sm: 14 } }}>{item.author}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: { xs: 60, sm: 120 }, position: 'relative', zIndex: 1 }}>
                  <img src={item.img} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* Mall */}
        <Box sx={{ mt: 5 }} />
        <Fade in={true} timeout={800}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Mall</Typography></Fade>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'grid' },
            gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(220px, 1fr))' },
            gap: 2,
            overflowX: { xs: 'auto', sm: 'unset' },
            mb: 2,
            pb: { xs: 1, sm: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {mallItems.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: { xs: 140, sm: 220 },
                  width: { xs: 140, sm: 220 },
                  height: { xs: 90, sm: 160 },
                  mr: { xs: 2, sm: 0 },
                  flex: { xs: '0 0 auto', sm: 'unset' },
                  bgcolor: item.bg,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  px: 1,
                }}
              >
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 0.5, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 400, fontSize: { xs: 11, sm: 14 } }}>{item.edition}</Typography>
                </Box>
                <Box sx={{ height: { xs: 60, sm: 130 }, width: { xs: 50, sm: 120 }, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 1 }}>
                  <img src={item.img} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'contain', background: 'none', border: 'none' }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* Most listen audio */}
        <Box sx={{ mt: 5 }} />
        <Fade in={true} timeout={900}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Most listen audio</Typography></Fade>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'grid' },
            gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(180px, 1fr))' },
            gap: 2,
            overflowX: { xs: 'auto', sm: 'unset' },
            mb: 2,
            pb: { xs: 1, sm: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {mostListenAudio.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: { xs: 180, sm: 'unset' },
                  width: { xs: 180, sm: '100%' },
                  height: { xs: 70, sm: 100 },
                  mr: { xs: 2, sm: 0 },
                  flex: { xs: '0 0 auto', sm: 'unset' },
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: item.bg,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                }}
              >
                <Box sx={{ flex: 1, p: 1, zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: { xs: 11, sm: 14 } }}>{item.author}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: { xs: 60, sm: 120 }, position: 'relative', zIndex: 1 }}>
                  <img src={item.img} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>
        {/* Most read novel */}
        <Box sx={{ mt: 5 }} />
        <Fade in={true} timeout={1000}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Most read novel</Typography></Fade>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'grid' },
            gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(180px, 1fr))' },
            gap: 2,
            overflowX: { xs: 'auto', sm: 'unset' },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {[1, 2].map((_, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box sx={{ bgcolor: '#d3d3d3', borderRadius: 3, height: { xs: 70, sm: 120 }, width: { xs: 180, sm: 260 }, minWidth: { xs: 180, sm: 260 }, mr: { xs: 2, sm: 0 }, flex: { xs: '0 0 auto', sm: 'unset' } }} />
            </Grow>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 