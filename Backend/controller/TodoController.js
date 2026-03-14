import Todo from "../module/TodoModule.js";

export const createTodo = async (req, res) => {
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
            data: newTodo
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",  
        });
    }   
};

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find()

        return res.status(200).json({
            message: "Todos retrieved successfully",
            success: true,
            data: todos
        }); 

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
}

export const todoUpdate = async (req , res) =>{
    try {
        const {title} = req.body;

        if(!title){
            return res.status(402).json({
                message : "Title are required",
                success : false
            })
        }

        const update = await Todo.findByIdAndUpdate(title)

        return res.status(201).json({
            message : "Todo update successfully",
            success : true,
            data : update 
        })
    }
    catch(error){
        return res.status(500).json({
            message : error.message || "internal server errir",
            success : false
        })
    }
}

export const todoDelete = async (req , res) =>{
    try {
        const {title} = req.body;

        if(!title){
            return res.status(402).json({
                message : "Title are required",
                success : false
            })
        }

        const remove = await Todo.deleteOne(title)

        return res.status(201).json({
            message : "todo remove successfully",
            success : true,
            data : remove
        })
    }

    catch(error){
        return res.status(500).json({
            message : message.error || "Internal Server error",
            success : false
        })
    }
}