import axios from 'axios';
import React, { useState } from 'react'
import CustomButton from '../CustomBUtton'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, AUTH_REGISTER } from '../../api';


function SignUp({setUser}) {
  const [form, setForm] = useState({
    name: '',
    city: '',
    contact_no: '',
    email: '',
    password: ''
  });

  const [error,setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
            const res = await axios.post(`${API_URL}${AUTH_REGISTER}`,form,{ withCredentials: true });
            setUser(res.data.user);
            navigate("/");

        }catch(err){
            console.error("Login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Register failed");
        }

  }

  return (
   <div className='bg-gray-200 p-2 h-screen'>
     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
         <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
  <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="contact_no"
  >
    Contact Number
  </label>
  <input
    type="tel"
    id="conta_no"
    name="contact_no"
    value={form.contact_no}
    onChange={handleChange}
    pattern="[0-9]{10}" // ensures 10 digits only
    maxLength="10"
    placeholder="Enter your 10-digit mobile number"
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    required
  />
</div>

         {/* <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2">
                     Sport Interests
             </label>

  <div className="flex flex-col gap-2">
    {["Football", "Cricket", "Badminton", "Basketball", "Tennis"].map((sport) => (
      <label key={sport} className="inline-flex items-center">
        <input
          type="checkbox"
          name="sportInterested"
          value={sport}
          checked={formData.sportInterested.includes(sport)}
          onChange={(e) => {
            const { value, checked } = e.target;
            let updated = [...formData.sportInterested];

            if (checked) {
              updated.push(value);
            } else {
              updated = updated.filter((item) => item !== value);
            }

            setFormData({ ...formData, sportInterested: updated });
          }}
          className="form-checkbox text-blue-600"
        />
        <span className="ml-2 text-gray-700">{sport}</span>
      </label>
    ))}
  </div>
</div> */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
       
        <div className="flex items-center justify-center">
          <CustomButton word="Sign Up" />
        </div>
        <div className="flex pl-3 pt-3">
          <p className='text-blue-700'>Already have an account ? </p> 
          <Link to="/login" className='text-blue-700 pl-5 hover:text-red-600'>Login</Link>
        </div>
      </form>
    </div>
   </div>
  )
}

export default SignUp
