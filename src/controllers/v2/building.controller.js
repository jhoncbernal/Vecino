const BaseController = require("./base.controller");
let _buildingService = null;

class BuildingController extends BaseController {
  constructor({ BuildingService }) {
    super(BuildingService);
    _buildingService = BuildingService;
  }
}

module.exports = BuildingController;
