import mongoose, { Schema } from 'mongoose';

const expenseSchema = new mongoose.Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
