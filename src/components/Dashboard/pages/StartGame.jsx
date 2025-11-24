import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, AUTH_STARTGAME } from "../../../api";


function StartGame() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [createduser,setCreatedUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}${AUTH_STARTGAME}/${gameId}`,
          { withCredentials: true }
        );
        setGame(res.data.game);
        setCreatedUser(res.data.createduser);
        setPlayers(res.data.players);
      } catch (err) {
        console.error("Error loading game data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [gameId]);

  if (loading) return <p className="text-center mt-10">Loading game info...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white to-gray-700 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full sm:w-3/4 md:w-1/2">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {game?.sporttype || "Game"} Ready to Start!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Date: {new Date(game?.gamedate).toLocaleDateString()} <br />
          Start Time: {game?.starttime} <br />
          City: {game?.city}
        </p>
        
        
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
           Created by : {createduser.name}
        </h2>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Accepted Players:
        </h2>
        <ul className="mb-6">
          {players.map((p) => (
            <li
              key={p.id}
              className="border rounded-md p-2 my-1 flex justify-between text-gray-700"
            >
              <span>{p.name}</span>
              <span className="text-sm text-gray-500">{p.contact_no}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => alert("play and Enjoy 🤠🤠")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Start Game
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartGame;
