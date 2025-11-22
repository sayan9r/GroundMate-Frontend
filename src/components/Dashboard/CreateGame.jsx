import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateGame({user}) {
  const [formData, setFormData] = useState({
    sportType: "",
    city: "",
    teamLength: "",
    date: "",
    startTime: "",
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
            const res = await axios.post("http://localhost:5000/api/auth/creategame",formData,{ withCredentials: true });
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
          Create a New Game
        </h2>

        {/* Sport Type */}
        <div className="mb-4">
          <label
            htmlFor="sportType"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Sport Type
          </label>
          <select
            id="sportType"
            name="sportType"
            value={formData.sportType}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Sport</option>
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
            <option value="badminton">Badminton</option>
            <option value="basketball">Basketball</option>
            <option value="volleyball">Volleyball</option>
          </select>
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

        {/* Team Length */}
        <div className="mb-4">
          <label
            htmlFor="teamLength"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Team Length (Max Players)
          </label>
          <input
            type="number"
            id="teamLength"
            name="teamLength"
            value={formData.teamLength}
            onChange={handleChange}
            min="1"
            placeholder="e.g., 10"
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          Create Game
        </button>
      </form>
    </div>
  );
}

export default CreateGame;
