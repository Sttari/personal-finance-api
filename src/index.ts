import "dotenv/config";
import express, { Request, Response } from "express";
import expenseRoutes from "./routes/expenseRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "Personal Finance API is running",
    environment: process.env.NODE_ENV, 
  });
});

app.use("/api/expenses", expenseRoutes);
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
});