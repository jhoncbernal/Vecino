const mongoose = require("mongoose");
const { Schema } = mongoose;

const CitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true, index: true },
    enabled: { type: Boolean, default: true },
    stateName: { type: String, required: true },
    stateCode: { type: String, required: true },
    countryName: { type: String, required: true },
    countryCode: { type: String, required: true },
    totalNumberOfUsers: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("city", CitySchema);
