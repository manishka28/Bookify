import React from 'react'
import Home from './components/Home/Home'
import {Routes,Route} from "react-router-dom"
import Footer from './components/Footer'
import Library from './components/Library'
import Navigation from './components/Navigation'
import Purchases from './pages/Purchases'
import CartPage from './pages/CartPage'


export default function App() {
  return (
    <>
    <div className='dark:bg-slate-900 dark:text-white'>
    <Navigation/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/library' element={<Library/>}/>
      <Route path="/library/:name" Component={Library}element={<Library/>}/>
      <Route path="/purchases" Component={Purchases} element={<Purchases/>}/>
      <Route path="/cart" Component={CartPage} element={<CartPage/>}/>
    </Routes>
    <Footer/>
    </div>
    </>
  )
}
