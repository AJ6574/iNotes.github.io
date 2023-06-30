import {React, useState, useContext} from 'react'
import UserContext from '../context/UserContext'
import '../css/contact.css'
import emailjs from 'emailjs-com';

export default function Contact() {
    const {user} = useContext(UserContext)
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const handleSubject = (e) =>{
        setSubject(e.target.value)
    }
    const handleBody = (e) =>{
        setBody(e.target.value)
    }
  return (
    <>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script type="text/javascript">
        {(function() {
            // https://dashboard.emailjs.com/admin/account
            emailjs.init('pMjJFjhL_BCmASV49');
        })()}
    </script>
    <script type="text/javascript">
        {
            window.onload = function (){
                document.getElementById('contact-form').addEventListener('submit', (event)=>{
                event.preventDefault();
                emailjs.sendForm('iNotes_Contact-Service', 'iNotes_Contact-Form', this)
                    .then(function() {
                        console.log('SUCCESS!');
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
            })
            }
            
        }
    </script>
    <h2 className='contact-heading'>Contact Me</h2>
    <p className="contact-text">As this website is maintained only by me so there may exist some bugs or errors. So, if you face any kind of problems then please mail me and let me know about the problem. This will help me to make this website fully functional. If you want to contact me for some other reasons then also don't hesitate to mail me. Sorry for any kind of inconvenience. Thank You.</p>
    <form id='contact-form' className="contact-form">
        <h3 className="form-heading">Send Me a Mail</h3>
        <input type="hidden" name="to_name" value='AJ'/>
        <input type="hidden" name="from_name" value={user.userData.Username}/>
        <input type="text" name="subject" id="subject" placeholder='Enter Subject of the Email' value={subject} onChange={handleSubject}/>
        <textarea name="body" id="messege" placeholder='Enter Content of the Email' value={body} onChange={handleBody}/>
        <input type='submit' className="btn" value='Send Mail'/>
    </form>
    </>
  )
}
