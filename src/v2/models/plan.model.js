import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";
const planSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  features: {
    type: Map,
    of: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
planSchema.plugin(accessibleRecordsPlugin);
const Plan = model("Plan", planSchema);

export  { Plan, planSchema };
