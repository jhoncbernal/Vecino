import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";
const billSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  type: String,
  amount: Number,
  dueDate: Date,
  isPaid: Boolean,
  owner: { type: String, default: null }, //user, building, worker, recidency..
});
billSchema.plugin(accessibleRecordsPlugin);
const Bill = model("Bill", billSchema);
export  { Bill , billSchema};
