import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './SideBar.css'

function SideBar() {
  const user = useSelector(state => state.auth.user)

  const vistorSidebar = (
    <ul>
      <li><Link to="login">Login</Link></li>
      <li><Link to="register">Register</Link></li>
    </ul>
  )

  const adminSidebar = (
    <ul>
      <li><Link to="manager">Managers</Link></li>
      <li><Link to="addmanager">Add Manager</Link></li>
      <li><Link to="products">Products</Link></li>
      <li><Link to="addproduct">Add Product</Link></li>
      <li><Link to="logout">Logout</Link></li>
    </ul>
  )

  const managerSidebar = (
    <ul>
      <li><Link to="login">Products</Link></li>
      <li><Link to="login">Add Product</Link></li>
      <li><Link to="login">Logout</Link></li>
    </ul>
  )

  return (
    <div className='sidebar'>
        {!user && vistorSidebar}
        {user && !user.isAdmin && managerSidebar}
        {user && user.isAdmin && adminSidebar}
    </div>
  )
}

export default SideBar