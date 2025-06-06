'use client';
import React from 'react';
import Header from './Header';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Paper, Grow, Fade } from '@mui/material';

const trending = [
  { img: '/mahabharat.png', title: 'MAHABHARAT' },
  { img: '/parshuram.png', title: 'PARSHURAM' },
  { img: '/paika-story.png', title: 'PAIKA STORY' },
  { img: '/gentleman-from-sirius.png', title: 'THE GENTLEMAN FROM SIRIUS' },
  { img: '/mahabharat.png', title: 'MAHABHARAT' },
  { img: '/parshuram.png', title: 'PARSHURAM' },
  { img: '/paika-story.png', title: 'PAIKA STORY' },
  { img: '/gentleman-from-sirius.png', title: 'THE GENTLEMAN FROM SIRIUS' },
];

const newReleases = [
  { img: '/yogi3000.png', title: 'Yogi 3000', author: 'Author', bg: '#ffb47b' },
  { img: '/vedas.png', title: 'Vedas', author: 'Author', bg: '#ffe082' },
  { img: '/satyayug.png', title: 'Satyayug', author: 'Author', bg: '#e6e6b3' },
  { img: '/bhisma.png', title: 'Bhisma', author: 'Author', bg: '#7bc47f' },
  { img: '/yogi3000.png', title: 'Yogi 3000', author: 'Author', bg: '#ffb47b' },
  { img: '/vedas.png', title: 'Vedas', author: 'Author', bg: '#ffe082' },
];

const mostListenAudio = [
  { img: '/barbarik.png', title: 'BARBARIK', author: 'THE LAST OATH', desc: 'The son of Ghatotkacha. The vow that halted a war.' },
  { img: '/kanjipani-ghati.png', title: 'THE FIRE SPIRIT OF KANJIPANI GHATI', author: '', desc: 'The forest whisper, The mountain watches.' },
  { img: '/bakshi.png', title: 'BAKSHI', author: 'THE SWORD OF REBELLION', desc: 'Before 1857, there was 1817.' },
  { img: '/barbarik.png', title: 'BARBARIK', author: '', desc: 'The vow that halted a war.' },
  { img: '/barbarik.png', title: 'BARBARIK', author: 'THE LAST OATH', desc: 'The son of Ghatotkacha. The vow that halted a war.' },
  { img: '/kanjipani-ghati.png', title: 'THE FIRE SPIRIT OF KANJIPANI GHATI', author: '', desc: 'The forest whisper, The mountain watches.' },
];

export default function AudioBook() {
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
                  <CardMedia component="img" image={item.img} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', bottom: 8, left: 8, right: 8, px: 1, py: 0.5, bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#111', fontWeight: 700, fontSize: 12, textAlign: 'center', lineHeight: 1.2 }}>{item.title}</Typography>
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
                  minWidth: { xs: 180, sm: 180 },
                  width: { xs: 180, sm: 180 },
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
        {/* Most listen audio */}
        <Box sx={{ mt: 5 }} />
        <Fade in={true} timeout={800}><Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'black' }}>Most listen audio</Typography></Fade>
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
                  minWidth: { xs: 140, sm: 180 },
                  width: { xs: 140, sm: 180 },
                  height: { xs: 180, sm: 260 },
                  mr: { xs: 2, sm: 0 },
                  flex: { xs: '0 0 auto', sm: 'unset' },
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