const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");


const userSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    photo: { type: String, ref: "File" },
    firstName: String,
    lastName: String,
    auth: { type: String, ref: "Auth", required: true },
    addresses: [{ type: String, ref: "Address", required: true }],
    vehicles: [{ type: String, ref: "Vehicle" }],
    bills: [{ type: String, ref: "Bill" }],
    notifications: [{ type: String, ref: "Notification" }],
    role: { type: String, required: true, default: "resident" },
    acceptPolicity: { type: Boolean, required: true, default: false },
    contactNumber: { type: String, required: true },
    documentId: {
      type: Number,
    },
    friendsAndFamily: [{ type: String, ref: "User" }],
    policyHistory: [
      {
        version: { type: String, required: true },
        acceptedDate: { type: Date, required: true, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
