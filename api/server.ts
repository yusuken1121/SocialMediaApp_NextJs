import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
const PORT = 5001;

const prisma = new PrismaClient();

app.use(express.json());

//API for register a new user
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
    },
  });
});

//API for login
app.post("/api/auth/login", async (req, res) => {
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

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
