import React from 'react'
import { useSelector } from 'react-redux'
import './Header.css'
function Header() {
  const user = useSelector(state => state.auth.user)
  return (
    <div className="header">
        <h1>Orange Summer Camp Test</h1>
        <p>Hello {user ? user.name : "Visitor"}!</p>
    </div>
  )
}

export default Header