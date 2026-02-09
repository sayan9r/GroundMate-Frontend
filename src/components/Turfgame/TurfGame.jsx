import React from "react";
import { IconSoccerField, IconBolt, IconClockHour4 } from "@tabler/icons-react";

function TurfGame() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-gradient-to-r from-green-50 to-blue-50">

      <IconSoccerField
        size={80}
        stroke={1.5}
        className="text-green-600 mb-4 animate-bounce"
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-green-700">
        Turf Game Booking
      </h1>

      <div className="flex items-center gap-2 text-lg text-gray-700 mb-4">
        <IconBolt size={22} className="text-yellow-500" />
        <span>Best Price • Fast Booking • Smooth Experience</span>
      </div>

      <p className="text-gray-600 text-lg mb-6 max-w-lg">
        Your favorite turf games will be available very soon with a seamless
        booking experience and unbeatable pricing! Stay tuned 🚀
      </p>

      <button
        className="flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition shadow-lg"
        disabled
      >
        <IconClockHour4 size={22} />
        Coming Soon
      </button>
    </div>
  );
}

export default TurfGame;
