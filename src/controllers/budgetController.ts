import { Response } from "express";
import { Budget } from "../types/budget";
import { Expense } from "../types/expense";
import { AuthRequest } from "../middleware/auth";

const budgets: Budget[] = [];

// We need access to expenses to calculate spending
// In a real app, a database would handle this with queries
import { getExpenses } from "./expenseController";

export const getAllBudgets = (req: AuthRequest, res: Response): void => {
  const expenses = getExpenses();

  const budgetsWithSpent = budgets.map((budget) => {
    const spent = expenses
      .filter((e) => e.category.toLowerCase() === budget.category.toLowerCase())
      .reduce((sum, e) => sum + e.amount, 0);

    return { ...budget, spent };
  });

  res.json(budgetsWithSpent);
};

export const createBudget = (req: AuthRequest, res: Response): void => {
  const { category, limit, period } = req.body;

  const existing = budgets.find(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  );
  if (existing) {
    res.status(409).json({ error: "Budget for this category already exists" });
    return;
  }

  const newBudget: Budget = {
    id: crypto.randomUUID(),
    category,
    limit,
    period,
    spent: 0,
    createdAt: new Date().toISOString(),
  };

  budgets.push(newBudget);
  res.status(201).json(newBudget);
};

export const deleteBudget = (req: AuthRequest, res: Response): void => {
  const index = budgets.findIndex((b) => b.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Budget not found" });
    return;
  }

  const deleted = budgets.splice(index, 1)[0];
  res.json({ message: "Budget deleted", budget: deleted });
};