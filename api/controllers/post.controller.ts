import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/isAuthenticated";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postComment = async (req: AuthRequest, res: Response) => {
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
        author: {
          include: {
            profile: true,
          },
        },
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    });
    return res.json({ latestPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
};

export const getFilteredPost = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userPosts = await prisma.post.findMany({
      where: { authorId: parseInt(userId) },
      orderBy: { createdAt: "desc" },
      include: { author: { include: { profile: true } } },
    });
    return res.json({ userPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "cannot find posts" });
  }

  res.status(200).json();
};
