import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider.jsx'
import { CartProvider } from './context/CartProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserContextProvider>
  <CartProvider>
  <App/>
  </CartProvider>
 
  </UserContextProvider>
    
  </BrowserRouter>,
)
