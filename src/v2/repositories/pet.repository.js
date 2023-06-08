import BaseRepository from "./base.repository.js";

class PetRepository extends BaseRepository {
  constructor({ Pet, eventBus }) {
    super(Pet, eventBus);
    this.model = Pet;
  }
}

export default PetRepository;
