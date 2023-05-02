import BaseRepository from "./base.repository.js";

class RecidentialUnitRepository extends BaseRepository {
  constructor({ RecidentialUnit }) {
    super(RecidentialUnit);
    this.model = RecidentialUnit;
  }
}

export default RecidentialUnitRepository;
