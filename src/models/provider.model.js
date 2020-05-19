const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const crypto = require('crypto');
let ScheduleSchema = new Schema({
    days: [{ type: String, required: [true, 'Which days? ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]'], lowercase: true }],
    open: { type: Date, required: [true, 'Which hour did you open? 13:00']},
    close: { type: Date, required: [true, 'Which hour did you close? 24:00'] }
});
const ProviderSchema = new Schema({
    username: { type: String, required: [true, 'What is your username?'], lowercase: true, unique: true, trim: true, index: true },
    password: { type: String, required: [true, 'What is your password?'] },
    email: { type: String, required: [true, 'What is your email?'], lowercase: true, unique: true, trim: true, index: true },
    enabled: { type: Boolean, required: true, default: 0 },
    roles: [{ type: String, required: true, lowercase: false }],
    firstName: { type: String, required: true },
    documentId: { type: Number, required: [true, 'What is your id number?'], unique: true },
    fireToken:{ type: String },
    acceptPolicity:{type: Boolean, required: [true, 'you have to accept the policity'], default: false},
    phone: { type: String, required: [true, 'What is your contact number?'] },
    address: { type: String, required: true },
    category: { type: String, required: [true, 'What is your category?'] },
    categories:{type:[String],required:[true, 'Witch categories do you have?']},
    uniquecode:{ type: String, required: [true, 'What is your unique code?'] },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    isVerified: { type: Boolean, default: 0 },
    deliveryCharge: { type: Number, required: true },
    deliveryExtraCharge: { type: Number, required: true },
    paymentMethod:{type:[String],required: true,lowercase: true, trim: true},
    schedule:[ScheduleSchema],
    billType:{ type: String, required: true },
    promoBanner:{ type: String },
    city:{type:String, required: true},
    urlImage:{ type: String, required: true }
}, { timestamps: true });

ProviderSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty or with out email structure.')

ProviderSchema.methods.toJSON = function () {
    let admin = this.toObject();
    delete admin.password;
    return admin;
}

ProviderSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
}

ProviderSchema.pre('save', async function (next) {
    const admin = this;
    if (!admin.isModified("password")) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(admin.password, salt);
    admin.password = hashedPassword;
    next();
});
ProviderSchema.methods.generateJWT = function () {
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
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};
ProviderSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
module.exports = mongoose.model('provider', ProviderSchema);