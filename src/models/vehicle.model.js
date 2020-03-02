const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({    
    vehicletype:        { type: String,  required: [true , 'What kind of vehicle? ["Car", "Bike", "Motorcycle"]'] , enum: ['Car', 'Bike', 'Motorcycle']},
    username:           { type: String},
    plate:              { type: String,  required: true, unique: true,uppercase: true,index:true},
    favoriteposition:   { type: String },
    brand:              { type: String, required: true,lowercase: true },
    color:              { type: String, required: true,uppercase: true },
    Observations:       [{type: String}],
    enabled:            { type: Boolean, default: true },
    parkingplan:        { type: String, required: true },
    Datestartplan:      { type: Date },
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