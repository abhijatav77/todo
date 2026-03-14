import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

});