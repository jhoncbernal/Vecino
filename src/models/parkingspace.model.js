const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParkingSpaceSchema = new Schema({    
    parkingname:        {  type: String,  required: true,   unique: true },
    enabled:            {  type: Boolean, default: true },
    address:            {  type: String},
    totalspace:         {  type: Number,  required: true },
    prices:             [{  
        kind:  {type: String,  required: true },
        value:  {type: String,  required: true }
    }],
    positions:[{
        posnumber:  {type: String,  required: true },
        available:  {type: String,  required: true },
        vehicletype:{ type: String,  required: [true , 'What kind of vehicle? ["Car", "Bike", "Motorcycle"]'] , enum: ['Car', 'Bike', 'Motorcycle']},
        vehicle:{
            type:Schema.Types.ObjectId,
            ref:"vehicle",
            autopopulate:{ select: ['vehicletype','plate' ]}
        }
    }],
    schedule:           [{ 
        rank:  {type: String,  required: true },
        value:  {type: String,  required: true }
    }],
    neighborhood:{
        type:Schema.Types.ObjectId,
        ref:"neighborhood",
        required:true,
        autopopulate:{ select: ['username','address','phone' ]}
    }
}, {timestamps: true});

module.exports = mongoose.model('parkingspace', ParkingSpaceSchema);