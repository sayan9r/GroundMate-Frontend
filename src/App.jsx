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
import TurfGame from './components/Turfgame/TurfGame.jsx';
import StartGame from './components/Dashboard/pages/StartGame.jsx';
import JoinedGame from './components/Dashboard/pages/JoinedGame.jsx';
import Community from './components/commmunity/Community.jsx';
import { API_URL,AUTH_BASE } from './api.js';
import MakeCommunity from './components/commmunity/MakeCommunity.jsx';
import Community_Dashboard from './components/commmunity/Community_Dashboard.jsx';
import JoinCommunity from './components/commmunity/JoinCommunity.jsx';
import MembersPopup from './components/commmunity/MembersPopup.jsx';
import Seetings from './components/Settings/Settings.jsx';
import GlobalCommunity from './components/commmunity/GlobalCommunity.jsx';
import JoinedCommunity from './components/commmunity/JoinedCommunity.jsx';
import CreatePost from './components/commmunity/CreatePost.jsx';
import CommunityProfile from './components/commmunity/CommunityProfile.jsx';
import EditPost from './components/commmunity/EditPost.jsx';
import CreateTournament from './components/commmunity/CreateTournament.jsx';
import GlobalTournament from './components/commmunity/GlobalTournament.jsx';


axios.defaults.withCredentials = true;


function App() {
  const [user, setUser] = useState(null);
  //const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=> {
     const fetchUser = async ()=> {
      try{
        const res = await axios.get(`${API_URL}${AUTH_BASE}/me`);
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
    {/* use navbar for fixed , all position */}
     <NavbarDemo user={user} setUser={setUser} />   
     <Routes>
          <Route path="/" element={
            <>
              <BoxBody/>
              <About/>
               <Footer/>
            </>} 
          /> 
         <Route path="/about" element={<About/>} />
         <Route path="/contact" element={<ContactUs/>} />
         <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp setUser={setUser}/>}/>
         <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser}/>}/> 
         <Route path="/seetings" element={user ? <Seetings user={user}/> : <Login setUser={setUser}/>}/> 
         <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser}/> : <Login setUser={setUser}/> } />
         <Route path="/dashboard/creategame" element={user ? <CreateGame user={user}/> : <Login setUser={setUser}/>} />
         <Route path="/dashboard/allcreategame" element={<AllCreateGame/>} />
         <Route path="/dashboard/joingame" element={user ? <JoinGame/> : <Login setUser={setUser}/>}/>
         <Route path="/joingamepopup/:id" element={user ? <JoinGamePopup/> : <Login setUser={setUser}/> }/>
         <Route path="/viewdetailspopup" element={user ? <ViewDetailsPopup/> : <Login setUser={setUser}/> }/>
         <Route path="/dashboard/turfgame" element={<TurfGame/>}/>
         <Route path="/dashboard/startgame/:gameId" element={<StartGame />} />
         <Route path="/dashboard/joinedgame" element={user ? <JoinedGame /> : <Login setUser={setUser}/> } />
         <Route path="/community" element={user ? <Community/> : <Login setUser={setUser}/> } />
         <Route path="/community/makecommunity" element={user ? <MakeCommunity /> : <Login setUser={setUser}/>} />
         <Route path="/community/communitys-dashboard" element={user ? <Community_Dashboard /> : <Login setUser={setUser}/>} />
         <Route path="/community/join-community" element={user ? <JoinCommunity /> : <Login setUser={setUser}/>} />
         <Route path="/community/joined-community" element={user ? <JoinedCommunity /> : <Login setUser={setUser}/>} />
         <Route path="/community/all-members" element={user ? <MembersPopup /> : <Login setUser={setUser}/>} />
         <Route path="/community/global-blogs" element={user ? <GlobalCommunity /> : <Login setUser={setUser}/>} />
         <Route path="/community/:communityId/post" element={user ? <CreatePost /> : <Login setUser={setUser}/>} />
         <Route path="/community/:communityId" element={user ? <CommunityProfile /> : <Login setUser={setUser}/>} />
         <Route path="/community/:communityId/edit/:postId" element={user ? <EditPost /> : <Login setUser={setUser}/>}/>
         <Route path="/community/:communityId/tournament" element={user ? <CreateTournament /> : <Login setUser={setUser}/> }/>
         <Route path="/community/tournaments" element={user ? <GlobalTournament/> : <Login setUser={setUser}/> }/>

         
     </Routes>
    
   </Router>
   
  )
}

export default App
