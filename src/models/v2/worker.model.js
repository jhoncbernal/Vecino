const { v4: uuidv4 } = require("uuid");

const workerSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  contactNumber: String,
  email: String,
  auth: { type: String, ref: "Auth", required: true },
  role: { type: String, required: true },
  workerType: {
    type: String,
    enum: [
      "propertyManager",
      "concierge",
      "security",
      "janitor",
      "maintenance",
      "landscaper",
      "poolAttendant",
    ],
    required: true,
  },
});

const Worker = mongoose.model("Worker", workerSchema);
module.exports = { Worker };
