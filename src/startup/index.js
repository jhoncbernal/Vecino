const express = require('express');

let _express = null;
let _config = null;

class Server {
    constructor({ config, router }) {
        _config = config;
        _express = express().use(router);
    }
    start(){
        return new Promise(resolve => {
            _express.listen(_config.SERVER.port, () => {
              console.log(
                _config.APPLICATION_NAME +
                  " API running on port " +
                  _config.SERVER.port
              );
              resolve();
            });    
        });
    }
}
module.exports=Server;