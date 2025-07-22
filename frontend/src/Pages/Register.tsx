import React, { useState } from 'react'
import { InputField } from '../Components/InputField'
import { AuthService } from '../Services/authService';

const Register = () => {
 
  const [form,setForm] = useState({name:"",email:"",passwordHash:""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister=async() => {
    console.log('Registering user with:', form);
    if(!form.email || !form.passwordHash || !form.name){
      alert("Please enter all the fields!");
      return;
    }
    try{
    const response= await AuthService.register({name:form.name,email:form.email,passwordHash:form.passwordHash});
    console.log(response);
    
    window.location.href="/login";


    }
    catch(error ){
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
    <div className="flex items-center justify-center bg-gray-800  px-4 rounded-2xl">

      <div className="max-w-md w-full bg-grey p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Register to GymLink</h2>

        <InputField
          label="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="passwordHash"
          type="password"
          value={form.passwordHash}
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
          onClick={handleRegister}
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
  )
}

export default Register