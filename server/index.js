import Expense from "./models/Expense.js";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

// .env file load kar
dotenv.config();

// Database connect kar
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
// Pehla route: jab koi GET request bhejega "/" pe, yeh chalega
app.get("/", (req, res) => {
  res.send("Hello from SplitSmart server!");
});

// Health check route — common practice
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// GET — saare expenses database se le
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST — naya expense database mein save kar
app.post("/api/expenses", async (req, res) => {
  try {
    const { description, amount, paidBy } = req.body;

    if (!description || !amount || !paidBy) {
      return res.status(400).json({
        error: "description, amount, and paidBy are required",
      });
    }

    const newExpense = await Expense.create({
      description,
      amount,
      paidBy,
    });

    res.status(201).json({
      message: "Expense created",
      expense: newExpense,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});