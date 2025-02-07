
import React  from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const Login = ({ setnavdis }) => {
 
    const schema = yup.object().shape({
         
        email: yup.string().email("Please Enter a Valid Email").required("Please Enter an Email"),
        password: yup.string().required("Please Enter a Password"),
      
    });

    const { register, handleSubmit,   formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

  
    const onSubmit = async (data) => {
    
            try {
                const dataa = {
                    email:data.email,
                    password:data.password
                }
                const response = await axios.post("http://localhost:8000/api/login/", dataa)
                console.log(response)
                 
             setnavdis(true)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert("Incorrect email or password. Please try again.");
                } else {
                    alert("An error occurred. Please try again later.");
                }
            }
    }
    return (
        <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative'>
            <h1 className='text-4xl text-white font-bold text-center mb-10 mt-2'>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='relative my-4'>
                <input 
                        type="email" 
                        className='block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
                        placeholder='' 
                        {...register("email")}
                    />
                    <label 
                        htmlFor="" 
                        className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6'
                    >
                        Enter Email
                    </label>
                    <p    >{errors.email?.message}</p>
                  </div>
                <div className='relative my-4 mt-7'>
                <input 
                        type="password" 
                        className='block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' 
                        placeholder=''
                        {...register("password")} 
                    />
                    <label 
                        htmlFor="" 
                        className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6'
                    >
                       Enter Password
                    </label>
                    <p  >{errors.password?.message}</p>
                </div>
                 
                <button 
                    className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-blue-500 hover:text-white py-2 transition-colors duration-300' 
                    type="submit"
                >
                    Login
                </button>
                <div className='text-center'>
                    <span className='m-4'>New Here?<Link className='text-blue-300 ml-3' to='Register'>Create an account</Link></span>
                </div>
            </form>
        </div>

        
    );
}

export default Login;
