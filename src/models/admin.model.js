const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");
const crypto = require("crypto");
const ParkingLotsSchema = new Schema({
  numberOfParkingLots: { type: Number, required: true },
  parkingLotType: {
    type: String,
    required: true,
    enum: ["Car", "Motorcycle", "Bicycle"],
  },
});
const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "What is your username?"],
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: [true, "What is your password?"] },
    email: {
      type: String,
      required: [true, "What is your email?"],
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    enabled: { type: Boolean, required: true, default: 0 },
    roles: [{ type: String, required: true, lowercase: false }],
    firstName: { type: String, required: true },
    documentId: {
      type: Number,
      required: [true, "What is your id number?"],
      unique: true,
    },
    fireToken: { type: String },
    acceptPolicity: {
      type: Boolean,
      required: [true, "you have to accept the policity"],
      default: false,
    },
    phone: { type: String, required: [true, "What is your contact number?"] },
    address: { type: String, required: true },
    uniquecode: {
      type: String,
      required: [true, "What is your uniquecode?"],
      unique: true,
      index: true,
    },
    cityName: { type: String, required: true },
    cityCode: { type: String, required: true },
    propertyInfo: {
      numberOfSections: { type: Number, required: true },
      sectionType: {
        type: String,
        required: true,
        enum: ["Sector", "Tower", "Block", "Unit", "Building", "None"],
      },
      numberOfProperties: { type: Number, required: true },
      propertyType: {
        type: String,
        required: true,
        enum: ["Apartment", "House"],
      },
      parkingLots: [ParkingLotsSchema],
    },
    totalNumberOfUsers: { type: Number, required: true },
    registeredUsers: { type: String, max: this.totalNumberOfUsers },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    isVerified: { type: Boolean, default: 0 },
  },
  { timestamps: true }
);
AdminSchema.path("email").validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email); // Assuming email has a text attribute
}, "The e-mail field cannot be empty or with out email structure.");

AdminSchema.methods.toJSON = function () {
  let admin = this.toObject();
  delete admin.password;
  return admin;
};

AdminSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (!admin.isModified("password")) {
    return next();
  }
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(admin.password, salt);
  admin.password = hashedPassword;
  next();
});
AdminSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 365);

  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
    firstName: this.firstName,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};
AdminSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
module.exports = mongoose.model("neighborhood", AdminSchema);
