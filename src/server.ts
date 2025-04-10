import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/auth", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
