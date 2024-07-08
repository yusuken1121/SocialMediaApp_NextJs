import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth";
import postRouter from "./routes/posts";
import userRouter from "./routes/user";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/user", userRouter);
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
