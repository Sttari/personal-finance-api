import { Router } from "express";
import {
  getAllBudgets,
  createBudget,
  deleteBudget,
} from "../controllers/budgetController";
import { validate } from "../middleware/validate";
import { createBudgetSchema } from "../types/budget";
import { requireAuth  } from "../middleware/requireAuth";
import { auth } from "../utils/authHandler";

const router = Router();

router.use(requireAuth);

router.get("/", auth(getAllBudgets));
router.post("/", validate(createBudgetSchema), auth(createBudget));
router.delete("/:id", auth(deleteBudget));

export default router;