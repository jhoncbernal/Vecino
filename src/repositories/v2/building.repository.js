const BaseRepository = require("./base.repository");
let _building = null;

class BuildingRepository extends BaseRepository {
  constructor({ Building }) {
    super(Building);
    _building = Building;
  }
}

module.exports = BuildingRepository;
