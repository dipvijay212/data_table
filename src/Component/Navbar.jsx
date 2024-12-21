import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        marginBottom:"20px",
        padding: '10px',
        borderRadius: '5px',
        gap:"15px"
      }}>
      <NavLink to="/Home" style={({ isActive }) => ({
         color: isActive ? "red" : "#007BFF",
       })}>Home</NavLink>
      <NavLink to="/Product" style={({ isActive }) => ({
         color: isActive ? "red" : "#007BFF",
       })}>About</NavLink>
      <NavLink to="/Addproduct" style={({ isActive }) => ({
         color: isActive ? "red" : "#007BFF",
       })}>Addproduct</NavLink>
      <NavLink to="/Login" style={({ isActive }) => ({
         color: isActive ? "red" : "#007BFF",
       })}>Login</NavLink>
      
    </div>
  )
}

export default Navbar
