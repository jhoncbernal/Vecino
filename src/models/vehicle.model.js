const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({    
    vehicletype:        { type: String,  required: true },
    username:           { type: String},
    plate:              { type: String,  required: true, unique: true },
    favoriteposition:   { type: String },
    enabled:            { type: Boolean, required: true },
    parkingplan:        { type: String, required: true },
    startplan:          { type: String },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        autopopulate:{ select: [
            'firstName',
            'lastName',
            'phone',
            'email',
            'HomeNumber',
            'BlockNumber',
            'neighborhood username' ]}
    }
}, {timestamps: true});


VehicleSchema.plugin(require("mongoose-autopopulate"))
module.exports = mongoose.model('vehicle', VehicleSchema);