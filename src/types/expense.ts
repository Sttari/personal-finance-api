// export interface Expense {
//   id: string;
//   amount: number;
//   category: string;
//   description: string;
//   date: string;
//   createdAt: string;
// }
import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be positive"),
  category: z
    .string({ message: "Category is required" })
    .min(1, "Category cannot be empty")
    .max(50, "Category must be 50 characters or less"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description cannot be empty")
    .max(200, "Description must be 200 characters or less"),
  date: z
    .string({ message: "Date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type Expense = CreateExpenseInput & {
  id: string;
  createdAt: string;
};