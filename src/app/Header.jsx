'use client';
import React from 'react';
import { Box, Typography, InputBase, Paper, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
        background: darkMode
          ? `radial-gradient(circle at 20% 20%, #23272f 60%, #11131a 100%)`
          : `url('/header-bg.png'), radial-gradient(circle at 20% 20%, #3a5fc8 60%, #1a237e 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 220,
        position: 'relative',
      }}
    >
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
            src={require('./assets/images/A Astro Logor.png')}
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
            bgcolor: selectedNav === 'home' ? '#fff' : 'transparent',
            borderRadius: '50%',
            p: { xs: 0.4, sm: 0.7 },
            mb: { xs: 0.2, sm: 0.5 },
            boxShadow: selectedNav === 'home' ? 2 : 0,
          }}>
            <HomeIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: selectedNav === 'home' ? '#0066d6' : '#fff' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'home' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Home</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => router.push('/novel') }>
          <Box sx={{
            bgcolor: selectedNav === 'novel' ? '#fff' : 'transparent',
            borderRadius: '50%',
            p: { xs: 0.4, sm: 0.7 },
            mb: { xs: 0.2, sm: 0.5 },
            boxShadow: selectedNav === 'novel' ? 2 : 0,
          }}>
            <MenuBookIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: selectedNav === 'novel' ? '#0066d6' : '#fff' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'novel' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Novel</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => router.push('/audiobook') }>
          <Box sx={{
            bgcolor: selectedNav === 'audiobook' ? '#fff' : 'transparent',
            borderRadius: '50%',
            p: { xs: 0.4, sm: 0.7 },
            mb: { xs: 0.2, sm: 0.5 },
            boxShadow: selectedNav === 'audiobook' ? 2 : 0,
          }}>
            <HeadphonesIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: selectedNav === 'audiobook' ? '#0066d6' : '#fff' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'audiobook' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Audiobook</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => router.push('/mall') }>
          <Box sx={{
            bgcolor: selectedNav === 'mall' ? '#fff' : 'transparent',
            borderRadius: '50%',
            p: { xs: 0.4, sm: 0.7 },
            mb: { xs: 0.2, sm: 0.5 },
            boxShadow: selectedNav === 'mall' ? 2 : 0,
          }}>
            <ShoppingBagIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: selectedNav === 'mall' ? '#0066d6' : '#fff' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: selectedNav === 'mall' ? 700 : 500, fontSize: { xs: 11, sm: 14 } }}>Mall</Typography>
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