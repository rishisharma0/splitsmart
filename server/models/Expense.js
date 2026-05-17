import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    paidBy: {
      type: String,
      required: [true, "PaidBy is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // automatically createdAt aur updatedAt fields add kar deta hai
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;