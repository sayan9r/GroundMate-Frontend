import React, { useEffect, useState } from "react";
import MembersPopup from "./MembersPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ACCEPTREQUEST,
  ALLREQUESTS,
  API_URL,
  CHECKCOMMUNITY,
  REJECTREQUEST,
} from "../../api";
import AddMembersPopup from "./AddMembersPopup";

function Community_Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);
  const [requests, setRequests] = useState([]); // future backend
  const [showMembersPopup, setShowMembersPopup] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);

  useEffect(() => {
    const checkCommunity = async () => {
      try {
        const res = await axios.get(`${API_URL}${CHECKCOMMUNITY}`, {
          withCredentials: true,
        });
        setCommunities(res.data.community || []);
        // console.log("Communities:", res.data.community);
        const res2 = await axios.get(`${API_URL}${ALLREQUESTS}`, {
          withCredentials: true,
        });
        setRequests(res2.data.requests || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkCommunity();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        Loading Community Dashboard...
      </div>
    );
  }
  const handleAccept = async (req) => {
    try {
      await axios.post(
        `${API_URL}${ACCEPTREQUEST}`,
        {
          requestId: req.request_id,
        },
        { withCredentials: true },
      );

      // Remove request from UI
      setRequests((prev) =>
        prev.filter((r) => r.request_id !== req.request_id),
      );

      alert("✅ Request accepted");
    } catch (err) {
      console.error("Accept error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (req) => {
    try {
      await axios.post(
        `${API_URL}${REJECTREQUEST}`,
        { requestId: req.request_id },
        { withCredentials: true },
      );

      setRequests((prev) =>
        prev.filter((r) => r.request_id !== req.request_id),
      );

      alert("❌ Request rejected");
    } catch (err) {
      alert("Failed to reject request");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  from-black via-blue-950 to-gray-950  shadow-md p-6 text-white">
      {/* ================= TOP BAR ================= */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-5">
            <button
              onClick={() => navigate("/community/makecommunity")}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-full w-full"
            >
              + Create
            </button>

            <button
              onClick={() => navigate("/community/join-community")}
              className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-full w-full"
            >
              Join
            </button>
            <button
              onClick={() => navigate("/community/joined-community")}
              className="px-4 py-2 text-sm bg-amber-700 hover:bg-amber-800 rounded-full w-full col-span-2 sm:col-auto"
            >
              Joined Community
            </button>

            <button
              onClick={() => navigate("/community/global-blogs")}
              className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-full w-full col-span-2 sm:col-auto"
            >
              Daily Blog
            </button>
          </div>
        </div>
      </div>

      {/* ================= QUICK STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#0b1220] border border-blue-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Communities</p>
          <h2 className="text-2xl font-bold text-blue-500">
            {communities.length}
          </h2>
        </div>

        <div className="bg-[#0b1220] border border-blue-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Pending Requests</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {requests.length}
          </h2>
        </div>

        <div className="bg-[#0b1220] border border-blue-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Your Role</p>
          <h2 className="text-2xl font-bold text-green-400">Admin</h2>
        </div>
      </div>

      {/* ================= COMMUNITY LIST ================= */}
      <h1 className="text-xl font-semibold text-white mb-4">
        Your Communities
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {communities.map((community) => (
          <div
            key={community.id}
            className="flex justify-between items-center bg-[#0b1220] border border-blue-800 rounded-xl hover:bg-gray-900 p-5 shadow-lg"
          >
            {/* LEFT SECTION */}
            <div
              onClick={() => {
                // navigate to post page or open post modal
                navigate(`/community/${community.id}`);
              }}
              className="flex items-center gap-4"
            >
              <img
                src={community.image || "/community.png"}
                alt={community.name}
                className="w-16 h-16 rounded-lg border border-blue-700 object-cover"
              />

              <div
                onClick={() => {
                  // navigate to post page or open post modal
                  navigate(`/community/${community.id}`);
                }}
              >
                <h2 className="text-lg font-semibold text-white leading-tight hover:text-blue-400">
                  {community.name}
                </h2>

                <div className="flex items-center gap-1 text-sm text-blue-400">
                  <span>📍</span>
                  <span>{community.city}</span>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-6">
              <p
                className="text-sm text-gray-300 cursor-pointer hover:text-blue-500"
                onClick={() => {
                  setSelectedCommunityId(community.id);
                  setShowMembersPopup(true);
                }}
              >
                👥 {community.community_length || 0}
              </p>

              {/* BUTTON COLUMN */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowAddMemberPopup(true);
                    setSelectedCommunityId(community.id);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                >
                  + Add
                </button>

                <button
                  onClick={() => {
                    // navigate to post page or open post modal
                    navigate(`/community/${community.id}/post`);
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
                >
                  📝 Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= JOIN REQUESTS ================= */}

      {requests.length === 0 ? (
        <p className="text-gray-400">No pending requests</p>
      ) : (
        <div className="bg-[#070d1a] border border-blue-900 rounded-2xl p-6 shadow-xl">
          <h1 className="text-xl font-semibold text-white mb-4">
            Join Requests
          </h1>
          <div className="space-y-3">
            {requests.map((req, index) => (
              <div
                key={req.id}
                className={`
    flex flex-col sm:flex-row
    sm:items-center sm:justify-between
    gap-4
    w-full sm:w-[95%] mx-auto
    px-4 sm:px-5 py-4
    rounded-xl
    border border-blue-700
    ${
      index % 3 === 0
        ? "bg-[#0e1629]"
        : index % 3 === 1
          ? "bg-[#111b33]"
          : "bg-[#0c1426]"
    }
  `}
              >
                {/* LEFT SIDE */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold">
                    {req.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-white text-sm sm:text-base">
                      {req.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      wants to join{" "}
                      <span className="text-blue-400">
                        {req.community_name}
                      </span>
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE ACTIONS */}
                <div className="flex gap-3 justify-end sm:justify-start">
                  <button
                    onClick={() => handleAccept(req)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-full text-sm"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(req)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <br />

      <div className="mx-auto mb-10 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <MembersPopup
        isOpen={showMembersPopup}
        communityId={selectedCommunityId}
        onClose={() => {
          setShowMembersPopup(false);
          setSelectedCommunityId(null);
        }}
      />

      {showAddMemberPopup && (
        <AddMembersPopup
          communityId={selectedCommunityId}
          onClose={() => {
            setShowAddMemberPopup(false);
          }}
        />
      )}
    </div>
  );
}

export default Community_Dashboard;
