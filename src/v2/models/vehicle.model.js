import mongoose, { model as _model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";

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
vehicleSchema.plugin(accessibleRecordsPlugin);
const Vehicle = _model("Vehicle", vehicleSchema);
export  { Vehicle, vehicleSchema };
