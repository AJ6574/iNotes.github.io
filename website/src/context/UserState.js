import UserContext from './UserContext'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const UserState = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({userData: {}, auth_token: "", loggedIn: false})
    const host = 'http://localhost:5000'
    const createUser = async (uname, email, password) => {
        const res = await fetch(`${host}/api/auth/new-user`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body:  JSON.stringify({uname, email, password})
          });
          const json = await res.json();
          let type = ''
          let msg = ''
          if(json.jwtToken){
            type = 'success'
            msg = 'You are logged in successfully. Please enjoy the website.'
            getUser(json.jwtToken)
            navigate('/')
          }
          else{
            if(json.errors)
            {
              msg = json.errors[0].msg
            }
            else
            {
              msg = json.msg
            }
            type = 'error'
          }
          document.querySelector('.messege>.messege-content').innerHTML=`<strong>${type.toUpperCase()}!</strong> ${msg}`
          document.querySelector('.messege').style.display = 'flex'
          document.querySelector('.messege').classList.add(type)
    }

    const userLogin = async (uname, password) => {
        const res = await fetch(`${host}/api/auth/user-login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body:  JSON.stringify({uname, password})
          });
          const json = await res.json();
          let msg = ''
          let type = ''
          if(json.jwtToken){
            type = 'success'
            msg = 'You are logged in successfully. Please enjoy the website.'
            getUser(json.jwtToken)
            navigate('/')
          }
          else{
            if(json.errors)
            {
              msg = json.errors[0].msg
            }
            else
            {
              msg = json.msg
            }
            type = 'error'
          }
          document.querySelector('.messege').style.display = 'flex'
          document.querySelector('.messege').classList.add(type)
          document.querySelector('.messege>.messege-content').innerHTML=`<strong>${type.toLocaleUpperCase()}!</strong> ${msg}`
    }
    const getUser = async (token) => {
      const res = await fetch(`${host}/api/auth/get-user`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      })
      const json = await res.json();
      setUser({...user, userData: json.user, auth_token: token, loggedIn: true})
    }
    return(
        <UserContext.Provider value={{createUser, userLogin, user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;