import { z } from "zod";

export const createBudgetSchema = z.object({
  category: z
    .string({ message: "Category is required" })
    .min(1, "Category cannot be empty")
    .max(50, "Category must be 50 characters or less"),
  limit: z
    .number({ message: "Limit must be a number" })
    .positive("Limit must be positive"),
  period: z.enum(["weekly", "monthly", "yearly"], {
    message: "Period must be weekly, monthly, or yearly",
  }),
});

export const updateBudgetSchema = createBudgetSchema.partial();

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type Budget = CreateBudgetInput & {
  id: string;
  spent: number;
  createdAt: string;
};