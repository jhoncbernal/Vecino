import BaseRepository from "./base.repository.js";

class BillRepository extends BaseRepository {
  constructor({ Bill, eventBus }) {
    super(Bill, eventBus);
    this.model = Bill;
  }
}
export default BillRepository;
