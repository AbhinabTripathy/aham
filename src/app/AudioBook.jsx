'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Paper, Grow, Fade } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Commented out all previous code for Coming Soon page
/*
const trending = [
  { img: '/satyayug.png', title: 'Satyayug 1' },
  { img: '/yogi3000.png', title: 'Yogi 3000 1' },
  { img: '/satyayug.png', title: 'Satyayug 2' },
  { img: '/yogi3000.png', title: 'Yogi 3000 2' },
  { img: '/satyayug.png', title: 'Satyayug 3' },
  { img: '/yogi3000.png', title: 'Yogi 3000 3' },
  { img: '/satyayug.png', title: 'Satyayug 4' },
  { img: '/yogi3000.png', title: 'Yogi 3000 4' },
  { img: '/satyayug.png', title: 'Satyayug 5' },
  { img: '/yogi3000.png', title: 'Yogi 3000 5' },
];
const duplicatedTrending = [...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending];

function getImageUrl(path) {
  if (!path) return '/fallback.png';
  if (path.startsWith('/uploads')) {
    return `https://api.ahamcore.com${path}`;
  }
  return path;
}
*/

export default function AudioBook() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate countdown to August 27th, 2025
  useEffect(() => {
    const targetDate = new Date('2025-08-27T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateTimer();
    
    // Update every second
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);
  
  // Commented out all previous state and useEffect
  /*
  const [audioBooks, setAudioBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('https://api.ahamcore.com/api/user/audiobooks');
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        console.log('Fetched audiobooks:', data.length, 'items');
        console.log('Audiobooks with bookIcon:', data.filter(item => item.bookIcon).length);
        setAudioBooks(data);
      } catch (err) {
        console.error('Error fetching audiobooks:', err);
        setError('Failed to load audiobooks.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Trending: first 10 audiobooks with bookIcon
  const trending = audioBooks.filter(item => item.bookIcon).slice(0, 10);
  // New Release: use audiobooks that are not in trending, or all audiobooks if not enough
  const audiobooksWithIcon = audioBooks.filter(item => item.bookIcon);
  const newReleases = audiobooksWithIcon.length > 10 ? audiobooksWithIcon.slice(10, 20) : 
                     audiobooksWithIcon.length > 5 ? audiobooksWithIcon.slice(5, 15) :
                     audioBooks.slice(5, 15); // Use all audiobooks if not enough with bookIcon
  // Most Listening: next 10 audiobooks with bookIcon, or all remaining if less than 10
  const mostListening = audioBooks.filter(item => item.bookIcon).slice(20, 30);
  // Most Listen Audio: all audiobooks
  const mostListenAudio = audioBooks;

  const handleCardClick = (id) => {
    router.push(`/audiobook/${id}`);
  };
  */

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: '#fff' }}>
        <Header selectedNav="audiobook" searchPlaceholder="Audiobooks" />
      </Box>
      <Box sx={{ height: 16 }} />
      
      {/* Main Content Container - Coming Soon */}
      <Box sx={{ 
        maxWidth: 480, 
        mx: 'auto', 
        bgcolor: '#fff',
        minHeight: 'calc(100vh - 111px)',
        boxShadow: { xs: 'none', sm: '0 0 20px rgba(0,0,0,0.1)' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pb: 0
      }}>
        {/* Coming Soon Content */}
        <Box sx={{ 
          p: 4, 
          textAlign: 'center',
          maxWidth: 400,
          mx: 'auto'
        }}>
          {/* Rocket Icon */}
          <Fade in={true} timeout={600}>
            <Typography 
              sx={{ 
                fontSize: { xs: 60, sm: 80 },
                mb: 3,
                display: 'block'
              }}
            >
              🚀
            </Typography>
          </Fade>

          {/* Coming Soon Text */}
          <Fade in={true} timeout={800}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#333',
                mb: 3,
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            >
              Something Special is Coming Soon
            </Typography>
          </Fade>

          {/* Launch Date */}
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                color: '#0066d6',
                mb: 2,
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }}
            >
              27th of August 2025
            </Typography>
          </Fade>

          {/* Countdown Timer */}
          <Fade in={true} timeout={1200}>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 0.5, sm: 1, md: 2 }, 
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
              width: '100%',
              maxWidth: { xs: 320, sm: 400, md: 480 },
              mx: 'auto'
            }}>
              {/* Days */}
              <Box sx={{ 
                textAlign: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <Box sx={{
                  bgcolor: '#0066d6',
                  color: 'white',
                  borderRadius: { xs: 1.5, sm: 2 },
                  p: { xs: 1, sm: 1.5, md: 2 },
                  mb: 1,
                  boxShadow: 3,
                  transform: timeLeft.seconds % 4 === 0 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                  width: '100%'
                }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '1.3rem', md: '1.8rem' },
                      lineHeight: 1
                    }}
                  >
                    {timeLeft.days.toString().padStart(2, '0')}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#666',
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                    display: 'block'
                  }}
                >
                  DAYS
                </Typography>
              </Box>

              {/* Hours */}
              <Box sx={{ 
                textAlign: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <Box sx={{
                  bgcolor: '#28a745',
                  color: 'white',
                  borderRadius: { xs: 1.5, sm: 2 },
                  p: { xs: 1, sm: 1.5, md: 2 },
                  mb: 1,
                  boxShadow: 3,
                  transform: timeLeft.seconds % 4 === 1 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                  width: '100%'
                }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '1.3rem', md: '1.8rem' },
                      lineHeight: 1
                    }}
                  >
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#666',
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                    display: 'block'
                  }}
                >
                  HOURS
                </Typography>
              </Box>

              {/* Minutes */}
              <Box sx={{ 
                textAlign: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <Box sx={{
                  bgcolor: '#ffc107',
                  color: 'white',
                  borderRadius: { xs: 1.5, sm: 2 },
                  p: { xs: 1, sm: 1.5, md: 2 },
                  mb: 1,
                  boxShadow: 3,
                  transform: timeLeft.seconds % 4 === 2 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                  width: '100%'
                }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '1.3rem', md: '1.8rem' },
                      lineHeight: 1
                    }}
                  >
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#666',
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                    display: 'block'
                  }}
                >
                  MINUTES
                </Typography>
              </Box>

              {/* Seconds */}
              <Box sx={{ 
                textAlign: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <Box sx={{
                  bgcolor: '#dc3545',
                  color: 'white',
                  borderRadius: { xs: 1.5, sm: 2 },
                  p: { xs: 1, sm: 1.5, md: 2 },
                  mb: 1,
                  boxShadow: 3,
                  transform: timeLeft.seconds % 4 === 3 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                  width: '100%'
                }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '1.3rem', md: '1.8rem' },
                      lineHeight: 1,
                      animation: 'pulse-number 1s infinite'
                    }}
                  >
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#666',
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                    display: 'block'
                  }}
                >
                  SECONDS
                </Typography>
              </Box>
            </Box>
          </Fade>

          {/* Decorative Elements */}
          <Fade in={true} timeout={1400}>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                bgcolor: '#0066d6',
                animation: 'pulse 2s infinite'
              }} />
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                bgcolor: '#0066d6',
                animation: 'pulse 2s infinite 0.5s'
              }} />
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                bgcolor: '#0066d6',
                animation: 'pulse 2s infinite 1s'
              }} />
            </Box>
          </Fade>
        </Box>

        {/* Footer at bottom */}
        <Box sx={{ mt: 'auto', width: '100%' }}>
          <Footer />
        </Box>

        {/* CSS Animation */}
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
          
          @keyframes pulse-number {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(0.95);
            }
          }
        `}</style>
      </Box>

      {/* Commented out all previous content */}
      {/*
      <Box sx={{ 
        maxWidth: 480, 
        mx: 'auto', 
        bgcolor: '#fff',
        minHeight: 'calc(100vh - 111px)',
        boxShadow: { xs: 'none', sm: '0 0 20px rgba(0,0,0,0.1)' },
        position: 'relative',
        pb: 0
      }}>
        <Box sx={{ p: 2, pt: 0 }}>
        {loading ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography>Loading...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : <>
        <Box sx={{ mt: 2 }} />
        <Fade in={true} timeout={600}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Trending</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {trending.length === 0 ? (
            <Typography sx={{ p: 2 }}>No trending audiobooks found.</Typography>
          ) : trending.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item.id || idx}>
              <Box
                onClick={() => handleCardClick(item.id)}
                sx={{
                  minWidth: 120,
                  height: 150,
                  position: 'relative',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff' }}>
                  <CardMedia component="img" image={getImageUrl(item.bookIcon)} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', bottom: 8, left: 8, right: 8, px: 1, py: 0.5, bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.2 }}>{item.title}</Typography>
                  </Box>
                </Card>
                <Box sx={{ position: 'absolute', bottom: -10, left: -8, fontWeight: 900, fontSize: 22, color: '#111', lineHeight: 1, zIndex: 2, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
                  {idx + 1}
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>

        <Box sx={{ mt: 2.5 }} />
        <Fade in={true} timeout={700}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>New Release</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {newReleases.length === 0 ? (
            <Typography sx={{ p: 2 }}>No new releases found.</Typography>
          ) : newReleases.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item.id || idx}>
              <Box
                onClick={() => handleCardClick(item.id)}
                sx={{
                  minWidth: 120,
                  maxWidth: 160,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: idx % 2 === 0 ? '#7bc47f' : '#b3e0ff',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ flex: 1, p: 1, zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: 14 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: 11 }}>{item.author || 'Unknown Author'}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: 60, position: 'relative', zIndex: 1 }}>
                  <img src={getImageUrl(item.bookIcon || item.image || '/fallback.png')} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>

        <Box sx={{ mt: 2.5 }} />
        <Fade in={true} timeout={800}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Most listen audio</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {mostListenAudio.length === 0 ? (
            <Typography sx={{ p: 2 }}>No audiobooks found.</Typography>
          ) : mostListenAudio.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item.id || idx}>
              <Box
                onClick={() => handleCardClick(item.id)}
                sx={{
                  minWidth: 100,
                  maxWidth: 140,
                  height: 150,
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardMedia component="img" image={getImageUrl(item.bookIcon)} alt={item.title} sx={{ width: '100%', height: 80, objectFit: 'cover' }} />
                  <CardContent sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, fontSize: 14 }}>{item.title}</Typography>
                    {item.author && <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 500, fontSize: 11 }}>{item.author}</Typography>}
                    <Typography variant="body2" sx={{ color: '#333', fontSize: 11 }}>{item.description || 'No description available'}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grow>
          ))}
        </Box>
        </>}
        <Footer />
        </Box>
      </Box>
      */}
    </Box>
  );
} 