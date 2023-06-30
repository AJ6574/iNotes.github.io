import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from'react-router-dom'
import '../css/user_form.css'
import context from '../context/UserContext'


export default function SignUp() {
    const navigate = useNavigate()
    const {createUser} = useContext(context)
    const [uname, setUname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleuname = (e) =>{
        setUname(e.target.value)
    }
    const handlemail = (e) =>{
        setEmail(e.target.value)
    }
    const handlepassword = (e) =>{
        setPassword(e.target.value)
    }
    const handlesignup = async () =>{
        createUser(uname, email, password)
        setUname('')
        setEmail('')
        setPassword('')
    }
  return (
    <div className="user">
        <h2 className='user-heading'>Create New Account</h2>
        <input type="text" name="uname" id="uname" value={uname} onChange={handleuname} placeholder='Enter Username here'/>
        <input type="email" name="email" id="email" value={email} onChange={handlemail} placeholder='Enter Email here'/>
        <input type="password" name="password" id="password" value={password} onChange={handlepassword} placeholder='Enter Password here'/>
        <button className='btn' onClick={handlesignup}>Sign Up</button>
        <p className="user-text">Already have an account? <Link to='/login' className='signup'>LogIn now</Link></p>
    </div>
  )
}
