import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth";

const app = express();
const PORT = 5001;

app.use(express.json());
app.use("/api/auth", authRouter);
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
