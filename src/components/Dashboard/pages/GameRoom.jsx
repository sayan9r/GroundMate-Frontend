import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  IconClock, 
  IconHourglassLow, 
  IconMessage2 
} from "@tabler/icons-react";
import { MessageCircle } from "lucide-react";
import { API_URL } from '../../../api';
import LoadingScreen from '../../../LoadingScreen.jsxLoadingScreen';


const GameRoom = ({ user }) => {
  const { gameroomId } = useParams();
  console.log("Gameroom ID from URL:", gameroomId);
  const [roomData, setRoomData] = useState(null);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_URL}/api/gameroom/live-gameroom/${gameroomId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setRoomData(res.data.creator);
        setMembers(res.data.members);

      } catch (err) {
        console.error("Error fetching room:", err);
      }finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [gameroomId]);

  if (loading) { 
    return <LoadingScreen/>;
  }
  // Format time
  const createdTime = new Date(roomData.created_at);
  const validUntil = new Date(createdTime.getTime() + 5 * 60 * 60 * 1000);

  return (
    <div className="flex flex-col h-full w-full gap-4 animate-in fade-in duration-500">
      
      {/* ===== TOP SECTION ===== */}
      <div className="bg-gray-900/50 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* LEFT SIDE */}
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-4">
              <span className="text-blue-500">{roomData.creator_name}'s</span> Game Room
            </h1>
            
            <div className="flex flex-wrap gap-4">
              
              {/* Creator */}
              <div className="flex flex-col items-center gap-1">
                <img 
                  src={`${API_URL}${roomData.creator_image}`} 
                  alt="creator"
                  className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
                />
                <span className="text-[10px] text-gray-400">
                  {roomData.creator_name} (Host)
                </span>
              </div>

              {/* Members */}
              {members.map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <img 
                    src={`${API_URL}${m.members_image}`}
                    alt={m.members_name}
                    className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
                  />
                  <span className="text-[10px] text-gray-400">
                    {m.members_name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-2 bg-black/40 p-4 rounded-xl border border-white/5 w-full md:w-auto">
            
            <div className="flex items-center gap-3 text-sm">
              <IconClock className="text-blue-400 h-5 w-5" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase">Created At</p>
                <p className="text-gray-200 font-mono">
                  {createdTime.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-800 w-full" />

            <div className="flex items-center gap-3 text-sm">
              <IconHourglassLow className="text-orange-400 h-5 w-5" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase">Valid Until</p>
                <p className="text-orange-400 font-mono font-bold">
                  {validUntil.toLocaleString()}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 my-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-blue-500">
          <IconMessage2 size={18} />
        </div>
      </div>

      {/* ===== LIVE CHAT SECTION ===== */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg h-[400px] flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-blue-500" />
          <h2 className="text-lg font-bold">Live Chat</h2>
        </div>

        <div className="flex-1 bg-black rounded-xl p-4 overflow-y-auto">
          <div className="text-gray-500 text-sm">
            Chat messages will appear here...
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 px-4 py-2 rounded-xl outline-none"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-500">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
