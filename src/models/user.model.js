const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new Schema({    
    username:           { type: String,  required: true  , lowercase:true, unique: true, trim: true},
    password:           { type: String,  required: [true , 'What is your password?'] },
    email:              { type: String,  required: [true , 'What is your email?'], lowercase:true, unique: true, trim: true},
    enabled:            { type: Boolean, required: true  , default:0 },
    roles:              [{type: String,  required: true  , lowercase:false }],
    firstName:          { type: String,  required: true },
    lastName:           { type: String,  required: true },
    homeNumber:         { type: Number,  required: true  },
    blockNumber:        { type: Number,  required: true  },
    phone:              { type: String,  required: [true , 'What is your contact number?'] },
    neighborhoodcode:   { type: String,  required: [true , 'What is your neighborhoodcode?'] },
    points:             { type: Number,  required: true  , trim: true, default:0 },
    resetPasswordToken: { type: String,  required: false},
    resetPasswordExpires:{type: Date,    required: false},
    isVerified:         { type: Boolean, default:0 },
    isOwner:            { type: Boolean, default:0 },
    code:               {type:String},
    neighborhood:{
        type:Schema.Types.ObjectId,
        ref:"neighborhood",
        required:true,
        autopopulate:{ select: ['username','address' ]}
    },
}, {timestamps: true});
UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
 }, 'The e-mail field cannot be empty or with out email structure.')
UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    return user;
}

UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
}
UserSchema.pre('save', function(next) {
    this.code = this.blockNumber+this.homeNumber;
    next();
});
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});
UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 365);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};
UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
mongoose.set('useFindAndModify', false);
UserSchema.plugin(require("mongoose-autopopulate"))
module.exports = mongoose.model('user', UserSchema);