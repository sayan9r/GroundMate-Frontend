import React, { useState } from 'react';
import { 
  IconClock, 
  IconHourglassLow, 
  IconSend, 
  IconMessage2 
} from "@tabler/icons-react";
import { MessageCircle } from "lucide-react";

const GameRoom = ({ user, gameroom }) => {
  const [message, setMessage] = useState("");

  // Mock participants - replace with your actual room data
  const participants = [
    { name: "You", img: user?.profile_image },
    { name: "Alex", img: null },
    { name: "Jordan", img: null },
    { name: "Sarah", img: null },
  ];

  return (
    <div className="flex flex-col h-full w-full gap-4 animate-in fade-in duration-500">
      
      {/* ===== TOP SECTION: ROOM INFO ===== */}
      <div className="bg-gray-900/50 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Left: Room Title & Users */}
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-4">
              <span className="text-blue-500">{user?.name}'s</span> Game Room
            </h1>
            
            <div className="flex flex-wrap gap-4">
              {participants.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1 group">
                  <div className="relative">
                    <img 
                      src={p.img || "/default_image.png"} 
                      alt={p.name}
                      className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timing Info */}
          <div className="flex flex-col gap-2 bg-black/40 p-4 rounded-xl border border-white/5 w-full md:w-auto">
            <div className="flex items-center gap-3 text-sm">
              <IconClock className="text-blue-400 h-5 w-5" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase">Created At</p>
                <p className="text-gray-200 font-mono">10:30 PM</p>
              </div>
            </div>
            <div className="h-px bg-gray-800 w-full" />
            <div className="flex items-center gap-3 text-sm">
              <IconHourglassLow className="text-orange-400 h-5 w-5 animate-spin-slow" />
              <div>
                <p className="text-gray-500 text-[10px] uppercase">Valid Until</p>
                <p className="text-orange-400 font-mono font-bold">12:30 AM</p>
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

     {/* ===== LIVE CHAT SECTION (UI ONLY) ===== */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg h-[400px] flex flex-col">

        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-blue-500" />
          <h2 className="text-lg font-bold">Live Chat</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-black rounded-xl p-4 overflow-y-auto">
          <div className="text-gray-500 text-sm">
            Chat messages will appear here...
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
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