'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
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
        minHeight: { xs: 60, sm: 70 },
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
      <Box sx={{ position: 'relative', zIndex: 1, py: { xs: 1, sm: 1.5 } }}>
        <Box
          sx={{
            maxWidth: '1200px',
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
                width: { xs: 100, sm: 120 },
                height: { xs: 34, sm: 40 },
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
              <AccountCircleIcon sx={{ 
                fontSize: { xs: 22, sm: 26 }, 
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
                  fontSize: { xs: 22, sm: 26 }, 
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
      <>
        <CartHeader />
        <div style={{ 
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          padding: '20px',
          paddingTop: '80px'
        }}>
          <h2 style={{ color: '#000000' }}>Your cart is empty</h2>
          <Link href="/mall">
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <CartHeader />
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: '20px',
        paddingTop: '80px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px'
        }}>
          <div>
            <h2 style={{ color: '#000000', marginBottom: '20px' }}>Shopping Cart</h2>
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} style={{
                display: 'flex',
                padding: '15px',
                borderBottom: '1px solid #eee',
                gap: '20px'
              }}>
                <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>₹{item.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                      style={{ padding: '5px 10px' }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, Math.min(10, item.quantity + 1))}
                      style={{ padding: '5px 10px' }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item)}
                      style={{
                        marginLeft: '20px',
                        padding: '5px 10px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Card elevation={3} style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6" style={{ marginBottom: '15px', color: '#000000' }}>
                  Delivery Address
                </Typography>
                {selectedAddress ? (
                  <div style={{ marginBottom: '15px' }}>
                    <Typography>
                      {selectedAddress.flatNo}, {selectedAddress.street}
                    </Typography>
                    <Typography>
                      {selectedAddress.area}, {selectedAddress.city}
                    </Typography>
                    <Typography>
                      {selectedAddress.district}, {selectedAddress.state}
                    </Typography>
                    <Typography>
                      PIN: {selectedAddress.pincode}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={() => setOpenAddressModal(true)}
                      style={{ marginTop: '10px' }}
                    >
                      Change Address
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="contained" 
                    onClick={() => setOpenAddressModal(true)}
                    style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  >
                    Add Delivery Address
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" style={{ color: '#000000', marginBottom: '15px' }}>
                  Order Summary
                </Typography>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '15px',
                  color: '#000000',
                  fontWeight: 'bold'
                }}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!selectedAddress}
                  style={{
                    backgroundColor: selectedAddress ? '#000000' : '#cccccc',
                    color: '#ffffff',
                    marginTop: '10px'
                  }}
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Modal
          open={openAddressModal}
          onClose={() => setOpenAddressModal(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <div style={{ 
                position: 'relative', 
                width: '150px', 
                height: '50px',
                marginBottom: '20px'
              }}>
                <Image
                  src={logoImage}
                  alt="Aham Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <Typography variant="h5" style={{ 
                color: '#000000',
                fontWeight: '600',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Add Delivery Address
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                label="Flat No."
                value={newAddress.flatNo}
                onChange={(e) => setNewAddress(prev => ({ ...prev, flatNo: e.target.value }))}
                fullWidth
                InputLabelProps={{
                  style: { color: '#000000' }
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
                InputLabelProps={{
                  style: { color: '#000000' }
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
                inputProps={{ maxLength: 6 }}
                InputLabelProps={{
                  style: { color: '#000000' }
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
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />
              <TextField
                label="City"
                value={newAddress.city}
                disabled
                fullWidth
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />
              <TextField
                label="District"
                value={newAddress.district}
                disabled
                fullWidth
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />
              <TextField
                label="State"
                value={newAddress.state}
                disabled
                fullWidth
                InputLabelProps={{
                  style: { color: '#000000' }
                }}
              />
              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'flex-end', 
                marginTop: '20px'
              }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setOpenAddressModal(false)}
                  style={{
                    borderColor: '#000000',
                    color: '#000000',
                    padding: '10px 30px',
                    textTransform: 'none',
                    fontSize: '16px'
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleAddAddress}
                  style={{ 
                    backgroundColor: '#000000', 
                    color: '#ffffff',
                    padding: '10px 30px',
                    textTransform: 'none',
                    fontSize: '16px'
                  }}
                >
                  Add Address
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
} 