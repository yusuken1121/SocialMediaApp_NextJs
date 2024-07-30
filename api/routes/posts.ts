import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import {
  getFilteredPost,
  getPosts,
  postComment,
} from "../controllers/post.controller";

const router = express.Router();

//API for comment post
router.post("/post", isAuthenticated, postComment);

//API to get posts
router.get("/latest-posts", getPosts);

//API to filter the post by user
router.get("/:userId/user-posts", getFilteredPost);

export default router;
