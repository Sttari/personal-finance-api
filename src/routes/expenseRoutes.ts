import { Router } from "express";
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";
import { validate } from "../middleware/validate";
import { createExpenseSchema, updateExpenseSchema } from "../types/expense";


const router = Router();

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.post("/", validate(createExpenseSchema), createExpense);
router.put("/:id", validate(updateExpenseSchema),  updateExpense);
router.delete("/:id", deleteExpense);

export default router;