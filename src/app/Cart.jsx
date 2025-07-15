'use client';
import React from 'react';
import { Box, Typography, IconButton, Button, Card, CardContent, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 500 },
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
  overflow: 'auto',
};

export default function Cart({ open, onClose, cartItems, updateQuantity, removeItem }) {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 10) {
      alert('Order quantity cannot exceed 10 items');
      return;
    }
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Shopping Cart</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ mb: 3 }}>
          {cartItems.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
              Your cart is empty
            </Typography>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2, position: 'relative' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Product Image */}
                    <Box sx={{ width: 80, height: 80, position: 'relative', borderRadius: 1, overflow: 'hidden' }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>

                    {/* Product Details */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Size: {item.size}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          ₹{item.price}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>

                    {/* Delete Button */}
                    <IconButton 
                      size="small" 
                      onClick={() => removeItem(item.id)}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        {/* Subtotal and Checkout */}
        {cartItems.length > 0 && (
          <Box sx={{ borderTop: '1px solid #eee', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Subtotal:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>₹{calculateSubtotal()}</Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ 
                bgcolor: '#0066d6',
                '&:hover': {
                  bgcolor: '#0052a3'
                }
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
} 