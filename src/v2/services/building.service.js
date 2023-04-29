const BaseService = require("./base.service");
class BuildingRepository extends BaseService {
  constructor({ BuildingRepository }) {
    super(BuildingRepository);
    this.repository = BuildingRepository;
  }
}

module.exports = BuildingRepository;
