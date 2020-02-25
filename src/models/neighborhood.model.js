const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const NeighborhoodSchema = new Schema({    
    neighborhoodname:   { type: String,  required: true  , lowercase:true },
    password:           { type: String,  required: [true, 'What is your password?'] },
    email:              { type: String,  required: [true, 'What is your email?'] },
    enabled:            { type: Boolean, required: true },
    roles:              [{type: String,  required: true  , lowercase:false }],
    phone:              { type: String,  required: [true, 'What is your contact number?'] },
    address:            { type: String,  required: true },
    neighborhoodcode:   { type: String,  required: [true, 'What is your neighborhoodcode?'] },
    totalNumberOfUsers: { type: Number,  required: true },
    registeredUsers:    { type: String,  max:this.totalNumberOfUsers},
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
})
module.exports = mongoose.model('neighborhood', NeighborhoodSchema);