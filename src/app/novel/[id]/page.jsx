'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

const episodes = [
  { num: 1, title: 'Gajapati Legacy', img: paika.src },
  { num: 2, title: 'The Siege of Sovereignty', img: paika.src },
  { num: 3, "title": "The Rajguru's Wrath", img: paika.src },
  { num: 4, title: 'The Oppression of Empire', img: paika.src },
  { num: 5, title: 'The Making of a Rebel', img: paika.src },
  { num: 6, title: 'The Rebellion Erupts', img: paika.src },
  { num: 7, title: 'The People Rise', img: paika.src },
  { num: 8, title: 'The Aftermath Begins', img: paika.src },
  { num: 9, title: 'Guerrilla Years', img: paika.src },
  { num: 10, title: 'The End and the Echo', img: paika.src },
];

export default function NovelDetailPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={4} sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <Box 
          sx={{ 
            height: { xs: 200, sm: 250 }, 
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
          <IconButton onClick={() => router.back()} sx={{ color: 'white', zIndex: 2, position: 'absolute', top: 16, left: 16 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ zIndex: 2, p: 2, alignSelf: 'flex-start', mt: 'auto' }}>
            <Typography variant="h4" fontWeight="bold">PAIKA REVOLUTION</Typography>
            <Typography variant="subtitle1">By Vinit kumar</Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="episodes and preview tabs"
            variant="fullWidth"
            indicatorColor="primary"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
                height: '4px',
              },
               '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                color: 'text.secondary',
              },
              '& .Mui-selected': {
                color: '#1976d2 !important',
              }
            }}
          >
            <Tab label="Episodes" />
            <Tab label="Preview" />
          </Tabs>
        </Box>
      </Paper>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {tabValue === 0 && (
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            {episodes.map((episode, index) => (
              <React.Fragment key={episode.num}>
                <ListItem alignItems="center" sx={{ py: 2, px: 2 }}>
                  <ListItemAvatar>
                    <Avatar variant="rounded" src={episode.img} sx={{ width: {xs: 60, sm: 80}, height: {xs: 60, sm: 80}, mr: 2 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Episode ${episode.num}`}
                    secondary={
                      <Typography
                        component="span"
                        variant="h6"
                        color="text.primary"
                        fontWeight="bold"
                      >
                        {episode.title}
                      </Typography>
                    }
                    primaryTypographyProps={{ color: 'text.secondary', mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                    secondaryTypographyProps={{ component: 'div', fontSize: { xs: '1rem', sm: '1.2rem' } }}
                  />
                </ListItem>
                {index < episodes.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
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
    </Box>
  );
} 