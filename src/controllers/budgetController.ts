import { Response } from "express";
import { AuthRequest } from "../middleware/requireAuth";
import prisma from "../db";


export const getAllBudgets = async (req: AuthRequest, res: Response): Promise<void> => {
  const budgets = await prisma.budget.findMany({
    where: { userId: req.user.id },
  });

  const budgetsWithSpent = await Promise.all(
    budgets.map(async (budget) => {
      const result = await prisma.expense.aggregate({
        where: {
          userId: req.user.id,
          category: { equals: budget.category, mode: "insensitive" },
        },
        _sum: { amount: true },
      }); 

      return { ...budget, spent: result._sum.amount || 0 };
    })
  );
  res.json(budgetsWithSpent);
};

export const createBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  const { category, limit, period } = req.body;

  const existing = await prisma.budget.findFirst({
    where: {
      userId: req.user.id,
      category: { equals: category, mode: "insensitive" },
    },
  });
  if (existing) {
    res.status(409).json({ error: "Budget for this category already exists" });
    return;
  }

  const newBudget = await prisma.budget.create({
    data: {
      category,
      limit,
      period,
      userId: req.user.id,
    },
  });

  res.status(201).json(newBudget);
};

export const deleteBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const existing = await prisma.budget.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });
  if (!existing) {
    res.status(404).json({ error: "Budget not found" });
    return;   
  }

  const deleted = await prisma.budget.delete({
    where: { id },
  });

  res.json({ message: "Budget deleted", budget: deleted });
};