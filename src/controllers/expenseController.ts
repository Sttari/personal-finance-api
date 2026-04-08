import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import prisma from "../db";


export const getAllExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
  const expenses = await prisma.expense.findMany({
    where: {userId: req.user!.id,},
  });
  res.json(expenses);
};

export const getExpenseById = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const expense = await prisma.expense.findFirst({
    where: {
      id,
      userId: req.user!.id,
    },
  });
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  res.json(expense);
};




export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const { amount,category, description, date } = req.body;
  const expense = await prisma.expense.create({
    data: {
      amount,
      category,
      description,
      date,
      userId: req.user!.id,
    },
  });
  res.status(201).json(expense);
};
export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
  const existing = await prisma.expense.findFirst({
    where: { id, userId: req.user!.id },
  });
  if (!existing) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  const updated = await prisma.expense.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
};
  
export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const existing = await prisma.expense.findFirst({
    where: { id, userId: req.user!.id },
  });
  if (!existing) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  const deleted = await prisma.expense.delete({
    where: { id },
  });
  res.json({ message: "Expense deleted" });
};