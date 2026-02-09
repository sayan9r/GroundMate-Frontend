import React, { useState , useEffect } from 'react'
import axios from "axios";
import { API_URL, JOINCOMMUNITY, JOINEDCOMMUNITIES } from "../../api";
import { IconMapPin, IconUsersGroup } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';

function JoinedCommunity() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await axios.get(
          `${API_URL}${JOINEDCOMMUNITIES}`,
          { withCredentials: true }
        );
        setCommunities(res.data.community);
        console.log(res.data.community);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        Loading communities...
      </div>
    );
  }
      
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto mb-10 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-blue-500">
          Communities You've Joined
        </h1>
        <p className="text-gray-400 text-sm">
          
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search community..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-8 px-4 py-2 rounded-lg bg-[#0b1220] border border-blue-800 text-white outline-none"
      />

      {/* Community Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="flex justify-between items-center bg-[#0b1220] border border-blue-800 rounded-xl p-5 hover:shadow-blue-900/40 transition"
          >
            {/* Left Info */}
            <div>
              <h2 className="text-lg font-semibold">
                {community.name}
              </h2>

              <p className="flex items-center text-sm text-blue-400 mt-1">
                <IconMapPin size={16} className="mr-1" />
                {community.city}
              </p>

              <p className="text-sm text-gray-300 mt-1 flex items-center">
                <IconUsersGroup size={16} className="mr-1" />
                {community.community_type}
              </p>

             <button
                onClick={() => navigate(`/community/${community.id}`)}
                className="mt-3 px-4 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-full">
                  view Community
             </button>

            </div>

            {/* Right Image */}
            <img
              src={community.image || "/community.png"}
              alt={community.name}
              className="w-16 h-16 rounded-lg border border-blue-700"
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCommunities.length === 0 && (
        <p className="text-gray-400 mt-10">
          No communities found.
        </p>
      )}
    </div>
  );
}

export default JoinedCommunity