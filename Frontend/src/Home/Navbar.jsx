import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const {data} = await axios.get(`http://localhost:3000/api/users/logout`,{withCredentials: true})
            console.log(data)
            toast.success(data.message)
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

  return (
    <div className='shadow-lg'>
        <div className='container mx-auto p-6'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-green-600 cursor-pointer'>To-Do</h1>
                <div className='flex gap-5'>
                    <Link to={'/'} className='hover:text-green-600 duration-300'>Home</Link>
                    <Link to={'/contact'} className='hover:text-green-600 duration-300'>Contact</Link>
                    <Link to={'/about'} className='hover:text-green-600 duration-300'>About us</Link>
                </div>
                <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 duration-300 cursor-pointer'>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar