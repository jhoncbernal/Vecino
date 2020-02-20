const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParkingSpaceSchema = new Schema({    
    parkingname:        {  type: String,  required: true },
    enabled:            {  type: Boolean, required: true },
    address:            {  type: String},
    totalspace:         {  type: Number,  required: true },
    prices:             [{ type: Number}],
    position:[{
        posnumber:  {type: Number,  required: true },
        available:  {type: Number,  required: true },
        vehicle:{
            type:Schema.Types.ObjectId,
            ref:"vehicle",
            autopopulate:{ select: ['vehicletype','plate' ]}
        }
    }],
    schedule:           [{ type: String}],
    neighborhood:{
        type:Schema.Types.ObjectId,
        ref:"neighborhood",
        required:true,
        autopopulate:{ select: ['neighborhoodname','address','phone' ]}
    }
});

module.exports = mongoose.model('parkingspace', ParkingSpaceSchema);