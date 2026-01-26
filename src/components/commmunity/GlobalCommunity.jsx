import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Clock } from "lucide-react";
import { API_URL, COMMUNITY } from "../../api";



export default function GlobalCommunity() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}${COMMUNITY}/allposts`);
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white">
        Loading global community...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0e1630] to-[#020617] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
          🌍 Global Community
        </h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#0f172a] border border-blue-900 rounded-2xl p-5 shadow-lg hover:shadow-blue-900/40 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <User size={16} />
                  <span className="font-medium">{post.created_by}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={14} />
                  <span>
                    {new Date(post.created_time).toLocaleDateString()} •{" "}
                    {new Date(post.created_time).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Blog Text */}
              <p className="text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
                {post.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
