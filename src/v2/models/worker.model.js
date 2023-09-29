import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";

const workerSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  photo: { type: String, ref: "File", default: "" },
  firstName: String,
  lastName: String,
  contactNumber: String,
  auth: { type: String, ref: "Auth", required: true },
  role: { type: String, required: true },
  buildings: [{ type: String, ref: "Building" }],
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
workerSchema.plugin(accessibleRecordsPlugin);
const Worker = model("Worker", workerSchema);
export  { Worker, workerSchema };
