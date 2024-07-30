import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/isAuthenticated";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFindUsers = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });
    if (!user) return res.status(404).json({ message: "Cannot find the user" });
    res.status(201).json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
};

export const getFindUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) res.status(404).json({ message: "The user does not exist" });

  try {
    const profile = await prisma.profile.findUnique({
      where: { profileId: parseInt(userId) },
      include: { profile: true },
    });

    if (!profile)
      return res.status(404).json({ message: "cannot find the profile" });
    res.status(200).json({ profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
};
