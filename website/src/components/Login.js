import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from'react-router-dom'
import context from '../context/UserContext'
import '../css/user_form.css'

export default function Login() {
    const navigate = useNavigate()
    const {userLogin} = useContext(context)
    const [uname, setUname] = useState('')
    const [password, setPassword] = useState('')

    const handleuname = (e) =>{
        setUname(e.target.value)
    }
    const handlepassword = (e) =>{
        setPassword(e.target.value)
    }
    const handlelogin = async () =>{
      userLogin(uname, password)
      setUname('')
      setPassword('')
    }
  return (
    <div className="user">
        <h2 className='user-heading'>Log In</h2>
        <input type="text" name="uname" id="uname" onChange={handleuname} value={uname} placeholder='Enter Username here'/>
        <input type="password" name="password" id="password" onChange={handlepassword} value={password} placeholder='Enter Password here'/>
        <button className='btn' onClick={handlelogin}>Log In</button>
        <p className="user-text">Don't have an account? <Link to='/signup' className='signup'>Create One</Link></p>
    </div>
  )
}
