import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, CREATE_GAMEROOM } from "../../../api";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../LoadingScreen.jsxLoadingScreen";

function CreateGameRoom({ user }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      setLoading(true); // Start loading

      const res =  await axios.post(
        `${API_URL}${CREATE_GAMEROOM}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const gameRoomId = res.data.id;
      setMessage("Game Room Created Successfully!");
      setError("");

      navigate(`/dashboard/gameroom/${gameRoomId}/nearby`);

    } catch (err) {
      setError(err.response?.data?.message || "Error creating room");
      setMessage("");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Show full screen loader
  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4 text-center">
          {user?.name}'s Game Room
        </h1>

        <div className="bg-yellow-500/10 border border-yellow-500 p-4 rounded-lg mb-6 text-sm space-y-2">
          <p>⚠ You can create only one room at a time.</p>
          <p>⏳ Room will be valid for 5 hours after creation.</p>
        </div>

        <button
          onClick={handleCreateRoom}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>

        {message && (
          <p className="text-green-400 mt-4 text-center">{message}</p>
        )}

        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default CreateGameRoom;
