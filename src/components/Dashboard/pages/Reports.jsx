import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavbarButton } from '../../ui/resizable-navbar';
import { useNavigate } from 'react-router-dom';

function Reports() {
  const [games,setGames] = useState([]);
  const [error,setError] = useState(null);
  const navigate = useNavigate();


    useEffect(()=> {

    const fetchGame = async () => {
      try{
        const res = await axios.get("http://localhost:5000/api/auth/lastcreategame");
        setGames(res.data)

      }catch(err){
         if (err.response && err.response.status === 404) {
          setError("You haven’t created any game yet. PLz , create a game and make a community  ✌️✌️");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      }
    }
    fetchGame();
    },[]);

  return (


    <>
    
     {/* Heading */}
          <h3 className="text-2xl font-semibold text-black text-center">
            Your Game Stats & Activity
          </h3>
          
          <div className="p-6">
  {/* Three-column grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* 1️⃣ Game Details */}
    <div className="p-4 bg-white shadow-lg rounded-xl">
      {error ? (
        <p className="text-gray-600 text-center py-6">{error}</p>
      ) : games ? (
        <>
          <h3 className="text-xl font-bold mb-6 text-gray-800"> Last Created Games</h3>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{games.sporttype}</h3>
          <p><strong>City:</strong> {games.city}</p>
          <p><strong>Team Length:</strong> {games.teamlength}</p>
          <p><strong>Date:</strong> {games.gamedate}</p>
          <p><strong>Start Time:</strong> {games.starttime}</p>
          <p><strong>Description:</strong> {games.description}</p>
        </>
      ) : (
        <p className="text-gray-500 text-center py-6">Loading...</p>
      )}
    </div>

    {/* 2️⃣ Navigation Buttons */}
    <div className="p-4 bg-cyan-50 shadow-lg rounded-xl flex flex-col justify-center items-center">
      <NavbarButton
        variant="primary"
        className="bg-black text-white w-full mb-4"
        onClick={() => navigate("/dashboard/allcreategame")}
      >
        See All Created Games
      </NavbarButton>

      <NavbarButton
        variant="primary"
        className="bg-black text-white w-full mb-4"
        onClick={() => navigate("/dashboard/joinedgame")}
      >
        See All joined Game
      </NavbarButton>

      <NavbarButton
        variant="primary"
        className="bg-black text-white w-full"
        onClick={() => navigate("/dashboard/creategame")}
      >
        Create New Game
      </NavbarButton>
    </div>

    {/* 3️⃣ Additional Info */}
    <div className="p-4 bg-gray-100 shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Game Insights</h3>
      <ul className="text-gray-700 list-disc list-inside space-y-1">
        <li>Total Games Created: <span className="font-semibold">12</span></li>
        <li>Active Players: <span className="font-semibold">45</span></li>
        <li>Average Team Size: <span className="font-semibold">6</span></li>
        <li>Upcoming Matches: <span className="font-semibold">3</span></li>
      </ul>
    </div>

  </div>

  {/* Stats Section */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
      <h4 className="font-semibold text-gray-700">Matches Played</h4>
      <p className="text-2xl font-bold text-blue-600 mt-2">24</p>
    </div>

    <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
      <h4 className="font-semibold text-gray-700">Wins</h4>
      <p className="text-2xl font-bold text-green-600 mt-2">14</p>
    </div>

    <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
      <h4 className="font-semibold text-gray-700">Team Members</h4>
      <p className="text-2xl font-bold text-purple-600 mt-2">8</p>
    </div>
  </div>

  {/* Reports Section */}
  <div className="mt-6">
    <h4 className="text-lg font-semibold text-gray-800 mb-2">Recent Reports</h4>
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <p className="text-gray-600">
        • You played 2 matches this week.  
        <br />• Your win rate improved by 10%.  
        <br />• 3 new players joined your community.
      </p>
    </div>
  </div>
</div>

    </>
  )
}

export default Reports