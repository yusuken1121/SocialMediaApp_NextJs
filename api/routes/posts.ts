import express from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest, isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

const prisma = new PrismaClient();

//API for comment post
router.post("/post", isAuthenticated, async (req: AuthRequest, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content is missing" });
  if (!req.userId) {
    return res.status(401).json({ message: "User ID is missing in request" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
      include: {
        author: true,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
});

//API to get posts
router.get("/latest-posts", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });
    return res.json({ latestPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
});

export default router;
