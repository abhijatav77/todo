import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export const UserContext = createContext()

export const AuthProvider = ({ children }) => {

  const [todo, setTodo] = useState([])

  useEffect(() => {

    const fetchTodo = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/todo/get",{withCredentials: true})
        console.log(data)
        setTodo(data.todos)
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }

    fetchTodo()

  }, [])

  return (
    <UserContext.Provider value={{ todo, setTodo }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(UserContext)
}