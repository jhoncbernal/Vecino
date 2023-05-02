import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const workerSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  photo: { type: String, ref: "File" },
  name: String,
  contactNumber: String,
  email: String,
  auth: { type: String, ref: "Auth", required: true },
  role: { type: String, required: true },
  building: { type: String, ref: "Building" },
  workerType: {
    type: String,
    enum: [
      "propertyManager",
      "concierge",
      "security",
      "janitor",
      "maintenance",
      "landscaper",
      "poolAttendant",
    ],
    required: true,
  },
});

const Worker = model("Worker", workerSchema);
export  { Worker, workerSchema };
