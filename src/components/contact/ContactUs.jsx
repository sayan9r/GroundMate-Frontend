import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/auth/contactus",form,{ withCredentials: true });
            navigate("/");

        }catch(err){
            console.error("error:", err.response?.data || err.message);
           
        }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-white flex flex-col items-center justify-center p-6 ">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 grid md:grid-cols-2 gap-10">
        
        {/* Left section - Contact info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-green-700">Contact GroundMate</h2>
          <p className="text-gray-600">
            Have questions, feedback, or partnership ideas? We’d love to hear from you!
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-green-600" /> 
              <span>support@groundmate.in</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-green-600" />
              <span>+91 74072 64892</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-green-600" />
              <span>Kolkata, West Bengal, India</span>
            </div>
          </div>

          <div className="mt-6">
            <iframe
              title="GroundMate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.349447275535!2d88.38412587508081!3d22.672149179420945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89deaf3f1d217%3A0x214815830058bbca!2sNAG%20MARBLE%20%26%20SANITATION!5e1!3m2!1sen!2sin!4v1762717080666!5m2!1sen!2sin"
              className="w-full h-52 rounded-lg border-none"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right section - Contact form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">Send us a message</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
