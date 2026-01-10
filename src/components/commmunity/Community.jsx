import React, { useEffect, useState } from "react";
import { IconUsersGroup, IconHourglassHigh } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, CHECKCOMMUNITY } from "../../api"; // adjust path if needed

export default function Community() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasCommunity, setHasCommunity] = useState(false);

  useEffect(() => {
    const checkCommunity = async () => {
      try {
        const res = await axios.get(`${API_URL}${CHECKCOMMUNITY}`, {
          withCredentials: true,
        });

        if (res.data.hasCommunity) {
          navigate("/community/communitys-dashboard");
        } else {
          setHasCommunity(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkCommunity();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        Checking community...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-gray-950 border-2 border-t-blue-600 shadow-md flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <IconUsersGroup size={80} className="text-green-600 mb-4" />

      <h1 className="text-3xl text-white font-bold mb-2">
        Community Section
      </h1>

      <p className="text-gray-400 text-lg mb-6 max-w-md">
        A space to communicate with players, manage tournaments,
        share your match stories, and maintain strong connections
        within your community.
      </p>

      <div className="flex flex-col space-y-3">
        <div
          onClick={() => navigate("/community/makecommunity")}
          className="flex items-center space-x-2 bg-green-100 text-green-700 hover:bg-blue-400 px-4 py-2 rounded-full shadow-md cursor-pointer"
        >
          <IconHourglassHigh size={20} />
          <span className="font-semibold">Make a Community</span>
        </div>

        <div className="flex items-center space-x-2 bg-green-100 text-green-700 hover:bg-blue-400 px-4 py-2 rounded-full shadow-md cursor-pointer">
          <IconHourglassHigh size={20} />
          <span className="font-semibold">Join a Community</span>
        </div>

        <div className="flex items-center space-x-2 bg-green-100 text-green-700 hover:bg-blue-400 px-4 py-2 rounded-full shadow-md cursor-pointer">
          <IconHourglassHigh size={20} />
          <span className="font-semibold">Global Community</span>
        </div>
      </div>
    </div>
  );
}
