import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, COMMUNITY } from "../../api";
import { Clock, Calendar, Edit , MapPin , MoreVertical, Settings, Users, Megaphone, PlusCircle , Trash2 } from "lucide-react";
import LoadingScreen from "../../LoadingScreen.jsxLoadingScreen";



function CommunityProfile({user,setUser}) {
  const navigate = useNavigate();
  const { communityId } = useParams();

  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreator, setIsCreator] = useState(true);
  const [openPostMenu, setOpenPostMenu] = useState(null);



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
        if(res.data.posts[0].creator_id !== user.id){
          setIsCreator(false); 
        }
         //console.log(res.data.posts);
         //console.log(res.data.posts[0].creator_id);
         //console.log(user.id);
        // console.log(user.name);
      } catch (error) {
        console.error("Error fetching community:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [communityId]);
 
const handleDeletePost = async (postId,communityId) => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;

  try {
    await axios.delete(
      `${API_URL}${COMMUNITY}/${communityId}/post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setPosts(prev => prev.filter(p => p.id !== postId));
    setOpenPostMenu(null);   // close menu after delete ✅

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to delete post ❌");
    // alert(
    //   err.response?.status === 403
    //     ? "Only community creator can delete posts"
    //     : "Failed to delete post"
    // );
  }
};



  if (loading) {
    return <LoadingScreen/>;
  }

  if (!community) {
    return <div className="text-gray-400 text-center mt-10">No data found</div>;
  }

  return (
    <div className="min-h-screen bg-[#050a18] px-4 py-10 text-white">
      <div className="max-w-5xl mx-auto space-y-10">

       {/* ================= ROW 1 — NEW CLEAN LAYOUT ================= */}
<div className="bg-[#0b1220] border border-blue-900 rounded-xl p-6 shadow-md">

  {/* TOP SECTION: PROFILE + INFO + ACTIONS */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

    {/* LEFT — Profile + Basic Info */}
    <div className="flex items-center gap-4">
      <img
        src="/community_default.png"
        alt="Community Profile"
        className="w-20 h-20 rounded-full object-cover border-2 border-blue-800 shadow-md"
      />

      <div>
        <h2 className="text-lg font-semibold text-white hover:text-blue-400 transition">
          {community.community_name || "Community"}
        </h2>

        <p className="text-gray-300 text-sm mt-1 hover:text-blue-400 transition">
          <span className="font-semibold text-white ">
            {community.community_length}
          </span>{" "}
          Members
        </p>
        
       <p className="text-gray-400 flex items-center gap-2 text-sm hover:text-blue-400 transition">
            <MapPin size={14} /> {community.city}
       </p>
      </div>
    </div>

    {/* CENTER — Description */}
   <div className="md:col-span-2">
  <div className="bg-[#050a18] p-4 rounded-lg border border-blue-900">
    <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
      {community.description}
    </p>

    <p className="text-gray-400 mt-2 text-sm italic text-right">
      ~ {community.created_by} [Admin]
    </p>
  </div>
</div>

  </div>


{isCreator && (
  <div className="flex items-center justify-between mt-6 pt-4 border-t border-blue-900">

    {/* LEFT SIDE BUTTONS */}
    <div className="flex items-center gap-3">

      {/* Create Tournament */}
      <button
        onClick={() => navigate(`/community/${communityId}/tournament`)}
        className="flex items-center gap-2 px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg "
      >
        <PlusCircle size={16} /> Create Tournament
      </button>

      {/* New Post Button */}
      <button
        onClick={() => navigate(`/community/${communityId}/post`)}
        className="flex items-center gap-2 px-5 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        <PlusCircle size={16} /> Post
      </button>

    </div>

    {/* RIGHT SIDE — THREE DOT MENU */}
    <div className="relative group">

      <button className="p-2 rounded-full hover:bg-[#050a18] border border-blue-900">
        <MoreVertical size={18} />
      </button>

      <div className="absolute right-0 mt-2 w-44 bg-[#0b1220] border border-blue-900 rounded-lg shadow-lg hidden group-hover:block">

        <button
          onClick={() => navigate(`/community/${communityId}/settings`)}
          className="w-full text-left px-4 py-2 text-sm hover:bg-[#050a18] flex items-center gap-2"
        >
          <Settings size={14} /> Settings
        </button>

        <button
          onClick={() => navigate(`/community/${communityId}/members`)}
          className="w-full text-left px-4 py-2 text-sm hover:bg-[#050a18] flex items-center gap-2"
        >
          <Users size={14} /> View Members
        </button>

        <button
          onClick={() => navigate(`/community/${communityId}/promotion`)}
          className="w-full text-left px-4 py-2 text-sm hover:bg-[#050a18] flex items-center gap-2"
        >
          <Megaphone size={14} /> Promotion
        </button>

      </div>
    </div>

  </div>
)}




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
       {/* TITLE + THREE DOT MENU */}
<div className="flex justify-between items-center mb-3">
  <h3 className="text-lg font-semibold text-white">
    {post.title}
  </h3>

  {isCreator && (
<div className="relative">

    {/* Three dot button */}
    <button
      onClick={() =>
        setOpenPostMenu(openPostMenu === post.id ? null : post.id)
      }
      className="p-2 rounded-full hover:bg-[#050a18] border border-blue-900"
    >
      <MoreVertical size={18} />
    </button>

    {/* STABLE DROPDOWN MENU (won’t disappear) */}
    {openPostMenu === post.id && (
      <div className="absolute right-0 mt-2 w-40 bg-[#0b1220] border border-blue-900 rounded-lg shadow-lg z-10">

        {/* Edit option */}
        <button
          onClick={() => navigate(`/community/${communityId}/edit/${post.id}`)}
          className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:text-blue-600"
        >
          <Edit size={14} /> Edit
        </button>

        {/* Delete option */}
        <button
          onClick={() => handleDeletePost(post.id,communityId)}
          className="w-full text-left px-4 py-2 text-sm  flex items-center gap-2 text-red-200 hover:text-red-500"
        >
          <Trash2 size={14} /> Delete
        </button>

      </div>
    )}
  </div>
  )}
</div>


        {/* BLOG CONTENT */}
        <p className="text-gray-400 text-sm mb-3">
          {post.blog_content}
        </p>

        {/* DATE & TIME SECTION */}
        <div className="flex gap-6 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {createdAt.toLocaleDateString("en-GB")}
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
