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
        authorId: 1, // temporary hard-code
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error is occured" });
  }
});

// //API for login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return res.status(401).json({ error: "The user does not exist" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(401).json({ error: "Invalid password" });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
//     expiresIn: "1d",
//   });
//   return res.json({ token });
// });

export default router;
