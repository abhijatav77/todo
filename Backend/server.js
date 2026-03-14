import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";
import cors from 'cors'
import todoRouter from './routes/todo.Routes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(
   {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
   }
))

app.use("/api/users", userRoutes);
app.use("/api/todo", todoRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

});