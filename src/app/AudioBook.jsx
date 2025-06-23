'use client';
import React from 'react';
import Header from './Header';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Paper, Grow, Fade } from '@mui/material';
import { useRouter } from 'next/navigation';

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
const duplicatedTrending = [...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending, ...trending];

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
  { img: '/anime1.png', title: 'Title 15', author: 'Author 15', bg: '#7bc47f' },
  // { img: '/anime2.png', title: 'Title 16', author: 'Author 16', bg: '#b3e0ff' },
];
const duplicatedNewReleases = [...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases, ...newReleases];

const mostListenAudio = [
  { img: '/satyayug.png', title: 'Satyayug 1', author: 'Author 1', desc: 'Description 1', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 1', author: 'Author 2', desc: 'Description 2', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 2', author: 'Author 3', desc: 'Description 3', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 2', author: 'Author 4', desc: 'Description 4', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 3', author: 'Author 5', desc: 'Description 5', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 3', author: 'Author 6', desc: 'Description 6', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 4', author: 'Author 7', desc: 'Description 7', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 4', author: 'Author 8', desc: 'Description 8', bg: '#b3e0ff' },
  { img: '/satyayug.png', title: 'Satyayug 5', author: 'Author 9', desc: 'Description 9', bg: '#ffe082' },
  { img: '/yogi3000.png', title: 'Yogi 3000 5', author: 'Author 10', desc: 'Description 10', bg: '#b3e0ff' },
];
const duplicatedMostListenAudio = [...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio, ...mostListenAudio];

export default function AudioBook() {
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/audiobook/${id}`);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header selectedNav="audiobook" searchPlaceholder="Audiobooks" />
      <Box sx={{ height: 28 }} />
      <Box sx={{ p: 2, pt: 0 }}>
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
          {duplicatedTrending.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                onClick={() => handleCardClick(idx + 1)}
                sx={{
                  minWidth: { xs: 80, sm: 120 },
                  height: { xs: 140, sm: 190 },
                  position: 'relative',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff' }}>
                  <CardMedia component="img" image={item.img} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', bottom: 8, left: 8, right: 8, px: 1, py: 0.5, bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.2 }}>{item.title}</Typography>
                  </Box>
                </Card>
                <Box sx={{ position: 'absolute', bottom: -10, left: -8, fontWeight: 900, fontSize: { xs: 22, sm: 30 }, color: '#111', lineHeight: 1, zIndex: 2, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', width: { xs: 30, sm: 38 }, height: { xs: 30, sm: 38 }, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
                  {(idx % trending.length) + 1}
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
          {duplicatedNewReleases.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                onClick={() => handleCardClick(idx + 1)}
                sx={{
                  minWidth: { xs: 150, sm: 220 },
                  height: { xs: 70, sm: 100 },
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: item.bg,
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
                  <Typography variant="body2" sx={{ color: '#444', fontSize: { xs: 11, sm: 14 } }}>{item.author}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: { xs: 60, sm: 120 }, position: 'relative', zIndex: 1 }}>
                  <img src={item.img} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
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
          {duplicatedMostListenAudio.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                onClick={() => handleCardClick(idx + 1)}
                sx={{
                  minWidth: { xs: 120, sm: 180 },
                  height: { xs: 180, sm: 260 },
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardMedia component="img" image={item.img} alt={item.title} sx={{ width: '100%', height: { xs: 80, sm: 140 }, objectFit: 'cover' }} />
                  <CardContent sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                    {item.author && <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 500, fontSize: { xs: 11, sm: 14 } }}>{item.author}</Typography>}
                    <Typography variant="body2" sx={{ color: '#333', fontSize: { xs: 11, sm: 14 } }}>{item.desc}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grow>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 