import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
const billSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  type: String,
  amount: Number,
  dueDate: Date,
  isPaid: Boolean,
});

const Bill = model("Bill", billSchema);
export  { Bill , billSchema};
