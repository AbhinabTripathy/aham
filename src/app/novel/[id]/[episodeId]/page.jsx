'use client';
import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';
import paika from '../../../assets/images/Paika.png';

const episodes = [
  { id: 1, num: 1, title: 'Gajapati Legacy', img: paika.src },
  { id: 2, num: 2, title: 'The Siege of Sovereignty', img: paika.src },
  { id: 3, num: 3, title: "The Rajguru's Wrath", img: paika.src },
  { id: 4, num: 4, title: 'The Oppression of Empire', img: paika.src },
  { id: 5, num: 5, title: 'The Making of a Rebel', img: paika.src },
  { id: 6, num: 6, title: 'The Rebellion Erupts', img: paika.src },
  { id: 7, num: 7, title: 'The People Rise', img: paika.src },
  { id: 8, num: 8, title: 'The Aftermath Begins', img: paika.src },
  { id: 9, num: 9, title: 'Guerrilla Years', img: paika.src },
  { id: 10, num: 10, title: 'The End and the Echo', img: paika.src },
];

const comicPages = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  img: paika.src,
}));

export default function EpisodeReaderPage() {
  const router = useRouter();
  const params = useParams();
  const episodeId = parseInt(params.episodeId, 10);
  const episode = episodes.find((e) => e.id === episodeId);

  if (!episode) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Episode not found.</Typography>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={3}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'linear-gradient(45deg, #1A237E 0%, #283593 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          p: { xs: 1, sm: 1.5 },
          borderRadius: 0,
        }}
      >
        <IconButton onClick={() => router.back()} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ ml: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {episode.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
            Episode {episode.num}
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        {comicPages.map((page) => (
          <img
            key={page.id}
            src={page.img}
            alt={`Page ${page.id}`}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        ))}
      </Box>
    </Box>
  );
} 