import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
const residentialUnitSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  unitNumber: String,
  unitType: {
    type: String,
    enum: ["apartment", "house"],
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
  propertyInfo: {
    sectionNumber: { type: String },
    propertyNumber: { type: String },
  },
  needsParkingSpace: { type: Boolean, default: false },
  parkingSpace: [{ type: String, ref: "ParkingSpot" }],
  tenants: [{ type: String, ref: "User" }],
  paymentRaiting: { type: String },
  guests: [{ type: String, ref: "Guest" }],
});

const RecidentialUnit = model("RecidentialUnit", residentialUnitSchema);
export { RecidentialUnit, residentialUnitSchema };
