import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db";

const JWT_SECRET = process.env.JWT_SECRET as string;
const TOKEN_EXPIRY = "24h";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });

  res.json({
    message: "Login successful",
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
};