import React, { useState } from 'react';
import { InputField } from '../Components/InputField';
import { AuthService } from '../Services/authService';
import api from '../Services/axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async() => {
    console.log('Logging in with:', form);
    if(!form.email || !form.password){
      alert("Please enter all the fields!");
      return;
    }
    try{
    const response= await AuthService.login({email:form.email,passwordHash:form.password});
    console.log(response);
    const {message, token}=response;
    localStorage.setItem('authToken',token);
    api.defaults.headers.common['Authorization']=`Bearer ${token}`;
    console.log(api.defaults.headers.common['Authorization'])
    console.log(message);
    window.location.href="/setup-profile";


    }
    catch(error ){
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
    <div className="flex items-center justify-center bg-gray-800  px-4 rounded-2xl">
      <div className="max-w-md w-full bg-grey p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Login to GymLink</h2>

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <div className="flex justify-between items-center mb-4">
          <label className="text-sm">
            <input type="checkbox" className="mr-1" />
            Remember me
          </label>
          <button className="text-sm text-blue-600 hover:underline">Forgot Password?</button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}
