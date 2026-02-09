import React from 'react';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconPlus,
  IconUserPlus,
  IconBuildingStadium,
  IconUsersGroup,
  IconMapPin,
} from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Reports from "./pages/Reports";
import { API_URL, AUTH_LOGOUT } from '../../api';

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${API_URL}${AUTH_LOGOUT}`, {}, { withCredentials: true });
    setUser(null);
    navigate("/");
  };

  const links = [
    { label: "Dashboard", to: "/dashboard", icon: <IconBrandTabler className="h-5 w-5" /> },
    { label: "Create Game", to: "/dashboard/creategame", icon: <IconPlus className="h-5 w-5" /> },
    { label: "Join Game", to: "/dashboard/joingame", icon: <IconUserPlus className="h-5 w-5" /> },
    { label: "Community", to: "/community", icon: <IconUsersGroup className="h-5 w-5" /> },
    { label: "Turf Game", to: "/turf", icon: <IconBuildingStadium className="h-5 w-5" /> },
    { label: "Settings", to: "/seetings", icon: <IconSettings className="h-5 w-5" /> },
    { label: "Logout", icon: <IconArrowLeft className="h-5 w-5" />, onClick: handleLogout },
  ];

  return (
    <div className="min-h-screen w-full bg-black border-2  border-t-blue-600">

      {/* Main layout */}
      <div className="flex flex-col md:flex-row min-h-screen w-full">

        {/* ===== LEFT SIDEBAR ===== */}
        <div
          className="
            bg-gradient-to-r from-gray-900 to-black border border-r-blue-500
            p-4 sm:p-6
            flex flex-col items-center
            w-full md:w-1/5
          "
        >
          {/* Profile */}
          <img
            src={user.profile_image ? `${API_URL}${user.profile_image}` : "/default_image.png"}
            alt="Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover
            border-2 border-blue-800 shadow-lg"
          />

          <h2 className="mt-3 text-lg sm:text-xl font-bold
            bg-gradient-to-r from-cyan-400 to-blue-500
            bg-clip-text text-transparent">
            {user.name}
          </h2>

          <div className="flex items-center gap-2 text-gray-400 mt-1 text-sm">
            <IconMapPin className="h-4 w-4 text-blue-400" />
            {user.city}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-blue-900 my-4 sm:my-6 opacity-50" />

          {/* Nav Links */}
          <div className="w-full flex flex-col gap-1 sm:gap-2">
            {links.map((link, index) => (
              <div
                key={index}
                onClick={() =>
                  link.onClick ? link.onClick() : navigate(link.to)
                }
                className="
                  flex items-center gap-3 px-3 py-2
                  rounded-lg text-gray-300 cursor-pointer
                  hover:bg-blue-900/30 hover:text-white
                  transition text-sm sm:text-base
                "
              >
                <span className="text-blue-400">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT CONTENT ===== */}
        <div className="flex-1 bg-gradient-to-r from-black to-gray-800 p-4 sm:p-6 overflow-y-auto">
          <Reports />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
