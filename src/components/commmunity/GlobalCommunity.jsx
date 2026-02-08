import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  CalendarDays,
  MapPin,
  Medal,
  Users,
  Trophy,
  Phone,
  FileText,
} from "lucide-react";
import { ALLTOURNAMENTS, API_URL, GLOBALCOMMUNITIES } from "../../api";

function GlobalCommunity() {
  const [posts, setPosts] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("blog");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}${GLOBALCOMMUNITIES}`, {
        withCredentials: true,
      });
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Failed to fetch global posts", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}${ALLTOURNAMENTS}`, {
        withCredentials: true,
      });
      setTournaments(res.data.tournaments || []);
    } catch (err) {
      console.error("Failed to fetch tournaments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "tournament") {
      fetchTournaments();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a18] flex items-center justify-center text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-blue-950 to-gray-950 px-3 sm:px-6 py-8">
      {/* ======= RESPONSIVE MAIN CONTAINER ======= */}
      <div className="w-[95%] sm:w-[85%] lg:w-[70%] mx-auto">

        {/* ======= TOGGLE BAR ======= */}
        <div className="max-w-md mx-auto mb-6 bg-[#0b1220] border border-blue-900 rounded-full p-1 flex shadow-md">
          <div
            onClick={() => handleTabChange("blog")}
            className={`flex-1 text-center py-2 rounded-full font-medium cursor-pointer transition text-sm sm:text-base ${
              activeTab === "blog"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-[#050a18]"
            }`}
          >
            Daily Blog
          </div>

          <div
            onClick={() => handleTabChange("tournament")}
            className={`flex-1 text-center py-2 rounded-full font-medium cursor-pointer transition text-sm sm:text-base ${
              activeTab === "tournament"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-[#050a18]"
            }`}
          >
            Tournament
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 text-center sm:text-left">
          {activeTab === "blog"
            ? "🌍 Voices of the Community"
            : "🏆 All Tournaments"}
        </h1>

        {/* ========== BLOG SECTION ========== */}
        {activeTab === "blog" && (
          <div className="space-y-5">
            {posts.length === 0 ? (
              <p className="text-gray-400 text-center">
                No posts available yet.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-blue-100 border border-gray-200 rounded-2xl shadow-md p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                    <h1 className="text-lg sm:text-xl font-bold text-blue-800">
                      {post.community_name}
                    </h1>

                    <div className="flex items-center gap-1 text-xs sm:text-sm text-black">
                      <CalendarDays size={14} />
                      <span>
                        {new Date(post.created_time).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                  </div>

                  <hr className="border-blue-900/60 mb-3" />

                  <h2 className="text-base sm:text-lg font-semibold text-black mb-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-900 leading-relaxed mb-4 text-sm sm:text-base">
                    {post.description}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm text-gray-700">
                    <span>✍️ ~ {post.name}</span>

                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={14} />
                      <span>
                        {new Date(post.created_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ========== TOURNAMENT SECTION ========== */}
        {activeTab === "tournament" && (
          <div className="space-y-6">
            {tournaments.length === 0 ? (
              <p className="text-gray-400 text-center">
                No tournaments available right now.
              </p>
            ) : (
              tournaments.map((t, idx) => (
                <div
                  key={idx}
                  className="border border-blue-900 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition bg-[#050a18]"
                >
                  {/* HEADER */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                    <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                      <Medal size={18} className="text-yellow-400" />
                      {t.sport}
                    </h2>

                    <span className="text-xs sm:text-sm text-gray-400">
                      Organized by —{" "}
                      <span className="text-blue-400 font-medium">
                        {t.community_name} Community
                      </span>
                    </span>
                  </div>

                  <hr className="border-blue-900/60 mb-4" />

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <p className="flex items-center gap-2 text-gray-300">
                      <MapPin size={14} className="text-blue-400" />
                      <span className="font-medium text-white">
                        Location:
                      </span>
                      {t.location}
                    </p>

                    <p className="flex items-center gap-2 text-gray-300">
                      <Phone size={14} className="text-green-400" />
                      <span className="font-medium text-white">
                        Contact:
                      </span>
                      {t.contact}
                    </p>

                    <p className="flex items-center gap-2 text-gray-300">
                      <CalendarDays size={14} className="text-blue-400" />
                      <span className="font-medium text-white">Date:</span>
                      {new Date(t.tournament_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>

                    <p className="flex items-center gap-2 text-gray-300">
                      <Clock size={14} className="text-blue-400" />
                      <span className="font-medium text-white">Time:</span>
                      {t.tournament_time}
                    </p>

                    <p className="flex items-center gap-2 text-gray-300">
                      <Users size={14} className="text-blue-400" />
                      <span className="font-medium text-white">
                        Total Teams:
                      </span>
                      {t.total_teams}
                    </p>

                    <p className="flex items-center gap-2 text-gray-300">
                      <Users size={14} className="text-blue-400" />
                      <span className="font-medium text-white">
                        Team Size:
                      </span>
                      {t.team_size}
                    </p>

                    {/* <p className="flex items-center gap-2 text-gray-300">
                      <Trophy size={14} className="text-yellow-400" />
                      <span className="font-medium text-white">Prize:</span>
                      {t.winning_prize}
                    </p> */}
                    
                  </div>

                  {/* RULES BOX */}
                  
{/* ===== NEW TWO-COLUMN PRIZE + RULES BOX ===== */}
<div className="mt-4 bg-[#b8b2e8] p-3 sm:p-4 rounded-lg border border-blue-900">



  {/* TWO COLUMN LAYOUT */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative ">

    {/* LEFT COLUMN — PRIZE SECTION */}
    <div>
      <h3 className="text-black font-semibold mb-2 flex items-center gap-2">
        <Trophy size={14} className="text-blue-950" />
        Prize Details
      </h3>

      <ul className="list-disc list-inside text-neutral-800 text-sm space-y-2">
        {t.winning_prize
          .split("\n")
          .map((prize, i) => (
            <li key={i}>{prize}</li>
          ))}
      </ul>
    </div>

    {/* VERTICAL DIVIDER (NOT FULL HEIGHT) */}
    

    {/* RIGHT COLUMN — RULES SECTION */}
    <div>
      <h3 className="text-shadow-red-900 font-semibold mb-2 flex items-center gap-2">
        <FileText size={14} className="text-blue-950" />
        Rules & Conditions
      </h3>

      <ul className="list-disc list-inside text-neutral-800 text-sm space-y-2">
        {t.rules.split("\n").map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </div>

  </div>
</div>


            
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GlobalCommunity;
