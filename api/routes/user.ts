import express from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest, isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

const prisma = new PrismaClient();

//API to find the user
router.get("/find", isAuthenticated, async (req: AuthRequest, res) => {
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
});

router.get("/profile/:userId", async (req, res) => {
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
});

export default router;
