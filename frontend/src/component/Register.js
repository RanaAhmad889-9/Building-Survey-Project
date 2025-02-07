import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  
  const schema = yup.object().shape({
    fullName: yup.string().matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces").required("Please Enter Your Name"),
    email: yup.string().email("Please Enter a Valid Email").required("Please Enter an Email"),
    password: yup.string().min(8, "Password must be at least 8 characters").matches(/[A-Z]/, "Password must contain one uppercase letter").matches(/[\W_]/, "Password must contain one special character").required("Please Enter a Password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords Don't Match").required("Please Confirm Your Password")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        full_name: data.fullName,
        username: data.fullName.split(" ")[0], 
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword
      });

      if (response.status === 201) {
        alert("Signup Successful");
        navigate('/');
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response) {
        if (error.response.data.username) {
          errorMessage = error.response.data.username;
        } else if (error.response.data.email) {
          errorMessage = error.response.data.email;
        } else {
          errorMessage = error.response.data.detail || errorMessage;
        }
      } else if (error.request) {
        errorMessage = "Network error. Please try again later.";
      }
      alert(errorMessage);
    }
  };

  return (
    <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative'>
      <h1 className='text-4xl text-white font-bold text-center mb-6 mt'>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
      
        <div className='relative my-4'>
          <input
            type="text"
            className='block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            placeholder=""
            {...register("fullName")}
          />
          <label
            htmlFor=""
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6'
          >
            Enter Name
          </label>
          <p className="text-red-500">{errors.fullName?.message}</p>
        </div>

        
        <div className='relative my-4 mt-7'>
          <input
            type="email"
            className='block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            placeholder=""
            {...register("email")}
          />
          <label
            htmlFor=""
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6'
          >
            Enter Email
          </label>
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        
        <div className='relative my-4 mt-7'>
          <input
            type="password"
            className='block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            placeholder=""
            {...register("password")}
          />
          <label
            htmlFor=""
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6'
          >
            Enter Password
          </label>
          <p className="text-red-500">{errors.password?.message}</p>
        </div>

        
        <div className='relative my-4 mt-7'>
          <input
            type="password"
            className='block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
            placeholder=""
            {...register("confirmPassword")}
          />
          <label
            htmlFor=""
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6'
          >
            Confirm Password
          </label>
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        </div>

      
        <button className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-blue-500 hover:text-white py-2 transition-colors duration-300' type="submit">
          Register
        </button>

        
        <div>
          <span className='m-4'>Already have an Account? <Link className='text-blue-300 ml-3' to='/'>Login</Link></span>
        </div>
      </form>
    </div>
  );
};

export default Register;
