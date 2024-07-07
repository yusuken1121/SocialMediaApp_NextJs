import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

//API for comment post
router.post("/post", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content is missing" });

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1, // temporary hard
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
    });
    return res.json({ latestPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
});

export default router;
