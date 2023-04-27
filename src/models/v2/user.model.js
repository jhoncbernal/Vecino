const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const { vehicleSchema } = require("./vehicle.model");
const { billSchema } = require("./bill.model");
const { notificationSchema } = require("./notification.model");
const { guestSchema } = require("./guest.model");

const userSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  firstName: String,
  lastName: String,
  auth: { type: String, ref: "Auth", required: true },
  addresses: [
    {
      building: String, // Reference to Building
      street: String,
      city: String,
      state: String,
      zipCode: String,
      userType: { type: String, enum: ["owner", "tenant"], required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  ],
  vehicles: [vehicleSchema],
  guests: [guestSchema],
  unitResidents: [{ type: String, ref: "User" }],
  friendsAndFamily: [{ type: String, ref: "User" }],
  bills: [billSchema],
  notifications: [notificationSchema],
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema};
