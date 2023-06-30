import {React, useContext} from 'react'
import NoteContext from '../context/NoteContext'
import '../css/notecards.css'

export default function NoteCards(props) {
    const { setId, setTitle, setDesc} = useContext(NoteContext)
    const {note} = props
    const showDetails = () =>{
      if(props.note.Title != 'Sorry no notes available')
      {
        setTitle(props.note.Title)
        setDesc(props.note.Description)
        setId(props.note._id)
        document.querySelector('.button-container>#update').style.display = 'block'
        document.querySelector('.button-container>#delete').style.display = 'block'
        document.querySelector('.note-form>.form-heading').innerHTML = "Edit Your Note"
      }
      
    }
  return (
      <li className='note' onClick={showDetails}>{props.note.Title}</li>
  )
}
