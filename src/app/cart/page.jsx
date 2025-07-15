'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../Footer';
import { Modal, TextField, Button, Box, Typography, Card, CardContent, Badge } from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Import logo and background
const logoImage = require('../assets/images/A Astro Logor.png');
const headerBg = require('../assets/images/Landing Page Top Header Background copy.jpg');

// Simplified Header for Cart Page
function CartHeader() {
  const router = useRouter();
  const { cartItems } = useCart();
  const cartItemCount = cartItems?.length || 0;

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        minHeight: 60,
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
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
          loading="eager"
        />
      </Box>

      {/* Content Container */}
      <Box sx={{ position: 'relative', zIndex: 1, py: 1 }}>
        <Box
          sx={{
            maxWidth: 480,
            margin: '0 auto',
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo with optimized Link */}
          <Link 
            href="/" 
            style={{ textDecoration: 'none' }} 
            prefetch={true}
            scroll={false}
          >
            <Box
              sx={{
                cursor: 'pointer',
                position: 'relative',
                width: 100,
                height: 34,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Image
                src={logoImage}
                alt="Aham Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
                loading="eager"
              />
            </Box>
          </Link>

          {/* Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
              <AccountCircleIcon sx={{ 
                fontSize: 22, 
                cursor: 'pointer',
                '&:hover': {
                  color: '#e0e0e0'
                }
              }} />
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              position: 'relative',
              color: '#fff'
            }}>
              <Badge 
                badgeContent={cartItemCount > 0 ? cartItemCount : null} 
                color="error"
              >
                <ShoppingCartIcon sx={{ 
                  fontSize: 22, 
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#e0e0e0'
                  }
                }} />
              </Badge>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    flatNo: '',
    street: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setSubtotal(total);
    }
  }, [cartItems]);

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setNewAddress(prev => ({ ...prev, pincode }));
    
    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        
        if (data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setNewAddress(prev => ({
            ...prev,
            area: postOffice.Name,
            city: postOffice.Block,
            district: postOffice.District,
            state: postOffice.State
          }));
        }
      } catch (error) {
        console.error('Error fetching pincode data:', error);
      }
    }
  };

  const handleAddAddress = () => {
    const address = { ...newAddress, id: Date.now() };
    setAddresses(prev => [...prev, address]);
    setSelectedAddress(address);
    setOpenAddressModal(false);
    setNewAddress({
      flatNo: '',
      street: '',
      area: '',
      city: '',
      district: '',
      state: '',
      pincode: ''
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <CartHeader />
        <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh' }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '20px',
            paddingTop: '80px'
          }}>
            <Typography variant="h5" sx={{ color: '#000000', mb: 2, fontSize: '1.5rem' }}>Your cart is empty</Typography>
            <Link href="/mall">
              <Button sx={{
                padding: '10px 20px',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                mt: 2,
                '&:hover': {
                  backgroundColor: '#333333'
                }
              }}>
                Continue Shopping
              </Button>
            </Link>
          </Box>
          <Footer />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <CartHeader />
      <Box sx={{ maxWidth: 480, mx: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100vh' }}>
        <Box sx={{ 
          padding: '20px',
          paddingTop: '80px'
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Cart Items Section */}
            <Box>
              <Typography variant="h5" sx={{ color: '#000000', marginBottom: '20px', fontSize: '1.5rem' }}>Shopping Cart</Typography>
              {cartItems.map((item) => (
                <Box key={`${item.id}-${item.size}`} sx={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  gap: '15px'
                }}>
                  <Box sx={{ width: '80px', height: '80px', position: 'relative', flexShrink: 0 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{item.name}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>Size: {item.size}</Typography>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 2 }}>₹{item.price}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                        sx={{ minWidth: '30px', padding: '4px 8px' }}
                      >
                        -
                      </Button>
                      <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateQuantity(item, Math.min(10, item.quantity + 1))}
                        sx={{ minWidth: '30px', padding: '4px 8px' }}
                      >
                        +
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => removeFromCart(item)}
                        sx={{
                          marginLeft: '10px',
                          backgroundColor: '#ff4444',
                          color: 'white',
                          fontSize: '0.8rem',
                          '&:hover': {
                            backgroundColor: '#cc3333'
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Address Section */}
            <Card elevation={3} sx={{ marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: '15px', color: '#000000', fontSize: '1.2rem' }}>
                  Delivery Address
                </Typography>
                {selectedAddress ? (
                  <Box sx={{ marginBottom: '15px' }}>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      {selectedAddress.flatNo}, {selectedAddress.street}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      {selectedAddress.area}, {selectedAddress.city}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      {selectedAddress.district}, {selectedAddress.state}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      PIN: {selectedAddress.pincode}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={() => setOpenAddressModal(true)}
                      sx={{ marginTop: '10px', fontSize: '0.9rem' }}
                    >
                      Change Address
                    </Button>
                  </Box>
                ) : (
                  <Button 
                    variant="contained" 
                    onClick={() => setOpenAddressModal(true)}
                    sx={{ backgroundColor: '#000000', color: '#ffffff', fontSize: '0.9rem' }}
                  >
                    Add Delivery Address
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Order Summary Section */}
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#000000', marginBottom: '15px', fontSize: '1.2rem' }}>
                  Order Summary
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '15px',
                  color: '#000000',
                  fontWeight: 'bold'
                }}>
                  <Typography sx={{ fontSize: '1rem' }}>Subtotal:</Typography>
                  <Typography sx={{ fontSize: '1rem' }}>₹{subtotal}</Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!selectedAddress}
                  sx={{
                    backgroundColor: selectedAddress ? '#000000' : '#cccccc',
                    color: '#ffffff',
                    marginTop: '10px',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: selectedAddress ? '#333333' : '#cccccc'
                    }
                  }}
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      <Modal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          maxWidth: '400px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <Box sx={{ 
              position: 'relative', 
              width: '120px', 
              height: '40px',
              marginBottom: '16px'
            }}>
              <Image
                src={logoImage}
                alt="Aham Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
            <Typography variant="h5" sx={{ 
              color: '#000000',
              fontWeight: '600',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '1.2rem'
            }}>
              Add Delivery Address
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Flat No."
              value={newAddress.flatNo}
              onChange={(e) => setNewAddress(prev => ({ ...prev, flatNo: e.target.value }))}
              fullWidth
              size="small"
              InputLabelProps={{
                style: { color: '#000000', fontSize: '0.9rem' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000000',
                  },
                },
              }}
            />
            <TextField
              label="Street/Apartment/Locality"
              value={newAddress.street}
              onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
              fullWidth
              size="small"
              InputLabelProps={{
                style: { color: '#000000', fontSize: '0.9rem' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000000',
                  },
                },
              }}
            />
            <TextField
              label="Pincode"
              value={newAddress.pincode}
              onChange={handlePincodeChange}
              fullWidth
              size="small"
              inputProps={{ maxLength: 6 }}
              InputLabelProps={{
                style: { color: '#000000', fontSize: '0.9rem' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000000',
                  },
                },
              }}
            />
            <TextField
              label="Area"
              value={newAddress.area}
              disabled
              fullWidth
              size="small"
              InputLabelProps={{
                style: { color: '#000000', fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="City"
              value={newAddress.city}
              disabled
              fullWidth
              size="small"
              InputLabelProps={{
                style: { color: '#000000', fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="District"
              value={newAddress.district}
              disabled
              fullWidth
              size="small"
              InputLabelProps={{
                style: { color: '#000000', fontSize: '0.9rem' }
              }}
            />
            <TextField
              label="State"
              value={newAddress.state}
              disabled
              fullWidth
              size="small"
              InputLabelProps={{
                style: { color: '#000000', fontSize: '0.9rem' }
              }}
            />
            <Box sx={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'flex-end', 
              marginTop: '16px'
            }}>
              <Button 
                variant="outlined" 
                onClick={() => setOpenAddressModal(false)}
                sx={{
                  borderColor: '#000000',
                  color: '#000000',
                  padding: '8px 20px',
                  textTransform: 'none',
                  fontSize: '0.9rem'
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained"
                onClick={handleAddAddress}
                sx={{ 
                  backgroundColor: '#000000', 
                  color: '#ffffff',
                  padding: '8px 20px',
                  textTransform: 'none',
                  fontSize: '0.9rem'
                }}
              >
                Add Address
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
} 