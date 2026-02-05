import axios from 'axios';
import React, { useState } from 'react'
import CustomButton from '../CustomBUtton'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, AUTH_GOOGLE, AUTH_LOGIN } from '../../api';
import signupBg from '././../../assets/covar_image.jpg';


function Login({setUser}) {
  const [form, setForm] = useState({
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
            const res = await axios.post(`${API_URL}${AUTH_LOGIN}`, form, { withCredentials: true });
            setUser(res.data.user);
            navigate("/dashboard");

        }catch(err){
            console.error("Login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Login failed");
        }

  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${signupBg})` }}
 >
     <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-b  from-blue-100 via-blue-50 to-white backdrop-blur-md rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
       {error && <p className='text-red-500 mb-4'> {error} </p>}

      <form onSubmit={handleSubmit}>
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
          <CustomButton word="Login" />
        </div>
        <div className="flex pl-3 pt-3">
          <p className='text-blue-700'>Don't have an account ? </p> 
          <Link to="/signup" className='text-blue-700 pl-5 hover:text-red-600'>signup</Link>
        </div>
        

      </form>
    </div>
   </div>
  )
}

export default Login
