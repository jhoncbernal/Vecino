import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";

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
guestSchema.plugin(accessibleRecordsPlugin);
const Guest = model("Guest", guestSchema);
export  { Guest, guestSchema };
