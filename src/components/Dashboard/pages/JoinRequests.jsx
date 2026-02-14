import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, JOIN_REQUESTS } from "../../../api";
import { Check, X } from "lucide-react";

function JoinRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Pending Requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API_URL}${JOIN_REQUESTS}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setRequests(res.data.requests);
        console.log(res.data.requests);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle Accept / Reject
  const handleAction = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/update-request/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Remove request from UI after action
      setRequests(requests.filter((req) => req.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-auto bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Join Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-400">No pending requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between bg-gray-900 p-4 rounded-xl shadow-md"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                {/* Creator Image (Placeholder) */}
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold">
                  {req.profile_image ? (
                    <img src={`${API_URL}${req.profile_image}`} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-white">{req.creator_name?.charAt(0)}</span>
                  )}
                </div>

                <p className="text-sm md:text-base">
                  <span className="font-semibold">
                    {req.creator_name}
                  </span>{" "}
                  invited you to join his game room
                </p>
              </div>

              {/* Right Section - Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(req.id, "accept")}
                  className="bg-green-600 hover:bg-green-700 p-2 rounded-full"
                >
                  <Check size={18} />
                </button>

                <button
                  onClick={() => handleAction(req.id, "rejected")}
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JoinRequests;
