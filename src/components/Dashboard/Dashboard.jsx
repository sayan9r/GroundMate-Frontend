import React from 'react'
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconPlus,
  IconUserPlus,
  IconBuildingStadium,
  IconUsersGroup,
  IconMapPin,
} from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Reports from "./pages/Reports";
import { API_URL,AUTH_LOGOUT } from '../../api';


function Dashboard({user,setUser}) {
    
  const navigate = useNavigate();
  // activate Logout button
  const handleLogout = async () => {
    await axios.post(`${API_URL}${AUTH_LOGOUT}`, {}, { withCredentials: true });
    setUser(null);
    navigate("/");
  }

    const links = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Create Game",
      to: "/dashboard/creategame",
      icon: (
        <IconPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Join Game",
      to: "/dashboard/joingame",
      icon: (
        <IconUserPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "community",
      to: "/community",
      icon: (
        <IconUsersGroup className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Turf Game",
      to: "/dashboard/turfgame",
      icon: (
        <IconBuildingStadium className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Seetings",
      to: "#",
      icon: (
        <IconSettings className="text-white dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Logout",
      icon: (
        <IconArrowLeft  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ), 
      onClick: (handleLogout) => handleLogout()
    },
  ];
  return (
   <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start  py-10 px-4">
      {/* Main container */}
      <div className="w-full ml-5 flex  flex-col md:flex-row gap-6 h-max ">
        
        {/* --- LEFT DIV (Profile Section) --- */}
        <div className="bg-gray-700 shadow-md rounded-xl p-6 flex flex-col items-center gap-3 md:w-1/4">
           {/* Profile Picture */}
           <img
             src="groot.jpg"
             alt="Profile"
             className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />

            {/* Username */}
            <h2 className="text-xl font-semibold text-white">{user.name}</h2>

            {/* City */}
            <div className="flex items-center justify-center gap-2 text-gray-500" >
                 <IconMapPin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
                 <p className="text-amber-50">{user.city}</p>
            </div>
            

            {/* Navigation Links */}
            <div className="w-full mt-6 flex flex-col gap-3">
             {links.map((link, index) => (
              <div
              key={index}
              onClick={() => (link.onClick ? link.onClick(handleLogout) : navigate(link.to))}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-md transition"
              >
              {link.icon}
              <span className="text-white font-medium">{link.label}</span>
              </div>
              ))}

            </div>
        </div>

        {/* --- RIGHT DIV (Stats & Reports Section) --- */}
        <div className=" bg-gradient-to-r from-gray-700 via-gray-200 to-white shadow-md rounded-xl p-6 flex flex-col gap-6 mr-5 md:w-3/4">
                <Reports/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard