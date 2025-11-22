import React from "react";
import { IconUsersGroup, IconHourglassHigh } from "@tabler/icons-react";

export default function Community() {
  return (
    <div className=" bg-gradient-to-r from-green-600 via-green-200 to-white flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <IconUsersGroup size={80} className="text-green-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Community Section</h1>
      <p className="text-gray-600 text-lg mb-6 max-w-md">
        We're building something exciting! Soon you'll be able to create or join
        communities, host tournaments, share your match stories, and connect
        with other players.
      </p>
      <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full shadow-md">
        <IconHourglassHigh size={20} />
        <span className="font-semibold">Coming Soon with Community</span>
      </div>
    </div>
  );
}
