import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleForm = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(`http://localhost:3000/api/users/register`,{userName, email, password}, {
                withCredentials: true
            })
            console.log(data)
            toast.success(data.message)
            navigate("/login")
            setUserName("")
            setEmail("")
            setPassword("")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

  return (
    <div>
        <div className='h-screen flex items-center justify-center'>
            <div className='shadow-lg rounded-lg p-8'>
                <form onSubmit={handleForm}>
                    <h1 className='text-2xl font-semibold text-center text-green-700'>Register Page</h1>
                    <div className='mt-4'>
                        <input
                            type="text" 
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                            placeholder='Full Name' 
                            className='w-full border border-green-600 rounded-md outline-none focus:ring-1 focus:ring-green-600 px-4 py-2'
                        />
                    </div>
                    <div className='mt-4'>
                        <input
                            type="email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Email Id' 
                            className='w-full border border-green-600 rounded-md outline-none focus:ring-1 focus:ring-green-600 px-4 py-2'
                        />
                    </div>
                    <div className='mt-4'>
                        <input
                            type="password" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder='Password' 
                            className='w-full border border-green-600 rounded-md outline-none focus:ring-1 focus:ring-green-600 px-4 py-2'
                        />
                    </div>
                    <p className='text-center mt-2 text-sm'>Already have an account <Link to={"/login"} className='text-green-600 hover:underline cursor-pointer'>Login</Link></p>
                    <button
                        type='submit'
                        className='mt-4 bg-green-500 w-full text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 duration-300 cursor-pointer'
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register