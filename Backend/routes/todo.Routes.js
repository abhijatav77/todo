import express from 'express'
import { create, deleteTodo, getAllTodos, update } from '../controller/TodoController.js'
import userAuth from '../middleware/userAuth.js'
const router = express.Router()

router.post("/create",userAuth, create)
router.get('/get',userAuth, getAllTodos)
router.delete('/delete-todo/:id',userAuth, deleteTodo)
router.put('/update-todo/:id',userAuth, update)


export default router;