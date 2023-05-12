import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";
const buildingSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  photo: { type: String, ref: "File" },
  address: {
    type: String,
    ref: "Address",
    required: true,
  },
  subscriptionPlan: { type: String, ref: "Plan", required: true },
  workers: [{ type: String, ref: "Worker" }],
  guestParkingLot: { type: String, ref: "ParkingLot" },
  residentParkingLot: { type: String, ref: "ParkingLot" },
  parkingLimits: {
    guest: {
      cars: { type: Number, default: 20 },
      bikes: { type: Number, default: 10 },
      motorcycles: { type: Number, default: 1 },
      others: { type: Number, default: 5 },
    },
    resident: {
      cars: { type: Number, default: 20 },
      bikes: { type: Number, default: 10 },
      motorcycles: { type: Number, default: 1 },
      others: { type: Number, default: 5 },
    },
  },
  maintenanceRequests: [{ type: String, ref: "MaintenanceRequest" }],
  approvalRequests: [{ type: String, ref: "ApprovalRequest" }],
});
const parkingLotSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  spots: [{ type: String, ref: "ParkingSpot" }],
});

 model("ParkingLot", parkingLotSchema);

const approvalRequestSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  building: { type: String, ref: "Building", required: true },
  requestedBy: { type: String, ref: "User", required: true },
  approvedBy: { type: String, ref: "Worker" },
  attachments: [{ type: String, ref: "File" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const maintenanceRequestSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in_progress", "completed", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "low",
  },
  requestedBy: { type: String, ref: "User", required: true },
  building: { type: String, ref: "Building", required: true },
  assignedWorker: { type: String, ref: "Worker" },
  attachments: [{ type: String, ref: "File" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



const ApprovalRequest = model(
  "ApprovalRequest",
  approvalRequestSchema
);
const MaintenanceRequest = model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
buildingSchema.plugin(accessibleRecordsPlugin);

const Building = model("Building", buildingSchema);
export  {
  Building,
  buildingSchema,
  ApprovalRequest,
  approvalRequestSchema,
  MaintenanceRequest,
  maintenanceRequestSchema,
};
