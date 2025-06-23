'use client';
import React from 'react';
import { Box, Typography, InputBase, Paper, Modal, TextField, Button, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from './context/CartContext';

// Import all images
const headerBg = require('./assets/images/Landing Page Top Header Background copy.jpg');
console.log('Header Background Image:', headerBg);

const homeIcon = require('./assets/images/home (1).png');
const novelIcon = require('./assets/images/Novel.png');
const audiobookIcon = require('./assets/images/audiobook.png');
const mallIcon = require('./assets/images/mall.png');
const logoImage = require('./assets/images/A Astro Logor.png');

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Header({ selectedNav = 'home', searchPlaceholder = 'Graphic Novels' }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [loginData, setLoginData] = useState({ mobile: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();
  const { cartItems } = useCart();

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

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login data:', loginData);
    setOpenLogin(false);
  };

  const handleSignup = () => {
    // Implement signup logic here
    console.log('Signup data:', signupData);
    setOpenSignup(false);
  };

  const handleLoginClick = () => {
    setOpenLogin(true);
  };

  const handleAccountClick = () => {
    setOpenLogin(true);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    // Implementation needed
  };

  const handleRemoveItem = (itemId) => {
    // Implementation needed
  };

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'transparent',
          pb: 1,
          position: 'relative',
          minHeight: { xs: 120, sm: 130 },
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 1.5 }}>
            {/* Logo */}
            <Box
              sx={{
                width: { xs: 32, sm: 44 },
                height: { xs: 32, sm: 44 },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => router.push('/')}
            >
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
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#fff', 
                  fontWeight: 500, 
                  mr: 0.5, 
                  cursor: 'pointer', 
                  fontSize: { xs: 12, sm: 15 },
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={handleLoginClick}
              >
                Login
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '8px', p: 0.2, mr: 0.5 }}>
                <Badge badgeContent={cartItems?.length || 0} color="error">
                  <ShoppingCartIcon 
                    sx={{ 
                      fontSize: { xs: 18, sm: 22 }, 
                      color: '#fff', 
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#e0e0e0'
                      }
                    }} 
                    onClick={handleCartClick}
                  />
                </Badge>
              </Box>
              <AccountCircleIcon 
                sx={{ fontSize: { xs: 22, sm: 26 }, color: '#fff', cursor: 'pointer' }} 
                onClick={handleAccountClick}
              />
            </Box>
          </Box>
          {/* Search Bar */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: { xs: 2, sm: 2.5 }, px: { xs: 1, sm: 0 } }}>
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
              mt: { xs: 2.5, sm: 3 },
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

      {/* Login Modal */}
      <Modal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{ width: 60, height: 60, mb: 2 }}>
              <Image
                src={logoImage}
                alt="Logo"
                width={60}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 600 }}>
              Login
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={loginData.mobile}
              onChange={(e) => setLoginData({ ...loginData, mobile: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Typography 
              variant="body2" 
              sx={{ textAlign: 'center', mt: 1, cursor: 'pointer', color: 'primary.main' }}
              onClick={() => {
                setOpenLogin(false);
                setOpenSignup(true);
              }}
            >
              Don't have an account? Sign up
            </Typography>
          </Box>
        </Box>
      </Modal>

      {/* Signup Modal */}
      <Modal
        open={openSignup}
        onClose={() => setOpenSignup(false)}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{ width: 60, height: 60, mb: 2 }}>
              <Image
                src={logoImage}
                alt="Logo"
                width={60}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 600 }}>
              User Registration
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={signupData.mobile}
              onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            />
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleSignup}
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            <Typography 
              variant="body2" 
              sx={{ textAlign: 'center', mt: 1, cursor: 'pointer', color: 'primary.main' }}
              onClick={() => {
                setOpenSignup(false);
                setOpenLogin(true);
              }}
            >
              Already have an account? Login
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
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