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
  const [activeTab, setActiveTab] = useState("blog"); // toggle state

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
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-blue-950 to-gray-950 px-4 py-10">
      {/* ======= MAIN CONTAINER (70% WIDTH) ======= */}
      <div className="w-[70%] mx-auto">

        {/* ======= TOGGLE BAR (FIXED) ======= */}
        <div className="max-w-md mx-auto mb-8 bg-[#0b1220] border border-blue-900 rounded-full p-1 flex shadow-md">
          <div
            onClick={() => handleTabChange("blog")}
            className={`flex-1 text-center py-2 rounded-full font-medium cursor-pointer transition ${
              activeTab === "blog"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-[#050a18]"
            }`}
          >
            Daily Blog
          </div>

          <div
            onClick={() => handleTabChange("tournament")}
            className={`flex-1 text-center py-2 rounded-full font-medium cursor-pointer transition ${
              activeTab === "tournament"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-[#050a18]"
            }`}
          >
            Tournament
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-white mb-8">
          {activeTab === "blog"
            ? "🌍 Voices of the Community"
            : "🏆 All Tournaments"}
        </h1>

        {/* ========== BLOG SECTION ========== */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-gray-400 text-center">
                No posts available yet.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-blue-100 border border-gray-200 rounded-2xl shadow-md p-6"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h1 className="text-xl font-bold text-blue-800">
                      {post.community_name}
                    </h1>

                    <div className="flex items-center gap-1 text-xs text-black">
                      <CalendarDays size={14} />
                      <span>
                        {new Date(post.created_time).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                  </div>

                  <hr className="border-blue-900/60 mb-4" />

                  <h2 className="text-lg font-semibold text-black mb-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-900 leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-700">
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
                  className="border border-blue-900 rounded-xl p-6 shadow-md hover:shadow-lg transition bg-[#050a18]"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Medal size={18} className="text-yellow-400" />
                      {t.sport}
                    </h2>

                    <span className="text-xs text-gray-400">
                      Organized by —{" "}
                      <span className="text-blue-400 font-medium">
                        {t.community_name} Community
                      </span>
                    </span>
                  </div>

                  <hr className="border-blue-900/60 mb-4" />

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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

                    <p className="flex items-center gap-2 text-gray-300">
                      <Trophy size={14} className="text-yellow-400" />
                      <span className="font-medium text-white">Prize:</span>
                      {t.winning_prize}
                    </p>
                  </div>

                  {/* RULES BOX */}
                  <div className="mt-4 bg-[#050a18] p-4 rounded-lg border border-blue-900">
                    <p className="text-gray-300 text-sm flex items-start gap-2">
                      <FileText
                        size={14}
                        className="mt-1 text-blue-400"
                      />
                      <span>
                        <span className="font-semibold text-white">
                          Rules & Conditions:
                        </span>{" "}
                        {t.rules}
                      </span>
                    </p>
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
