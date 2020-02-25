const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParkingSpaceSchema = new Schema({    
    parkingname:        {  type: String,  required: true },
    enabled:            {  type: Boolean, required: true },
    address:            {  type: String},
    totalspace:         {  type: Number,  required: true },
    prices:             [{  
        kind:  {type: String,  required: true },
        value:  {type: String,  required: true }
    }],
    positions:[{
        posnumber:  {type: String,  required: true },
        available:  {type: String,  required: true },
        vehicletype:{type: String,  required: true },
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
        autopopulate:{ select: ['neighborhoodname','address','phone' ]}
    }
}, {timestamps: true});

module.exports = mongoose.model('parkingspace', ParkingSpaceSchema);