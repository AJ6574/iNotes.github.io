import {React, useContext} from 'react'
import '../css/navbar.css'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Profile from './Logout'

export default function Navbar() {
  const {user} = useContext(UserContext)
  return (
    <header>
        <div className="left-nav">iNotes</div>
        <nav className="right-nav">
            <ul className="navbar">
                <li className="navitem"><Link className='tab' to="/">Home</Link></li>
                <li className="navitem"><Link className='tab' to="/about">About</Link></li>
                <li className="navitem"><Link className='tab' to="/contact">Contact</Link></li>
                {
                  !user.loggedIn?<li className="navitem"><Link className='tab' to="/login">LogIn</Link></li>:<li id='profile-tab'  className="navitem"><Link className='tab' to="/login">Welcome, {user.userData.Username}</Link><Profile/></li>
                }
            </ul>
        </nav>
    </header>
  )
}
