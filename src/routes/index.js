const express = require('express');
const cors= require('cors');
const helmet=require('helmet');
const compression =require('compression');
require('express-async-errors');
const {ErrorMiddleware, NotFoundMiddleware}=require("../middlewares");

module.exports=function({
    UserRoutes,
    AuthRoutes,
    NeighborhoodRoutes,
    VehicleRoutes,
    ParkingSpaceRoutes
}){
    const router= express.Router();
    const apiRoutes=express.Router();

    apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());


    apiRoutes.use('/user',UserRoutes);
    apiRoutes.use('/auth',AuthRoutes);
    apiRoutes.use('/neighborhood',NeighborhoodRoutes);
    apiRoutes.use('/vehicle',VehicleRoutes);
    apiRoutes.use('/parkingspace',ParkingSpaceRoutes);



    router.use('/v1/api',apiRoutes);
    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);


    return router;
}