import express, { Request, Response } from "express";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Personal Finance API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;