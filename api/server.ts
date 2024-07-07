import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth";
import postRouter from "./routes/posts";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
