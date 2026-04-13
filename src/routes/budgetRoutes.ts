import { Router } from "express";
import {
  getAllBudgets,
  createBudget,
  deleteBudget,
} from "../controllers/budgetController";
import { validate } from "../middleware/validate";
import { createBudgetSchema } from "../types/budget";
import { requireAuth  } from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

router.get("/", getAllBudgets);
router.post("/", validate(createBudgetSchema), createBudget);
router.delete("/:id", deleteBudget);

export default router;