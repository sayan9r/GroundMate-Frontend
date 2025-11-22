import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinGame() {
     const [games,setGames] = useState([]);
    // const [buttontext,setButtonText] = ("Join");
     const navigate = useNavigate();
    
    
        useEffect(()=> {
    
        const fetchGame = async () => {
          try{
            const res = await axios.get("http://localhost:5000/api/auth/joingame",{ withCredentials: true });
            setGames(res.data)
            
    
          }catch(err){
            console.error("Error fetching games:", err.response?.data || err.message);
          }
        }
        fetchGame();
        },[]);
  return (
     <>
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-700 via-gray-200 to-white shadow-md rounded-xl p-6 flex flex-col gap-6 mr-5 ">
    <div className="p-6 bg-gradient-to-r  shadow-lg">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
    Games near you .
  </h2>

  {games.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, index) => (
        <div
          key={index}
          className="p-5 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {game.sport_type || game.sporttype}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">City:</span> {game.city}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">Team Length:</span> {game.team_length || game.teamlength}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">Date:</span>{" "}
              {new Date(game.game_date || game.gamedate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">Start Time:</span> {game.start_time || game.starttime}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <span className="font-medium text-gray-700">Description:</span>{" "}
              {game.description}
            </p>
          </div>

          <button className="mt-4 py-2 px-3 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-green-500 transition-all"
                 onClick={async() => {
                    try {
                      const res = await axios.get(
                     `http://localhost:5000/api/auth/total-accepted/${game.id}`,
                      { withCredentials: true }
                      );

                   const { acceptedCount, teamLength, teamFull } = res.data;

      if (teamFull) {
        alert("The team length is already full! Please try another game.");
        
      } else {
        navigate(`/joingamepopup/${game.id}`);
      }
    } catch (err) {
      console.error("Error checking team status:", err);
      alert("Something went wrong while checking team status!");
    }
                 }}
          >
            join
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-600 font-medium">No games created yet.</p>
  )}
</div>

               
        </div>
    




    </>
  )
}

export default JoinGame