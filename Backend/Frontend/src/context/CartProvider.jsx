import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './UserContextProvider';

// Create the CartContext
const CartContext = createContext();

// Create the CartProvider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors
  const [userId] = useAuth(); // Get the user ID from useAuth()

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching cart for userId:', userId);
        const response = await axios.get(`http://localhost:4001/cart/${userId._id}`);
        console.log('Cart data fetched:', response.data);
        setCart(response.data);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const addItemToCart = async (item) => {
    try {
      const response = await axios.post(`http://localhost:4001/cart`, {
        userId: userId._id,
        ...item
      });
      console.log('Item added to cart:', response.data);
      setCart((prevCart) => [...prevCart, response.data]);
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      setError(err);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:4001/cart/${userId._id}/${itemId}`);
      console.log('Item removed from cart:', response.data);
      setCart((prevCart) => prevCart.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
      setError(err);
    }
  };

  const updateCartItem = async (itemId, updates) => {
    try {
      const response = await axios.put(`http://localhost:4001/cart/${userId._id}/${itemId}`, updates);
      console.log('Cart item updated:', response.data);
      setCart((prevCart) => prevCart.map(item => item._id === itemId ? response.data : item));
    } catch (err) {
      console.error('Failed to update cart item:', err);
      setError(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, loading, error, addItemToCart, removeItemFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Create the useCart hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
