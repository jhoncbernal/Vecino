const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const UserSchema = new Schema({    
    username:           { type: String,  required: true },
    password:           { type: String,  required: true },
    email:              { type: String,  required: true },
    enabled:            { type: Boolean, required: true },
    roles:              [{type: String, required: true }],
    firstName:          { type: String,  required: true },
    lastName:           { type: String,  required: true },
    phone:              { type: String,  required: true },
    neighborhoodcode:   { type: String,  required: true },
    neighborhood:{
        type:Schema.Types.ObjectId,
        ref:"neighborhood",
        required:true,
        autopopulate:{ select: ['neighborhoodname' ]}
    },
});
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

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
})
UserSchema.plugin(require("mongoose-autopopulate"))
module.exports = mongoose.model('user', UserSchema);