import React from 'react'
import Navbar from '../../components/admin/Navbar/Navbar'
import SideBar from '../../components/admin/Sidebar/SideBar'
import { Routes, Route } from 'react-router-dom'
import Add from './Add/Add'
import List from './List/List'
import Order from './Orders/Order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './AdminApp.css'

export default function AdminApp() {
  const url = 'http://localhost:4000'
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <SideBar />
          <div className="main-content">
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/order" element={<Order url={url} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
