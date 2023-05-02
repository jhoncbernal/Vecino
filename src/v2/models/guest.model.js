const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const guestSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  photo: { type: String, ref: "File" }, 
  contactNumber: String,
  dateOfVisit: Date,
  vehicle: { type: String, ref: "Vehicle" },
  registeredBy: { type: String, ref: "Worker" },
  visitHistory: [
    {
      building: { type: String, ref: "Building" },
      unit: String,
      approvedBy: { type: String, ref: "User" },
      enteredAt: Date,
      exitedAt: Date,
    },
  ],
});
const Guest = mongoose.model("Guest", guestSchema);
module.exports = { Guest, guestSchema };
