const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

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
  building: { type: String, ref: "Building", required: true },
  spots: [{ type: String, ref: "ParkingSpot" }],
});

const ParkingLot = mongoose.model("ParkingLot", parkingLotSchema);

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



const ApprovalRequest = mongoose.model(
  "ApprovalRequest",
  approvalRequestSchema
);
const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
const Building = mongoose.model("Building", buildingSchema);
module.exports = {
  Building,
  buildingSchema,
  ApprovalRequest,
  approvalRequestSchema,
  MaintenanceRequest,
  maintenanceRequestSchema,
};
