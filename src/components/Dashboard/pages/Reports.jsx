import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, Activity, Calendar, Users, MapPin, 
  ArrowRight, Sparkles, TrendingUp 
} from "lucide-react";
import { API_URL, AUTH_LASTCREATEGAME, CHECK_GAMEROOM, GAMEDETAILS } from "../../../api";
import LoadingScreen from "../../../LoadingScreen.jsxLoadingScreen";
import JoinRequests from "./JoinRequests";
import { NavbarButton } from "../../ui/resizable-navbar";

function Reports() {
  const [games, setGames] = useState(null);
  const [gamedetails, setGameDetails] = useState(null);
  const [gameroom, setGameroom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [hasRoom, setHasRoom] = useState(false);


  useEffect(() => {
  const fetchGame = async () => {
   try {
  const token = localStorage.getItem("token");

  // 1️⃣ Last Created Game
  const res = await axios.get(`${API_URL}${AUTH_LASTCREATEGAME}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  setGames(res.data);

  // 2️⃣ Game Details
  const res2 = await axios.get(`${API_URL}${GAMEDETAILS}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  setGameDetails(res2.data);

  // 3️⃣ Check Game Room
  const res3 = await axios.get(`${API_URL}${CHECK_GAMEROOM}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  setHasRoom(res3.data.hasRoom);
  setGameroom(res3.data.gameroom);

  // if (res3.data.gameroom) {
  //   console.log(res3.data.gameroom.id);
  // }

}catch (err) {
      if (err.response?.status === 404) {
        setError("Ready to lead? Create your first game and build your squad! ✌️");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchGame();
}, []);


  if (loading) return <LoadingScreen />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen px-6 py-8 text-white bg-[#050505]"
    >
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            DASHBOARD
          </h1>
          <p className="text-gray-400 mt-1 flex items-center gap-2">
            <Activity size={16} className="text-blue-500" /> Your performance at a glance
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">Live Status</p>
          <p className="text-sm text-gray-300 italic">"Champions train, losers complain."</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Last Created Game - Card 1 */}
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-gray-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 h-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-pink-400">Latest Event</h3>
              <Calendar className="text-gray-500" size={20} />
            </div>

            {error ? (
              <p className="text-gray-400 text-sm italic">{error}</p>
            ) : games ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Sport</p>
                    <p className="font-semibold text-gray-100">{games.sporttype}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={12}/> City</p>
                    <p className="text-sm font-medium">{games.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1"><Users size={12}/> Squad</p>
                    <p className="text-sm font-medium">{games.teamlength} Players</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/5">
                   <p className="text-sm text-blue-400 font-mono italic">
                     {new Date(games.gamedate).toLocaleDateString("en-GB")}  
                   </p>
                   <p className="text-sm text-blue-400 font-mono italic">
                     {games.starttime}
                   </p>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>

        {/* Quick Actions - Card 2 */}
        <motion.div variants={itemVariants} className="bg-gray-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between">
          <h3 className="text-xl font-bold text-green-400 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: "All Created Games", path: "/dashboard/allcreategame", color: "hover:bg-blue-600" },
              { label: "Joined Games", path: "/dashboard/joinedgame", color: "hover:bg-indigo-600" },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => navigate(btn.path)}
                className={`w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 transition-all group ${btn.color}`}
              >
                <span>{btn.label}</span>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </button>
            ))}
            <button
  onClick={() =>
    hasRoom
      ? navigate(`/dashboard/gameroom/${gameroom.id}`)
      : navigate("/dashboard/creategameroom")
  }
  className={`
    relative overflow-hidden w-full py-2 rounded-xl font-bold transition-all active:scale-95
    ${hasRoom 
      ? "bg-gradient-to-r from-green-500 via-blue-600 to-cyan-500 animate-pulse shadow-[0_0_25px_rgba(34,197,94,0.5)] border border-green-400" 
      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
    }
  `}
>
  {/* Energetic Shimmer Overlay - Only shows when hasRoom is true */}
  {hasRoom && (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  )}

  <span className="relative z-10 flex items-center justify-center gap-2">
    {hasRoom && (
      <span className="flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
    )}
    {hasRoom ? "VIEW LIVE GAME ROOM" : "+ Create Game Room"}
  </span>
</button>


          </div>
        </motion.div>

        {/* Insights - Card 3 */}
        <motion.div variants={itemVariants} className="bg-gray-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-yellow-400" />
            <h3 className="text-xl font-bold text-yellow-400">Insights</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-400">Total Games</span>
              <span className="text-2xl font-black">{gamedetails?.game.total_created_game || 0}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-400">Avg Team Size</span>
              <span className="text-2xl font-black">
                {gamedetails?.game.avg_length ? Number(gamedetails.game.avg_length).toFixed(0) : 0}
              </span>
            </li>
            <li className="pt-4 mt-2 border-t border-white/5 space-y-2">
              <p className="text-xs text-blue-400 flex items-center gap-2 uppercase font-bold tracking-tighter">
                <Sparkles size={14}/> Weekly Summary
              </p>
              <p className="text-sm text-gray-300 leading-relaxed italic">
                You're on fire! 3 new players joined your circle this week. Your community is growing fast.
              </p>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Dynamic Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        {[
          { label: "Matches Played", value: gamedetails?.totalmatches || 0, color: "text-blue-400", bg: "bg-blue-500/5" },
          { label: "Win Streak", value: "2", color: "text-green-400", bg: "bg-green-500/5" },
          { label: "Community", value: "8", color: "text-purple-400", bg: "bg-purple-500/5" },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className={`${item.bg} border border-white/5 rounded-2xl p-6 text-center`}
          >
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{item.label}</h4>
            <p className={`text-4xl font-black ${item.color}`}>
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Join Requests Area */}
      <motion.div 
        variants={itemVariants}
        className="mt-10 bg-gray-900/20 border border-white/5 rounded-3xl overflow-hidden"
      >
        <div className="bg-white/5 px-6 py-4 border-b border-white/5">
           <h4 className="font-bold flex items-center gap-2">
             <Users size={18} className="text-blue-400"/> Pending Requests
           </h4>
        </div>
        <div className="p-6">
          <JoinRequests />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Reports;