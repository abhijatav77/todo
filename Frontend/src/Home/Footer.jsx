import React from 'react'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
      <div className='border'>
        <div className='flex flex-col items-center justify-center space-y-4 mt-5'>
          <h1 className='text-2xl text-green-600 font-bold'>To-Do</h1>
          <p className='text-sm text-gray-600'>this is the to-do list to create the practice of mern stack projects</p>
          <div className='flex gap-3 mb-5'>
            <FaGithub size={20} className='hover:text-red-900 duration-300 cursor-pointer'/>
            <FaLinkedin size={20} className='hover:text-blue-600 duration-300 cursor-pointer'/>
            <FaYoutube size={20} className='hover:text-red-600 duration-300 cursor-pointer'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer