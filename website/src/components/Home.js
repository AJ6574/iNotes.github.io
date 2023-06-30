import React from 'react'
import Note_Form from './Note_Form'
import ShowNotes from './ShowNotes'

export default function Home() {
  return (
    <>
    <section className='upper-note-sec'>
        <Note_Form/>
        <ShowNotes/>
    </section>
    </>
    
  )
}
