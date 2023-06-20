import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";

const addressSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  street: {
    type: String,
    required: function () {
      return this.unitType === "building";
    },
  },
  city: {
    type: String,
    required: function () {
      return this.unitType === "building";
    },
  },
  state: {
    type: String,
    required: function () {
      return this.unitType === "building";
    },
  },
  zipCode: {
    type: String,
    required: function () {
      return this.unitType === "building";
    },
  },
  countryCode: {
    type: String,
    required: function () {
      return this.unitType === "building";
    },
  },
  latitude: {
    type: Number,
    required: function () {
      return this.unitType === "building";
    },
  },
  longitude: {
    type: Number,
    required: function () {
      return this.unitType === "building";
    },
  }
});
addressSchema.plugin(accessibleRecordsPlugin);
const Address = model("Address", addressSchema);
export  { Address, addressSchema };
