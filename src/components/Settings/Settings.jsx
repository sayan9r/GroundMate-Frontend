import React, { useState } from "react";
import { Edit, Mail, Phone, User, Mars, Venus } from "lucide-react";
import { API_URL, SETTINGS } from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings({ user }) {
  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.contact_no);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();

const handleChange = async () => {
  try {
    const token = localStorage.getItem("token"); // or wherever you store it

    const res = await axios.put(
        `${API_URL}${SETTINGS}`,
      {
        name: name,
        contact_no: mobile,
        gender: gender,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile updated successfully ✅");
    navigate("/dashboard");
    console.log(res.data.user);

  } catch (err) {
    console.error(err);
    alert("Failed to update profile ❌");
  }
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-b  from-black via-blue-950 to-gray-950 border-2  border-t-blue-600 shadow-md rounded-xl p-6  flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-[#0b1224] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-8">

{/* Left Profile Image */}
<div className="relative flex-shrink-0 group mx-auto md:mx-0">
  <img
    src=""
    alt="Profile"
    className="w-35 h-35 object-cover rounded-4xl border border-blue-700"
  />

  {/* Hover / Mobile Edit Overlay */}
  <label
    className="
      absolute inset-0 flex items-center justify-center
      bg-black/60 rounded-2xl
      opacity-100 md:opacity-0
      md:group-hover:opacity-100
      transition cursor-pointer
    "
  >
    <Edit size={26} className="text-blue-400" />
    <input type="file" className="hidden" accept="image/*" />
  </label>
</div>


        {/* Right Settings Form */}
        <div className="flex-1 space-y-5">
          <h2 className="text-2xl font-semibold text-blue-400">Account Settings</h2>

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <div className="flex items-center gap-2 mt-1 bg-black border border-blue-800 rounded-lg px-3">
              <User size={18} className="text-blue-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent py-2 outline-none text-white"
              />
            </div>
          </div>

          {/* Email (Non-editable) */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <div className="flex items-center gap-2 mt-1 bg-[#050b1a] border border-blue-900 rounded-lg px-3">
              <Mail size={18} className="text-blue-500" />
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-transparent py-2 text-gray-500 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="text-sm text-gray-400">Mobile Number</label>
            <div className="flex items-center gap-2 mt-1 bg-black border border-blue-800 rounded-lg px-3">
              <Phone size={18} className="text-blue-500" />
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full bg-transparent py-2 outline-none text-white"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Gender</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender("male")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  gender === "male"
                    ? "bg-blue-600 border-blue-600"
                    : "border-blue-900 hover:bg-[#111b33] text-white"
                }`}
              >
                <Mars /> Male
              </button>

              <button
                onClick={() => setGender("female")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  gender === "female"
                    ? "bg-blue-600 border-blue-600"
                    : "border-blue-900 hover:bg-[#111b33] text-white"
                }`}
              >
                <Venus /> Female
              </button>

              <button
                onClick={() => setGender("other")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  gender === "other"
                    ? "bg-blue-600 border-blue-600"
                    : "border-blue-900 hover:bg-[#111b33] text-white"
                }`}
              >
                 Other
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button 
            onClick={() => handleChange()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
