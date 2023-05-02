const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
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

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address, addressSchema };
