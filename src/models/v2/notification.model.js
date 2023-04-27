const { v4: uuidv4 } = require("uuid");
const notificationSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  message: String,
  dateSent: Date,
  isRead: Boolean,
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = { Notification };
