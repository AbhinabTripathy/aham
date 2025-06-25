'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Box, Typography, Card, CardContent, CardMedia, Grow, Fade } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

function getImageUrl(path) {
  if (!path) return '/fallback.png';
  if (path.startsWith('/uploads')) {
    return `https://api.ahamcore.com${path}`;
  }
  return path;
}

export default function Novel() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('https://api.ahamcore.com/api/user/graphic-novels');
        setNovels(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        setError('Failed to load novels.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Trending: first 10
  const trending = novels.slice(0, 10);
  // New Release: 10 most recently published novels
  const newReleases = [...novels]
    .filter(item => item.publishedAt)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 10);
  // Most read novels: all
  const mostReadNovels = novels;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header selectedNav="novel" searchPlaceholder="Novels" />
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
            gap: 2.5,
            overflowX: 'auto',
            mb: 2,
            pb: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          {trending.length === 0 ? (
            <Typography sx={{ p: 2 }}>No trending novels found.</Typography>
          ) : trending.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item.id || idx}>
              <Link href={`/novel/${item.id}`} passHref>
                <Box
                  sx={{
                    minWidth: { xs: 80, sm: 120 },
                    height: { xs: 140, sm: 190 },
                    position: 'relative',
                    flexShrink: 0,
                    textDecoration: 'none',
                  }}
                >
                  <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff' }}>
                    <CardMedia component="img" image={getImageUrl(item.novelIcon)} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <Box sx={{ position: 'absolute', bottom: 8, left: 8, right: 8, px: 1, py: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.2 }}>{item.title}</Typography>
                      {item.role && <Typography variant="caption" sx={{ color: '#333', fontSize: 10 }}>{item.role}</Typography>}
                    </Box>
                  </Card>
                  <Box sx={{ position: 'absolute', bottom: -10, left: -8, fontWeight: 900, fontSize: { xs: 22, sm: 30 }, color: '#111', lineHeight: 1, zIndex: 2, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', width: { xs: 30, sm: 38 }, height: { xs: 30, sm: 38 }, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
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
            scrollBehavior: 'smooth',
          }}
        >
          {newReleases.length === 0 ? (
            <Typography sx={{ p: 2 }}>No new releases found.</Typography>
          ) : newReleases.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item.id || idx}>
              <Box
                sx={{
                  minWidth: { xs: 150, sm: 220 },
                  height: { xs: 70, sm: 100 },
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#f5f5f5',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Box sx={{ flex: 1, p: 1, zIndex: 2 }}>
                  <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 0.5, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#444', fontSize: { xs: 11, sm: 14 } }}>{item.role}</Typography>
                </Box>
                <Box sx={{ height: '100%', width: { xs: 60, sm: 120 }, position: 'relative', zIndex: 1 }}>
                  <img src={getImageUrl(item.novelIcon)} alt={item.title} style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
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
            scrollBehavior: 'smooth',
          }}
        >
          {mostReadNovels.length === 0 ? (
            <Typography sx={{ p: 2 }}>No most read novels found.</Typography>
          ) : mostReadNovels.map((item, idx) => (
            <Grow in={true} timeout={400 + idx * 80} key={item.id || idx}>
              <Box
                sx={{
                  minWidth: { xs: 120, sm: 180 },
                  height: { xs: 180, sm: 260 },
                  flexShrink: 0,
                }}
              >
                <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', height: '100%', boxShadow: 3, position: 'relative', bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardMedia component="img" image={getImageUrl(item.novelIcon)} alt={item.title} sx={{ width: '100%', height: { xs: 80, sm: 140 }, objectFit: 'cover' }} />
                  <CardContent sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, fontSize: { xs: 14, sm: 20 } }}>{item.title}</Typography>
                    {item.role && <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 500, fontSize: { xs: 11, sm: 14 } }}>{item.role}</Typography>}
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