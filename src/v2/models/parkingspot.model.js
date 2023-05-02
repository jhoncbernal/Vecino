import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const parkingSpotSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  number: Number,
  isAvailable: { type: Boolean, default: true },
  vehicle: { type: String, ref: "Vehicle", default: null },
  building: { type: String, ref: "Building" },
});

const ParkingSpot = model("ParkingSpot", parkingSpotSchema);
export  { ParkingSpot, parkingSpotSchema };
