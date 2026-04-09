import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, GAMEROOM, JOIN_REQUESTS } from "../../../api";
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
        `${API_URL}${GAMEROOM}/update-request/${id}`,
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
  if(requests.length === 0){
    return(
      <h1 className="text-2xl font-bold mb-6">No Join Requests</h1> 

    ); 
  }

  return (
    <div className="min-h-auto bg-gray-950 text-white p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Pending Join Requests</h1> */}

    {requests.map((req) => (
  <div
    key={req.id}
    className="bg-gray-900 p-4 rounded-xl shadow-md"
  >
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        
        {/* Profile Image */}
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold shrink-0">
          {req.profile_image ? (
            <img
              src={`${API_URL}${req.profile_image}`}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-white">
              {req.creator_name?.charAt(0)}
            </span>
          )}
        </div>

        {/* Text */}
        <p className="text-sm sm:text-base leading-relaxed">
          <span className="font-semibold text-cyan-400">
            {req.creator_name}
          </span>{" "}
          invited you to join his game room
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-start sm:justify-end">
       {/* Buttons */}
<div className="flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto">
  <button
    onClick={() => handleAction(req.id, "accepted")}
    className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-green-600 hover:bg-green-700 rounded-full transition"
  >
    <Check size={18} />
  </button>

  <button
    onClick={() => handleAction(req.id, "rejected")}
    className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-red-600 hover:bg-red-700 rounded-full transition"
  >
    <X size={18} />
  </button>
</div>

      </div>
    </div>
  </div>
))}


    </div>
  );
}

export default JoinRequests;
