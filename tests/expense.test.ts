import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("Expense Endpoints", () => {
  let token: string;
  let expenseId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "expense-test@example.com",
        password: "securepass123",
        name: "Expense Tester",
      });

    token = res.body.token;
  });

  describe("POST /api/expenses", () => {
    it("should create an expense", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 42.5,
          category: "groceries",
          description: "Weekly shopping",
          date: "2026-04-08",
        });

      expect(res.status).toBe(201);
      expect(res.body.amount).toBe(42.5);
      expect(res.body.category).toBe("groceries");
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("createdAt");

      expenseId = res.body.id;
    });

    it("should reject expense without auth", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .send({
          amount: 42.5,
          category: "groceries",
          description: "Weekly shopping",
          date: "2026-04-08",
        });

      expect(res.status).toBe(401);
    });

    it("should reject invalid amount", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: "banana",
          category: "groceries",
          description: "Weekly shopping",
          date: "2026-04-08",
        });

      expect(res.status).toBe(400);
    });

    it("should reject negative amount", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: -10,
          category: "groceries",
          description: "Weekly shopping",
          date: "2026-04-08",
        });

      expect(res.status).toBe(400);
    });

    it("should reject invalid date format", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 42.5,
          category: "groceries",
          description: "Weekly shopping",
          date: "April 8th",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/expenses", () => {
    it("should return all expenses for the user", async () => {
      const res = await request(app)
        .get("/api/expenses")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should reject without auth", async () => {
      const res = await request(app).get("/api/expenses");

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/expenses/:id", () => {
    it("should return a specific expense", async () => {
      const res = await request(app)
        .get(`/api/expenses/${expenseId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(expenseId);
    });

    it("should return 404 for non-existent expense", async () => {
      const res = await request(app)
        .get("/api/expenses/non-existent-id")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/expenses/:id", () => {
    it("should update an expense", async () => {
      const res = await request(app)
        .put(`/api/expenses/${expenseId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ amount: 55.0 });

      expect(res.status).toBe(200);
      expect(res.body.amount).toBe(55.0);
      expect(res.body.category).toBe("groceries");
    });
  });

  describe("DELETE /api/expenses/:id", () => {
    it("should delete an expense", async () => {
      const res = await request(app)
        .delete(`/api/expenses/${expenseId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Expense deleted");
    });

    it("should return 404 after deletion", async () => {
      const res = await request(app)
        .get(`/api/expenses/${expenseId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });
});