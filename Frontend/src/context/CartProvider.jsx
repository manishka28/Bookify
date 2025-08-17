import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./UserContextProvider";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useAuth();

  // Create axios instance
  const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true, // Important for cookies (refresh token)
  });

  // Attach Authorization header dynamically
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle expired tokens (401)
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          // Call refresh endpoint
          const res = await axios.post(
            "http://localhost:4000/user/refresh",
            {},
            { withCredentials: true } // send refreshToken cookie
          );

          const newAccessToken = res.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          // Update Authorization header and retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshErr) {
          console.error("Refresh token failed:", refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );

  // ---- API Calls ----
  const fetchCart = async () => {
    if (!user?._id) {
      console.log("User not logged in");
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/cart/${user._id}`);
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (item) => {
    try {
      const response = await api.post(`/cart`, {
        userId: user._id,
        ...item,
      });
      setCart((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${user._id}/${itemId}`);
      setCart((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      setError(err);
    }
  };

  const updateCartItem = async (itemId, updates) => {
    try {
      const response = await api.put(`/cart/${user._id}/${itemId}`, updates);
      setCart((prev) =>
        prev.map((item) => (item._id === itemId ? response.data : item))
      );
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user?._id]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        error,
        addItemToCart,
        removeItemFromCart,
        updateCartItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
