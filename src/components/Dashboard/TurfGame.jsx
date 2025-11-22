import React from 'react'
import { MapPin, Clock, IndianRupee, CalendarDays, Lock } from "lucide-react";

function TurfGame() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Lock className="text-green-500 w-14 h-14" />
        </div>

        <h2 className="text-3xl font-bold text-green-700 mb-3">Turf Games</h2>
        <p className="text-gray-600 mb-6">
          Soon, you’ll be able to <span className="font-semibold">book nearby turfs</span> 
          to play your favorite outdoor games — football, cricket, badminton, and more! ⚽🏏
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-700">
          <div className="flex items-center justify-center gap-2 bg-green-50 p-2 rounded-lg">
            <MapPin className="w-4 h-4 text-green-600" />
            <span>Nearby Turfs</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-green-50 p-2 rounded-lg">
            <Clock className="w-4 h-4 text-green-600" />
            <span>Hourly Booking</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-green-50 p-2 rounded-lg">
            <IndianRupee className="w-4 h-4 text-green-600" />
            <span>Affordable Rates</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-green-50 p-2 rounded-lg">
            <CalendarDays className="w-4 h-4 text-green-600" />
            <span>Easy Scheduling</span>
          </div>
        </div>

        <div className="bg-green-100 text-green-700 rounded-xl py-3 px-4">
          <p className="font-semibold text-lg">🌱 Coming Soon!</p>
          <p className="text-sm">We’re working hard to bring Turf Game booking to GroundMate.</p>
        </div>
      </div>
    </div>
  )
}

export default TurfGame