import express from 'express'
import { create, deleteTodo, getAllTodos, update } from '../controller/TodoController.js'
const router = express.Router()

router.post("/create", create)
router.get('/get', getAllTodos)
router.delete('/delete-todo/:id', deleteTodo)
router.put('/update-todo/:id', update)


export default router;