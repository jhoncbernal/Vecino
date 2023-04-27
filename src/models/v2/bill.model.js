const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const billSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  type: String,
  amount: Number,
  dueDate: Date,
  isPaid: Boolean,
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = { Bill , billSchema};
