const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const PlanSchema = new Schema({
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

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = { Plan, PlanSchema };
