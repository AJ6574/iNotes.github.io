import {React, useContext} from 'react'
import UserContext from '../context/UserContext'
import '../css/logout.css'

export default function Profile() {
    const {setUser} = useContext(UserContext)
    const logout = () => {
        setUser({userData: {}, auth_token: "", loggedIn: false})
        document.querySelector('.messege').style.display = 'flex'
        document.querySelector('.messege').classList.add('success')
        document.querySelector('.messege>.messege-content').innerHTML='<strong>Success!</strong> You have been logged out successfully.'
    }
  return (
    <div className="profile">
        <button className="logout" onClick={logout}>Log Out</button>
    </div>
  )
}
