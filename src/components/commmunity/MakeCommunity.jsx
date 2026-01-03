import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL,AUTH_CREATEGAME } from "../../api";

function MakeCommunity() {
    const [formData, setFormData] = useState({
    Name: "",
    city: "",
    status: "",
    description: "",
  });

  
  const navigate = useNavigate();
  const [error,setError] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

    try{
            const res = await axios.post(`${API_URL}${AUTH_CREATEGAME}`,formData,{ withCredentials: true });
           // setUser(res.data.user);
            navigate("/dashboard");

        }catch(err){
            console.error("Login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Register failed");
        }
 };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center  items-center p-6">
      {error && <p className='text-red-500 mb-4'> {error} </p>}
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
            htmlFor="Name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
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
            Sport Type
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
            <option value="football">Public</option>
            <option value="cricket">Private</option>  
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