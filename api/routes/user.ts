import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getFindUser, getFindUsers } from "../controllers/user.controller";

const router = express.Router();

//API to find users
router.get("/find", isAuthenticated, getFindUsers);

//API to find a user
router.get("/profile/:userId", getFindUser);

export default router;
