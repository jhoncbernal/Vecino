const BaseService = require("./base.service");
let _building = null;

class BuildingRepository extends BaseService {
  constructor({ Building }) {
    super(Building);
    _building = Building;
  }
}

module.exports = BuildingRepository;
