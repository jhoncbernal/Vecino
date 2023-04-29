const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const addressSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  building: { type: String, ref: "Building" },
  street: String,
  city: String,
  state: String,
  zipCode: String,
  countryCode: String,
  unitResidents: [{ type: String, ref: "User" }],
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  unitNumber: {
    type: String,
    required: function () {
      return this.unitType !== "building";
    },
  },
  unitType: {
    type: String,
    enum: ["apartment", "house", "building"],
    required: true,
  },
  propertyInfo: {
    sectionNumber: { type: String },
    propertyNumber: { type: String },
  },
});
const Address = mongoose.model("Address", addressSchema);
module.exports = { Address, addressSchema };
