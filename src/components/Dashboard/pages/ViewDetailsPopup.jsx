import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { X, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ViewDetailsPopup({ gameId, onClose }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // 🔁 Common function to fetch join requests + check team status
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/auth/game-requests/${gameId}`,
        { withCredentials: true }
      );
      setRequests(res.data);

      // Check if the team is full
      const res2 = await axios.get(
        `http://localhost:5000/api/auth/total-accepted/${gameId}`,
        { withCredentials: true }
      );
      const { acceptedCount, teamLength, teamFull } = res2.data;

      console.log(`Accepted: ${acceptedCount}/${teamLength}`);

      if (teamFull) {
        alert("✅ Team is full! Redirecting to start game...");
        navigate(`/dashboard/startgame/${gameId}`);
      }
    } catch (err) {
      console.error("Error fetching join requests:", err);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [gameId, navigate]);

  // 🧭 Initial Load
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ⚙️ Accept / Reject request
  const handleAction = async (requestId, action) => {
    try {
      await axios.put(
        `http://localhost:5000/api/auth/update-requests/${requestId}`,
        { status: action },
        { withCredentials: true }
      );

      // Instantly update UI
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: action } : req
        )
      );

      // Check team status again
      const res2 = await axios.get(
        `http://localhost:5000/api/auth/total-accepted/${gameId}`,
        { withCredentials: true }
      );
      const { acceptedCount, teamLength, teamFull } = res2.data;

      console.log(`Accepted: ${acceptedCount}/${teamLength}`);

      if (teamFull) {
        alert("✅ Team is full! Redirecting to start game...");
        navigate(`/dashboard/startgame/${gameId}`);
      }
    } catch (err) {
      console.error(`Error updating request ${action}:`, err);
      alert("Failed to update request.");
    }
  };

  // 🔁 Manual Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRequests();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white w-11/12 sm:w-2/3 md:w-1/2 h-3/4 rounded-2xl shadow-xl p-6 overflow-y-auto animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        {/* Title + Refresh */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Join Requests
          </h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`flex items-center gap-1 px-3 py-1 rounded-md border transition ${
              refreshing
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <RefreshCcw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Status display */}
        {loading ? (
          <p className="text-center text-gray-600">Loading requests...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-600">No join requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex justify-between items-center border p-3 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-800">{req.name}</p>
                  <p className="text-sm text-gray-600">{req.email}</p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        req.status === "accepted"
                          ? "text-green-600"
                          : req.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>
                </div>

                {/* Buttons */}
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(req.id, "accepted")}
                      className="py-1 px-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "rejected")}
                      className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewDetailsPopup;
