import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAvatar } from "../utils/generateIdenticon";
import { profile } from "console";

const router = express.Router();

const prisma = new PrismaClient();

//API for register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
      profile: {
        create: {
          bio: "testBio", // hard-coded
          profileImgUrl: generateAvatar(email),
        },
      },
    },
    include: {
      profile: true,
    },
  });
  res.status(201).json(user);
});

//API for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "The user does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  return res.json({ token });
});

export default router;
