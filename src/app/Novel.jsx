'use client';
import React from 'react';
import Header from './Header';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Paper, Grow, Fade } from '@mui/material';
import paika from './assets/images/Paika.png';
import Link from 'next/link';

const trending = [
  { id: 1, img: paika },
  { id: 2, img: paika },
  { id: 3, img: paika },
  { id: 4, img: paika },
  { id: 5, img: paika },
  { id: 6, img: paika },
  { id: 7, img: paika },
  { id: 8, img: paika },
  { id: 9, img: paika },
  { id: 10, img: paika },
  { id: 11, img: paika },
  { id: 12, img: paika },
  { id: 13, img: paika },
  { id: 14, img: paika },
  { id: 15, img: paika },
  { id: 16, img: paika },
];

const newReleases = [
  { img: paika, title: 'Novel Title 1', author: 'Author 1', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 2', author: 'Author 2', bg: '#b3e0ff' },
  { img: paika, title: 'Novel Title 3', author: 'Author 3', bg: '#b3e0ff' },
  { img: paika, title: 'Novel Title 4', author: 'Author 4', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 5', author: 'Author 5', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 6', author: 'Author 6', bg: '#b3e0ff' },
  { img: paika, title: 'Novel Title 7', author: 'Author 7', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 8', author: 'Author 8', bg: '#b3e0ff' },
  { img: paika, title: 'Novel Title 9', author: 'Author 9', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 10', author: 'Author 10', bg: '#b3e0ff' },
  { img: paika, title: 'Novel Title 11', author: 'Author 11', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 12', author: 'Author 12', bg: '#b3e0ff' },
  { img: paika, title: 'Novel Title 13', author: 'Author 13', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 14', author: 'Author 14', bg: '#b3e0ff' },
  { img: paika, title: 'Novel Title 15', author: 'Author 15', bg: '#7bc47f' },
  { img: paika, title: 'Novel Title 16', author: 'Author 16', bg: '#b3e0ff' },
];

const mostReadNovels = [
  { img: paika, title: 'Paika Novel 1', author: 'Author 1', desc: 'Description 1', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 2', author: 'Author 2', desc: 'Description 2', bg: '#b3e0ff' },
  { img: paika, title: 'Paika Novel 3', author: 'Author 3', desc: 'Description 3', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 4', author: 'Author 4', desc: 'Description 4', bg: '#b3e0ff' },
  { img: paika, title: 'Paika Novel 5', author: 'Author 5', desc: 'Description 5', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 6', author: 'Author 6', desc: 'Description 6', bg: '#b3e0ff' },
  { img: paika, title: 'Paika Novel 7', author: 'Author 7', desc: 'Description 7', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 8', author: 'Author 8', desc: 'Description 8', bg: '#b3e0ff' },
  { img: paika, title: 'Paika Novel 9', author: 'Author 9', desc: 'Description 9', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 10', author: 'Author 10', desc: 'Description 10', bg: '#b3e0ff' },
  { img: paika, title: 'Paika Novel 11', author: 'Author 11', desc: 'Description 11', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 12', author: 'Author 12', desc: 'Description 12', bg: '#b3e0ff' },
  { img: paika, title: 'Paika Novel 13', author: 'Author 13', desc: 'Description 13', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 14', author: 'Author 14', desc: 'Description 14', bg: '#b3e0ff' },
  { img: paika, title: 'Paika Novel 15', author: 'Author 15', desc: 'Description 15', bg: '#ffe082' },
  { img: paika, title: 'Paika Novel 16', author: 'Author 16', desc: 'Description 16', bg: '#b3e0ff' },
];

export default function Novel() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header selectedNav="novel" searchPlaceholder="Novels" />
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
          }}
        >
          {trending.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Link href={`/novel/${item.id}`} passHref>
                <Box
                  sx={{
                    minWidth: idx === 3 || idx === 7 ? 'calc(10% - 14px)' : 'calc(12.5% - 14px)',
                    height: { xs: 140, sm: 190 },
                    position: 'relative',
                    flexShrink: 0,
                    textDecoration: 'none',
                  }}
                >
                  <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff' }}>
                    <CardMedia component="img" image={item.img?.src ? item.img.src : item.img} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <Box sx={{ position: 'absolute', bottom: 8, left: 8, right: 8, px: 1, py: 0.5}}>
                      <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.2 }}>{item.title}</Typography>
                    </Box>
                  </Card>
                  <Box sx={{ position: 'absolute', bottom: -10, left: -8, fontWeight: 900, fontSize: { xs: 20, sm: 32 }, color: '#111', lineHeight: 1, zIndex: 2, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', width: { xs: 20, sm: 28 }, height: { xs: 20, sm: 28 }, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
                    {idx + 1}
                  </Box>
                </Box>
              </Link>
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
          }}
        >
          {newReleases.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: idx === 3 || idx === 7 ? 'calc(10% - 14px)' : 'calc(12.5% - 14px)',
                  height: { xs: 70, sm: 100 },
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
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: { xs: 11, sm: 14 } }}>{item.author}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: { xs: 60, sm: 120 }, position: 'relative', zIndex: 1 }}>
                  <img src={item.img?.src ? item.img.src : item.img} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>

        {/* Most read novels */}
        <Box sx={{ mt: 5 }} />
        <Fade in={true} timeout={800}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Most read novels</Typography></Fade>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {mostReadNovels.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={idx}>
              <Box
                sx={{
                  minWidth: idx === 0 || idx === 1 || idx === 4 || idx === 5 ? 'calc(10% - 14px)' : 'calc(12.5% - 14px)',
                  height: { xs: 180, sm: 260 },
                  flexShrink: 0,
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardMedia component="img" image={item.img?.src ? item.img.src : item.img} alt={item.title} sx={{ width: '100%', height: { xs: 80, sm: 140 }, objectFit: 'cover' }} />
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