import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, COMMUNITY } from "../../api";

const MembersPopup = ({ isOpen, onClose, communityId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !communityId) return;
    //console.log("Loading members for community:", communityId);

    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `${API_URL}${COMMUNITY}/${communityId}/members`,
          { withCredentials: true }
        );
        setMembers(res.data.members || []);
        console.log("Members:", res.data.members);
      } catch (err) {
        console.error("Failed to load members", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [isOpen, communityId]);

  const handleRemoveMember = async (memberId) => {
    try{
      await axios.delete(
        `${API_URL}${COMMUNITY}/${communityId}/members/${memberId}`,
        { withCredentials: true }
      );
      setMembers(members.filter(member => member.id !== memberId));
    } catch (err) {
    console.error("Accept error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to accept request");
  }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#0b1220] border border-blue-800 rounded-xl p-5 text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Community Members
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-64 overflow-y-auto space-y-3">
          {loading ? (
            <p className="text-center text-gray-400">Loading members...</p>
          ) : members.length === 0 ? (
            <p className="text-center text-gray-400">No members found</p>
          ) : (
            members.map((member) => (
            <div
  key={member.id}
  className="flex justify-between items-center bg-[#111b33] p-3 rounded border border-blue-900"
>
  {/* Left content */}
  <div>
    <p className="font-medium">{member.name}</p>
    <p className="text-xs text-gray-400">
      Joined on{" "}
      {new Date(member.joined_at).toLocaleDateString()}
    </p>
  </div>

  {/* Right button */}
  <button
    onClick={()=> handleRemoveMember(member.id)}
    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-bl-md"
  >
    Remove
  </button>
</div>

            ))
          )}
        </div>

        
      </div>
    </div>
  );
};

export default MembersPopup;
