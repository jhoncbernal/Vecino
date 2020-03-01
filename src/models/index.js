module.exports={
    User:           require('./user.model'),
    Neighborhood:   require('./neighborhood.model'),
    Vehicle:        require('./vehicle.model'),
    ParkingSpace:   require('./parkingspace.model').ParkingSpace,
    Positions:      require('./parkingspace.model').Positions,
    Prices:         require('./parkingspace.model').Prices,
    Schedule:       require('./parkingspace.model').Schedule,
    File:           require('./file.model'),
}