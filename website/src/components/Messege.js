import React from 'react'
import '../css/messege.css'

export default function Messege() {
    const dismiss = () => {
        document.querySelector('.messege').style.display = 'none'
        document.querySelector('.messege').classList.remove('success')
        document.querySelector('.messege').classList.remove('error')
    }
  return (
    <div className='messege'>
      <div className="messege-content"></div>
        <button className="btn" onClick={dismiss}>X</button>
    </div>
  )
}
