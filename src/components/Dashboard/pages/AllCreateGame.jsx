import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewDetailsPopup from "./ViewDetailsPopup"; // 👈 import popup
import { API_URL,AUTH_ALLCREATEGAME } from "../../../api";
import LoadingScreen from "../../../LoadingScreen.jsxLoadingScreen";

function AllCreateGame() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null); // 👈 Track which game popup to show
  const [loading, setLoading] = useState(true);
  // Fetch all created games
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`${API_URL}${AUTH_ALLCREATEGAME}`, {
          withCredentials: true,
        });
        setGames(res.data);
      } catch (err) {
        console.error("Error fetching games:", err.response?.data || err.message);
      }finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, []);

  if (loading) {
    return <LoadingScreen/> ;
  }

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b  from-black via-blue-950 to-gray-950 border-2  border-t-blue-600 shadow-md  p-6 flex flex-col gap-6 mr-5 ">
        <div className="p-6 bg-gradient-to-r shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-300 mb-6 text-center">
            Your Created Games
          </h2>

          {games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="p-5 bg-blue-100 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {game.sport_type || game.sporttype}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium text-gray-800">City:</span> {game.city}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium text-gray-800">Team Length:</span>{" "}
                      {game.team_length || game.teamlength}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium text-gray-800">Date:</span>{" "}
                      {new Date(game.game_date || game.gamedate).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium text-gray-800">Start Time:</span>{" "}
                      {game.start_time || game.starttime}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <span className="font-medium text-gray-800">Description:</span>{" "}
                      {game.description}
                    </p>
                  </div>

                  {/* ✅ View Details Button */}
                  <button
                    onClick={() => setSelectedGameId(game.id)}
                    className="mt-4 py-2 px-3 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-green-500 transition-all"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 font-medium">No games created yet.</p>
          )}
        </div>
      </div>

      {/* ✅ Show Popup if a game is selected */}
      {selectedGameId && (
        <ViewDetailsPopup
          gameId={selectedGameId}
          onClose={() => setSelectedGameId(null)}
        />
      )}
    </>
  );
}

export default AllCreateGame;
