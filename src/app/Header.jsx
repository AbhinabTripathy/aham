'use client';
import React from 'react';
import { Box, Typography, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Import all images
const headerBg = require('./assets/images/Landing Page Top Header Background copy.jpg');
console.log('Header Background Image:', headerBg);

const homeIcon = require('./assets/images/home (1).png');
const novelIcon = require('./assets/images/Novel.png');
const audiobookIcon = require('./assets/images/audiobook.png');
const mallIcon = require('./assets/images/mall.png');
const logoImage = require('./assets/images/A Astro Logor.png');

export default function Header({ selectedNav = 'home', searchPlaceholder = 'Graphic Novels' }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Initialize dark mode from localStorage on mount
  useLayoutEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
    setMounted(true);
  }, []);

  // Update dark mode class and localStorage
  useLayoutEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode, mounted]);

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'transparent',
        pb: 2,
        position: 'relative',
        minHeight: 220,
        // height: "200px"
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      {!darkMode && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          <Image
            src={headerBg}
            alt="Header Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            priority
          />
        </Box>
      )}
      {darkMode && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            background: `radial-gradient(circle at 20% 20%, #23272f 60%, #11131a 100%)`,
          }}
        />
      )}
      {/* Content Container */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Top Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2 }}>
          {/* Logo */}
          <Box
            sx={{
              width: { xs: 32, sm: 44 },
              height: { xs: 32, sm: 44 },
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              src={logoImage}
              alt="Logo"
              width={44}
              height={44}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
            {/* Dark mode toggle */}
            <Box
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? (
                <LightModeIcon sx={{ fontSize: { xs: 18, sm: 22 }, color: '#fff', alignSelf: 'center', mb: '2px' }} />
              ) : (
                <Brightness2Icon sx={{ fontSize: { xs: 18, sm: 22 }, color: '#fff', alignSelf: 'center', mb: '2px', transform: 'scaleX(-1) rotate(45deg)' }} />
              )}
            </Box>
            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, mx: 0.5, fontSize: { xs: 12, sm: 15 } }}>|</Typography>
            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, mr: 0.5, cursor: 'pointer', fontSize: { xs: 12, sm: 15 } }}>Login</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '8px', p: 0.2, mr: 0.5 }}>
              <WalletIcon sx={{ fontSize: { xs: 18, sm: 22 }, color: '#fff' }} />
            </Box>
            <AccountCircleIcon sx={{ fontSize: { xs: 22, sm: 26 }, color: '#fff' }} />
          </Box>
        </Box>
        {/* Search Bar */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2, px: { xs: 1, sm: 0 } }}>
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 3,
              boxShadow: 1,
              bgcolor: '#fff',
              p: { xs: '1px 6px', sm: '2px 12px' },
              width: { xs: '100%', sm: '80%' },
              maxWidth: 340,
            }}
          >
            <SearchIcon sx={{ color: '#888', mr: 0.5, fontSize: { xs: 18, sm: 22 } }} />
            <InputBase
              sx={{ ml: 0.5, flex: 1, fontSize: { xs: 13, sm: 16 } }}
              placeholder={`Search "${searchPlaceholder}"`}
              inputProps={{ 'aria-label': 'search graphic novels' }}
            />
          </Paper>
        </Box>
        {/* Navigation Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            mt: 3,
            pb: 1,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => router.push('/') }>
            <Box sx={{
              bgcolor: selectedNav === 'home' ? '#0066d6' : 'transparent',
              borderRadius: '50%',
              p: { xs: 0.4, sm: 0.7 },
              mb: { xs: 0.2, sm: 0.5 },
              boxShadow: selectedNav === 'home' ? 2 : 0,
              width: { xs: 20, sm: 28 },
              height: { xs: 20, sm: 28 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src={homeIcon}
                alt="Home"
                width={selectedNav === 'home' ? 16 : 20}
                height={selectedNav === 'home' ? 16 : 20}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'home' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Home</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => router.push('/novel') }>
            <Box sx={{
              bgcolor: selectedNav === 'novel' ? '#0066d6' : 'transparent',
              borderRadius: '50%',
              p: { xs: 0.4, sm: 0.7 },
              mb: { xs: 0.2, sm: 0.5 },
              boxShadow: selectedNav === 'novel' ? 2 : 0,
              width: { xs: 20, sm: 28 },
              height: { xs: 20, sm: 28 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src={novelIcon}
                alt="Novel"
                width={selectedNav === 'novel' ? 16 : 20}
                height={selectedNav === 'novel' ? 16 : 20}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'novel' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Novel</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => router.push('/audiobook') }>
            <Box sx={{
              bgcolor: selectedNav === 'audiobook' ? '#0066d6' : 'transparent',
              borderRadius: '50%',
              p: { xs: 0.4, sm: 0.7 },
              mb: { xs: 0.2, sm: 0.5 },
              boxShadow: selectedNav === 'audiobook' ? 2 : 0,
              width: { xs: 20, sm: 28 },
              height: { xs: 20, sm: 28 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src={audiobookIcon}
                alt="Audiobook"
                width={selectedNav === 'audiobook' ? 16 : 20}
                height={selectedNav === 'audiobook' ? 16 : 20}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'audiobook' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Audiobook</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => router.push('/mall') }>
            <Box sx={{
              bgcolor: selectedNav === 'mall' ? '#0066d6' : 'transparent',
              borderRadius: '50%',
              p: { xs: 0.4, sm: 0.7 },
              mb: { xs: 0.2, sm: 0.5 },
              boxShadow: selectedNav === 'mall' ? 2 : 0,
              width: { xs: 20, sm: 28 },
              height: { xs: 20, sm: 28 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src={mallIcon}
                alt="Mall"
                width={selectedNav === 'mall' ? 16 : 20}
                height={selectedNav === 'mall' ? 16 : 20}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'mall' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Mall</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/*
Add this to your globals.css for full dark mode effect:
body.dark-mode {
  background: #181a20 !important;
  color: #fff !important;
}
body.dark-mode .MuiPaper-root,
body.dark-mode .MuiBox-root,
body.dark-mode .MuiCard-root {
  background: #23272f !important;
  color: #fff !important;
}
*/ 