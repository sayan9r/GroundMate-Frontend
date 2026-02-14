import React, { useEffect, useState } from "react";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, MapPin, UserPlus } from "lucide-react";
import { ADD_PLAYER, API_URL, NEARBY_USERS } from "../../../api";
import LoadingScreen from "../../../LoadingScreen.jsxLoadingScreen";
import { useParams } from "react-router-dom";

function NearbyTeammates() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const {gameRoomId} = useParams();

  // Fetch nearby users
  useEffect(() => {
    const fetchNearbyUsers = async () => {
      try {
        const res = await axios.get(
          `${API_URL}${NEARBY_USERS}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(gameRoomId);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching nearby users");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
  }, []);

  // Add user to game room
  const handleAddUser = async (userId) => {
    try {
      await axios.post(
            `${API_URL}${ADD_PLAYER}`,
        { gameRoomId, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Remove user from list after adding
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Failed to add user");
    }
  };

  // Remove from UI only
  const handleReject = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  if (loading) return <LoadingScreen/>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b  from-black via-blue-950 to-gray-950 border-2  border-t-blue-600">
        <div className="max-w-3xl mx-auto p-6 text-white">
      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-500/20 p-2 rounded-lg">
          <MapPin className="text-blue-400" size={24} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Nearby <span className="text-blue-400">Players</span>
          <span className="block text-sm font-normal text-gray-400 mt-1">Within 1 KM of your location</span>
        </h2>
      </div>

      {users.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl"
        >
          <p className="text-gray-500 text-lg">Searching for challengers...</p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {users.map((user) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="group flex items-center justify-between bg-gray-900/50 backdrop-blur-md border border-gray-800 p-5 rounded-2xl shadow-xl hover:border-blue-500/50 transition-colors"
              >
                {/* Left Side: Profile Info */}
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={user.profile_image ? `http://localhost:5000/uploads/${user.image}` : "/default_image.png"}
                      alt={user.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-800 group-hover:ring-blue-500 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                  </div>
                  <div>
                    <span className="text-xl font-semibold block">{user.name}</span>
                    <span className="text-xs text-blue-400 uppercase tracking-wider font-bold">Pro Player</span>
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(user.id)}
                    className="p-3 rounded-xl bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all"
                    title="Skip"
                  >
                    <X size={22} />
                  </button>
                  
                  <button
                    onClick={() => handleAddUser(user.id)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] px-5 py-3 rounded-xl font-bold transition-all active:scale-95"
                  >
                    <UserPlus size={20} />
                    <span>connect</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
    </div>
  );
}

export default NearbyTeammates;
