import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './UserContextProvider';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useAuth(); //
  // console.log("con",user);
  

 const fetchCart = async () => {
  if (!user?._id) {
    console.log("User not logged in");
    setLoading(false);
    return;
  }

  try {
    console.log('Fetching cart for user:', user._id);
    const response = await axios.get(`http://localhost:4000/cart/${user._id}`);
    console.log('Cart data fetched:', response.data);
    setCart(response.data);
    setError(null); 
  } catch (err) {
    console.error('Failed to fetch cart:', err);
    setError(err);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchCart();
}, [user?._id]);



  const addItemToCart = async (item) => {
  try {
    const response = await axios.post(`http://localhost:4000/cart`, {
      userId: user._id,
      ...item
    });
    console.log('Item added to cart:', response.data);
    setCart(prev => [...prev, response.data]);
  } catch (err) {
    console.error('Failed to add item to cart:', err);
    setError(err);
    throw err; // Re-throw so caller can handle it immediately
  }
};


  const removeItemFromCart = async (itemId) => {
    console.log("Item Id,",itemId);
    
    try {
      const response = await axios.delete(`http://localhost:4000/cart/${user._id}/${itemId}`);
      console.log('Item removed from cart:', response.data);
      setCart(prev => prev.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
      setError(err);
    }
  };

  const updateCartItem = async (itemId, updates) => {
    try {
      const response = await axios.put(`http://localhost:4000/cart/${user._id}/${itemId}`, updates);
      console.log('Cart item updated:', response.data);
      setCart(prev => prev.map(item => item._id === itemId ? response.data : item));
    } catch (err) {
      console.error('Failed to update cart item:', err);
      setError(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, loading, error, addItemToCart, removeItemFromCart,fetchCart}}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
