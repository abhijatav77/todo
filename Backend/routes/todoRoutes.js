import express from "express";
import { createTodo, getAllTodos, todoDelete, todoUpdate } from "../controller/TodoController.js";
import userAuth from "../middleware/userAuth.js";

const todoRoutes = express.Router();

todoRoutes.post("/createtodo", userAuth, createTodo);
todoRoutes.get("/todos", userAuth, getAllTodos);
todoRoutes.put("/todoUpdate/:id", userAuth, todoUpdate);
todoRoutes.delete("/todoDelete/:id", userAuth, todoDelete);

export default todoRoutes;