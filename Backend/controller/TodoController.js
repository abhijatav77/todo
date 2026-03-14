import { Todo } from "../module/TodoModule.js";

export const create = async (req, res) => {
    try {
        const { title } = req.body; 

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
                success: false
            });
        }   
        const newTodo = await Todo.create({
            title
        }); 

        return res.status(201).json({
            message: "Todo created successfully",
            success: true,
            todo: newTodo
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",  
        });
    }   
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const {title} = req.body;
        if(!title){
            return res.status(400).json({
                success: false,
                message: "Fields are required"
            })
        }
        const update = await Todo.findOneAndUpdate({_id: id}, {title}, {new: true})
        if(!update){
            return res.status(400).json({
                success: false,
                message: "Todo not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            update
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find()

        return res.status(200).json({ todos }); 
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id)
        if(!todo){
            return res.status(400).json({
                success: false,
                message: "Todo not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
}