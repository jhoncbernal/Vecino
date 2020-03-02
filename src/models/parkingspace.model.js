const mongoose = require('mongoose');
const { Schema } = mongoose;
let PositionsSchema = new Schema({
    posnumber:      { type: String,  required: true ,index:true},
    available:      { type: String,  required: true },
    vehicletype:    { type: String,  required: [true , 'What kind of vehicle? ["Car", "Bike", "Motorcycle"]'] , enum: ['Car', 'Bike', 'Motorcycle']},
    vehicle:{
        type:Schema.Types.ObjectId,
        ref:"vehicle",
        autopopulate:{ select: ['vehicletype','plate' ]}
            }
});
let PricesSchema = new Schema({
    kind:           { type: String,  required: true },
    value:          { type: String,  required: true }
});
let ScheduleSchema = new Schema({
    rank:           { type: String,  required: true },
    value:          { type: String,  required: true }
});
const ParkingSpaceSchema = new Schema({    
    parkingname:        { type: String ,  required: true,   unique: true },
    enabled:            { type: Boolean,  default: true },
    address:            { type: String},
    totalspace:         { type: Number ,  required: true },
    prices:             [PricesSchema]        ,
    positions:          [PositionsSchema]     ,
    schedule:           [ScheduleSchema]      ,
    neighborhood:{
        type:       Schema.Types.ObjectId,
        ref:        "neighborhood",
        required:   true,
        autopopulate:{ select: ['username','address','phone' ]}
    }
},{timestamps: true});

module.exports = {
    ParkingSpace:   mongoose.model('parkingspace',  ParkingSpaceSchema),
    Positions:      mongoose.model('positions',     PositionsSchema),
    Prices:         mongoose.model('prices',        PricesSchema),
    Schedule:       mongoose.model('schedule',      ScheduleSchema)
}
