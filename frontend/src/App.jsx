import React, { useState, useContext, useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import { StoreContext } from './context/StoreContext'
import Verify from "./pages/verify/Verify";
import MyOrders from './pages/MyOrders/MyOrders'
import PaymentDone from "./pages/verify/PaymentDone";
import AdminApp from './pages/admin/AdminApp'

export default function App() {
  const { token, isAuthLoaded } = useContext(StoreContext);
  const [ShowLogin, setShowLogin] = useState(false);
  const location = useLocation()

  useEffect(() => {
    if (isAuthLoaded) {
      // Disable login prompt for admin routes
      if (!token && !window.location.pathname.startsWith('/admin')) {
        setShowLogin(true);
      } else {
        setShowLogin(false);
      }
    }
  }, [token, isAuthLoaded]);

  return (
    <>
      {ShowLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <>
        {!location.pathname.startsWith('/admin') && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/" element={<div className='App'><Home /></div>} />
          <Route path="/cart" element={<div className='App'><Cart /></div>} />
          <Route path="/order" element={<div className='App'><PlaceOrder /></div>} />
          <Route path="/verify" element={<div className='App'><Verify /></div>} />
          <Route path='/myorders' element={<div className='App'><MyOrders /></div>} />
          <Route path='/paymentdone' element={<div className='App'><PaymentDone /></div>} />
        </Routes>
      </>
      <Footer />
    </>
  )
}
