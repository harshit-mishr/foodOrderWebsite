import React from 'react';
import Home from './Pages/Home/Home';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Hotel from './Pages/Hotel/Hotel';
import Cart from  './Pages/Cart/Cart';
import MenuCard from './Pages/MenuCard/MenuCard';
import { FaHotel } from 'react-icons/fa';
import Payment from './Pages/Payment/Payment';
import { MdSettingsInputComposite } from 'react-icons/md';
 

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/hotel' element={<Hotel />} />
      <Route path='/hotel/menucard' element={<MenuCard/>} />
      <Route path='/hotel/menucard/cart' element={<Cart/>} />
      <Route path='/hotel/menucard/cart/payment' element={<Payment/>} />
    </Routes>
  );
}

export default App;
