import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL,AUTH_CREATEGAME, NEWCOMMUNITY } from "../../api";

function MakeCommunity() {
    const [formData, setFormData] = useState({
    name: "",
    city: "",
    status: "",
    description: "",
  });

  
  const navigate = useNavigate();
  const [error,setError] = useState();
  const [community,setCommunity] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

    try{
            const res = await axios.post(`${API_URL}${NEWCOMMUNITY}`,formData,{ withCredentials: true });
            setCommunity(res.data);
            navigate("/community/communitys-dashboard");

        }catch(err){
            console.error("Login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to create community");
        }
 };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center  items-center p-6">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create a New Community
        </h2>

         {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter community name"
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* community status */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Community Type
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>  
          </select>
        </div>


        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description about the game..."
            rows="3"
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {error && <p className='text-red-500  mb-4'> {error} </p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Create Community
        </button>
      </form>
    </div>
  );
}

export default MakeCommunity