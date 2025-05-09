import React, { useState, useContext, useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import { StoreContext } from './context/StoreContext'
import Verify from "./pages/verify/Verify";
import MyOrders from './pages/MyOrders/MyOrders'


export default function App() {

  const { token, isAuthLoaded } = useContext(StoreContext);
  const [ShowLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (isAuthLoaded) {
      if (!token) {
        setShowLogin(true);
      } else {
        setShowLogin(false);
      }
    }
  }, [token, isAuthLoaded]);

  return (
    <>
      {ShowLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className='App'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          < Route path="/" element={<Home />} />
          < Route path="/cart" element={<Cart />} />
          < Route path="/order" element={<PlaceOrder />} />
          < Route path="/verify" element={<Verify />} />
          < Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
