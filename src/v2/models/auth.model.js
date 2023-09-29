import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import bcrypt from "bcryptjs";
import { accessibleRecordsPlugin } from "@casl/mongoose";

const { Schema } = mongoose;
const { isEmail } = validator;
const { compareSync, hashSync, genSaltSync } = bcrypt;

const authSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => isEmail(email),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
  },
  providers: [
    {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },
  ],
  providerIds: [String],
  enabled: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  otpCode: { type: String },
});

authSchema.methods.toJSON = function () {
  const auth = this.toObject();
  delete auth.password;
  delete auth.__v;
  delete auth.otpCode;
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

authSchema.plugin(accessibleRecordsPlugin);

const Auth = mongoose.model("Auth", authSchema);

export { Auth, authSchema };
