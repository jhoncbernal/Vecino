const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const packageSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  packageCode: {
    type: String,
    required: true,
    unique: true,
  },
  deliveryCompany: {
    type: String,
    required: true,
  },
  receivedBy: {
    type: String,
    required: true,
  },
  receivedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["received", "in transit", "delivered"],
    default: "received",
  },
  pin: {
    type: String,
    required: true,
    match: /^[a-zA-Z]\d{4}$/,
    index: true,
  },
  users: [
    {
      _id: false,
      uuid: {
        ref: "users",
        type: String,
      },
    },
  ],
  admin: [
    {
      _id: false,
      uuid: {
        ref: "admin",
        type: String,
      },
    },
  ],
  signature: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  notificationWay: {
    type: String,
    required: true,
    enum: ["email", "sms", "both"],
    default: "email",
  },
  trackingNumber: {
    type: String
  },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
