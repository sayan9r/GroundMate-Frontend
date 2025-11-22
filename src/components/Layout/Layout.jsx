import React from 'react'
import { NavbarDemo } from '../Header/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <>
    <NavbarDemo/>
    <Outlet/>
    <Footer/>

    </>
  )
}

export default Layout