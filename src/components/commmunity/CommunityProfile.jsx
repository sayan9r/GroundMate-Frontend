import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, COMMUNITY } from "../../api";
import { Clock, Calendar, Edit } from "lucide-react";



function CommunityProfile() {
  const navigate = useNavigate();
  const { communityId } = useParams();

  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}${COMMUNITY}/${communityId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.posts?.length > 0) {
          setCommunity(res.data.posts[0]); // community info
          setPosts(res.data.posts);      // all posts
        }
        console.log(res.data.posts);
      } catch (error) {
        console.error("Error fetching community:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [communityId]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!community) {
    return <div className="text-gray-400 text-center mt-10">No data found</div>;
  }

  return (
    <div className="min-h-screen bg-[#050a18] px-4 py-10 text-white">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ================= ROW 1 ================= */}
        <div className="bg-[#0b1220] border border-blue-900 rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row justify-between gap-8">

            {/* LEFT SECTION */}
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {community.description}
              </p>

              <p className="text-gray-400 mt-4 text-sm italic">
                ~ {community.created_by} [Admin]
              </p>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col items-center text-center gap-3">
              <img
                src="/community_default.png"
                alt="Community Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-800 shadow-md"
              />

              <div className="text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">
                    {community.community_length}
                  </span>{" "}
                  Members
                </p>
                <p className="text-gray-400">📍 {community.city}</p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= ROW 2 ================= */}
<div className="space-y-6">
  <h2 className="text-xl font-semibold text-blue-400">
    Community Posts
  </h2>

  {posts.map((post, id) => {
    const createdAt = new Date(post.created_time);

    return (
      <div
        key={id}
        className="bg-[#0b1220] border border-blue-900 rounded-xl p-6"
      >
        {/* TITLE + EDIT BUTTON */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">
            {post.title}
          </h3>

          <button
            onClick={() => navigate(`/community/${communityId}/edit/${post.id}`)}
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          >
            <Edit size={16} /> Edit
          </button>
        </div>

        {/* BLOG CONTENT */}
        <p className="text-gray-400 text-sm mb-3">
          {post.blog_content}
        </p>

        {/* DATE & TIME SECTION */}
        <div className="flex gap-6 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {createdAt.toLocaleDateString()}
          </div>

          <div className="flex items-center gap-1">
            <Clock size={14} />
            {createdAt.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  })}
</div>


      </div>
    </div>
  );
}

export default CommunityProfile;
