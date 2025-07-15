'use client';
import React from 'react';
import { Box, Typography, InputBase, Paper, Modal, TextField, Button, Badge, Alert, Menu, MenuItem, ListItemIcon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from './context/CartContext';
import axios from 'axios';

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
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [lastCheckTime, setLastCheckTime] = useState(0);
  const router = useRouter();
  const { cartItems } = useCart();

  // Initialize dark mode from localStorage on mount
  useLayoutEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
    
    // Check for existing login
    checkLoginStatus();
    
    setMounted(true);
  }, []);

  // Check login status function
  const checkLoginStatus = () => {
    const now = Date.now();
    // Prevent checking too frequently (minimum 500ms between checks)
    if (now - lastCheckTime < 500) {
      console.log('Skipping login status check - too frequent');
      return;
    }
    setLastCheckTime(now);
    
    const token = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');
    
    console.log('Checking login status...');
    console.log('Token exists:', !!token);
    console.log('User data exists:', !!storedUserData);
    
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          console.log('User already logged in:', parsedUserData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          // Clear invalid data
          localStorage.removeItem('userData');
          setUserData(null);
        }
      }
    } else {
      // Clear expired or invalid token
      if (token) {
        console.log('Token expired or invalid, clearing login data');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
      setIsLoggedIn(false);
      setUserData(null);
      console.log('No valid token found, user not logged in');
    }
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    try {
      // If token is a JWT, decode it to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp && payload.exp < currentTime) {
        console.log('Token is expired');
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Error checking token expiration:', error);
      // If we can't decode the token, assume it's valid
      return false;
    }
  };

  // Check login status whenever component mounts or updates
  useLayoutEffect(() => {
    if (mounted) {
      checkLoginStatus();
    }
  }, [mounted]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'userData') {
        console.log('Storage changed, checking login status...');
        // Add a small delay to prevent race conditions
        setTimeout(() => {
          checkLoginStatus();
        }, 50);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check on focus (when user comes back to tab) but with delay
    const handleFocus = () => {
      console.log('Window focused, checking login status...');
      // Add a small delay to prevent race conditions
      setTimeout(() => {
        checkLoginStatus();
      }, 100);
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
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

  const handleLogin = async () => {
    try {
      setLoginLoading(true);
      setLoginError('');
      
      console.log('Starting login process...');
      console.log('Login data:', loginData);
      
      // Validate input
      if (!loginData.mobile || !loginData.password) {
        setLoginError('Please enter both mobile number and password');
        console.log('Validation failed: Missing required fields');
        return;
      }

      const requestData = {
        mobileNumber: loginData.mobile,
        password: loginData.password
      };

      console.log('Sending login request to:', 'https://api.ahamcore.com/api/user/login');
      console.log('Request data:', requestData);

      const response = await axios.post('https://api.ahamcore.com/api/user/login', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('Login response received:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      // Handle successful login (flexible response format)
      if (response.status === 200 || response.status === 201) {
        console.log('Login successful with status:', response.status);
        console.log('Full response data:', response.data);
        
        // Store the token in localStorage if available
        if (response.data && response.data.data && response.data.data.token) {
          localStorage.setItem('token', response.data.data.token);
          console.log('Token stored in localStorage:', response.data.data.token);
        } else if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log('Token stored in localStorage:', response.data.token);
        } else if (response.data && response.data.data && response.data.data.accessToken) {
          localStorage.setItem('token', response.data.data.accessToken);
          console.log('Access token stored in localStorage:', response.data.data.accessToken);
        } else if (response.data && response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          console.log('Access token stored in localStorage:', response.data.accessToken);
        } else {
          console.log('No token found in response data');
        }
        
        // Store user data
        if (response.data && response.data.data && response.data.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.data.user));
          setUserData(response.data.data.user);
          console.log('User data stored in localStorage:', response.data.data.user);
        } else if (response.data && response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          setUserData(response.data.user);
          console.log('User data stored in localStorage:', response.data.user);
        } else if (response.data && response.data.data) {
          localStorage.setItem('userData', JSON.stringify(response.data.data));
          setUserData(response.data.data);
          console.log('User data stored in localStorage:', response.data.data);
        } else {
          console.log('No user data found in response');
        }
        
        // Update login state immediately
        setIsLoggedIn(true);
        
        // Close modal and reset form
        setOpenLogin(false);
        setLoginData({ mobile: '', password: '' });
        
        console.log('Login successful, navigating to home page...');
        console.log('Current token in localStorage:', localStorage.getItem('token'));
        console.log('Current user data in localStorage:', localStorage.getItem('userData'));
        
        // Navigate to home page
        router.push('/');
      } else {
        console.log('Unexpected response status:', response.status);
        setLoginError('Unexpected response from server');
      }
    } catch (error) {
      console.error('Login error details:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      if (error.response) {
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', error.response.data);
        
        if (error.response.data && error.response.data.message) {
          setLoginError(error.response.data.message);
        } else if (error.response.status === 400) {
          setLoginError('Invalid login data. Please check your information.');
        } else if (error.response.status === 401) {
          setLoginError('Invalid mobile number or password');
        } else if (error.response.status === 404) {
          setLoginError('User not found');
        } else if (error.response.status === 500) {
          setLoginError('Server error. Please try again later.');
        } else {
          setLoginError(`Login failed (${error.response.status})`);
        }
      } else if (error.request) {
        console.log('No response received from server');
        setLoginError('No response from server. Please check your internet connection.');
      } else {
        console.log('Error setting up request:', error.message);
        setLoginError('An error occurred. Please try again later.');
      }
    } finally {
      setLoginLoading(false);
      console.log('Login process completed');
    }
  };

  const handleLogout = () => {
    console.log('Logging out user...');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    setAccountMenuAnchor(null);
    console.log('User logged out successfully');
    router.push('/');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    setAccountMenuAnchor(null);
    // Navigate to profile page or show profile modal
    // router.push('/profile');
  };

  const handleCloseAccountMenu = () => {
    setAccountMenuAnchor(null);
  };

  const handleSignup = async () => {
    try {
      setSignupLoading(true);
      setSignupError('');
      
      console.log('Starting registration process...');
      console.log('Signup data:', signupData);
      
      // Validate input
      if (!signupData.name || !signupData.email || !signupData.mobile || !signupData.password || !signupData.confirmPassword) {
        setSignupError('Please fill in all fields');
        console.log('Validation failed: Missing required fields');
        return;
      }

      // Validate password confirmation
      if (signupData.password !== signupData.confirmPassword) {
        setSignupError('Passwords do not match');
        console.log('Validation failed: Passwords do not match');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupData.email)) {
        setSignupError('Please enter a valid email address');
        console.log('Validation failed: Invalid email format');
        return;
      }

      // Validate mobile number (basic validation)
      if (signupData.mobile.length < 10) {
        setSignupError('Please enter a valid mobile number');
        console.log('Validation failed: Invalid mobile number');
        return;
      }

      const requestData = {
        name: signupData.name,
        email: signupData.email,
        mobileNumber: signupData.mobile,
        password: signupData.password,
        confirmPassword: signupData.confirmPassword
      };

      console.log('Sending registration request to:', 'https://api.ahamcore.com/api/user/register');
      console.log('Request data:', requestData);

      const response = await axios.post('https://api.ahamcore.com/api/user/register', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('Registration response received:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      // Handle successful registration (flexible response format)
      if (response.status === 200 || response.status === 201) {
        console.log('Registration successful with status:', response.status);
        console.log('Full response data:', response.data);
        
        // Store the token in localStorage if available
        if (response.data && response.data.data && response.data.data.token) {
          localStorage.setItem('token', response.data.data.token);
          console.log('Token stored in localStorage:', response.data.data.token);
        } else if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log('Token stored in localStorage:', response.data.token);
        } else if (response.data && response.data.data && response.data.data.accessToken) {
          localStorage.setItem('token', response.data.data.accessToken);
          console.log('Access token stored in localStorage:', response.data.data.accessToken);
        } else if (response.data && response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          console.log('Access token stored in localStorage:', response.data.accessToken);
        } else {
          console.log('No token found in response data');
        }
        
        // Store user data
        if (response.data && response.data.data && response.data.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.data.user));
          setUserData(response.data.data.user);
          console.log('User data stored in localStorage:', response.data.data.user);
        } else if (response.data && response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          setUserData(response.data.user);
          console.log('User data stored in localStorage:', response.data.user);
        } else if (response.data && response.data.data) {
          localStorage.setItem('userData', JSON.stringify(response.data.data));
          setUserData(response.data.data);
          console.log('User data stored in localStorage:', response.data.data);
        } else {
          console.log('No user data found in response');
        }
        
        // Update login state immediately
        setIsLoggedIn(true);
        
        // Close modal and reset form
        setOpenSignup(false);
        setSignupData({
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        });
        
        console.log('Registration successful, navigating to home page...');
        console.log('Current token in localStorage:', localStorage.getItem('token'));
        console.log('Current user data in localStorage:', localStorage.getItem('userData'));
        
        // Navigate to home page
        router.push('/');
      } else {
        console.log('Unexpected response status:', response.status);
        setSignupError('Unexpected response from server');
      }
    } catch (error) {
      console.error('Registration error details:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      if (error.response) {
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', error.response.data);
        
        if (error.response.data && error.response.data.message) {
          setSignupError(error.response.data.message);
        } else if (error.response.status === 400) {
          setSignupError('Invalid registration data. Please check your information.');
        } else if (error.response.status === 409) {
          setSignupError('User already exists with this email or mobile number');
        } else if (error.response.status === 500) {
          setSignupError('Server error. Please try again later.');
        } else {
          setSignupError(`Registration failed (${error.response.status})`);
        }
      } else if (error.request) {
        console.log('No response received from server');
        setSignupError('No response from server. Please check your internet connection.');
      } else {
        console.log('Error setting up request:', error.message);
        setSignupError('An error occurred. Please try again later.');
      }
    } finally {
      setSignupLoading(false);
      console.log('Registration process completed');
    }
  };

  const handleLoginClick = () => {
    setLoginError('');
    setLoginData({ mobile: '', password: '' });
    setOpenLogin(true);
  };

  const handleAccountClick = (event) => {
    if (isLoggedIn) {
      // Open account dropdown menu
      setAccountMenuAnchor(event.currentTarget);
    } else {
      setOpenLogin(true);
    }
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      console.log('User logged in, navigating to cart page');
      router.push('/cart');
    } else {
      console.log('User not logged in, showing login popup');
      setOpenLogin(true);
    }
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
          pb: 0.5,
          position: 'relative',
          minHeight: { xs: 85, sm: 95 },
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 1 }}>
            {/* Logo */}
            <Box
              sx={{
                width: { xs: 28, sm: 36 },
                height: { xs: 28, sm: 36 },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => router.push('/')}
            >
              <Image
                src={logoImage}
                alt="Logo"
                width={36}
                height={36}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
              {/* Dark mode toggle */}
              <Box
                sx={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? (
                  <LightModeIcon sx={{ 
                    fontSize: { xs: 16, sm: 20 }, 
                    color: '#fff', 
                    alignSelf: 'center', 
                    mb: '2px',
                    transition: 'all 0.3s ease'
                  }} />
                ) : (
                  <Brightness2Icon sx={{ 
                    fontSize: { xs: 16, sm: 20 }, 
                    color: '#fff', 
                    alignSelf: 'center', 
                    mb: '2px', 
                    transform: 'scaleX(-1) rotate(45deg)',
                    transition: 'all 0.3s ease'
                  }} />
                )}
              </Box>
              <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, mx: 0.5, fontSize: { xs: 12, sm: 15 } }}>|</Typography>
              {isLoggedIn ? (
                <>
                  {userData && (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#fff', 
                        fontWeight: 500, 
                        mr: 0.5, 
                        fontSize: { xs: 12, sm: 15 }
                      }}
                    >
                      Hi, {userData.name || userData.email || 'User'}
                    </Typography>
                  )}
                </>
              ) : (
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
              )}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                borderRadius: '8px', 
                p: 0.2, 
                mr: 0.5,
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}>
                <Badge badgeContent={cartItems?.length || 0} color="error">
                  <ShoppingCartIcon 
                    sx={{ 
                      fontSize: { xs: 16, sm: 20 }, 
                      color: '#fff', 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#e0e0e0'
                      }
                    }} 
                    onClick={handleCartClick}
                  />
                </Badge>
              </Box>
              <AccountCircleIcon 
                sx={{ 
                  fontSize: { xs: 20, sm: 24 }, 
                  color: '#fff', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    color: '#e0e0e0'
                  }
                }} 
                onClick={handleAccountClick}
              />
            </Box>
          </Box>
          {/* Search Bar */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: { xs: 1.5, sm: 2 }, px: { xs: 1, sm: 0 } }}>
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                boxShadow: 1,
                bgcolor: '#fff',
                p: { xs: '1px 6px', sm: '2px 10px' },
                width: { xs: '100%', sm: '75%' },
                maxWidth: 300,
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: 2,
                  transform: 'translateY(-1px)'
                },
                '&:focus-within': {
                  boxShadow: 3,
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <SearchIcon sx={{ color: '#888', mr: 0.5, fontSize: { xs: 16, sm: 20 } }} />
              <InputBase
                sx={{ ml: 0.5, flex: 1, fontSize: { xs: 12, sm: 15 } }}
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
              justifyContent: 'center',
              mt: { xs: 2, sm: 2.5 },
              pb: 0.5,
              gap: { xs: 7, sm: 8 },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              color: '#fff', 
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }} onClick={() => router.push('/') }>
              <Box sx={{
                bgcolor: selectedNav === 'home' ? '#0066d6' : 'transparent',
                borderRadius: selectedNav === 'home' ? 2 : 1,
                p: { xs: 0.4, sm: 0.6 },
                mb: { xs: 0.2, sm: 0.4 },
                boxShadow: selectedNav === 'home' ? 3 : 0,
                width: { xs: 24, sm: 32 },
                height: { xs: 26, sm: 34 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                transform: selectedNav === 'home' ? 'scale(1.1)' : 'scale(1)',
                border: selectedNav === 'home' ? '2px solid rgba(255,255,255,0.3)' : 'none',
              }}>
                <Image
                  src={homeIcon}
                  alt="Home"
                  width={selectedNav === 'home' ? 16 : 18}
                  height={selectedNav === 'home' ? 16 : 18}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Typography variant="caption" sx={{ 
                color: '#fff', 
                fontWeight: selectedNav === 'home' ? 700 : 500, 
                fontSize: { xs: 10, sm: 12 },
                transition: 'all 0.2s ease',
                textShadow: selectedNav === 'home' ? '0 0 8px rgba(0,102,214,0.8)' : 'none'
              }}>Home</Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              color: '#fff', 
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }} onClick={() => router.push('/novel') }>
              <Box sx={{
                bgcolor: selectedNav === 'novel' ? '#0066d6' : 'transparent',
                borderRadius: selectedNav === 'novel' ? 2 : 1,
                p: { xs: 0.4, sm: 0.6 },
                mb: { xs: 0.2, sm: 0.4 },
                boxShadow: selectedNav === 'novel' ? 3 : 0,
                width: { xs: 24, sm: 32 },
                height: { xs: 26, sm: 34 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                transform: selectedNav === 'novel' ? 'scale(1.1)' : 'scale(1)',
                border: selectedNav === 'novel' ? '2px solid rgba(255,255,255,0.3)' : 'none',
              }}>
                <Image
                  src={novelIcon}
                  alt="Novel"
                  width={selectedNav === 'novel' ? 16 : 18}
                  height={selectedNav === 'novel' ? 16 : 18}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Typography variant="caption" sx={{ 
                color: '#fff', 
                fontWeight: selectedNav === 'novel' ? 700 : 500, 
                fontSize: { xs: 10, sm: 12 },
                transition: 'all 0.2s ease',
                textShadow: selectedNav === 'novel' ? '0 0 8px rgba(0,102,214,0.8)' : 'none'
              }}>Novel</Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              color: '#fff', 
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }} onClick={() => router.push('/audiobook') }>
              <Box sx={{
                bgcolor: selectedNav === 'audiobook' ? '#0066d6' : 'transparent',
                borderRadius: selectedNav === 'audiobook' ? 2 : 1,
                p: { xs: 0.4, sm: 0.6 },
                mb: { xs: 0.2, sm: 0.4 },
                boxShadow: selectedNav === 'audiobook' ? 3 : 0,
                width: { xs: 24, sm: 32 },
                height: { xs: 26, sm: 34 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                transform: selectedNav === 'audiobook' ? 'scale(1.1)' : 'scale(1)',
                border: selectedNav === 'audiobook' ? '2px solid rgba(255,255,255,0.3)' : 'none',
              }}>
                <Image
                  src={audiobookIcon}
                  alt="Audiobook"
                  width={selectedNav === 'audiobook' ? 16 : 18}
                  height={selectedNav === 'audiobook' ? 16 : 18}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Typography variant="caption" sx={{ 
                color: '#fff', 
                fontWeight: selectedNav === 'audiobook' ? 700 : 500, 
                fontSize: { xs: 10, sm: 12 },
                transition: 'all 0.2s ease',
                textShadow: selectedNav === 'audiobook' ? '0 0 8px rgba(0,102,214,0.8)' : 'none'
              }}>Audiobook</Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              color: '#fff', 
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }} onClick={() => router.push('/mall') }>
              <Box sx={{
                bgcolor: selectedNav === 'mall' ? '#0066d6' : 'transparent',
                borderRadius: selectedNav === 'mall' ? 2 : 1,
                p: { xs: 0.4, sm: 0.6 },
                mb: { xs: 0.2, sm: 0.4 },
                boxShadow: selectedNav === 'mall' ? 3 : 0,
                width: { xs: 24, sm: 32 },
                height: { xs: 26, sm: 34 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                transform: selectedNav === 'mall' ? 'scale(1.1)' : 'scale(1)',
                border: selectedNav === 'mall' ? '2px solid rgba(255,255,255,0.3)' : 'none',
              }}>
                <Image
                  src={mallIcon}
                  alt="Mall"
                  width={selectedNav === 'mall' ? 16 : 18}
                  height={selectedNav === 'mall' ? 16 : 18}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Typography variant="caption" sx={{ 
                color: '#fff', 
                fontWeight: selectedNav === 'mall' ? 700 : 500, 
                fontSize: { xs: 10, sm: 12 },
                transition: 'all 0.2s ease',
                textShadow: selectedNav === 'mall' ? '0 0 8px rgba(0,102,214,0.8)' : 'none'
              }}>Mall</Typography>
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
            {loginError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {loginError}
              </Alert>
            )}
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={loginData.mobile}
              onChange={(e) => setLoginData({ ...loginData, mobile: e.target.value })}
              disabled={loginLoading}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              disabled={loginLoading}
            />
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleLogin}
              disabled={loginLoading}
              sx={{ mt: 2 }}
            >
              {loginLoading ? 'Logging in...' : 'Login'}
            </Button>
            <Typography 
              variant="body2" 
              sx={{ textAlign: 'center', mt: 1, cursor: 'pointer', color: 'primary.main' }}
              onClick={() => {
                setOpenLogin(false);
                setOpenSignup(true);
                setLoginError('');
                setSignupError('');
                setSignupData({
                  name: '',
                  email: '',
                  mobile: '',
                  password: '',
                  confirmPassword: ''
                });
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
            {signupError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {signupError}
              </Alert>
            )}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              disabled={signupLoading}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              disabled={signupLoading}
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={signupData.mobile}
              onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
              disabled={signupLoading}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              disabled={signupLoading}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
              disabled={signupLoading}
            />
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleSignup}
              disabled={signupLoading}
              sx={{ mt: 2 }}
            >
              {signupLoading ? 'Registering...' : 'Register'}
            </Button>
            <Typography 
              variant="body2" 
              sx={{ textAlign: 'center', mt: 1, cursor: 'pointer', color: 'primary.main' }}
              onClick={() => {
                setOpenSignup(false);
                setOpenLogin(true);
                setSignupError('');
              }}
            >
              Already have an account? Login
            </Typography>
          </Box>
        </Box>
      </Modal>

      {/* Account Dropdown Menu */}
      <Menu
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        onClose={handleCloseAccountMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            boxShadow: 3,
            borderRadius: 2,
          }
        }}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
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