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