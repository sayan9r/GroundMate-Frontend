import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL,AUTH_MYJOINEDGAMES } from "../../../api";
import LoadingScreen from "../../../LoadingScreen.jsxLoadingScreen";

function JoinedGame() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedGames = async () => {
      try {
        const res = await axios.get(`${API_URL}${AUTH_MYJOINEDGAMES}`, {
          withCredentials: true,
        });
        console.log(res.data);
        setGames(res.data);
      } catch (err) {
        console.error("Error fetching joined games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedGames();
  }, []);

  if (loading) {
    return <LoadingScreen/>;
   
  }

  if (games.length === 0) {
    return <div className="min-h-screen">
      <p className="text-center text-white mt-10">You haven’t joined any games yet.</p>
    </div>;
  }

  return (
    <div className="min-h-screen w-full  bg-gradient-to-b  from-black via-blue-950 to-gray-950 border-2  border-t-blue-600 shadow-md  p-6 flex flex-col gap-6 mr-5">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-300 ">
        Your Joined Games
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((g) => (
          <div
            key={g.id}
            className="p-5 bg-blue-100 rounded-2xl shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-black mb-2">
              {g.game}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {new Date(g.gamedate).toLocaleDateString("en-GB")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Time:</strong> {g.starttime}
            </p>
            <p className="text-sm text-gray-600">
              <strong>City:</strong> {g.city}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Created By:</strong> {g.host_name}
            </p>
            {/* <p className="text-sm text-gray-600">
              <strong>Players:</strong> {g.accepted_players}/{g.teamlength}
            </p> */}
            <p
              className={`text-lg font-medium mt-2 ${
                g.join_status === "accepted"
                  ? "text-green-600"
                  : g.join_status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {g.join_status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JoinedGame;
