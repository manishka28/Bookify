import React, { useState, useContext, createContext, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Create the CartProvider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
useEffect(()=>{
  let existingCartItem
=localStorage.getItem("cart");
if(existingCartItem) setCart(JSON.parse(existingCartItem));
},[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Create the useCart hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
