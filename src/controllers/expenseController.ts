import { Request, Response } from "express";
import { Expense } from "../types/expense";

const expenses: Expense[] = [];

export const getAllExpenses = (req: Request, res: Response): void => {
  res.json(expenses);
};

export const getExpenseById = (req: Request, res: Response): void => {
  const expense = expenses.find((e) => e.id === req.params.id);

  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  res.json(expense);
};

export const createExpense = (req: Request, res: Response): void => {
  const { amount, category, description, date } = req.body;

  const newExpense: Expense = {
    id: crypto.randomUUID(),
    amount,
    category,
    description,
    date,
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
};

export const updateExpense = (req: Request, res: Response): void => {
  const index = expenses.findIndex((e) => e.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  const updated: Expense = {
    ...expenses[index],
    ...req.body,
    id: expenses[index].id,
    createdAt: expenses[index].createdAt,
  };

  expenses[index] = updated;
  res.json(updated);
};

export const deleteExpense = (req: Request, res: Response): void => {
  const index = expenses.findIndex((e) => e.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  const deleted = expenses.splice(index, 1)[0];
  res.json({ message: "Expense deleted", expense: deleted });
};

export const getExpenses = (): Expense[] => {
  return expenses;
};