const bindMethods = require("../../utils/bindMethods");
const BaseController = require("./base.controller");

class BuildingController extends BaseController {
  constructor({ BuildingService }) {
    super(BuildingService);
    this.service = BuildingService;
    bindMethods(this);
  }
}

module.exports = BuildingController;
