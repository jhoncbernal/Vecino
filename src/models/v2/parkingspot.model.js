const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const parkingSpotSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  number: Number,
  isAvailable: { type: Boolean, default: true },
  vehicle: { type: String, ref: "Vehicle", default: null },
  building: { type: String, ref: "Building" },
});

const ParkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);
module.exports = { ParkingSpot, parkingSpotSchema };
