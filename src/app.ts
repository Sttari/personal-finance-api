import express, { Request, Response } from "express";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import { requireAuth } from "./middleware/requireAuth";
import cors from "cors";

const app = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Personal Finance API is running" });
});
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;