import BaseRepository from "./base.repository.js";

class BuildingRepository extends BaseRepository {
  constructor({ Building }) {
    super(Building);
    this.model = Building;
  }
}

export default BuildingRepository;
