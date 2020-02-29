const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const crypto = require('crypto');

const NeighborhoodSchema = new Schema({    
    username:           { type: String,  required: [true, 'What is your username?']  , lowercase:true, unique: true, trim: true },
    password:           { type: String,  required: [true, 'What is your password?']},
    email:              { type: String,  required: [true, 'What is your email?'], lowercase:true, unique: true, trim: true },
    enabled:            { type: Boolean, required: true, default:0 },
    roles:              [{type: String,  required: true  , lowercase:false }],
    firstName:          { type: String,  required: true },
    phone:              { type: String,  required: [true, 'What is your contact number?'] },
    address:            { type: String,  required: true },
    neighborhoodcode:   { type: String,  required: [true, 'What is your neighborhoodcode?'], unique: true},
    totalNumberOfUsers: { type: Number,  required: true },
    registeredUsers:    { type: String,  max:this.totalNumberOfUsers},
    resetPasswordToken: { type: String,  required: false},
    resetPasswordExpires:{type: Date,    required: false},
    isVerified:         { type: Boolean, default:0 },
}, {timestamps: true});
NeighborhoodSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
 }, 'The e-mail field cannot be empty or with out email structure.')
 
NeighborhoodSchema.methods.toJSON = function () {
    let neighborhood = this.toObject();
    delete neighborhood.password;
    return neighborhood;
}

NeighborhoodSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
}

NeighborhoodSchema.pre('save', async function (next) {
    const neighborhood = this;
    if (!neighborhood.isModified("password")) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(neighborhood.password, salt);
    neighborhood.password = hashedPassword;
    next();
});
NeighborhoodSchema.methods.generateJWT = function() {
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
NeighborhoodSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
module.exports = mongoose.model('neighborhood', NeighborhoodSchema);