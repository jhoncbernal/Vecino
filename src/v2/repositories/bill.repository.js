import BaseRepository from "./base.repository.js";

class BillRepository extends BaseRepository {
  constructor({ Bill }) {
    super(Bill);
    this.model = Bill;
  }
}
export default BillRepository;
