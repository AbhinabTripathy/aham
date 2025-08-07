'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
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

function getImageUrl(path) {
  if (!path) return '/fallback.png';
  if (path.startsWith('/uploads')) {
    return `https://api.ahamcore.com${path}`;
  }
  return path;
}

export default function Home() {
  const [contentData, setContentData] = useState({});
  const [graphicNovels, setGraphicNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentSections, setContentSections] = useState([]);
  const observerRef = useRef(null);
  
  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize content sections
  useEffect(() => {
    // Define the section types
    const sectionTypes = ['trending', 'banner', 'threads', 'mall', 'novel'];
    // Initialize with one set of sections
    setContentSections([...sectionTypes]);
  }, []);
  
  // Handle intersection observer for infinite scroll
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      // When we reach the observer, add more shuffled sections
      setContentSections(prev => {
        const sectionTypes = ['trending', 'banner', 'threads', 'mall', 'novel'];
        const newSections = shuffleArray([...sectionTypes]);
        return [...prev, ...newSections];
      });
    }
  }, []);
  
  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch graphic novels using GET method
        const novelsRes = await axios.get('https://api.ahamcore.com/api/user/graphic-novels');
        
        // Extract graphic novels data from API response
        const novels = novelsRes.data.data || [];
        
        // Use graphic novels for both trending and Read Novel sections
        setContentData({ graphicNovels: novels });
        setGraphicNovels(Array.isArray(novels) ? novels : []);
      } catch (err) {
        console.error('Error fetching data:', err);
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
        {/* Render sections based on contentSections array */}
        {contentSections.map((sectionType, sectionIndex) => {
          // Render different section types based on the array
          switch(sectionType) {
            case 'trending':
              return trending.length > 0 && (
                <Box key={`trending-${sectionIndex}`} sx={{ p: 2, pt: sectionIndex === 0 ? 0 : 2 }}>
                  <Fade in={true} timeout={600}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0, color: 'black', lineHeight: 1.6 }}>
                      Trending
                    </Typography>
                  </Fade>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      overflowX: 'auto',
                      mb: 1.5,
                      pb: 1,
                      px: 1,
                      scrollbarWidth: 'none',
                      '&::-webkit-scrollbar': { display: 'none' },
                      scrollBehavior: 'smooth',
                    }}
                  >
                    {trending.map((item, idx) => {
            // Get Novel Image: Use novelIcon or first episode's iconPath as fallback (same logic as Read Novel section)
            const trendingImage = item.novelIcon || 
                                (item.episodes && item.episodes.length > 0 ? item.episodes[0].iconPath : null) ||
                                paika.src; // fallback to static image
            
            return (
              <Grow in={true} timeout={400 + idx * 80} key={item._id || item.id || idx}>
                <Link href={`/novel/${item.id}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                      width: 140, // Fixed width for all cards
                      height: 150, // Fixed height for all cards
                      minWidth: 140, // Ensure consistent minimum width
                      maxWidth: 140, // Ensure consistent maximum width
                  position: 'relative',
                  flexShrink: 0,
                      cursor: 'pointer',
                }}
              >
                    <Card sx={{ 
                      borderRadius: 3, 
                      overflow: 'hidden', 
                      width: '100%', 
                      height: '100%', 
                      boxShadow: 3, 
                      position: 'relative', 
                      bgcolor: '#fff',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      }
                    }}>
                      <CardMedia 
                        component="img" 
                        image={getImageUrl(trendingImage)} 
                        alt={item.title || 'Trending'} 
                        sx={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          display: 'block' // Ensure consistent display
                        }} 
                      />
                </Card>
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: -10, 
                      left: -8, 
                      fontWeight: 900, 
                      fontSize: 22, 
                      color: '#111', 
                      lineHeight: 1, 
                      zIndex: 2, 
                      background: 'rgba(255,255,255,0.95)', 
                      borderRadius: '50%', 
                      width: 30, 
                      height: 30, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      boxShadow: 2 
                    }}>
                  {idx + 1}
                </Box>
              </Box>
                </Link>
            </Grow>
            );
          })}
                  </Box>
                </Box>
              );
            
            case 'banner':
              return (
                <Box key={`banner-${sectionIndex}`} sx={{ p: 2, pt: 0 }}>
                  <Box sx={{ mt: 0 }} />
                  <Fade in={true} timeout={500}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black', lineHeight: 1.6 }}>
                      Banner
                    </Typography>
                  </Fade>
                  <Fade in={true} timeout={500}>
                    <Box sx={{ mb: 1.5, position: 'relative' }}>
                      <Slider {...sliderSettings} className="banner-slider">
                        {bannerSlides.map((slide, idx) => (
                <Paper key={idx} elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', position: 'relative', minHeight: 120 }}>
                  <Box sx={{ position: 'relative', height: 160, bgcolor: '#000' }}>
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
                </Box>
              );
              
            case 'threads':
              return (
                <Box key={`threads-${sectionIndex}`} sx={{ p: 2, pt: 0 }}>
                  <Box sx={{ mt: 1.5 }} />
                  <Fade in={true} timeout={700}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>
                      Threads
                    </Typography>
                  </Fade>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      overflowX: 'auto',
                      mb: 1.5,
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
                </Box>
              );
              
            case 'mall':
              return (
                <Box key={`mall-${sectionIndex}`} sx={{ p: 2, pt: 0 }}>
                  <Box sx={{ mt: 1.5 }} />
                  <Fade in={true} timeout={800}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black', lineHeight: 'normal' }}>
                      Mall
                    </Typography>
                  </Fade>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      overflowX: 'auto',
                      mb: 1.5,
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
                </Box>
              );
              
            case 'novel':
              return (
                <Box key={`novel-${sectionIndex}`} sx={{ p: 2, pt: 0 }}>
                  <Box sx={{ mt: 1.5 }} />
                  <Fade in={true} timeout={1000}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>
                      Read Novel
                    </Typography>
                  </Fade>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      overflowX: 'auto',
                      mb: 1.5,
                      pb: 1,
                      px: 1,
                      scrollbarWidth: 'none',
                      '&::-webkit-scrollbar': { display: 'none' },
                      scrollBehavior: 'smooth',
                    }}
                  >
                    {loading ? (
                      <Typography sx={{ p: 2 }}>Loading graphic novels...</Typography>
                    ) : graphicNovels.length === 0 ? (
                      <Typography sx={{ p: 2 }}>No graphic novels found.</Typography>
                    ) : graphicNovels.map((item, idx) => {
              // Get Novel Image: Use novelIcon or first episode's iconPath as fallback
              const novelImage = item.novelIcon || 
                               (item.episodes && item.episodes.length > 0 ? item.episodes[0].iconPath : null) ||
                               paika.src; // fallback to static image
              
              // Get Novel Title
              const novelTitle = item.title || 'Untitled Novel';
              
              return (
                <Grow in={true} timeout={400 + idx * 80} key={item.id || idx}>
                  <Link href={`/novel/${item.id}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                        width: 140, // Fixed width to match Trending cards
                        height: 150, // Fixed height to match Trending cards
                        minWidth: 140, // Ensure consistent minimum width
                        maxWidth: 140, // Ensure consistent maximum width
                  flexShrink: 0,
                  textDecoration: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                }}
              >
                      <Card sx={{ 
                        borderRadius: 3, 
                        overflow: 'hidden', 
                        width: '100%', 
                        height: '100%', 
                        boxShadow: 3, 
                        position: 'relative',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        }
                      }}>
                        {/* Novel Image */}
                        <CardMedia 
                          component="img" 
                          image={getImageUrl(novelImage)} 
                          alt={novelTitle} 
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        {/* Novel Title Overlay */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                            color: 'white',
                            p: 1,
                            pt: 2,
                          }}
                        >
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontSize: '0.75rem', 
                              fontWeight: 600,
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {novelTitle}
                          </Typography>
                        </Box>
                </Card>
              </Box>
                  </Link>
            </Grow>
                      );
                    })}
                  </Box>
                </Box>
              );
              
            default:
              return null;
          }
        })}
        
        {/* Observer element for infinite scroll */}
        <Box ref={observerRef} sx={{ height: 20, width: '100%', mb: 2 }} />
        
        <Footer />
      </Box>
    </Box>
  );
} 