import './css/app.css';
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Messege from './components/Messege';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <NoteState> 
      <Navbar/>
      <Messege/>
        <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/about' element={<About/>} />
          <Route path = '/contact' element={<Contact/>} />
          <Route path = '/login' element={<Login/>} />
          <Route path = '/signup' element={<SignUp/>} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
