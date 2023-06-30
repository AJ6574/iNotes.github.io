import { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import UserContext from '../context/UserContext'
import '../css/note_form.css'

export default function Note_Form() {
  const {addNote, title, desc, setTitle, setDesc, deleteNote, id, updateNote} = useContext(NoteContext)
  const {user} = useContext(UserContext)
  
  const handleTitle = (event) =>{
    setTitle(event.target.value)
  }
  const handleDesc = (event) =>{
    setDesc(event.target.value)
  }
  const handleSubmit = () =>{
    let type = ''
    if(user.auth_token != ''){
      addNote(title, desc)
      handleReset()
      type = 'success'
      document.querySelector('.messege>.messege-content').innerHTML='<strong>Success!</strong> Note has been saved successfully. Click on "View Notes" Button to see changes.'
    }
    else{
      type = 'error'
      document.querySelector('.messege').classList.add('error')
      document.querySelector('.messege>.messege-content').innerHTML='<strong>Error!</strong> Please login first.'
    }
    document.querySelector('.messege').style.display = 'flex'
    document.querySelector('.messege').classList.add(type)
    document.querySelector('.button-container>#update').style.display = 'none'
    document.querySelector('.button-container>#delete').style.display = 'none'
  }
  const handleReset = () =>{
    setTitle('')
    setDesc('')
    document.querySelector('.button-container>#update').style.display = 'none'
    document.querySelector('.button-container>#delete').style.display = 'none'
  }
  const handleUpdate = async () => {
      const json = await updateNote(id, title, desc)
      if(json != null){
        handleReset()
        document.querySelector('.messege').style.display = 'flex'
        document.querySelector('.messege').classList.add('success')
        document.querySelector('.messege>.messege-content').innerHTML='<strong>Success!</strong> Note has been updated successfully. Click on "View Notes" Button to see changes.'
        document.querySelector('.button-container>#submit').style.display = 'block'
        document.querySelector('.button-container>#reset').style.display = 'block'
        document.querySelector('.button-container>#update').style.display = 'none'
        document.querySelector('.button-container>#delete').style.display = 'none'
        document.querySelector('.note-form>.form-heading').innerHTML = "Create New Note"
      }
      
  }
  const handleDelete = async () => {
      const json = await deleteNote(id)
      if(json != null){
        handleReset()
        document.querySelector('.messege').style.display = 'flex'
        document.querySelector('.messege').classList.add('success')
        document.querySelector('.messege>.messege-content').innerHTML='<strong>Success!</strong> Note has been deleted successfully. Click on "View Notes" Button to see changes.'
        document.querySelector('.button-container>#submit').style.display = 'block'
        document.querySelector('.button-container>#reset').style.display = 'block'
        document.querySelector('.button-container>#update').style.display = 'none'
        document.querySelector('.button-container>#delete').style.display = 'none'
        document.querySelector('.note-form>.form-heading').innerHTML = "Create New Note"
      }
      
  }

  return (
    <div className='note-form'>
      <h2 className='form-heading'>Create New Note</h2>
      <input type="text" name="title" id="title" onChange={handleTitle} value={title} placeholder='Enter Title here'/>
      <textarea name="desc" id="desc" onChange={handleDesc} value={desc} placeholder='Enter Content here'/>
      <div className="button-container">
        <button className="btn" id='submit' onClick={handleSubmit}>Create</button>
        <button className="btn" id='reset' onClick={handleReset}>Reset</button>
        <button className="btn" id='update' onClick={handleUpdate}>Update</button>
        <button className="btn" id='delete' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}
