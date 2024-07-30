import express from "express";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

//API for register a new user
router.post("/register", register);

//API for login
router.post("/login", login);

export default router;
