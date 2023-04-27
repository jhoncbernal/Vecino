const { v4: uuidv4 } = require("uuid");
const authSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  email: { type: String, unique: true, required: true },
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
module.exports = { Auth };
