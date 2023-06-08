import BaseRepository from "./base.repository.js";

class BuildingRepository extends BaseRepository {
  constructor({ Building, eventBus }) {
    super(Building, eventBus);
    this.model = Building;
  }
}

export default BuildingRepository;
