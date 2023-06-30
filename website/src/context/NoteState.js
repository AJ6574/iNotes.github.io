import NoteContext from "./NoteContext";
import context from "./UserContext";
import { useState, useContext } from "react";


const NoteState = (props) =>{
    const {user} = useContext(context)
    const auth_token = user.auth_token
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [id, setId] = useState('')
    const host = "http://localhost:5000"
    const getNotes = async (title) => {
      if(auth_token != ''){
        const res = await fetch(`${host}/api/notes/fetch-note`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token
        }
      });
      let json = await res.json();
      if(json.length == 0){
        json = [{Title: 'Sorry no notes available', Description:""}]
      }
      setNotes(json)
      }
      else{
        const json = [{Title: 'Sorry no notes available', Description:""}]
        setNotes(json)
      }
    }

    const addNote = async (title, desc) =>{
      const res = await fetch(`${host}/api/notes/add-note`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token
        },
        body:  JSON.stringify({title, desc})
      });
      const json = await res.json();
    }
    const updateNote = async (id, title, desc) =>{
      const isUpdate = window.confirm("Are you sure you want to update this note?")
      if(isUpdate){
        const res = await fetch(`${host}/api/notes/update-note`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token,
            "id": id,
          },
          body:  JSON.stringify({newtitle: title, newdesc: desc})
        });
          const json = await res.json
          return json
      }
      else{
        const json = null
        return json
      }
    }

    const deleteNote = async (id) =>{
      const isDelete = window.confirm("Are you sure you want to delete this note?")
      if(isDelete){
        const res = await fetch(`${host}/api/notes/delete-note`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "id": id,
        },
        });
        const json = await res.json()
        return json
      }
      else{
        const json = null
        return json
      }
    }

    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, title, setTitle, desc, setDesc, id, setId, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;