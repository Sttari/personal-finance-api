import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("Auth Endpoints", () => {
  const testUser = {
    email: "test@example.com",
    password: "securepass123",
    name: "Test User",
  };

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe(testUser.email);
      expect(res.body.user.name).toBe(testUser.name);
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should reject duplicate email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.status).toBe(409);
      expect(res.body.error).toBe("Email already registered");
    });

    it("should reject invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "notanemail", password: "securepass123", name: "Test" });

      expect(res.status).toBe(400);
    });

    it("should reject short password", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "new@example.com", password: "short", name: "Test" });

      expect(res.status).toBe(400);
    });

    it("should reject missing fields", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "new@example.com" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("details");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe(testUser.email);
    });

    it("should reject wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "wrongpassword" });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid email or password");
    });

    it("should reject non-existent email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nobody@example.com", password: "securepass123" });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid email or password");
    });
  });
});