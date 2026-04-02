import express, { Request, Response } from "express";
import expenseRoutes from "./routes/expenseRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Personal Finance API is running" });
});

app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});