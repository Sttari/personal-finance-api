import "dotenv/config";
import express, { Request, Response } from "express";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Personal Finance API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});