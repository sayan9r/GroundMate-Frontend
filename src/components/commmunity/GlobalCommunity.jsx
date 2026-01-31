import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Clock ,CalendarDays  } from "lucide-react";
import { API_URL, COMMUNITY, GLOBALCOMMUNITIES } from "../../api";

function GlobalCommunity() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}${GLOBALCOMMUNITIES}`,
        { withCredentials: true }
      );
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Failed to fetch global posts", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a18] flex items-center justify-center text-gray-300">
        Loading global community...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b  from-black via-blue-950 to-gray-950 border-2  border-t-blue-600 shadow-md  px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-white mb-8">
          🌍 Voices of the Community
        </h1>

        {/* Posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center">
              No posts available yet.
            </p>
          ) : (
            posts.map((post) => (
              <div
  key={post.id}
  className="bg-blue-100 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 shadow-md"
>
  {/* ROW 1: Community name (left) + Date (right) */}
  <div className="flex justify-between items-center mb-3">
    <h1 className="text-xl font-bold text-blue-800">
      {post.community_name}
    </h1>

    <div className="flex items-center gap-1 text-xs text-black">
      <CalendarDays size={14} />
      <span>
        {new Date(post.created_time).toLocaleDateString()}
      </span>
    </div>
  </div>

  {/* Divider */}
  <hr className="border-blue-900/60 mb-4" />

  {/* ROW 2: Title */}
  <h2 className="text-lg font-semibold text-black mb-2">
    {post.title}
  </h2>

  {/* Description */}
  <p className="text-gray-900 leading-relaxed mb-4">
    {post.description}
  </p>

  {/* Footer */}
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
      </div>
    </div>
  );
}

export default GlobalCommunity;
