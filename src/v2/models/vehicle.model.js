const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const vehicleSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  photo: { type: String, ref: "File" },
  make: String,
  model: String,
  year: Number,
  licensePlate: String,
  ownerId: String, // Reference to User or Guest
  type: { type: String, enum: ["car", "bike", "motorcycle", "other"] },
  parkingHistory: [
    {
      parkingSpot: { type: String, ref: "ParkingSpot" },
      enteredAt: Date,
      exitedAt: Date,
      guestParkingFee: Number,
      bill: { type: String, ref: "Bill", default: null },
      observations: String,
      comments: String,
    },
  ],
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = { Vehicle, vehicleSchema };
