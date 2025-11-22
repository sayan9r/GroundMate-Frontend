import { useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom';
import { NavbarDemo } from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import { BoxBody } from './components/BoxBody.jsx'
import About from './components/About/About';
import SignUp from './components/SignUp/SignUp';
import { useEffect } from 'react';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import CreateGame from './components/Dashboard/CreateGame.jsx';
import AllCreateGame from './components/Dashboard/pages/AllCreateGame.jsx'
import JoinGame from './components/Dashboard/JoinGame.jsx';
import JoinGamePopup from './components/Dashboard/pages/JoinGamePopup.jsx';
import ViewDetailsPopup from './components/Dashboard/pages/ViewDetailsPopup.jsx';
import ContactUs from './components/contact/ContactUs.jsx';
import TurfGame from './components/Dashboard/TurfGame.jsx';
import StartGame from './components/Dashboard/pages/StartGame.jsx';
import JoinedGame from './components/Dashboard/pages/JoinedGame.jsx';
import Community from './components/commmunity/Community.jsx';


axios.defaults.withCredentials = true;


function App() {
  const [user, setUser] = useState(null);
  //const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=> {
     const fetchUser = async ()=> {
      try{
        const res = await axios.get("http://localhost:5000/api/auth/me");
        setUser(res.data);
        setLoading(false);

      }catch(err){
        setUser(null);
        setLoading(false);

      }
    }
  
    fetchUser();        // call the function

  },[]);

  
  if(loading){
    return <div>Loading...</div>
  }

  return (
   <Router>
     <NavbarDemo user={user} setUser={setUser} />
     <Routes>
          <Route path="/" element={
            <>
              <BoxBody/>
              <About/>
            </>} 
          /> 
         <Route path="/about" element={<About/>} />
         <Route path="/contact" element={<ContactUs/>} />
         <Route path="/community" element={<Community/>} />
         <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp setUser={setUser}/>}/>
         <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser}/>}/> 
         <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser}/> : <Login setUser={setUser}/> } />
         <Route path="/dashboard/creategame" element={<CreateGame user={user}/>} />
         <Route path="/dashboard/allcreategame" element={<AllCreateGame/>} />
         <Route path="/dashboard/joingame" element={<JoinGame/>}/>
         <Route path="/joingamepopup/:id" element={<JoinGamePopup/>}/>
         <Route path="/viewdetailspopup" element={<ViewDetailsPopup/>}/>
         <Route path="/dashboard/turfgame" element={<TurfGame/>}/>
         <Route path="/dashboard/startgame/:gameId" element={<StartGame />} />
         <Route path="/dashboard/joinedgame" element={<JoinedGame />} />
         

         
     </Routes>
     <Footer/>
   </Router>
   
  )
}

export default App
