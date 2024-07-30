import express from "express";
import { PrismaClient } from "@prisma/client";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

const prisma = new PrismaClient();

//API for register a new user
router.post("/register", register);

//API for login
router.post("/login", login);

export default router;
