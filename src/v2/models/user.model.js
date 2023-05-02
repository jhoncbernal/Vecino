import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";


const userSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    photo: { type: String, ref: "File" },
    firstName: String,
    lastName: String,
    auth: { type: String, ref: "Auth", required: true },
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

const User = model("User", userSchema);

export  { User, userSchema };
