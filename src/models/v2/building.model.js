const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const buildingSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  subscriptionPlan: { type: String, ref: "SubscriptionPlan", required: true },
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
  user: { type: String, ref: "User", required: true },
  address: { type: String, ref: "Address", required: true },
  building: { type: String, ref: "Building", required: true },
  requestedBy: { type: String, ref: "Worker", required: true },
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
  user: { type: String, ref: "User", required: true },
  building: { type: String, ref: "Building", required: true },
  assignedWorker: { type: String, ref: "Worker" },
  attachments: [{ type: String, ref: "File" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const fileSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const subscriptionPlanSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  features: {
    type: Map,
    of: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SubscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

const ApprovalRequest = mongoose.model(
  "ApprovalRequest",
  approvalRequestSchema
);
const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
const File = mongoose.model("File", fileSchema);
const Building = mongoose.model("Building", buildingSchema);
module.exports = {
  Building,
  buildingSchema,
  SubscriptionPlan,
  subscriptionPlanSchema,
  ApprovalRequest,
  approvalRequestSchema,
  MaintenanceRequest,
  maintenanceRequestSchema,
  File,
  fileSchema,
};
