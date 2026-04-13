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
import { requireAuth } from "../middleware/requireAuth";
import { auth } from "../utils/authHandler";

const router = Router();

router.use(requireAuth);

router.get("/", auth(getAllExpenses));
router.get("/:id", auth(getExpenseById));
router.post("/", validate(createExpenseSchema), auth(createExpense));
router.put("/:id", validate(updateExpenseSchema), auth(updateExpense));
router.delete("/:id", auth(deleteExpense));

export default router;