import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavbarButton } from "../../ui/resizable-navbar";
import { useNavigate } from "react-router-dom";
import { API_URL, AUTH_LASTCREATEGAME, GAMEDETAILS } from "../../../api";

function Reports() {
  const [games, setGames] = useState([]);
  const [gamedetails, setGameDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`${API_URL}${AUTH_LASTCREATEGAME}`);
        setGames(res.data);
        console.log(res.data);
        const res2 = await axios.get(`${API_URL}${GAMEDETAILS}`);
        setGameDetails(res2.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(
            "You haven’t created any game yet. Create one and build your community ✌️",
          );
        } else {
          setError("Something went wrong. Please try again later.");
        }
      }finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, []);

    if (loading) {
    return <div className="h-[80vh] flex items-center justify-center text-white">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen px-6 py-2 text-white">
      {/* Heading */}
      <h3
        className="text-3xl font-bold text-center mb-10
        bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        Your Game Stats & Activity
      </h3>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Game Details */}
        <div className="bg-black border border-transparent rounded-xl p-6 space-y-3 hover:border-blue-700">
          <h3
            className="text-xl font-semibold 
            bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent"
          >
            Last Created Game
          </h3>

          {error ? (
            <p className="text-gray-400 text-center">{error}</p>
          ) : games ? (
            <>
              <p>
                <span className="text-gray-400">Sport:</span> {games.sporttype}
              </p>
              <p>
                <span className="text-gray-400">City:</span> {games.city}
              </p>
              <p>
                <span className="text-gray-400">Team Size:</span>{" "}
                {games.teamlength}
              </p>
              <p>
<span className="text-gray-400">Date: </span> 
{new Date(games.gamedate).toLocaleDateString("en-GB")}

              </p>
              <p>
                <span className="text-gray-400">Start Time:</span>{" "}
                {games.starttime}
              </p>
              <p className="text-gray-300 text-sm">{games.description}</p>
            </>
          ) : (
            <p className="text-gray-500 text-center">Loading...</p>
          )}
        </div>

        {/* Navigation */}
        <div
          className="bg-black border border-transparent  rounded-xl p-6 
          flex flex-col justify-center gap-4 hover:border-blue-700"
        >
          <h3
            className="text-xl font-semibold text-center 
            bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
          >
            Quick Actions
          </h3>

          <NavbarButton
            className="bg-blue-900 hover:bg-blue-800 text-white"
            onClick={() => navigate("/dashboard/allcreategame")}
          >
            All Created Games
          </NavbarButton>

          <NavbarButton
            className="bg-blue-900 hover:bg-blue-800 text-white"
            onClick={() => navigate("/dashboard/joinedgame")}
          >
            Joined Games
          </NavbarButton>

          <NavbarButton
            className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
            onClick={() => navigate("/dashboard/creategame")}
          >
            Create New Game
          </NavbarButton>
        </div>

        {/* Insights */}
        <div className="bg-black border border-transparent  rounded-xl p-6 hover:border-blue-700 ">
          <h3
            className="text-xl font-semibold mb-4 
            bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          >
            Game Insights
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>
              Total Games Created:{" "}
              <span className="font-bold text-white">
                {gamedetails?.game.total_created_game || 0}
              </span>
            </li>
            <li>
              Active Players: <span className="font-bold text-white">-</span>
            </li>
            <li>
              Avg Team Size:{" "}
              <span className="font-bold text-white">
                {gamedetails?.game.avg_length
                  ? Number(gamedetails.game.avg_length).toFixed(0)
                  : 0}
              </span>
            </li>
            <li>
              Upcoming Matches: <span className="font-bold text-white">3</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        {[
          { label: "Matches Played", value: gamedetails?.totalmatches  || 0, color: "text-blue-400" },
          { label: "Wins", value:  0, color: "text-green-400" },
          { label: "Team Members", value: 8, color: "text-purple-400" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#121212] border border-blue-900 rounded-xl p-6 text-center"
          >
            <h4 className="text-gray-400">{item.label}</h4>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Reports */}
      <div className="mt-10 bg-black border border-transparent rounded-xl p-6 hover:border-blue-700">
        <h4
          className="text-xl font-semibold mb-3 
          bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Recent Reports
        </h4>

        <p className="text-gray-400 leading-relaxed">
          • You played 2 matches this week <br />
          • Win rate improved by 10% <br />• 3 new players joined your community
        </p>
      </div>
    </div>
  );
}

export default Reports;
