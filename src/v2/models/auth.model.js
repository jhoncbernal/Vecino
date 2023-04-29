
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");
const authSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
  },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
  providerId: String,
  enabled: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
});

authSchema.methods.toJSON = function () {
  let auth = this.toObject();
  delete auth.password;
  return auth;
};

authSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

authSchema.pre("save", async function (next) {
  const auth = this;
  if (!auth.isModified("password")) {
    return next();
  }
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(auth.password, salt);
  auth.password = hashedPassword;
  next();
});

const Auth = mongoose.model("Auth", authSchema);
module.exports = { Auth, authSchema };
