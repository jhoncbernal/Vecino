import BaseService from "./base.service.js";
class BillService extends BaseService {
  constructor({ BillRepository }) {
    super(BillRepository);
    this.repository = BillRepository;
  }
}

export default BillService;
