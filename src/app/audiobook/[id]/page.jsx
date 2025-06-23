'use client';
import React, { useState } from 'react';
import Image from 'next/image';
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
    <Box sx={{ 
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#ffffff',
      overflow: 'hidden'
    }}>
      {/* Back Button */}
      <Box sx={{ 
        position: 'absolute',
        top: { xs: 16, sm: 24 },
        left: { xs: 16, sm: 24 },
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

      {/* Main Content */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto'
      }}>
        {/* Cover Image */}
        <Box sx={{
          width: '100%',
          height: { xs: '50vh', sm: '60vh' },
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
          p: { xs: 2, sm: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold',
            mb: 3,
            color: '#000000',
            textAlign: 'center'
          }}>
            {episodes[currentEpisode].title}
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ width: '100%', maxWidth: '500px', mx: 'auto' }}>
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
              <Typography variant="body2" sx={{ color: '#000000' }}>{currentTime}</Typography>
              <Typography variant="body2" sx={{ color: '#000000' }}>{episodes[currentEpisode].duration}</Typography>
            </Box>
          </Box>

          {/* Controls */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mt: 4,
            mb: { xs: 2, sm: 4 }
          }}>
            <IconButton onClick={() => {}} sx={{ color: '#000000' }}>
              <Replay10Icon sx={{ fontSize: { xs: 35, sm: 40 } }} />
            </IconButton>
            <IconButton 
              onClick={handlePlayPause}
              sx={{ 
                color: '#000000',
                bgcolor: '#f5f5f5',
                '&:hover': { bgcolor: '#eeeeee' },
                p: { xs: 1.5, sm: 2 }
              }}
            >
              {isPlaying ? 
                <PauseIcon sx={{ fontSize: { xs: 40, sm: 45 } }} /> : 
                <PlayArrowIcon sx={{ fontSize: { xs: 40, sm: 45 } }} />
              }
            </IconButton>
            <IconButton onClick={() => {}} sx={{ color: '#000000' }}>
              <Forward10Icon sx={{ fontSize: { xs: 35, sm: 40 } }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Next Episode Section */}
      <Box sx={{ 
        borderTop: '1px solid #eee',
        p: 2,
        bgcolor: '#ffffff'
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
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000' }}>
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
                  fontWeight: currentEpisode === index ? 'bold' : 'normal'
                }}>
                  {episode.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#000000' }}>
                  {episode.duration}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
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
          maxWidth: 800,
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          p: { xs: 2, sm: 3 }
        }}>
          {/* Logo */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mb: 3
          }}>
            <Box sx={{
              position: 'relative',
              width: 150,
              height: 50
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
            mb: 3
          }}>
            Choose Your Subscription Plan
          </Typography>

          {/* Subscription Plans */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 2,
            mb: 3
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
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {plan.type}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {plan.price}
                  </Typography>
                  {plan.features.map((feature, index) => (
                    <Typography key={index} sx={{ mb: 0.5 }}>
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