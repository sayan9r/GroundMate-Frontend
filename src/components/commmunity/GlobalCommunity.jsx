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
    <div className="min-h-screen bg-[#050a18] px-4 py-10">
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
                className="bg-[#0b1220] border border-blue-900 rounded-xl p-6 shadow-md"
              >
                {/* Title */}
                <h2 className="text-lg font-semibold text-white mb-2">
                  {post.title}
                </h2>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-400">
                  {/* Author */}
                  <span>
                    ✍️ ~ {post.name}
                  </span>
                 <div className="flex items-center gap-1 text-xs text-gray-400">
                  <CalendarDays size={14} /> {new Date(post.created_time).toLocaleDateString()}{" "}
                 </div>
{/* Date & Time */}
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
