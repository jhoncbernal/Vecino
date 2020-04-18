module.exports = {
    User: require('./user.model'),
    Admin: require('./admin.model'),
    Provider: require('./provider.model'),
    Vehicle: require('./vehicle.model').Vehicle,
    ParkingSpace: require('./parkingspace.model').ParkingSpace,
    Positions: require('./parkingspace.model').Positions,
    Prices: require('./parkingspace.model').Prices,
    Schedule: require('./parkingspace.model').Schedule,
    File: require('./file.model'),
    Product: require('./product.model'),
    Bill: require('./bill.model'),
}