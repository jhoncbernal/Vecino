import BaseService from "./base.service.js";
class GuestService extends BaseService {
  constructor({ GuestRepository }) {
    super(GuestRepository);
    this.repository = GuestRepository;
  }
}

export default GuestService;
