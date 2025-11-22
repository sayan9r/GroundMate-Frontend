import React, { useEffect, useState } from "react";
import axios from "axios";

function JoinedGame() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedGames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/myjoinedgames", {
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
    return <p className="text-center text-white mt-10">Loading your joined games...</p>;
  }

  if (games.length === 0) {
    return <div className="min-h-screen">
      <p className="text-center text-white mt-10">You haven’t joined any games yet.</p>
    </div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-700 via-gray-200 to-white shadow-md rounded-xl p-6 flex flex-col gap-6 mr-5">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Joined Games
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((g) => (
          <div
            key={g.id}
            className="p-5 bg-white rounded-2xl shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {g.game}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {new Date(g.gamedate).toLocaleDateString()}
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
              className={`text-sm font-medium mt-2 ${
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
