# Personal Finance API

A REST API built with Express and TypeScript for tracking expenses and budgets. Features JWT authentication, input validation, and a SQLite database.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Database:** SQLite with Prisma ORM
- **Auth:** JWT + bcrypt
- **Validation:** Zod
- **Testing:** Vitest + Supertest

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/personal-finance-api.git
cd personal-finance-api
npm install
```

### Environment Setup

Copy the example env file and adjust if needed:

```bash
cp .env.example .env
```

### Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### Run Tests

```bash
npm test
```

## API Endpoints

### Auth

| Method | Endpoint             | Description       | Auth |
|--------|----------------------|-------------------|------|
| POST   | `/api/auth/register` | Register new user | No   |
| POST   | `/api/auth/login`    | Login             | No   |

### Expenses

| Method | Endpoint             | Description        | Auth |
|--------|----------------------|--------------------|------|
| GET    | `/api/expenses`      | Get all expenses   | Yes  |
| GET    | `/api/expenses/:id`  | Get one expense    | Yes  |
| POST   | `/api/expenses`      | Create expense     | Yes  |
| PUT    | `/api/expenses/:id`  | Update expense     | Yes  |
| DELETE | `/api/expenses/:id`  | Delete expense     | Yes  |

### Budgets

| Method | Endpoint            | Description       | Auth |
|--------|---------------------|-------------------|------|
| GET    | `/api/budgets`      | Get all budgets   | Yes  |
| POST   | `/api/budgets`      | Create budget     | Yes  |
| DELETE | `/api/budgets/:id`  | Delete budget     | Yes  |

## Request Examples

### Register

```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "Jane Doe"
}
```

### Create Expense

```json
POST /api/expenses
Authorization: Bearer <token>
{
  "amount": 42.50,
  "category": "groceries",
  "description": "Weekly shopping",
  "date": "2026-04-08"
}
```

### Create Budget

```json
POST /api/budgets
Authorization: Bearer <token>
{
  "category": "groceries",
  "limit": 200,
  "period": "monthly"
}
```

## Project Structure

```
src/
├── controllers/    # Request handlers and business logic
├── middleware/     # Auth, validation, error handling
├── routes/         # API route definitions
├── types/          # TypeScript types and Zod schemas
├── generated/      # Prisma generated client
├── app.ts          # Express app configuration
├── db.ts           # Database client
└── index.ts        # Server entry point
```