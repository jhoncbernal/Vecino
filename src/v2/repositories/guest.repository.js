import BaseRepository from "./base.repository.js";

class GuestRepository extends BaseRepository {
  constructor({ Guest, eventBus }) {
    super(Guest, eventBus);
    this.model = Guest;
  }
}

export default GuestRepository;
