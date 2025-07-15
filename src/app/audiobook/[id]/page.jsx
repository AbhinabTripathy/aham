'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Footer from '../../Footer';
import { Box, Typography, IconButton, Slider, Collapse, Modal, Card, CardContent, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export default function AudioBookDetails() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const episodes = [
    { title: 'Episode 1: Introduction', duration: '4:49', image: '/assets/preview-main.png' },
    { title: 'Episode 2: The Beginning', duration: '5:15', image: '/assets/preview-2.jpeg' },
    { title: 'Episode 3: The Journey', duration: '4:30', image: '/assets/preview-3.jpeg' },
    { title: 'Episode 4: The Challenge', duration: '6:20', image: '/assets/preview-4.jpeg' },
    { title: 'Episode 5: The Resolution', duration: '5:45', image: '/assets/preview-5.jpeg' },
  ];

  const subscriptionPlans = [
    {
      type: 'Normal',
      price: '₹499/month',
      features: [
        'Access to all episodes',
        'Standard quality audio',
        'Listen on one device'
      ],
      color: '#f5f5f5'
    },
    {
      type: 'Gold',
      price: '₹799/month',
      features: [
        'Access to all episodes',
        'High quality audio',
        'Listen on two devices',
        'Offline downloads'
      ],
      color: '#fff7e6'
    },
    {
      type: 'Premium',
      price: '₹999/month',
      features: [
        'Access to all episodes',
        'Ultra HD audio quality',
        'Listen on unlimited devices',
        'Offline downloads',
        'Early access to new releases'
      ],
      color: '#f0f7ff'
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEpisodeChange = (index) => {
    if (index > 2 && !selectedPlan) {
      setShowSubscriptionModal(true);
      return;
    }
    setCurrentEpisode(index);
    setProgress(0);
    setCurrentTime('0:00');
    setIsPlaying(false);
    setShowEpisodes(false);
  };

  const handleNextEpisode = () => {
    if (currentEpisode < episodes.length - 1) {
      handleEpisodeChange(currentEpisode + 1);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceedToPayment = () => {
    // Handle payment logic here
    setShowSubscriptionModal(false);
    // After successful payment, you can update the selectedPlan state
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Back Button */}
        <Box sx={{ 
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10
        }}>
          <IconButton 
            onClick={() => router.back()}
            sx={{ 
              color: '#000000',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Cover Image */}
        <Box sx={{
          width: '100%',
          height: '300px',
          position: 'relative'
        }}>
          <Image
            src={episodes[currentEpisode].image}
            alt={episodes[currentEpisode].title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        {/* Title and Episode Info */}
        <Box sx={{ 
          width: '100%',
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold',
            mb: 2,
            color: '#000000',
            textAlign: 'center',
            fontSize: '1.3rem'
          }}>
            {episodes[currentEpisode].title}
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ width: '100%', mx: 'auto', mb: 2 }}>
            <Slider
              value={progress}
              onChange={(_, value) => setProgress(value)}
              sx={{
                color: '#000000',
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  backgroundColor: '#000000',
                },
              }}
            />
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              px: 1
            }}>
              <Typography variant="body2" sx={{ color: '#000000', fontSize: '0.9rem' }}>{currentTime}</Typography>
              <Typography variant="body2" sx={{ color: '#000000', fontSize: '0.9rem' }}>{episodes[currentEpisode].duration}</Typography>
            </Box>
          </Box>

          {/* Controls */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
            mb: 3
          }}>
            <IconButton onClick={() => {}} sx={{ color: '#000000' }}>
              <Replay10Icon sx={{ fontSize: 35 }} />
            </IconButton>
            <IconButton 
              onClick={handlePlayPause}
              sx={{ 
                color: '#000000',
                bgcolor: '#f5f5f5',
                '&:hover': { bgcolor: '#eeeeee' },
                p: 1.5
              }}
            >
              {isPlaying ? 
                <PauseIcon sx={{ fontSize: 40 }} /> : 
                <PlayArrowIcon sx={{ fontSize: 40 }} />
              }
            </IconButton>
            <IconButton onClick={() => {}} sx={{ color: '#000000' }}>
              <Forward10Icon sx={{ fontSize: 35 }} />
            </IconButton>
          </Box>

          {/* Next Episode Section */}
          <Box sx={{ 
            borderTop: '1px solid #eee',
            pt: 2,
            mt: 2
          }}>
            <Box 
              onClick={() => currentEpisode < episodes.length - 1 ? handleNextEpisode() : setShowEpisodes(!showEpisodes)}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                py: 1
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000', fontSize: '1.1rem' }}>
                {currentEpisode < episodes.length - 1 
                  ? episodes[currentEpisode + 1].title 
                  : 'Last Episode'}
              </Typography>
              <IconButton sx={{ color: '#000000' }}>
                {showEpisodes ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Box>

            <Collapse in={showEpisodes}>
              <Box sx={{ mt: 1 }}>
                {episodes.map((episode, index) => (
                  <Box 
                    key={index}
                    onClick={() => handleEpisodeChange(index)}
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1.5,
                      px: 2,
                      borderRadius: 1,
                      bgcolor: currentEpisode === index ? '#f5f5f5' : 'transparent',
                      '&:hover': { bgcolor: '#f5f5f5' },
                      cursor: 'pointer'
                    }}
                  >
                    <Typography sx={{ 
                      color: '#000000',
                      fontWeight: currentEpisode === index ? 'bold' : 'normal',
                      fontSize: '0.95rem'
                    }}>
                      {episode.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#000000', fontSize: '0.85rem' }}>
                      {episode.duration}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      {/* Subscription Modal */}
      <Modal
        open={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          bgcolor: '#ffffff',
          borderRadius: 2,
          maxWidth: 400,
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          p: 2
        }}>
          {/* Logo */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mb: 2
          }}>
            <Box sx={{
              position: 'relative',
              width: 120,
              height: 40
            }}>
              <Image
                src="/A Astro Logor.png"
                alt="Aham Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Box>

          <Typography variant="h5" sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold',
            color: '#000000',
            mb: 2,
            fontSize: '1.3rem'
          }}>
            Choose Your Subscription Plan
          </Typography>

          {/* Subscription Plans */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2
          }}>
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.type}
                onClick={() => handlePlanSelect(plan)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: plan.color,
                  border: selectedPlan?.type === plan.type ? '2px solid #000' : '1px solid #eee',
                  '&:hover': {
                    boxShadow: 3
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}>
                    {plan.type}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.2rem' }}>
                    {plan.price}
                  </Typography>
                  {plan.features.map((feature, index) => (
                    <Typography key={index} sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                      • {feature}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: 2
          }}>
            <Button 
              variant="outlined"
              onClick={() => setShowSubscriptionModal(false)}
              sx={{ 
                color: '#000000',
                borderColor: '#000000',
                fontSize: '0.9rem',
                '&:hover': {
                  borderColor: '#000000',
                  bgcolor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained"
              disabled={!selectedPlan}
              onClick={handleProceedToPayment}
              sx={{ 
                bgcolor: '#000000',
                color: '#ffffff',
                fontSize: '0.9rem',
                '&:hover': {
                  bgcolor: '#333333'
                },
                '&.Mui-disabled': {
                  bgcolor: '#cccccc'
                }
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
} 