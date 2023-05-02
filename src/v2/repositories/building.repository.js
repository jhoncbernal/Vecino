import BaseRepository from "./base.repository.js";

class BuildingRepository extends BaseRepository {
  constructor({ Building }) {
    super(Building);
    this.repository = Building;
  }
}

export default BuildingRepository;
