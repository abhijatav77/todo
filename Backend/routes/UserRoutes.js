import express from "express";
import { register, login, logout } from "../controller/UserController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", userAuth, logout);

export default router;
