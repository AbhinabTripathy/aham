'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Paper, Grow, Fade } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

export default function AudioBook() {
  const router = useRouter();
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

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header selectedNav="audiobook" searchPlaceholder="Audiobooks" />
      <Box sx={{ height: 28 }} />
      <Box sx={{ p: 2, pt: 0 }}>
        {/* Loading/Error */}
        {loading ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography>Loading...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : <>
        {/* Trending */}
        <Box sx={{ mt: 5 }} />
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
                  minWidth: { xs: 80, sm: 120 },
                  height: { xs: 140, sm: 190 },
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
                <Box sx={{ position: 'absolute', bottom: -10, left: -8, fontWeight: 900, fontSize: { xs: 22, sm: 30 }, color: '#111', lineHeight: 1, zIndex: 2, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', width: { xs: 30, sm: 38 }, height: { xs: 30, sm: 38 }, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
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
                  minWidth: { xs: 150, sm: 220 },
                  height: { xs: 70, sm: 100 },
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
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: { xs: 11, sm: 14 } }}>{item.author || 'Unknown Author'}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: { xs: 60, sm: 120 }, position: 'relative', zIndex: 1 }}>
                  <img src={getImageUrl(item.bookIcon || item.image || '/fallback.png')} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>

        {/* Most listen audio */}
        <Box sx={{ mt: 5 }} />
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
                  minWidth: { xs: 120, sm: 180 },
                  height: { xs: 180, sm: 260 },
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardMedia component="img" image={getImageUrl(item.bookIcon)} alt={item.title} sx={{ width: '100%', height: { xs: 80, sm: 140 }, objectFit: 'cover' }} />
                  <CardContent sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                    {item.author && <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 500, fontSize: { xs: 11, sm: 14 } }}>{item.author}</Typography>}
                    <Typography variant="body2" sx={{ color: '#333', fontSize: { xs: 11, sm: 14 } }}>{item.description || 'No description available'}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grow>
          ))}
        </Box>
        </>}
      </Box>
    </Box>
  );
} 