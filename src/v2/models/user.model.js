const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");


const userSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  photo: { type: String, ref: "File" },
  firstName: String,
  lastName: String,
  auth: { type: String, ref: "Auth", required: true },
  addresses: [{ type: String, ref: "Address", required: true }],
  vehicles: [{ type: String, ref: "Vehicle" }],
  guests: [{ type: String, ref: "Guest" }],
  bills: [{ type: String, ref: "Bill" }],
  notifications: [{ type: String, ref: "Notification" }],
  role: { type: String, required: true },
  acceptPolicity: { type: Boolean, required: true },
  contactNumber: { type: String, required: true },
  friendsAndFamily: [{ type: String, ref: "User" }],
});



const unitResidentSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  user: { type: String, ref: "User", required: true },
  address: { type: String, ref: "Address", required: true },
  userType: { type: String, enum: ["owner", "tenant"], required: true },
});

const User = mongoose.model("User", userSchema);
const UnitResident = mongoose.model("UnitResident", unitResidentSchema);

module.exports = { User, userSchema };
