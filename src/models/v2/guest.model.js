const { v4: uuidv4 } = require("uuid");
const guestSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  contactNumber: String,
  dateOfVisit: Date,
  vehicle: vehicleSchema,
  visitHistory: [
    {
      building: { type: String, ref: "Building" },
      unit: String,
      enteredAt: Date,
      exitedAt: Date,
    },
  ],
});
const Guest = mongoose.model("Guest", guestSchema);
module.exports = { Guest };
