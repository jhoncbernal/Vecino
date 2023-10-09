import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";
const residentialUnitSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  unitNumber: { type: String },
  unitType: {
    type: String,
    enum: ["apartment", "house", "other"],
    required: true,
  },
  building: { type: String, ref: "Building" },
  address: { type: String, ref: "Address", required: true },
  owners: [{ type: String, ref: "User", required: true }],
  administrationFeePayments: [
    {
      amount: Number,
      date: Date,
      isPaid: Boolean,
    },
  ],
  isRented: { type: Boolean, default: false }, // Add this field to indicate if the unit is rented

  sectionNumber: { type: String },
  propertyNumber: { type: String },

  needsParkingSpace: { type: Boolean, default: false },
  parkingSpace: [{ type: String, ref: "ParkingSpot" }],
  tenants: [{ type: String, ref: "User" }],
  paymentRaiting: { type: String },
  guests: [{ type: String, ref: "Guest" }],
  notificationWay: {
    type: String,
    required: true,
    enum: ["email", "sms", "both"],
    default: "email",
  },
});
residentialUnitSchema.index(
  { unitNumber: 1, building: 1 },
  { unique: true }
);
residentialUnitSchema.plugin(accessibleRecordsPlugin);
const RecidentialUnit = model("RecidentialUnit", residentialUnitSchema);
export { RecidentialUnit, residentialUnitSchema };
