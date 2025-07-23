'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '../../Footer';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function NovelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [novelData, setNovelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchNovelData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.ahamcore.com/api/user/graphic-novel/${params.id}`);
        setNovelData(response.data.graphicNovel);
        setError(null);
      } catch (err) {
        console.error('Error fetching novel data:', err);
        setError('Failed to load novel data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNovelData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!novelData) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <Alert severity="warning" sx={{ maxWidth: 400 }}>
          No novel data found.
        </Alert>
      </Box>
    );
  }

  // Helper function to construct full image URL
  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `https://api.ahamcore.com${path}`;
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
                backgroundImage: novelData.novelIcon ? `url(${getImageUrl(novelData.novelIcon)})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
              <Typography variant="h4" fontWeight="bold" sx={{ fontSize: '1.5rem' }}>
                {novelData.title || 'Novel Title'}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                By {novelData.role === 'creator' ? 'Creator' : novelData.role || 'Unknown'}
              </Typography>
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
              {novelData.episodes && novelData.episodes.length > 0 ? (
                novelData.episodes.map((episode, index) => (
                  <Link href={`/novel/${params.id}/${episode.id}`} passHref key={episode.id}>
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
                        <Avatar 
                          variant="rounded" 
                          src={getImageUrl(episode.iconPath)} 
                          sx={{ width: 60, height: 60, mr: 2 }} 
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Episode ${episode.episodeNumber}`}
                        secondary={
                          <Typography
                            component="span"
                            variant="h6"
                            color="text.primary"
                            fontWeight="bold"
                            sx={{ fontSize: '1rem' }}
                          >
                            {episode.title || `Episode ${episode.episodeNumber}`}
                          </Typography>
                        }
                        primaryTypographyProps={{ color: 'text.secondary', mb: 0.5, fontSize: '0.8rem' }}
                        secondaryTypographyProps={{ component: 'div' }}
                      />
                    </ListItem>
                    {index < novelData.episodes.length - 1 && <Divider variant="inset" component="li" />}
                  </Link>
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">No episodes available</Typography>
                </Box>
              )}
            </List>
          )}

          {tabValue === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {novelData.previewImages && novelData.previewImages.length > 0 ? (
                novelData.previewImages.map((image, index) => (
                  <Box 
                    key={index}
                    component="img" 
                    src={getImageUrl(image.url || image)} 
                    alt={`Preview ${index + 1}`} 
                    sx={{ width: '100%', height: 'auto' }} 
                  />
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No preview images available for this novel
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    You can view episode content by selecting an episode from the Episodes tab
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
} 