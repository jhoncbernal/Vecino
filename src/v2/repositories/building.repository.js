const BaseRepository = require("./base.repository");

class BuildingRepository extends BaseRepository {
  constructor({ Building }) {
    super(Building);
    this.repository = Building;
  }
}

module.exports = BuildingRepository;
