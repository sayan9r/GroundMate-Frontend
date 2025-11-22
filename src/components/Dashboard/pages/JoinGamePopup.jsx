import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function JoinGamePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const hasJoined = useRef(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Step 1️⃣ — User sends join request once
  useEffect(() => {
    const joinGame = async () => {
      if (hasJoined.current) return;
      hasJoined.current = true;

      const confirmJoin = window.confirm("Do you want to join this game?");
      if (confirmJoin) {
        try {
          await axios.post(
            "http://localhost:5000/api/auth/joinrequest",
            { gameId: id },
            { withCredentials: true }
          );
          setIsOpen(true);
        } catch (err) {
          console.error("Error sending join request:", err);
        }
      } else {
        navigate("/dashboard/joingame");
      }
    };

    joinGame();
  }, [id, navigate]);

  // Step 2️⃣ — Poll every 5s to check if accepted or rejected
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/joinstatus/${id}`,
          { withCredentials: true }
        );

        const { status } = res.data;
        console.log("Join request status:", status);

        if (status === "accepted") {
          clearInterval(interval);
          alert("✅ Your request has been accepted!");
          navigate(`/dashboard/startgame/${id}`);
        } else if (status === "rejected") {
          clearInterval(interval);
          alert("❌ Your request was rejected by the game creator.");
          navigate("/dashboard/joingame");
        }
      } catch (err) {
        console.error("Error checking join status:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id, isOpen, navigate]);

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="relative bg-white w-11/12 sm:w-2/3 md:w-1/2 h-1/2 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fadeIn">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/dashboard/joingame");
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
            >
              <X size={22} />
            </button>

            <div className="w-3/4 bg-gray-200 rounded-full h-3 overflow-hidden mb-6">
              <div className="bg-green-500 h-3 animate-loadingBar"></div>
            </div>

            <p className="text-lg font-semibold text-gray-700 animate-pulse">
              Waiting for the host to confirm your request...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinGamePopup;
