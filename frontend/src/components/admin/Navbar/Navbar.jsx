import React from 'react'
import './Navbar.css'
import { assets } from '../../../assets/assets'

export default function Navbar() {
    return (
        <>
        <div className="navbar">
            <img className='logo' src={assets.logo_admin} alt="" />
            {/* Removed duplicate logo image */}
            <img className='profile' src={assets.profile_image} alt="" /> 
        </div>
        </>
    )
}
