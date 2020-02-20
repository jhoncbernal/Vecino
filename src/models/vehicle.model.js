const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({    
    vehicletype:        { type: String,  required: true },
    username:           { type: String},
    plate:              { type: String,  required: true },
    position:           { type: String },
    enabled:            { type: Boolean, required: true },
    parkingplan:        { type: String, required: true },
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
            'neighborhood neighborhoodname' ]}
    }
});


VehicleSchema.plugin(require("mongoose-autopopulate"))
module.exports = mongoose.model('vehicle', VehicleSchema);