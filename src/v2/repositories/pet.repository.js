import BaseRepository from "./base.repository.js";

class PetRepository extends BaseRepository {
  constructor({ Pet }) {
    super(Pet);
    this.model = Pet;
  }
}

export default PetRepository;
