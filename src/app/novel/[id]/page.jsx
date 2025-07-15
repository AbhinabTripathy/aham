'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '../../Footer';
import paika from '../../assets/images/Paika.png';
import previewMain from '../../assets/images/Preview Main.png';
import preview1 from '../../assets/images/Previw1.jpeg';
import preview2 from '../../assets/images/Preview 2.jpeg';
import preview3 from '../../assets/images/Preview 3.jpeg';
import preview4 from '../../assets/images/Preview 4.jpeg';
import preview5 from '../../assets/images/Preview 5.jpeg';
import preview6 from '../../assets/images/Preview 6.jpeg';
import preview7 from '../../assets/images/Preview 7.jpeg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const episodes = [
  { id: 1, num: 1, title: 'Gajapati Legacy', img: paika.src },
  { id: 2, num: 2, title: 'The Siege of Sovereignty', img: paika.src },
  { id: 3, "title": "The Rajguru's Wrath", img: paika.src },
  { id: 4, num: 4, title: 'The Oppression of Empire', img: paika.src },
  { id: 5, num: 5, title: 'The Making of a Rebel', img: paika.src },
  { id: 6, num: 6, title: 'The Rebellion Erupts', img: paika.src },
  { id: 7, num: 7, title: 'The People Rise', img: paika.src },
  { id: 8, num: 8, title: 'The Aftermath Begins', img: paika.src },
  { id: 9, num: 9, title: 'Guerrilla Years', img: paika.src },
  { id: 10, num: 10, title: 'The End and the Echo', img: paika.src },
];

export default function NovelDetailPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={4} sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <Box 
            sx={{ 
              height: 180, 
              position: 'relative', 
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${paika.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6)',
                zIndex: 1,
              }}
            />
            <IconButton onClick={() => router.back()} sx={{ color: 'white', zIndex: 2, position: 'absolute', top: 12, left: 12 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ zIndex: 2, p: 2, alignSelf: 'flex-start', mt: 'auto' }}>
              <Typography variant="h4" fontWeight="bold" sx={{ fontSize: '1.5rem' }}>PAIKA REVOLUTION</Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>By Vinit kumar</Typography>
            </Box>
          </Box>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="episodes and preview tabs"
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Episodes" sx={{ fontSize: '0.9rem' }} />
              <Tab label="Preview" sx={{ fontSize: '0.9rem' }} />
            </Tabs>
          </Box>
        </Paper>
        
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {tabValue === 0 && (
            <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
              {episodes.map((episode, index) => (
                <Link href={`/novel/1/${episode.id}`} passHref key={episode.id}>
                  <ListItem
                    alignItems="center"
                    sx={{
                      py: 1.5,
                      px: 1.5,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar variant="rounded" src={episode.img} sx={{ width: 60, height: 60, mr: 2 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Episode ${episode.num}`}
                      secondary={
                        <Typography
                          component="span"
                          variant="h6"
                          color="text.primary"
                          fontWeight="bold"
                          sx={{ fontSize: '1rem' }}
                        >
                          {episode.title}
                        </Typography>
                      }
                      primaryTypographyProps={{ color: 'text.secondary', mb: 0.5, fontSize: '0.8rem' }}
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                  {index < episodes.length - 1 && <Divider variant="inset" component="li" />}
                </Link>
              ))}
            </List>
          )}

          {tabValue === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box component="img" src={previewMain.src} alt="Preview Main" sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={preview1.src} alt="Preview 1" sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={preview2.src} alt="Preview 2" sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={preview3.src} alt="Preview 3" sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={preview4.src} alt="Preview 4" sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={preview5.src} alt="Preview 5" sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={preview6.src} alt="Preview 6" sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={preview7.src} alt="Preview 7" sx={{ width: '100%', height: 'auto' }} />
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
} 