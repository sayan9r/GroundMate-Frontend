import React, { useState } from 'react';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconPlus,
  IconUserPlus,
  IconBuildingStadium,
  IconUsersGroup,
  IconMapPin,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Reports from "./pages/Reports";
import { API_URL, AUTH_LOGOUT, UPDATE_LOCATION } from '../../api';
import { useEffect } from 'react';

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!user) return; 

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await axios.post(`${API_URL}${UPDATE_LOCATION}`, {
            lat: latitude,
            lng: longitude
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
        } catch (err) {
          console.log("Location update failed");
        }
      },
      (error) => { console.log("Location permission denied"); },
      { enableHighAccuracy: true }
    );
  }, [user]);

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

  // Helper component for Mobile Icons with Tooltips
  const NavIcon = ({ icon, label, onClick }) => (
    <div className="group relative flex flex-col items-center">
      <button onClick={onClick} className="text-gray-300 hover:text-blue-400 transition-colors">
        {icon}
      </button>
      {/* Tooltip Label - Visible on hover */}
      <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-blue-600 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
        {label}
      </span>
    </div>
  );

  return (
    <div className="h-screen w-full bg-black border-t-2 border-t-blue-600 overflow-hidden flex flex-col">
      <div className="flex flex-1 h-full w-full overflow-hidden">

        {/* ===== DESKTOP SIDEBAR ===== */}
        <div className="hidden md:flex bg-gradient-to-r from-gray-900 to-black border-r border-blue-500 p-6 flex-col items-center w-1/5 h-full overflow-y-auto">
          <img
            src={user.profile_image ? `${API_URL}${user.profile_image}` : "/default_image.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-800 shadow-lg"
          />
          <h2 className="mt-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center">
            {user.name}
          </h2>
          <div className="flex items-center gap-2 text-gray-400 mt-1 text-sm">
            <IconMapPin className="h-4 w-4 text-blue-400" />
            {user.city}
          </div>
          <div className="w-full h-px bg-blue-900 my-6 opacity-50" />
          <div className="w-full flex flex-col gap-2">
            {links.map((link, index) => (
              <div
                key={index}
                onClick={() => link.onClick ? link.onClick() : navigate(link.to)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 cursor-pointer hover:bg-blue-900/30 hover:text-white transition"
              >
                <span className="text-blue-400">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 bg-gradient-to-r from-black to-gray-800 p-4 sm:p-6 overflow-y-auto h-full scroll-smooth pb-28 md:pb-6">
          <Reports />
        </div>
      </div>

      {/* ===== MOBILE BOTTOM NAVIGATION ===== */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-sm bg-black backdrop-blur-lg border border-blue-500/40 rounded-3xl px-4 py-3 flex items-center justify-between shadow-[0_0_20px_rgba(0,112,243,0.3)] z-50">
        
        {/* Profile (Left) */}
        <div className="group relative">
          <img
            src={user.profile_image ? `${API_URL}${user.profile_image}` : "/default_image.png"}
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover cursor-pointer"
            onClick={() => navigate("/dashboard")}
          />
          {/* <span className="absolute -top-10 left-0 scale-0 group-hover:scale-100 transition-all bg-blue-600 text-white text-[10px] px-2 py-1 rounded">Profile</span> */}
        </div>

        {/* Center Actions */}
        <div className="flex items-center gap-5">
          <NavIcon 
            label="Create Game" 
            icon={<IconPlus className="h-7 w-7" />} 
            onClick={() => navigate("/dashboard/creategame")} 
          />
          <NavIcon 
            label="Join Game" 
            icon={<IconUserPlus className="h-7 w-7" />} 
            onClick={() => navigate("/dashboard/joingame")} 
          />
          <NavIcon 
            label="Community" 
            icon={<IconUsersGroup className="h-7 w-7" />} 
            onClick={() => navigate("/community")} 
          />
        </div>

        {/* Options (Right) */}
        <div className="relative">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-300 p-1 hover:text-blue-400"
          >
            <IconDotsVertical className="h-7 w-7" />
          </button>

          {showMobileMenu && (
            <div className="absolute bottom-16 right-0 w-36 bg-gray-900 border border-blue-900/50 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-4">
              <button 
                onClick={() => { navigate("/seetings"); setShowMobileMenu(false); }}
                className="flex items-center gap-3 w-full px-3 py-2 text-xs text-gray-200 hover:bg-blue-900/40 rounded-xl"
              >
                <IconSettings className="h-4 w-4" /> Settings
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 text-xs text-red-400 hover:bg-red-900/20 rounded-xl mt-1"
              >
                <IconArrowLeft className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;