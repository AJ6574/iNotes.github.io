import {React, useContext} from 'react'
import NoteContext from '../context/NoteContext'
import '../css/shownotes.css'
import NoteCards from './NoteCards'

export default function Show_Notes() {
  const context = useContext(NoteContext)
  const {notes, getNotes} = context
  async function handleViewNotes(){
    getNotes()
  }
  return (
    <aside className='view-notes'>
        <h2 className='aside-heading'>Your Notes</h2>
        <ul className='allnotes'>
        {notes.map((note)=>{
          return <NoteCards note={note}/>
        })}
        </ul>
        <button className="btn" onClick={handleViewNotes}>View Notes</button>
    </aside>
  )
}
