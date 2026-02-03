import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, COMMUNITY } from "../../api";

function EditPost() {
  const navigate = useNavigate();
  const { communityId, postId } = useParams();

  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${API_URL}${COMMUNITY}/${communityId}/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const post = res.data.post;
        console.log(post);
        console.log(postId);
        setTitle(post.title);
        setBlogContent(post.description);
        setAuthor(post.author_name);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [communityId, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}${COMMUNITY}/${communityId}/post/${postId}`,
        {
          title,
          blog_content: blogContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Post updated successfully!");
      navigate(`/community/${communityId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Update failed!");
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050a18] flex items-center justify-center px-4">
      <div className="bg-[#0b1220] border border-blue-900 rounded-xl p-6 w-full max-w-2xl text-white shadow-lg">

        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          Edit Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* AUTHOR - NON EDITABLE */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Author</label>
            <input
              type="text"
              value={author}
              disabled
              className="w-full bg-[#050a18] text-gray-300 p-2 rounded border border-blue-900"
            />
          </div>

          {/* TITLE - EDITABLE */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#050a18] text-white p-2 rounded border border-blue-900"
            />
          </div>

          {/* DESCRIPTION / BLOG CONTENT - EDITABLE */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Description
            </label>
            <textarea
              rows="6"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="w-full bg-[#050a18] text-white p-2 rounded border border-blue-900"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/community/${communityId}`)}
              className="px-4 py-2 bg-gray-700 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
