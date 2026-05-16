// Express library import kiya
import express from "express";

// app banaya — yeh hamara server hai
const app = express();

// PORT define kiya — yeh wo "darwaza" hai jisse server baat karega
const PORT = 5001;

// Middleware: incoming JSON requests parse kar
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

// Sample route — abhi dummy data, baad mein database se aayega
app.get("/api/expenses", (req, res) => {
  const dummyExpenses = [
    { id: 1, description: "Goa hotel", amount: 6000, paidBy: "Rishi" },
    { id: 2, description: "Dinner", amount: 1200, paidBy: "Aman" },
    { id: 3, description: "Petrol", amount: 800, paidBy: "Priya" },
  ];
  res.json(dummyExpenses);
});

// POST route — naya expense add kar (abhi sirf echo karega, database baad mein)
app.post("/api/expenses", (req, res) => {
  const { description, amount, paidBy } = req.body;

  // Basic validation
  if (!description || !amount || !paidBy) {
    return res.status(400).json({
      error: "description, amount, and paidBy are required",
    });
  }

  // Abhi sirf wapas bhej rahe hain — database baad mein connect karenge
  const newExpense = {
    id: Date.now(),
    description,
    amount,
    paidBy,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    message: "Expense received",
    expense: newExpense,
  });
});

// Server ko start kar do, PORT pe sun raha hai ab
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});