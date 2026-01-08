import React from 'react'
const communities = [
  {
    id: 1,
    name: "Sunday Football Squad",
    city: "Kolkata",
    members: 24,
  },
  {
    id: 2,
    name: "Cricket Lovers",
    city: "Howrah",
    members: 18,
  },
  {
    id: 3,
    name: "Badminton Night Group",
    city: "Salt Lake",
    members: 12,
  },
];

function Community_Dashboard() {
   return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-blue-500 mb-6">
        Communities
      </h1>

      {/* Community Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div
            key={community.id}
            className="bg-[#0b1220] border border-blue-800 rounded-xl p-5 shadow-lg hover:shadow-blue-900/40 transition"
          >
            {/* Community Name */}
            <h2 className="text-lg font-semibold text-white mb-2">
              {community.name}
            </h2>

            {/* Location */}
            <p className="text-sm text-blue-400">
              📍 {community.city}
            </p>

            {/* Members */}
            <p className="mt-3 text-sm text-gray-300">
              👥 {community.members} Members
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community_Dashboard