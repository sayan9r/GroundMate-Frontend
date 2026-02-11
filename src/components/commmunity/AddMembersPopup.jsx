import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, COMMUNITY } from "../../api";
import LoadingScreen from "../../LoadingScreen.jsxLoadingScreen";

const AddMembersPopup = ({ onClose,communityId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}${COMMUNITY}/${communityId}/addmembers`); 
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

   const filteredUsers = users.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0b1220] w-full max-w-lg rounded-xl border border-blue-800 p-6 shadow-xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">
            Add Members
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
          {/* Search */}
      <input
        type="text"
        placeholder="Search Members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-8 px-4 py-2 rounded-lg bg-[#0b1220] border border-blue-800 text-white outline-none"
      />

        {/* BODY */}
        <div className="max-h-80 overflow-y-auto space-y-3">
          {loading ? (
            <p className="text-gray-400 text-center">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-400 text-center">No users found</p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center bg-[#111b33] p-3 rounded border border-blue-900"
              >
                <div>
                  <p className="font-medium text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.email}
                  </p>
                </div>

                <button className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded">
                  Add
                </button>
              </div>
            ))
          )}
        </div>

        
      </div>
    </div>
  );
};

export default AddMembersPopup;
