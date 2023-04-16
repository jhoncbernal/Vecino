const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
let MONGO_DB = null;
class MongooseConnection {
  constructor({ config }) {
    MONGO_DB = config.MONGO_DB;
  }
  async connect() {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = mongoose.connection;

    this.mongooseConnection.on("connected", this._readyConnection);
    this.mongooseConnection.on("error", this._errorConnection);
    this.mongooseConnection.on("disconnected", this._disconnectedConnection);

    const uriDb = `mongodb${MONGO_DB.port ? "" : "+srv"}://${
      MONGO_DB.username
    }:${MONGO_DB.password}@${MONGO_DB.hostname}${
      MONGO_DB.port ? ":" + MONGO_DB.port : ""
    }/${MONGO_DB.database}`;

    const optionsDb = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.mongooseInstance = await mongoose.connect(uriDb, optionsDb);
    return this.mongooseInstance;
  }

  _readyConnection() {
    const publicURI = `${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`;
    console.info(
      `[${MongooseConnection.name}] Mongoose connected to ${publicURI}`
    );
  }

  _errorConnection(error) {
    const message = `[${MongooseConnection.name}] Mongoose connection error: ${error.message}`;
    console.log({
      type: "CONNECTION_ERROR",
      message: message,
      module: "DATABASE",
      level: "error",
    });
  }

  _disconnectedConnection() {
    console.info(
      `[${MongooseConnection.name}] Mongoose connection disconnected`
    );
  }
}

module.exports = MongooseConnection;
