import React from "react";
import { IconUsersGroup, IconHourglassHigh } from "@tabler/icons-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Community() {
  const Navigate = useNavigate();
  return (
    <div className=" bg-gradient-to-b  from-black via-blue-950 to-gray-950 border-2  border-t-blue-600 shadow-md flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <IconUsersGroup size={80} className="text-green-600 mb-4" />
      <h1 className="text-3xl text-white font-bold mb-2">Community Section</h1>
      <p className="text-gray-400 text-lg mb-6 max-w-md">
        A space to communicate with players, manage tournaments,share your match stories, and maintain strong connections within your community.  
       
      </p>
     <div className="flex flex-col space-y-3">
  <div className="flex items-center space-x-2 bg-green-100 text-green-700  hover:bg-blue-400 px-4 py-2 rounded-full shadow-md">
    <IconHourglassHigh size={20} />
    <button onClick={()=> Navigate("/community/makecommunity")} className="font-semibold">Make a Community</button>
  </div>

  <div className="flex items-center space-x-2 bg-green-100 text-green-700  hover:bg-blue-400 px-4 py-2 rounded-full shadow-md">
    <IconHourglassHigh size={20} />
    <button className="font-semibold">join a Community</button>
  </div>

  <div className="flex items-center space-x-2 bg-green-100 text-green-700 hover:bg-blue-400 px-4 py-2 rounded-full shadow-md">
    <IconHourglassHigh size={20} />
    <button className="font-semibold">Global Community</button>
  </div>
</div>

    </div>
  );
}
