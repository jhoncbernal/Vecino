import BaseRepository from "./base.repository.js";

class GuestRepository extends BaseRepository {
  constructor({ Guest }) {
    super(Guest);
    this.model = Guest;
  }
}

export default GuestRepository;
