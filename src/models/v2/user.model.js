const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");


const userSchema = new Schema({
  _id: { type: String, default: uuidv4 },
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

const addressSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  building: { type: String, ref: "Building" },
  street: String,
  city: String,
  state: String,
  zipCode: String,
  unitResidents: [{ type: String, ref: "User" }],
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  unitNumber: { type: String, required: true },
  unitType: { type: String, enum: ["apartment", "house"], required: true },
  propertyInfo: {
    sectionNumber: { type: String },
    propertyNumber: { type: String },
  },
});

const unitResidentSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  user: { type: String, ref: "User", required: true },
  address: { type: String, ref: "Address", required: true },
  userType: { type: String, enum: ["owner", "tenant"], required: true },
});

const User = mongoose.model("User", userSchema);
const Address = mongoose.model("Address", addressSchema);
const UnitResident = mongoose.model("UnitResident", unitResidentSchema);

module.exports = { User, userSchema };
