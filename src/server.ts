import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { eMessages } from "./utils/constants";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`${eMessages.server} ${PORT}`);
});

app.use("/auth", authRoutes);
app.use(errorHandler);
app.get("*", (_req: Request, res: Response) => {
  res.status(404).send({ errorMessage: eMessages.notFound });
});
