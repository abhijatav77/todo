import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/UseAuth';

const Hero = () => {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState()

  const {todo, setTodo} = useAuth()
  console.log("todosssss", todo)

  const handleAdd = async() => {
    // e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:3000/api/todo/create', {title}, {
        withCredentials: true
      })  
      console.log(data)
      toast.success(data.message)

    // add new todo at the top
    setTodo(prev => [data.todo, ...prev])
    setTitle("")
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  const handleEditClick = (item) => {
    setTitle(item.title)
    setEditId(item._id)
  }

  const handleUpdate = async() => {
    try {
      const {data} = await axios.put(`http://localhost:3000/api/todo/update-todo/${editId}`,{title},{
        withCredentials: true
      })
      toast.success(data.message)

      setTodo((prev) => prev.map((item) => item._id === editId ? {...item, title} : item))
      setEditId(null)
      setTitle("")
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  const handleDelete =async (id) => {
    try {
      const {data} = await axios.delete(`http://localhost:3000/api/todo/delete-todo/${id}`,{withCredentials: true})
      console.log(data)
      toast.success(data.message)
      setTodo(todo.filter((item) => item._id !== id))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className='h-screen'>
      <div className='flex flex-col items-center justify-center pt-10'>
        <div className='flex'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter to-do item'
            className='border border-green-500 rounded-l-md px-4 py-2 outline-none'
          />
          <button
            type='submit'
            onClick={editId ? handleUpdate : handleAdd}
            className='bg-green-500 rounded-r-md text-white px-4 py-2 cursor-pointer hover:bg-green-700 duration-400 outline-none'
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div>
          {todo.map((element) => (
            <div 
              key={element._id}
              className='flex justify-between items-center border border-green-600 rounded-md px-4 py-2 gap-5 mt-4 bg-gray-100'
            >
              <span className=''>
                {element.title}
              </span>
              <div className='flex gap-2'>
                <button 
                value={title}
                  className='text-blue-500 text-sm hover:text-blue-700 cursor-pointer'
                  onClick={()=>handleEditClick(element)}
                >
                  Edit
                </button>
                <button 
                  onClick={()=>handleDelete(element._id)}
                  className='text-red-500 text-sm hover:text-red-700 cursor-pointer'>
                    Delete
                  </button>
              </div>
            </div>
          ))}
        </div>
{/* 
        <div className='mt-5 w-60'>
          {todo.map((element) => (
            <div
              key={element._id}
              className='flex justify-between items-center border p-2 m-2 rounded'
            >
              <span>{element}</span>
              <div className='flex gap-2'>
                <button
                  onClick={handleUpdate}
                  className='text-blue-500 cursor-pointer hover:text-blue-700'
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className='text-red-500 cursor-pointer hover:text-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Hero;